import React, { useState } from 'react';
import { calculateArcElasticity } from '../utils/elasticity';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Building2,
  Utensils,
  Flame,
  CheckCircle2
} from 'lucide-react';

export const TotalRevenueSimulator: React.FC = () => {
  // Elasticity demand modes:
  // 1. Inelastic (steep straight line): P = 24 - 0.32Q <=> Q = (24 - P) / 0.32
  // 2. Elastic (flatter straight line): P = 18 - 0.14Q <=> Q = (18 - P) / 0.14
  // 3. Unitary (hyperbolic curve): P * Q = 360  <=>  Q = 360 / P
  // 4. Perfect Inelastic (vertical line): Q = 40 constant
  // 5. Perfect Elastic (horizontal line): P = 10 constant
  const [demandMode, setDemandMode] = useState<'inelastic' | 'elastic' | 'unitary' | 'perfect_inelastic' | 'perfect_elastic'>('inelastic');
  const [direction, setDirection] = useState<'increase' | 'decrease'>('increase');
  const [priceLevel, setPriceLevel] = useState<number>(10);
  const [q1Horiz, setQ1Horiz] = useState<number>(30);
  const [q2Horiz, setQ2Horiz] = useState<number>(65);

  // Set preset real-life HK cases
  const applyPreset = (preset: 'mtr' | 'mcdonalds' | 'luxury' | 'cigarettes' | 'masks') => {
    if (preset === 'mtr') {
      // Inelastic demand, Price Increase
      setDemandMode('inelastic');
      setDirection('increase');
      setPriceLevel(10);
    } else if (preset === 'mcdonalds') {
      // Elastic demand, Price Decrease
      setDemandMode('elastic');
      setDirection('decrease');
      setPriceLevel(12);
    } else if (preset === 'luxury') {
      // Elastic demand, Price Increase
      setDemandMode('elastic');
      setDirection('increase');
      setPriceLevel(9);
    } else if (preset === 'cigarettes') {
      // Inelastic demand, Price Increase (Tobacco tax)
      setDemandMode('inelastic');
      setDirection('increase');
      setPriceLevel(8);
    } else if (preset === 'masks') {
      // Inelastic demand, Price Decrease
      setDemandMode('inelastic');
      setDirection('decrease');
      setPriceLevel(14);
    }
  };

  // Determine delta price amount based on elasticity mode
  const deltaPriceAmount = demandMode === 'elastic' ? 3 : 4;
  let p1 = demandMode === 'perfect_elastic' ? 10 : (demandMode === 'elastic' ? Math.min(15, Math.max(5, priceLevel)) : priceLevel);
  let p2 = demandMode === 'perfect_elastic' 
    ? 10 
    : (direction === 'increase' 
        ? (demandMode === 'elastic' ? Math.min(17, p1 + deltaPriceAmount) : Math.min(23, p1 + deltaPriceAmount))
        : (demandMode === 'elastic' ? Math.max(4, p1 - deltaPriceAmount) : Math.max(2, p1 - deltaPriceAmount))
      );

  const getQ = (p: number) => {
    if (demandMode === 'perfect_inelastic') {
      return 40; // Fixed vertical line Q=40
    }
    if (demandMode === 'perfect_elastic') {
      return 50;
    }
    if (demandMode === 'inelastic') {
      // Steep demand curve: P = 24 - 0.32Q <=> Q = (24 - P) / 0.32
      return (24 - p) / 0.32;
    } else if (demandMode === 'elastic') {
      // Flatter demand curve: P = 18 - 0.14Q <=> Q = (18 - P) / 0.14
      return (18 - p) / 0.14;
    } else {
      // Unitary hyperbola P * Q = 360
      return Math.min(100, 360 / Math.max(1, p));
    }
  };

  const isHorizontal = demandMode === 'perfect_elastic';
  const q1 = isHorizontal ? q1Horiz : getQ(p1);
  const q2 = isHorizontal ? q2Horiz : getQ(p2);

  const arcData = calculateArcElasticity(p1, p2, q1, q2, true);

  // SVG coordinate transformation
  // Domain: Q: 0 to 110, P: 0 to 25
  const svgWidth = 500;
  const svgHeight = 360;
  const pad = { top: 30, right: 30, bottom: 45, left: 60 };
  const plotW = svgWidth - pad.left - pad.right;
  const plotH = svgHeight - pad.top - pad.bottom;

  const toSvgX = (qVal: number) => pad.left + (qVal / 110) * plotW;
  const toSvgY = (pVal: number) => svgHeight - pad.bottom - (pVal / 25) * plotH;

  // Box coordinates
  const originX = toSvgX(0);
  const originY = toSvgY(0);

  const p1Y = toSvgY(p1);
  const q1X = toSvgX(q1);

  const p2Y = toSvgY(p2);
  const q2X = toSvgX(q2);

  const isPriceRising = p2 > p1;

  // Generate SVG curve path for hyperbola or non-linear curves
  const generateCurvePath = (getQFn: (p: number) => number, minP: number, maxP: number, steps = 60) => {
    const pts: { x: number; y: number }[] = [];
    const stepSize = (maxP - minP) / steps;
    for (let i = 0; i <= steps; i++) {
      const p = minP + i * stepSize;
      const q = getQFn(p);
      pts.push({ x: toSvgX(q), y: toSvgY(p) });
    }
    return pts.reduce((acc, pt, idx) => {
      return idx === 0 ? `M ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}` : `${acc} L ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`;
    }, '');
  };

  return (
    <div className="space-y-6" id="total-revenue-section">
      {/* Overview Banner */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                Core HKDSE Examination Focus
              </span>
              <span className="text-xs text-stone-500 font-mono">
                Total Revenue (TR) = Price (P) × Quantity (Q)
              </span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
              Price Elasticity &amp; Total Revenue of Sellers
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
              Discover how price changes along the <strong>SAME demand curve</strong> affect sellers' total revenue (TR = Consumer Total Expenditure) through Gain Area vs Loss Area geometric analysis.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-stone-500">
              HK Scenarios:
            </span>
            <button
              onClick={() => applyPreset('mtr')}
              className="px-2.5 py-1 text-xs font-medium bg-stone-100 hover:bg-emerald-100 dark:bg-stone-800 dark:hover:bg-emerald-950 text-stone-700 dark:text-stone-300 rounded-md border border-stone-200 dark:border-stone-700 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5 text-emerald-600" />
              MTR Fare Hike (Inelastic)
            </button>
            <button
              onClick={() => applyPreset('mcdonalds')}
              className="px-2.5 py-1 text-xs font-medium bg-stone-100 hover:bg-amber-100 dark:bg-stone-800 dark:hover:bg-amber-950 text-stone-700 dark:text-stone-300 rounded-md border border-stone-200 dark:border-stone-700 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Utensils className="w-3.5 h-3.5 text-amber-600" />
              Fast Food Promo (Elastic)
            </button>
            <button
              onClick={() => applyPreset('cigarettes')}
              className="px-2.5 py-1 text-xs font-medium bg-stone-100 hover:bg-red-100 dark:bg-stone-800 dark:hover:bg-red-950 text-stone-700 dark:text-stone-300 rounded-md border border-stone-200 dark:border-stone-700 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 text-red-600" />
              Tobacco Tax (Inelastic)
            </button>
          </div>
        </div>
      </div>

      {/* Control Bar: Elasticity Type & Price Movement */}
      <div className="bg-stone-50 dark:bg-stone-850 p-4 rounded-xl border border-stone-200 dark:border-stone-800 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Elasticity Category Selection */}
        <div>
          <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
            1. Demand Curve Shape &amp; Elasticity:
          </label>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            <button
              onClick={() => setDemandMode('inelastic')}
              className={`py-1.5 px-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                demandMode === 'inelastic'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
              }`}
            >
              Inelastic (Steep)
            </button>
            <button
              onClick={() => setDemandMode('elastic')}
              className={`py-1.5 px-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                demandMode === 'elastic'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
              }`}
            >
              Elastic (Flat)
            </button>
            <button
              onClick={() => setDemandMode('unitary')}
              className={`py-1.5 px-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                demandMode === 'unitary'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
              }`}
            >
              Unitary Curve
            </button>
            <button
              onClick={() => setDemandMode('perfect_inelastic')}
              className={`py-1.5 px-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                demandMode === 'perfect_inelastic'
                  ? 'bg-red-600 text-white border-red-600 shadow-sm'
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
              }`}
            >
              Vertical (Ed=0)
            </button>
            <button
              onClick={() => setDemandMode('perfect_elastic')}
              className={`py-1.5 px-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                demandMode === 'perfect_elastic'
                  ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
              }`}
            >
              Horizontal (Ed=∞)
            </button>
          </div>
        </div>

        {/* Direction Selection */}
        <div>
          <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
            2. Price Movement Direction:
          </label>
          {!isHorizontal ? (
            <div className="flex gap-1.5">
              <button
                onClick={() => setDirection('increase')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  direction === 'increase'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                }`}
              >
                <ArrowUpRight className="w-4 h-4" />
                Price Increase (P₁ → P₂ ↑)
              </button>
              <button
                onClick={() => setDirection('decrease')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  direction === 'decrease'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                    : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                }`}
              >
                <ArrowDownRight className="w-4 h-4" />
                Price Cut (P₁ → P₂ ↓)
              </button>
            </div>
          ) : (
            <div className="p-2 text-xs bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300">
              On a horizontal demand curve, price is fixed at $10. Adjust quantity sold below.
            </div>
          )}
        </div>

        {/* Base Price Slider or Horizontal Quantity Slider */}
        <div>
          {!isHorizontal ? (
            <>
              <div className="flex justify-between items-center text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                <span>3. Initial Price (P₁):</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">${priceLevel}</span>
              </div>
              <input
                type="range"
                min="4"
                max="18"
                step="1"
                value={priceLevel}
                onChange={(e) => setPriceLevel(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                <span>$4</span>
                <span>$11</span>
                <span>$18</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                <span>3. Quantities Sold (Q₁ → Q₂):</span>
                <span className="font-mono text-purple-600 dark:text-purple-400 font-bold">{q1Horiz} → {q2Horiz} units</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="range"
                  min="10"
                  max="90"
                  step="5"
                  value={q1Horiz}
                  onChange={(e) => setQ1Horiz(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <input
                  type="range"
                  min="10"
                  max="90"
                  step="5"
                  value={q2Horiz}
                  onChange={(e) => setQ2Horiz(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
              </div>
              <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                <span>Q₁={q1Horiz} units</span>
                <span>Q₂={q2Horiz} units</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Grid: Visual Box Graph + Area Breakdown & Rule Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: Interactive SVG with Gain & Loss Areas */}
        <div className="lg:col-span-7 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800 mb-3">
            <h3 className="font-bold text-stone-800 dark:text-stone-200 text-base flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              Total Revenue (P × Q) Area Diagram
            </h3>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                <span className="w-3 h-3 bg-emerald-500/30 border border-emerald-600 rounded-sm inline-block"></span>
                Gain Area
              </span>
              <span className="flex items-center gap-1 text-red-600 dark:text-red-400">
                <span className="w-3 h-3 bg-red-500/30 border border-red-600 rounded-sm inline-block"></span>
                Loss Area
              </span>
            </div>
          </div>

          {/* Guaranteed Same Curve Verification Banner */}
          <div className="mb-3 px-3 py-1.5 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-lg flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-200">
            <span className="flex items-center gap-1.5 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              Movement Along Curve: Point A (P₁, Q₁) and Point B (P₂, Q₂) are strictly on the SAME demand curve
            </span>
            <span className="font-mono text-[11px] font-bold px-2 py-0.5 bg-white dark:bg-stone-900 rounded border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300">
              {demandMode === 'inelastic' && 'P = 24 - 0.32Q (Steep)'}
              {demandMode === 'elastic' && 'P = 18 - 0.14Q (Flat)'}
              {demandMode === 'unitary' && 'P × Q = 360 (Hyperbola)'}
              {demandMode === 'perfect_inelastic' && 'Q = 40 (Vertical)'}
              {demandMode === 'perfect_elastic' && 'P = $10.00 (Horizontal)'}
            </span>
          </div>

          {/* SVG Canvas with Shaded Rectangles */}
          <div className="relative w-full aspect-[500/360] bg-stone-50/50 dark:bg-stone-950/50 rounded-lg p-1 border border-stone-100 dark:border-stone-850 flex items-center justify-center">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-full select-none"
            >
              <defs>
                {/* Diagonal Stripe Patterns for Revenue Areas */}
                <pattern id="pattern-gain" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="6" stroke="#10b981" strokeWidth="2" strokeOpacity="0.7" />
                </pattern>
                <pattern id="pattern-loss" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
                  <line x1="0" y1="0" x2="0" y2="6" stroke="#ef4444" strokeWidth="2" strokeOpacity="0.7" />
                </pattern>
                <marker id="tr-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#78716c" />
                </marker>
              </defs>

              {/* Axes */}
              <line x1={pad.left} y1={originY} x2={pad.left} y2={pad.top - 15} stroke="#57534e" strokeWidth="2" markerEnd="url(#tr-arrow)" />
              <text x={pad.left - 12} y={pad.top - 12} className="text-xs font-bold fill-stone-700 dark:fill-stone-300" textAnchor="end">
                Price (P) ($)
              </text>

              <line x1={pad.left} y1={originY} x2={svgWidth - pad.right + 15} y2={originY} stroke="#57534e" strokeWidth="2" markerEnd="url(#tr-arrow)" />
              <text x={svgWidth - pad.right + 20} y={originY + 4} className="text-xs font-bold fill-stone-700 dark:fill-stone-300" textAnchor="start">
                Quantity (Q)
              </text>
              <text x={pad.left - 8} y={originY + 14} className="text-xs font-semibold fill-stone-500" textAnchor="end">
                0
              </text>

              {/* Shaded Areas */}
              {demandMode === 'perfect_inelastic' ? (
                <>
                  {/* Vertical Demand: Q is fixed at 40. P changes from P1 to P2 */}
                  {isPriceRising ? (
                    <>
                      {/* Original TR1: rectangle [0, 40] from 0 to P1 */}
                      <rect
                        x={originX}
                        y={p1Y}
                        width={toSvgX(40) - originX}
                        height={originY - p1Y}
                        fill="#e7e5e4"
                        fillOpacity="0.5"
                        stroke="#a8a29e"
                        strokeDasharray="2 2"
                      />
                      {/* Gain Area: from P1 to P2 over 0 to 40 */}
                      <rect
                        x={originX}
                        y={p2Y}
                        width={toSvgX(40) - originX}
                        height={p1Y - p2Y}
                        fill="#10b981"
                        fillOpacity="0.25"
                        stroke="#059669"
                        strokeWidth="1.5"
                      />
                      <rect
                        x={originX}
                        y={p2Y}
                        width={toSvgX(40) - originX}
                        height={p1Y - p2Y}
                        fill="url(#pattern-gain)"
                      />
                      <text
                        x={originX + (toSvgX(40) - originX) / 2}
                        y={p2Y + (p1Y - p2Y) / 2 + 4}
                        className="text-xs font-extrabold fill-emerald-800 dark:fill-emerald-300"
                        textAnchor="middle"
                      >
                        + Gain (+${(p2 - p1) * 40}) (Loss = $0)
                      </text>
                    </>
                  ) : (
                    <>
                      {/* Price falling: Loss Area from P2 to P1 over 0 to 40 */}
                      <rect
                        x={originX}
                        y={p1Y}
                        width={toSvgX(40) - originX}
                        height={p2Y - p1Y}
                        fill="#ef4444"
                        fillOpacity="0.25"
                        stroke="#dc2626"
                        strokeWidth="1.5"
                      />
                      <rect
                        x={originX}
                        y={p1Y}
                        width={toSvgX(40) - originX}
                        height={p2Y - p1Y}
                        fill="url(#pattern-loss)"
                      />
                      <text
                        x={originX + (toSvgX(40) - originX) / 2}
                        y={p1Y + (p2Y - p1Y) / 2 + 4}
                        className="text-xs font-extrabold fill-red-800 dark:fill-red-300"
                        textAnchor="middle"
                      >
                        - Loss (-${(p1 - p2) * 40}) (Gain = $0)
                      </text>
                    </>
                  )}
                </>
              ) : isHorizontal ? (
                <>
                  {/* Horizontal Demand: P=10. Q changes from Q1 to Q2 */}
                  {q2 > q1 ? (
                    <>
                      <rect
                        x={originX}
                        y={toSvgY(10)}
                        width={toSvgX(q1) - originX}
                        height={originY - toSvgY(10)}
                        fill="#e7e5e4"
                        fillOpacity="0.5"
                        stroke="#a8a29e"
                        strokeDasharray="2 2"
                      />
                      {/* Gain Area over Q1 to Q2 */}
                      <rect
                        x={toSvgX(q1)}
                        y={toSvgY(10)}
                        width={toSvgX(q2) - toSvgX(q1)}
                        height={originY - toSvgY(10)}
                        fill="#10b981"
                        fillOpacity="0.25"
                        stroke="#059669"
                        strokeWidth="1.5"
                      />
                      <rect
                        x={toSvgX(q1)}
                        y={toSvgY(10)}
                        width={toSvgX(q2) - toSvgX(q1)}
                        height={originY - toSvgY(10)}
                        fill="url(#pattern-gain)"
                      />
                      <text
                        x={toSvgX(q1) + (toSvgX(q2) - toSvgX(q1)) / 2}
                        y={toSvgY(10) + (originY - toSvgY(10)) / 2 + 4}
                        className="text-xs font-extrabold fill-emerald-800 dark:fill-emerald-300"
                        textAnchor="middle"
                      >
                        + Gain (+${10 * (q2 - q1)})
                      </text>
                    </>
                  ) : (
                    <>
                      {/* Q2 < Q1 Loss Area */}
                      <rect
                        x={toSvgX(q2)}
                        y={toSvgY(10)}
                        width={toSvgX(q1) - toSvgX(q2)}
                        height={originY - toSvgY(10)}
                        fill="#ef4444"
                        fillOpacity="0.25"
                        stroke="#dc2626"
                        strokeWidth="1.5"
                      />
                      <rect
                        x={toSvgX(q2)}
                        y={toSvgY(10)}
                        width={toSvgX(q1) - toSvgX(q2)}
                        height={originY - toSvgY(10)}
                        fill="url(#pattern-loss)"
                      />
                      <text
                        x={toSvgX(q2) + (toSvgX(q1) - toSvgX(q2)) / 2}
                        y={toSvgY(10) + (originY - toSvgY(10)) / 2 + 4}
                        className="text-xs font-extrabold fill-red-800 dark:fill-red-300"
                        textAnchor="middle"
                      >
                        - Loss (-${10 * (q1 - q2)})
                      </text>
                    </>
                  )}
                </>
              ) : isPriceRising ? (
                <>
                  {/* Common Overlap Area */}
                  <rect
                    x={originX}
                    y={p1Y}
                    width={toSvgX(q2) - originX}
                    height={originY - p1Y}
                    fill="#e7e5e4"
                    fillOpacity="0.5"
                    stroke="#a8a29e"
                    strokeDasharray="2 2"
                  />
                  {/* Gain Area: from P1 to P2 over 0 to Q2 */}
                  <rect
                    x={originX}
                    y={p2Y}
                    width={toSvgX(q2) - originX}
                    height={p1Y - p2Y}
                    fill="#10b981"
                    fillOpacity="0.25"
                    stroke="#059669"
                    strokeWidth="1.5"
                  />
                  <rect
                    x={originX}
                    y={p2Y}
                    width={toSvgX(q2) - originX}
                    height={p1Y - p2Y}
                    fill="url(#pattern-gain)"
                  />
                  <text
                    x={originX + (toSvgX(q2) - originX) / 2}
                    y={p2Y + (p1Y - p2Y) / 2 + 4}
                    className="text-xs font-extrabold fill-emerald-800 dark:fill-emerald-300"
                    textAnchor="middle"
                  >
                    + Gain (+${(p2 - p1) * Number(q2.toFixed(0))})
                  </text>

                  {/* Loss Area: from 0 to P1 over Q2 to Q1 */}
                  <rect
                    x={toSvgX(q2)}
                    y={p1Y}
                    width={toSvgX(q1) - toSvgX(q2)}
                    height={originY - p1Y}
                    fill="#ef4444"
                    fillOpacity="0.25"
                    stroke="#dc2626"
                    strokeWidth="1.5"
                  />
                  <rect
                    x={toSvgX(q2)}
                    y={p1Y}
                    width={toSvgX(q1) - toSvgX(q2)}
                    height={originY - p1Y}
                    fill="url(#pattern-loss)"
                  />
                  <text
                    x={toSvgX(q2) + (toSvgX(q1) - toSvgX(q2)) / 2}
                    y={p1Y + (originY - p1Y) / 2 + 4}
                    className="text-xs font-extrabold fill-red-800 dark:fill-red-300"
                    textAnchor="middle"
                  >
                    - Loss (-${p1 * Math.abs(Number(q1.toFixed(0)) - Number(q2.toFixed(0)))})
                  </text>
                </>
              ) : (
                <>
                  {/* Price falling: P2 < P1, Q2 > Q1 */}
                  {/* Common Overlap Area */}
                  <rect
                    x={originX}
                    y={p2Y}
                    width={toSvgX(q1) - originX}
                    height={originY - p2Y}
                    fill="#e7e5e4"
                    fillOpacity="0.5"
                    stroke="#a8a29e"
                    strokeDasharray="2 2"
                  />
                  {/* Loss Area from price cut: from P2 to P1 over 0 to Q1 */}
                  <rect
                    x={originX}
                    y={p1Y}
                    width={toSvgX(q1) - originX}
                    height={p2Y - p1Y}
                    fill="#ef4444"
                    fillOpacity="0.25"
                    stroke="#dc2626"
                    strokeWidth="1.5"
                  />
                  <rect
                    x={originX}
                    y={p1Y}
                    width={toSvgX(q1) - originX}
                    height={p2Y - p1Y}
                    fill="url(#pattern-loss)"
                  />
                  <text
                    x={originX + (toSvgX(q1) - originX) / 2}
                    y={p1Y + (p2Y - p1Y) / 2 + 4}
                    className="text-xs font-extrabold fill-red-800 dark:fill-red-300"
                    textAnchor="middle"
                  >
                    - Loss (-${(p1 - p2) * Number(q1.toFixed(0))})
                  </text>

                  {/* Gain Area from quantity expansion: from 0 to P2 over Q1 to Q2 */}
                  <rect
                    x={toSvgX(q1)}
                    y={p2Y}
                    width={toSvgX(q2) - toSvgX(q1)}
                    height={originY - p2Y}
                    fill="#10b981"
                    fillOpacity="0.25"
                    stroke="#059669"
                    strokeWidth="1.5"
                  />
                  <rect
                    x={toSvgX(q1)}
                    y={p2Y}
                    width={toSvgX(q2) - toSvgX(q1)}
                    height={originY - p2Y}
                    fill="url(#pattern-gain)"
                  />
                  <text
                    x={toSvgX(q1) + (toSvgX(q2) - toSvgX(q1)) / 2}
                    y={p2Y + (originY - p2Y) / 2 + 4}
                    className="text-xs font-extrabold fill-emerald-800 dark:fill-emerald-300"
                    textAnchor="middle"
                  >
                    + Gain (+${p2 * Math.abs(Number(q2.toFixed(0)) - Number(q1.toFixed(0)))})
                  </text>
                </>
              )}

              {/* Demand Curves (Rendered precisely for each type) */}
              {demandMode === 'perfect_inelastic' && (
                <>
                  <line
                    x1={toSvgX(40)}
                    y1={toSvgY(23)}
                    x2={toSvgX(40)}
                    y2={toSvgY(0)}
                    stroke="#dc2626"
                    strokeWidth="3.5"
                  />
                  <text x={toSvgX(40)} y={pad.top - 5} className="text-xs font-bold fill-red-600 text-center" textAnchor="middle">
                    D (Vertical Line)
                  </text>
                </>
              )}

              {demandMode === 'perfect_elastic' && (
                <>
                  <line
                    x1={toSvgX(0)}
                    y1={toSvgY(10)}
                    x2={toSvgX(100)}
                    y2={toSvgY(10)}
                    stroke="#9333ea"
                    strokeWidth="3.5"
                  />
                  <text x={toSvgX(95)} y={toSvgY(10) - 8} className="text-xs font-bold fill-purple-600">
                    D (Horizontal Line)
                  </text>
                </>
              )}

              {demandMode === 'unitary' && (
                <>
                  <path
                    d={generateCurvePath((p) => getQ(p), 3.8, 23)}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <text x={toSvgX(getQ(4)) + 8} y={toSvgY(4)} className="text-xs font-bold fill-emerald-600">
                    D (Rectangular Hyperbola)
                  </text>
                </>
              )}

              {demandMode === 'inelastic' && (
                <>
                  <line
                    x1={toSvgX(getQ(23.5))}
                    y1={toSvgY(23.5)}
                    x2={toSvgX(getQ(2))}
                    y2={toSvgY(2)}
                    stroke="#4f46e5"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <text x={toSvgX(getQ(2)) + 8} y={toSvgY(2) + 4} className="text-sm font-black fill-indigo-700 dark:fill-indigo-400">
                    D (Steep Inelastic)
                  </text>
                </>
              )}

              {demandMode === 'elastic' && (
                <>
                  <line
                    x1={toSvgX(getQ(18))}
                    y1={toSvgY(18)}
                    x2={toSvgX(getQ(3.3))}
                    y2={toSvgY(3.3)}
                    stroke="#d97706"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <text x={toSvgX(getQ(3.3)) + 8} y={toSvgY(3.3) + 4} className="text-sm font-black fill-amber-700 dark:fill-amber-400">
                    D (Flat Elastic)
                  </text>
                </>
              )}

              {/* Point A Dot & Label */}
              <circle cx={q1X} cy={p1Y} r="6" fill="#059669" />
              <text x={q1X + 8} y={p1Y - 6} className="text-xs font-black fill-emerald-800 dark:fill-emerald-300">
                A (P₁=${p1}, Q₁={q1.toFixed(0)})
              </text>
              <text x={pad.left - 8} y={p1Y + 4} className="text-[11px] font-bold fill-emerald-700" textAnchor="end">
                P₁=${p1}
              </text>
              <text x={q1X} y={originY + 16} className="text-[11px] font-bold fill-emerald-700" textAnchor="middle">
                Q₁={q1.toFixed(0)}
              </text>

              {/* Point B Dot & Label */}
              <circle cx={q2X} cy={p2Y} r="6" fill="#ea580c" />
              <text x={q2X + 8} y={p2Y - 6} className="text-xs font-black fill-orange-800 dark:fill-orange-400">
                B (P₂=${p2}, Q₂={q2.toFixed(0)})
              </text>
              <text x={pad.left - 8} y={p2Y + 4} className="text-[11px] font-bold fill-orange-700" textAnchor="end">
                P₂=${p2}
              </text>
              <text x={q2X} y={originY + 16} className="text-[11px] font-bold fill-orange-700" textAnchor="middle">
                Q₂={q2.toFixed(0)}
              </text>
            </svg>
          </div>

          {/* Area Comparison Summary Banner */}
          <div className="mt-3 p-3 bg-stone-100 dark:bg-stone-800 rounded-lg flex flex-wrap items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-stone-500 font-sans">Initial TR₁:</span>
              <span className="font-bold text-stone-800 dark:text-stone-200">${arcData.tr1}</span>
              <span className="text-stone-400">→</span>
              <span className="text-stone-500 font-sans">New TR₂:</span>
              <span className="font-bold text-stone-800 dark:text-stone-200">${arcData.tr2}</span>
            </div>
            <div className={`font-bold font-sans flex items-center gap-1 ${
              arcData.deltaTR > 0 
                ? 'text-emerald-700 dark:text-emerald-400' 
                : arcData.deltaTR < 0 
                ? 'text-red-700 dark:text-red-400' 
                : 'text-stone-600 dark:text-stone-300'
            }`}>
              {arcData.deltaTR > 0 ? (
                <>
                  <TrendingUp className="w-4 h-4" />
                  TR Increases (+${arcData.deltaTR}) (Gain &gt; Loss)
                </>
              ) : arcData.deltaTR < 0 ? (
                <>
                  <TrendingDown className="w-4 h-4" />
                  TR Decreases (${arcData.deltaTR}) (Loss &gt; Gain)
                </>
              ) : (
                <>TR Remains Unchanged (Gain = Loss)</>
              )}
            </div>
          </div>
        </div>

        {/* Right 5 cols: HKDSE Total Revenue Rules Matrix & Case Explanation */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Case Analysis Card */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                Active Case Analysis
              </h4>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                |Ed| ≈ {arcData.elasticity > 999 ? '∞' : arcData.elasticity.toFixed(2)}
              </span>
            </div>

            <div className="p-3.5 bg-stone-50 dark:bg-stone-950 rounded-lg border border-stone-200 dark:border-stone-800 space-y-2 text-xs leading-relaxed">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                <div>
                  <strong>1. Price &amp; Quantity Movements:</strong>{' '}
                  {demandMode === 'perfect_inelastic'
                    ? `Price changes from $${p1} to $${p2} while quantity demanded stays fixed at 40 units (%ΔQd = 0).`
                    : isHorizontal
                    ? `Price is fixed at $10. Quantity sold changes from ${q1} to ${q2} units.`
                    : isPriceRising
                    ? `Price increases from $${p1} to $${p2} (+${Math.abs(arcData.percentDeltaP).toFixed(1)}%). Quantity demanded falls from ${q1.toFixed(0)} to ${q2.toFixed(0)} (-${Math.abs(arcData.percentDeltaQ).toFixed(1)}%).`
                    : `Price decreases from $${p1} to $${p2} (-${Math.abs(arcData.percentDeltaP).toFixed(1)}%). Quantity demanded increases from ${q1.toFixed(0)} to ${q2.toFixed(0)} (+${Math.abs(arcData.percentDeltaQ).toFixed(1)}%).`}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <div>
                  <strong>2. Percentage Comparison:</strong>{' '}
                  {demandMode === 'elastic'
                    ? '%ΔQd > %ΔP. Demand is ELASTIC. The quantity response dominates the price change.'
                    : demandMode === 'inelastic'
                    ? '%ΔP > %ΔQd. Demand is INELASTIC. The price change dominates the quantity response.'
                    : demandMode === 'perfect_inelastic'
                    ? '%ΔQd = 0. Demand is PERFECTLY INELASTIC. Quantity does not change at all.'
                    : isHorizontal
                    ? '%ΔP = 0. Demand is PERFECTLY ELASTIC. Price is constant.'
                    : '%ΔP = %ΔQd. Demand is UNITARILY ELASTIC. Price and quantity offset each other completely.'}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                <div>
                  <strong>3. Net Total Revenue Verdict:</strong>{' '}
                  {arcData.deltaTR > 0 ? (
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                      Gain in Revenue &gt; Loss in Revenue ⟹ Total Revenue INCREASES from ${arcData.tr1} to ${arcData.tr2}.
                    </span>
                  ) : arcData.deltaTR < 0 ? (
                    <span className="text-red-700 dark:text-red-400 font-bold">
                      Loss in Revenue &gt; Gain in Revenue ⟹ Total Revenue DECREASES from ${arcData.tr1} to ${arcData.tr2}.
                    </span>
                  ) : (
                    <span className="text-stone-700 dark:text-stone-300 font-bold">
                      Gain Area = Loss Area ⟹ Total Revenue REMAINS UNCHANGED at ${arcData.tr1}.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Master HKDSE Rule Matrix Table */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden shadow-sm">
            <div className="p-3 bg-stone-100 dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 font-bold text-xs text-stone-800 dark:text-stone-200">
              HKDSE Master Rule: Elasticity &amp; Total Revenue
            </div>
            <table className="w-full text-[11px] text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 dark:bg-stone-950/80 text-stone-600 dark:text-stone-400 border-b border-stone-200 dark:border-stone-800">
                  <th className="p-2.5 font-semibold">Elasticity (Ed)</th>
                  <th className="p-2.5 font-semibold text-emerald-700 dark:text-emerald-400">Price Rise (P ↑)</th>
                  <th className="p-2.5 font-semibold text-rose-700 dark:text-rose-400">Price Cut (P ↓)</th>
                  <th className="p-2.5 font-semibold">Exam Examples</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                <tr className={demandMode === 'elastic' ? 'bg-amber-50/60 dark:bg-amber-950/30 font-semibold' : ''}>
                  <td className="p-2.5 font-bold text-amber-800 dark:text-amber-300">
                    Elastic (|Ed| &gt; 1)
                  </td>
                  <td className="p-2.5 text-red-600 dark:text-red-400 font-bold">
                    TR ↓ (Decreases)
                  </td>
                  <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">
                    TR ↑ (Increases)
                  </td>
                  <td className="p-2.5 text-stone-500">
                    McDonald’s $10/2, Luxury goods
                  </td>
                </tr>

                <tr className={demandMode === 'inelastic' ? 'bg-indigo-50/60 dark:bg-indigo-950/30 font-semibold' : ''}>
                  <td className="p-2.5 font-bold text-indigo-800 dark:text-indigo-300">
                    Inelastic (|Ed| &lt; 1)
                  </td>
                  <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">
                    TR ↑ (Increases)
                  </td>
                  <td className="p-2.5 text-red-600 dark:text-red-400 font-bold">
                    TR ↓ (Decreases)
                  </td>
                  <td className="p-2.5 text-stone-500">
                    MTR fare hike, Cigarette tax
                  </td>
                </tr>

                <tr className={demandMode === 'unitary' ? 'bg-emerald-50/60 dark:bg-emerald-950/30 font-semibold' : ''}>
                  <td className="p-2.5 font-bold text-emerald-800 dark:text-emerald-300">
                    Unitary (|Ed| = 1)
                  </td>
                  <td className="p-2.5 text-stone-700 dark:text-stone-300 font-bold">
                    TR Unchanged
                  </td>
                  <td className="p-2.5 text-stone-700 dark:text-stone-300 font-bold">
                    TR Unchanged
                  </td>
                  <td className="p-2.5 text-stone-500">
                    Fixed monthly budget (DSE 2012 Q11)
                  </td>
                </tr>

                <tr className={demandMode === 'perfect_inelastic' ? 'bg-red-50/60 dark:bg-red-950/30 font-semibold' : ''}>
                  <td className="p-2.5 font-bold text-red-800 dark:text-red-300">
                    Vertical (|Ed| = 0)
                  </td>
                  <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">
                    TR ↑ (100% gain)
                  </td>
                  <td className="p-2.5 text-red-600 dark:text-red-400 font-bold">
                    TR ↓ (100% loss)
                  </td>
                  <td className="p-2.5 text-stone-500">
                    Essential life-saving medicine
                  </td>
                </tr>

                <tr className={demandMode === 'perfect_elastic' ? 'bg-purple-50/60 dark:bg-purple-950/30 font-semibold' : ''}>
                  <td className="p-2.5 font-bold text-purple-800 dark:text-purple-300">
                    Horizontal (|Ed| = ∞)
                  </td>
                  <td className="p-2.5 text-red-600 dark:text-red-400 font-bold">
                    Q drops to 0 (TR=$0)
                  </td>
                  <td className="p-2.5 text-stone-500">
                    Market price fixed
                  </td>
                  <td className="p-2.5 text-stone-500">
                    Standard commodity in perfect competition
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
