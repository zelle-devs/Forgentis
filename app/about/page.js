import DynamicHero from "@/components/About/DynamicHero";
import CTASection from "@/components/HomePage/CTASection/CTASection";
import HowWeWork from "@/components/HomePage/Howwework/HowWeWork";
import TrustedPartner from "@/components/HomePage/TrustedPartner/TrustedPartner";
import WhoWeAre from "@/components/HomePage/WhoWeAre/WhoWeAre";
import WhyForgentis from "@/components/HomePage/Whyforgentis/Whyforgentis";

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="scroll-section hero-section" data-section-type="hero">
        <DynamicHero
          eyebrow="About us"
          headline="Metal Is All We Do"
          subhead="Forgentis Fabrications is a precision metal fabrication and industrial manufacturing company built on precise cutting, clean welding, and work that lasts."
          body="We work with architects, contractors, designers, and manufacturers who need metal made right and delivered on time. From a single bracket to a full steel structure, every job gets the same standard."
          primaryButtonText=""
          primaryButtonLink=""
          secondaryButtonText=""
          secondaryButtonLink=""
          heroImages={[]}
          titleImage="/optimize/title-bg.webp"
          showRightImage={true}
          rightImage="/optimize/abouthero.webp"
          rightImageAlt="Forgentis Fabrication"
        />
      </section>

      {/* Our Story Section */}
      <section className="scroll-section" data-section-type="normal">
        <TrustedPartner
          eyebrow="Forgentis"
          title="Our Story"
          body="Forgentis started on a simple idea: metalwork should fit the first time. Since [FOUNDING YEAR], we have grown from [STARTING POINT, e.g. a small workshop] into a full fabrication floor serving [MARKETS OR REGIONS]. The focus has not changed. We cut to the drawing, we weld clean, and we deliver on the date we promise."
          backgroundImage="/optimize/footer-bg.webp"
          showMetrics={true}
          metrics={[
            {
              id: 'founded',
              target: 2022,
              suffix: '',
              label: 'Founded',
              description: 'Our beginning',
            },
            {
              id: 'starting-point',
              target: 1,
              suffix: '',
              label: 'Fabrication Floor',
              description: 'Started as a small workshop',
            },
            {
              id: 'markets',
              target: 3,
              suffix: '',
              label: 'Markets Served',
              description: 'Across key regions',
            },
          ]}
          showTrustStrip={false}
        />
      </section>

      {/* Our Expertise + Manufacturing Philosophy - Combined Large Section */}
      <section className="scroll-section" data-section-type="short">
        <HowWeWork
          eyebrow="Our Expertise"
          title="What We Are Good At"
          body="Our work sits where heavy fabrication meets fine detail. We cut and form structural steel, and we also produce laser-cut screens and finishes precise enough for interiors and shopfronts."
          buttonText=""
          buttonLink=""
          showButton={false}
          showTimeline={true}
        />
        </section>
        <section className="scroll-section" data-section-type="short">
        <TrustedPartner
          eyebrow="Our Manufacturing Philosophy"
          title="Get It Right Before We Cut"
          body="We would rather get the drawing right before we cut than fix a part after. So we review every spec, plan the material, and check as we go. It keeps waste down, keeps costs steady, and keeps your schedule intact."
          showMetrics={false}
          showTrustStrip={false}
          showGridPattern={false}
          backgroundImage="/optimize/title-bg2.webp"
          eyebrowColor="var(--color-blue-main)"
          titleColor="var(--color-black-light)"
          bodyColor="var(--color-black-light)"
        />
      </section>

      {/* Quality Commitment Section */}
      <section className="scroll-section" data-section-type="normal">
        <WhoWeAre
          eyebrow="Our Commitment to Quality"
          title="Quality Is Not a Final Step"
          body="We check quality at every stage, from the material that arrives to the part that ships. Every job is measured against the drawing and signed off before it leaves the floor."
          buttonText="Our Quality Standards"
          buttonLink="/quality"
          showButton={true}
          showImage={true}
          imageSrc="/optimize/Quality.webp"
          imageAlt="Forgentis Fabrication"
          imagePosition="right"
        />
      </section>

      {/* Our People Section */}
      <section className="scroll-section" data-section-type="normal">
        <TrustedPartner
          eyebrow="Our People"
          title="Skilled Hands, Steady Standards"
          body="Our team brings together experienced designers, machine operators, fabricators, welders, and production professionals who take pride in clean work. [TEAM SIZE] people run the floor, and many have been with us for [AVERAGE TENURE]."
          showMetrics={true}
          metrics={[
            {
              id: 'team',
              target: 25,
              suffix: '+',
              label: 'Team Members',
              description: 'Skilled fabrication team',
            },
            {
              id: 'tenure',
              target: 4,
              suffix: '+',
              label: 'Average Tenure',
              description: 'Years of experience',
            },
          ]}
          showTrustStrip={false}
        />
      </section>

      {/* Our Facilities Section */}
      <section className="scroll-section" data-section-type="normal">
        <WhoWeAre
          eyebrow="Our Facilities"
          title="One Roof, Full Control"
          body="We run laser cutting, press brakes, welding bays, and finishing in our own [FACILITY SIZE] workshop. Keeping it all in-house means we control the schedule and the standard from first cut to final check."
          buttonText="Tour the Facility"
          buttonLink="/facilities"
          showButton={true}
          showImage={true}
          imageSrc="/optimize/Facilities.webp"
          imageAlt="Forgentis Fabrication"
          imagePosition="right"
        />
      </section>

      {/* Built for B2B Section - Change to normal */}
      <section className="scroll-section" data-section-type="short">
        <TrustedPartner
          eyebrow="Built for B2B"
          title="Set Up for Business Clients"
          body="We are built to work with procurement teams, project managers, and site engineers. That means clear quotes, approved shop drawings, certified material, and delivery that lands when you need it."
          showMetrics={false}
          showTrustStrip={false}
          backgroundImage="/optimize/footer-bg.webp"
        />
      </section>

      {/* Why Choose Forgentis Section */}
      <section className="scroll-section" data-section-type="normal">
        <WhyForgentis
          eyebrow="Why Businesses Choose Forgentis"
          headline="Why Businesses Choose Forgentis"
          body=""
          showPoints={true}
          points={[
            { number: '01', title: 'Precision That Fits', desc: 'Work that fits on site the first time.' },
            { number: '02', title: 'On-Time Delivery', desc: 'Delivery on the date we promise.' },
            { number: '03', title: 'Single Point of Contact', desc: 'One point of contact from drawing to delivery.' },
            { number: '04', title: 'Trusted Quality & Finishes', desc: 'Finishes and materials you can trust.' },
          ]}
          showImage={false}
        />
      </section>

      {/* CTA Section - Change to normal */}
      <section className="scroll-section" data-section-type="large" style={{scrollSnapAlign: "start" }}>
        <CTASection
          eyebrow="Partner With Us"
          headline="Let's Work Together"
          body="Send us your drawings, or tell us about your project. We will come back with a clear quote and a plan."
          buttonText="Get a Quote"
          buttonLink="/consultation"
          backgroundImage="/optimize/footer-bg.webp"
          showGlow={true}
          showGridPattern={true}
        />
      </section>
    </>
  )
}


// import DynamicHero from "@/components/About/DynamicHero";
// import CTASection from "@/components/HomePage/CTASection/CTASection";
// import HowWeWork from "@/components/HomePage/Howwework/HowWeWork";
// import TrustedPartner from "@/components/HomePage/TrustedPartner/TrustedPartner";
// import WhoWeAre from "@/components/HomePage/WhoWeAre/WhoWeAre";
// import WhyForgentis from "@/components/HomePage/Whyforgentis/Whyforgentis";



// export default function About() {
//   return (
//     <>
//      <DynamicHero
//   eyebrow="About us"
//   headline="Metal Is All We Do"
//   subhead="Forgentis Fabrications is a precision metal fabrication and industrial manufacturing company built on precise cutting, clean welding, and work that lasts."
//   body="We work with architects, contractors, designers, and manufacturers who need metal made right and delivered on time. From a single bracket to a full steel structure, every job gets the same standard."
//   primaryButtonText=""
//   primaryButtonLink=""
//   secondaryButtonText=""
//   secondaryButtonLink=""
//   heroImages={[]}
//   titleImage="/optimize/title-bg.webp"
//   showRightImage={true}
//   rightImage="/optimize/abouthero.webp"
//   rightImageAlt="Forgentis Fabrication"
// />
//    <div className="scroll-content-wrapper">
//      <TrustedPartner
//   eyebrow="Forgentis"
//   title="Our Story"
//   body=" Forgentis started on a simple idea: metalwork should fit the first time. Since [FOUNDING YEAR], we have grown from [STARTING POINT, e.g. a small workshop] into a full fabrication floor serving [MARKETS OR REGIONS]. The focus has not changed. We cut to the drawing, we weld clean, and we deliver on the date we promise."
//   backgroundImage="/optimize/footer-bg.webp"
//   // overlayOpacity={0.5}
//   showMetrics={true}
//  metrics={[
//   {
//     id: 'founded',
//     target: 2022,
//     suffix: '',
//     label: 'Founded',
//     description: 'Our beginning',
//   },
//   {
//     id: 'starting-point',
//     target: 1,
//     suffix: '',
//     label: 'Fabrication Floor',
//     description: 'Started as a small workshop',
//   },
//   {
//     id: 'markets',
//     target: 3,
//     suffix: '',
//     label: 'Markets Served',
//     description: 'Across key regions',
//   },
// ]}
//   showTrustStrip={false}
//   // trustLabel="Trusted by teams across"
//   // logos={['ARCHITECTS', 'CONTRACTORS', 'MANUFACTURERS', 'DESIGN STUDIOS', 'REAL ESTATE', 'ENGINEERING']}
// />

//  <HowWeWork
//   eyebrow="Our Expertise"
//   title="What We Are Good At"
//   body="Our work sits where heavy fabrication meets fine detail. We cut and form structural steel, and we also produce laser-cut screens and finishes precise enough for interiors and shopfronts."
//   buttonText=""
//   buttonLink=""
//   showButton={false}
//   showTimeline={true}
// />
//  <TrustedPartner
//   eyebrow="Our Manufacturing Philosophy"
//   title="Get It Right Before We Cut"
//   body="We would rather get the drawing right before we cut than fix a part after. So we review every spec, plan the material, and check as we go. It keeps waste down, keeps costs steady, and keeps your schedule intact."
//   showMetrics={false}
//   showTrustStrip={false}
//   showGridPattern={false}
//   backgroundImage="/optimize/title-bg2.webp"
//   eyebrowColor="var(--color-blue-main)"
//   titleColor="var(--color-black-light)"
//   bodyColor="var(--color-black-light)"
//   // overlayOpacity={0.5}
// />
// <WhoWeAre
//   eyebrow="Our Commitment to Quality"
//   title="Quality Is Not a Final Step"
//   body=" We check quality at every stage, from the material that arrives to the part that ships. Every job is measured against the drawing and signed off before it leaves the floor."
//   buttonText="Our Quality Standards"
//   buttonLink="/quality"
//   showButton={true}
//   showImage={true}
//   imageSrc="/optimize/Quality.webp"
//   imageAlt="Forgentis Fabrication"
//   imagePosition="right"
// />
// <TrustedPartner
//   eyebrow="Our People"
//   title="Skilled Hands, Steady Standards"
//   body="Our team brings together experienced designers, machine operators, fabricators, welders, and production professionals who take pride in clean work. [TEAM SIZE] people run the floor, and many have been with us for [AVERAGE TENURE]."
//   showMetrics={true}
//   metrics={[
//   {
//     id: 'team',
//     target: 25,
//     suffix: '+',
//     label: 'Team Members',
//     description: 'Skilled fabrication team',
//   },
//   {
//     id: 'tenure',
//     target: 4,
//     suffix: '+',
//     label: 'Average Tenure',
//     description: 'Years of experience',
//   },
// ]}
//   showTrustStrip={false}
//   // backgroundImage="/optimize/footer-bg.webp"
//   // overlayOpacity={0.5}
// />
// <WhoWeAre
//   eyebrow="Our Facilities"
//   title="One Roof, Full Control"
//   body="We run laser cutting, press brakes, welding bays, and finishing in our own [FACILITY SIZE] workshop. Keeping it all in-house means we control the schedule and the standard from first cut to final check."
//   buttonText="Tour the Facility"
//   buttonLink="/facilities"
//   showButton={true}
//   showImage={true}
//   imageSrc="/optimize/Facilities.webp"
//   imageAlt="Forgentis Fabrication"
//   imagePosition="right"
// />
//  <TrustedPartner
//   eyebrow="Built for B2B"
//   title="Set Up for Business Clients"
//   body="We are built to work with procurement teams, project managers, and site engineers. That means clear quotes, approved shop drawings, certified material, and delivery that lands when you need it."
//   showMetrics={false}
//   showTrustStrip={false}
//   backgroundImage="/optimize/footer-bg.webp"
//   // overlayOpacity={0.5}
// />
// <WhyForgentis
//   eyebrow="Why Businesses Choose Forgentis"
//   headline="Why Businesses Choose Forgentis"
//   body=""
//   showPoints={true}
//    points={[
//     { number: '01', title: 'Precision That Fits', desc: 'Work that fits on site the first time.' },
//     { number: '02', title: 'On-Time Delivery', desc: 'Delivery on the date we promise.' },
//     { number: '03', title: 'Single Point of Contact', desc: 'One point of contact from drawing to delivery.' },
//     { number: '04', title: 'Trusted Quality & Finishes', desc: 'Finishes and materials you can trust.' },
//   ]}
//   showImage={false}
//   // image="/step1.png"
// />
//    <CTASection
//   eyebrow="Partner With Us"
//   headline="Let's Work Together"
//   body="Send us your drawings, or tell us about your project. We will come back with a clear quote and a plan."
//   buttonText="Get a Quote"
//   buttonLink="/consultation"
//   backgroundImage="/optimize/footer-bg.webp"
//   showGlow={true}
//   showGridPattern={true}
// />
// </div>
//     </>
//   )
// }