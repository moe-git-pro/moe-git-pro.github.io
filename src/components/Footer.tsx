import React from 'react';
import {
  Box,
  Text,
  Link,
  Stack,
  useColorModeValue,
  Container,
  IconButton,
  HStack,
  Divider,
  VStack,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Icon } from '@chakra-ui/react';

const Footer: React.FC = () => {
  const borderColor = useColorModeValue('light.border', 'dark.border');
  const accentColor = useColorModeValue('brand.600', 'brand.200');
  const nameGradient = useColorModeValue(
    'linear(to-r, brand.600, accent.600)',
    'linear(to-r, brand.200, accent.200)'
  );

  const socials = [
    { icon: FaGithub, href: 'https://github.com/moetezafif-git', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/moetez-a-b5582221a/', label: 'LinkedIn' },
    { icon: FaEnvelope, href: 'mailto:moetez.afif@supcom.tn', label: 'Email' },
  ];

  return (
    <Box as="footer" py={16} position="relative" overflow="hidden">
      {/* Top glow line */}
      <Box
        position="absolute"
        top={0}
        left="10%"
        right="10%"
        h="1px"
        bgGradient="linear(to-r, transparent, brand.400, accent.400, transparent)"
        opacity={0.6}
      />

      <Container maxW="container.xl">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          spacing={10}
        >
          <VStack align={{ base: 'center', md: 'flex-start' }} spacing={2}>
            <Text
              fontWeight="800"
              fontSize="xl"
              letterSpacing="-0.02em"
              bgGradient={nameGradient}
              bgClip="text"
            >
              Moetez Afif
            </Text>
            <Text color="app.muted" fontSize="sm">
              DevSecOps Engineer
            </Text>
          </VStack>

          <HStack spacing={3}>
            {socials.map(({ icon: ItemIcon, href, label }) => (
              <IconButton
                key={label}
                as={Link}
                href={href}
                isExternal
                aria-label={label}
                icon={<Icon as={ItemIcon} />}
                variant="ghost"
                borderRadius="full"
                bg="app.surface"
                border="1px solid"
                borderColor="app.border"
                color="app.muted"
                _hover={{
                  color: accentColor,
                  borderColor: accentColor,
                  transform: 'translateY(-3px)',
                  boxShadow: 'glow-sm',
                }}
              />
            ))}
          </HStack>

          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            {['Home', 'About', 'Projects'].map((name) => {
              const href = `#${name.toLowerCase() === 'home' ? 'home' : name.toLowerCase()}`;
              return (
                <Link key={name} href={href} fontSize="sm" color="app.muted" fontWeight="600" _hover={{ color: accentColor }}>
                  {name}
                </Link>
              );
            })}
          </HStack>
        </Stack>

        <Divider borderColor={borderColor} my={10} />

        <Text textAlign="center" color="app.muted" fontSize="xs">
          &copy; {new Date().getFullYear()} Moetez Afif. Crafted with{' '}
          <Text as="span" color={accentColor}>●</Text> — All rights reserved.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;