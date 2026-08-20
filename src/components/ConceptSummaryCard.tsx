import React from 'react';
import { 
  BookOpen, 
  AlertCircle, 
  TrendingDown, 
  TrendingUp, 
  DollarSign
} from 'lucide-react';

export const ConceptSummaryCard: React.FC = () => {
  return (
    <div className="space-y-6" id="summary-section">
      {/* Top Banner */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
            HKDSE Revision Cheat Sheet
          </span>
          <span className="text-xs text-stone-500 font-mono">
            Core Formulas, Rules &amp; Traps
          </span>
        </div>
        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
          HKDSE Price Elasticity Essential Summary
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
          High-yield revision notes synthesized from the HKSAR EDB C&amp;A Supplementary Guide and 2012–2025 past exam trends.
        </p>
      </div>

      {/* Grid of 4 Key Concept Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Arc Elasticity Formula */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
            <BookOpen className="w-4 h-4" />
            1. Official Arc Elasticity Formula
          </div>
          <div className="p-3 bg-stone-50 dark:bg-stone-950 rounded-lg font-mono text-xs text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-800">
            <div className="text-stone-500 text-[11px] mb-1">
              Average Price &amp; Quantity Method:
            </div>
            <div className="font-bold text-sky-700 dark:text-sky-300">
              Ed = | (ΔQ / ΔP) × (P₁ + P₂) / (Q₁ + Q₂) |
            </div>
            <div className="font-bold text-purple-700 dark:text-purple-300 mt-1">
              Es = (ΔQs / ΔP) × (P₁ + P₂) / (Q₁ + Q₂)
            </div>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            Why Arc? Removes inconsistency between price increases vs decreases. Sign convention: Ed takes absolute value (|Ed|); Es is positive.
          </p>
        </div>

        {/* Card 2: Total Revenue Rules */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold text-sm">
            <DollarSign className="w-4 h-4" />
            2. Total Revenue (TR = P × Q) Rules
          </div>
          <div className="space-y-1.5 text-xs text-stone-800 dark:text-stone-200">
            <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50">
              <strong>Elastic (|Ed| &gt; 1):</strong>{' '}
              P ↑ ⟹ TR ↓ ; P ↓ ⟹ TR ↑ (Gain Area &gt; Loss Area on price cut)
            </div>
            <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50">
              <strong>Inelastic (|Ed| &lt; 1):</strong>{' '}
              P ↑ ⟹ TR ↑ ; P ↓ ⟹ TR ↓ (Gain Area &gt; Loss Area on price rise)
            </div>
            <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
              <strong>Unitary (|Ed| = 1):</strong>{' '}
              TR remains CONSTANT at any price level (%ΔP = %ΔQ)
            </div>
          </div>
        </div>

        {/* Card 3: Straight-line Demand Curve Properties */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
            <TrendingDown className="w-4 h-4" />
            3. Straight-Line Demand Elasticity Zones
          </div>
          <div className="p-3 bg-stone-50 dark:bg-stone-950 rounded-lg text-xs text-stone-700 dark:text-stone-300 space-y-1">
            <div>• <strong>Y-intercept (Q=0):</strong> |Ed| = ∞</div>
            <div>• <strong>Upper Segment:</strong> |Ed| &gt; 1 (Elastic)</div>
            <div>• <strong>Midpoint:</strong> |Ed| = 1 (Unitary, Maximum Total Revenue TR)</div>
            <div>• <strong>Lower Segment:</strong> |Ed| &lt; 1 (Inelastic)</div>
            <div>• <strong>X-intercept (P=0):</strong> |Ed| = 0</div>
          </div>
          <p className="text-[11px] text-stone-500">
            Key Exam Insight: Slope is CONSTANT along a straight line, but Elasticity continuously FALLS as we move downward.
          </p>
        </div>

        {/* Card 4: Straight-line Supply Intercept Rules */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-bold text-sm">
            <TrendingUp className="w-4 h-4" />
            4. Supply Straight-Line Intercept Rules
          </div>
          <div className="space-y-1.5 text-xs text-stone-800 dark:text-stone-200">
            <div className="p-2 rounded bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50">
              <strong>Vertical (Price) Intercept &gt; 0:</strong>{' '}
              Es &gt; 1 (Elastic everywhere)
            </div>
            <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
              <strong>Passes through Origin (0,0):</strong>{' '}
              Es = 1 (Unitary everywhere, regardless of slope!)
            </div>
            <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50">
              <strong>Horizontal (Quantity) Intercept &gt; 0:</strong>{' '}
              Es &lt; 1 (Inelastic everywhere)
            </div>
          </div>
        </div>
      </div>

      {/* Critical DSE Traps Callout */}
      <div className="bg-red-50/70 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-5 space-y-3">
        <h4 className="font-bold text-red-900 dark:text-red-300 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          Top 3 HKDSE Traps to Avoid in Examinations
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-white dark:bg-stone-900 rounded-lg border border-red-100 dark:border-red-900/40">
            <strong className="text-stone-900 dark:text-stone-100 block mb-1">
              Trap 1: Demand vs Quantity Demanded
            </strong>
            <p className="text-stone-600 dark:text-stone-400">
              Price change causes MOVEMENT ALONG curve (Change in Qd), NOT a shift of demand! Never say "demand increases" when price falls.
            </p>
          </div>

          <div className="p-3 bg-white dark:bg-stone-900 rounded-lg border border-red-100 dark:border-red-900/40">
            <strong className="text-stone-900 dark:text-stone-100 block mb-1">
              Trap 2: Spending Same Money vs Buying Same Q
            </strong>
            <p className="text-stone-600 dark:text-stone-400">
              Spending same total money (P×Q constant) = Unitary Elasticity (|Ed|=1). Buying fixed number of units (Q constant) = Perfectly Inelastic (|Ed|=0).
            </p>
          </div>

          <div className="p-3 bg-white dark:bg-stone-900 rounded-lg border border-red-100 dark:border-red-900/40">
            <strong className="text-stone-900 dark:text-stone-100 block mb-1">
              Trap 3: Absolute Values vs Percentages
            </strong>
            <p className="text-stone-600 dark:text-stone-400">
              Elasticity is defined by % change, not absolute units ($ or kg). A $1 price rise is not comparable directly to a 10 unit quantity drop.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
