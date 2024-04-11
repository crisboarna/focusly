import { DomainProps } from "@/utils/storage.ts";

export function getUrlVariations(url?: string): string[] {
  if (!url || url === "about:blank" || url.startsWith("chrome-extension://")) {
    return [];
  }

  try {
    new URL(url);
  } catch (e) {
    // Invalid URL
    return [];
  }

  const hostname = new URL(url).hostname;

  if (hostname === 'localhost') {
    return ['localhost'];
  }

  const parts = hostname.split(".");
  const variations = [];

  for (let i = parts.length - 2; i >= 0; i--) {
    if (parts[i] === "www") continue;
    const domain = parts.slice(i).join(".");
    variations.push(`*.${domain}`, domain);
  }

  return variations;
}

export const urlMatches = (domains: DomainProps[]) => {
  // get the current URL
  const currentUrl = new URL(window.location.href);
  // filter the domains to find the one that matches the current URL if any
  return domains.filter((domain) => {
    const domainRegex = new RegExp(
      `^${domain.domain.replace(".", "\\.").replace("*", ".*")}$`,
    );
    return domainRegex.test(currentUrl.hostname);
  });
};
