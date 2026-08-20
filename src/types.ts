export type TabType = 
  | 'demand'
  | 'revenue'
  | 'supply'
  | 'factors'
  | 'calculator'
  | 'practice'
  | 'summary';

export type ElasticityCategory = 
  | 'elastic'
  | 'inelastic'
  | 'unitary'
  | 'perfect_elastic'
  | 'perfect_inelastic';

export interface Point2D {
  p: number; // Price
  q: number; // Quantity
}

export interface ArcElasticityResult {
  p1: number;
  p2: number;
  q1: number;
  q2: number;
  deltaP: number;
  deltaQ: number;
  avgP: number;
  avgQ: number;
  percentDeltaP: number;
  percentDeltaQ: number;
  elasticity: number;
  category: ElasticityCategory;
  tr1: number;
  tr2: number;
  deltaTR: number;
  gainArea: number;
  lossArea: number;
  commonArea: number;
}

export interface MCQuestion {
  id: string;
  year: number;
  paperNumber: string;
  questionNumber: string;
  topic: 'Ed' | 'Es' | 'TR' | 'Factors-Ed' | 'Factors-Es' | 'Straight-Line';
  difficulty: 'Level 3' | 'Level 4' | 'Level 5' | 'Level 5**';
  questionEn: string;
  questionZh?: string;
  contextEn?: string;
  contextZh?: string;
  tableData?: {
    headersEn: string[];
    headersZh?: string[];
    rows: (string | number)[][];
  };
  optionsEn: { label: 'A' | 'B' | 'C' | 'D'; text: string }[];
  optionsZh?: { label: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanationEn: string;
  explanationZh?: string;
  keyTakeawayEn: string;
  keyTakeawayZh?: string;
  hkdseTrapEn?: string;
  hkdseTrapZh?: string;
}

export interface StructuredQuestion {
  id: string;
  year: number;
  questionRef: string;
  marks: number;
  titleEn: string;
  titleZh?: string;
  scenarioEn: string;
  scenarioZh?: string;
  subQuestions: {
    part: string;
    marks: number;
    questionEn: string;
    questionZh?: string;
    modelAnswerEn: string;
    modelAnswerZh?: string;
    rubricCriteria: {
      criterionEn: string;
      criterionZh?: string;
      mark: number;
      type: 'Explanation' | 'Diagram / Condition' | 'Conclusion';
    }[];
    hintsEn: string[];
    hintsZh?: string[];
  }[];
}

export interface FactorItem {
  id: string;
  titleEn: string;
  titleZh?: string;
  impactEn: string;
  impactZh?: string;
  reasonEn: string;
  reasonZh?: string;
  exampleEn: string;
  exampleZh?: string;
  dseExamTipEn: string;
  dseExamTipZh?: string;
  iconName: string;
}

