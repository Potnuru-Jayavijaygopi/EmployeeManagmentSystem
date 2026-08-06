import Header from "../../components/common/Header";
import ContactSection from "../../components/ContactSection";
import Footer from "../../components/common/Footer";
import { headerLinks, logo } from "../../data/heroSectionData.jsx";
import FooterCTA from "../../components/FooterCTA";

function Contact() {


  return (
    <>
      <Header 
        logo={logo}
        links={headerLinks}
        featuresRedirectPath="/admin/dashboard"
        activeLink="Contact"
        variant="light"
      />
      <ContactSection/>

      <Footer/>
    </>
  );
}

export default Contact;
