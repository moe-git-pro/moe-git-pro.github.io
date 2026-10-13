import * as React from 'react';

import {
  Box,
  Flex,
  VStack,
  HStack,
  Link,
  Button,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Tooltip,
  useColorMode,
  Image,
  Container,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon, DownloadIcon } from '@chakra-ui/icons';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

import homepageImage from '../assets/images/favicon.png';

const Links = [
  { name: 'About', href: '#about' },
  { name: 'Articles', href: '#medium' },
  { name: 'Tech Stacks', href: '#tech-stacks' },
  { name: 'Resume', href: '#resume' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
];

const CustomNavLink = ({
  children,
  href,
  isActive,
}: {
  children: React.ReactNode;
  href: string;
  isActive: boolean;
}) => {
  const activeColor = useColorModeValue('brand.600', 'brand.200');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Link
      href={href}
      fontSize="sm"
      fontWeight="600"
      color={isActive ? activeColor : textColor}
      textDecoration="none"
      position="relative"
      py={2}
      px={3}
      transition="color 0.2s ease"
      _hover={{ textDecoration: 'none', color: activeColor }}
    >
      {children}
      <Box
        position="absolute"
        left={3}
        right={3}
        bottom={0}
        h="2px"
        borderRadius="full"
        bgGradient="linear(to-r, brand.400, accent.400)"
        transformOrigin="left"
        transition="transform 0.25s ease"
        transform={isActive ? 'scaleX(1)' : 'scaleX(0)'}
      />
    </Link>
  );
};

const SocialLinks = () => {
  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/moetezafif-git', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/moetez-a-b5582221a/', label: 'LinkedIn' },
  ];

  const hoverBg = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');

  return (
    <HStack spacing={2}>
      {socialLinks.map(({ icon: ItemIcon, href, label }) => (
        <Tooltip key={label} label={label} hasArrow>
          <IconButton
            as={Link}
            href={href}
            isExternal
            aria-label={label}
            icon={<ItemIcon size="18px" />}
            variant="ghost"
            borderRadius="full"
            color="app.muted"
            _hover={{ bg: hoverBg, color: 'brand.300', transform: 'translateY(-2px)' }}
          />
        </Tooltip>
      ))}
    </HStack>
  );
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [active, setActive] = React.useState('#home');

  const navBackground = useColorModeValue(
    isScrolled ? 'rgba(255, 255, 255, 0.72)' : 'transparent',
    isScrolled ? 'rgba(7, 10, 18, 0.72)' : 'transparent'
  );
  const borderColor = useColorModeValue(
    isScrolled ? 'gray.200' : 'transparent',
    isScrolled ? 'whiteAlpha.100' : 'transparent'
  );
  const mobileMenuBg = useColorModeValue(
    'rgba(255, 255, 255, 0.96)',
    'rgba(7, 10, 18, 0.96)'
  );

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll spy: highlight the section currently in view.
  React.useEffect(() => {
    const ids = ['home', ...Links.map((l) => l.href.slice(1))];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      as="nav"
      position="fixed"
      width="full"
      zIndex={1000}
      bg={navBackground}
      borderBottom="1px solid"
      borderColor={borderColor}
      backdropFilter={isScrolled ? 'blur(16px)' : 'none'}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    >
      <Container maxW="container.xl" h={20}>
        <Flex h="full" alignItems="center" justifyContent="space-between">
          {/* Branding */}
          <Link
            href="#home"
            display="flex"
            alignItems="center"
            gap={3}
            _hover={{ transform: 'scale(1.03)' }}
            transition="transform 0.2s"
          >
            <Image src={homepageImage} alt="Moetez Afif" boxSize="42px" borderRadius="xl" />
            <VStack align="start" spacing={0} display={{ base: 'none', sm: 'flex' }}>
              <Box fontWeight="800" fontSize="md" letterSpacing="-0.02em" lineHeight={1.1}>
                Moetez Afif
              </Box>
              <Box fontSize="2xs" color="app.muted" fontWeight="600" letterSpacing="wider" textTransform="uppercase">
                DevSecOps Engineer
              </Box>
            </VStack>
          </Link>

          {/* Desktop Menu */}
          <HStack spacing={1} display={{ base: 'none', lg: 'flex' }}>
            {Links.map((link) => (
              <CustomNavLink key={link.name} href={link.href} isActive={active === link.href}>
                {link.name}
              </CustomNavLink>
            ))}
          </HStack>

          {/* Actions */}
          <HStack spacing={2}>
            <Box display={{ base: 'none', md: 'block' }}>
              <SocialLinks />
            </Box>

            <IconButton
              onClick={toggleColorMode}
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              aria-label="Toggle Color Mode"
              variant="ghost"
              borderRadius="full"
              _hover={{ bg: useColorModeValue('blackAlpha.100', 'whiteAlpha.100') }}
            />

            <Button
              as={Link}
              href="assets/resume.pdf"
              download
              leftIcon={<DownloadIcon />}
              size="sm"
              px={5}
              display={{ base: 'none', sm: 'flex' }}
            >
              Resume
            </Button>

            <IconButton
              size="md"
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label="Toggle Navigation"
              onClick={isOpen ? onClose : onOpen}
              display={{ lg: 'none' }}
              variant="ghost"
            />
          </HStack>
        </Flex>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 999 }}
          >
            <Box
              w="full"
              bg={mobileMenuBg}
              backdropFilter="blur(16px)"
              borderBottom="1px solid"
              borderColor={borderColor}
              pt={6}
              pb={8}
              px={6}
            >
              <VStack spacing={2} alignItems="stretch">
                {Links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={onClose}
                    fontSize="lg"
                    fontWeight="700"
                    py={3}
                    px={4}
                    borderRadius="xl"
                    color={active === link.href ? 'brand.300' : 'app.text'}
                    _hover={{ bg: 'app.surface', color: 'brand.300' }}
                  >
                    {link.name}
                  </Link>
                ))}
                <HStack pt={4} justify="space-between">
                  <SocialLinks />
                  <Button as={Link} href="assets/resume.pdf" download leftIcon={<DownloadIcon />} size="sm">
                    Resume
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Navbar;
