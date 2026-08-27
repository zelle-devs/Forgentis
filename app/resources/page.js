'use client'
import DynamicHero from "@/components/About/DynamicHero";
import WhoWeAre from "@/components/HomePage/WhoWeAre/WhoWeAre";
import WhyForgentis from "@/components/HomePage/Whyforgentis/Whyforgentis";
import TrustedPartner from "@/components/HomePage/TrustedPartner/TrustedPartner";
import IndustriesServe from "@/components/HomePage/IndustriesServe/IndustriesServe";
import LuminousProjects from "@/components/HomePage/FeaturedProjects/LuminousProjects";
import CTASection from "@/components/HomePage/CTASection/CTASection";
import { FileText, Download, Layers, BookOpen, Newspaper, FolderOpen, HelpCircle } from 'lucide-react';

export default function Resources() {
  return (
    <>
      {/* Section 1: Hero */}
      <DynamicHero
        eyebrow="Resources"
        headline="Guides, Specs, and Answers."
        subhead="Useful reading for teams that specify and buy metalwork."
        body="A place to find fabrication guides, material notes, and answers to common questions, so you can plan and spec with confidence."
        primaryButtonText="Contact Us"
        primaryButtonLink="/consultation"
        secondaryButtonText=""
        secondaryButtonLink=""
        heroImages={[]}
        titleImage="/title-bg.png"
        showRightImage={true}
        rightImage="/step4.png"
        rightImageAlt="Forgentis Resources"
      />

      <div className="scroll-content-wrapper">
        {/* Section 2: Fabrication Guides */}
        <IndustriesServe
          eyebrow="Fabrication Guides"
          title="Fabrication Guides."
          body="Plain-language guides on how parts are cut, formed, welded, and finished, and what that means for your drawings."
          showCards={true}
          showButton={false}
          showArrowButton={false}
          industries={[
            { id: 1, icon: FileText, title: 'Laser Cutting Guide', description: 'How laser cutting works and design considerations' },
            { id: 2, icon: Layers, title: 'Forming Guide', description: 'Bending, folding, and pressing explained' },
            { id: 3, icon: FileText, title: 'Welding Guide', description: 'MIG, TIG, and spot welding for fabrication' },
            { id: 4, icon: FileText, title: 'Finishing Guide', description: 'Powder coating, PVD, and surface treatments' },
            { id: 5, icon: FileText, title: 'Drawing Guide', description: 'How to prepare drawings for quoting' },
            { id: 6, icon: FileText, title: 'Material Guide', description: 'Choosing the right metal for your job' },
          ]}
        />

        {/* Section 3: Technical Resources */}
        <TrustedPartner
          eyebrow="Technical Resources"
          title="Technical Resources."
          body="Tolerances, material thicknesses, finish options, and the file formats we accept for quoting."
          showMetrics={true}
          metrics={[
            { id: 'tolerance', target: 0.05, decimal: 2, suffix: 'mm', label: 'Tolerance', description: 'Standard machining tolerance' },
            { id: 'thickness', target: 25, suffix: 'mm', label: 'Max Thickness', description: 'Laser cutting capacity' },
            { id: 'formats', target: 4, suffix: '', label: 'File Formats', description: 'DWG, DXF, PDF, STEP' },
          ]}
          showTrustStrip={false}
          backgroundColor="var(--color-black-light)"
        />

        {/* Section 4: Material Guides */}
        <WhyForgentis
          eyebrow="Material Guides"
          headline="Material Guides."
          body="How mild steel, stainless, aluminum, and brass compare on strength, finish, cost, and use. Pick the right metal before you commit to a drawing."
          showPoints={true}
          showImage={false}
          points={[
            { number: '01', title: 'Mild Steel', desc: 'Strong, cost-effective, ideal for structural work' },
            { number: '02', title: 'Stainless Steel', desc: 'Corrosion-resistant, premium finish, food-safe' },
            { number: '03', title: 'Aluminum', desc: 'Lightweight, good for architectural elements' },
            { number: '04', title: 'Brass', desc: 'Decorative, warm finish, premium look' },
          ]}
        />

        {/* Section 5: Industry Insights */}
        <IndustriesServe
          eyebrow="Industry Insights"
          title="Industry Insights."
          body="Notes and articles on fabrication, finishes, and trends in architectural and industrial metalwork."
          showCards={true}
          showButton={false}
          showArrowButton={false}
          industries={[
            { id: 1, icon: BookOpen, title: 'Metal Trends 2025', description: 'What is changing in architectural metalwork' },
            { id: 2, icon: Newspaper, title: 'PVD vs Powder Coating', description: 'Which finish is right for your project' },
            { id: 3, icon: FileText, title: 'Laser Cutting Advances', description: 'New capabilities in precision cutting' },
            { id: 4, icon: Newspaper, title: 'Steel vs Aluminum', description: 'Choosing the right structural metal' },
            { id: 5, icon: BookOpen, title: 'Design for Fabrication', description: 'How to design parts that are easy to make' },
            { id: 6, icon: FileText, title: 'Sustainability in Metal', description: 'Recycling and waste reduction' },
          ]}
          backgroundColor="var(--color-black-light)"
        />

        {/* Section 6: Case Studies */}
        <LuminousProjects
          eyebrow="Case Studies"
          title="Case Studies."
          body="Real projects, start to finish, with the challenge, the fabrication, and the result."
          showButton={true}
          buttonText="View Projects"
          buttonLink="/projects"
          showLocation={true}
          showDescription={false}
          projects={[
            { id: 1, icon: FolderOpen, name: 'Facade Project', sector: 'Architecture', location: 'Dubai', scope: 'Laser-cut screens' },
            { id: 2, icon: FolderOpen, name: 'Structural Steel', sector: 'Construction', location: 'Karachi', scope: 'Warehouse frame' },
            { id: 3, icon: FolderOpen, name: 'Retail Fit-Out', sector: 'Retail', location: 'London', scope: 'Shopfront metalwork' },
          ]}
        />

        {/* Section 7: FAQ */}
        <WhyForgentis
          eyebrow="FAQ"
          headline="Frequently Asked Questions."
          body="Quick answers to the questions we hear most."
          showPoints={true}
          showImage={false}
          showArrowButton={false}
          points={[
            { number: '01', title: 'What file formats do you accept?', desc: 'DWG, DXF, PDF, STEP, or a clear dimensioned drawing.' },
            { number: '02', title: 'What is your minimum order?', desc: 'We handle both single parts and full production runs.' },
            { number: '03', title: 'What lead times should I expect?', desc: 'Depends on scope; confirmed at quote.' },
            { number: '04', title: 'Do you deliver and install?', desc: 'Yes, we deliver and can arrange installation.' },
            { number: '05', title: 'Which finishes do you offer?', desc: 'PVD, powder coating, brushed and matte stainless, and anti-corrosion.' },
          ]}
          backgroundColor="var(--color-black-light)"
        />

        {/* Section 8: Downloads */}
        <TrustedPartner
          eyebrow="Downloads"
          title="Downloads."
          body="Company profile, capability sheet, and material and finish guides, ready to share with your team."
          showMetrics={true}
          metrics={[
            { id: 'profile', target: 1, suffix: '', label: 'Company Profile', description: 'PDF download' },
            { id: 'capability', target: 1, suffix: '', label: 'Capability Statement', description: 'PDF download' },
            { id: 'finish', target: 1, suffix: '', label: 'Finish Guide', description: 'PDF download' },
          ]}
          showTrustStrip={false}
        />

        {/* CTA */}
        <CTASection
          eyebrow="Get the Profile"
          headline="Download Profile."
          body="Get our complete company profile, capability sheet, and finish guide in one PDF."
          buttonText="Download Profile"
          buttonLink="/downloads/profile.pdf"
          backgroundImage="/title-bg2.jpeg"
          showGlow={true}
          showGridPattern={true}
 buttonIcon={false}
        />
      </div>
    </>
  )
}