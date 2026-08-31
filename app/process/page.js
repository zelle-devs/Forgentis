import DynamicHero from "@/components/About/DynamicHero";
// import HowWeWork2 from "@/components/HomePage/Howwework/HowWeWork2";
import WhoWeAre from "@/components/HomePage/WhoWeAre/WhoWeAre";
// import WhyForgentis from "@/components/HomePage/Whyforgentis/Whyforgentis";
// import TrustedPartner from "@/components/HomePage/TrustedPartner/TrustedPartner";
import CTASection from "@/components/HomePage/CTASection/CTASection";

export default function Process() {
  return (
    <>
      {/* Section 1: Hero */}
      <DynamicHero
        eyebrow="Our process"
        headline="From Concept to Completion"
        subhead="Nine clear steps, one standard, no surprises."
        body="Every job runs the same path, so you always know where your work is and what happens next. Here is how a project moves through our floor."
        primaryButtonText="Start Your Project"
        primaryButtonLink="/consultation"
        secondaryButtonText=""
        secondaryButtonLink=""
        heroImages={[]}
        titleImage="/title-bg.png"
        showRightImage={true}
        rightImage="/step4.png"
        rightImageAlt="Forgentis Process"
      />

      <div className="scroll-content-wrapper">
        {/* Section 2: Project Brief */}
        <WhoWeAre
          eyebrow="Step 1"
          title="Project Brief"
          body="It starts with your drawing, sample, or idea. We go through the spec, the material, the finish, and the deadline, so we are clear on the job before anything is cut."
          showDivider={true}
          showImage={true}
          imageSrc="/step1.png"
            imageAlt="Forgentis Fabrication"
          showButton={false}
          />

        {/* Section 3: Engineering and Design Review */}
        <WhoWeAre
          eyebrow="Step 2"
          title="Engineering and Design Review"
          body="We review the drawing for fit, strength, and how it will be made, then prepare shop drawings for your approval. This is where we catch problems on paper, not on the floor."
          showImage={true}
          imageSrc="/step2.png"
            imageAlt="Forgentis Fabrication"
          showButton={false}
          backgroundColor="var(--color-black-medium)"
          imagePosition="left"
        />

        {/* Section 4: Material Planning */}
        <WhoWeAre
          eyebrow="Step 3"
          title="Material Planning"
          body="We source the right grade and finish of metal, with certificates, and plan the cutting to keep waste low. Material is booked around your delivery date."
          showImage={true}
          imageSrc="/step3.png"
            imageAlt="Forgentis Fabrication"
          showButton={false}
        />

 <WhoWeAre
          eyebrow="Step 4"
          title="Production"
          body="Cutting, forming, and machining begin. Computer-controlled machines hold each part to [TOLERANCE], so the work is consistent from the first piece to the last."
          showImage={true}
          imageSrc="/step2.png"
            imageAlt="Forgentis Fabrication"
          showButton={false}
          backgroundColor="var(--color-black-medium)"
          imagePosition="left"
        />

        {/* Section 4: Material Planning */}
        <WhoWeAre
          eyebrow="Step 5"
          title="Quality Control"
          body="We check parts against the drawing as they are made, not just at the end. Any part that is off is corrected before it moves on."
          showImage={true}
          imageSrc="/step3.png"
            imageAlt="Forgentis Fabrication"
          showButton={false}
        />
 <WhoWeAre
          eyebrow="Step 6"
          title="Finishing"
          body="Parts are coated or treated to spec: PVD, powder coating, brushed or matte stainless, or anti-corrosion for outdoor work. The finish protects the metal and sets the final look."
          showImage={true}
          imageSrc="/step2.png"
            imageAlt="Forgentis Fabrication"
          showButton={false}
          backgroundColor="var(--color-black-medium)"
          imagePosition="left"
        />

        {/* Section 4: Material Planning */}
        <WhoWeAre
          eyebrow="Step 7"
          title="Assembly"
          body="Where a job calls for it, we weld and assemble finished units in the workshop, so they arrive ready to install rather than in loose parts."
          showImage={true}
          imageSrc="/step3.png"
            imageAlt="Forgentis Fabrication"
          showButton={false}
        />
 <WhoWeAre
          eyebrow="Step 8"
          title="Delivery"
          body="We pack and deliver on the agreed date, handled to protect the finish. Work arrives cut to fit and ready for site."
          showImage={true}
          imageSrc="/step2.png"
            imageAlt="Forgentis Fabrication"
          showButton={false}
          backgroundColor="var(--color-black-medium)"
          imagePosition="left"
        />


        {/* CTA */}
        <CTASection
          eyebrow="Project Support"
          headline="Project Support"
          body="We stay reachable after delivery. If you need a follow-up run, a fit check, or extra parts, you are dealing with the same team that built the job."
          buttonText="Request a Quote"
          buttonLink="/consultation"
          backgroundImage="/title-bg2.jpeg"
          showGlow={true}
          showGridPattern={true}
        />
      </div>
    </>
  )
}