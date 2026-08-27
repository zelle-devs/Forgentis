'use client'
import DynamicHero from "@/components/About/DynamicHero";
import CTASection from "@/components/HomePage/CTASection/CTASection";
import HowWeWork2 from "@/components/HomePage/Howwework/HowWeWork2";
import IndustriesServe from "@/components/HomePage/IndustriesServe/IndustriesServe";

import TrustedPartner from "@/components/HomePage/TrustedPartner/TrustedPartner";
import WhoWeAre from "@/components/HomePage/WhoWeAre/WhoWeAre";
import WhyForgentis from "@/components/HomePage/Whyforgentis/Whyforgentis";
import { Scissors, Hammer, Cog, Flame, SprayCan, Check, Package } from 'lucide-react';



export default function Facilities() {
  return (
    <>
     <DynamicHero
  eyebrow="Facilities"
  headline="Where the Work Gets Made."
  subhead="One workshop, every stage of fabrication under one roof."
  body="Our facility is set up to take a job from raw metal to finished part without leaving the building. That keeps the schedule tight and the standard consistent."
  primaryButtonText="Request a Quote"
  primaryButtonLink="/consultation"
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
  eyebrow="Our Facility"
  title="Manufacturing Infrastructure."
  body="A [FACILITY SIZE] fabrication plant laid out for smooth flow, from material store to cutting, forming, welding, finishing, and dispatch. Room to handle small jobs and large structures side by side."
  backgroundImage="/footer-bg.png"
  showMetrics={false}
  showTrustStrip={false}
  />
<WhyForgentis
  eyebrow="Forgentis"
  headline="Machinery and Equipment."
  body="We run 25+ machines across cutting, forming, welding, and finishing."
  showPoints={true}
  showImage={false}
  points={[
    { 
      number: '01', 
      title: 'Fiber Laser Cutter', 
      desc: 'Bed 3000 x 1500mm, up to 25mm (subject to material and grade)' 
    },
    { 
      number: '02', 
      title: 'Press Brake', 
      desc: '250 tons, up to 4000mm' 
    },
    { 
      number: '03', 
      title: 'CNC Machining', 
      desc: 'Tolerance ±0.05mm' 
    },
    { 
      number: '04', 
      title: 'Welding', 
      desc: 'MIG, TIG, spot' 
    },
    { 
      number: '05', 
      title: 'Finishing', 
      desc: 'Powder coating line, PVD, brushed stainless' 
    },
  ]}
/>
<HowWeWork2
  eyebrow="Inside the Floor"
  title="The Fabrication Floor."
  body="The floor is organized by stage, so each job moves in one direction: cut, form, weld, finish, check, dispatch. Less handling, fewer errors, faster turnaround."
  showTimeline={true}
  showButton={false}
  steps={[
    { id: 1, icon: Scissors, title: 'Cut', desc: 'Laser cutting and CNC machining' },
    { id: 2, icon: Hammer, title: 'Form', desc: 'Bending and shaping metal' },
    { id: 3, icon: Flame, title: 'Weld', desc: 'MIG, TIG, and spot welding' },
    { id: 4, icon: SprayCan, title: 'Finish', desc: 'Powder coating and PVD' },
    { id: 5, icon: Check, title: 'Check', desc: 'Quality inspection at every stage' },
    { id: 6, icon: Package, title: 'Dispatch', desc: 'Packed and delivered on schedule' },
  ]}
/>
<TrustedPartner
  eyebrow="Precision and Production"
  title="Precision and Production."
  body="Computer-controlled machines hold each part to ±0.05mm, whether we make one or 1000. Same setup, same result, every run."
  showMetrics={true}
  metrics={[
    { id: 'tolerance', target: 0.05, decimal: 2, suffix: 'mm', label: 'Tolerance', description: 'Held on every part' },
    { id: 'quantity', target: 1000, suffix: '+', label: 'Quantity', description: 'One or a thousand' },
    { id: 'repeatability', target: 100, suffix: '%', label: 'Repeatability', description: 'Same result every run' },
  ]}
  showTrustStrip={false}
/>
<TrustedPartner
  eyebrow="Material Handling"
  title="Material Handling."
  body="Cranes and lifting gear up to 10 tons move heavy sections safely across the floor. Proper handling protects the metal, the finish, and the team."
  showMetrics={false}
  showTrustStrip={false}
  showGridPattern={false}
  backgroundImage="/title-bg2.jpeg"
  titleColor="var(--color-black-light)"
  bodyColor="var(--color-black-light)"
/>
<WhoWeAre
  eyebrow="Quality Control"
  title="Quality Control."
  body="A dedicated checking area lets us measure parts against the drawing before they move to the next stage or ship."
  buttonText="Our Quality Standards"
  buttonLink="#"
  showButton={true}
  showImage={true}
  imageSrc="/step2.png"
  imageAlt="Forgentis Material Handling"
  imagePosition="right"
/>
<TrustedPartner
  eyebrow="Production Capacity"
  title="Production Capacity."
  body="We can produce up to 50 tons per month, with room to scale for larger orders. Lead times are planned around your delivery date."
  showMetrics={true}
  metrics={[
    { id: 'output', target: 50, suffix: ' tons', label: 'Monthly Output', description: 'Production capacity' },
    { id: 'leadtime', target: 2, suffix: ' weeks', label: 'Lead Time', description: 'Standard delivery schedule' },
    { id: 'scale', target: 100, suffix: '%', label: 'Scalability', description: 'Room to grow for larger orders' },
  ]}
  showTrustStrip={false}
/>
<TrustedPartner
  eyebrow="Safety and Compliance"
  title="Safety and Compliance."
  body="The floor runs to clear safety rules: trained operators, guarded machines, protective gear, and regular checks. A safe floor is also a floor that delivers on time."
  showMetrics={true}
  metrics={[
    { id: 'training', target: 100, suffix: '%', label: 'Trained Operators', description: 'Certified and skilled team' },
    { id: 'safety', target: 0, suffix: ' incidents', label: 'Safety Record', description: 'Regular checks and audits' },
    { id: 'compliance', target: 100, suffix: '%', label: 'Compliance', description: 'Meets all safety standards' },
  ]}
  showTrustStrip={false}
  backgroundImage="/footer-bg.png"
/>
<WhoWeAre
  eyebrow="Forgentis"
  title="Inside Forgentis."
  body="See how the work gets made, from the first cut to the finished piece."
  buttonText="Tour the Facility"
  buttonLink="#"
  showButton={true}
  showImage={true}
  imageSrc="/step1.png"
  imageAlt="Forgentis Material Handling"
  imagePosition="right"
/>
</div>
    </>
  )
}