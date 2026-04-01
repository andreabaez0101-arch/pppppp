export type PricingItem = {
  name: string
  price: string | null
  range?: string
}

export type PricingCategory = {
  id: string
  title: string
  icon: string
  items: PricingItem[]
}

export const pricingCategories: PricingCategory[] = [
  {
    id: "systems",
    title: "Systems & Core",
    icon: "⬡",
    items: [
      { name: "Crafting Table (No Items)", price: "$30" },
      { name: "Crafting Table (Full Items)", price: "$50" },
      { name: "OX Inventory Redesign", price: "$40" },
      { name: "OX Lib Redesign", price: "$60" },
      { name: "OX Target Design", price: "$20" },
    ],
  },
  {
    id: "gameplay",
    title: "Gameplay & Events",
    icon: "◈",
    items: [
      { name: "Paintball UI + Logic", price: "$50" },
      { name: "Battle Pass (UI + Logic)", price: "$60" },
      { name: "Murder vs Detective", price: "$120" },
      { name: "Battle Royale (Cayo Perico)", price: "$200" },
      { name: "Purge Event (UI + Logic)", price: "$70" },
      { name: "Among Us Event Script", price: "$100" },
      { name: "Fishing (UI + Logic)", price: "$40" },
      { name: "Animal Joke Script", price: "$20" },
      { name: "Daily Rewards System", price: "$40" },
    ],
  },
  {
    id: "server",
    title: "Server Features",
    icon: "◧",
    items: [
      { name: "Weapon Store", price: "$35" },
      { name: "Black Market (UI + Logic)", price: "$45" },
      { name: "Gang Menu (UI + Logic)", price: "$55" },
      { name: "Map Blips UI", price: "$25" },
      { name: "Announcement System", price: "$30" },
      { name: "Notification System", price: "$40" },
      { name: "Dynamic Weather", price: "$25" },
      { name: "City Light System", price: "$25" },
      { name: "Tablet Alert", price: "$25" },
      { name: "Garage (UI + Logic)", price: "$45" },
    ],
  },
  {
    id: "ui",
    title: "UI / Design",
    icon: "◻",
    items: [
      { name: "Clothes UI (Design Only)", price: "$25" },
      { name: "Clothes UI + Logic", price: "$45" },
      { name: "Radio UI Design", price: "$30" },
      { name: "LB Phone Apps", price: "$45" },
      { name: "Loading Screen UI", price: "$30" },
      { name: "Character UI Design", price: "$36" },
      { name: "VIP Store (UI + Logic)", price: "$80" },
      { name: "Illenium Appearance Redesign", price: "$40" },
      { name: "Pause Menu", price: "$30" },
      { name: "Animations Menu (UI Only)", price: "$40" },
      { name: "F9 Menu", price: "$26" },
      { name: "Illegal Mechanic UI Design", price: "$60" },
      { name: "Dealership UI Design", price: "$60" },
      { name: "Modern Banking UI Design", price: "$57" },
      { name: "Firefighter Menu", price: "$60" },
      { name: "Job Creator UI", price: "$100" },
      { name: "Robbery Creator (UI + Logic)", price: "$120" },
      { name: "Spawn Selector UI", price: "$30" },
    ],
  },
  {
    id: "admin",
    title: "Admin & Management",
    icon: "◈",
    items: [
      { name: "Admin Menu + Reports (Full System)", price: "$80" },
    ],
  },
  {
    id: "website",
    title: "Website Development",
    icon: "◉",
    items: [
      { name: "Custom Website Development", price: null, range: "$100 – $300" },
    ],
  },
]

export const specialServices = [
  {
    id: "custom",
    title: "Custom Scripts",
    description: "Got a unique idea? I build fully custom scripts tailored to your server needs from scratch.",
    range: "$30 – $190",
    icon: "◈",
  },
  {
    id: "fix",
    title: "Fix & Optimize",
    description: "Script errors, lag issues, messy code — I review, fix and optimize it for you.",
    range: "$20 – $100",
    icon: "◧",
    features: ["Bug fixes", "Performance optimization", "Clean code"],
  },
]

export const paymentMethods = ["Cash App", "Zelle", "Crypto (ETH / USDT / LTC)"]
