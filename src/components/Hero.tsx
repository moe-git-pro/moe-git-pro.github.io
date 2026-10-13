import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Container,
  useColorModeValue,
  Flex,
  Icon,
  chakra,
  shouldForwardProp,
} from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaShieldAlt, FaCloud, FaLock, FaCheckCircle } from 'react-icons/fa';
import ProfileImage from '../assets/images/me.jpg';
import { GradientText } from './ui';

const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const specialties = [
  { icon: FaShieldAlt, label: 'Security Auditing' },
  { icon: FaLock, label: 'Compliance & Risk' },
  { icon: FaCloud, label: 'Cloud Security' },
];

const certifications = [
  { name: 'ISC² CC', issuer: 'Certified in Cybersecurity' },
  { name: 'Clavister Expert', issuer: 'NetWall Expert' },
];

const Hero = () => {
  const accentColor = useColorModeValue('brand.500', 'brand.300');
  const textColor = useColorModeValue('app.text', 'app.text');

  return (
    <Box
      id="home"
      as="section"
      position="relative"
      pt={{ base: 32, md: 44 }}
      pb={{ base: 16, md: 28 }}
      overflow="hidden"
    >
      {/* Ambient glow */}
      <Box
        className="anim-drift"
        position="absolute"
        top="-15%"
        right="-8%"
        w={{ base: '360px', md: '560px' }}
        h={{ base: '360px', md: '560px' }}
        bg="brand.500"
        filter="blur(150px)"
        opacity={useColorModeValue(0.10, 0.24)}
        borderRadius="full"
        zIndex={0}
      />
      <Box
        className="anim-float"
        position="absolute"
        bottom="-15%"
        left="-10%"
        w={{ base: '320px', md: '460px' }}
        h={{ base: '320px', md: '460px' }}
        bg="accent.500"
        filter="blur(150px)"
        opacity={useColorModeValue(0.08, 0.18)}
        borderRadius="full"
        zIndex={0}
      />

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <Flex
          direction={{ base: 'column-reverse', lg: 'row' }}
          align="center"
          justify="space-between"
          gap={{ base: 14, lg: 12 }}
        >
          <MotionBox
            display="flex"
            flexDirection="column"
            alignItems={{ base: 'center', lg: 'flex-start' }}
            flex={1}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' } as never}
          >
            <VStack align={{ base: 'center', lg: 'flex-start' }} spacing={6}>
              <HStack
                spacing={2}
                px={3}
                py={1.5}
                borderRadius="full"
                border="1px solid"
                borderColor={useColorModeValue('brand.200', 'whiteAlpha.200')}
                bg={useColorModeValue('whiteAlpha.700', 'whiteAlpha.100')}
                backdropFilter="blur(10px)"
              >
                <Box
                  className="anim-pulse-ring"
                  w={2}
                  h={2}
                  borderRadius="full"
                  bg="green.400"
                />
                <Text fontSize="2xs" fontWeight="700" letterSpacing="wider" textTransform="uppercase">
                  DevSecOps Engineer · IT Security Expert
                </Text>
              </HStack>

              <Heading
                as="h1"
                fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                lineHeight="shorter"
                textAlign={{ base: 'center', lg: 'left' }}
                fontWeight="800"
                maxW="2xl"
              >
                Securing Infrastructure,{' '}
                <GradientText>Protecting</GradientText> Data, Enforcing Compliance.
              </Heading>

              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                color="app.muted"
                maxW="620px"
                textAlign={{ base: 'center', lg: 'left' }}
                lineHeight="tall"
              >
                Hi, I'm{' '}
                <Text as="span" fontWeight="700" color={textColor}>
                  Moetez
                </Text>
                . A DevSecOps Engineer graduated from SUP'COM Tunis. I specialize in
                securing enterprise infrastructure, automating security controls, and
                enforcing compliance frameworks.
              </Text>
            </VStack>

            <HStack spacing={4} flexWrap="wrap" justify={{ base: 'center', lg: 'flex-start' }} mt={8}>
              <Button
                as="a"
                href="https://www.linkedin.com/in/moetez-a-b5582221a/"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                leftIcon={<FaLinkedin />}
              >
                Connect on LinkedIn
              </Button>
              <Button
                as="a"
                href="mailto:moetez.afif@supcom.tn"
                variant="outline"
                size="lg"
                leftIcon={<FaEnvelope />}
              >
                Get in touch
              </Button>
            </HStack>

            <Flex
              gap={{ base: 3, md: 4 }}
              pt={10}
              wrap="wrap"
              justify={{ base: 'center', lg: 'flex-start' }}
              display={{ base: 'none', sm: 'flex' }}
            >
              {specialties.map(({ icon: ItemIcon, label }) => (
                <HStack
                  key={label}
                  spacing={2}
                  px={3}
                  py={2}
                  borderRadius="full"
                  border="1px solid"
                  borderColor="app.border"
                  bg="app.surface"
                  backdropFilter="blur(10px)"
                  color="app.muted"
                  fontSize="xs"
                  fontWeight="600"
                >
                  <Icon as={ItemIcon} color={accentColor} w={3.5} h={3.5} />
                  <Text>{label}</Text>
                </HStack>
              ))}
            </Flex>
          </MotionBox>

          <MotionBox
            flex={1}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' } as never}
            position="relative"
            display="flex"
            justifyContent="center"
          >
            <Box position="relative" maxW="440px" w="full">
              {/* Gradient ring frame */}
              <Box
                p="2px"
                bgGradient="linear(to-br, brand.400, accent.400, purple.500)"
                borderRadius="4xl"
                boxShadow="glow"
              >
                <MotionBox
                  borderRadius="4xl"
                  overflow="hidden"
                  bg="app.surfaceSolid"
                  whileHover={{ scale: 1.02 } as never}
                  transition={{ duration: 0.35 } as never}
                >
                  <Box
                    as="img"
                    src={ProfileImage}
                    alt="Moetez Afif"
                    w="100%"
                    h="auto"
                    display="block"
                    objectFit="cover"
                  />
                </MotionBox>
              </Box>

              {/* Floating stat card */}
              <MotionBox
                position="absolute"
                bottom={{ base: '-16px', md: '-24px' }}
                left={{ base: 0, md: '-28px' }}
                px={5}
                py={4}
                borderRadius="2xl"
                bg="app.surfaceSolid"
                border="1px solid"
                borderColor="app.border"
                boxShadow="xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 } as never}
              >
                <VStack align="start" spacing={0}>
                  <Text fontWeight="900" fontSize="2xl" bgGradient="linear(to-r, brand.400, accent.400)" bgClip="text">
                    3+
                  </Text>
                  <Text fontSize="2xs" fontWeight="700" letterSpacing="wider" color="app.muted">
                    YEARS EXPERIENCE
                  </Text>
                </VStack>
              </MotionBox>

              {/* Floating certifications card */}
              <MotionBox
                position="absolute"
                top={{ base: '-14px', md: '-20px' }}
                right={{ base: 0, md: '-24px' }}
                px={4}
                py={3}
                borderRadius="2xl"
                bg="app.surfaceSolid"
                border="1px solid"
                borderColor="app.border"
                boxShadow="xl"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.05, duration: 0.5 } as never}
              >
                <VStack align="start" spacing={2}>
                  <Text
                    fontSize="2xs"
                    fontWeight="800"
                    letterSpacing="wider"
                    textTransform="uppercase"
                    color="app.muted"
                  >
                    Certified
                  </Text>
                  {certifications.map((cert) => (
                    <HStack key={cert.name} spacing={2.5}>
                      <Icon as={FaCheckCircle} color={accentColor} boxSize={3.5} />
                      <VStack align="start" spacing={0}>
                        <Text fontSize="sm" fontWeight="800" lineHeight="shorter">
                          {cert.name}
                        </Text>
                        <Text fontSize="2xs" color="app.muted" fontWeight="600">
                          {cert.issuer}
                        </Text>
                      </VStack>
                    </HStack>
                  ))}
                </VStack>
              </MotionBox>
            </Box>
          </MotionBox>
        </Flex>
      </Container>
    </Box>
  );
};

export default Hero;
