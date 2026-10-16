"use client";

import { useEffect, useState, useCallback } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
};

const CACHE_KEY_USER = "gh-user";
const CACHE_KEY_REPOS = "gh-repos";
const CACHE_TTL = 10 * 60 * 1000; // 10 min auto-refresh interval

function getCached<T>(key: string): T | null {
  try {
    if (typeof window === "undefined") return null;
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) {
      sessionStorage.removeItem(key);
      return null;
    }
    return data as T;
  } catch {
    return null;
  }
}

function setCache(key: string, data: unknown) {
  try {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
  } catch {
    // fail silently if quota exceeded
  }
}

function calculateTopLanguage(repoList: GitHubRepo[]): string {
  const counts: Record<string, number> = {};
  for (const r of repoList) {
    if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
  }
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0] ?? "—";
}

export default function GitHubActivity() {
  const [user, setUser] = useState<GitHubUser | null>(() => getCached<GitHubUser>(CACHE_KEY_USER));
  const [repos, setRepos] = useState<GitHubRepo[]>(() => getCached<GitHubRepo[]>(CACHE_KEY_REPOS) || []);
  const [loading, setLoading] = useState<boolean>(() => {
    const cachedUser = getCached<GitHubUser>(CACHE_KEY_USER);
    const cachedRepos = getCached<GitHubRepo[]>(CACHE_KEY_REPOS);
    return !(cachedUser && cachedRepos);
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [topLang, setTopLang] = useState<string>(() => {
    const cachedRepos = getCached<GitHubRepo[]>(CACHE_KEY_REPOS);
    return cachedRepos ? calculateTopLanguage(cachedRepos) : "—";
  });
  const [syncToast, setSyncToast] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadGitHub() {
      const cachedUser = getCached<GitHubUser>(CACHE_KEY_USER);
      const cachedRepos = getCached<GitHubRepo[]>(CACHE_KEY_REPOS);

      if (cachedUser && cachedRepos) {
        return; // Already initialized from state initializer
      }

      try {
        const [userRes, reposRes] = await Promise.all([
          fetch("https://api.github.com/users/amrit-verse"),
          fetch("https://api.github.com/users/amrit-verse/repos?sort=updated&per_page=6"),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error("API error");

        const userData: GitHubUser = await userRes.json();
        const reposData: GitHubRepo[] = await reposRes.json();

        if (isMounted) {
          setUser(userData);
          setRepos(reposData);
          setTopLang(calculateTopLanguage(reposData));
          setCache(CACHE_KEY_USER, userData);
          setCache(CACHE_KEY_REPOS, reposData);
          setError(null);
        }
      } catch {
        if (isMounted) {
          setError("Unable to load GitHub data at this moment.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadGitHub();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleManualSync = useCallback(async () => {
    setIsRefreshing(true);
    try {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(CACHE_KEY_USER);
        sessionStorage.removeItem(CACHE_KEY_REPOS);
      }
      const [userRes, reposRes] = await Promise.all([
        fetch("https://api.github.com/users/amrit-verse"),
        fetch("https://api.github.com/users/amrit-verse/repos?sort=updated&per_page=6"),
      ]);

      if (!userRes.ok || !reposRes.ok) throw new Error("API error");

      const userData: GitHubUser = await userRes.json();
      const reposData: GitHubRepo[] = await reposRes.json();

      setUser(userData);
      setRepos(reposData);
      setTopLang(calculateTopLanguage(reposData));
      setCache(CACHE_KEY_USER, userData);
      setCache(CACHE_KEY_REPOS, reposData);
      setError(null);

      setSyncToast(true);
      setTimeout(() => setSyncToast(false), 2500);
    } catch {
      setError("Unable to refresh GitHub data.");
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  return (
    <section id="github" className="py-16 sm:py-24 md:py-32" aria-labelledby="github-title">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
            <div>
              <p className="section-number mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                08 // REPOSITORIES &amp; LIVE CODE
              </p>
              <h2 id="github-title" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
                GitHub Activity &amp; Live Repositories
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
                Live automated feed connected to <a href="https://github.com/amrit-verse" target="_blank" rel="noopener noreferrer" className="text-zinc-200 hover:text-white hover:underline font-mono">@amrit-verse</a>, syncing recent commits and active repositories.
              </p>
            </div>

            {/* Auto-Updating Live Badge & Manual Refresh Button */}
            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#090c12] border border-zinc-800 text-[0.6875rem] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                Live Sync
              </span>
              <button
                type="button"
                onClick={handleManualSync}
                disabled={isRefreshing}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-lg bg-[#121520] border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white transition-all disabled:opacity-50"
                aria-label="Refresh latest GitHub repositories"
              >
                <svg
                  className={`w-3.5 h-3.5 text-zinc-300 ${isRefreshing ? "animate-spin" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
                <span>{isRefreshing ? "Syncing..." : "Sync Now"}</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Loading Skeleton */}
        {loading && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="glass-card p-5 animate-pulse border border-zinc-800">
                  <div className="h-8 w-16 bg-zinc-800 rounded mb-2" />
                  <div className="h-4 w-24 bg-zinc-800 rounded" />
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="glass-card p-5 animate-pulse border border-zinc-800">
                  <div className="h-5 w-32 bg-zinc-800 rounded mb-3" />
                  <div className="h-4 w-full bg-zinc-800 rounded" />
                  <div className="h-4 w-2/3 bg-zinc-800 rounded mt-2" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="glass-card p-8 text-center border border-zinc-800">
            <p className="text-zinc-400 mb-4">{error}</p>
            <a
              href="https://github.com/amrit-verse"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-white hover:underline font-mono text-sm"
            >
              Visit GitHub Profile (@amrit-verse) →
            </a>
          </div>
        )}

        {/* Loaded State */}
        {!loading && !error && user && (
          <>
            <ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
                {[
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-emerald-400" aria-hidden="true">
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                      </svg>
                    ),
                    iconBg: "bg-emerald-500/10 border-emerald-500/20",
                    value: user.public_repos,
                    label: "Public Repositories",
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-emerald-400" aria-hidden="true">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    ),
                    iconBg: "bg-emerald-500/10 border-emerald-500/20",
                    value: topLang,
                    label: "Primary Language",
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-emerald-400" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    ),
                    iconBg: "bg-emerald-500/10 border-emerald-500/20",
                    value: (() => {
                      const langs = new Set(repos.map(r => r.language).filter(Boolean));
                      return langs.size;
                    })(),
                    label: "Distinct Languages",
                  },
                ].map((stat) => (
                  <div key={stat.label} className="glass-card p-4 sm:p-5 text-center border border-zinc-800 hover:border-zinc-700 transition-all">
                    <div className={`w-10 h-10 mx-auto mb-2.5 rounded-lg border flex items-center justify-center ${stat.iconBg}`}>{stat.icon}</div>
                    <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">{stat.value}</div>
                    <div className="text-xs font-mono text-zinc-400 mt-1 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {repos.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card p-5 block group border border-zinc-800/80 hover:border-zinc-700"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm sm:text-base font-semibold text-white group-hover:text-zinc-200 transition-colors truncate pr-2">
                        {repo.name}
                      </h4>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-zinc-500 group-hover:text-zinc-200 transition-colors shrink-0" aria-hidden="true">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 mb-3 min-h-[2.5rem] leading-relaxed">
                      {repo.description || "Personal repository / open-source utility."}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-zinc-400 font-mono">
                      {repo.language && (
                        <span className="flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: LANG_COLORS[repo.language] || "#8b95a5" }}
                            aria-hidden="true"
                          />
                          {repo.language}
                        </span>
                      )}
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1 text-amber-300">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-amber-400" aria-hidden="true">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                          {repo.stargazers_count}
                        </span>
                      )}
                      {repo.forks_count > 0 && (
                        <span className="flex items-center gap-1">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true">
                            <circle cx="12" cy="18" r="3" />
                            <circle cx="6" cy="6" r="3" />
                            <circle cx="18" cy="6" r="3" />
                            <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" />
                            <line x1="12" y1="12" x2="12" y2="15" />
                          </svg>
                          {repo.forks_count}
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </>
        )}
      </div>

      {/* Sync Toast Feedback */}
      <div
        className={`toast ${syncToast ? "toast-visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span>Live repository data synchronized with GitHub!</span>
      </div>
    </section>
  );
}
