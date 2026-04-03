import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ShopSection } from "@/components/shop-section"
import { ServicesSection } from "@/components/services-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ProfileWidget } from "@/components/profile-widget"
import { CartBar } from "@/components/cart-bar"
import { PurchasePolicy } from "@/components/purchase-policy"
import { RecentPurchases } from "@/components/recent-purchases"
import { BuyersTable } from "@/components/buyers-table"
import { ZombieAnnouncement } from "@/components/zombie-announcement"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ZombieAnnouncement />
      <ShopSection />
      <ServicesSection />
      <PurchasePolicy />
      <BuyersTable />
      <ContactSection />
      <Footer />
      <ProfileWidget />
      <CartBar />
      <RecentPurchases />
    </main>
  )
}
