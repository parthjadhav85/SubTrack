export type PopularService = {
  name: string;
  domain: string;
  category: string;
};

export const CATEGORIES = [
  "All",
  "Entertainment",
  "Music",
  "Productivity",
  "Cloud Storage",
  "Education",
  "Utilities",
  "Health & Fitness",
  "News",
  "Gaming",
  "Shopping",
  "Finance",
  "Dating",
  "Other",
] as const;

export const POPULAR_SERVICES: PopularService[] = [
  // Entertainment
  { name: "Netflix", domain: "netflix.com", category: "Entertainment" },
  { name: "Amazon Prime Video", domain: "primevideo.com", category: "Entertainment" },
  { name: "Disney+", domain: "disneyplus.com", category: "Entertainment" },
  { name: "YouTube Premium", domain: "youtube.com", category: "Entertainment" },
  { name: "Hulu", domain: "hulu.com", category: "Entertainment" },
  { name: "HBO Max", domain: "max.com", category: "Entertainment" },
  { name: "Apple TV+", domain: "tv.apple.com", category: "Entertainment" },
  { name: "Paramount+", domain: "paramountplus.com", category: "Entertainment" },
  { name: "Peacock", domain: "peacocktv.com", category: "Entertainment" },
  { name: "Hotstar", domain: "hotstar.com", category: "Entertainment" },
  { name: "JioCinema", domain: "jiocinema.com", category: "Entertainment" },
  { name: "SonyLIV", domain: "sonyliv.com", category: "Entertainment" },
  { name: "Zee5", domain: "zee5.com", category: "Entertainment" },
  { name: "Crunchyroll", domain: "crunchyroll.com", category: "Entertainment" },
  { name: "Twitch Turbo", domain: "twitch.tv", category: "Entertainment" },

  // Music
  { name: "Spotify", domain: "spotify.com", category: "Music" },
  { name: "Apple Music", domain: "music.apple.com", category: "Music" },
  { name: "Amazon Music", domain: "music.amazon.com", category: "Music" },
  { name: "YouTube Music", domain: "music.youtube.com", category: "Music" },
  { name: "Tidal", domain: "tidal.com", category: "Music" },
  { name: "Deezer", domain: "deezer.com", category: "Music" },
  { name: "Gaana", domain: "gaana.com", category: "Music" },
  { name: "JioSaavn", domain: "jiosaavn.com", category: "Music" },
  { name: "SoundCloud Go", domain: "soundcloud.com", category: "Music" },
  { name: "Audible", domain: "audible.com", category: "Music" },

  // Productivity
  { name: "ChatGPT / OpenAI", domain: "openai.com", category: "Productivity" },
  { name: "Claude", domain: "claude.ai", category: "Productivity" },
  { name: "Gemini Advanced", domain: "gemini.google.com", category: "Productivity" },
  { name: "Microsoft 365", domain: "microsoft.com", category: "Productivity" },
  { name: "Google One AI", domain: "one.google.com", category: "Productivity" },
  { name: "Notion", domain: "notion.so", category: "Productivity" },
  { name: "Canva Pro", domain: "canva.com", category: "Productivity" },
  { name: "Adobe Creative Cloud", domain: "adobe.com", category: "Productivity" },
  { name: "Figma", domain: "figma.com", category: "Productivity" },
  { name: "Slack", domain: "slack.com", category: "Productivity" },
  { name: "Zoom", domain: "zoom.us", category: "Productivity" },
  { name: "Grammarly", domain: "grammarly.com", category: "Productivity" },
  { name: "Evernote", domain: "evernote.com", category: "Productivity" },
  { name: "Todoist", domain: "todoist.com", category: "Productivity" },
  { name: "Asana", domain: "asana.com", category: "Productivity" },
  { name: "Trello", domain: "trello.com", category: "Productivity" },
  { name: "Monday.com", domain: "monday.com", category: "Productivity" },
  { name: "ClickUp", domain: "clickup.com", category: "Productivity" },
  { name: "GitHub", domain: "github.com", category: "Productivity" },
  { name: "GitLab", domain: "gitlab.com", category: "Productivity" },
  { name: "JetBrains", domain: "jetbrains.com", category: "Productivity" },
  { name: "LinkedIn Premium", domain: "linkedin.com", category: "Productivity" },
  { name: "X Premium", domain: "x.com", category: "Productivity" },
  { name: "Medium", domain: "medium.com", category: "Productivity" },
  { name: "Substack", domain: "substack.com", category: "Productivity" },

  // Cloud Storage
  { name: "Google One", domain: "one.google.com", category: "Cloud Storage" },
  { name: "Dropbox", domain: "dropbox.com", category: "Cloud Storage" },
  { name: "iCloud+", domain: "icloud.com", category: "Cloud Storage" },
  { name: "OneDrive", domain: "onedrive.live.com", category: "Cloud Storage" },
  { name: "Box", domain: "box.com", category: "Cloud Storage" },
  { name: "pCloud", domain: "pcloud.com", category: "Cloud Storage" },
  { name: "MEGA", domain: "mega.io", category: "Cloud Storage" },

  // Education
  { name: "Coursera", domain: "coursera.org", category: "Education" },
  { name: "Udemy", domain: "udemy.com", category: "Education" },
  { name: "Skillshare", domain: "skillshare.com", category: "Education" },
  { name: "Duolingo", domain: "duolingo.com", category: "Education" },
  { name: "Khan Academy", domain: "khanacademy.org", category: "Education" },
  { name: "MasterClass", domain: "masterclass.com", category: "Education" },
  { name: "LinkedIn Learning", domain: "linkedin.com", category: "Education" },
  { name: "Brilliant", domain: "brilliant.org", category: "Education" },
  { name: "DataCamp", domain: "datacamp.com", category: "Education" },
  { name: "Codecademy", domain: "codecademy.com", category: "Education" },
  { name: "Byju's", domain: "byjus.com", category: "Education" },
  { name: "Unacademy", domain: "unacademy.com", category: "Education" },

  // Utilities
  { name: "1Password", domain: "1password.com", category: "Utilities" },
  { name: "LastPass", domain: "lastpass.com", category: "Utilities" },
  { name: "Bitwarden", domain: "bitwarden.com", category: "Utilities" },
  { name: "NordVPN", domain: "nordvpn.com", category: "Utilities" },
  { name: "ExpressVPN", domain: "expressvpn.com", category: "Utilities" },
  { name: "Surfshark", domain: "surfshark.com", category: "Utilities" },
  { name: "Proton Mail", domain: "proton.me", category: "Utilities" },
  { name: "Proton VPN", domain: "protonvpn.com", category: "Utilities" },
  { name: "Norton", domain: "norton.com", category: "Utilities" },
  { name: "McAfee", domain: "mcafee.com", category: "Utilities" },
  { name: "Dashlane", domain: "dashlane.com", category: "Utilities" },
  { name: "Setapp", domain: "setapp.com", category: "Utilities" },

  // Health & Fitness
  { name: "Cult.fit", domain: "cult.fit", category: "Health & Fitness" },
  { name: "Peloton", domain: "onepeloton.com", category: "Health & Fitness" },
  { name: "Strava", domain: "strava.com", category: "Health & Fitness" },
  { name: "MyFitnessPal", domain: "myfitnesspal.com", category: "Health & Fitness" },
  { name: "Headspace", domain: "headspace.com", category: "Health & Fitness" },
  { name: "Calm", domain: "calm.com", category: "Health & Fitness" },
  { name: "Fitbit Premium", domain: "fitbit.com", category: "Health & Fitness" },
  { name: "Nike Training Club", domain: "nike.com", category: "Health & Fitness" },

  // News
  { name: "New York Times", domain: "nytimes.com", category: "News" },
  { name: "Washington Post", domain: "washingtonpost.com", category: "News" },
  { name: "The Economist", domain: "economist.com", category: "News" },
  { name: "The Hindu", domain: "thehindu.com", category: "News" },
  { name: "Times of India", domain: "timesofindia.indiatimes.com", category: "News" },
  { name: "Bloomberg", domain: "bloomberg.com", category: "News" },

  // Gaming
  { name: "Xbox Game Pass", domain: "xbox.com", category: "Gaming" },
  { name: "PlayStation Plus", domain: "playstation.com", category: "Gaming" },
  { name: "Nintendo Switch Online", domain: "nintendo.com", category: "Gaming" },
  { name: "EA Play", domain: "ea.com", category: "Gaming" },
  { name: "GeForce Now", domain: "nvidia.com", category: "Gaming" },
  { name: "Apple Arcade", domain: "apple.com", category: "Gaming" },
  { name: "Steam", domain: "steampowered.com", category: "Gaming" },

  // Shopping / Food
  { name: "Amazon Prime", domain: "amazon.com", category: "Shopping" },
  { name: "Flipkart Plus", domain: "flipkart.com", category: "Shopping" },
  { name: "Myntra Insider", domain: "myntra.com", category: "Shopping" },
  { name: "Zomato Gold", domain: "zomato.com", category: "Shopping" },
  { name: "Swiggy One", domain: "swiggy.com", category: "Shopping" },
  { name: "Uber One", domain: "uber.com", category: "Shopping" },
  { name: "DoorDash DashPass", domain: "doordash.com", category: "Shopping" },
  { name: "Instacart+", domain: "instacart.com", category: "Shopping" },

  // Finance
  { name: "Notion Calendar", domain: "notion.so", category: "Finance" },
  { name: "YNAB", domain: "ynab.com", category: "Finance" },
  { name: "Mint", domain: "mint.com", category: "Finance" },
  { name: "Credit Karma", domain: "creditkarma.com", category: "Finance" },
  { name: "Groww", domain: "groww.in", category: "Finance" },
  { name: "Zerodha", domain: "zerodha.com", category: "Finance" },

  // Dating
  { name: "Tinder", domain: "tinder.com", category: "Dating" },
  { name: "Bumble", domain: "bumble.com", category: "Dating" },
  { name: "Hinge", domain: "hinge.co", category: "Dating" },
  { name: "OkCupid", domain: "okcupid.com", category: "Dating" },
];

export function getServiceLogo(domain: string) {
  if (!domain) return "";
  // Primary: Hunter
  return `https://logos.hunter.io/${domain}`;
}

export function getFallbackLogo(domain: string) {
  if (!domain) return "";
  // Fallback: Google favicon
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}