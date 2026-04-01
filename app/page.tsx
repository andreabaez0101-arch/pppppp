import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { PricingSection } from "@/components/pricing-section"
import { ServicesSection } from "@/components/services-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ProfileWidget } from "@/components/profile-widget"
import { CartBar } from "@/components/cart-bar"
import { PurchasePolicy } from "@/components/purchase-policy"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <PricingSection />
      <ServicesSection />
      <PurchasePolicy />
      <ContactSection />
      <Footer />
      <ProfileWidget />
      <CartBar />
    </main>
  )
}
