import React from "react";
import Header from "../../components/common/Header";
import { headerLinks, logo } from "../../data/heroSectionData";
import Button from "../../components/common/Button";
import FreeTrialComponent from "../../components/FreeTrial";

function FreeTrial() {
  return (
    <>
      <Header
        logo={logo}
        links={headerLinks}
        activeLink="Home"
        variant="light"
        featuresRedirectPath="/admin/dashboard"
      />


      <FreeTrialComponent/>
    </>
  );
}

export default FreeTrial;
