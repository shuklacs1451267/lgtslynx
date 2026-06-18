import { useState } from "react";
import { FaGoogle, FaMobileAlt, FaDesktop, FaInfoCircle, FaSync } from "react-icons/fa";

export default function SerpPreviewTool() {
  const [metadata, setMetadata] = useState({
    title: "",
    description: "",
    siteName: "Social Strategy Infotech",
    url: "https://socialstech.com",
  });

  const [view, setView] = useState("desktop");

  const TITLE_LIMIT = 60;
  const DESC_LIMIT = 160;

  const getLengthColor = (len, limit) => {
    if (len === 0) return "bg-slate-200";
    if (len > limit) return "bg-red-500";
    if (len > limit - 10) return "bg-amber-500";
    return "bg-green-500";
  };

  const getTextColor = (len, limit) => {
    if (len > limit) return "text-red-500";
    if (len > limit - 10) return "text-amber-600";
    return "text-green-600";
  };

  const getBreadcrumb = (urlString) => {
    try {
      const safeUrl = urlString.startsWith('http') ? urlString : `https://${urlString}`;
      const urlObj = new URL(safeUrl);

      const domain = urlObj.hostname.replace('www.', '');
      const path = urlObj.pathname === '/' ? '' : urlObj.pathname;

      const breadcrumbPath = path.split('/').filter(p => p).join(' › ');

      return (
        <span className="flex items-center gap-1">
          {domain} {breadcrumbPath && <span className="text-slate-400">›</span>} {breadcrumbPath}
        </span>
      );
    } catch (e) {
      return urlString || "example.com";
    }
  };

  const getFaviconDomain = (urlString) => {
    try {
      const safeUrl = urlString.startsWith('http') ? urlString : `https://${urlString}`;
      return new URL(safeUrl).hostname;
    } catch {
      return "google.com";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden max-w-6xl mx-auto">

      <div className="px-6 py-4 border-b border-slate-100 bg-white flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="font-bold flex items-center gap-2 text-slate-800 text-lg">
          <div className="p-2 bg-amber-50 rounded-lg text-amber-500">
            <FaGoogle />
          </div>
          Google SERP Simulator
        </h3>

        <div className="flex bg-slate-50 rounded-lg p-1 border border-slate-200">
          <button
            onClick={() => setView("desktop")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${view === 'desktop'
                ? 'bg-white text-amber-600 shadow-sm border border-slate-100'
                : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            <FaDesktop size={14} /> Desktop
          </button>
          <button
            onClick={() => setView("mobile")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${view === 'mobile'
                ? 'bg-white text-amber-600 shadow-sm border border-slate-100'
                : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            <FaMobileAlt size={14} /> Mobile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

        <div className="p-6 space-y-5 border-r border-slate-100 bg-white">

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-slate-700">SEO Title</label>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${getTextColor(metadata.title.length, TITLE_LIMIT)} bg-slate-50`}>
                {metadata.title.length} / {TITLE_LIMIT} chars
              </span>
            </div>
            <input
              type="text"
              className="w-full border border-slate-300 p-3 rounded-lg text-sm focus:ring-2 focus:ring-amber-400/50 focus:border-amber-500 outline-none transition-all placeholder:text-slate-400"
              placeholder="e.g. Best SEO Tools for 2025"
              value={metadata.title}
              onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
            />
            <div className="h-1.5 w-full bg-slate-100 mt-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${getLengthColor(metadata.title.length, TITLE_LIMIT)}`}
                style={{ width: `${Math.min((metadata.title.length / TITLE_LIMIT) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-slate-700">Meta Description</label>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${getTextColor(metadata.description.length, DESC_LIMIT)} bg-slate-50`}>
                {metadata.description.length} / {DESC_LIMIT} chars
              </span>
            </div>
            <textarea
              className="w-full border border-slate-300 p-3 rounded-lg text-sm focus:ring-2 focus:ring-amber-400/50 focus:border-amber-500 outline-none transition-all placeholder:text-slate-400"
              rows={4}
              placeholder="e.g. Discover the top rated SEO tools..."
              value={metadata.description}
              onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
            />
            <div className="h-1.5 w-full bg-slate-100 mt-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${getLengthColor(metadata.description.length, DESC_LIMIT)}`}
                style={{ width: `${Math.min((metadata.description.length / DESC_LIMIT) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Site Name</label>
              <input
                type="text"
                className="w-full border border-slate-300 p-3 rounded-lg text-sm focus:ring-2 focus:ring-amber-400/50 focus:border-amber-500 outline-none text-slate-600"
                placeholder="e.g. Tata Consultancy Services"
                value={metadata.siteName}
                onChange={(e) => setMetadata({ ...metadata, siteName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">URL / Permalink</label>
              <input
                type="text"
                className="w-full border border-slate-300 p-3 rounded-lg text-sm focus:ring-2 focus:ring-amber-400/50 focus:border-amber-500 outline-none text-slate-600"
                placeholder="e.g. tcs.com/home"
                value={metadata.url}
                onChange={(e) => setMetadata({ ...metadata, url: e.target.value })}
              />
            </div>
          </div>

          <div className="bg-amber-50 text-amber-800 p-4 rounded-lg text-xs flex gap-3 items-start border border-amber-100">
            <FaInfoCircle className="mt-0.5 text-amber-600 shrink-0 text-sm" />
            <p className="leading-relaxed">
              <strong>Google Display:</strong> Google now shows the Site Name prominently above the URL. Ensure your brand name is clear.
            </p>
          </div>
        </div>

        <div className="p-6 bg-slate-50/50 flex flex-col items-center justify-center border-l border-slate-100 min-h-[400px]">

          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            {view.toUpperCase()} PREVIEW
          </p>

          <div className={`w-full bg-white p-5 rounded-xl shadow-sm border border-slate-200 transition-all duration-300 ${view === 'mobile' ? 'max-w-[375px]' : 'max-w-full'}`}>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden shrink-0">
                <img
                  src={`https://www.google.com/s2/favicons?domain=${getFaviconDomain(metadata.url)}&sz=64`}
                  alt="Favicon"
                  className="w-4 h-4"
                  onError={(e) => e.target.style.opacity = 0}
                />
              </div>

              <div className="flex flex-col leading-tight overflow-hidden">
                <span className="text-[14px] text-[#202124] font-normal truncate">
                  {metadata.siteName || "Site Name"}
                </span>
                <span className="text-[12px] text-[#5f6368] truncate flex items-center gap-1">
                  {getBreadcrumb(metadata.url)}
                </span>
              </div>

              <div className="ml-auto text-slate-400">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
              </div>
            </div>

            <h3 className="text-[20px] leading-snug text-[#1a0dab] hover:underline cursor-pointer font-medium mb-1 break-words font-sans">
              {metadata.title || "Your Page Title Will Appear Here"}
            </h3>

            <p className="text-[14px] leading-6 text-[#4d5156] break-words font-sans">
              {metadata.description || "This is how your description will look on Google. It helps users understand what your page is about before they click."}
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}