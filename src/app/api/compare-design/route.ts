import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
// @ts-expect-error: pdfjs-dist has no type declarations
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';
import sharp from 'sharp';
import pixelmatch from 'pixelmatch';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function pdfToPng(pdfPath: string, outPath: string) {
  const data = new Uint8Array(await fs.readFile(pdfPath));
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 2 });
  const canvasFactory = new pdfjsLib.NodeCanvasFactory();
  const canvasAndCtx = canvasFactory.create(viewport.width, viewport.height);
  const renderContext = {
    canvasContext: canvasAndCtx.context,
    viewport,
    canvasFactory,
  };
  await page.render(renderContext).promise;
  const image = canvasAndCtx.canvas.toBuffer();
  await sharp(image).png().toFile(outPath);
  return outPath;
}

async function screenshotWebsite(url: string, outPath: string) {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  await page.setViewport({ width: 1280, height: 900 });
  await page.screenshot({ path: outPath as `${string}.png`, fullPage: true });
  await browser.close();
  return outPath;
}

async function compareImages(img1Path: string, img2Path: string, diffPath: string) {
  const img1 = sharp(img1Path).resize(1280, 900).png();
  const img2 = sharp(img2Path).resize(1280, 900).png();
  const [buf1, buf2] = await Promise.all([img1.toBuffer(), img2.toBuffer()]);
  const { width, height } = await sharp(buf1).metadata();
  const diff = Buffer.alloc(buf1.length);
  const numDiffPixels = pixelmatch(buf1, buf2, diff, width!, height!, { threshold: 0.1 });
  await sharp(diff, { raw: { width: width!, height: height!, channels: 4 } }).png().toFile(diffPath);
  return { numDiffPixels, diffPath };
}

export async function POST(req: NextRequest) {
  try {
    // Parse form data
    const formData = await req.formData();
    const url = formData.get('url') as string;
    const file = formData.get('file') as File;
    if (!url || !file) {
      return NextResponse.json({ error: 'Missing URL or PDF file.' }, { status: 400 });
    }
    // Save PDF to disk
    const tempDir = '/tmp';
    const pdfPath = path.join(tempDir, `upload-${Date.now()}.pdf`);
    const pdfBuffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(pdfPath, pdfBuffer);
    // Render PDF to PNG
    const pdfImgPath = path.join(tempDir, `pdfimg-${Date.now()}.png`);
    await pdfToPng(pdfPath, pdfImgPath);
    // Screenshot website
    const siteImgPath = path.join(tempDir, `siteimg-${Date.now()}.png`);
    await screenshotWebsite(url, siteImgPath);
    // Compare images
    const diffImgPath = path.join(tempDir, `diffimg-${Date.now()}.png`);
    const { numDiffPixels } = await compareImages(pdfImgPath, siteImgPath, diffImgPath);
    // Prepare result
    const diffImgBase64 = (await fs.readFile(diffImgPath)).toString('base64');
    const advice = numDiffPixels < 1000
      ? 'Your website matches the design closely!'
      : 'There are significant visual differences. Review the highlighted areas in the diff image.';
    return NextResponse.json({
      numDiffPixels,
      diffImgBase64,
      advice,
    });
  } catch {
    return NextResponse.json({
      error: 'Failed to compare design. Please ensure the PDF and URL are valid.',
      advice: 'Try uploading a clear PDF and a public website URL. For best results, use a single-page PDF and a page without login.'
    }, { status: 500 });
  }
} 