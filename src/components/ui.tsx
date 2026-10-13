import * as React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  chakra,
  shouldForwardProp,
  useColorModeValue,
  type BoxProps,
} from '@chakra-ui/react';
import {
  motion,
  isValidMotionProp,
  useScroll,
  useSpring,
  type Variants,
} from 'framer-motion';

/* eslint-disable react-refresh/only-export-components */

/** Chakra + Framer Motion box used across every animated section. */
export const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

/** Shared glass-surface props so every card looks like the same material. */
export const glass = {
  bg: 'app.surface',
  border: '1px solid',
  borderColor: 'app.border',
  backdropFilter: 'blur(14px)',
  borderRadius: '2xl',
} as const;

/** Standard "fade + rise" scroll reveal. */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

/** Inline gradient text for accent words inside headings. */
export const GradientText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const gradient = useColorModeValue(
    'linear(to-r, brand.600, accent.600)',
    'linear(to-r, brand.300, accent.300)'
  );

  return (
    <Text as="span" bgGradient={gradient} bgClip="text" color="transparent" fontWeight="inherit">
      {children}
    </Text>
  );
};

interface UiSectionProps extends BoxProps {
  id?: string;
  children: React.ReactNode;
  maxW?: string;
  orbs?: boolean;
}

/** A consistently spaced section shell with an optional ambient backdrop. */
export const UiSection: React.FC<UiSectionProps> = ({
  id,
  children,
  maxW = 'container.xl',
  orbs = false,
  ...rest
}) => (
  <Box as="section" id={id} position="relative" py={{ base: 20, md: 28 }} {...rest}>
    {orbs && <Orbs />}
    <Container maxW={maxW} position="relative" zIndex={1}>
      {children}
    </Container>
  </Box>
);

/** Soft floating gradient orbs used as ambient section decoration. */
export const Orbs: React.FC<{ align?: 'left' | 'right' | 'center' }> = ({ align = 'right' }) => {
  const top = align === 'left' ? '10%' : align === 'center' ? '30%' : '0%';
  const left = align === 'left' ? '-8%' : align === 'center' ? '35%' : 'auto';
  const right = align === 'right' ? '-8%' : 'auto';

  return (
    <Box position="absolute" inset={0} overflow="hidden" pointerEvents="none" zIndex={0} aria-hidden>
      <Box
        className="anim-drift"
        position="absolute"
        top={top}
        left={left}
        right={right}
        w={{ base: '280px', md: '420px' }}
        h={{ base: '280px', md: '420px' }}
        bg="brand.500"
        filter="blur(140px)"
        opacity={useColorModeValue(0.10, 0.22)}
        borderRadius="full"
      />
      <Box
        className="anim-float"
        position="absolute"
        bottom="0%"
        left={align === 'left' ? '20%' : '5%'}
        w={{ base: '220px', md: '340px' }}
        h={{ base: '220px', md: '340px' }}
        bg="accent.500"
        filter="blur(150px)"
        opacity={useColorModeValue(0.08, 0.18)}
        borderRadius="full"
      />
    </Box>
  );
};

interface SectionHeadingProps {
  badge?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'center' | 'left';
  children?: React.ReactNode;
}

/** Unified section header: eyebrow badge + display heading + supporting copy. */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  children,
}) => {
  const badgeColor = useColorModeValue('brand.600', 'brand.200');
  const badgeBorderColor = useColorModeValue('brand.200', 'brand.700');

  return (
    <MotionBox
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      style={{ textAlign: align === 'center' ? 'center' : 'left' }}
    >
      <VStack
        spacing={4}
        align={align === 'center' ? 'center' : 'flex-start'}
        mx={align === 'center' ? 'auto' : 0}
      >
        {badge && (
          <Badge
            px={4}
            py={1.5}
            fontSize="2xs"
            bg="app.brandSoft"
            color={badgeColor}
            border="1px solid"
            borderColor={badgeBorderColor}
          >
          <HStack spacing={2}>
            <Box w={1.5} h={1.5} borderRadius="full" bg="brand.400" />
            <Text as="span" color="inherit">
              {badge}
            </Text>
          </HStack>
        </Badge>
      )}
      <Heading
        fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
        fontWeight="800"
        lineHeight="shorter"
        maxW="3xl"
      >
        {title}
      </Heading>
      {subtitle && (
        <Text color="app.muted" fontSize={{ base: 'md', md: 'lg' }} maxW="2xl" lineHeight="tall">
          {subtitle}
        </Text>
      )}
      {children}
    </VStack>
  </MotionBox>
);
};

interface GlassCardProps extends BoxProps {
  children: React.ReactNode;
  delay?: number;
}

/** A glass surface with the shared hover lift + brand border glow. */
export const GlassCard: React.FC<GlassCardProps> = ({ children, delay = 0, ...rest }) => (
  <MotionBox
    initial={{ opacity: 0, y: 26 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, delay, ease: 'easeOut' } as never}
    whileHover={{ y: -4 } as never}
    className="glass-card"
    {...glass}
    position="relative"
    role="group"
    p={6}
    _hover={{
      borderColor: 'brand.400',
      boxShadow: 'glow-sm',
    }}
    {...rest}
  >
    {children}
  </MotionBox>
);

/** Fixed, site-wide ambient background: dotted grid + soft light blooms. */
export const SiteBackground: React.FC = () => {
  const gridColor = useColorModeValue('rgba(15, 23, 42, 0.05)', 'rgba(255, 255, 255, 0.045)');

  return (
    <Box position="fixed" inset={0} zIndex={0} overflow="hidden" pointerEvents="none" aria-hidden>
      <Box
        position="absolute"
        inset={0}
        bgImage={`linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`}
        bgSize="56px 56px"
        sx={{
          maskImage: 'radial-gradient(ellipse 90% 60% at 50% 0%, black 25%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 60% at 50% 0%, black 25%, transparent 80%)',
        }}
      />
    </Box>
  );
};

/** Thin gradient bar at the very top that tracks scroll progress. */
export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: '0%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        zIndex: 1100,
        background: 'linear-gradient(to right, #0ea5e9, #22d3ee, #38bdf8)',
      }}
    />
  );
};
