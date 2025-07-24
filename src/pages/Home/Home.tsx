import { motion } from "framer-motion";

import HeroSection from "../../components/homePageAllComponent/HeroSection";
import FeaturedSection from "../../components/homePageAllComponent/FeaturedSection";
import Testimonials from "../../components/homePageAllComponent/Testimonials";
import WhyChooseUs from "../../components/homePageAllComponent/WhyChooseUs";
import ContactUs from "../../components/homePageAllComponent/ContactUs";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Home = () => {
  return (
    <div>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <HeroSection />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{ marginTop: "3rem" }}
      >
        <FeaturedSection />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{ marginTop: "3rem" }}
      >
        <Testimonials />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{ marginTop: "3rem" }}
      >
        <WhyChooseUs />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{ marginTop: "3rem" }}
      >
        <ContactUs />
      </motion.div>
    </div>
  );
};

export default Home;
