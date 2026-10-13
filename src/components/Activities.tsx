import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  useColorModeValue,
  IconButton,
  Badge,
  VStack,
  Icon,
  HStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaCalendarAlt, FaCamera } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard, GradientText, SectionHeading, UiSection } from './ui';

const MotionBox = motion.div;

const ActivityCard = ({
  title,
  date,
  description,
  tags,
  photos,
  index,
}: {
  title: string;
  date: string;
  description: string;
  tags: string[];
  photos: string[];
  index: number;
}) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const accentColor = useColorModeValue('brand.500', 'brand.300');

  const goToNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  const goToPreviousPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <GlassCard delay={index * 0.08} p={0} h="100%" display="flex" flexDirection="column">
      {photos.length > 0 && (
        <Box height="250px" position="relative" overflow="hidden" role="group" borderTopRadius="2xl">
          <AnimatePresence mode="wait">
            <MotionBox
              key={currentPhoto}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${photos[currentPhoto]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </AnimatePresence>

          {photos.length > 1 && (
            <>
              <IconButton
                icon={<FaChevronLeft size="12px" />}
                aria-label="Previous Photo"
                position="absolute"
                left={3}
                top="50%"
                transform="translateY(-50%)"
                onClick={goToPreviousPhoto}
                size="sm"
                borderRadius="full"
                bg="blackAlpha.600"
                color="white"
                _hover={{ bg: 'blackAlpha.800' }}
              />
              <IconButton
                icon={<FaChevronRight size="12px" />}
                aria-label="Next Photo"
                position="absolute"
                right={3}
                top="50%"
                transform="translateY(-50%)"
                onClick={goToNextPhoto}
                size="sm"
                borderRadius="full"
                bg="blackAlpha.600"
                color="white"
                _hover={{ bg: 'blackAlpha.800' }}
              />
              <HStack position="absolute" bottom={4} left="50%" transform="translateX(-50%)" spacing={1.5}>
                {photos.map((_, i) => (
                  <Box
                    key={i}
                    w={i === currentPhoto ? 4 : 1.5}
                    h={1.5}
                    bg={i === currentPhoto ? 'white' : 'whiteAlpha.600'}
                    borderRadius="full"
                    transition="all 0.3s"
                  />
                ))}
              </HStack>
            </>
          )}

          <Badge
            position="absolute"
            top={4}
            left={4}
            bg="blackAlpha.700"
            color="white"
            borderRadius="full"
            px={3}
            border="1px solid"
            borderColor="whiteAlpha.200"
          >
            <HStack spacing={1}>
              <Icon as={FaCamera} boxSize={3} />
              <Text fontSize="2xs">{photos.length} Photos</Text>
            </HStack>
          </Badge>
        </Box>
      )}

      <VStack p={6} align="start" spacing={4} flex={1}>
        <HStack color={accentColor} fontSize="xs" spacing={2}>
          <Icon as={FaCalendarAlt} />
          <Text fontWeight="800">{date}</Text>
        </HStack>

        <Heading size="md" fontWeight="800" color="app.text" noOfLines={2}>
          {title}
        </Heading>

        <Text fontSize="sm" color="app.muted" noOfLines={3} lineHeight="tall">
          {description}
        </Text>

        <Box mt="auto" w="full">
          <Flex wrap="wrap" gap={2}>
            {tags.map((tag, i) => (
              <Badge
                key={i}
                variant="subtle"
                colorScheme="brand"
                fontSize="2xs"
                px={2}
                borderRadius="md"
              >
                {tag}
              </Badge>
            ))}
          </Flex>
        </Box>
      </VStack>
    </GlassCard>
  );
};

export const Activities = () => {
  const activities = [
    {
      title: 'Hackfest Organizer & CTF Creator',
      date: 'Jun 2023',
      description: 'Member of the technical team for one of the most prominent CTF events in Tunisia. Responsible for qualification challenges.',
      tags: ['Industrie 4.0', 'Cybersecurity', 'CTF Creator'],
      photos: ['assets/hackfest2023.jpg'],
    },
    {
      title: 'Trainer Manager @ Cybersecurity Club (Sup\'Com)',
      date: '2023 - 2024',
      description: 'Led and organized workshops and training sessions, mentoring students on foundational and advanced cybersecurity topics.',
      tags: ['Leadership', 'Mentoring', 'Workshops'],
      photos: ['assets/workshop2.jpeg', 'assets/workshop1.jpeg', 'assets/workshop3.jpeg'],
    },
    {
      title: '3rd Prize Winner: Cybersecurity Hackathon 2023',
      date: 'Oct 2022',
      description: 'Innovated and tackled critical cybersecurity challenges in the context of Industry 4.0, securing a top 3 finish.',
      tags: ['Innovation', 'Hackathon', 'Award Winner'],
      photos: ['assets/hackathon.jpeg'],
    },
  ];

  return (
    <UiSection id="activities">
      <VStack spacing={16} align="stretch">
        <SectionHeading
          badge="Leadership"
          title={
            <>
              Community & <GradientText>Activities</GradientText>
            </>
          }
          subtitle="Passionate about sharing knowledge and contributing to the global cybersecurity and tech community."
        />

        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
          gap={8}
        >
          {activities.map((activity, index) => (
            <GridItem key={index}>
              <ActivityCard {...activity} index={index} />
            </GridItem>
          ))}
        </Grid>
      </VStack>
    </UiSection>
  );
};
