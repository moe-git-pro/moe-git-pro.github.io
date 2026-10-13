import {
  Box,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  SimpleGrid,
  useColorModeValue,
  Tag,
  Link,
  Button,
  Flex,
  Icon,
  IconButton,
  chakra,
  shouldForwardProp,
} from '@chakra-ui/react';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCircle,
  FaDocker,
  FaTerminal,
  FaLock,
  FaServer,
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
} from 'react-icons/fa';
import { useState } from 'react';
import { motion, AnimatePresence, isValidMotionProp } from 'framer-motion';
import { GradientText, SectionHeading, UiSection } from './ui';

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

// Technology icon mapping
const getTechIcon = (tech: string) => {
  const normalized = tech.toLowerCase();
  if (normalized.includes('consul')) return FaServer;
  if (normalized.includes('ipsec')) return FaLock;
  if (normalized.includes('docker')) return FaDocker;
  if (normalized.includes('script') || normalized.includes('bash')) return FaTerminal;
  if (normalized.includes('kubernetes')) return FaServer;
  if (normalized.includes('gateway')) return FaServer;
  if (normalized.includes('cert-manager')) return FaLock;
  return FaCircle;
};

const projectsData = [
  {
    title: 'Envoy Gateway for Kubernetes',
    description: 'A complete Kubernetes Gateway API setup with TLS termination, automated certificate management, and security hardening.',
    detailedDescription: 'A production-ready security reference demonstrating modern Kubernetes ingress patterns with automated TLS/SSL certificate management via cert-manager, HTTP to HTTPS redirect enforcement, and LoadBalancer service configuration with access controls. Includes hardened deployment scripts following security best practices.',
    image: '/envoy-gateway.png',
    technologies: ['Kubernetes', 'Envoy Gateway', 'Gateway API', 'cert-manager', 'MetalLB', 'Bash'],
    features: [
      'Gateway API with security policy enforcement',
      'Automated TLS with cert-manager rotation',
      'HTTP to HTTPS mandatory redirect',
      'MetalLB LoadBalancer with network isolation',
      'Namespace isolation for workload security'
    ],
    purpose: 'Security reference implementation for modern Kubernetes ingress with zero-trust TLS and access control patterns.',
    architecture: 'Envoy Gateway manages Gateway API resources. Traffic flows through MetalLB to Envoy with automated certificate lifecycle management by cert-manager using a CA Issuer.',
    githubUrl: 'https://github.com/Moetezafif-git',
    liveUrl: '#',
  },
  {
    title: 'Consul IPSec Connector',
    description: 'Automated IPSec tunnels with identity-based security using Consul for service discovery and PKI certificate management.',
    detailedDescription: 'A zero-trust networking reference that automates secure container-to-container communication. Dynamically negotiates IPSec parameters and establishes encrypted tunnels at container startup, leveraging Consul for identity-based authentication, mTLS, and automated certificate lifecycle management.',
    image: '/assets/ipsec_tunnel_consul.png',
    technologies: ['Consul', 'IPSec', 'Docker', 'Bash'],
    features: [
      'Automatic IPSec encrypted tunnel creation',
      'Consul-powered PKI certificate rotation',
      'Zero-trust container networking model',
      'Identity-based security with Consul service mesh',
      'Lightweight security-focused architecture'
    ],
    purpose: 'Educational reference for zero-trust container networking with automated encryption and identity-based access control.',
    architecture: 'Two containers communicate over an IPSec tunnel with Consul managing identity-based security, PKI certificates, and mTLS enforcement.',
    githubUrl: 'https://github.com/Moetezafif-git/consul-ipsec-connector',
    liveUrl: '#',
  }
];

export const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const accentColor = useColorModeValue('brand.500', 'brand.300');

  const nextProject = () => setCurrentIndex((prev) => (prev + 1) % projectsData.length);
  const prevProject = () => setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);

  const currentProject = projectsData[currentIndex];

  return (
    <UiSection id="projects" orbs>
      <VStack spacing={16} align="stretch">
        <SectionHeading
          badge="Portfolio"
          title={
            <>
              Featured <GradientText>Projects</GradientText>
            </>
          }
          subtitle="Security-focused implementations demonstrating zero-trust networking, automated compliance, and secure infrastructure patterns."
        />

        <Box position="relative">
          <AnimatePresence mode="wait">
            <MotionBox
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: 'easeOut' } as never}
            >
              <Flex
                direction={{ base: 'column', lg: 'row' }}
                bg="app.surface"
                border="1px solid"
                borderColor="app.border"
                backdropFilter="blur(14px)"
                borderRadius="3xl"
                overflow="hidden"
                boxShadow="glow-sm"
                minH={{ base: 'auto', lg: '560px' }}
              >
                {/* Left: Project Image */}
                <Box flex={1} position="relative" overflow="hidden" minH={{ base: '240px', lg: 'auto' }}>
                  <Image
                    src={currentProject.image}
                    alt={currentProject.title}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    transition="transform 0.6s ease"
                    _hover={{ transform: 'scale(1.05)' }}
                  />
                  <Box
                    position="absolute"
                    inset={0}
                    bgGradient="linear(to-t, rgba(7,10,18,0.65), transparent 60%)"
                  />
                  <HStack position="absolute" bottom={4} left={4} spacing={2} display={{ base: 'flex', lg: 'none' }}>
                    <IconButton
                      size="sm"
                      icon={<FaChevronLeft />}
                      aria-label="Previous"
                      onClick={prevProject}
                      borderRadius="full"
                      bg="blackAlpha.600"
                      color="white"
                      _hover={{ bg: 'blackAlpha.800' }}
                    />
                    <IconButton
                      size="sm"
                      icon={<FaChevronRight />}
                      aria-label="Next"
                      onClick={nextProject}
                      borderRadius="full"
                      bg="blackAlpha.600"
                      color="white"
                      _hover={{ bg: 'blackAlpha.800' }}
                    />
                  </HStack>
                </Box>

                {/* Right: Project Details */}
                <Flex flex={1.2} direction="column" p={{ base: 8, md: 12 }}>
                  <VStack align="stretch" spacing={6}>
                    <VStack align="start" spacing={2}>
                      <HStack justify="space-between" w="full">
                        <Heading size="lg" fontWeight="800">
                          {currentProject.title}
                        </Heading>
                        <HStack spacing={2} display={{ base: 'none', lg: 'flex' }}>
                          <IconButton
                            size="sm"
                            icon={<FaChevronLeft />}
                            aria-label="Previous"
                            variant="ghost"
                            borderRadius="full"
                            onClick={prevProject}
                            _hover={{ bg: 'app.brandSoft', color: accentColor }}
                          />
                          <IconButton
                            size="sm"
                            icon={<FaChevronRight />}
                            aria-label="Next"
                            variant="ghost"
                            borderRadius="full"
                            onClick={nextProject}
                            _hover={{ bg: 'app.brandSoft', color: accentColor }}
                          />
                        </HStack>
                      </HStack>
                      <Text color="app.muted" fontSize="md" lineHeight="tall">
                        {currentProject.detailedDescription}
                      </Text>
                    </VStack>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                      {currentProject.features.map((feature, i) => (
                        <HStack key={i} align="center">
                          <Icon as={FaArrowRight} color={accentColor} w={3} h={3} />
                          <Text fontSize="sm" fontWeight="medium">{feature}</Text>
                        </HStack>
                      ))}
                    </SimpleGrid>

                    <Flex wrap="wrap" gap={2}>
                      {currentProject.technologies.map((tech, i) => (
                        <Tag
                          key={i}
                          bg="app.brandSoft"
                          color={accentColor}
                          border="1px solid"
                          borderColor="app.border"
                          borderRadius="full"
                          px={3}
                          py={1}
                          fontWeight="600"
                        >
                          <Icon as={getTechIcon(tech)} mr={2} boxSize={3} />
                          {tech}
                        </Tag>
                      ))}
                    </Flex>

                    <HStack spacing={4} pt={4} wrap="wrap">
                      <Button
                        as={Link}
                        href={currentProject.githubUrl}
                        isExternal
                        leftIcon={<FaGithub />}
                      >
                        View Repository
                      </Button>
                      <Button
                        as={Link}
                        href={currentProject.liveUrl}
                        isExternal
                        variant="outline"
                        isDisabled={currentProject.liveUrl === '#'}
                        leftIcon={<FaExternalLinkAlt />}
                      >
                        Live Demo
                      </Button>
                    </HStack>
                  </VStack>
                </Flex>
              </Flex>
            </MotionBox>
          </AnimatePresence>

          {/* Slide indicators */}
          <HStack justify="center" spacing={2} pt={6}>
            {projectsData.map((_, i) => (
              <Box
                key={i}
                as="button"
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to project ${i + 1}`}
                w={i === currentIndex ? 8 : 2.5}
                h={2.5}
                borderRadius="full"
                bg={i === currentIndex ? accentColor : 'app.borderStrong'}
                transition="all 0.3s ease"
              />
            ))}
          </HStack>
        </Box>
      </VStack>
    </UiSection>
  );
};

export default Projects;
