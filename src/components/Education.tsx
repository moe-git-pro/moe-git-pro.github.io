import React, { useState } from 'react';
import {
  Box,
  VStack,
  Icon,
  Heading,
  Text,
  Flex,
  useColorModeValue,
  HStack,
  Circle,
  Collapse,
  Button,
} from '@chakra-ui/react';
import { FaGraduationCap, FaChevronDown, FaChevronUp, FaCalendarAlt } from 'react-icons/fa';
import { GlassCard, GradientText, SectionHeading, UiSection } from './ui';

const EducationCard = ({
  institution,
  degree,
  year,
  details,
  index,
  isExpanded,
  onToggle,
}: {
  institution: string;
  degree: string;
  year: string;
  details: string[];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const accentColor = useColorModeValue('brand.500', 'brand.300');

  return (
    <GlassCard
      delay={index * 0.08}
      p={8}
      borderRadius="3xl"
      borderColor={isExpanded ? accentColor : 'app.border'}
    >
      <Flex direction={{ base: 'column', md: 'row' }} align="start" gap={6}>
        <Circle size="60px" bgGradient="linear(to-br, brand.500, accent.500)" color="white" boxShadow="soft" flexShrink={0}>
          <Icon as={FaGraduationCap} w={6} h={6} />
        </Circle>

        <VStack align="start" spacing={4} flex={1}>
          <VStack align="start" spacing={1}>
            <Heading size="md" color="app.text" fontWeight="800">
              {degree}
            </Heading>
            <HStack spacing={4} wrap="wrap">
              <HStack spacing={1} color={accentColor}>
                <Text fontWeight="700" fontSize="sm">{institution}</Text>
              </HStack>
              <HStack spacing={1} color="app.muted" fontSize="xs">
                <Icon as={FaCalendarAlt} />
                <Text fontWeight="600">{year}</Text>
              </HStack>
            </HStack>
          </VStack>

          <Collapse in={isExpanded} animateOpacity>
            <VStack align="start" spacing={2} pt={2}>
              {details.map((detail, idx) => (
                <HStack key={idx} align="start" spacing={3}>
                  <Box mt={2} w={1.5} h={1.5} borderRadius="full" bg={accentColor} flexShrink={0} />
                  <Text fontSize="sm" color="app.muted" lineHeight="tall">
                    {detail}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Collapse>

          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            rightIcon={isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            fontSize="xs"
            color={accentColor}
            p={0}
            _hover={{ bg: 'transparent', opacity: 0.8 }}
          >
            {isExpanded ? 'Hide Details' : 'View Focus Areas'}
          </Button>
        </VStack>
      </Flex>
    </GlassCard>
  );
};

const Education: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const educationItems = [
    {
      institution: 'Higher School of Communication of Tunis (SUP\'COM)',
      degree: 'ICT Engineering Diploma',
      year: '2021 - 2024',
      details: [
        'Specialized in Cybersecurity and Network infrastructure.',
        'Core curriculum in Cloud computing and Software engineering.',
        'In-depth study of Database management and Data science.',
        'Focused on Artificial intelligence and Radio systems.',
      ],
    },
    {
      institution: 'Monastir Preparatory Engineering Institute',
      degree: 'Preparatory Cycle (Math-Physics)',
      year: '2019 - 2021',
      details: [
        'Intensive study of advanced mathematics and physics.',
        'Achieved rank 19/900 in the National Engineering School Entrance Exam.',
      ],
    },
  ];

  return (
    <UiSection id="education" maxW="container.lg">
      <VStack spacing={16} align="stretch">
        <SectionHeading
          badge="Academic"
          title={
            <>
              Educational <GradientText>Journey</GradientText>
            </>
          }
          subtitle="Foundational knowledge and specialized engineering training from leading technical institutions."
        />

        <VStack spacing={6} align="stretch">
          {educationItems.map((item, index) => (
            <EducationCard
              key={index}
              {...item}
              index={index}
              isExpanded={expandedIndex === index}
              onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
            />
          ))}
        </VStack>
      </VStack>
    </UiSection>
  );
};

export default Education;
