import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

// Helper to run PageSpeed Insights and return detailed metrics
async function runPageSpeedInsights(url: string) {
  const apiKey = process.env.PAGESPEED_API_KEY || '';
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=desktop${apiKey ? `&key=${apiKey}` : ''}`;
  const res = await fetch(apiUrl);
  if (!res.ok) return { score: 0, details: [] };
  const data = await res.json();
  const lighthouse = data.lighthouseResult;
  if (!lighthouse || !lighthouse.audits || !lighthouse.categories.performance) {
    return { score: 0, details: [] };
  }
  const audits = lighthouse.audits;
  function safeAudit(key: string) {
    const audit = audits[key];
    return {
      displayValue: (audit && typeof audit.displayValue === 'string') ? audit.displayValue : 'N/A',
      score: (audit && typeof audit.score === 'number') ? audit.score : 0
    };
  }
  return {
    score: Math.round((lighthouse.categories.performance.score || 0) * 100),
    details: [
      {
        criterion: 'First Contentful Paint',
        value: safeAudit('first-contentful-paint').displayValue,
        score: safeAudit('first-contentful-paint').score,
        advice: (safeAudit('first-contentful-paint').score ?? 0) < 0.9 ? 'Improve server response time and optimize critical resources.' : 'Good.'
      },
      {
        criterion: 'Largest Contentful Paint',
        value: safeAudit('largest-contentful-paint').displayValue,
        score: safeAudit('largest-contentful-paint').score,
        advice: (safeAudit('largest-contentful-paint').score ?? 0) < 0.9 ? 'Optimize images and reduce render-blocking resources.' : 'Good.'
      },
      {
        criterion: 'Time to Interactive',
        value: safeAudit('interactive').displayValue,
        score: safeAudit('interactive').score,
        advice: (safeAudit('interactive').score ?? 0) < 0.9 ? 'Reduce JavaScript execution time.' : 'Good.'
      },
      {
        criterion: 'Total Blocking Time',
        value: safeAudit('total-blocking-time').displayValue,
        score: safeAudit('total-blocking-time').score,
        advice: (safeAudit('total-blocking-time').score ?? 0) < 0.9 ? 'Minimize main-thread work.' : 'Good.'
      },
      {
        criterion: 'Cumulative Layout Shift',
        value: safeAudit('cumulative-layout-shift').displayValue,
        score: safeAudit('cumulative-layout-shift').score,
        advice: (safeAudit('cumulative-layout-shift').score ?? 0) < 0.9 ? 'Avoid layout shifts by reserving space for images and ads.' : 'Good.'
      }
    ]
  };
}

// Helper to fetch HTML and run SEO/design checks
async function analyzeSEOAndDesign(url: string) {
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);
  // SEO checks
  const seoDetails = [];
  // Title tag
  const title = $('title').text();
  seoDetails.push({
    criterion: 'Title Tag',
    status: title ? 'ok' : 'missing',
    advice: title ? '' : 'Add a <title> tag for better SEO.'
  });
  // Meta description
  const metaDesc = $('meta[name="description"]').attr('content') || '';
  seoDetails.push({
    criterion: 'Meta Description',
    status: metaDesc ? 'ok' : 'missing',
    advice: metaDesc ? '' : 'Add a meta description for better search visibility.'
  });
  // Canonical tag
  const canonical = $('link[rel="canonical"]').attr('href') || '';
  seoDetails.push({
    criterion: 'Canonical Tag',
    status: canonical ? 'ok' : 'missing',
    advice: canonical ? '' : 'Add a canonical tag to avoid duplicate content.'
  });
  // Headings
  const h1s = $('h1').length;
  seoDetails.push({
    criterion: 'H1 Headings',
    status: h1s === 1 ? 'ok' : h1s === 0 ? 'missing' : 'multiple',
    advice: h1s === 1 ? '' : h1s === 0 ? 'Add a single H1 heading.' : 'Use only one H1 heading per page.'
  });
  // Alt text
  const images = $('img');
  let missingAlt = 0;
  images.each((_, img) => {
    if (!($(img).attr('alt') || '')) missingAlt++;
  });
  seoDetails.push({
    criterion: 'Image Alt Text',
    status: missingAlt === 0 ? 'ok' : 'missing',
    advice: missingAlt === 0 ? '' : `${missingAlt} images are missing alt text.`
  });
  // Open Graph
  const ogTitle = $('meta[property="og:title"]').attr('content') || '';
  seoDetails.push({
    criterion: 'Open Graph Tags',
    status: ogTitle ? 'ok' : 'missing',
    advice: ogTitle ? '' : 'Add Open Graph tags for better social sharing.'
  });
  // Robots.txt and sitemap.xml (check by fetching)
  let robots = false, sitemap = false;
  try {
    robots = (await fetch(url + '/robots.txt')).ok;
  } catch {}
  try {
    sitemap = (await fetch(url + '/sitemap.xml')).ok;
  } catch {}
  seoDetails.push({
    criterion: 'robots.txt',
    status: robots ? 'ok' : 'missing',
    advice: robots ? '' : 'Add a robots.txt file.'
  });
  seoDetails.push({
    criterion: 'sitemap.xml',
    status: sitemap ? 'ok' : 'missing',
    advice: sitemap ? '' : 'Add a sitemap.xml file.'
  });

  // Design Consistency (mocked for now)
  const designDetails = [
    { criterion: 'Color Palette', status: 'ok', advice: 'Consistent color palette detected.' },
    { criterion: 'Font Usage', status: 'ok', advice: 'Font usage is consistent.' },
    { criterion: 'Spacing & Alignment', status: 'improve', advice: 'Some elements have inconsistent spacing.' },
    { criterion: 'Button Styles', status: 'ok', advice: 'Button styles are consistent.' }
  ];

  return { seoDetails, designDetails };
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }
    // Run PageSpeed Insights for speed
    const speed = await runPageSpeedInsights(url);
    // Run SEO and design checks
    const { seoDetails, designDetails } = await analyzeSEOAndDesign(url);
    // Aggregate scores
    const seoScore = Math.round((seoDetails.filter(d => d.status === 'ok').length / seoDetails.length) * 100);
    const designScore = Math.round((designDetails.filter(d => d.status === 'ok').length / designDetails.length) * 100);
    return NextResponse.json({
      speed,
      seo: { score: seoScore, details: seoDetails },
      design: { score: designScore, details: designDetails },
      overall: 'See detailed advice for each category.'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to analyze website.' }, { status: 500 });
  }
} 