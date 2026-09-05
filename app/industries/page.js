'use client'
import DynamicHero from "@/components/About/DynamicHero";
import CTASection from "@/components/HomePage/CTASection/CTASection";
import WhoWeAre from "@/components/HomePage/WhoWeAre/WhoWeAre";

export default function Industries() {
  return (
    <>
      {/* Hero Section */}
      <section className="scroll-section hero-section" data-section-type="hero">
        <DynamicHero
          eyebrow="Industries"
          headline="Metal for the Teams That Build"
          subhead="We fabricate for businesses that construct, fit out, and manufacture."
          body="Different sectors, same need: precision metal components made to spec and delivered on time. From construction and automotive to solar and energy, medical equipment, and industrial manufacturing, here is where our work shows up most."
          primaryButtonText="Discuss Your Project"
          primaryButtonLink="/consultation"
          secondaryButtonText=""
          secondaryButtonLink=""
          heroImages={[]}
          titleImage="/optimize/title-bg.webp"
          showRightImage={true}
          rightImage="/optimize/industriesHero.webp"
          rightImageAlt="Forgentis Fabrication"
        />
      </section>

      {/* Construction and Infrastructure */}
      <section className="scroll-section" data-section-type="normal">
        <WhoWeAre
          eyebrow="Built Environment"
          title="Construction and Infrastructure"
          body="Structural steel, frames, supports, railings, and access metalwork for buildings and site projects. Fabricated to spec and delivered to schedule, so your build stays on track."
          buttonText=""
          buttonLink=""
          showButton={false}
          showImage={true}
          imageSrc="/optimize/Construction.webp"
          imageAlt="Forgentis Fabrication"
        />
      </section>

      {/* Architecture and Interior */}
      <section className="scroll-section" data-section-type="normal">
        <WhoWeAre
          eyebrow="Design & Build"
          title="Architecture and Interior"
          body="Laser-cut screens, facades, cladding, feature staircases, and decorative panels. The precise, finished metalwork that architects and interior designers specify."
          buttonText=""
          buttonLink=""
          backgroundColor="var(--color-black-medium)"
          showButton={false}
          showImage={true}
          imageSrc="/optimize/Architecture.webp"
          imageAlt="Forgentis Fabrication"
          imagePosition="left"
        />
      </section>

      {/* Retail and Commercial */}
      <section className="scroll-section" data-section-type="normal">
        <WhoWeAre
          eyebrow="Commercial Spaces"
          title="Retail and Commercial"
          body="Shopfronts, display fixtures, signage frames, and fit-out metalwork. Clean finishes and repeatable quality across a single store or a full rollout."
          buttonText=""
          buttonLink=""
          showButton={false}
          showImage={true}
          imageSrc="/optimize/Retail.webp"
          imageAlt="Forgentis Fabrication"
        />
      </section>

      {/* Industrial and Manufacturing */}
      <section className="scroll-section" data-section-type="normal">
        <WhoWeAre
          eyebrow="Industrial Applications"
          title="Industrial and Manufacturing"
          body="Machine frames, platforms, guards, brackets, and structural parts. Hard-working metal built to take load and last on the factory floor."
          buttonText=""
          buttonLink=""
          backgroundColor="var(--color-black-medium)"
          showButton={false}
          showImage={true}
          imageSrc="/optimize/Industrial.webp"
          imageAlt="Forgentis Fabrication"
          imagePosition="left"
        />
      </section>

      {/* Hospitality */}
      <section className="scroll-section" data-section-type="normal">
        <WhoWeAre
          eyebrow="Guest-Facing Spaces"
          title="Hospitality"
          body="Feature metalwork, screens, railings, and fixtures for hotels, restaurants, and cafes. Finishes like PVD and brushed stainless that look sharp and hold up to daily use."
          buttonText=""
          buttonLink=""
          showButton={false}
          showImage={true}
          imageSrc="/optimize/Hospitality.webp"
          imageAlt="Forgentis Fabrication"
        />
      </section>

      {/* Automotive */}
      <section className="scroll-section" data-section-type="normal">
        <WhoWeAre
          eyebrow="Automotive Applications"
          title="Automotive"
          body="Brackets, frames, and custom metal parts for automotive and workshop use, cut and formed to spec. Accurate, repeatable components made to the tolerances automotive work demands."
          buttonText=""
          buttonLink=""
          showButton={false}
          showImage={true}
          backgroundColor="var(--color-black-medium)"
          imageSrc="/optimize/Automotive.webp"
          imageAlt="Forgentis Fabrication"
          imagePosition="left"
        />
      </section>

      {/* Solar and Energy */}
      <section className="scroll-section" data-section-type="normal">
        <WhoWeAre
          eyebrow="Energy Infrastructure"
          title="Solar and Energy"
          body="Mounting structures, frames, brackets, and enclosures for solar and energy projects. Corrosion-resistant metalwork, fabricated to spec and finished to hold up outdoors for years."
          buttonText=""
          buttonLink=""
          showButton={false}
          showImage={true}
          imageSrc="/optimize/Solar.webp"
          imageAlt="Forgentis Fabrication"
        />
      </section>

      {/* Medical Equipment */}
      <section className="scroll-section" data-section-type="normal">
        <WhoWeAre
          eyebrow="Precision Equipment"
          title="Medical Equipment"
          body="Precision components, frames, and housings for medical and laboratory equipment. Clean welds, tight tolerances, and stainless finishes that suit the standards this work calls for."
          buttonText=""
          buttonLink=""
          backgroundColor="var(--color-black-medium)"
          showButton={false}
          showImage={true}
          imageSrc="/optimize/Medical.webp"
          imageAlt="Forgentis Fabrication"
          imagePosition="left"
        />
      </section>

      {/* Engineering */}
      <section className="scroll-section" data-section-type="normal">
        <WhoWeAre
          eyebrow="Engineered Solutions"
          title="Engineering"
          body="Made-to-drawing components and assemblies for engineering firms and contractors. Tight tolerances, certified material, and parts that fit into the wider build."
          buttonText=""
          buttonLink=""
          showButton={false}
          showImage={true}
          imageSrc="/optimize/Engineering.webp"
          imageAlt="Forgentis Fabrication"
        />
      </section>

      {/* Corporate and Commercial Projects */}
      <section className="scroll-section" data-section-type="normal">
        <WhoWeAre
          eyebrow="Business Environments"
          title="Corporate and Commercial Projects"
          body="Office fit-outs, reception features, signage, and architectural metal for commercial spaces. One supplier for the metalwork, from drawing to install."
          buttonText=""
          buttonLink=""
          showButton={false}
          showImage={true}
          backgroundColor="var(--color-black-medium)"
          imageSrc="/optimize/Corporate.webp"
          imageAlt="Forgentis Fabrication"
          imagePosition="left"
        />
      </section>

      {/* Custom Industry Solutions */}
      <section className="scroll-section" data-section-type="normal">
        <WhoWeAre
          eyebrow="Beyond Standard Applications"
          title="Custom Industry Solutions"
          body="If your sector is not listed, that does not mean we cannot help. Send us the drawing or the problem, and we will tell you straight whether it is a fit."
          buttonText=""
          buttonLink=""
          showButton={false}
          showImage={true}
          imageSrc="/optimize/Solutions.webp"
          imageAlt="Forgentis Fabrication"
        />
      </section>

      {/* Final CTA */}
      <section className="scroll-section" data-section-type="large" style={{scrollSnapAlign: "start" }}>
        <CTASection
          eyebrow="Discuss Your Project"
          headline="Tell Us About Your Project"
          body="Share your drawings or requirements and we will come back with a quote and a lead time."
          buttonText="Get a Quote"
          buttonLink="/consultation"
          buttonIcon={true}
          backgroundImage="/optimize/title-bg2.webp"
          showGlow={true}
          showGridPattern={true}
        />
      </section>
    </>
  )
}


// 'use client'
// import DynamicHero from "@/components/About/DynamicHero";
// import CTASection from "@/components/HomePage/CTASection/CTASection";

// import WhoWeAre from "@/components/HomePage/WhoWeAre/WhoWeAre";
// // import WhyForgentis from "@/components/HomePage/Whyforgentis/Whyforgentis";

// export default function Industries() {
//   return (
//     <>
//      <DynamicHero
//        eyebrow="Industries"
//        headline="Metal for the Teams That Build"
//        subhead="We fabricate for businesses that construct, fit out, and manufacture."
//        body="Different sectors, same need: precision metal components made to spec and delivered on time. From construction and automotive to solar and energy, medical equipment, and industrial manufacturing, here is where our work shows up most."
//        primaryButtonText="Discuss Your Project"
//        primaryButtonLink="/consultation"
//        secondaryButtonText=""
//        secondaryButtonLink=""
//        heroImages={[]}
//        titleImage="/optimize/title-bg.webp"
//        showRightImage={true}
//        rightImage="/optimize/industriesHero.webp"
//        rightImageAlt="Forgentis Fabrication"
//      />
//       <div className="scroll-content-wrapper">
     
//       <WhoWeAre
//   eyebrow="Built Environment"
//   title="Construction and Infrastructure"
//   body="Structural steel, frames, supports, railings, and access metalwork for buildings and site projects. Fabricated to spec and delivered to schedule, so your build stays on track."
//   buttonText=""
//   buttonLink=""
//   showButton={false}
//   showImage={true}
//   imageSrc="/optimize/Construction.webp"
//   imageAlt="Forgentis Fabrication"
// />
//  <WhoWeAre
//   eyebrow="Design & Build"
//   title="Architecture and Interior"
//   body="Laser-cut screens, facades, cladding, feature staircases, and decorative panels. The precise, finished metalwork that architects and interior designers specify."
//   buttonText=""
//   buttonLink=""
//   backgroundColor="var(--color-black-medium)"
//   showButton={false}
//   showImage={true}
//   imageSrc="/Architecture.webp"
//   imageAlt="Forgentis Fabrication"
//   imagePosition="left"
// />
//  <WhoWeAre
//   eyebrow="Commercial Spaces"
//   title="Retail and Commercial"
//   body="Shopfronts, display fixtures, signage frames, and fit-out metalwork. Clean finishes and repeatable quality across a single store or a full rollout."
//   buttonText=""
//   buttonLink=""
//   showButton={false}
//   showImage={true}
//   imageSrc="/optimize/Retail.webp"
//   imageAlt="Forgentis Fabrication"
// />
// <WhoWeAre
//   eyebrow="Industrial Applications"
//   title="Industrial and Manufacturing"
//   body="Machine frames, platforms, guards, brackets, and structural parts. Hard-working metal built to take load and last on the factory floor."
//   buttonText=""
//   buttonLink=""
//   backgroundColor="var(--color-black-medium)"
//   showButton={false}
//   showImage={true}
//   imageSrc="/optimize/Industrial.webp"
//   imageAlt="Forgentis Fabrication"
//   imagePosition="left"
// />
// <WhoWeAre
//   eyebrow="Guest-Facing Spaces"
//   title="Hospitality"
//   body="Feature metalwork, screens, railings, and fixtures for hotels, restaurants, and cafes. Finishes like PVD and brushed stainless that look sharp and hold up to daily use."
//   buttonText=""
//   buttonLink=""
//   showButton={false}
//   showImage={true}
//   imageSrc="/optimize/Hospitality.webp"
//   imageAlt="Forgentis Fabrication"
// />
// <WhoWeAre
//   eyebrow="Automotive Applications"
//   title="Automotive"
//   body="Brackets, frames, and custom metal parts for automotive and workshop use, cut and formed to spec. Accurate, repeatable components made to the tolerances automotive work demands."
//   buttonText=""
//   buttonLink=""
//   showButton={false}
//   showImage={true}
//   backgroundColor="var(--color-black-medium)"
//   imageSrc="/optimize/Automotive.webp"
//   imageAlt="Forgentis Fabrication"
//   imagePosition="left"
// />
// <WhoWeAre
//   eyebrow="Energy Infrastructure"
//   title="Solar and Energy"
//   body="Mounting structures, frames, brackets, and enclosures for solar and energy projects. Corrosion-resistant metalwork, fabricated to spec and finished to hold up outdoors for years."
//   buttonText=""
//   buttonLink=""
//   showButton={false}
//   showImage={true}
//   imageSrc="/optimize/Solar.webp"
//   imageAlt="Forgentis Fabrication"
// />
// <WhoWeAre
//   eyebrow="Precision Equipment"
//   title="Medical Equipment"
//   body="Precision components, frames, and housings for medical and laboratory equipment. Clean welds, tight tolerances, and stainless finishes that suit the standards this work calls for."
//   buttonText=""
//   buttonLink=""
//   backgroundColor="var(--color-black-medium)"
//   showButton={false}
//   showImage={true}
//   imageSrc="/optimize/Medical.webp"
//   imageAlt="Forgentis Fabrication"
//   imagePosition="left"
// />
// <WhoWeAre
//   eyebrow="Engineered Solutions"
//   title="Engineering"
//   body="Made-to-drawing components and assemblies for engineering firms and contractors. Tight tolerances, certified material, and parts that fit into the wider build."
//   buttonText=""
//   buttonLink=""
//   showButton={false}
//   showImage={true}
//   imageSrc="/optimize/Engineering.webp"
//   imageAlt="Forgentis Fabrication"
// />
// <WhoWeAre
//   eyebrow="Business Environments"
//   title="Corporate and Commercial Projects"
//   body="Office fit-outs, reception features, signage, and architectural metal for commercial spaces. One supplier for the metalwork, from drawing to install."
//   buttonText=""
//   buttonLink=""
//   showButton={false}
//   showImage={true}
//   backgroundColor="var(--color-black-medium)"
//   imageSrc="/optimize/Corporate.webp"
//   imageAlt="Forgentis Fabrication"
//   imagePosition="left"
// />
// <WhoWeAre
//   eyebrow="Beyond Standard Applications"
//   title="Custom Industry Solutions"
//   body="If your sector is not listed, that does not mean we cannot help. Send us the drawing or the problem, and we will tell you straight whether it is a fit."
//   buttonText=""
//   buttonLink=""
//   showButton={false}
//   showImage={true}
//   imageSrc="/optimize/Solutions.webp"
//   imageAlt="Forgentis Fabrication"
// />
//  <CTASection
//   eyebrow="Discuss Your Project"
//   headline="Tell Us About Your Project"
//   body="Share your drawings or requirements and we will come back with a quote and a lead time."
//   buttonText="Get a Quote"
//   buttonLink="/consultation"
//   buttonIcon={true}
//    backgroundImage="/optimize/title-bg2.webp"
//   showGlow={true}
//   showGridPattern={true}
// />

// </div>
//     </>
//   )
// }