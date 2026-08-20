/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType } from './types';
import { Navbar } from './components/Navbar';
import { DemandElasticityGraph } from './components/DemandElasticityGraph';
import { TotalRevenueSimulator } from './components/TotalRevenueSimulator';
import { SupplyElasticityGraph } from './components/SupplyElasticityGraph';
import { FactorsExplorer } from './components/FactorsExplorer';
import { CalculationLab } from './components/CalculationLab';
import { DsePracticeHub } from './components/DsePracticeHub';
import { ConceptSummaryCard } from './components/ConceptSummaryCard';
import { 
  GraduationCap, 
  DollarSign, 
  FileCheck2
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('demand');

  return (
    <div className="min-h-screen bg-stone-100/70 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
      />

      {/* Hero Welcome Bar */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-stone-900 text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-emerald-700/50 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                HKEAA C&A Curriculum Aligned
              </span>
              <span className="text-xs text-stone-300">
                Compulsory Part: Elasticity & Total Revenue
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              HKDSE Economics: Interactive Price Elasticity Hub
            </h1>
          </div>

          {/* Quick Jump Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => setCurrentTab('revenue')}
              className="px-3 py-1.5 rounded-lg bg-emerald-700/60 hover:bg-emerald-600/80 text-white border border-emerald-500/40 transition-colors flex items-center gap-1 font-semibold cursor-pointer"
            >
              <DollarSign className="w-3.5 h-3.5" />
              Gain vs Loss TR
            </button>
            <button
              onClick={() => setCurrentTab('practice')}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              DSE Past Papers Drill
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab === 'demand' && <DemandElasticityGraph />}
        {currentTab === 'revenue' && <TotalRevenueSimulator />}
        {currentTab === 'supply' && <SupplyElasticityGraph />}
        {currentTab === 'factors' && <FactorsExplorer />}
        {currentTab === 'calculator' && <CalculationLab />}
        {currentTab === 'practice' && <DsePracticeHub />}
        {currentTab === 'summary' && <ConceptSummaryCard />}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 py-6 px-4 text-xs text-stone-500 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-stone-700 dark:text-stone-300">
              HKDSE Economics Interactive Learning Platform
            </span>
            <span>•</span>
            <span>Curriculum and Assessment Guide (Secondary 4-6)</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Movement along the same curve only</span>
            <span>•</span>
            <span>Arc Elasticity Method (HKDSE Standard)</span>
            <span>•</span>
            <span className="text-stone-400">English Edition</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
