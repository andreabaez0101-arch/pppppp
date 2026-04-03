export type ShopItem = {
  id: string
  name: string
  price: string | null
  numericPrice: number
  range?: string
  tag?: string
  description: string
  encrypted: boolean
  preview?: string
}

export type ShopCategory = {
  id: string
  label: string
  items: ShopItem[]
}

export const scriptProducts: ShopItem[] = [
  // Systems & Core
  { id: "crafting-basic",    name: "Crafting Table",         price: "$30",  numericPrice: 30,  tag: "Core",      description: "Crafting table system — no items included.",                            encrypted: true },
  { id: "crafting-full",     name: "Crafting Table Full",    price: "$50",  numericPrice: 50,  tag: "Core",      description: "Crafting table with full item set ready to use.",                        encrypted: true },
  { id: "ox-inv",            name: "OX Inventory Redesign",  price: "$40",  numericPrice: 40,  tag: "Core",      description: "Full visual redesign of the OX Inventory framework.",                   encrypted: true },
  { id: "ox-lib",            name: "OX Lib Redesign",        price: "$60",  numericPrice: 60,  tag: "Core",      description: "Custom redesign for OX Lib notifications and prompts.",                  encrypted: true },
  { id: "ox-target",         name: "OX Target Design",       price: "$20",  numericPrice: 20,  tag: "Core",      description: "Reskin and redesign of OX Target interaction UI.",                       encrypted: true },
  // Gameplay
  { id: "paintball",         name: "Paintball",              price: "$50",  numericPrice: 50,  tag: "Event",     description: "Full paintball minigame — UI and full game logic.",                      encrypted: true },
  { id: "battlepass",        name: "Battle Pass",            price: "$60",  numericPrice: 60,  tag: "Event",     description: "Battle pass system with progress tracking and rewards UI.",               encrypted: true },
  { id: "murder",            name: "Murder vs Detective",    price: "$120", numericPrice: 120, tag: "Event",     description: "Complete whodunit minigame with roles, UI, and game logic.",              encrypted: true },
  { id: "battleroyale",      name: "Battle Royale",          price: "$200", numericPrice: 200, tag: "Event",     description: "Full BR event on Cayo Perico — zones, loot, final circle.",               encrypted: true },
  { id: "purge",             name: "Purge Event",            price: "$70",  numericPrice: 70,  tag: "Event",     description: "Purge night event with timers, kill tracking, and UI.",                   encrypted: true },
  { id: "amongus",           name: "Among Us Event",         price: "$100", numericPrice: 100, tag: "Event",     description: "Crewmate vs Impostor in-server event with full logic.",                   encrypted: true },
  { id: "fishing",           name: "Fishing System",         price: "$40",  numericPrice: 40,  tag: "Gameplay",  description: "Fishing minigame with catch logic and animated UI.",                      encrypted: true },
  { id: "animal-joke",       name: "Animal Joke Script",     price: "$20",  numericPrice: 20,  tag: "Fun",       description: "Lightweight fun animal-based interaction script.",                        encrypted: true },
  { id: "daily-rewards",     name: "Daily Rewards",          price: "$40",  numericPrice: 40,  tag: "System",    description: "Daily login reward system with streak tracking and UI.",                   encrypted: true },
  // Server Features
  { id: "weapon-store",      name: "Weapon Store",           price: "$35",  numericPrice: 35,  tag: "Store",     description: "Clean weapon shop with category filtering and UI.",                       encrypted: true },
  { id: "black-market",      name: "Black Market",           price: "$45",  numericPrice: 45,  tag: "Store",     description: "Underground market with secret access logic and UI.",                     encrypted: true },
  { id: "gang-menu",         name: "Gang Menu",              price: "$55",  numericPrice: 55,  tag: "System",    description: "Full gang management panel — members, turf, hierarchy.",                   encrypted: true },
  { id: "map-blips",         name: "Map Blips UI",           price: "$25",  numericPrice: 25,  tag: "UI",        description: "Dynamic map blip manager with category controls.",                        encrypted: true },
  { id: "announcement",      name: "Announcement System",    price: "$30",  numericPrice: 30,  tag: "System",    description: "Server-wide announcement system with styled notifications.",               encrypted: true },
  { id: "notification",      name: "Notification System",    price: "$40",  numericPrice: 40,  tag: "System",    description: "Custom notification framework replacing defaults.",                        encrypted: true },
  { id: "weather",           name: "Dynamic Weather",        price: "$25",  numericPrice: 25,  tag: "World",     description: "Synced weather system with smooth transitions.",                          encrypted: true },
  { id: "city-light",        name: "City Light System",      price: "$25",  numericPrice: 25,  tag: "World",     description: "City lighting controller — streetlights, interiors, etc.",                encrypted: true },
  { id: "tablet-alert",      name: "Tablet Alert",           price: "$25",  numericPrice: 25,  tag: "UI",        description: "Police/staff tablet alert system with notification UI.",                   encrypted: true },
  { id: "garage",            name: "Garage System",          price: "$45",  numericPrice: 45,  tag: "System",    description: "Vehicle garage with storage logic and interactive UI.",                    encrypted: true },
  // Admin
  { id: "admin-menu",        name: "Admin Menu + Reports",   price: "$80",  numericPrice: 80,  tag: "Admin",     description: "Full admin control panel with player reports management.",                 encrypted: true },
]

export const uiProducts: ShopItem[] = [
  { id: "clothes-design",    name: "Clothes UI Design",      price: "$25",  numericPrice: 25,  tag: "Design",    description: "Visual-only redesign for clothing shop interface.",                        encrypted: true,  preview: "/previews/ui-preview-1.jpg" },
  { id: "clothes-logic",     name: "Clothes UI + Logic",     price: "$45",  numericPrice: 45,  tag: "Full",      description: "Clothing UI with full try-on and purchase logic.",                         encrypted: true,  preview: "/previews/ui-preview-2.jpg" },
  { id: "radio-ui",          name: "Radio UI",               price: "$30",  numericPrice: 30,  tag: "Design",    description: "Custom radio interface with frequency controls.",                          encrypted: true,  preview: "/previews/ui-preview-3.jpg" },
  { id: "lb-phone",          name: "LB Phone Apps",          price: "$45",  numericPrice: 45,  tag: "Phone",     description: "Custom app designs and logic for LB Phone.",                              encrypted: true,  preview: "/previews/ui-preview-2.jpg" },
  { id: "loading-screen",    name: "Loading Screen",         price: "$30",  numericPrice: 30,  tag: "Design",    description: "Animated custom loading screen for your server.",                          encrypted: true,  preview: "/previews/ui-preview-6.jpg" },
  { id: "character-ui",      name: "Character UI",           price: "$36",  numericPrice: 36,  tag: "Design",    description: "Character selection and creation screen redesign.",                        encrypted: true,  preview: "/previews/ui-preview-3.jpg" },
  { id: "vip-store",         name: "VIP Store",              price: "$80",  numericPrice: 80,  tag: "Full",      description: "Premium VIP shop with tier system, UI, and full logic.",                   encrypted: true,  preview: "/previews/ui-preview-1.jpg" },
  { id: "illenium",          name: "Illenium Appearance",    price: "$40",  numericPrice: 40,  tag: "Design",    description: "Custom redesign of Illenium Appearance UI.",                              encrypted: true,  preview: "/previews/ui-preview-3.jpg" },
  { id: "pause-menu",        name: "Pause Menu",             price: "$30",  numericPrice: 30,  tag: "Design",    description: "Full pause menu redesign with custom layout.",                             encrypted: true,  preview: "/previews/ui-preview-1.jpg" },
  { id: "animations-menu",   name: "Animations Menu",        price: "$40",  numericPrice: 40,  tag: "UI",        description: "Animated emotes/animations browser menu.",                                encrypted: true,  preview: "/previews/ui-preview-2.jpg" },
  { id: "f9-menu",           name: "F9 Menu",                price: "$26",  numericPrice: 26,  tag: "UI",        description: "Custom F9 quick-access panel for players.",                               encrypted: true,  preview: "/previews/ui-preview-3.jpg" },
  { id: "illegal-mech",      name: "Illegal Mechanic UI",    price: "$60",  numericPrice: 60,  tag: "Design",    description: "Dark-themed UI for illegal vehicle mechanic jobs.",                        encrypted: true,  preview: "/previews/ui-preview-4.jpg" },
  { id: "dealership",        name: "Dealership UI",          price: "$60",  numericPrice: 60,  tag: "Design",    description: "Full car dealership interface with showcase view.",                        encrypted: true,  preview: "/previews/ui-preview-4.jpg" },
  { id: "banking",           name: "Modern Banking UI",      price: "$57",  numericPrice: 57,  tag: "Design",    description: "Premium banking interface redesign with transactions view.",                encrypted: true,  preview: "/previews/ui-preview-5.jpg" },
  { id: "firefighter",       name: "Firefighter Menu",       price: "$60",  numericPrice: 60,  tag: "Job",       description: "Firefighter job menu with dispatch and tools UI.",                         encrypted: true,  preview: "/previews/ui-preview-1.jpg" },
  { id: "job-creator",       name: "Job Creator UI",         price: "$100", numericPrice: 100, tag: "Full",      description: "Full job creation and management panel with logic.",                       encrypted: true,  preview: "/previews/ui-preview-2.jpg" },
  { id: "robbery-creator",   name: "Robbery Creator",        price: "$120", numericPrice: 120, tag: "Full",      description: "Custom robbery builder — locations, loot tables, UI.",                     encrypted: true,  preview: "/previews/ui-preview-3.jpg" },
  { id: "spawn-selector",    name: "Spawn Selector",         price: "$30",  numericPrice: 30,  tag: "Design",    description: "Animated spawn selection screen with map integration.",                    encrypted: true,  preview: "/previews/ui-preview-6.jpg" },
  { id: "website-dev",       name: "Custom Website",         price: null,   numericPrice: 0,   range: "$100–$300", tag: "Web",  description: "Full custom website development for your server.",              encrypted: false },
]

export const TAG_COLORS: Record<string, string> = {
  Core:     "oklch(0.72 0.22 195 / 0.15)",
  Event:    "oklch(0.65 0.25 30  / 0.15)",
  Gameplay: "oklch(0.70 0.20 145 / 0.15)",
  Fun:      "oklch(0.72 0.22 80  / 0.15)",
  System:   "oklch(0.60 0.18 270 / 0.15)",
  Store:    "oklch(0.72 0.22 45  / 0.15)",
  UI:       "oklch(0.72 0.22 195 / 0.15)",
  World:    "oklch(0.70 0.20 145 / 0.15)",
  Admin:    "oklch(0.60 0.18 0   / 0.15)",
  Design:   "oklch(0.72 0.22 300 / 0.15)",
  Full:     "oklch(0.72 0.22 195 / 0.20)",
  Phone:    "oklch(0.60 0.18 240 / 0.15)",
  Job:      "oklch(0.65 0.22 60  / 0.15)",
  Web:      "oklch(0.70 0.20 180 / 0.15)",
}

export const TAG_TEXT: Record<string, string> = {
  Core:     "oklch(0.72 0.22 195)",
  Event:    "oklch(0.75 0.25 30)",
  Gameplay: "oklch(0.70 0.20 145)",
  Fun:      "oklch(0.78 0.22 80)",
  System:   "oklch(0.65 0.18 270)",
  Store:    "oklch(0.78 0.22 45)",
  UI:       "oklch(0.72 0.22 195)",
  World:    "oklch(0.70 0.20 145)",
  Admin:    "oklch(0.72 0.22 0)",
  Design:   "oklch(0.78 0.22 300)",
  Full:     "oklch(0.72 0.22 195)",
  Phone:    "oklch(0.65 0.18 240)",
  Job:      "oklch(0.78 0.22 60)",
  Web:      "oklch(0.70 0.20 180)",
}
