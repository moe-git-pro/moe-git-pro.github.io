import React from 'react';
import ccBadge from './assets/images/certificates/is2.png';
import clavisterNetwallExpert from './assets/images/certificates/clavister_netwall_expert.png';
import clavisterNetwallRouting from './assets/images/certificates/clavister_netwall_routing.png';
import clavisterNetwallFundamentals from './assets/images/certificates/clavister_netwall_fundamentals.png';
import clavisterNetwallCorporate from './assets/images/certificates/clavister_netwall_corporate_networks.png';
import { ChakraProvider, Box, ColorModeScript } from '@chakra-ui/react';
import theme from './theme';
import Hero from './components/Hero';
import { Medium } from './components/Medium';
import { TechStacks } from './components/TechStacks';
import { Resume } from './components/Resume';
import Navbar from './components/Navbar';
import AboutSection from './components/About';
import Education from './components/Education';
import { Certificates } from './components/Certifications';
import { Projects } from './components/Project';
import Footer from './components/Footer';
import { Activities } from './components/Activities';
import { IconButton, Icon } from '@chakra-ui/react';
import { FaArrowUp } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import { ScrollProgress, SiteBackground } from './components/ui';

const certificates = [
  {
    title: "Certified in Cybersecurity (CC)",
    issueDate: "2024-05-14",
    issuer: "ISC²",
    description:
      "The Certified in Cybersecurity (CC) credential is a vendor-neutral certification designed for individuals beginning their journey in the cybersecurity field. It validates foundational knowledge of security principles, operations, network security, and access controls.",
    link: "https://www.credly.com/badges/edd23c95-a9e1-431e-a8b7-8ea87351de6e",
    credlyLink: "https://www.credly.com/badges/edd23c95-a9e1-431e-a8b7-8ea87351de6e",
    photo: ccBadge,
  },
  {
    title: "Clavister NetWall Expert",
    issueDate: "2026-04-15",
    issuer: "Clavister",
    description:
      "This badge certifies the successful completion of the Clavister NetWall Expert course, demonstrating advanced expertise in Clavister's network security solutions.",
    link: "https://training.clavister.com/badges/badge.php?hash=2ab09a2e4d72bdfd8166be2045ac342fcb22403f",
    photo: clavisterNetwallExpert,
  },
  {
    title: "Clavister NetWall Routing",
    issueDate: "2026-04-15",
    issuer: "Clavister",
    description:
      "This badge certifies the successful completion of the Clavister NetWall Routing course, validating skills in network routing configuration and security.",
    link: "https://training.clavister.com/badges/badge.php?hash=972cdcba0812eaef148f6314e2499ebd6653954d",
    photo: clavisterNetwallRouting,
  },
  {
    title: "Clavister NetWall Fundamentals",
    issueDate: "2026-04-13",
    issuer: "Clavister",
    description:
      "This badge certifies the successful completion of the Clavister NetWall Fundamentals course, covering foundational concepts of Clavister's network security platform.",
    link: "https://training.clavister.com/badges/badge.php?hash=f1e3ff0cb0b144bd083a657adfeb5fbd23dcc757",
    photo: clavisterNetwallFundamentals,
  },
  {
    title: "Clavister NetWall Building Corporate Networks",
    issueDate: "2026-04-13",
    issuer: "Clavister",
    description:
      "This badge certifies the successful completion of the Clavister NetWall Building Corporate Networks course, demonstrating skills in designing and securing corporate network infrastructures.",
    link: "https://training.clavister.com/badges/badge.php?hash=47b1421574866d778437e264cf2907e1ff966faf",
    photo: clavisterNetwallCorporate,
  }
];

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          style={{ position: 'fixed', bottom: '40px', right: '40px', zIndex: 1000 }}
        >
          <IconButton
            icon={<Icon as={FaArrowUp} />}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            bgGradient="linear(to-br, brand.500, accent.500)"
            color="white"
            borderRadius="full"
            boxShadow="glow"
            size="lg"
            aria-label="Scroll to top"
            _hover={{ transform: 'scale(1.08)', boxShadow: 'glow' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <SiteBackground />
      <ScrollProgress />
      <Box position="relative" zIndex={1}>
        <Navbar />
        <Box as="main">
          <Hero />
          <AboutSection />
          <Medium />
          <TechStacks />
          <Resume />
          <Certificates certificates={certificates} />
          <Projects />
          <Education />
          <Activities />
        </Box>
        <Footer />
        <ScrollToTop />
      </Box>
    </ChakraProvider>
  );
};

export default App;
