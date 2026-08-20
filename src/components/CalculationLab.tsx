import React, { useState } from 'react';
import { calculateArcElasticity } from '../utils/elasticity';
import confetti from 'canvas-confetti';
import { 
  Calculator, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  Award,
  AlertCircle
} from 'lucide-react';

export const CalculationLab: React.FC = () => {
  // Mode: 'calculator' (free form) | 'quiz' (interactive problem solver)
  const [labMode, setLabMode] = useState<'calculator' | 'challenge'>('calculator');

  // Free-form state
  const [p1, setP1] = useState<number>(70);
  const [p2, setP2] = useState<number>(50);
  const [q1, setQ1] = useState<number>(100);
  const [q2, setQ2] = useState<number>(122);
  const [isDemand, setIsDemand] = useState<boolean>(true);

  // Challenge mode state
  const [challengeSeed, setChallengeSeed] = useState<number>(1);
  const [userDeltaP, setUserDeltaP] = useState<string>('');
  const [userDeltaQ, setUserDeltaQ] = useState<string>('');
  const [userEd, setUserEd] = useState<string>('');
  const [userCategory, setUserCategory] = useState<string>('');
  const [userTRChange, setUserTRChange] = useState<string>('');
  const [feedback, setFeedback] = useState<{
    submitted: boolean;
    score: number;
    maxScore: number;
    details: { name: string; correct: boolean; expected: string; user: string }[];
  } | null>(null);

  // Challenge Question Definition
  const challengeProblems = [
    {
      id: 1,
      titleEn: 'DSE 2020 Q11: Australia’s Red Wine',
      p1: 70,
      p2: 50,
      q1: 100,
      q2: 122,
      descEn: 'Price decreases from $70 to $50, Quantity increases from 100 to 122 units.'
    },
    {
      id: 2,
      titleEn: 'DSE 2024 Q13: Air Purifier Subsidy',
      p1: 1200,
      p2: 1000,
      q1: 5000,
      q2: 8000,
      descEn: 'Price falls from $1200 to $1000, Quantity transacted rises from 5000 to 8000 units.'
    },
    {
      id: 3,
      titleEn: 'Secondary School Worksheet: Snack Bar Drink',
      p1: 12,
      p2: 8,
      q1: 60,
      q2: 100,
      descEn: 'Price falls from $12 to $8, Quantity demanded increases from 60 to 100 units.'
    },
    {
      id: 4,
      titleEn: 'MTR Service Fare Adjustment',
      p1: 20,
      p2: 22,
      q1: 500,
      q2: 480,
      descEn: 'Fare increases from $20 to $22, Passenger trips decrease from 500 to 480 thousand.'
    }
  ];

  const currentChallenge = challengeProblems[(challengeSeed - 1) % challengeProblems.length];
  const challengeArc = calculateArcElasticity(currentChallenge.p1, currentChallenge.p2, currentChallenge.q1, currentChallenge.q2, true);

  // Preset loader for freeform
  const loadPreset = (problemIndex: number) => {
    const prob = challengeProblems[problemIndex];
    setP1(prob.p1);
    setP2(prob.p2);
    setQ1(prob.q1);
    setQ2(prob.q2);
  };

  const freeResult = calculateArcElasticity(p1, p2, q1, q2, isDemand);

  // Check student challenge submission
  const handleCheckChallenge = () => {
    const expectedDeltaP = Math.abs(challengeArc.percentDeltaP).toFixed(1);
    const expectedDeltaQ = Math.abs(challengeArc.percentDeltaQ).toFixed(1);
    const expectedEd = challengeArc.elasticity.toFixed(2);
    const expectedCat = challengeArc.category === 'elastic' ? 'elastic' : challengeArc.category === 'inelastic' ? 'inelastic' : 'unitary';
    const expectedTR = challengeArc.deltaTR > 0 ? 'increase' : challengeArc.deltaTR < 0 ? 'decrease' : 'unchanged';

    const pCorrect = Math.abs(parseFloat(userDeltaP) - parseFloat(expectedDeltaP)) < 0.5;
    const qCorrect = Math.abs(parseFloat(userDeltaQ) - parseFloat(expectedDeltaQ)) < 0.5;
    const edCorrect = Math.abs(parseFloat(userEd) - parseFloat(expectedEd)) < 0.05;
    const catCorrect = userCategory === expectedCat;
    const trCorrect = userTRChange === expectedTR;

    const details = [
      {
        name: '%ΔP (Price % Change)',
        correct: pCorrect,
        expected: `${expectedDeltaP}%`,
        user: userDeltaP ? `${userDeltaP}%` : 'N/A'
      },
      {
        name: '%ΔQ (Quantity % Change)',
        correct: qCorrect,
        expected: `${expectedDeltaQ}%`,
        user: userDeltaQ ? `${userDeltaQ}%` : 'N/A'
      },
      {
        name: 'Arc Elasticity (|Ed|)',
        correct: edCorrect,
        expected: expectedEd,
        user: userEd || 'N/A'
      },
      {
        name: 'Elasticity Category',
        correct: catCorrect,
        expected: expectedCat === 'elastic' ? 'Elastic (>1)' : 'Inelastic (<1)',
        user: userCategory || 'N/A'
      },
      {
        name: 'Total Revenue (TR) Change',
        correct: trCorrect,
        expected: expectedTR === 'increase' ? 'Increases' : 'Decreases',
        user: userTRChange || 'N/A'
      }
    ];

    const score = details.filter(d => d.correct).length;
    setFeedback({
      submitted: true,
      score,
      maxScore: details.length,
      details
    });

    if (score === details.length) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  };

  const nextChallenge = () => {
    setChallengeSeed(prev => prev + 1);
    setUserDeltaP('');
    setUserDeltaQ('');
    setUserEd('');
    setUserCategory('');
    setUserTRChange('');
    setFeedback(null);
  };

  return (
    <div className="space-y-6" id="calculation-lab-section">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                HKDSE Arc Formula Workout
              </span>
              <span className="text-xs text-stone-500 font-mono">
                Average Price &amp; Quantity Method
              </span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
              Arc Elasticity &amp; Total Revenue Calculation Lab
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
              Master the official HKDSE Arc Elasticity calculations with step-by-step mathematical working, formula substitutions, and interactive challenge drills.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700 self-start">
            <button
              onClick={() => setLabMode('calculator')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                labMode === 'calculator'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              Step-by-Step Calculator
            </button>
            <button
              onClick={() => setLabMode('challenge')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                labMode === 'challenge'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Calculation Challenge
            </button>
          </div>
        </div>
      </div>

      {labMode === 'calculator' ? (
        /* Free-Form Calculator Mode */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 5 cols: Inputs & Presets */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                  Input Variables (P₁, P₂, Q₁, Q₂)
                </h3>
                <div className="flex gap-1 text-xs">
                  <button
                    onClick={() => setIsDemand(true)}
                    className={`px-2 py-0.5 rounded font-medium cursor-pointer ${isDemand ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' : 'text-stone-500'}`}
                  >
                    Demand |Ed|
                  </button>
                  <button
                    onClick={() => setIsDemand(false)}
                    className={`px-2 py-0.5 rounded font-medium cursor-pointer ${!isDemand ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' : 'text-stone-500'}`}
                  >
                    Supply Es
                  </button>
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-stone-600 dark:text-stone-400 font-semibold mb-1">
                    Initial Price (P₁):
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-2 text-stone-400 font-bold">$</span>
                    <input
                      type="number"
                      value={p1}
                      onChange={(e) => setP1(Math.max(0.1, Number(e.target.value)))}
                      className="w-full pl-6 pr-2 py-1.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg font-mono font-bold text-stone-900 dark:text-stone-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-600 dark:text-stone-400 font-semibold mb-1">
                    New Price (P₂):
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-2 text-stone-400 font-bold">$</span>
                    <input
                      type="number"
                      value={p2}
                      onChange={(e) => setP2(Math.max(0.1, Number(e.target.value)))}
                      className="w-full pl-6 pr-2 py-1.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg font-mono font-bold text-stone-900 dark:text-stone-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-600 dark:text-stone-400 font-semibold mb-1">
                    Initial Quantity (Q₁):
                  </label>
                  <input
                    type="number"
                    value={q1}
                    onChange={(e) => setQ1(Math.max(0.1, Number(e.target.value)))}
                    className="w-full px-3 py-1.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg font-mono font-bold text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 dark:text-stone-400 font-semibold mb-1">
                    New Quantity (Q₂):
                  </label>
                  <input
                    type="number"
                    value={q2}
                    onChange={(e) => setQ2(Math.max(0.1, Number(e.target.value)))}
                    className="w-full px-3 py-1.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg font-mono font-bold text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              {/* Load Past Paper Presets */}
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                <span className="text-[11px] font-bold text-stone-500 block mb-2">
                  Load DSE Exam Cases:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => loadPreset(0)}
                    className="p-2 text-left bg-stone-50 hover:bg-emerald-50 dark:bg-stone-800 dark:hover:bg-emerald-950/40 rounded border border-stone-200 dark:border-stone-700 text-[11px] text-stone-700 dark:text-stone-300 cursor-pointer"
                  >
                    <strong>DSE 2020:</strong> $70→$50, 100→122
                  </button>
                  <button
                    onClick={() => loadPreset(1)}
                    className="p-2 text-left bg-stone-50 hover:bg-emerald-50 dark:bg-stone-800 dark:hover:bg-emerald-950/40 rounded border border-stone-200 dark:border-stone-700 text-[11px] text-stone-700 dark:text-stone-300 cursor-pointer"
                  >
                    <strong>DSE 2024:</strong> $1200→$1000
                  </button>
                  <button
                    onClick={() => loadPreset(2)}
                    className="p-2 text-left bg-stone-50 hover:bg-emerald-50 dark:bg-stone-800 dark:hover:bg-emerald-950/40 rounded border border-stone-200 dark:border-stone-700 text-[11px] text-stone-700 dark:text-stone-300 cursor-pointer"
                  >
                    <strong>Worksheet:</strong> $12→$8, 60→100
                  </button>
                  <button
                    onClick={() => loadPreset(3)}
                    className="p-2 text-left bg-stone-50 hover:bg-emerald-50 dark:bg-stone-800 dark:hover:bg-emerald-950/40 rounded border border-stone-200 dark:border-stone-700 text-[11px] text-stone-700 dark:text-stone-300 cursor-pointer"
                  >
                    <strong>MTR:</strong> $20→$22, 500→480
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Result Badge */}
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-emerald-900 dark:text-emerald-200">
                  Calculated Result
                </span>
                <span className="font-mono text-base font-extrabold text-emerald-700 dark:text-emerald-300">
                  {isDemand ? '|Ed|' : 'Es'} = {freeResult.elasticity.toFixed(2)}
                </span>
              </div>
              <div className="text-stone-700 dark:text-stone-300 flex justify-between">
                <span>Initial TR₁: ${freeResult.tr1}</span>
                <span>→</span>
                <span>New TR₂: ${freeResult.tr2}</span>
                <span className="font-bold text-emerald-700">
                  ({freeResult.deltaTR >= 0 ? `+${freeResult.deltaTR}` : freeResult.deltaTR})
                </span>
              </div>
            </div>
          </div>

          {/* Right 7 cols: Step-by-Step Mathematical Derivation */}
          <div className="lg:col-span-7 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              HKDSE Step-by-Step Marking Steps
            </h3>

            <div className="space-y-3 font-mono text-xs">
              {/* Step 1: Average & Deltas */}
              <div className="p-3 bg-stone-50 dark:bg-stone-950 rounded-lg border border-stone-200 dark:border-stone-800 space-y-1">
                <div className="text-emerald-700 dark:text-emerald-400 font-bold font-sans">
                  Step 1: Calculate Absolute Changes (Δ) and Averages
                </div>
                <div className="text-stone-700 dark:text-stone-300">
                  ΔP = |${p2} - ${p1}| = ${Math.abs(freeResult.deltaP)} &nbsp;|&nbsp; Average P = (${p1} + ${p2}) / 2 = ${freeResult.avgP.toFixed(1)}
                </div>
                <div className="text-stone-700 dark:text-stone-300">
                  ΔQ = |{q2} - {q1}| = {Math.abs(freeResult.deltaQ)} &nbsp;|&nbsp; Average Q = ({q1} + {q2}) / 2 = {freeResult.avgQ.toFixed(1)}
                </div>
              </div>

              {/* Step 2: Percentage Changes */}
              <div className="p-3 bg-stone-50 dark:bg-stone-950 rounded-lg border border-stone-200 dark:border-stone-800 space-y-1">
                <div className="text-emerald-700 dark:text-emerald-400 font-bold font-sans">
                  Step 2: Percentage Changes (%ΔP and %ΔQ)
                </div>
                <div className="text-stone-700 dark:text-stone-300">
                  %ΔP = (${Math.abs(freeResult.deltaP)} / ${freeResult.avgP.toFixed(1)}) × 100% = {Math.abs(freeResult.percentDeltaP).toFixed(2)}%
                </div>
                <div className="text-stone-700 dark:text-stone-300">
                  %ΔQ = ({Math.abs(freeResult.deltaQ)} / {freeResult.avgQ.toFixed(1)}) × 100% = {Math.abs(freeResult.percentDeltaQ).toFixed(2)}%
                </div>
              </div>

              {/* Step 3: Arc Elasticity Formula Substitution */}
              <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-900/40 space-y-1.5">
                <div className="text-emerald-800 dark:text-emerald-300 font-bold font-sans">
                  Step 3: Arc Elasticity Formula Substitution
                </div>
                <div className="text-stone-800 dark:text-stone-200">
                  {isDemand ? 'Ed' : 'Es'} = | %ΔQ / %ΔP | = | {Math.abs(freeResult.percentDeltaQ).toFixed(2)}% / {Math.abs(freeResult.percentDeltaP).toFixed(2)}% |
                </div>
                <div className="text-stone-800 dark:text-stone-200">
                  = | ({Math.abs(freeResult.deltaQ)} / {Math.abs(freeResult.deltaP)}) × ({p1 + p2} / {q1 + q2}) |
                </div>
                <div className="text-base font-extrabold text-emerald-700 dark:text-emerald-400 pt-1">
                  = {freeResult.elasticity.toFixed(3)} ≈ {freeResult.elasticity.toFixed(2)}
                  <span className="text-xs font-normal font-sans ml-2 text-stone-600 dark:text-stone-400">
                    ({freeResult.category === 'elastic' ? 'Elastic > 1' : freeResult.category === 'inelastic' ? 'Inelastic < 1' : 'Unitary = 1'})
                  </span>
                </div>
              </div>

              {/* Step 4: Total Revenue Verification */}
              <div className="p-3 bg-stone-50 dark:bg-stone-950 rounded-lg border border-stone-200 dark:border-stone-800 space-y-1">
                <div className="text-emerald-700 dark:text-emerald-400 font-bold font-sans">
                  Step 4: Total Revenue (TR = P × Q) Analysis
                </div>
                <div className="text-stone-700 dark:text-stone-300">
                  TR₁ = ${p1} × {q1} = ${freeResult.tr1}
                </div>
                <div className="text-stone-700 dark:text-stone-300">
                  TR₂ = ${p2} × {q2} = ${freeResult.tr2}
                </div>
                <div className="text-stone-800 dark:text-stone-200 font-bold">
                  ΔTR = ${freeResult.tr2} - ${freeResult.tr1} = {freeResult.deltaTR >= 0 ? `+$${freeResult.deltaTR}` : `-$${Math.abs(freeResult.deltaTR)}`}{' '}
                  <span className="font-normal">
                    ({freeResult.deltaTR > 0 ? 'TR Increased' : freeResult.deltaTR < 0 ? 'TR Decreased' : 'TR Unchanged'})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Challenge Drill Mode */
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-sm space-y-6">
          {/* Question Banner */}
          <div className="p-4 bg-stone-50 dark:bg-stone-850 rounded-xl border border-stone-200 dark:border-stone-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                {`Challenge Scenario #${currentChallenge.id}`}
              </span>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                {currentChallenge.titleEn}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                {currentChallenge.descEn}
              </p>
            </div>

            <button
              onClick={nextChallenge}
              className="px-3 py-1.5 text-xs font-semibold bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 text-stone-800 dark:text-stone-200 rounded-lg flex items-center gap-1.5 transition-colors self-start md:self-auto cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Next Problem
            </button>
          </div>

          {/* Student Answer Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                1. %ΔP (Price %):
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 33.3"
                value={userDeltaP}
                onChange={(e) => setUserDeltaP(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                2. %ΔQ (Quantity %):
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 19.8"
                value={userDeltaQ}
                onChange={(e) => setUserDeltaQ(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                3. Arc |Ed| Value:
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="e.g. 0.59"
                value={userEd}
                onChange={(e) => setUserEd(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                4. Category:
              </label>
              <select
                value={userCategory}
                onChange={(e) => setUserCategory(e.target.value)}
                className="w-full px-2 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg font-semibold"
              >
                <option value="">-- Select --</option>
                <option value="elastic">Elastic (&gt;1)</option>
                <option value="inelastic">Inelastic (&lt;1)</option>
                <option value="unitary">Unitary (=1)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                5. Total Revenue (TR):
              </label>
              <select
                value={userTRChange}
                onChange={(e) => setUserTRChange(e.target.value)}
                className="w-full px-2 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg font-semibold"
              >
                <option value="">-- Select --</option>
                <option value="increase">TR Increases ↑</option>
                <option value="decrease">TR Decreases ↓</option>
                <option value="unchanged">TR Unchanged</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleCheckChallenge}
              className="px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              Submit &amp; Grade Answer
            </button>
          </div>

          {/* Feedback & Score Breakdown */}
          {feedback && (
            <div className={`p-4 rounded-xl border space-y-3 ${
              feedback.score === feedback.maxScore
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
                : 'bg-stone-50 dark:bg-stone-850 border-stone-200 dark:border-stone-700'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  {feedback.score === feedback.maxScore ? (
                    <Award className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                  )}
                  Grading Result: {feedback.score} / {feedback.maxScore} Marks
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white dark:bg-stone-900 border text-stone-700 dark:text-stone-300">
                  {feedback.score === feedback.maxScore
                    ? 'Full Marks! Excellent!'
                    : 'Review feedback below'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 text-xs">
                {feedback.details.map((d, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded-lg border ${
                      d.correct
                        ? 'bg-emerald-100/60 dark:bg-emerald-900/30 border-emerald-300 text-emerald-900 dark:text-emerald-200'
                        : 'bg-red-50 dark:bg-red-950/40 border-red-200 text-red-900 dark:text-red-200'
                    }`}
                  >
                    <div className="font-semibold truncate">{d.name}</div>
                    <div className="text-[11px] mt-1">
                      {d.correct ? (
                        <span>✓ Correct: {d.expected}</span>
                      ) : (
                        <span>
                          ✗ Your: {d.user} <br />
                          <strong>Expected: {d.expected}</strong>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
