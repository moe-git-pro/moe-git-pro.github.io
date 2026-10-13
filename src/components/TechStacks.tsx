import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Text,
  Icon,
  useColorModeValue,
  Image as ChakraImage,
  Grid,
  Flex,
  HStack,
  chakra,
  shouldForwardProp,
} from '@chakra-ui/react';
import { motion, AnimatePresence, isValidMotionProp } from 'framer-motion';
import {
  FaCode,
  FaDatabase,
  FaShieldAlt,
  FaCloud,
  FaTerminal,
  FaChartLine,
} from 'react-icons/fa';
import { GlassCard, GradientText, SectionHeading, UiSection } from './ui';

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const technologies = [
  {
    name: 'Security & Compliance',
    icon: FaShieldAlt,
    tools: [
      { name: 'Hashicorp Vault', logoImport: () => import('../assets/images/hashicorp-vault.png'), description: 'Secure secrets management, encryption, and automated credential rotation.' },
      { name: 'OWASP ZAP', logoImport: () => import('../assets/images/owasp-zap.png'), description: 'Web application security scanner for automated DAST and pentesting.' },
      { name: 'Trivy', logoImport: () => import('../assets/images/trivy.png'), description: 'Vulnerability scanner for containers, Kubernetes, and IaC.' },
      { name: 'NIST', logoImport: () => import('../assets/images/nist.png'), description: 'Industry-standard cybersecurity framework for risk management.' },
      { name: 'ISO 27001', logoImport: () => import('../assets/images/iso27001.png'), description: 'Information security management system (ISMS) standard.' },
      { name: 'SonarQube', logoImport: () => import('../assets/images/sonarqube.png'), description: 'Continuous code quality and security inspection platform.' },
      { name: 'Semgrep', logoImport: () => import('../assets/images/semgrep.png'), description: 'Static analysis for security vulnerability detection and compliance.' },
      { name: 'Netskope', description: 'Cloud-native CASB, SWG, and ZTNA for data protection and access control.' }
    ]
  },
  {
    name: 'Infrastructure & Cloud',
    icon: FaCloud,
    tools: [
      { name: 'Kubernetes', logoImport: () => import('../assets/images/kubernetes.png'), description: 'Container orchestration for secure, scalable deployments.' },
      { name: 'Docker', logoImport: () => import('../assets/images/docker.png'), description: 'Container platform for building and running secure applications.' },
      { name: 'Helm', logoImport: () => import('../assets/images/helm.png'), description: 'The package manager for Kubernetes deployments.' },
      { name: 'Terraform', logoImport: () => import('../assets/images/terraform.png'), description: 'Infrastructure as Code for secure cloud provisioning.' },
      { name: 'Consul', logoImport: () => import('../assets/images/consul.png'), description: 'Service mesh with mTLS, ACLs, and identity-based security.' },
      { name: 'AWS', logoImport: () => import('../assets/images/aws.png'), description: 'Cloud platform with extensive security and compliance services.' },
      { name: 'ArgoCD', logoImport: () => import('../assets/images/argocd.png'), description: 'GitOps CD with drift detection and security policy enforcement.' },
      { name: 'Envoy', logoImport: () => import('../assets/images/envoy.png'), description: 'High-performance edge proxy with TLS and security filtering.' }
    ]
  },
  {
    name: 'DevOps & Automation',
    icon: FaTerminal,
    tools: [
      { name: 'Jenkins', logoImport: () => import('../assets/images/jenkins.png'), description: 'Leading open-source automation server for CI/CD pipelines.' },
      { name: 'GitHub Actions', logoImport: () => import('../assets/images/github-actions.png'), description: 'CI/CD automation with built-in security scanning integrations.' },
      { name: 'Linux', logoImport: () => import('../assets/images/linux.png'), description: 'Secure foundation for server, cloud, and container operations.' },
      { name: 'Git', logoImport: () => import('../assets/images/git.png'), description: 'Distributed version control with signed commits and audit trail.' },
      { name: 'Ansible', logoImport: () => import('../assets/images/ansible.png'), description: 'Agentless automation for security hardening and configuration.' }
    ]
  },
  {
    name: 'Languages & Scripting',
    icon: FaCode,
    tools: [
      { name: 'Python', logoImport: () => import('../assets/images/python.png'), description: 'Versatile language for security automation and tooling.' },
      { name: 'JavaScript', logoImport: () => import('../assets/images/javascript.png'), description: 'Core language for web security testing and tool development.' },
      { name: 'Bash', logoImport: () => import('../assets/images/bash.png'), description: 'Essential scripting for system security and automation.' },
      { name: 'PowerShell', description: 'Cross-platform automation for security and compliance tasks.' }
    ]
  },
  {
    name: 'Observability',
    icon: FaChartLine,
    tools: [
      { name: 'Prometheus', logoImport: () => import('../assets/images/prometheus.png'), description: 'Monitoring and alerting for security metrics and anomalies.' },
      { name: 'Grafana', logoImport: () => import('../assets/images/grafana.png'), description: 'Visualization for security dashboards and incident analysis.' },
      { name: 'Elasticsearch', logoImport: () => import('../assets/images/elasticsearch.png'), description: 'Search and analytics engine for SIEM and log analysis.' },
      { name: 'Logstash', logoImport: () => import('../assets/images/logstash.png'), description: 'Data processing pipeline for security log aggregation.' }
    ]
  },
  {
    name: 'Databases',
    icon: FaDatabase,
    tools: [
      { name: 'Postgres', logoImport: () => import('../assets/images/postgres.png'), description: 'Advanced relational database with encryption and access controls.' },
      { name: 'MongoDB', logoImport: () => import('../assets/images/mongodb.png'), description: 'Document database with security features and auditing.' },
      { name: 'MySQL', logoImport: () => import('../assets/images/mysql.png'), description: 'Relational database with enterprise security capabilities.' }
    ]
  }
];

export const TechStacks: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [logoStates, setLogoStates] = useState<{ [key: string]: string }>({});

  const accentColor = useColorModeValue('brand.500', 'brand.300');
  const inactiveText = useColorModeValue('gray.600', 'gray.300');
  const tileBg = useColorModeValue('white', 'whiteAlpha.100');

  useEffect(() => {
    const loadLogos = async () => {
      const loaded: { [key: string]: string } = {};
      for (const category of technologies) {
        await Promise.all(category.tools.map(async (tech) => {
          if ('logoImport' in tech && tech.logoImport) {
            try {
              const mod = await tech.logoImport();
              loaded[tech.name] = mod.default;
            } catch (e) {
              console.error(`Failed to load ${tech.name}`, e);
            }
          }
        }));
      }
      setLogoStates(loaded);
    };
    loadLogos();
  }, []);

  return (
    <UiSection id="tech-stacks" orbs>
      <VStack spacing={16} align="stretch">
        <SectionHeading
          badge="Tech Stack"
          title={
            <>
              Toolbox & <GradientText>Technologies</GradientText>
            </>
          }
          subtitle="Security tools, cloud platforms, and automation frameworks I use to protect and scale modern enterprise environments."
        />

        {/* Category Tabs */}
        <Flex wrap="wrap" justify="center" gap={3}>
          {technologies.map((cat, idx) => {
            const isActive = currentCategory === idx;
            return (
              <Box
                as="button"
                key={cat.name}
                onClick={() => setCurrentCategory(idx)}
                px={5}
                py={3}
                borderRadius="full"
                fontWeight="700"
                fontSize="sm"
                bgGradient={isActive ? 'linear(to-r, brand.500, accent.500)' : undefined}
                bg={isActive ? undefined : 'app.surface'}
                color={isActive ? 'white' : inactiveText}
                border="1px solid"
                borderColor={isActive ? 'transparent' : 'app.border'}
                backdropFilter={isActive ? undefined : 'blur(10px)'}
                boxShadow={isActive ? 'soft' : 'none'}
                transition="all 0.25s ease"
                _hover={{
                  borderColor: 'brand.400',
                  transform: 'translateY(-2px)',
                }}
              >
                <HStack spacing={2}>
                  <Icon as={cat.icon} />
                  <Text>{cat.name}</Text>
                </HStack>
              </Box>
            );
          })}
        </Flex>

        {/* Tools Grid */}
        <AnimatePresence mode="wait">
          <MotionBox
            key={currentCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 } as never}
          >
            <Grid
              templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
              gap={6}
            >
              {technologies[currentCategory].tools.map((tech, i) => (
                <GlassCard key={tech.name} delay={i * 0.04} p={6}>
                  <VStack align="start" spacing={4}>
                    <Flex
                      align="center"
                      justify="center"
                      boxSize="60px"
                      borderRadius="xl"
                      bg={tileBg}
                      border="1px solid"
                      borderColor="app.border"
                      transition="transform 0.3s ease"
                      _groupHover={{ transform: 'scale(1.06)' }}
                    >
                      {logoStates[tech.name] ? (
                        <ChakraImage
                          src={logoStates[tech.name]}
                          alt={tech.name}
                          maxH="70%"
                          maxW="70%"
                          objectFit="contain"
                        />
                      ) : (
                        <Icon as={technologies[currentCategory].icon} color={accentColor} boxSize={6} />
                      )}
                    </Flex>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="800" fontSize="md">{tech.name}</Text>
                      <Text fontSize="xs" color="app.muted" lineHeight="tall">
                        {tech.description}
                      </Text>
                    </VStack>
                  </VStack>
                </GlassCard>
              ))}
            </Grid>
          </MotionBox>
        </AnimatePresence>
      </VStack>
    </UiSection>
  );
};
