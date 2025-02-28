import { HeroSection } from "@/components/hero-section";
import StatsCards from "@/components/stats-cards";
import HowItWorksPage from "../how-it-works/page";
import RecentItems from "@/components/recent-items";

export default function Home() {
  return (
  <>
  <HeroSection />  
  <StatsCards/>
  <RecentItems/>
  <HowItWorksPage/>
  </>
  )
}
