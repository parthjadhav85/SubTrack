export type PopularService = {
  name: string;
  domain: string;
  category: string;
};

export const POPULAR_SERVICES: PopularService[] = [
  { name: "Netflix", domain: "netflix.com", category: "Entertainment" },
  { name: "Amazon Prime", domain: "primevideo.com", category: "Entertainment" },
  { name: "Spotify", domain: "spotify.com", category: "Music" },
  { name: "YouTube Premium", domain: "youtube.com", category: "Entertainment" },
  { name: "Disney+", domain: "disneyplus.com", category: "Entertainment" },
  { name: "Apple Music", domain: "apple.com", category: "Music" },
  { name: "ChatGPT", domain: "openai.com", category: "Productivity" },
  { name: "Notion", domain: "notion.so", category: "Productivity" },
  { name: "Canva", domain: "canva.com", category: "Productivity" },
  { name: "Adobe Creative Cloud", domain: "adobe.com", category: "Productivity" },
  { name: "Microsoft 365", domain: "microsoft.com", category: "Productivity" },
  { name: "Google One", domain: "one.google.com", category: "Cloud Storage" },
  { name: "Dropbox", domain: "dropbox.com", category: "Cloud Storage" },
  { name: "iCloud+", domain: "icloud.com", category: "Cloud Storage" },
  { name: "LinkedIn Premium", domain: "linkedin.com", category: "Other" },
  { name: "X Premium", domain: "x.com", category: "Other" },
  { name: "Coursera", domain: "coursera.org", category: "Education" },
  { name: "Duolingo", domain: "duolingo.com", category: "Education" },
  { name: "Xbox Game Pass", domain: "xbox.com", category: "Gaming" },
  { name: "PlayStation Plus", domain: "playstation.com", category: "Gaming" },
  { name: "Hotstar", domain: "hotstar.com", category: "Entertainment" },
  { name: "JioCinema", domain: "jiocinema.com", category: "Entertainment" },
  { name: "Zomato", domain: "zomato.com", category: "Other" },
  { name: "Swiggy One", domain: "swiggy.com", category: "Other" },
];

export function getServiceLogo(domain: string) {
  // Free favicon fallback (works without API key)
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}