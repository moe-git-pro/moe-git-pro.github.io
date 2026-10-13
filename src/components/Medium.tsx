import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Text,
  useColorModeValue,
  Link,
  Image,
  Badge,
  Icon,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { FaExternalLinkAlt, FaCalendarAlt } from 'react-icons/fa';
import { useMediumArticles } from '../hooks/useMediumArticles';
import { GlassCard, GradientText, SectionHeading, UiSection } from './ui';

const NewsCard = ({
  title,
  date,
  description,
  tags,
  link,
  thumbnail,
  delay,
}: {
  title: string;
  date: string;
  description: string;
  tags: string[];
  link: string;
  thumbnail: string;
  delay: number;
}) => {
  const accentColor = useColorModeValue('brand.500', 'brand.300');

  return (
    <GlassCard delay={delay} p={0} h="100%" overflow="hidden" borderRadius="3xl">
      <Link
        href={link}
        isExternal
        textDecoration="none"
        _hover={{ textDecoration: 'none' }}
        height="100%"
        display="flex"
        flexDirection="column"
      >
        {thumbnail && (
          <Box position="relative" overflow="hidden" h="220px">
            <Image
              src={thumbnail}
              alt={title}
              w="100%"
              h="100%"
              objectFit="cover"
              transition="transform 0.6s ease"
              _groupHover={{ transform: 'scale(1.08)' }}
            />
            <Box
              position="absolute"
              inset={0}
              bgGradient="linear(to-t, rgba(7,10,18,0.72), transparent 55%)"
            />
            <Badge
              position="absolute"
              top={4}
              right={4}
              bg="app.brandSoft"
              color="brand.200"
              border="1px solid"
              borderColor="whiteAlpha.300"
              backdropFilter="blur(8px)"
              px={3}
            >
              Article
            </Badge>
          </Box>
        )}

        <Box p={6} flex="1" display="flex" flexDirection="column">
          <HStack color="app.muted" fontSize="xs" mb={3} spacing={2}>
            <Icon as={FaCalendarAlt} />
            <Text fontWeight="600">
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </Text>
          </HStack>

          <Heading size="md" mb={3} noOfLines={2} fontWeight="800" lineHeight="shorter" color="app.text">
            {title}
          </Heading>

          <Text noOfLines={3} color="app.muted" fontSize="sm" mb={6} lineHeight="tall">
            {description.replace(/<[^>]*>/g, '').substring(0, 160)}...
          </Text>

          <Box mt="auto">
            <Flex wrap="wrap" gap={2} mb={4}>
              {tags?.slice(0, 2).map((tag, index) => (
                <Badge
                  key={index}
                  variant="subtle"
                  colorScheme="gray"
                  fontSize="2xs"
                  px={2}
                  borderRadius="md"
                >
                  {tag}
                </Badge>
              ))}
            </Flex>

            <Flex align="center" color={accentColor} fontWeight="700" fontSize="sm">
              Read More <Icon as={FaExternalLinkAlt} ml={2} w={3} h={3} />
            </Flex>
          </Box>
        </Box>
      </Link>
    </GlassCard>
  );
};

export const Medium = () => {
  const { articles, loading, error } = useMediumArticles();

  const spinnerColor = useColorModeValue('brand.500', 'brand.300');

  if (loading) {
    return (
      <UiSection id="medium">
        <Flex justify="center" py={12}>
          <Spinner size="xl" thickness="4px" speed="0.65s" color={spinnerColor} />
        </Flex>
      </UiSection>
    );
  }

  if (error) {
    return (
      <UiSection id="medium">
        <Text textAlign="center" color="red.400">
          Failed to load articles. Please check back later.
        </Text>
      </UiSection>
    );
  }

  return (
    <UiSection id="medium" orbs>
      <VStack spacing={16} align="stretch">
        <SectionHeading
          badge="Insights"
          title={
            <>
              Latest Articles & <GradientText>Publications</GradientText>
            </>
          }
          subtitle="Exploring the intersections of Cybersecurity, DevSecOps, and Cloud Architecture through technical writing."
        />

        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
          gap={8}
        >
          {articles.map((article, index) => (
            <GridItem key={index}>
              <NewsCard
                title={article.title}
                date={article.pubDate}
                description={article.description}
                tags={article.categories}
                link={article.link}
                thumbnail={article.thumbnail}
                delay={index * 0.06}
              />
            </GridItem>
          ))}
        </Grid>
      </VStack>
    </UiSection>
  );
};
