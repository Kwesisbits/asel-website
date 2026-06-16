import { Hero } from "../components/sections/Hero";
import { ImpactStats } from "../components/sections/ImpactStats";
import { MissionSection } from "../components/sections/MissionSection";
import { ProgramsOverview } from "../components/sections/ProgramsOverview";
import { ProgramsTeaser } from "../components/sections/ProgramsTeaser";
import { PhotoFeature } from "../components/sections/PhotoFeature";
import { ArticlesSection } from "../components/sections/ArticlesSection";
import { PartnersStrip } from "../components/sections/PartnersStrip";

interface HomeProps {
  onEnroll: (program?: string) => void;
  onPartnerClick: () => void;
}

export function Home({ onEnroll: _onEnroll, onPartnerClick }: HomeProps) {
  return (
    <>
      <Hero onEnroll={_onEnroll} />
      <ImpactStats />
      <MissionSection />
      <ProgramsOverview />
      <ProgramsTeaser />
      <PhotoFeature
        image="/Image of Training.jpeg"
        alt="ASEL Africa trainees working hands-on with renewable energy equipment"
        badge="Partnership"
        headline="Training the Next Generation of Energy Practitioners"
        body="ASEL Africa partnered with Dream Renewables to connect young professionals with hands-on, practical renewable energy training in the field — bridging classroom knowledge with real deployment experience."
        imageLeft={true}
        dark={false}
        cta={{ label: "Explore Programs", href: "/programs" }}
      />
      <PhotoFeature
        image="/CEO Award.PNG"
        alt="ASEL Africa Team Lead Emmanuella B. receiving TUM SEED Center award"
        badge="Recognition"
        headline="TUM SEED Center Award for Women in Renewable Energy"
        body="On International Day of the Girl Child, our Team Lead Emmanuella B. received recognition from the TUM SEED Center for ASEL's work in advancing renewable energy training for women and girls in Ghana."
        imageLeft={false}
        dark={true}
        cta={{
          label: "Read the Full Story",
          href: "https://www.linkedin.com/posts/empower-power-international-share-7382798793022550016-l6Js/?utm_source=share&utm_medium=member_ios&rcm=ACoAADMq4OEBpMzB7-pznNczL5IG1Xnl9WuspU0",
          external: true,
        }}
      />
      <ArticlesSection />
      <PartnersStrip onPartnerClick={onPartnerClick} />
    </>
  );
}
