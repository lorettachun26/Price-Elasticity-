import React, { useState } from 'react';
import { demandFactors, supplyFactors } from '../data/factorsData';
import { 
  Repeat, 
  Percent, 
  HeartPulse, 
  Flame, 
  ShieldCheck, 
  Clock, 
  Grid, 
  TrendingDown,
  Factory, 
  Users, 
  Wheat, 
  CalendarDays, 
  DoorOpen, 
  Package,
  Search,
  Lightbulb,
  CheckCircle,
  BookOpen
} from 'lucide-react';

export const FactorsExplorer: React.FC = () => {
  const [activeType, setActiveType] = useState<'all' | 'demand' | 'supply'>('demand');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFactor, setSelectedFactor] = useState<string | null>('substitutes');

  const getIcon = (name: string) => {
    switch (name) {
      case 'Repeat': return <Repeat className="w-5 h-5" />;
      case 'Percent': return <Percent className="w-5 h-5" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Clock': return <Clock className="w-5 h-5" />;
      case 'Grid': return <Grid className="w-5 h-5" />;
      case 'TrendingDown': return <TrendingDown className="w-5 h-5" />;
      case 'Factory': return <Factory className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      case 'Wheat': return <Wheat className="w-5 h-5" />;
      case 'CalendarDays': return <CalendarDays className="w-5 h-5" />;
      case 'DoorOpen': return <DoorOpen className="w-5 h-5" />;
      case 'Package': return <Package className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const displayedFactors = [
    ...(activeType === 'supply' ? [] : demandFactors.map(f => ({ ...f, factorType: 'demand' }))),
    ...(activeType === 'demand' ? [] : supplyFactors.map(f => ({ ...f, factorType: 'supply' })))
  ].filter(f => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      f.titleEn.toLowerCase().includes(term) ||
      f.exampleEn.toLowerCase().includes(term) ||
      f.reasonEn.toLowerCase().includes(term)
    );
  });

  const activeItem = [...demandFactors, ...supplyFactors].find(f => f.id === selectedFactor) || demandFactors[0];

  return (
    <div className="space-y-6" id="factors-explorer-section">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                HKDSE Real-Life Economic Analysis
              </span>
              <span className="text-xs text-stone-500 font-mono">
                Determinants of Elasticity
              </span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
              Factors Affecting Price Elasticity of Demand &amp; Supply
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
              Explore the economic determinants that make demand or supply more elastic or inelastic, grounded with authentic Hong Kong market examples and past paper test points.
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800/80 rounded-lg border border-stone-200 dark:border-stone-700 self-start">
            <button
              onClick={() => setActiveType('demand')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                activeType === 'demand'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              Demand Factors (8)
            </button>
            <button
              onClick={() => setActiveType('supply')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                activeType === 'supply'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              Supply Factors (6)
            </button>
            <button
              onClick={() => setActiveType('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                activeType === 'all'
                  ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              All (14)
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search factor name, substitute, necessity, hospital, MTR..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="px-2.5 py-1.5 text-xs text-stone-500 hover:text-stone-800 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Main 2-Column Grid: List on Left, Active Deep-Dive on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 cols: Factor List */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
          {displayedFactors.map((factor) => {
            const isDemand = demandFactors.some(d => d.id === factor.id);
            const isSelected = selectedFactor === factor.id;

            return (
              <button
                key={factor.id}
                onClick={() => setSelectedFactor(factor.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                  isSelected
                    ? isDemand
                      ? 'bg-emerald-50/90 border-emerald-400 dark:bg-emerald-950/40 dark:border-emerald-700 shadow-sm ring-1 ring-emerald-400'
                      : 'bg-purple-50/90 border-purple-400 dark:bg-purple-950/40 dark:border-purple-700 shadow-sm ring-1 ring-purple-400'
                    : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 ${
                  isDemand
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300'
                    : 'bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300'
                }`}>
                  {getIcon(factor.iconName)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-bold text-xs text-stone-900 dark:text-stone-100 truncate">
                      {factor.titleEn}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                      isDemand
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                    }`}>
                      {isDemand ? 'Ed' : 'Es'}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 line-clamp-2">
                    {factor.impactEn}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right 7 cols: Factor Deep-Dive Card */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-sm sticky top-4 space-y-5">
            {/* Factor Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-stone-100 dark:border-stone-800">
              <div className={`p-3 rounded-xl ${
                demandFactors.some(d => d.id === activeItem.id)
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300'
                  : 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300'
              }`}>
                {getIcon(activeItem.iconName)}
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                  {demandFactors.some(d => d.id === activeItem.id) ? 'Demand Elasticity Factor' : 'Supply Elasticity Factor'}
                </span>
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  {activeItem.titleEn}
                </h3>
              </div>
            </div>

            {/* Impact Statement Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-stone-50 to-stone-100 dark:from-stone-850 dark:to-stone-800 border border-stone-200 dark:border-stone-700">
              <div className="text-xs font-bold text-stone-500 mb-1 flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4 text-emerald-600" />
                Core Directional Rule:
              </div>
              <div className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                {activeItem.impactEn}
              </div>
            </div>

            {/* Economic Reasoning */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Economic Principle / Mechanism
              </h4>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed bg-stone-50 dark:bg-stone-950 p-3.5 rounded-lg border border-stone-200 dark:border-stone-800">
                {activeItem.reasonEn}
              </p>
            </div>

            {/* Real World HK Example */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Authentic Hong Kong Real-Life Case
              </h4>
              <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-lg text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                {activeItem.exampleEn}
              </div>
            </div>

            {/* HKDSE Exam Tip Callout */}
            <div className="p-3.5 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 rounded-lg flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-sky-600 dark:text-sky-400 mt-0.5 shrink-0" />
              <div className="text-xs text-sky-950 dark:text-sky-200">
                <strong className="block mb-0.5 font-bold">
                  HKDSE Past Paper Reference &amp; Exam Scoring Tip:
                </strong>
                {activeItem.dseExamTipEn}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
