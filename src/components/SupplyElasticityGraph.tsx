import React, { useState } from 'react';
import { calculateArcElasticity } from '../utils/elasticity';
import { 
  TrendingUp, 
  Layers, 
  CheckCircle2
} from 'lucide-react';

export const SupplyElasticityGraph: React.FC = () => {
  // Supply intercept type:
  // 'vertical_intercept' (cuts P axis) => Es > 1 (Elastic)
  // 'origin' (passes through 0,0) => Es = 1 (Unitary)
  // 'horizontal_intercept' (cuts Q axis) => Es < 1 (Inelastic)
  // 'convex_curve' => non-linear supply curve Q = 0.3 * P^1.8
  // 'perfect_inelastic' => Es = 0 (Vertical line)
  // 'perfect_elastic' => Es = infinity (Horizontal line)
  const [supplyType, setSupplyType] = useState<'vertical_intercept' | 'origin' | 'horizontal_intercept' | 'convex_curve' | 'perfect_inelastic' | 'perfect_elastic'>('origin');
  const [p1, setP1] = useState<number>(8);
  const [p2, setP2] = useState<number>(14);
  const [q1Horiz, setQ1Horiz] = useState<number>(30);
  const [q2Horiz, setQ2Horiz] = useState<number>(70);
  const [showMultiCurves, setShowMultiCurves] = useState<boolean>(false);

  // Supply equations:
  // vertical_intercept: P = 4 + 0.15Q  <=>  Q = (P - 4)/0.15
  // origin: P = 0.2Q                  <=>  Q = P / 0.2
  // horizontal_intercept: P = -2 + 0.25Q <=> Q = (P + 2)/0.25
  // convex_curve: Q = 0.3 * P^1.75
  // perfect_inelastic: Q = 50 fixed
  // perfect_elastic: P = 10 fixed
  const getSupplyQ = (pVal: number) => {
    if (supplyType === 'perfect_inelastic') return 50;
    if (supplyType === 'perfect_elastic') return 50;
    if (supplyType === 'vertical_intercept') {
      return Math.max(0, (pVal - 4) / 0.15);
    }
    if (supplyType === 'origin') {
      return Math.max(0, pVal / 0.2);
    }
    if (supplyType === 'horizontal_intercept') {
      return Math.max(0, (pVal + 2) / 0.25);
    }
    if (supplyType === 'convex_curve') {
      return Math.max(0, Math.min(100, 0.35 * Math.pow(Math.max(0, pVal), 1.85)));
    }
    return pVal / 0.2;
  };

  const isHorizontal = supplyType === 'perfect_elastic';
  const actualP1 = isHorizontal ? 10 : p1;
  const actualP2 = isHorizontal ? 10 : p2;
  const q1 = isHorizontal ? q1Horiz : getSupplyQ(actualP1);
  const q2 = isHorizontal ? q2Horiz : getSupplyQ(actualP2);

  const arcResult = calculateArcElasticity(actualP1, actualP2, q1, q2, false);

  // SVG coordinate transformation
  const svgWidth = 520;
  const svgHeight = 360;
  const padding = { top: 30, right: 30, bottom: 45, left: 55 };
  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  const toSvgX = (qVal: number) => padding.left + (qVal / 100) * plotWidth;
  const toSvgY = (pVal: number) => svgHeight - padding.bottom - (pVal / 20) * plotHeight;

  // Generate smooth SVG path for non-linear supply curve
  const generateSupplyCurvePath = (getQFn: (p: number) => number, minP: number, maxP: number, steps = 50) => {
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
    <div className="space-y-6" id="supply-elasticity-section">
      {/* Header Banner */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300">
                HKDSE Compulsory Part C
              </span>
              <span className="text-xs text-stone-500 font-mono">
                Price Elasticity of Supply (Es) &amp; Intercept Rules
              </span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
              Price Elasticity of Supply (Es)
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
              Measures the degree of responsiveness of quantity supplied of a good to a change in its price (movement along the SAME supply curve). Learn the signature HKDSE Intercept Rule for straight-line supply curves.
            </p>
          </div>

            {/* Supply Type Selector */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-stone-100 dark:bg-stone-800/80 rounded-lg border border-stone-200 dark:border-stone-700 self-start">
              <button
                onClick={() => setSupplyType('vertical_intercept')}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  supplyType === 'vertical_intercept'
                    ? 'bg-white dark:bg-stone-900 text-purple-700 dark:text-purple-400 shadow-sm font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                Price-Intercept (Es &gt; 1)
              </button>
              <button
                onClick={() => setSupplyType('origin')}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  supplyType === 'origin'
                    ? 'bg-white dark:bg-stone-900 text-purple-700 dark:text-purple-400 shadow-sm font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                Passes Origin (Es = 1)
              </button>
              <button
                onClick={() => setSupplyType('horizontal_intercept')}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  supplyType === 'horizontal_intercept'
                    ? 'bg-white dark:bg-stone-900 text-purple-700 dark:text-purple-400 shadow-sm font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                Quantity-Intercept (Es &lt; 1)
              </button>
              <button
                onClick={() => setSupplyType('convex_curve')}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  supplyType === 'convex_curve'
                    ? 'bg-white dark:bg-stone-900 text-purple-700 dark:text-purple-400 shadow-sm font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                Curved Supply Curve
              </button>
              <button
                onClick={() => setSupplyType('perfect_inelastic')}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  supplyType === 'perfect_inelastic'
                    ? 'bg-white dark:bg-stone-900 text-purple-700 dark:text-purple-400 shadow-sm font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                Es = 0 (Vertical)
              </button>
              <button
                onClick={() => setSupplyType('perfect_elastic')}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  supplyType === 'perfect_elastic'
                    ? 'bg-white dark:bg-stone-900 text-purple-700 dark:text-purple-400 shadow-sm font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                Es = ∞ (Horizontal)
              </button>
            </div>
          </div>
        </div>

        {/* Verification Guarantee Banner */}
        <div className="bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-purple-900 dark:text-purple-200">
            <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
            <span>
              <strong>Guaranteed Same Curve Movement:</strong> Both Point A ($P_1, Q_1$) and Point B ($P_2, Q_2$) are strictly calculated along the exact same supply curve equation.
            </span>
          </div>
          <span className="font-mono text-purple-700 dark:text-purple-300 font-bold bg-white dark:bg-stone-900 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800">
            {supplyType === 'vertical_intercept' && 'P = 4 + 0.15Q'}
            {supplyType === 'origin' && 'P = 0.20Q'}
            {supplyType === 'horizontal_intercept' && 'P = -2 + 0.25Q'}
            {supplyType === 'convex_curve' && 'Q = 0.35 × P^1.85 (Curved)'}
            {supplyType === 'perfect_inelastic' && 'Q = 50 (Vertical)'}
            {supplyType === 'perfect_elastic' && 'P = $10.00 (Horizontal)'}
          </span>
        </div>

        {/* Main Grid: SVG Graph + Master Intercept Rules */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 7 cols: SVG Diagram */}
          <div className="lg:col-span-7 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-sm flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800 mb-3">
              <h3 className="font-bold text-stone-800 dark:text-stone-200 text-base flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Interactive Supply Curve Diagram (Movement Along Curve)
              </h3>

              <button
                onClick={() => setShowMultiCurves(!showMultiCurves)}
                className={`text-xs px-2.5 py-1 rounded-md font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
                  showMultiCurves
                    ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800'
                    : 'bg-stone-100 text-stone-600 border-stone-200 dark:bg-stone-800 dark:text-stone-400'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Compare Multi-Curves (S₁..S₅)
              </button>
            </div>

            {/* SVG Canvas */}
            <div className="relative w-full aspect-[520/360] bg-stone-50/50 dark:bg-stone-950/50 rounded-lg p-1 border border-stone-100 dark:border-stone-850 flex items-center justify-center">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-full select-none"
              >
                <defs>
                  <marker id="s-axis-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#78716c" />
                  </marker>
                  <marker id="s-move-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#9333ea" />
                  </marker>
                </defs>

                {/* Grid Lines */}
                <line x1={padding.left} y1={toSvgY(5)} x2={svgWidth - padding.right} y2={toSvgY(5)} stroke="#e7e5e4" strokeDasharray="3 3" />
                <line x1={padding.left} y1={toSvgY(10)} x2={svgWidth - padding.right} y2={toSvgY(10)} stroke="#e7e5e4" strokeDasharray="3 3" />
                <line x1={padding.left} y1={toSvgY(15)} x2={svgWidth - padding.right} y2={toSvgY(15)} stroke="#e7e5e4" strokeDasharray="3 3" />
                <line x1={toSvgX(25)} y1={padding.top} x2={toSvgX(25)} y2={svgHeight - padding.bottom} stroke="#e7e5e4" strokeDasharray="3 3" />
                <line x1={toSvgX(50)} y1={padding.top} x2={toSvgX(50)} y2={svgHeight - padding.bottom} stroke="#e7e5e4" strokeDasharray="3 3" />
                <line x1={toSvgX(75)} y1={padding.top} x2={toSvgX(75)} y2={svgHeight - padding.bottom} stroke="#e7e5e4" strokeDasharray="3 3" />

                {/* Axes */}
                <line x1={padding.left} y1={svgHeight - padding.bottom} x2={padding.left} y2={padding.top - 15} stroke="#57534e" strokeWidth="2" markerEnd="url(#s-axis-arrow)" />
                <text x={padding.left - 12} y={padding.top - 12} className="text-xs font-bold fill-stone-700 dark:fill-stone-300" textAnchor="end">
                  Price (P) ($)
                </text>

                <line x1={padding.left} y1={svgHeight - padding.bottom} x2={svgWidth - padding.right + 15} y2={svgHeight - padding.bottom} stroke="#57534e" strokeWidth="2" markerEnd="url(#s-axis-arrow)" />
                <text x={svgWidth - padding.right + 20} y={svgHeight - padding.bottom + 4} className="text-xs font-bold fill-stone-700 dark:fill-stone-300" textAnchor="start">
                  Quantity (Q)
                </text>
                <text x={padding.left - 8} y={svgHeight - padding.bottom + 15} className="text-xs font-semibold fill-stone-500" textAnchor="end">
                  0
                </text>

                {/* Multi-curves comparison mode (From HKDSE Syllabus) */}
                {showMultiCurves ? (
                  <>
                    {/* S1: Steep from vertical axis */}
                    <line x1={toSvgX(0)} y1={toSvgY(8)} x2={toSvgX(40)} y2={toSvgY(20)} stroke="#f59e0b" strokeWidth="2" />
                    <text x={toSvgX(40) + 4} y={toSvgY(20) - 2} className="text-[11px] font-bold fill-amber-700">S₁ (Es &gt; 1)</text>

                    {/* S2: Medium from vertical axis */}
                    <line x1={toSvgX(0)} y1={toSvgY(4)} x2={toSvgX(80)} y2={toSvgY(18)} stroke="#f59e0b" strokeWidth="2" />
                    <text x={toSvgX(80) + 4} y={toSvgY(18) - 2} className="text-[11px] font-bold fill-amber-700">S₂ (Es &gt; 1)</text>

                    {/* S3: Origin passing */}
                    <line x1={toSvgX(0)} y1={toSvgY(0)} x2={toSvgX(85)} y2={toSvgY(17)} stroke="#10b981" strokeWidth="3" />
                    <text x={toSvgX(85) + 4} y={toSvgY(17) - 2} className="text-[11px] font-black fill-emerald-700">S₃ (Origin, Es = 1)</text>

                    {/* S4: From Horizontal axis */}
                    <line x1={toSvgX(30)} y1={toSvgY(0)} x2={toSvgX(80)} y2={toSvgY(20)} stroke="#6366f1" strokeWidth="2" />
                    <text x={toSvgX(80) + 4} y={toSvgY(20) + 12} className="text-[11px] font-bold fill-indigo-700">S₄ (Es &lt; 1)</text>

                    {/* S5: From Horizontal axis */}
                    <line x1={toSvgX(55)} y1={toSvgY(0)} x2={toSvgX(95)} y2={toSvgY(15)} stroke="#6366f1" strokeWidth="2" />
                    <text x={toSvgX(95) + 4} y={toSvgY(15) + 8} className="text-[11px] font-bold fill-indigo-700">S₅ (Es &lt; 1)</text>
                  </>
                ) : (
                  <>
                    {/* Single Selected Supply Curve */}
                    {supplyType === 'vertical_intercept' && (
                      <>
                        <line x1={toSvgX(0)} y1={toSvgY(4)} x2={toSvgX(95)} y2={toSvgY(18.25)} stroke="#9333ea" strokeWidth="3.5" strokeLinecap="round" />
                        <circle cx={toSvgX(0)} cy={toSvgY(4)} r="4" fill="#f59e0b" />
                        <text x={toSvgX(0) + 8} y={toSvgY(4) + 4} className="text-[10px] font-bold fill-amber-700">
                          Price-Intercept ($4)
                        </text>
                        <text x={toSvgX(95) + 8} y={toSvgY(18.25)} className="text-sm font-black fill-purple-700 dark:fill-purple-400">
                          S (Elastic, Es &gt; 1)
                        </text>
                      </>
                    )}

                    {supplyType === 'origin' && (
                      <>
                        <line x1={toSvgX(0)} y1={toSvgY(0)} x2={toSvgX(95)} y2={toSvgY(19)} stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />
                        <circle cx={toSvgX(0)} cy={toSvgY(0)} r="5" fill="#10b981" />
                        <text x={toSvgX(0) + 8} y={toSvgY(0) - 8} className="text-[10px] font-black fill-emerald-700">
                          Origin (0,0)
                        </text>
                        <text x={toSvgX(95) + 8} y={toSvgY(19)} className="text-sm font-black fill-emerald-700 dark:fill-emerald-400">
                          S (Unitary, Es = 1)
                        </text>
                      </>
                    )}

                    {supplyType === 'horizontal_intercept' && (
                      <>
                        <line x1={toSvgX(8)} y1={toSvgY(0)} x2={toSvgX(80)} y2={toSvgY(18)} stroke="#6366f1" strokeWidth="3.5" strokeLinecap="round" />
                        <circle cx={toSvgX(8)} cy={toSvgY(0)} r="4" fill="#6366f1" />
                        <text x={toSvgX(8) + 4} y={toSvgY(0) - 6} className="text-[10px] font-bold fill-indigo-700">
                          Q-Intercept (8)
                        </text>
                        <text x={toSvgX(80) + 8} y={toSvgY(18)} className="text-sm font-black fill-indigo-700 dark:fill-indigo-400">
                          S (Inelastic, Es &lt; 1)
                        </text>
                      </>
                    )}

                    {supplyType === 'convex_curve' && (
                      <>
                        <path
                          d={generateSupplyCurvePath((p) => getSupplyQ(p), 0, 19)}
                          fill="none"
                          stroke="#9333ea"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                        <text x={toSvgX(85)} y={toSvgY(18)} className="text-sm font-black fill-purple-700 dark:fill-purple-400">
                          S (Curved Supply)
                        </text>
                      </>
                    )}

                    {supplyType === 'perfect_inelastic' && (
                      <>
                        <line x1={toSvgX(50)} y1={toSvgY(20)} x2={toSvgX(50)} y2={toSvgY(0)} stroke="#dc2626" strokeWidth="3.5" />
                        <text x={toSvgX(50)} y={padding.top - 5} className="text-xs font-bold fill-red-600 text-center" textAnchor="middle">
                          S (Perfect Inelastic, Es = 0)
                        </text>
                      </>
                    )}

                    {supplyType === 'perfect_elastic' && (
                      <>
                        <line x1={toSvgX(0)} y1={toSvgY(10)} x2={toSvgX(100)} y2={toSvgY(10)} stroke="#9333ea" strokeWidth="3.5" />
                        <text x={toSvgX(85)} y={toSvgY(10) - 10} className="text-xs font-bold fill-purple-600">
                          S (Perfect Elastic, Es = ∞)
                        </text>
                      </>
                    )}
                  </>
                )}

                {/* Point A on Supply Curve */}
                <line x1={padding.left} y1={toSvgY(actualP1)} x2={toSvgX(q1)} y2={toSvgY(actualP1)} stroke="#9333ea" strokeWidth="1.5" strokeDasharray="4 3" />
                <line x1={toSvgX(q1)} y1={toSvgY(actualP1)} x2={toSvgX(q1)} y2={svgHeight - padding.bottom} stroke="#9333ea" strokeWidth="1.5" strokeDasharray="4 3" />
                <circle cx={toSvgX(q1)} cy={toSvgY(actualP1)} r="6" fill="#9333ea" />
                <text x={toSvgX(q1) - 10} y={toSvgY(actualP1) - 10} className="text-xs font-black fill-purple-800 dark:fill-purple-300">
                  A (P₁=${actualP1.toFixed(1)}, Q₁={q1.toFixed(0)})
                </text>
                <text x={padding.left - 8} y={toSvgY(actualP1) + 4} className="text-[11px] font-bold fill-purple-700" textAnchor="end">
                  P₁=${actualP1.toFixed(1)}
                </text>
                <text x={toSvgX(q1)} y={svgHeight - padding.bottom + 16} className="text-[11px] font-bold fill-purple-700" textAnchor="middle">
                  Q₁={q1.toFixed(0)}
                </text>

                {/* Point B on Supply Curve */}
                <line x1={padding.left} y1={toSvgY(actualP2)} x2={toSvgX(q2)} y2={toSvgY(actualP2)} stroke="#ea580c" strokeWidth="1.5" strokeDasharray="4 3" />
                <line x1={toSvgX(q2)} y1={toSvgY(actualP2)} x2={toSvgX(q2)} y2={svgHeight - padding.bottom} stroke="#ea580c" strokeWidth="1.5" strokeDasharray="4 3" />
                <circle cx={toSvgX(q2)} cy={toSvgY(actualP2)} r="6" fill="#ea580c" />
                <text x={toSvgX(q2) + 8} y={toSvgY(actualP2) + 14} className="text-xs font-black fill-orange-800 dark:fill-orange-400">
                  B (P₂=${actualP2.toFixed(1)}, Q₂={q2.toFixed(0)})
                </text>
                <text x={padding.left - 8} y={toSvgY(actualP2) + 4} className="text-[11px] font-bold fill-orange-700" textAnchor="end">
                  P₂=${actualP2.toFixed(1)}
                </text>
                <text x={toSvgX(q2)} y={svgHeight - padding.bottom + 16} className="text-[11px] font-bold fill-orange-700" textAnchor="middle">
                  Q₂={q2.toFixed(0)}
                </text>

                {/* Movement along curve arrow */}
                {(actualP1 !== actualP2 || q1 !== q2) && (
                  <path
                    d={`M ${toSvgX(q1) + (q2 >= q1 ? 6 : -6)} ${toSvgY(actualP1) + (actualP2 >= actualP1 ? -6 : 6)} L ${toSvgX(q2) - (q2 >= q1 ? 6 : -6)} ${toSvgY(actualP2) - (actualP2 >= actualP1 ? -6 : 6)}`}
                    fill="none"
                    stroke="#9333ea"
                    strokeWidth="2"
                    markerEnd="url(#s-move-arrow)"
                  />
                )}
              </svg>
            </div>

            {/* Sliders */}
            <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {isHorizontal ? (
                <>
                  <div className="bg-purple-50/50 dark:bg-purple-950/20 p-3 rounded-lg border border-purple-100 dark:border-purple-900/40">
                    <div className="flex justify-between items-center text-xs mb-1 font-semibold text-purple-900 dark:text-purple-200">
                      <span>Initial Quantity (Q₁):</span>
                      <span className="font-mono text-sm font-bold text-purple-700 dark:text-purple-400">{q1Horiz} units</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="90"
                      step="5"
                      value={q1Horiz}
                      onChange={(e) => setQ1Horiz(Number(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                  </div>

                  <div className="bg-orange-50/50 dark:bg-orange-950/20 p-3 rounded-lg border border-orange-100 dark:border-orange-900/40">
                    <div className="flex justify-between items-center text-xs mb-1 font-semibold text-orange-900 dark:text-orange-200">
                      <span>New Quantity (Q₂):</span>
                      <span className="font-mono text-sm font-bold text-orange-700 dark:text-orange-400">{q2Horiz} units</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="90"
                      step="5"
                      value={q2Horiz}
                      onChange={(e) => setQ2Horiz(Number(e.target.value))}
                      className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-purple-50/50 dark:bg-purple-950/20 p-3 rounded-lg border border-purple-100 dark:border-purple-900/40">
                    <div className="flex justify-between items-center text-xs mb-1 font-semibold text-purple-900 dark:text-purple-200">
                      <span>Initial Supply Price (P₁):</span>
                      <span className="font-mono text-sm font-bold text-purple-700 dark:text-purple-400">${actualP1}</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="18"
                      step="1"
                      value={p1}
                      onChange={(e) => setP1(Number(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                  </div>

                  <div className="bg-orange-50/50 dark:bg-orange-950/20 p-3 rounded-lg border border-orange-100 dark:border-orange-900/40">
                    <div className="flex justify-between items-center text-xs mb-1 font-semibold text-orange-900 dark:text-orange-200">
                      <span>New Supply Price (P₂):</span>
                      <span className="font-mono text-sm font-bold text-orange-700 dark:text-orange-400">${actualP2}</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="18"
                      step="1"
                      value={p2}
                      onChange={(e) => setP2(Number(e.target.value))}
                      className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

        {/* Right 5 cols: HKDSE Supply Intercept Rule Guide */}
        <div className="lg:col-span-5 space-y-4">
          {/* Result Card */}
          <div className="p-5 rounded-xl border bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Calculated Arc Es
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-200">
                {supplyType === 'vertical_intercept' && 'Es > 1 (Elastic)'}
                {supplyType === 'origin' && 'Es = 1 (Unitary)'}
                {supplyType === 'horizontal_intercept' && 'Es < 1 (Inelastic)'}
                {supplyType === 'perfect_inelastic' && 'Es = 0 (Perfect Inelastic)'}
                {supplyType === 'perfect_elastic' && 'Es = ∞ (Perfect Elastic)'}
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 font-mono">
                Es = {arcResult.elasticity > 999 ? '∞' : arcResult.elasticity.toFixed(2)}
              </span>
              <span className="text-xs text-stone-600 dark:text-stone-400">
                (%ΔQs = {Math.abs(arcResult.percentDeltaQ).toFixed(1)}% vs %ΔP = {Math.abs(arcResult.percentDeltaP).toFixed(1)}%)
              </span>
            </div>

            <div className="p-3 bg-stone-50 dark:bg-stone-950 rounded-lg border border-stone-200 dark:border-stone-800 font-mono text-[11px] leading-relaxed">
              <div className="text-stone-500 mb-1">
                Arc Formula for Supply:
              </div>
              <div className="font-bold text-stone-800 dark:text-stone-200">
                Es = (ΔQs / ΔP) × (P₁ + P₂) / (Q₁ + Q₂)
              </div>
              <div className="text-purple-600 dark:text-purple-400 font-semibold mt-1">
                = ({Math.abs(arcResult.deltaQ).toFixed(1)} / {Math.abs(arcResult.deltaP)}) × ({actualP1 + actualP2} / {(q1 + q2).toFixed(1)}) = {arcResult.elasticity.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Master Straight-Line Supply Intercept Rules Box */}
          <div className="bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/60 rounded-xl p-4 text-xs space-y-3">
            <h4 className="font-bold text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-purple-600" />
              HKDSE Straight-Line Supply Curve Intercept Rules
            </h4>
            <div className="space-y-2.5 text-stone-700 dark:text-stone-300 leading-relaxed">
              <div className="p-2 bg-white dark:bg-stone-900 rounded border border-purple-100 dark:border-purple-900/40">
                <strong className="text-amber-800 dark:text-amber-400">
                  1. Cuts the Price (Vertical) Axis:
                </strong>{' '}
                Price intercept &gt; 0 ⟹ Es &gt; 1 (Elastic everywhere along the line).
              </div>

              <div className="p-2 bg-white dark:bg-stone-900 rounded border border-emerald-200 dark:border-emerald-900/40">
                <strong className="text-emerald-800 dark:text-emerald-400">
                  2. Passes Through the Origin (0,0):
                </strong>{' '}
                ANY straight-line supply curve passing through (0,0) has Es = 1 (Unitarily elastic), REGARDLESS of its slope angle!
              </div>

              <div className="p-2 bg-white dark:bg-stone-900 rounded border border-indigo-200 dark:border-indigo-900/40">
                <strong className="text-indigo-800 dark:text-indigo-400">
                  3. Cuts the Quantity (Horizontal) Axis:
                </strong>{' '}
                Quantity intercept &gt; 0 ⟹ Es &lt; 1 (Inelastic everywhere along the line).
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
