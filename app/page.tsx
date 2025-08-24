import { HomeHero } from "@/components/page-components/home/home-hero";
import { HomeSetupGuide } from "@/components/page-components/home/home-setup-guide";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full min-h-screen">
      <HomeHero />
      <HomeSetupGuide />
    </div>
  );
}
