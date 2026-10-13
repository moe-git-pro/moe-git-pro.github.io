import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Icon,
  Flex,
  useColorModeValue,
  Badge,
  Circle,
  Button,
  chakra,
  shouldForwardProp,
} from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaCode,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';
import {
  SiKubernetes,
  SiDocker,
  SiHelm,
  SiTerraform,
  SiConsul,
  SiVault,
  SiGooglecloud,
  SiGrafana,
  SiPrometheus,
  SiElasticsearch,
  SiLogstash,
  SiGit,
  SiGithubactions,
  SiLinux,
  SiPython,
  SiJavascript,
} from 'react-icons/si';
import { GlassCard, GradientText, SectionHeading, UiSection } from './ui';

const MotionFlex = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  responsibilities: string[];
  Keywords?: string[];
  icon: React.ElementType;
  color: string;
  date: Date;
}

const professionalExperiences: Experience[] = [
  {
    title: 'IT Security Expert',
    company: 'Ooredoo',
    location: 'Tunis, Tunisia',
    period: 'May 2026 – Present',
    icon: FaBriefcase,
    color: 'purple.500',
    date: new Date(2026, 4, 18),
    responsibilities: [
      'Implement and enforce Ooredoo\'s enterprise security policy and information security best practices across the organization.',
      'Review and validate network and system architectures to ensure compliance with security rules, standards, and regulatory requirements.',
      'Lead security-related projects in collaboration with vendors and partners, ensuring alignment with Ooredoo\'s security architecture.',
      'Ensure that requested network flow openings comply with security rules and Ooredoo\'s security architecture.',
      'Ensure that projects are documented in compliance with Ooredoo\'s best practices.',
      'Monitor and follow up on defined security projects.',
      'Support Ooredoo vendors in the implementation of security projects.',
      'Ensure proper documentation of security projects.',
      'Monitor emerging vulnerabilities and cyberattacks and communicate relevant information.',
      'Track and ensure the implementation of remediation actions.'
    ],
    Keywords: [
      'Security Policy', 'Security Architecture', 'Network Security',
      'Vulnerability Management', 'Risk Assessment', 'Security Compliance',
      'Project Management'
    ]
  },
  {
    title: 'DevSecOps Engineer',
    company: 'Cytailor',
    location: 'Tunis, Tunisia',
    period: 'Jul 2023 – Present',
    icon: FaBriefcase,
    color: 'blue.500',
    date: new Date(2023, 6, 1),
    responsibilities: [
      'Designed and deployed secure CI/CD pipelines for 7+ microservices on Amazon EKS using GitHub Actions, ArgoCD, Helm, and Git, integrating Semgrep (SAST), Trivy (container scanning), and OWASP ZAP (DAST), achieving ~90% compliance with the DoD DevSecOps Playbook.',
      'Accelerated deployments by 40% and reduced pipeline failures by 25% through GitOps practices, continuous drift detection, and automated secrets management with HashiCorp Vault.',
      'Centralized credential handling using Vault and Vault Secrets Injection (Vault SCI), eliminating hardcoded secrets and enforcing secure, automated secrets distribution across microservices.',
      'Led the migration of multiple microservices from AWS to OVH, contributing to the design of a scalable, reliable, and secure infrastructure architecture.',
      'Deployed and operated HashiCorp Consul across multi-cluster Kubernetes environments on AWS (EKS) and OVH, reducing microservice latency by 30% and enforcing mTLS, RBAC, and ACL-based security.',
      'Designed and enforced Consul ACL policies with least-privilege access control, improving cluster security and compliance posture.',
      'Participated in a security consulting engagement for a French client, improving security posture through policy enforcement and governance controls.',
      'Designed and implemented a lightweight automated mini-SOC using Make automation and Google GAT+, enabling continuous monitoring and security reporting.',
      'Built an automated reporting mechanism delivering weekly summaries of high-risk or non-compliant activities for administrative review, aligned with organizational data protection policies.',
      'Conducted a workshop for a French 5G client on microservices security, covering secure API gateway configuration, HashiCorp Consul implementation, and best practices for securing their Dockerized 5G environment.',
      'Led DevSecOps security consulting for a French 5G organization, securing Docker and Kubernetes architectures with HashiCorp Consul for PKI, automated certificate management, and mTLS.',
      'Developed a cybersecurity knowledge base using a Retrieval-Augmented Generation (RAG) architecture, generating vector embeddings with Amazon Bedrock and storing them in Amazon Aurora PostgreSQL with pgvector to enable LLM-powered semantic search and querying.'
    ],
    Keywords: [
      'Amazon EKS', 'GitHub Actions', 'ArgoCD', 'Helm', 'Semgrep', 'Trivy', 'OWASP ZAP', 'Hashicorp Vault', 'GitOps', 'HashiCorp Consul', 'mTLS', 'RBAC', 'ACL', 'AWS', 'OVH', 'Docker', 'Kubernetes', 'Amazon Bedrock', 'Amazon Aurora', 'pgvector', 'RAG'
    ]
  },
  {
    title: 'Internship',
    company: '6NLG(2SB) - SUP’COM',
    location: 'Tunis, Tunisia',
    period: 'Sep 2023 – Present',
    icon: FaBriefcase,
    color: 'green.500',
    date: new Date(2023, 8, 1),
    responsibilities: [
      'Secured cloud services using Reverse Proxy and Cloud Access Security Broker (CASB) solutions.',
      'Implemented robust cloud security, data protection, and access control leveraging Netskope CASB, SWG, and ZTNA technologies.',
      'Developed, enforced, and monitored security policies to ensure compliance, reduce risk, and protect sensitive data.'
    ],
    Keywords: [
      'Reverse Proxy', 'CASB', 'Netskope', 'SWG', 'ZTNA', 'Cloud Security'
    ]
  },
  {
    title: 'Technical Team',
    company: 'Hackfest',
    location: 'Tunis, Tunisia',
    period: 'Mar 2023 – Jun 2023',
    icon: FaBriefcase,
    color: 'orange.500',
    date: new Date(2023, 2, 1),
    responsibilities: [
      'Preparing challenges for the CTF competition (Web Exploitation, Cryptography)'
    ],
    Keywords: [
      'CTF', 'Web Exploitation', 'Cryptography'
    ]
  }
];

const getTechnologyIcon = (technology: string) => {
  const normalizedTech = technology.toLowerCase().trim();
  const iconMap: { [key: string]: React.ComponentType } = {
    'kubernetes': SiKubernetes,
    'docker': SiDocker,
    'helm': SiHelm,
    'terraform': SiTerraform,
    'consul': SiConsul,
    'vault': SiVault,
    'aws lambda': SiGooglecloud,
    'grafana': SiGrafana,
    'prometheus': SiPrometheus,
    'elasticsearch': SiElasticsearch,
    'logstash': SiLogstash,
    'git': SiGit,
    'github actions': SiGithubactions,
    'linux': SiLinux,
    'python': SiPython,
    'javascript': SiJavascript
  };

  if (iconMap[normalizedTech]) return iconMap[normalizedTech];
  for (const [key, icon] of Object.entries(iconMap)) {
    if (normalizedTech.includes(key)) return icon;
  }
  return FaCode;
};

export const Resume: React.FC = () => {
  const [activeExperience, setActiveExperience] = useState<number | null>(0);

  const accentColor = useColorModeValue('brand.500', 'brand.300');
  const borderColor = useColorModeValue('light.border', 'dark.border');
  const cardBg = useColorModeValue('white', 'dark.card');
  const chipBg = useColorModeValue('gray.100', 'whiteAlpha.100');

  return (
    <UiSection id="resume" maxW="container.lg">
      <VStack spacing={16} align="stretch">
        <SectionHeading
          badge="Journey"
          title={
            <>
              Professional <GradientText>Experience</GradientText>
            </>
          }
          subtitle="My career in DevSecOps and Cybersecurity, building secure, scalable, and resilient digital architectures."
        />

        <Box position="relative">
          {/* Timeline Line */}
          <Box
            position="absolute"
            left={{ base: '20px', md: '50%' }}
            top="0"
            bottom="0"
            width="2px"
            bgGradient="linear(to-b, brand.400, accent.500, transparent)"
            transform={{ base: 'none', md: 'translateX(-50%)' }}
            zIndex={0}
          />

          <VStack spacing={12} align="stretch" position="relative" zIndex={1}>
            {professionalExperiences.map((exp, index) => (
              <MotionFlex
                key={`${exp.company}-${index}`}
                display="flex"
                flexDirection={{ base: 'row', md: index % 2 === 0 ? 'row' : 'row-reverse' }}
                alignItems="flex-start"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.08 } as never}
              >
                {/* Timeline Dot */}
                <Circle
                  size="44px"
                  bg={cardBg}
                  border="2px solid"
                  borderColor={accentColor}
                  position="absolute"
                  left={{ base: '0', md: '50%' }}
                  transform={{ base: 'none', md: 'translateX(-50%)' }}
                  zIndex={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxShadow="glow-sm"
                >
                  <Icon as={exp.icon} color={accentColor} w={4} h={4} />
                </Circle>

                {/* Spacer for Desktop Timeline */}
                <Box flex={1} display={{ base: 'none', md: 'block' }} />

                {/* Content Card */}
                <Box
                  flex={1}
                  ml={{ base: 12, md: index % 2 === 0 ? 12 : 0 }}
                  mr={{ base: 0, md: index % 2 === 0 ? 0 : 12 }}
                >
                  <GlassCard p={6} delay={0} borderRadius="2xl">
                    <VStack align="stretch" spacing={4}>
                      <Flex justify="space-between" align="start" wrap="wrap" gap={2}>
                        <VStack align="start" spacing={1}>
                          <Heading size="md" fontWeight="800">
                            {exp.title}
                          </Heading>
                          <HStack color={accentColor} spacing={2}>
                            <Text fontWeight="700">{exp.company}</Text>
                            <Text fontSize="xs">•</Text>
                            <HStack spacing={1} color="app.muted">
                              <Icon as={FaMapMarkerAlt} w={3} h={3} />
                              <Text fontSize="xs">{exp.location}</Text>
                            </HStack>
                          </HStack>
                        </VStack>
                        <Badge
                          variant="outline"
                          borderRadius="full"
                          px={3}
                          color={accentColor}
                          borderColor={accentColor}
                        >
                          {exp.period}
                        </Badge>
                      </Flex>

                      <VStack align="stretch" spacing={3}>
                        {exp.responsibilities.slice(0, activeExperience === index ? undefined : 3).map((resp, i) => (
                          <HStack key={i} align="start" spacing={3}>
                            <Icon as={FaCode} color={accentColor} mt={1} w={3} h={3} />
                            <Text fontSize="sm" color="app.text" lineHeight="tall">
                              {resp}
                            </Text>
                          </HStack>
                        ))}
                      </VStack>

                      {exp.responsibilities.length > 3 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setActiveExperience(activeExperience === index ? null : index)}
                          rightIcon={activeExperience === index ? <FaChevronUp /> : <FaChevronDown />}
                          alignSelf="flex-start"
                          fontSize="xs"
                          color={accentColor}
                        >
                          {activeExperience === index ? 'Show Less' : `Show ${exp.responsibilities.length - 3} More Items`}
                        </Button>
                      )}

                      {exp.Keywords && (
                        <Flex wrap="wrap" gap={2} pt={2}>
                          {exp.Keywords.map((tech, i) => {
                            const TechIcon = getTechnologyIcon(tech);
                            return (
                              <HStack
                                key={i}
                                bg={chipBg}
                                px={2}
                                py={1}
                                borderRadius="md"
                                border="1px solid"
                                borderColor={borderColor}
                              >
                                <Icon as={TechIcon} w={3} h={3} color="app.muted" />
                                <Text fontSize="2xs" fontWeight="bold" color="app.muted">
                                  {tech}
                                </Text>
                              </HStack>
                            );
                          })}
                        </Flex>
                      )}
                    </VStack>
                  </GlassCard>
                </Box>
              </MotionFlex>
            ))}
          </VStack>
        </Box>
      </VStack>
    </UiSection>
  );
};
