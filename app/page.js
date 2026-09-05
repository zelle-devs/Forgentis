import CoreCapabilities from "@/components/HomePage/CoreCapabilities/CoreCapabilities";
import CTASection from "@/components/HomePage/CTASection/CTASection";
import FacilitiesQuality2 from "@/components/HomePage/FacilitiesQuality/FacilitiesQuality2";
import Hero from "@/components/HomePage/Hero";
import HowWeWork from "@/components/HomePage/Howwework/HowWeWork";
import IndustriesServe from "@/components/HomePage/IndustriesServe/IndustriesServe";
import TrustedPartner from "@/components/HomePage/TrustedPartner/TrustedPartner";
import WhatWeFabricate from "@/components/HomePage/WhatWeFabricate/WhatWeFabricate";
import WhoWeAre from "@/components/HomePage/WhoWeAre/WhoWeAre";
import WhyForgentis from "@/components/HomePage/Whyforgentis/Whyforgentis";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="scroll-section hero-section" data-section-type="hero">
        <Hero/>
      </section>

      {/* Trusted Partner Section */}
      <section className="scroll-section" data-section-type="large">
        <TrustedPartner
          eyebrow="Trusted Fabrication Partner"
          title="A Fabrication Partner Businesses Rely On"
          body="Architects, contractors, and manufacturers send us their drawings because the work comes back right the first time."
          showMetrics={true}
          metrics={[
            { id: 'years', target: 5, suffix: '+', label: 'Years in Fabrication', description: 'In operation' },
            { id: 'projects', target: 500, suffix: '+', label: 'Projects Delivered', description: 'Across sectors' },
            { id: 'retention', target: 90, suffix: '%', label: 'Client Retention', description: 'Repeat business rate' },
            { id: 'facility', target: 5, suffix: '', label: <><span style={{fontSize:"20px", lineHeight: "0"}}>★★★★★</span></>, description: 'Rating' },
          ]}
          showTrustStrip={true}
          trustLabel="Trusted by teams across"
          logos={['ARCHITECTS', 'CONTRACTORS', 'MANUFACTURERS', 'DESIGN STUDIOS', 'REAL ESTATE', 'ENGINEERING']}
          showGridPattern={false}
          titleColor="var(--color-black-medium)"
          bodyColor="var(--color-black-medium)"
          metricHoverColor="var(--color-blue-main)"
          metricNumberColor="var(--color-black-medium)"
          metricLabelColor="var(--color-black-medium)"
          metricDescriptionColor="var(--color-black-medium)"
          trustLabelColor="var(--color-black-medium)"
          backgroundImage="/optimize/title-bg2.webp"
        />
      </section>

      {/* Who We Are Section */}
      <section className="scroll-section" data-section-type="normal">
        <WhoWeAre
          eyebrow="Who We Are"
          title="Built Around Metal and Precision"
          body="Forgentis Fabrications is a metal fabrication company. We cut, bend, weld, and finish steel, stainless, aluminum, and brass into parts and structures for buildings and businesses. Some jobs are a single part. Some are a full building's worth of steel. The standard stays the same."
          buttonText="About Forgentis"
          buttonLink="/about"
          showButton={true}
          showImage={true}
          imageSrc="/optimize/whoweare.webp"
          imageAlt="Forgentis Fabrication"
        />
      </section>

      {/* Core Capabilities Section */}
      <section className="scroll-section" data-section-type="large">
        <CoreCapabilities/>
      </section>

      {/* What We Fabricate Section */}
      <section className="scroll-section" data-section-type="normal">
        <WhatWeFabricate
          eyebrow="Our Expertise"
          title="What We Make"
          body="Send us a drawing and we will make it in metal."
          buttonText="See Our Work"
          showButton={false}
          showSector={false}
        />
      </section>

      {/* Industries Serve Section */}
      <section className="scroll-section" data-section-type="large">
        <IndustriesServe
          eyebrow="Sectors We Cover"
          title="Industries We Serve"
          body="We fabricate for teams that build and fit out spaces."
          showButton={true}
          buttonText="See Industries"
          buttonLink="/industries"
          showCards={true}
        />
      </section>

      {/* Why Forgentis Section */}
      <section className="scroll-section" data-section-type="large">
        <WhyForgentis
          eyebrow="The Forgentis Standard"
          headline="Why Forgentis"
          body="Four reasons manufacturers keep coming back to us, project after project."
          showPoints={true}
          showImage={true}
          image="/optimize/whyforgentis.webp"
        />
      </section>

      {/* How We Work Section */}
      <section className="scroll-section" data-section-type="short">
        <HowWeWork
          eyebrow="How we work"
          title="From Concept to Completion"
          body="Every job runs the same clear path: brief, design review, material planning, production, quality checks, finishing, assembly, and delivery. You always know which stage your work is in."
          buttonText="See Our Process"
          buttonLink="/process"
          showButton={true}
          showTimeline={true}
        />
      </section>

      {/* Facilities Quality Section */}
      <section className="scroll-section" data-section-type="normal">
        <FacilitiesQuality2/>
      </section>

      {/* CTA Section */}
      <section className="scroll-section" data-section-type="large" style={{scrollSnapAlign: "start" }}>
        <CTASection
          eyebrow="Request a Quote"
          headline="Have a Drawing? Get a Price"
          body="Send us your drawing or specification and we will come back with a clear quote."
          buttonText="Get a Quote"
          buttonLink="/consultation"
        />
      </section>
    </>
  )
}
