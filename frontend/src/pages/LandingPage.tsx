import CallToAction from "../components/CallToAction"
import FAQSection from "../components/FAQ"
import Footer from "../components/Footer"
import ForDonors from "../components/ForDonors"
import ForRecipients from "../components/ForRecipients"
import Hero from "../components/Hero"
import HowItWorks from "../components/HowItWorks"
import Navbar from "../components/Navbar"
import Testimonials from "../components/Testimonials"


const LandingPage = () => {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <HowItWorks />
      <ForDonors />
      <ForRecipients />
      <Testimonials />
      <FAQSection />
      <CallToAction />
      <Footer />
    </div>
  )
}

export default LandingPage