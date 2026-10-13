import * as React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Icon,
  SimpleGrid,
  useColorModeValue,
  Flex,
  HStack,
} from '@chakra-ui/react';
import {
  FaCode,
  FaShieldAlt,
  FaNetworkWired,
  FaCloud,
} from 'react-icons/fa';
import { GlassCard, GradientText, SectionHeading, UiSection } from './ui';

const AboutSection: React.FC = () => {
  const accentColor = useColorModeValue('brand.500', 'brand.300');

  const AboutCards = [
    {
      icon: FaShieldAlt,
      title: 'Threat Detection & Response',
      description:
        'Proactively identifying vulnerabilities, monitoring threats, and orchestrating incident response to protect critical assets.',
    },
    {
      icon: FaNetworkWired,
      title: 'Security Automation & CI/CD',
      description:
        'Embedding security controls into pipelines with SAST, DAST, container scanning, and automated policy enforcement.',
    },
    {
      icon: FaCloud,
      title: 'Cloud Security & Compliance',
      description:
        'Designing secure cloud architectures on AWS and OVH with CASB, ZTNA, and compliance frameworks like NIST & ISO 27001.',
    },
    {
      icon: FaCode,
      title: 'Vulnerability Assessment',
      description:
        'Conducting security audits, penetration testing, and risk assessments to identify and remediate security gaps.',
    },
  ];

  return (
    <UiSection id="about" orbs>
      <VStack spacing={16} align="stretch">
        <SectionHeading
          badge="Background"
          title={
            <>
              Securing Enterprise <GradientText>Infrastructure</GradientText>.
            </>
          }
          subtitle={
            <>
              I am a DevSecOps Engineer with a mission to protect digital ecosystems. My
              approach combines deep technical expertise with automated security controls
              and compliance-driven design to keep organizations secure in an evolving
              threat landscape.
            </>
          }
        />

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          {AboutCards.map((card, index) => (
            <GlassCard key={index} delay={index * 0.08} p={7}>
              <VStack align="start" spacing={5}>
                <Flex
                  align="center"
                  justify="center"
                  boxSize="52px"
                  borderRadius="xl"
                  bgGradient="linear(to-br, brand.500, accent.500)"
                  color="white"
                  boxShadow="soft"
                  transition="transform 0.3s ease"
                  _groupHover={{ transform: 'scale(1.08)' }}
                >
                  <Icon as={card.icon} boxSize={6} />
                </Flex>
                <VStack align="start" spacing={2}>
                  <Heading size="sm" fontWeight="800" lineHeight="shorter">
                    {card.title}
                  </Heading>
                  <Text color="app.muted" fontSize="sm" lineHeight="tall">
                    {card.description}
                  </Text>
                </VStack>
                <HStack pt={1} spacing={2} color={accentColor} fontSize="2xs" fontWeight="800" letterSpacing="wider">
                  <Box w={4} h="2px" bg="currentColor" borderRadius="full" />
                  <Text textTransform="uppercase">0{index + 1}</Text>
                </HStack>
              </VStack>
            </GlassCard>
          ))}
        </SimpleGrid>
      </VStack>
    </UiSection>
  );
};

export default AboutSection;
