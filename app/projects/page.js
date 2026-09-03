'use client'
import DynamicHero from "@/components/About/DynamicHero";
import CTASection from "@/components/HomePage/CTASection/CTASection";
import LuminousProjects from "@/components/HomePage/FeaturedProjects/LuminousProjects";
import TrustedPartner from "@/components/HomePage/TrustedPartner/TrustedPartner";
import WhatWeFabricate from "@/components/HomePage/WhatWeFabricate/WhatWeFabricate";
import WhoWeAre from "@/components/HomePage/WhoWeAre/WhoWeAre";
import WhyForgentis from "@/components/HomePage/Whyforgentis/Whyforgentis";
import { Layers, Building2, Factory, Frame, Armchair, PenTool, Sparkles } from 'lucide-react';

export default function Projects() {
  return (
    <>
      {/* Hero Section */}
      <section className="scroll-section hero-section" data-section-type="hero">
        <DynamicHero
          eyebrow="Projects"
          headline="Work We Have Delivered"
          subhead="Fabrication, finishing, and delivery across sectors."
          body="A look at the metalwork we have cut, built, and installed. Every project below started as a drawing and ended as work that fit on site."
          primaryButtonText="Start Your Project"
          primaryButtonLink="/consultation"
          secondaryButtonText=""
          secondaryButtonLink=""
          heroImages={[]}
          titleImage="/title-bg.png"
          showRightImage={true}
          rightImage="/projectHero.jpeg"
          rightImageAlt="Forgentis Fabrication"
        />
      </section>

      {/* Featured Projects */}
      <section className="scroll-section" data-section-type="large">
        <LuminousProjects
          eyebrow="Featured Projects"
          title="A selection of recent work"
          body=""
          showButton={false}
          buttonText=""
          showLocation={true}
          showDescription={false}
          projects={[
            { id: 1, icon: Building2, name: 'Project A', sector: 'Architecture', location: 'Dubai', scope: 'Facade' },
            { id: 2, icon: Factory, name: 'Project B', sector: 'Industrial', location: 'Karachi', scope: 'Machinery' },
            { id: 3, icon: Factory, name: 'Project B', sector: 'Industrial', location: 'Karachi', scope: 'Machinery' },
          ]}
        />
      </section>

      {/* Commercial Projects */}
      <section className="scroll-section" data-section-type="large">
        <TrustedPartner
          eyebrow="Commercial Projects"
          title="Commercial Projects"
          body="Shopfronts, office features, signage, and fit-out metalwork."
          showMetrics={true}
          metrics={[
            { id: 'shopfronts', target: 25, suffix: '+', label: 'Shopfronts', description: 'Retail installations' },
            { id: 'office', target: 40, suffix: '+', label: 'Office Fit-Outs', description: 'Commercial spaces' },
            { id: 'signage', target: 50, suffix: '+', label: 'Signage Projects', description: 'Custom metal signs' },
          ]}
          showTrustStrip={true}
          trustLabel="Commercial sectors we serve"
          logos={['Retail', 'Offices', 'Restaurants', 'Hotels', 'Showrooms']}
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
      </section>

      {/* Industrial Projects */}
      <section className="scroll-section" data-section-type="large">
        <TrustedPartner
          eyebrow="Industrial Projects"
          title="Industrial Projects"
          body="Structural frames, platforms, and heavy-duty parts for factories and sites."
          showMetrics={true}
          metrics={[
            { id: 'structural', target: 11, suffix: '+', label: 'Structural Frames', description: 'Heavy-duty steel frames for factory buildings' },
            { id: 'platforms', target: 4, suffix: '', label: 'Work Platforms', description: 'Access platforms, walkways, and mezzanine floors' },
            { id: 'parts', target: 7, suffix: '+', label: 'Machine Parts', description: 'Custom heavy-duty parts for industrial equipment' },
          ]}
          showTrustStrip={true}
          trustLabel="Industrial sectors served"
          logos={['Factories', 'Warehouses', 'Plants', 'Sites', 'Workshops']}
        />
      </section>

      {/* Architectural Fabrication */}
      <section className="scroll-section" data-section-type="large">
        <TrustedPartner
          eyebrow="Architectural Fabrication"
          title="Architectural Fabrication"
          body="Laser-cut screens, facades, cladding, and feature staircases."
          showMetrics={true}
          metrics={[
            { id: 'screens', target: 15, suffix: '+', label: 'Laser-Cut Screens', description: 'Decorative metal screens for interiors and facades' },
            { id: 'facades', target: 5, suffix: '+', label: 'Facades & Cladding', description: 'Metal cladding systems for modern buildings' },
            { id: 'staircases', target: 20, suffix: '+', label: 'Feature Staircases', description: 'Custom architectural staircases with railings' },
          ]}
          showTrustStrip={true}
          trustLabel="Architectural sectors served"
          logos={['Architects', 'Interiors', 'Facades', 'Residential', 'Commercial']}
          backgroundImage="/footer-bg.png"
          showGridPattern={false}
        />
      </section>

      {/* Custom Fabrication */}
      <section className="scroll-section" data-section-type="large">
        <TrustedPartner
          eyebrow="Custom Fabrication"
          title="Custom Fabrication"
          body="One-off and bespoke pieces made to a drawing or a sample."
          showMetrics={true}
          metrics={[
            { id: 'bespoke', target: 10, suffix: '+', label: 'Bespoke Pieces', description: 'One-off custom metalwork made to your drawing' },
            { id: 'sample', target: 5, suffix: '+', label: 'Sample-Based Work', description: 'Replicated from a sample or reference piece' },
            { id: 'prototypes', target: 15, suffix: '+', label: 'Prototypes', description: 'Custom prototypes for new products and designs' },
          ]}
          showTrustStrip={true}
          trustLabel="Custom work for"
          logos={['Designers', 'Artists', 'Startups', 'Individuals', 'Studios']}
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
      </section>

      {/* Project Showcase - Large Section */}
      <section className="scroll-section" data-section-type="normal">
        <WhatWeFabricate
          eyebrow="Our Expertise"
          title="Project Showcase"
          body="A visual gallery of finished work."
          buttonText="See Our Work"
          showButton={false}
          showSector={true}
          items={[
            {
              id: 1,
              icon: Building2,
              title: 'Entrance Screens',
              sector: 'Architecture',
              description: 'Facades and cladding for modern architectural projects.',
              image: '/step1.png'
            },
            {
              id: 2,
              icon: Layers,
              title: 'Railings & Staircases',
              sector: 'Construction',
              description: 'Balustrades and structural support systems.',
              image: '/step2.png'
            },
            {
              id: 3,
              icon: Frame,
              title: 'Structural Steel',
              sector: 'Infrastructure',
              description: 'Frames and supports for buildings and infrastructure.',
              image: '/step3.png'
            },
            {
              id: 4,
              icon: Armchair,
              title: 'Furniture Bases',
              sector: 'Commercial',
              description: 'Fixtures and fittings for commercial spaces.',
              image: '/step4.png'
            },
            {
              id: 5,
              icon: PenTool,
              title: 'Signage & Panels',
              sector: 'Retail',
              description: 'Decorative metal panels and custom signage.',
              image: '/step5.png'
            },
            {
              id: 6,
              icon: Sparkles,
              title: 'Custom Pieces',
              sector: 'Bespoke',
              description: 'One-off pieces made to your exact drawing.',
              image: '/forgentis.jpeg'
            }
          ]}
        />
      </section>

      {/* Project Spotlight - Large Section */}
      <section className="scroll-section" data-section-type="large">
        <WhyForgentis
          eyebrow="Project Spotlight"
          headline="Project Spotlight"
          body="A closer look at one project, start to finish."
          showPoints={true}
          points={[
            { number: '01', title: 'The Challenge', desc: 'What the client needed and the constraint, e.g. tight deadline or complex profile.' },
            { number: '02', title: 'The Fabrication', desc: 'What we cut, formed, welded, and finished, with materials.' },
            { number: '03', title: 'Delivery & Installation', desc: 'How it was delivered and installed, and on what schedule.' },
            { number: '04', title: 'The Result', desc: 'The outcome in plain terms.' },
          ]}
          showImage={true}
          image="/step3.png"
        />
      </section>

      {/* Our Role */}
      <section className="scroll-section" data-section-type="normal">
        <WhoWeAre
          eyebrow="Our Role"
          title="Our Role"
          body="On each project, state exactly what Forgentis handled: shop drawings, material, fabrication, finishing, and delivery. Being clear about our part keeps the client's role clear too."
          buttonText=""
          buttonLink=""
          showButton={false}
          showImage={true}
          imageSrc="/step1.png"
          imageAlt="Forgentis Fabrication"
          imagePosition="left"
        />
      </section>

      {/* The Result */}
      <section className="scroll-section" data-section-type="normal">
        <WhoWeAre
          eyebrow="The Result"
          title="The Result"
          body="Close each case study with the outcome: delivered on schedule, fit the first time, finish held up, or a repeat order. Keep it factual, not boastful."
          buttonText=""
          buttonLink=""
          showButton={false}
          showImage={true}
          backgroundColor="var(--color-black-medium)"
          imageSrc="/step2.png"
          imageAlt="Forgentis Fabrication"
          imagePosition="right"
        />
      </section>

      {/* Final CTA */}
      <section className="scroll-section" data-section-type="large" style={{scrollSnapAlign: "start" }}>
        <CTASection
          eyebrow="Request a Quote"
          headline="Start Your Project"
          body="Have a drawing or an idea? Send it over and we will come back with a quote."
          buttonText="Get a Quote"
          buttonLink="/consultation"
          buttonIcon={true}
          backgroundImage="/title-bg2.jpeg"
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
// import LuminousProjects from "@/components/HomePage/FeaturedProjects/LuminousProjects";
// // import IndustriesServe from "@/components/HomePage/IndustriesServe/IndustriesServe";
// import TrustedPartner from "@/components/HomePage/TrustedPartner/TrustedPartner";
// import WhatWeFabricate from "@/components/HomePage/WhatWeFabricate/WhatWeFabricate";
// import WhoWeAre from "@/components/HomePage/WhoWeAre/WhoWeAre";
// import WhyForgentis from "@/components/HomePage/Whyforgentis/Whyforgentis";
// import { Layers, Building2, Factory, Frame, Armchair, PenTool, Sparkles } from 'lucide-react';
// export default function Projects() {
//   return (
//     <>
//      <DynamicHero
//        eyebrow="Projects"
//        headline="Work We Have Delivered"
//        subhead="Fabrication, finishing, and delivery across sectors."
//        body="A look at the metalwork we have cut, built, and installed. Every project below started as a drawing and ended as work that fit on site."
//        primaryButtonText="Start Your Project"
//        primaryButtonLink="/consultation"
//        secondaryButtonText=""
//        secondaryButtonLink=""
//        heroImages={[]}
//        titleImage="/title-bg.png"
//        showRightImage={true}
//        rightImage="/projectHero.jpeg"
//        rightImageAlt="Forgentis Fabrication"
//      />
//       <div className="scroll-content-wrapper">
// <LuminousProjects
//   eyebrow="Featured Projects"
//   title="A selection of recent work"
//   body=""
//   showButton={false}
//   buttonText=""
//   showLocation={true}
//   showDescription={false}
//    projects={[
//     { id: 1, icon: Building2, name: 'Project A', sector: 'Architecture', location: 'Dubai', scope: 'Facade' },
//     { id: 2, icon: Factory, name: 'Project B', sector: 'Industrial', location: 'Karachi', scope: 'Machinery' },
//     { id: 3, icon: Factory, name: 'Project B', sector: 'Industrial', location: 'Karachi', scope: 'Machinery' },
//   ]}
// />
// <TrustedPartner
//   eyebrow="Commercial Projects"
//   title="Commercial Projects"
//   body="Shopfronts, office features, signage, and fit-out metalwork."
//   showMetrics={true}
//   metrics={[
//     { id: 'shopfronts', target: 25, suffix: '+', label: 'Shopfronts', description: 'Retail installations' },
//     { id: 'office', target: 40, suffix: '+', label: 'Office Fit-Outs', description: 'Commercial spaces' },
//     { id: 'signage', target: 50, suffix: '+', label: 'Signage Projects', description: 'Custom metal signs' },
//   ]}
//   showTrustStrip={true}
//   trustLabel="Commercial sectors we serve"
//   logos={['Retail', 'Offices', 'Restaurants', 'Hotels', 'Showrooms']}
//   showGridPattern={false}
//   titleColor="var(--color-black-medium)"
//   bodyColor="var(--color-black-medium)"
//   metricHoverColor="var(--color-blue-main)"
//   metricNumberColor="var(--color-black-medium)"
//   metricLabelColor="var(--color-black-medium)"
//   metricDescriptionColor="var(--color-black-medium)"
//   trustLabelColor="var(--color-black-medium)"
//   backgroundImage="/title-bg2.jpeg"
// />

// <TrustedPartner
//   eyebrow="Industrial Projects"
//   title="Industrial Projects"
//   body="Structural frames, platforms, and heavy-duty parts for factories and sites."
//   showMetrics={true}
//   metrics={[
//     { id: 'structural', target: 11, suffix: '+', label: 'Structural Frames', description: 'Heavy-duty steel frames for factory buildings' },
//     { id: 'platforms', target: 4, suffix: '', label: 'Work Platforms', description: 'Access platforms, walkways, and mezzanine floors' },
//     { id: 'parts', target: 7, suffix: '+', label: 'Machine Parts', description: 'Custom heavy-duty parts for industrial equipment' },
//   ]}
//   showTrustStrip={true}
//   trustLabel="Industrial sectors served"
//   logos={['Factories', 'Warehouses', 'Plants', 'Sites', 'Workshops']}
// />
// <TrustedPartner
//   eyebrow="Architectural Fabrication"
//   title="Architectural Fabrication"
//   body="Laser-cut screens, facades, cladding, and feature staircases."
//   showMetrics={true}
//   metrics={[
//     { id: 'screens', target: 15, suffix: '+', label: 'Laser-Cut Screens', description: 'Decorative metal screens for interiors and facades' },
//     { id: 'facades', target: 5, suffix: '+', label: 'Facades & Cladding', description: 'Metal cladding systems for modern buildings' },
//     { id: 'staircases', target: 20, suffix: '+', label: 'Feature Staircases', description: 'Custom architectural staircases with railings' },
//   ]}
//   showTrustStrip={true}
//   trustLabel="Architectural sectors served"
//   logos={['Architects', 'Interiors', 'Facades', 'Residential', 'Commercial']}
//   backgroundImage="/footer-bg.png"
//    showGridPattern={false}
// /><TrustedPartner
//   eyebrow="Custom Fabrication"
//   title="Custom Fabrication"
//   body="One-off and bespoke pieces made to a drawing or a sample."
//   showMetrics={true}
//   metrics={[
//     { id: 'bespoke', target: 10, suffix: '+', label: 'Bespoke Pieces', description: 'One-off custom metalwork made to your drawing' },
//     { id: 'sample', target: 5, suffix: '+', label: 'Sample-Based Work', description: 'Replicated from a sample or reference piece' },
//     { id: 'prototypes', target: 15, suffix: '+', label: 'Prototypes', description: 'Custom prototypes for new products and designs' },
//   ]}
//   showTrustStrip={true}
//   trustLabel="Custom work for"
//   logos={['Designers', 'Artists', 'Startups', 'Individuals', 'Studios']}
//   showGridPattern={false}
//   titleColor="var(--color-black-medium)"
//   bodyColor="var(--color-black-medium)"
//   metricHoverColor="var(--color-blue-main)"
//   metricNumberColor="var(--color-black-medium)"
//   metricLabelColor="var(--color-black-medium)"
//   metricDescriptionColor="var(--color-black-medium)"
//   trustLabelColor="var(--color-black-medium)"
//   backgroundImage="/title-bg2.jpeg"
// />
// <WhatWeFabricate
//   eyebrow="Our Expertise"
//   title="Project Showcase"
//   body="A visual gallery of finished work."
//   buttonText="See Our Work"
//   showButton={false}
//   showSector={true}
//   items={[
//    {
//     id: 1,
//     icon: Building2,
//     title: 'Entrance Screens',
//     sector: 'Architecture',
//     description: 'Facades and cladding for modern architectural projects.',
//     image: '/step1.png'
//   },
//   {
//     id: 2,
//     icon: Layers,
//     title: 'Railings & Staircases',
//     sector: 'Construction',
//     description: 'Balustrades and structural support systems.',
//     image: '/step2.png'
//   },
//   {
//     id: 3,
//     icon: Frame,
//     title: 'Structural Steel',
//     sector: 'Infrastructure',
//     description: 'Frames and supports for buildings and infrastructure.',
//     image: '/step3.png'
//   },
//   {
//     id: 4,
//     icon: Armchair,
//     title: 'Furniture Bases',
//     sector: 'Commercial',
//     description: 'Fixtures and fittings for commercial spaces.',
//     image: '/step4.png'
//   },
//   {
//     id: 5,
//     icon: PenTool,
//     title: 'Signage & Panels',
//     sector: 'Retail',
//     description: 'Decorative metal panels and custom signage.',
//     image: '/step5.png'
//   },
//   {
//     id: 6,
//     icon: Sparkles,
//     title: 'Custom Pieces',
//     sector: 'Bespoke',
//     description: 'One-off pieces made to your exact drawing.',
//     image: '/forgentis.jpeg'
//   }
//   ]}
// />

// <WhyForgentis
//   eyebrow="Project Spotlight"
//   headline="Project Spotlight"
//   body="A closer look at one project, start to finish."
//   showPoints={true}
//   points={[
//     { number: '01', title: 'The Challenge', desc: 'What the client needed and the constraint, e.g. tight deadline or complex profile.' },
//     { number: '02', title: 'The Fabrication', desc: 'What we cut, formed, welded, and finished, with materials.' },
//     { number: '03', title: 'Delivery & Installation', desc: 'How it was delivered and installed, and on what schedule.' },
//     { number: '04', title: 'The Result', desc: 'The outcome in plain terms.' },
//   ]}
//   showImage={true}
//   image="/step3.png"
// />
// <WhoWeAre
//   eyebrow="Our Role"
//   title="Our Role"
//   body="On each project, state exactly what Forgentis handled: shop drawings, material, fabrication, finishing, and delivery. Being clear about our part keeps the client's role clear too."
//   buttonText=""
//   buttonLink=""
//   showButton={false}
//   showImage={true}
//   imageSrc="/step1.png"
//   imageAlt="Forgentis Fabrication"
//   imagePosition="left"
// />
// <WhoWeAre
//   eyebrow="The Result"
//   title="The Result"
//   body="Close each case study with the outcome: delivered on schedule, fit the first time, finish held up, or a repeat order. Keep it factual, not boastful."
//   buttonText=""
//   buttonLink=""
//   showButton={false}
//   showImage={true}
//   backgroundColor="var(--color-black-medium)"
//   imageSrc="/step2.png"
//   imageAlt="Forgentis Fabrication"
//   imagePosition="right"
// />
  
//       <CTASection
//   eyebrow="Request a Quote"
//   headline="Start Your Project"
//   body="Have a drawing or an idea? Send it over and we will come back with a quote."
//   buttonText="Get a Quote"
//   buttonLink="/consultation"
//   buttonIcon={true}
//    backgroundImage="/title-bg2.jpeg"
//   showGlow={true}
//   showGridPattern={true}
// />
// </div>
//     </>
//   )
// }