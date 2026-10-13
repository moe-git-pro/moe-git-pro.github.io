import {
  Box,
  Heading,
  Text,
  Link,
  Image,
  Button,
  useColorModeValue,
  Spinner,
  VStack,
  Icon,
  HStack,
  Flex,
} from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaExternalLinkAlt, FaAward, FaBuilding } from 'react-icons/fa';
import { GlassCard, GradientText, SectionHeading, UiSection } from './ui';

interface Certificate {
  title: string;
  issueDate: string;
  issuer: string;
  description: string;
  link?: string;
  credlyLink?: string;
  photo: string;
}

const CertificateCard = ({
  title,
  issueDate,
  issuer,
  description,
  link,
  credlyLink,
  photo,
}: Certificate) => {
  const accentColor = useColorModeValue('brand.500', 'brand.300');

  return (
    <GlassCard h="100%" p={6} borderRadius="3xl" delay={0}>
      <VStack align="stretch" spacing={6} h="100%">
        <Flex
          bg={useColorModeValue('white', 'whiteAlpha.100')}
          borderRadius="2xl"
          border="1px solid"
          borderColor="app.border"
          p={4}
          justify="center"
          align="center"
          h="160px"
        >
          <Image
            src={photo}
            alt={title}
            maxH="100%"
            objectFit="contain"
            transition="transform 0.35s ease"
            _groupHover={{ transform: 'scale(1.08)' }}
          />
        </Flex>

        <VStack align="start" spacing={3} flex={1}>
          <HStack spacing={2}>
            <Icon as={FaAward} color={accentColor} />
            <Text
              fontSize="2xs"
              color={accentColor}
              fontWeight="800"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              {new Date(issueDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
              })}
            </Text>
          </HStack>

          <Heading size="md" fontWeight="800" color="app.text" lineHeight="shorter">
            {title}
          </Heading>

          <HStack spacing={2} color="app.muted">
            <Icon as={FaBuilding} w={3} h={3} />
            <Text fontSize="sm" fontWeight="600">
              {issuer}
            </Text>
          </HStack>

          <Text fontSize="sm" color="app.muted" noOfLines={3} lineHeight="tall">
            {description}
          </Text>
        </VStack>

        <HStack spacing={3} pt={4}>
          {credlyLink ? (
            <Button
              as={Link}
              href={credlyLink}
              isExternal
              size="sm"
              borderRadius="full"
              flex={1}
              _hover={{ textDecoration: 'none' }}
            >
              Verify Credly
            </Button>
          ) : link && (
            <Button
              as={Link}
              href={link}
              isExternal
              size="sm"
              borderRadius="full"
              flex={1}
              _hover={{ textDecoration: 'none' }}
            >
              View Certificate
            </Button>
          )}
          {link && credlyLink && (
            <Button
              as={Link}
              href={link}
              isExternal
              variant="outline"
              size="sm"
              borderRadius="full"
              _hover={{ textDecoration: 'none' }}
              leftIcon={<FaExternalLinkAlt fontSize="10px" />}
            >
              Cert
            </Button>
          )}
        </HStack>
      </VStack>
    </GlassCard>
  );
};

export const Certificates = ({ certificates }: { certificates: Certificate[] }) => {
  const accentColor = useColorModeValue('brand.500', 'brand.300');

  if (!certificates || certificates.length === 0) {
    return (
      <UiSection id="certifications">
        <Flex justify="center">
          <Spinner size="xl" color={accentColor} />
        </Flex>
      </UiSection>
    );
  }

  return (
    <UiSection id="certifications" orbs>
      <VStack spacing={16} align="stretch">
        <SectionHeading
          badge="Validation"
          title={
            <>
              Professional <GradientText>Certifications</GradientText>
            </>
          }
          subtitle="Verified credentials demonstrating expertise in cybersecurity, cloud security, and network management."
        />

        <Box
          px={{ base: 0, md: 6 }}
          pb={4}
          sx={{
            '.swiper': { paddingBottom: '56px', paddingTop: '8px' },
            '.swiper-button-next, .swiper-button-prev': {
              color: accentColor,
              w: '38px',
              h: '38px',
              borderRadius: 'full',
              bg: 'rgba(7,10,18,0.55)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.12)',
              '&::after': { fontSize: '14px', fontWeight: 'bold' },
            },
            '.swiper-pagination-bullet': {
              bg: 'gray.500',
              opacity: 0.5,
            },
            '.swiper-pagination-bullet-active': {
              bg: accentColor,
              opacity: 1,
              width: '22px',
              borderRadius: 'full',
            },
          }}
        >
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              md: { slidesPerView: 2 },
              lg: { slidesPerView: 3 },
            }}
            modules={[Navigation, Pagination, Autoplay]}
          >
            {certificates.map((certificate, index) => (
              <SwiperSlide key={index} style={{ height: 'auto' }}>
                <CertificateCard {...certificate} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </VStack>
    </UiSection>
  );
};
