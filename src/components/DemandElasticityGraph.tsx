import React, { useState } from 'react';
import { calculateArcElasticity } from '../utils/elasticity';
import { 
  Info, 
  TrendingDown, 
  Sparkles,
  CheckCircle2,
  Sliders
} from 'lucide-react';

export const DemandElasticityGraph: React.FC = () => {
  const [curveType, setCurveType] = useState<'linear' | 'unitary_hyperbola' | 'perfect_inelastic' | 'perfect_elastic'>('linear');
  const [p1, setP1] = useState<number>(14);
  const [p2, setP2] = useState<number>(8);
  const [q1Horiz, setQ1Horiz] = useState<number>(35);
  const [q2Horiz, setQ2Horiz] = useState<number>(75);
  const [showZones, setShowZones] = useState<boolean>(true);

  // Demand equation formulas:
  // 1. Linear straight line: P = 20 - 0.2Q  <=>  Q = (20 - P) / 0.2 = 100 - 5P
  // 2. Unitary hyperbola: P * Q = 300  <=>  Q = 300 / P
  // 3. Perfect inelastic: Q = 50 (Vertical line)
  // 4. Perfect elastic: P = 10 (Horizontal line)

  const getDemandQ = (pVal: number, type = curveType): number => {
    if (type === 'perfect_inelastic') {
      return 50; // Constant Q=50 along the vertical line
    }
    if (type === 'perfect_elastic') {
      return 50;
    }
    if (type === 'unitary_hyperbola') {
      const safeP = Math.max(1, pVal);
      return Math.min(95, Math.max(5, 300 / safeP));
    }
    // Standard Linear Straight Line: Q = (20 - P) / 0.2
    return Math.max(0, Math.min(100, (20 - pVal) / 0.2));
  };

  // Determine actual coordinates based on curve type
  const isHorizontal = curveType === 'perfect_elastic';
  const actualP1 = isHorizontal ? 10 : p1;
  const actualP2 = isHorizontal ? 10 : p2;
  const q1 = isHorizontal ? q1Horiz : getDemandQ(actualP1);
  const q2 = isHorizontal ? q2Horiz : getDemandQ(actualP2);

  const arcResult = calculateArcElasticity(actualP1, actualP2, q1, q2, true);

  // SVG coordinate transformation
  // Graph domain: Q: 0 to 105, P: 0 to 22
  const svgWidth = 520;
  const svgHeight = 360;
  const padding = { top: 30, right: 30, bottom: 45, left: 55 };
  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  const toSvgX = (qVal: number) => padding.left + (qVal / 100) * plotWidth;
  const toSvgY = (pVal: number) => svgHeight - padding.bottom - (pVal / 20) * plotHeight;

  // Key coordinate points on linear curve
  const midPointP = 10;
  const midPointQ = 50;

  // Generate SVG path for curved demand lines so that points are guaranteed to sit EXACTLY on the curve
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
    <div className="space-y-6" id="demand-elasticity-section">
      {/* Header & Subtitle */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                HKDSE Compulsory Part C
              </span>
              <span className="text-xs text-stone-500 font-mono">
                Arc Elasticity &amp; Movement Along the Same Curve
              </span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
              Price Elasticity of Demand (Ed)
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
              Measures the responsiveness of quantity demanded to a price change, assuming all other factors remain constant (ceteris paribus). Notice that before and after the price change, <strong>both Point A and Point B always lie along the SAME demand curve</strong>.
            </p>
          </div>

          {/* Curve Type Selector */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-stone-100 dark:bg-stone-800/80 rounded-lg border border-stone-200 dark:border-stone-700 self-start">
            <button
              onClick={() => setCurveType('linear')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                curveType === 'linear'
                  ? 'bg-white dark:bg-stone-900 text-emerald-700 dark:text-emerald-400 shadow-sm font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              1. Straight Line (Linear)
            </button>
            <button
              onClick={() => setCurveType('unitary_hyperbola')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                curveType === 'unitary_hyperbola'
                  ? 'bg-white dark:bg-stone-900 text-emerald-700 dark:text-emerald-400 shadow-sm font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              2. Rectangular Hyperbola (|Ed|=1)
            </button>
            <button
              onClick={() => setCurveType('perfect_inelastic')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                curveType === 'perfect_inelastic'
                  ? 'bg-white dark:bg-stone-900 text-emerald-700 dark:text-emerald-400 shadow-sm font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              3. Vertical Line (|Ed|=0)
            </button>
            <button
              onClick={() => setCurveType('perfect_elastic')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                curveType === 'perfect_elastic'
                  ? 'bg-white dark:bg-stone-900 text-emerald-700 dark:text-emerald-400 shadow-sm font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              4. Horizontal Line (|Ed|=∞)
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Graph + Dynamic Math Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: SVG Diagram */}
        <div className="lg:col-span-7 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800 mb-3">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-bold text-stone-800 dark:text-stone-200 text-base">
                Interactive Demand Curve (Points A &amp; B Along Same Curve)
              </h3>
            </div>
            {curveType === 'linear' && (
              <button
                onClick={() => setShowZones(!showZones)}
                className={`text-xs px-2.5 py-1 rounded-md font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
                  showZones 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800' 
                    : 'bg-stone-100 text-stone-600 border-stone-200 dark:bg-stone-800 dark:text-stone-400'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Show Elasticity Zones
              </button>
            )}
          </div>

          {/* Guaranteed Same Curve Verification Banner */}
          <div className="mb-3 px-3 py-1.5 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-lg flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-200">
            <span className="flex items-center gap-1.5 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              Movement Along Curve: Point A (P₁, Q₁) and Point B (P₂, Q₂) are strictly on the SAME demand curve
            </span>
            <span className="font-mono text-[11px] font-bold px-2 py-0.5 bg-white dark:bg-stone-900 rounded border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300">
              {curveType === 'linear' && 'Straight Line'}
              {curveType === 'unitary_hyperbola' && 'Hyperbolic Curve'}
              {curveType === 'perfect_inelastic' && 'Vertical Line'}
              {curveType === 'perfect_elastic' && 'Horizontal Line'}
            </span>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="relative w-full aspect-[520/360] bg-stone-50/50 dark:bg-stone-950/50 rounded-lg p-1 border border-stone-100 dark:border-stone-850 flex items-center justify-center">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-full select-none"
            >
              <defs>
                {/* Marker Arrows */}
                <marker id="arrow-axis" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#78716c" />
                </marker>
                <marker id="arrow-move" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#059669" />
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
              {/* Y Axis (Price P) */}
              <line
                x1={padding.left}
                y1={svgHeight - padding.bottom}
                x2={padding.left}
                y2={padding.top - 15}
                stroke="#57534e"
                strokeWidth="2"
                markerEnd="url(#arrow-axis)"
              />
              <text x={padding.left - 12} y={padding.top - 12} className="text-xs font-bold fill-stone-700 dark:fill-stone-300" textAnchor="end">
                Price (P) ($)
              </text>

              {/* X Axis (Quantity Q) */}
              <line
                x1={padding.left}
                y1={svgHeight - padding.bottom}
                x2={svgWidth - padding.right + 15}
                y2={svgHeight - padding.bottom}
                stroke="#57534e"
                strokeWidth="2"
                markerEnd="url(#arrow-axis)"
              />
              <text x={svgWidth - padding.right + 20} y={svgHeight - padding.bottom + 4} className="text-xs font-bold fill-stone-700 dark:fill-stone-300" textAnchor="start">
                Quantity (Q)
              </text>
              <text x={padding.left - 10} y={svgHeight - padding.bottom + 15} className="text-xs font-semibold fill-stone-500" textAnchor="end">
                0
              </text>

              {/* Demand Curves */}
              {/* 1. Straight Line Demand */}
              {curveType === 'linear' && (
                <>
                  <line
                    x1={toSvgX(0)}
                    y1={toSvgY(20)}
                    x2={toSvgX(100)}
                    y2={toSvgY(0)}
                    stroke="#0284c7"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <text x={toSvgX(98) + 12} y={toSvgY(2)} className="text-sm font-black fill-sky-700 dark:fill-sky-400">
                    D
                  </text>

                  {/* Elasticity Zone Highlights if enabled */}
                  {showZones && (
                    <>
                      {/* Upper Elastic Zone */}
                      <line
                        x1={toSvgX(0)}
                        y1={toSvgY(20)}
                        x2={toSvgX(50)}
                        y2={toSvgY(10)}
                        stroke="#f59e0b"
                        strokeWidth="6"
                        strokeOpacity="0.4"
                      />
                      {/* Midpoint Unitary */}
                      <circle cx={toSvgX(midPointQ)} cy={toSvgY(midPointP)} r="5" fill="#10b981" />
                      <text x={toSvgX(midPointQ) + 8} y={toSvgY(midPointP) - 8} className="text-[10px] font-bold fill-emerald-600 dark:fill-emerald-400 bg-white">
                        Midpoint |Ed| = 1
                      </text>

                      {/* Lower Inelastic Zone */}
                      <line
                        x1={toSvgX(50)}
                        y1={toSvgY(10)}
                        x2={toSvgX(100)}
                        y2={toSvgY(0)}
                        stroke="#6366f1"
                        strokeWidth="6"
                        strokeOpacity="0.4"
                      />

                      {/* Zone Labels */}
                      <text x={toSvgX(22)} y={toSvgY(16)} className="text-[11px] font-bold fill-amber-700 dark:fill-amber-400">
                        Upper: |Ed| &gt; 1 (Elastic)
                      </text>
                      <text x={toSvgX(62)} y={toSvgY(6)} className="text-[11px] font-bold fill-indigo-700 dark:fill-indigo-400">
                        Lower: |Ed| &lt; 1 (Inelastic)
                      </text>
                    </>
                  )}
                </>
              )}

              {/* 2. Rectangular Hyperbola Curve (|Ed| = 1 Everywhere) */}
              {curveType === 'unitary_hyperbola' && (
                <>
                  <path
                    d={generateCurvePath((p) => getDemandQ(p, 'unitary_hyperbola'), 3.2, 20)}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <text x={toSvgX(getDemandQ(3.5, 'unitary_hyperbola')) + 8} y={toSvgY(3.5)} className="text-xs font-bold fill-emerald-600">
                    D (Rectangular Hyperbola, |Ed| = 1)
                  </text>
                </>
              )}

              {/* 3. Vertical Demand Line (Perfect Inelastic, |Ed| = 0) */}
              {curveType === 'perfect_inelastic' && (
                <>
                  <line
                    x1={toSvgX(50)}
                    y1={toSvgY(20)}
                    x2={toSvgX(50)}
                    y2={toSvgY(0)}
                    stroke="#dc2626"
                    strokeWidth="3.5"
                  />
                  <text x={toSvgX(50)} y={padding.top - 5} className="text-xs font-bold fill-red-600 text-center" textAnchor="middle">
                    D (Perfect Inelastic Vertical, |Ed| = 0)
                  </text>
                </>
              )}

              {/* 4. Horizontal Demand Line (Perfect Elastic, |Ed| = ∞) */}
              {curveType === 'perfect_elastic' && (
                <>
                  <line
                    x1={toSvgX(0)}
                    y1={toSvgY(10)}
                    x2={toSvgX(100)}
                    y2={toSvgY(10)}
                    stroke="#9333ea"
                    strokeWidth="3.5"
                  />
                  <text x={toSvgX(85)} y={toSvgY(10) - 10} className="text-xs font-bold fill-purple-600">
                    D (Perfect Elastic Horizontal, |Ed| = ∞)
                  </text>
                </>
              )}

              {/* Point A Guidelines & Dot */}
              <line x1={padding.left} y1={toSvgY(actualP1)} x2={toSvgX(q1)} y2={toSvgY(actualP1)} stroke="#059669" strokeWidth="1.5" strokeDasharray="4 3" />
              <line x1={toSvgX(q1)} y1={toSvgY(actualP1)} x2={toSvgX(q1)} y2={svgHeight - padding.bottom} stroke="#059669" strokeWidth="1.5" strokeDasharray="4 3" />
              
              <circle cx={toSvgX(q1)} cy={toSvgY(actualP1)} r="6" fill="#059669" className="shadow-md cursor-pointer" />
              <text x={toSvgX(q1) - 12} y={toSvgY(actualP1) - 10} className="text-xs font-black fill-emerald-700 dark:fill-emerald-300">
                A (P₁={actualP1}, Q₁={q1.toFixed(0)})
              </text>
              <text x={padding.left - 8} y={toSvgY(actualP1) + 4} className="text-[11px] font-bold fill-emerald-700 dark:fill-emerald-300" textAnchor="end">
                P₁=${actualP1}
              </text>
              <text x={toSvgX(q1)} y={svgHeight - padding.bottom + 16} className="text-[11px] font-bold fill-emerald-700 dark:fill-emerald-300" textAnchor="middle">
                Q₁={q1.toFixed(0)}
              </text>

              {/* Point B Guidelines & Dot */}
              <line x1={padding.left} y1={toSvgY(actualP2)} x2={toSvgX(q2)} y2={toSvgY(actualP2)} stroke="#ea580c" strokeWidth="1.5" strokeDasharray="4 3" />
              <line x1={toSvgX(q2)} y1={toSvgY(actualP2)} x2={toSvgX(q2)} y2={svgHeight - padding.bottom} stroke="#ea580c" strokeWidth="1.5" strokeDasharray="4 3" />
              
              <circle cx={toSvgX(q2)} cy={toSvgY(actualP2)} r="6" fill="#ea580c" className="shadow-md cursor-pointer" />
              <text x={toSvgX(q2) + 8} y={toSvgY(actualP2) + 14} className="text-xs font-black fill-orange-700 dark:fill-orange-400">
                B (P₂={actualP2}, Q₂={q2.toFixed(0)})
              </text>
              <text x={padding.left - 8} y={toSvgY(actualP2) + 4} className="text-[11px] font-bold fill-orange-700 dark:fill-orange-400" textAnchor="end">
                P₂=${actualP2}
              </text>
              <text x={toSvgX(q2)} y={svgHeight - padding.bottom + 16} className="text-[11px] font-bold fill-orange-700 dark:fill-orange-400" textAnchor="middle">
                Q₂={q2.toFixed(0)}
              </text>

              {/* Movement along curve directional path */}
              {actualP1 !== actualP2 && (
                <>
                  {curveType === 'linear' || curveType === 'perfect_inelastic' ? (
                    <path
                      d={`M ${toSvgX(q1) + (q2 > q1 ? 6 : q2 < q1 ? -6 : 0)} ${toSvgY(actualP1) + (actualP2 > actualP1 ? -6 : 6)} L ${toSvgX(q2) - (q2 > q1 ? 6 : q2 < q1 ? -6 : 0)} ${toSvgY(actualP2) - (actualP2 > actualP1 ? -6 : 6)}`}
                      fill="none"
                      stroke="#059669"
                      strokeWidth="2.5"
                      markerEnd="url(#arrow-move)"
                    />
                  ) : (
                    <path
                      d={generateCurvePath((p) => getDemandQ(p), actualP1, actualP2, 20)}
                      fill="none"
                      stroke="#059669"
                      strokeWidth="2.5"
                      strokeDasharray="4 2"
                      markerEnd="url(#arrow-move)"
                    />
                  )}
                </>
              )}

              {/* Directional arrow for horizontal curve */}
              {isHorizontal && q1 !== q2 && (
                <line
                  x1={toSvgX(q1) + (q2 > q1 ? 8 : -8)}
                  y1={toSvgY(10)}
                  x2={toSvgX(q2) - (q2 > q1 ? 8 : -8)}
                  y2={toSvgY(10)}
                  stroke="#9333ea"
                  strokeWidth="2.5"
                  markerEnd="url(#arrow-move)"
                />
              )}
            </svg>
          </div>

          {/* Interactive Price / Quantity Controls */}
          <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800">
            {!isHorizontal ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/40">
                  <div className="flex justify-between items-center text-xs mb-1 font-semibold text-emerald-900 dark:text-emerald-200">
                    <span>Initial Price (P₁):</span>
                    <span className="font-mono text-sm font-bold text-emerald-700 dark:text-emerald-400">${actualP1}</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="18"
                    step="1"
                    value={p1}
                    onChange={(e) => setP1(Number(e.target.value))}
                    className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                    <span>$3 (Lower / Higher Q)</span>
                    <span>$10 (Mid)</span>
                    <span>$18 (Upper / Lower Q)</span>
                  </div>
                </div>

                <div className="bg-orange-50/50 dark:bg-orange-950/20 p-3 rounded-lg border border-orange-100 dark:border-orange-900/40">
                  <div className="flex justify-between items-center text-xs mb-1 font-semibold text-orange-900 dark:text-orange-200">
                    <span>New Price (P₂):</span>
                    <span className="font-mono text-sm font-bold text-orange-700 dark:text-orange-400">${actualP2}</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="18"
                    step="1"
                    value={p2}
                    onChange={(e) => setP2(Number(e.target.value))}
                    className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                    <span>$3</span>
                    <span>$10</span>
                    <span>$18</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/40">
                  <div className="flex justify-between items-center text-xs mb-1 font-semibold text-emerald-900 dark:text-emerald-200">
                    <span>Initial Quantity (Q₁) at P=$10:</span>
                    <span className="font-mono text-sm font-bold text-emerald-700 dark:text-emerald-400">{q1Horiz} units</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    step="5"
                    value={q1Horiz}
                    onChange={(e) => setQ1Horiz(Number(e.target.value))}
                    className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                    <span>10 units</span>
                    <span>50 units</span>
                    <span>90 units</span>
                  </div>
                </div>

                <div className="bg-orange-50/50 dark:bg-orange-950/20 p-3 rounded-lg border border-orange-100 dark:border-orange-900/40">
                  <div className="flex justify-between items-center text-xs mb-1 font-semibold text-orange-900 dark:text-orange-200">
                    <span>New Quantity (Q₂) at P=$10:</span>
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
                  <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                    <span>10 units</span>
                    <span>50 units</span>
                    <span>90 units</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right 5 cols: HKDSE Arc Elasticity Formula & Result Card */}
        <div className="lg:col-span-5 space-y-4">
          {/* Elasticity Verdict Card */}
          <div className={`p-5 rounded-xl border transition-all ${
            arcResult.category === 'elastic'
              ? 'bg-amber-50/80 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800'
              : arcResult.category === 'inelastic'
              ? 'bg-indigo-50/80 border-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-800'
              : arcResult.category === 'unitary'
              ? 'bg-emerald-50/80 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800'
              : 'bg-stone-50 border-stone-200 dark:bg-stone-800/40 dark:border-stone-700'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                Calculated Arc Elasticity
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                arcResult.category === 'elastic'
                  ? 'bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200'
                  : arcResult.category === 'inelastic'
                  ? 'bg-indigo-200 text-indigo-900 dark:bg-indigo-900 dark:text-indigo-200'
                  : 'bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200'
              }`}>
                {arcResult.category === 'elastic' && 'Elastic (|Ed| > 1)'}
                {arcResult.category === 'inelastic' && 'Inelastic (|Ed| < 1)'}
                {arcResult.category === 'unitary' && 'Unitary (|Ed| = 1)'}
                {arcResult.category === 'perfect_inelastic' && 'Perfect Inelastic (Ed = 0)'}
                {arcResult.category === 'perfect_elastic' && 'Perfect Elastic (Ed = ∞)'}
              </span>
            </div>

            <div className="flex items-baseline gap-3 my-2">
              <span className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 font-mono">
                |Ed| = {arcResult.elasticity > 999 ? '∞' : arcResult.elasticity.toFixed(2)}
              </span>
              <span className="text-xs text-stone-600 dark:text-stone-400">
                (%ΔQ = {Math.abs(arcResult.percentDeltaQ).toFixed(1)}% vs %ΔP = {Math.abs(arcResult.percentDeltaP).toFixed(1)}%)
              </span>
            </div>

            <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed mt-2">
              {arcResult.category === 'elastic' && 'Percentage change in quantity demanded is GREATER than percentage change in price (%ΔQd > %ΔP). Consumers are highly price-sensitive in this range.'}
              {arcResult.category === 'inelastic' && 'Percentage change in quantity demanded is SMALLER than percentage change in price (%ΔQd < %ΔP). Consumers are relatively price-insensitive.'}
              {arcResult.category === 'unitary' && 'Percentage change in quantity demanded EQUALS percentage change in price (%ΔQd = %ΔP). Total Revenue remains strictly unchanged.'}
              {arcResult.category === 'perfect_inelastic' && 'Quantity demanded does not respond at all to price changes (%ΔQd = 0). Demand curve is a vertical straight line.'}
              {arcResult.category === 'perfect_elastic' && 'Buyers will buy any quantity at the market price ($10). At any higher price, quantity demanded falls to zero. Demand curve is horizontal.'}
            </p>
          </div>

          {/* HKDSE Arc Elasticity Step-by-Step Box */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 shadow-sm text-xs space-y-3">
            <h4 className="font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-sky-600" />
              HKDSE Arc Elasticity Formula (Average Method)
            </h4>

            {/* Formula display */}
            <div className="p-3 bg-stone-50 dark:bg-stone-950 rounded-lg border border-stone-200 dark:border-stone-800 font-mono text-[11px] leading-relaxed">
              <div className="text-stone-500 mb-1">
                Official HKEAA Formula:
              </div>
              <div className="font-bold text-stone-800 dark:text-stone-200">
                Ed = | [ ΔQ / ((Q₁ + Q₂) / 2) ] ÷ [ ΔP / ((P₁ + P₂) / 2) ] |
              </div>
              <div className="text-sky-600 dark:text-sky-400 mt-1 font-semibold">
                = | (ΔQ / ΔP) × (P₁ + P₂) / (Q₁ + Q₂) |
              </div>
            </div>

            {/* Numerical substitution */}
            <div className="space-y-1.5 text-stone-600 dark:text-stone-400 text-[11px]">
              <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                <span>ΔQ = |{q2.toFixed(0)} - {q1.toFixed(0)}| = {Math.abs(arcResult.deltaQ).toFixed(0)}</span>
                <span>Average Q = {arcResult.avgQ.toFixed(1)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                <span>ΔP = |${actualP2} - ${actualP1}| = ${Math.abs(arcResult.deltaP)}</span>
                <span>Average P = ${arcResult.avgP.toFixed(1)}</span>
              </div>
              <div className="pt-1 font-mono text-emerald-700 dark:text-emerald-400 font-bold flex justify-between">
                <span>Arc |Ed| = ({Math.abs(arcResult.deltaQ).toFixed(0)} / {Math.max(0.01, Math.abs(arcResult.deltaP))}) × (${actualP1 + actualP2} / {(q1 + q2).toFixed(1)})</span>
                <span>= {arcResult.elasticity > 999 ? '∞' : arcResult.elasticity.toFixed(2)}</span>
              </div>
            </div>

            {/* HKDSE Syllabus Note */}
            <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded border border-amber-200 dark:border-amber-900/60 text-[11px] text-amber-900 dark:text-amber-300">
              <strong>HKDSE Syllabus Rule:</strong>{' '}
              Under the HKDSE C&amp;A Guide, Arc Elasticity is used to ensure the elasticity value is identical whether price moves from P1 to P2 or vice-versa.
            </div>
          </div>

          {/* Straight-line vs Curved Demand Insight Box */}
          <div className="bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/60 rounded-xl p-4 text-xs space-y-2">
            <h4 className="font-bold text-sky-900 dark:text-sky-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
              Key Properties: Straight Line vs Curves vs Vertical vs Horizontal
            </h4>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
              • <strong>Straight-Line Demand:</strong> Slope is constant, but elasticity continuously FALLS from top-left (|Ed|=∞) to bottom-right (|Ed|=0). Midpoint has |Ed|=1.
              <br />• <strong>Rectangular Hyperbola (P×Q = Constant):</strong> Elasticity is exactly |Ed| = 1 everywhere along the curve!
              <br />• <strong>Vertical Demand (Q Constant):</strong> |Ed| = 0 at all price levels.
              <br />• <strong>Horizontal Demand (P Constant):</strong> |Ed| = ∞ at the market price.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

