'use client'
import DynamicHero from "@/components/About/DynamicHero";
import CoreCapabilities from "@/components/HomePage/CoreCapabilities/CoreCapabilities";
import CTASection from "@/components/HomePage/CTASection/CTASection";
import FacilitiesQuality from "@/components/HomePage/FacilitiesQuality/FacilitiesQuality";
import FacilitiesQuality2 from "@/components/HomePage/FacilitiesQuality/FacilitiesQuality2";
import FeaturedProjects from "@/components/HomePage/FeaturedProjects/FeaturedProjects";
import FeaturedProjects2 from "@/components/HomePage/FeaturedProjects/FeaturedProjects2";
import LuminousProjects from "@/components/HomePage/FeaturedProjects/LuminousProjects";
import HowWeWork from "@/components/HomePage/Howwework/HowWeWork";
import HowWeWork2 from "@/components/HomePage/Howwework/HowWeWork2";
import IndustriesServe from "@/components/HomePage/IndustriesServe/IndustriesServe";
import TrustedPartner from "@/components/HomePage/TrustedPartner/TrustedPartner";
import WhatWeFabricate from "@/components/HomePage/WhatWeFabricate/WhatWeFabricate";
import WhoWeAre from "@/components/HomePage/WhoWeAre/WhoWeAre";
import WhyForgentis from "@/components/HomePage/Whyforgentis/Whyforgentis";
import { Scissors, Cog, Hammer, Flame, SprayCan, Layers } from 'lucide-react';
export default function Industries() {
  return (
    <>
     <DynamicHero
       eyebrow="Industries"
       headline="Metal for the Teams That Build."
       subhead="We fabricate for businesses that construct, fit out, and manufacture."
       body="Different sectors, same need: precision metal components made to spec and delivered on time. From construction and automotive to solar and energy, medical equipment, and industrial manufacturing, here is where our work shows up most."
       primaryButtonText="Discuss Your Project"
       primaryButtonLink="/consultation"
       secondaryButtonText=""
       secondaryButtonLink=""
       heroImages={[]}
       titleImage="/title-bg.png"
       showRightImage={true}
       rightImage="/industriesHero.png"
       rightImageAlt="Forgentis Fabrication"
     />
      <div className="scroll-content-wrapper">
     
      <WhoWeAre
  eyebrow="Built Environment"
  title="Construction and Infrastructure."
  body="Structural steel, frames, supports, railings, and access metalwork for buildings and site projects. Fabricated to spec and delivered to schedule, so your build stays on track."
  buttonText=""
  buttonLink=""
  showButton={false}
  showImage={true}
  imageSrc="/Construction.jpeg"
  imageAlt="Forgentis Fabrication"
/>
 <WhoWeAre
  eyebrow="Design & Build"
  title="Architecture and Interior."
  body="Laser-cut screens, facades, cladding, feature staircases, and decorative panels. The precise, finished metalwork that architects and interior designers specify."
  buttonText=""
  buttonLink=""
  backgroundColor="var(--color-black-medium)"
  showButton={false}
  showImage={true}
  imageSrc="/Architecture.webp"
  imageAlt="Forgentis Fabrication"
  imagePosition="left"
/>
 <WhoWeAre
  eyebrow="Commercial Spaces"
  title="Retail and Commercial."
  body="Shopfronts, display fixtures, signage frames, and fit-out metalwork. Clean finishes and repeatable quality across a single store or a full rollout."
  buttonText=""
  buttonLink=""
  showButton={false}
  showImage={true}
  imageSrc="/Retail.png"
  imageAlt="Forgentis Fabrication"
/>
<WhoWeAre
  eyebrow="Industrial Applications"
  title="Industrial and Manufacturing."
  body="Machine frames, platforms, guards, brackets, and structural parts. Hard-working metal built to take load and last on the factory floor."
  buttonText=""
  buttonLink=""
  backgroundColor="var(--color-black-medium)"
  showButton={false}
  showImage={true}
  imageSrc="/Industrial.jpeg"
  imageAlt="Forgentis Fabrication"
  imagePosition="left"
/>
<WhoWeAre
  eyebrow="Guest-Facing Spaces"
  title="Hospitality."
  body="Feature metalwork, screens, railings, and fixtures for hotels, restaurants, and cafes. Finishes like PVD and brushed stainless that look sharp and hold up to daily use."
  buttonText=""
  buttonLink=""
  showButton={false}
  showImage={true}
  imageSrc="/Hospitality.jpeg"
  imageAlt="Forgentis Fabrication"
/>
<WhoWeAre
  eyebrow="Automotive Applications"
  title="Automotive."
  body="Brackets, frames, and custom metal parts for automotive and workshop use, cut and formed to spec. Accurate, repeatable components made to the tolerances automotive work demands."
  buttonText=""
  buttonLink=""
  showButton={false}
  showImage={true}
  backgroundColor="var(--color-black-medium)"
  imageSrc="/Automotive.jpeg"
  imageAlt="Forgentis Fabrication"
  imagePosition="left"
/>
<WhoWeAre
  eyebrow="Energy Infrastructure"
  title="Solar and Energy."
  body="Mounting structures, frames, brackets, and enclosures for solar and energy projects. Corrosion-resistant metalwork, fabricated to spec and finished to hold up outdoors for years."
  buttonText=""
  buttonLink=""
  showButton={false}
  showImage={true}
  imageSrc="/Solar.jpeg"
  imageAlt="Forgentis Fabrication"
/>
<WhoWeAre
  eyebrow="Precision Equipment"
  title="Medical Equipment."
  body="Precision components, frames, and housings for medical and laboratory equipment. Clean welds, tight tolerances, and stainless finishes that suit the standards this work calls for."
  buttonText=""
  buttonLink=""
  backgroundColor="var(--color-black-medium)"
  showButton={false}
  showImage={true}
  imageSrc="/Medical.jpeg"
  imageAlt="Forgentis Fabrication"
  imagePosition="left"
/>
<WhoWeAre
  eyebrow="Engineered Solutions"
  title="Engineering."
  body="Made-to-drawing components and assemblies for engineering firms and contractors. Tight tolerances, certified material, and parts that fit into the wider build."
  buttonText=""
  buttonLink=""
  showButton={false}
  showImage={true}
  imageSrc="/Engineering.jpeg"
  imageAlt="Forgentis Fabrication"
/>
<WhoWeAre
  eyebrow="Business Environments"
  title="Corporate and Commercial Projects."
  body="Office fit-outs, reception features, signage, and architectural metal for commercial spaces. One supplier for the metalwork, from drawing to install."
  buttonText=""
  buttonLink=""
  showButton={false}
  showImage={true}
  backgroundColor="var(--color-black-medium)"
  imageSrc="/Corporate.jpeg"
  imageAlt="Forgentis Fabrication"
  imagePosition="left"
/>
<WhoWeAre
  eyebrow="Beyond Standard Applications"
  title="Custom Industry Solutions."
  body="If your sector is not listed, that does not mean we cannot help. Send us the drawing or the problem, and we will tell you straight whether it is a fit."
  buttonText=""
  buttonLink=""
  showButton={false}
  showImage={true}
  imageSrc="/Solutions.jpeg"
  imageAlt="Forgentis Fabrication"
/>
 <CTASection
  eyebrow="Discuss Your Project"
  headline="Tell Us About Your Project."
  body="Share your drawings or requirements and we will come back with a quote and a lead time."
  buttonText="Get a Quote"
  buttonLink="/consultation"
  buttonIcon={true}
   backgroundImage="/title-bg2.jpeg"
  showGlow={true}
  showGridPattern={true}
/>

</div>
    </>
  )
}