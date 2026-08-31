import CoreCapabilities from "@/components/HomePage/CoreCapabilities/CoreCapabilities";
import CTASection from "@/components/HomePage/CTASection/CTASection";
// import FacilitiesQuality from "@/components/HomePage/FacilitiesQuality/FacilitiesQuality";
import FacilitiesQuality2 from "@/components/HomePage/FacilitiesQuality/FacilitiesQuality2";
// import FeaturedProjects from "@/components/HomePage/FeaturedProjects/FeaturedProjects";
// import FeaturedProjects2 from "@/components/HomePage/FeaturedProjects/FeaturedProjects2";
// import LuminousProjects from "@/components/HomePage/FeaturedProjects/LuminousProjects";
import Hero from "@/components/HomePage/Hero";
import HowWeWork from "@/components/HomePage/Howwework/HowWeWork";
// import HowWeWork2 from "@/components/HomePage/Howwework/HowWeWork2";
import IndustriesServe from "@/components/HomePage/IndustriesServe/IndustriesServe";
import TrustedPartner from "@/components/HomePage/TrustedPartner/TrustedPartner";
// import TrustedPartner from "@/components/HomePage/TrustedPartner/TrustedPartner";
import WhatWeFabricate from "@/components/HomePage/WhatWeFabricate/WhatWeFabricate";
import WhoWeAre from "@/components/HomePage/WhoWeAre/WhoWeAre";
import WhyForgentis from "@/components/HomePage/Whyforgentis/Whyforgentis";

export default function Home() {
  return (
    <>
     <Hero/>
      <div className="scroll-content-wrapper">
      <TrustedPartner
  eyebrow="Trusted Fabrication Partner"
  title="A Fabrication Partner Businesses Rely On"
  body="Architects, contractors, and manufacturers send us their drawings because the work comes back right the first time."
  showMetrics={true}
  metrics={[
    { id: 'years', target: 4, suffix: '+', label: 'Years in Fabrication', description: 'In operation' },
    { id: 'projects', target: 15, suffix: '+', label: 'Projects Delivered', description: 'Across sectors' },
    { id: 'tolerance', target: 99, decimal: 0, suffix: '%', label: 'Cutting Accuracy', description: 'Tolerance level' },
    { id: 'facility', target: 100, suffix: '%', label: 'Facility Size', description: 'Workshop capacity' },
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
  backgroundImage="/title-bg2.jpeg"
/>
      <WhoWeAre
  eyebrow="Who We Are"
  title="Built Around Metal and Precision"
  body="Forgentis Fabrications is a metal fabrication company. We cut, bend, weld, and finish steel, stainless, aluminum, and brass into parts and structures for buildings and businesses. Some jobs are a single part. Some are a full building's worth of steel. The standard stays the same."
  buttonText="About Forgentis"
  buttonLink="/about"
  showButton={true}
  showImage={true}
  imageSrc="/whoweare.jpeg"
  imageAlt="Forgentis Fabrication"
/>
      <CoreCapabilities/>
      <WhatWeFabricate
  eyebrow="Our Expertise"
  title="What We Make"
  body="Send us a drawing and we will make it in metal."
  buttonText="See Our Work"
  showButton={false}
  showSector={false}
/>
      <IndustriesServe
  eyebrow="Sectors We Cover"
  title="Industries We Serve"
  body="We fabricate for teams that build and fit out spaces."
  showButton={true}
  buttonText="See Industries"
  buttonLink="/industries"
  showCards={true}
/>
      <WhyForgentis
  eyebrow="The Forgentis Standard"
  headline="Why Forgentis"
  body="Four reasons manufacturers keep coming back to us, project after project."
  showPoints={true}
  showImage={true}
  image="/whyforgentis.jpeg"
/>
      <HowWeWork
  eyebrow="How we work"
  title="From Concept to Completion"
  body="Every job runs the same clear path: brief, design review, material planning, production, quality checks, finishing, assembly, and delivery. You always know which stage your work is in."
  buttonText="See Our Process"
  buttonLink="/process"
  showButton={true}
  showTimeline={true}
/>
      {/* <HowWeWork2
  eyebrow="How we work"
  title="From Concept to Completion."
  body="Every job runs the same clear path: brief, design review, material planning, production, quality checks, finishing, assembly, and delivery. You always know which stage your work is in."
  buttonText="See Our Process"
  buttonLink="/process"
  showButton={true}
  showTimeline={true}
/> */}
      <FacilitiesQuality2/>
      {/* <FacilitiesQuality/> */}
      {/* <FeaturedProjects/>
      <FeaturedProjects2/> */}
      {/* <LuminousProjects
  eyebrow="Featured Projects"
  title="Selected Work."
  body="A few of the jobs we have delivered. Full case studies on the Projects page"
  showButton={true}
  buttonText="View Projects"
  showLocation={false}
  showDescription={false}
/> */}
      <CTASection
  eyebrow="Request a Quote"
  headline="Have a Drawing? Get a Price"
  body="Send us your drawing or specification and we will come back with a clear quote."
  buttonText="Get a Quote"
  buttonLink="/consultation"
/>
</div>
    </>
  )
}