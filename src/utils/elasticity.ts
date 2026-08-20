import { ArcElasticityResult, ElasticityCategory } from '../types';

/**
 * Calculates Arc Elasticity using the Average Price and Quantity Method
 * as strictly required by the HKDSE Economics Syllabus.
 *
 * Formula:
 * Ed = | %ΔQd / %ΔP |
 *    = | [ (Q2 - Q1) / ((Q1 + Q2)/2) ] / [ (P2 - P1) / ((P1 + P2)/2) ] |
 *    = | (ΔQ / ΔP) * ((P1 + P2) / (Q1 + Q2)) |
 */
export function calculateArcElasticity(
  p1: number,
  p2: number,
  q1: number,
  q2: number,
  isDemand: boolean = true
): ArcElasticityResult {
  const deltaP = p2 - p1;
  const deltaQ = q2 - q1;
  const avgP = (p1 + p2) / 2;
  const avgQ = (q1 + q2) / 2;

  const percentDeltaP = avgP !== 0 ? (deltaP / avgP) * 100 : 0;
  const percentDeltaQ = avgQ !== 0 ? (deltaQ / avgQ) * 100 : 0;

  let rawElasticity = 0;
  if (Math.abs(percentDeltaP) > 0.0001) {
    rawElasticity = percentDeltaQ / percentDeltaP;
  } else {
    rawElasticity = deltaQ === 0 ? 0 : 9999;
  }

  // Take absolute value for demand elasticity according to HKDSE convention
  const elasticity = isDemand ? Math.abs(rawElasticity) : rawElasticity;

  let category: ElasticityCategory = 'inelastic';
  const rounded = Number(elasticity.toFixed(4));

  if (rounded === 0 || Math.abs(deltaQ) < 0.0001) {
    category = 'perfect_inelastic';
  } else if (rounded > 999 || Math.abs(deltaP) < 0.0001) {
    category = 'perfect_elastic';
  } else if (Math.abs(rounded - 1) < 0.02) {
    category = 'unitary';
  } else if (rounded > 1) {
    category = 'elastic';
  } else {
    category = 'inelastic';
  }

  const tr1 = p1 * q1;
  const tr2 = p2 * q2;
  const deltaTR = tr2 - tr1;

  // Box geometry for Total Revenue visual breakdown:
  // When price rises (P2 > P1, Q2 < Q1 for demand):
  // Common area: P1 * Q2
  // Gain in TR from price rise: (P2 - P1) * Q2
  // Loss in TR from quantity fall: P1 * (Q1 - Q2)
  let gainArea = 0;
  let lossArea = 0;
  let commonArea = 0;

  if (p2 > p1) {
    if (q2 < q1) {
      gainArea = (p2 - p1) * q2;
      lossArea = p1 * (q1 - q2);
      commonArea = p1 * q2;
    } else {
      gainArea = tr2 - tr1;
      lossArea = 0;
      commonArea = tr1;
    }
  } else {
    // Price falls (P2 < P1, Q2 > Q1 for demand)
    if (q2 > q1) {
      gainArea = p2 * (q2 - q1);
      lossArea = (p1 - p2) * q1;
      commonArea = p2 * q1;
    } else {
      gainArea = 0;
      lossArea = tr1 - tr2;
      commonArea = tr2;
    }
  }

  return {
    p1,
    p2,
    q1,
    q2,
    deltaP,
    deltaQ,
    avgP,
    avgQ,
    percentDeltaP,
    percentDeltaQ,
    elasticity: Number(elasticity.toFixed(3)),
    category,
    tr1: Number(tr1.toFixed(2)),
    tr2: Number(tr2.toFixed(2)),
    deltaTR: Number(deltaTR.toFixed(2)),
    gainArea: Number(gainArea.toFixed(2)),
    lossArea: Number(lossArea.toFixed(2)),
    commonArea: Number(commonArea.toFixed(2)),
  };
}

/**
 * Given a linear demand curve equation P = a - bQ
 * calculates Q for a given P.
 */
export function getDemandQuantity(p: number, a: number = 20, b: number = 0.2): number {
  const q = (a - p) / b;
  return Math.max(0, q);
}

/**
 * Given a linear supply curve equation P = c + dQ
 * calculates Q for a given P.
 */
export function getSupplyQuantity(p: number, c: number = 4, d: number = 0.15): number {
  const q = (p - c) / d;
  return Math.max(0, q);
}
