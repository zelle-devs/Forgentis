'use client'
import DynamicHero from "@/components/About/DynamicHero";
import CTASection from "@/components/HomePage/CTASection/CTASection";
import IndustriesServe from "@/components/HomePage/IndustriesServe/IndustriesServe";
import TrustedPartner from "@/components/HomePage/TrustedPartner/TrustedPartner";
import WhoWeAre from "@/components/HomePage/WhoWeAre/WhoWeAre";
import { Scissors, Cog, Hammer, Flame, SprayCan, Layers } from 'lucide-react';
export default function Capabilities() {
  return (
    <>
     <DynamicHero
       eyebrow="Capabilities"
       headline="One Floor, Every Step in Metal."
       subhead="Cutting, forming, molding, welding, and finishing, all under one roof."
       body="We take metal from raw sheet and section to a finished, ready-to-install part, supporting projects from design and prototyping through to production. Because every step happens in our own workshop, the quality and the schedule stay in our hands."
       primaryButtonText="Request a Quote"
       primaryButtonLink="/contact"
       secondaryButtonText=""
       secondaryButtonLink=""
       heroImages={[]}
       titleImage="/title-bg.png"
       showRightImage={true}
       rightImage="/step3.png"
       rightImageAlt="Forgentis Fabrication"
     />
      <div className="scroll-content-wrapper">
      <TrustedPartner
  eyebrow="Forgentis"
  title="Metal Fabrication."
  body="The core of what we do. We turn steel, stainless, aluminum, and brass into parts and structures, from single components to large assemblies. Sheet, plate, tube, and section, cut and built to your drawing."
  showMetrics={false}
  showTrustStrip={false}
  backgroundImage="/footer-bg.png"
/>
      <WhoWeAre
  eyebrow="Forgentis"
  title="CNC and Precision Manufacturing."
  body="Computer-controlled machines cut and shape each part the same way, every time. That means repeatable parts held to [TOLERANCE], whether you need one or [QUANTITY]."
  buttonText=""
  buttonLink=""
  showButton={false}
  showImage={true}
  imageSrc="/step2.png"
  imageAlt="Forgentis Fabrication"
/>
 <WhoWeAre
  eyebrow="Forgentis"
  title="Laser Cutting."
  body=" Our CNC lasers cut clean, sharp edges in sheet metal and plate with almost no finishing needed. Good for detailed screens, panels, brackets, and precise profiles. We cut [MATERIAL RANGE] up to 25mm, subject to material type and grade, on beds up to [BED SIZE]."
  buttonText=""
  buttonLink=""
  showButton={false}
  showImage={true}
  imageSrc="/step1.png"
  imageAlt="Forgentis Fabrication"
  imagePosition="left"
/>
 <WhoWeAre
  eyebrow="Forgentis"
  title="Bending and Forming."
  body="Press brakes and rolling equipment bend and form flat metal into exact angles and curves, including molding and pinching operations for more complex shapes. Every bend is set to the drawing, so parts line up when they reach the site."
  buttonText=""
  buttonLink=""
  showButton={false}
  showImage={true}
  imageSrc="/step3.png"
  imageAlt="Forgentis Fabrication"
/>
<WhoWeAre
  eyebrow="Forgentis"
  title="Welding and Assembly."
  body="Our welders join parts with clean, strong welds using MIG, TIG, and spot welding. We assemble finished units in the workshop so they arrive ready to install, not in loose pieces."
  buttonText=""
  buttonLink=""
  showButton={false}
  showImage={true}
  imageSrc="/step4.png"
  imageAlt="Forgentis Fabrication"
  imagePosition="left"
/>
<WhoWeAre
  eyebrow="Forgentis"
  title="Finishing."
  body="A good finish protects the metal and sets the look. We offer PVD coating (including gold, rose gold, and black chrome), electrostatic powder coating, and brushed or matte stainless, plus anti-corrosion treatment for outdoor work."
  buttonText=""
  buttonLink=""
  showButton={false}
  showImage={true}
  imageSrc="/step2.png"
  imageAlt="Forgentis Fabrication"
/>
<WhoWeAre
  eyebrow="Forgentis"
  title="Custom Fabrication."
  body=" Bring us a drawing, a photo, or a sample. We fabricate one-off and bespoke pieces for architects and designers, from decorative screens to custom fixtures, developed around your design, dimensional, and application requirements."
  buttonText=""
  buttonLink=""
  showButton={false}
  showImage={true}
  imageSrc="/step4.png"
  imageAlt="Forgentis Fabrication"
  imagePosition="left"
/>
<WhoWeAre
  eyebrow="Forgentis"
  title="Prototyping and Production."
  body="We can make a single sample first, get your sign-off, then move to full production. It is the safe way to confirm fit and finish before we build the batch."
  buttonText=""
  buttonLink=""
  showButton={false}
  showImage={true}
  imageSrc="/step2.png"
  imageAlt="Forgentis Fabrication"
/>
<WhoWeAre
  eyebrow="Forgentis"
  title="Large-Scale Manufacturing."
  body="For bigger orders and repeat runs, we scale production while holding the same tolerances. Capacity up to [OUTPUT OR VOLUME] per [PERIOD], planned around your delivery dates."
  buttonText=""
  buttonLink=""
  showButton={false}
  showImage={true}
  imageSrc="/step4.png"
  imageAlt="Forgentis Fabrication"
  imagePosition="left"
/>
 <CTASection
  eyebrow="Forgentis"
  headline="Quality Inspection"
  body="Every part is measured and checked against the drawing before it ships. We record the results, so each job comes with proof it was made right."
  buttonText="Our Quality Standards"
  buttonLink="/quality"
  buttonIcon={false}
   backgroundImage="/title-bg2.jpeg"
  showGlow={true}
  showGridPattern={true}
/>

<IndustriesServe
  eyebrow="Our Capabilities"
  title="Capabilities at a Glance."
  body=""
  showButton={false}
  buttonText=""
  buttonLink=""
  showCards={true}
 industries={[
  { id: 1, icon: Scissors, title: 'Laser cutting', description: '[MATERIAL RANGE], up to 25mm (subject to material and grade), bed [BED SIZE]' },
  { id: 2, icon: Cog, title: 'CNC and machining', description: 'tolerance [TOLERANCE]' },
  { id: 3, icon: Hammer, title: 'Bending, forming, molding, and pinching', description: 'up to [MAX LENGTH OR TONNAGE]' },
  { id: 4, icon: Flame, title: 'Welding', description: 'MIG, TIG, spot' },
  { id: 5, icon: SprayCan, title: 'Finishing', description: 'PVD, powder coating, brushed and matte stainless, anti-corrosion' },
  { id: 6, icon: Layers, title: 'Materials', description: 'mild steel, stainless, aluminum, brass' },
]}
/>
      <CTASection
  eyebrow="Request a Fabrication Quote"
  headline="Have a Drawing? Get a Price."
  body="Send us your drawing or specification and we will come back with a quote and a lead time."
  buttonText="Get a Quote"
  buttonLink="/contact"
  buttonIcon={true}
   backgroundImage="/title-bg2.jpeg"
  showGlow={true}
  showGridPattern={true}
/>
</div>
    </>
  )
}