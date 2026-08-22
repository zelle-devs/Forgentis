import CoreCapabilities from "@/components/HomePage/CoreCapabilities/CoreCapabilities";
import Hero from "@/components/HomePage/Hero";
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
</div>
    </>
  )
}