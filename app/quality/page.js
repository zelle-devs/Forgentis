'use client'
import DynamicHero from "@/components/About/DynamicHero";
import CTASection from "@/components/HomePage/CTASection/CTASection";
import HowWeWork2 from "@/components/HomePage/Howwework/HowWeWork2";
// import IndustriesServe from "@/components/HomePage/IndustriesServe/IndustriesServe";

import TrustedPartner from "@/components/HomePage/TrustedPartner/TrustedPartner";
// import WhoWeAre from "@/components/HomePage/WhoWeAre/WhoWeAre";
// import WhyForgentis from "@/components/HomePage/Whyforgentis/Whyforgentis";
import { Flame, SprayCan, Ruler, ShieldCheck, ClipboardCheck } from 'lucide-react';



export default function Quality() {
  return (
    <>
     <DynamicHero
  eyebrow="Quality"
  headline="Checked at Every Stage"
  subhead="From the metal that arrives to the part that ships."
  body="Quality is not a final step for us. We check the material, check the parts as we build, and sign off the finished job. You get work that matches the drawing, with records to prove it."
  primaryButtonText="Request a Quote"
  primaryButtonLink="/consultation"
  secondaryButtonText=""
  secondaryButtonLink=""
  heroImages={[]}
  titleImage="/title-bg.png"
  showRightImage={true}
  rightImage="/qualityhero.jpeg"
  rightImageAlt="Forgentis Fabrication"
/>
   <div className="scroll-content-wrapper">
     <TrustedPartner
  eyebrow="Quality Management"
  title="How We Manage Quality"
  body="Every job follows the same checks against the drawing and the spec. Clear steps, clear sign-offs, and one standard applied to every order, big or small."
  backgroundImage="/footer-bg.png"
  showMetrics={false}
  showTrustStrip={false}
  />
 <TrustedPartner
  eyebrow="Inspection"
  title="Material Inspection"
  body="We check material when it arrives, including grade, thickness, and finish, against its certificates. Starting with the right metal is the first step to a part that lasts."
  backgroundImage="/title-bg2.jpeg"
  titleColor="var(--color-black-light)"
  bodyColor="var(--color-black-light)"
  showGridPattern={false}
  showMetrics={false}
  showTrustStrip={false}
  />
   <TrustedPartner
  eyebrow="Precision and Tolerance"
  title="Precision and Tolerance"
  body="Parts are cut and machined to [TOLERANCE] and measured to confirm it. Tight tolerances mean parts fit together on site without rework."
  showMetrics={false}
  showTrustStrip={false}
  />

     <TrustedPartner
  eyebrow="Process"
  title="In-Process Inspection"
  body="We check parts during production, not just at the end. Catching an issue early costs a minute; catching it after delivery costs a lot more."
  backgroundImage="/footer-bg.png"
  showMetrics={false}
  showTrustStrip={false}
  />
   <TrustedPartner
  eyebrow="Final Inspection"
  title="Final Inspection"
  body="Before anything ships, we run a final check against the drawing: size, welds, finish, and fit. Nothing leaves the floor until it passes."
  showMetrics={false}
  showTrustStrip={false}
  />


<HowWeWork2
  eyebrow="Testing and Verification"
  title="Testing and Verification"
  body="Where a job calls for it, we test welds and finishes and verify key dimensions."
  showTimeline={true}
  showButton={false}
  steps={[
    { id: 1, icon: Flame, title: 'Weld Checks', desc: 'Visual inspection and weld quality verification' },
    { id: 2, icon: SprayCan, title: 'Coating Thickness', desc: 'Measured to ensure proper finish durability' },
    { id: 3, icon: Ruler, title: 'Dimensional Verification', desc: 'Key dimensions checked against the drawing' },
    { id: 4, icon: ShieldCheck, title: 'Material Certification', desc: 'Certified material traceability' },
    { id: 5, icon: ClipboardCheck, title: 'Final Inspection', desc: 'Complete job sign-off before dispatch' },
  ]}
/>
<TrustedPartner
  eyebrow="Safety"
  title="Safety Standards"
  body="We work to clear safety standards on the floor and in what we deliver: guarded machines, trained operators, and parts built to carry the load they are made for."
  backgroundImage="/title-bg2.jpeg"
  titleColor="var(--color-black-light)"
  bodyColor="var(--color-black-light)"
  showGridPattern={false}
  showMetrics={false}
  showTrustStrip={false}
  />
   <TrustedPartner
  eyebrow="Documentation"
  title="Documentation and Traceability"
  body="We keep records for each job, from material certificates to inspection results. If you need to trace a part back to its material and its checks, the paperwork is there."
  showMetrics={false}
  showTrustStrip={false}
  />
<CTASection
  eyebrow="Commitment"
  headline="Our Quality Commitment"
  body="If a part does not meet the drawing, we make it right. That is the standard, and it does not change with the size of the order."
  buttonText="Request a Quote"
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