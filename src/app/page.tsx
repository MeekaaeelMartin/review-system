"use client";
import React, { useState, useRef, useEffect } from "react";

const ACCENT = "from-blue-500 via-purple-500 to-fuchsia-500";

// Ultra-premium SVG icons for tabs
function PremiumWebsiteIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="webIconBg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#e0e7ff" />
          <stop offset="100%" stopColor="#6366f1" />
        </radialGradient>
        <linearGradient id="webIconStroke" x1="0" y1="0" x2="28" y2="28">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#e879f9" />
        </linearGradient>
      </defs>
      <circle cx="14" cy="14" r="12" fill="url(#webIconBg)" />
      <ellipse cx="14" cy="14" rx="7" ry="12" stroke="url(#webIconStroke)" strokeWidth="2" fill="none" filter="url(#shadow)" />
      <path d="M7 14h14" stroke="url(#webIconStroke)" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="14" cy="14" rx="12" ry="12" stroke="#fff" strokeWidth="1.2" fill="none" opacity="0.7" />
      <filter id="shadow" x="-10" y="-10" width="48" height="48">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#a5b4fc" floodOpacity="0.18" />
      </filter>
    </svg>
  );
}
function PremiumDesignIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="designIconBg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#f3e8ff" />
          <stop offset="100%" stopColor="#a21caf" />
        </radialGradient>
        <linearGradient id="designIconStroke" x1="0" y1="0" x2="28" y2="28">
          <stop stopColor="#a21caf" />
          <stop offset="1" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="20" height="20" rx="6" fill="url(#designIconBg)" />
      <rect x="4" y="4" width="20" height="20" rx="6" stroke="url(#designIconStroke)" strokeWidth="2" fill="none" />
      <path d="M9 9l10 10" stroke="url(#designIconStroke)" strokeWidth="2" strokeLinecap="round" />
      <path d="M19 9l-10 10" stroke="url(#designIconStroke)" strokeWidth="2" strokeLinecap="round" />
      <rect x="4" y="4" width="20" height="20" rx="6" stroke="#fff" strokeWidth="1.2" fill="none" opacity="0.7" />
    </svg>
  );
}

export default function HomePage() {
  const [tab, setTab] = useState<'review' | 'compare'>('review');
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f0f4ff] to-[#e0e7ff] dark:from-zinc-950 dark:to-zinc-900 transition-colors duration-500 overflow-x-hidden relative">
      {/* Main Content with centered bubble background */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-2 sm:px-4 py-8 sm:py-10 flex flex-col items-center relative z-10">
        <div className="relative w-full flex flex-col items-center justify-center">
          {/* Centered, visually balanced animated SVG Bubble behind content */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[700px] h-[400px] opacity-80 blur-[70px] animate-fade-in -z-10">
            <svg viewBox="0 0 1100 700" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <radialGradient id="bubbleGlow" cx="50%" cy="32%" r="70%">
                  <stop offset="0%" stopColor="#e0e7ff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.18" />
                </radialGradient>
                <linearGradient id="bubbleGrad" x1="0" y1="0" x2="1100" y2="700" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366f1" />
                  <stop offset="0.5" stopColor="#a21caf" />
                  <stop offset="1" stopColor="#e879f9" />
                </linearGradient>
              </defs>
              <ellipse cx="550" cy="220" rx="500" ry="180" fill="url(#bubbleGlow)" />
              <path>
                <animate attributeName="d" dur="12s" repeatCount="indefinite"
                  values="M 550 50 Q 900 100 950 220 Q 1000 340 550 380 Q 100 340 150 220 Q 200 100 550 50 Z;
                          M 550 100 Q 1000 150 900 300 Q 800 500 550 380 Q 300 500 200 300 Q 100 150 550 100 Z;
                          M 550 50 Q 900 100 950 220 Q 1000 340 550 380 Q 100 340 150 220 Q 200 100 550 50 Z" />
              </path>
              <path d="M 550 50 Q 900 100 950 220 Q 1000 340 550 380 Q 100 340 150 220 Q 200 100 550 50 Z" fill="url(#bubbleGrad)" />
            </svg>
          </div>
          {/* Tabs */}
          <div className="relative flex gap-2 mb-10 w-full max-w-md animate-fade-in">
            <button
              className={`flex-1 px-4 py-2 font-semibold text-lg rounded-t-lg transition-colors duration-200 ${tab === 'review' ? 'bg-white dark:bg-zinc-900 shadow text-blue-600 dark:text-fuchsia-400' : 'bg-zinc-100/60 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-300'} ripple flex items-center justify-center gap-2`}
              onClick={e => { createRipple(e); setTab('review'); }}
            >
              <PremiumWebsiteIcon />
              <span className="inline-block transition-transform duration-300" style={{transform: tab === 'review' ? 'scale(1.1)' : 'scale(1)'}}>Website Review</span>
            </button>
            <button
              className={`flex-1 px-4 py-2 font-semibold text-lg rounded-t-lg transition-colors duration-200 ${tab === 'compare' ? 'bg-white dark:bg-zinc-900 shadow text-blue-600 dark:text-fuchsia-400' : 'bg-zinc-100/60 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-300'} ripple flex items-center justify-center gap-2`}
              onClick={e => { createRipple(e); setTab('compare'); }}
            >
              <PremiumDesignIcon />
              <span className="inline-block transition-transform duration-300" style={{transform: tab === 'compare' ? 'scale(1.1)' : 'scale(1)'}}>Compare to Design</span>
            </button>
            <span className={`absolute bottom-0 left-0 h-1 w-1/2 rounded transition-all duration-500 bg-gradient-to-r ${ACCENT} shadow-lg animate-gradient-move`} style={{transform: tab === 'review' ? 'translateX(0%)' : 'translateX(100%)', boxShadow: '0 2px 12px 0 #a5b4fc55'}} />
          </div>
          {/* Divider */}
          <div className="w-full h-1 mb-8 bg-gradient-to-r from-blue-200 via-purple-200 to-fuchsia-200 rounded-full opacity-60 animate-fade-in" />
          {/* Tab Content */}
          <div className="w-full animate-fade-in">
            {tab === 'review' ? <WebsiteReviewTab /> : <CompareToDesignTab />}
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="w-full text-center py-4 text-sm text-zinc-500 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md animate-fade-in relative z-10">
        <span>© {new Date().getFullYear()} Reviewly &middot; <a href="#" className="underline">About</a> &middot; <a href="#" className="underline">Contact</a> &middot; <a href="#" className="underline">GitHub</a></span>
      </footer>
    </div>
  );
}

// Ripple effect for buttons
function createRipple(event: React.MouseEvent) {
  const button = event.currentTarget as HTMLElement;
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
  circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
  circle.className = 'ripple-effect';
  button.appendChild(circle);
  setTimeout(() => {
    circle.remove();
  }, 600);
}

// Define types for the review result
interface ReviewDetail {
  criterion: string;
  value?: string;
  status?: string;
  advice?: string;
}
interface ReviewResult {
  speed: { score: number; details: ReviewDetail[] };
  seo: { score: number; details: ReviewDetail[] };
  design: { score: number; details: ReviewDetail[] };
  overall: string;
}

function WebsiteReviewTab() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(60);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setCountdown(60);
    if (countdownRef.current) clearInterval(countdownRef.current);
    countdownRef.current = setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    try {
      const res = await fetch("/api/website-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to analyze website.");
    } finally {
      setLoading(false);
      if (countdownRef.current) clearInterval(countdownRef.current);
    }
  }

  useEffect(() => {
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  return (
    <div className="bg-white/80 dark:bg-zinc-900/80 rounded-2xl shadow-xl p-8 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 transition-all animate-slide-in">
      <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent animate-gradient-move animate-fade-in">Website Review</h2>
      <p className="mb-6 text-zinc-500 dark:text-zinc-400 animate-fade-in">Enter a website URL to get a detailed review and improvement advice.</p>
      <form className="flex gap-2 mb-8 animate-fade-in" onSubmit={handleSubmit}>
        <span className="inline-flex items-center px-3 rounded-l-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-400 text-lg">🔗</span>
        <input
          type="url"
          placeholder="https://example.com"
          className="flex-1 px-4 py-2 rounded-r-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none glow-focus text-lg transition-all"
          required
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <button type="submit" className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500 text-white font-bold shadow hover:scale-105 active:scale-95 transition-transform focus:glow-focus ripple" disabled={loading}>
          {loading ? "Reviewing..." : "Review"}
        </button>
      </form>
      {loading && (
        <div className="flex flex-col items-center justify-center my-8 animate-fade-in">
          <div className="w-16 h-16 mb-4 relative">
            <span className="absolute inset-0 rounded-full border-4 border-blue-400 border-t-fuchsia-500 animate-spin" style={{ borderTopColor: '#a21caf' }}></span>
            <span className="absolute inset-0 rounded-full border-4 border-blue-200 opacity-30"></span>
          </div>
          <div className="text-lg font-semibold text-blue-600 dark:text-fuchsia-400 animate-pulse">Reviewing… <span className="font-mono">{countdown}s</span> left</div>
          <div className="text-sm text-zinc-400 mt-1">(Analysis may take up to 1 minute for detailed results)</div>
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 animate-fade-in">{error}</div>
      )}
      {result && (
        <div className="space-y-4 animate-fade-in">
          <ResultCard title="⚡ Speed & Performance" score={result.speed.score} details={result.speed.details} detailedType="speed" />
          <ResultCard title="🔍 SEO" score={result.seo.score} details={result.seo.details} detailedType="seo" />
          <ResultCard title="🎨 Design Consistency" score={result.design.score} details={result.design.details} detailedType="design" />
          <ResultCard title="💡 Other Recommendations" advice={result.overall} />
        </div>
      )}
      {!result && !loading && !error && (
        <div className="space-y-4 animate-fade-in">
          <ResultCard title="⚡ Speed & Performance" />
          <ResultCard title="🔍 SEO" />
          <ResultCard title="🎨 Design Consistency" />
          <ResultCard title="💡 Other Recommendations" />
        </div>
      )}
    </div>
  );
}

function CompareToDesignTab() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<null | { numDiffPixels: number; diffImgBase64: string; advice: string; error?: string }>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      setFile(e.target.files[0]);
      setTimeout(() => setUploading(false), 800); // Simulate quick upload feedback
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file || !url) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append('url', url);
      formData.append('file', file);
      const res = await fetch('/api/compare-design', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unknown error');
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to compare design.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white/80 dark:bg-zinc-900/80 rounded-2xl shadow-xl p-8 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 transition-all animate-slide-in">
      <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent animate-gradient-move animate-fade-in">Compare Website to Design</h2>
      <p className="mb-6 text-zinc-500 dark:text-zinc-400 animate-fade-in">Enter a website URL and upload your design PDF to compare and get improvement advice.</p>
      <form className="flex flex-col gap-3 mb-8 animate-fade-in" onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <span className="inline-flex items-center px-3 rounded-l-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-400 text-lg">🔗</span>
          <input
            type="url"
            placeholder="https://example.com"
            className="flex-1 px-4 py-2 rounded-r-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none glow-focus text-lg transition-all"
            required
            value={url}
            onChange={e => setUrl(e.target.value)}
            disabled={loading || uploading}
          />
        </div>
        <div
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition-all ${dragActive ? 'border-fuchsia-500 bg-fuchsia-50/40 dark:bg-fuchsia-900/20' : 'border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800'}`}
          onClick={() => fileInput.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={e => { e.preventDefault(); setDragActive(false); }}
          onDrop={e => { e.preventDefault(); setDragActive(false); if (e.dataTransfer.files && e.dataTransfer.files[0]) { setUploading(true); setFile(e.dataTransfer.files[0]); setTimeout(() => setUploading(false), 800); } }}
        >
          <input
            ref={fileInput}
            type="file"
            accept="application/pdf"
            className="hidden"
            required
            onChange={handleFileChange}
            disabled={loading || uploading}
          />
          {uploading ? (
            <div className="flex flex-col items-center">
              <span className="w-10 h-10 mb-2 border-4 border-blue-400 border-t-fuchsia-500 rounded-full animate-spin"></span>
              <span className="text-zinc-400 text-sm">Uploading PDF…</span>
            </div>
          ) : file ? (
            <span className="text-green-600 dark:text-green-400 font-medium mb-2">{file.name}</span>
          ) : (
            <span className="text-4xl mb-2 animate-fade-in">📄</span>
          )}
          <span className="font-medium text-zinc-500 dark:text-zinc-400 animate-fade-in">Drag & drop PDF or <span className="underline text-blue-600 dark:text-fuchsia-400">click to upload</span></span>
        </div>
        <button type="submit" className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500 text-white font-bold shadow hover:scale-105 active:scale-95 transition-transform mt-2 focus:glow-focus ripple" disabled={loading || uploading || !file || !url}>
          {loading ? 'Comparing…' : 'Compare'}
        </button>
      </form>
      {loading && (
        <div className="flex flex-col items-center justify-center my-8 animate-fade-in">
          <div className="w-16 h-16 mb-4 relative">
            <span className="absolute inset-0 rounded-full border-4 border-blue-400 border-t-fuchsia-500 animate-spin" style={{ borderTopColor: '#a21caf' }}></span>
            <span className="absolute inset-0 rounded-full border-4 border-blue-200 opacity-30"></span>
          </div>
          <div className="text-lg font-semibold text-blue-600 dark:text-fuchsia-400 animate-pulse">Comparing design and website…</div>
          <div className="text-sm text-zinc-400 mt-1">(This may take up to 1 minute for detailed visual analysis)</div>
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 animate-fade-in">{error}</div>
      )}
      {result && !loading && !error && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-5 rounded-xl bg-gradient-to-br from-white/90 to-blue-50/60 dark:from-zinc-900/90 dark:to-zinc-800/60 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-lg transition-shadow animate-fade-in">
            <span className="font-semibold text-lg bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-sm">🖼️ Visual Comparison</span>
            <div className="mt-3 flex flex-col items-center">
              <img
                src={`data:image/png;base64,${result.diffImgBase64}`}
                alt="Visual diff"
                className="rounded-lg border border-zinc-200 dark:border-zinc-800 shadow max-w-full max-h-96"
              />
              <div className="mt-2 text-zinc-500 dark:text-zinc-400 text-sm">Highlighted areas show differences between your design and the website.</div>
            </div>
          </div>
          <div className="p-5 rounded-xl bg-gradient-to-br from-white/90 to-blue-50/60 dark:from-zinc-900/90 dark:to-zinc-800/60 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-lg transition-shadow animate-fade-in">
            <span className="font-semibold text-lg bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-sm">❗ Inconsistencies</span>
            <div className="mt-2 text-zinc-700 dark:text-zinc-300 animate-fade-in">{result.numDiffPixels > 1000 ? 'Significant differences detected. Review the highlighted areas in the image above.' : 'No major inconsistencies detected.'}</div>
          </div>
          <div className="p-5 rounded-xl bg-gradient-to-br from-white/90 to-blue-50/60 dark:from-zinc-900/90 dark:to-zinc-800/60 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-lg transition-shadow animate-fade-in">
            <span className="font-semibold text-lg bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-sm">💡 Advice to Match Design</span>
            <div className="mt-2 text-zinc-700 dark:text-zinc-300 animate-fade-in">{result.advice}</div>
          </div>
        </div>
      )}
      {!result && !loading && !error && (
        <div className="space-y-4 animate-fade-in">
          <ResultCard title="🖼️ Visual Comparison" />
          <ResultCard title="❗ Inconsistencies" />
          <ResultCard title="💡 Advice to Match Design" />
        </div>
      )}
    </div>
  );
}

const DETAILED_EXPLANATIONS: Record<string, Record<string, { what: string; why: string; how: string }>> = {
  speed: {
    'First Contentful Paint': {
      what: 'Time until the first text or image is painted.',
      why: 'A fast FCP helps users feel your site is loading quickly.',
      how: 'Reduce server response times, optimize CSS, and prioritize above-the-fold content.'
    },
    'Largest Contentful Paint': {
      what: 'Time until the largest text or image is painted.',
      why: 'A fast LCP means your main content loads quickly.',
      how: 'Optimize images, use efficient caching, and minimize render-blocking resources.'
    },
    'Time to Interactive': {
      what: 'Time until the page is fully interactive.',
      why: 'A low TTI means users can use your site sooner.',
      how: 'Reduce JavaScript execution time and avoid long tasks.'
    },
    'Total Blocking Time': {
      what: 'Total time the main thread was blocked.',
      why: 'Lower TBT means your site responds faster to input.',
      how: 'Break up long tasks, optimize JS, and use web workers.'
    },
    'Cumulative Layout Shift': {
      what: 'How much the page layout shifts during load.',
      why: 'Low CLS prevents annoying jumps as content loads.',
      how: 'Always set size attributes for images and ads, avoid inserting content above existing content.'
    }
  },
  seo: {
    'Title Tag': {
      what: 'The <title> element in the page <head>.',
      why: 'A descriptive title improves SEO and click-through rates.',
      how: 'Add a unique, relevant <title> for each page.'
    },
    'Meta Description': {
      what: 'The meta description in the page <head>.',
      why: 'Helps search engines and users understand your page.',
      how: 'Add a concise, relevant meta description for each page.'
    },
    'Canonical Tag': {
      what: 'A <link rel="canonical"> tag in the <head>.',
      why: 'Prevents duplicate content issues.',
      how: 'Add a canonical tag pointing to the preferred URL.'
    },
    'H1 Headings': {
      what: 'The main heading(s) on the page.',
      why: 'Clear heading structure helps SEO and accessibility.',
      how: 'Use a single, descriptive H1 per page.'
    },
    'Image Alt Text': {
      what: 'The alt attribute on <img> tags.',
      why: 'Improves accessibility and SEO.',
      how: 'Add descriptive alt text to all images.'
    },
    'Open Graph Tags': {
      what: 'Meta tags for social sharing.',
      why: 'Improves how your site looks when shared on social media.',
      how: 'Add Open Graph meta tags for title, description, and image.'
    },
    'robots.txt': {
      what: 'A file that tells search engines which pages to crawl.',
      why: 'Controls search engine access to your site.',
      how: 'Add a robots.txt file at the root of your site.'
    },
    'sitemap.xml': {
      what: 'A file listing all important pages for search engines.',
      why: 'Helps search engines discover and index your pages.',
      how: 'Add a sitemap.xml file at the root of your site.'
    }
  },
  design: {
    'Color Palette': {
      what: 'The set of colors used on your site.',
      why: 'Consistent colors create a professional look.',
      how: 'Use a limited, harmonious set of colors throughout your site.'
    },
    'Font Usage': {
      what: 'The fonts and font sizes used.',
      why: 'Consistent fonts improve readability and brand identity.',
      how: 'Limit the number of fonts and use consistent sizes.'
    },
    'Spacing & Alignment': {
      what: 'The spacing and alignment of elements.',
      why: 'Consistent spacing makes your site easier to scan.',
      how: 'Use a spacing scale and align elements to a grid.'
    },
    'Button Styles': {
      what: 'The appearance of buttons.',
      why: 'Consistent buttons improve usability.',
      how: 'Use a consistent style for all buttons.'
    }
  }
};

function ResultCard({ title, score, advice, details, detailedType }: { title: string; score?: number; advice?: string; details?: ReviewDetail[]; detailedType?: 'speed' | 'seo' | 'design' }) {
  const [open, setOpen] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className="p-5 rounded-xl bg-gradient-to-br from-white/90 to-blue-50/60 dark:from-zinc-900/90 dark:to-zinc-800/60 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-lg transition-shadow animate-fade-in">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setOpen(o => !o)}>
        <span className="font-semibold text-lg animate-gradient-move animate-fade-in bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-sm">{title}</span>
        {typeof score === "number" && (
          <span className="ml-2 text-xl font-bold text-blue-600 dark:text-fuchsia-400 animate-fade-in">{score}/100</span>
        )}
        {details && (
          <span className="ml-2 text-zinc-400 text-lg select-none">{open ? '▲' : '▼'}</span>
        )}
      </div>
      {advice && (
        <div className="mt-2 text-zinc-700 dark:text-zinc-300 animate-fade-in">{advice}</div>
      )}
      {details && open && (
        <>
          <ul className="mt-3 space-y-2">
            {details.map((d, i) => (
              <li key={i} className="p-3 rounded-lg bg-white/80 dark:bg-zinc-900/80 border border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center gap-2 shadow-sm">
                <span className="font-medium min-w-[120px] text-zinc-700 dark:text-zinc-200">{d.criterion}</span>
                {d.value && <span className="text-blue-600 dark:text-fuchsia-400 font-mono text-sm">{d.value}</span>}
                {d.status && <span className={`text-xs px-2 py-1 rounded ${d.status === 'ok' ? 'bg-green-100 text-green-700' : d.status === 'missing' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'} dark:${d.status === 'ok' ? 'bg-green-900/30 text-green-300' : d.status === 'missing' ? 'bg-red-900/30 text-red-300' : 'bg-yellow-900/30 text-yellow-300'}`}>{d.status}</span>}
                <span className="text-zinc-500 dark:text-zinc-400 text-sm flex-1">{d.advice}</span>
              </li>
            ))}
          </ul>
          {detailedType && (
            <button
              className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500 text-white font-semibold shadow hover:scale-105 active:scale-95 transition-transform focus:glow-focus ripple"
              onClick={() => setShowDetails(s => !s)}
              type="button"
            >
              {showDetails ? 'Hide detailed analysis' : 'Get a more detailed analysis'}
            </button>
          )}
          {showDetails && detailedType && (
            <div className="mt-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-inner animate-fade-in">
              <h4 className="font-bold text-lg mb-2 text-blue-600 dark:text-fuchsia-400">Every detail & how to fix</h4>
              <ul className="space-y-3">
                {details.map((d, i) => {
                  const explain = DETAILED_EXPLANATIONS[detailedType]?.[d.criterion] || {};
                  return (
                    <li key={i} className="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex flex-col gap-1 shadow-sm">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-zinc-700 dark:text-zinc-200">{d.criterion}</span>
                        {d.value && <span className="text-blue-600 dark:text-fuchsia-400 font-mono text-xs">{d.value}</span>}
                        {d.status && <span className={`text-xs px-2 py-1 rounded ${d.status === 'ok' ? 'bg-green-100 text-green-700' : d.status === 'missing' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'} dark:${d.status === 'ok' ? 'bg-green-900/30 text-green-300' : d.status === 'missing' ? 'bg-red-900/30 text-red-300' : 'bg-yellow-900/30 text-yellow-300'}`}>{d.status}</span>}
                      </div>
                      {explain.what && <div className="text-zinc-600 dark:text-zinc-300 text-sm mt-1"><b>What:</b> {explain.what}</div>}
                      {explain.why && <div className="text-zinc-600 dark:text-zinc-300 text-sm"><b>Why:</b> {explain.why}</div>}
                      {explain.how && <div className="text-blue-700 dark:text-fuchsia-400 text-sm"><b>How to fix:</b> {explain.how}</div>}
                      {d.advice && <div className="text-zinc-500 dark:text-zinc-400 text-xs italic mt-1">Advice: {d.advice}</div>}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </>
      )}
      {!advice && !details && (
        <div className="mt-2 text-zinc-400 italic animate-fade-in">(results will appear here)</div>
      )}
    </div>
  );
}
