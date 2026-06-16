"use client";

import { useEffect, useState } from "react";
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
const CACHE_TTL = 30 * 60 * 1000; // 30 min

function getCached<T>(key: string): T | null {
  try {
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
    sessionStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
  } catch {
    // quota exceeded — fail silently
  }
}

export default function GitHubActivity() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [topLang, setTopLang] = useState<string>("—");

  useEffect(() => {
    async function fetchGitHub() {
      // Try cache first
      const cachedUser = getCached<GitHubUser>(CACHE_KEY_USER);
      const cachedRepos = getCached<GitHubRepo[]>(CACHE_KEY_REPOS);

      if (cachedUser && cachedRepos) {
        setUser(cachedUser);
        setRepos(cachedRepos);
        computeTopLang(cachedRepos);
        setLoading(false);
        return;
      }

      try {
        const [userRes, reposRes] = await Promise.all([
          fetch("https://api.github.com/users/amrit-verse"),
          fetch("https://api.github.com/users/amrit-verse/repos?sort=updated&per_page=6"),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error("API error");

        const userData: GitHubUser = await userRes.json();
        const reposData: GitHubRepo[] = await reposRes.json();

        setUser(userData);
        setRepos(reposData);
        computeTopLang(reposData);

        setCache(CACHE_KEY_USER, userData);
        setCache(CACHE_KEY_REPOS, reposData);
      } catch {
        setError("Unable to load GitHub data.");
      } finally {
        setLoading(false);
      }
    }

    function computeTopLang(repoList: GitHubRepo[]) {
      const counts: Record<string, number> = {};
      for (const r of repoList) {
        if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
      }
      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      setTopLang(sorted[0]?.[0] ?? "—");
    }

    fetchGitHub();
  }, []);

  return (
    <section id="github" className="py-16 sm:py-24 md:py-32" aria-labelledby="github-title">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="mb-8 sm:mb-12">
            <span className="section-number">08</span>
            <h2 id="github-title" className="font-bold mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw + 0.5rem, 2.25rem)' }}>
              GitHub Activity
            </h2>
            <p className="text-text-secondary max-w-2xl">
              Consistent open-source contributions, daily learning, and active project development.
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-accent-blue to-accent-purple mt-4" />
          </div>
        </ScrollReveal>

        {/* Loading Skeleton */}
        {loading && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="glass-card p-5 animate-pulse">
                  <div className="h-8 w-16 bg-bg-tertiary rounded mb-2" />
                  <div className="h-4 w-24 bg-bg-tertiary rounded" />
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="glass-card p-5 animate-pulse">
                  <div className="h-5 w-32 bg-bg-tertiary rounded mb-3" />
                  <div className="h-4 w-full bg-bg-tertiary rounded" />
                  <div className="h-4 w-2/3 bg-bg-tertiary rounded mt-2" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="glass-card p-8 text-center">
            <p className="text-text-secondary mb-4">{error}</p>
            <a
              href="https://github.com/amrit-verse"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-blue hover:underline"
            >
              Visit GitHub Profile →
            </a>
          </div>
        )}

        {/* Loaded State */}
        {!loading && !error && user && (
          <>
            <ScrollReveal>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {[
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                      </svg>
                    ),
                    value: user.public_repos,
                    label: "Public Repos",
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    ),
                    value: topLang,
                    label: "Top Language",
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    ),
                    value: (() => {
                      const langs = new Set(repos.map(r => r.language).filter(Boolean));
                      return langs.size;
                    })(),
                    label: "Languages Used",
                  },
                ].map((stat) => (
                  <div key={stat.label} className="glass-card p-5 text-center">
                    <div className="w-8 h-8 mx-auto mb-2 text-accent-blue">{stat.icon}</div>
                    <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
                    <div className="text-xs text-text-secondary mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {repos.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card p-5 block group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-base font-semibold text-text-primary group-hover:text-accent-blue transition-colors truncate pr-2">
                        {repo.name}
                      </h4>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-text-tertiary group-hover:text-accent-blue transition-colors shrink-0" aria-hidden="true">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </div>
                    <p className="text-sm text-text-secondary line-clamp-2 mb-3 min-h-[2.5rem]">
                      {repo.description || "No description"}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-text-tertiary">
                      {repo.language && (
                        <span className="flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: LANG_COLORS[repo.language] || "#8b95a5" }}
                            aria-hidden="true"
                          />
                          {repo.language}
                        </span>
                      )}
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5" aria-hidden="true">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                          {repo.stargazers_count}
                        </span>
                      )}
                      {repo.forks_count > 0 && (
                        <span className="flex items-center gap-1">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
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
    </section>
  );
}
