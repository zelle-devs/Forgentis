import CoreCapabilities from "@/components/HomePage/CoreCapabilities/CoreCapabilities";
import CTASection from "@/components/HomePage/CTASection/CTASection";
import FacilitiesQuality from "@/components/HomePage/FacilitiesQuality/FacilitiesQuality";
import FacilitiesQuality2 from "@/components/HomePage/FacilitiesQuality/FacilitiesQuality2";
import FeaturedProjects from "@/components/HomePage/FeaturedProjects/FeaturedProjects";
import FeaturedProjects2 from "@/components/HomePage/FeaturedProjects/FeaturedProjects2";
import LuminousProjects from "@/components/HomePage/FeaturedProjects/LuminousProjects";
import Hero from "@/components/HomePage/Hero";
import HowWeWork from "@/components/HomePage/Howwework/HowWeWork";
import HowWeWork2 from "@/components/HomePage/Howwework/HowWeWork2";
import IndustriesServe from "@/components/HomePage/IndustriesServe/IndustriesServe";
import TrustedPartner from "@/components/HomePage/TrustedPartner/TrustedPartner";
import WhatWeFabricate from "@/components/HomePage/WhatWeFabricate/WhatWeFabricate";
import WhoWeAre from "@/components/HomePage/WhoWeAre/WhoWeAre";
import WhyForgentis from "@/components/HomePage/Whyforgentis/Whyforgentis";

export default function Home() {
  return (
    <>
     <Hero/>
      <div className="scroll-content-wrapper">
      <TrustedPartner/>
      <WhoWeAre/>
      <CoreCapabilities/>
      <WhatWeFabricate/>
      <IndustriesServe/>
      <WhyForgentis/>
      <HowWeWork/>
      <HowWeWork2/>
      <FacilitiesQuality2/>
      {/* <FacilitiesQuality/> */}
      <FeaturedProjects/>
      <FeaturedProjects2/>
      {/* <LuminousProjects/> */}
      <CTASection/>
</div>
    </>
  )
}