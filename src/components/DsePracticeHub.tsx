import React, { useState } from 'react';
import { dseMCQuestions, dseStructuredQuestions } from '../data/dseQuestions';
import confetti from 'canvas-confetti';
import { 
  FileCheck2, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Award, 
  BookOpen, 
  Filter,
  Eye,
  Sparkles,
  CheckSquare,
  Square
} from 'lucide-react';

export const DsePracticeHub: React.FC = () => {
  // Practice Sub-tab: 'mc' | 'structured' | 'report'
  const [practiceTab, setPracticeTab] = useState<'mc' | 'structured' | 'report'>('mc');

  // MC State
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [currentMCIndex, setCurrentMCIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [id: string]: 'A' | 'B' | 'C' | 'D' }>({});
  const [showExplanation, setShowExplanation] = useState<{ [id: string]: boolean }>({});

  // Structured Paper 2 State
  const [activeStructuredId, setActiveStructuredId] = useState<string>(dseStructuredQuestions[0].id);
  const [studentText, setStudentText] = useState<{ [key: string]: string }>({});
  const [checkedRubrics, setCheckedRubrics] = useState<{ [criterionKey: string]: boolean }>({});
  const [showModelAnswer, setShowModelAnswer] = useState<{ [key: string]: boolean }>({});

  // Filter MCs
  const filteredMCs = dseMCQuestions.filter(q => {
    if (selectedTopic === 'all') return true;
    return q.topic === selectedTopic;
  });

  const activeMC = filteredMCs[currentMCIndex] || filteredMCs[0];

  const handleSelectMCAnswer = (questionId: string, answer: 'A' | 'B' | 'C' | 'D') => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
    setShowExplanation(prev => ({ ...prev, [questionId]: true }));

    const question = dseMCQuestions.find(q => q.id === questionId);
    if (question && question.correctAnswer === answer) {
      // Trigger mini celebration
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    }
  };

  const handleToggleRubric = (key: string) => {
    setCheckedRubrics(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Calculate diagnostic scores
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = dseMCQuestions.filter(q => userAnswers[q.id] === q.correctAnswer).length;
  const accuracyPercent = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  // Level estimation based on HKDSE percentage
  const getEstimatedDseLevel = (pct: number) => {
    if (pct >= 90) return 'Level 5**';
    if (pct >= 82) return 'Level 5*';
    if (pct >= 75) return 'Level 5';
    if (pct >= 62) return 'Level 4';
    if (pct >= 48) return 'Level 3';
    if (pct >= 35) return 'Level 2';
    return 'Level 1 / Unclassified';
  };

  const currentStructured = dseStructuredQuestions.find(q => q.id === activeStructuredId) || dseStructuredQuestions[0];

  return (
    <div className="space-y-6" id="practice-hub-section">
      {/* Header Banner */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300">
                Official HKDSE Past Papers &amp; Rubrics
              </span>
              <span className="text-xs text-stone-500 font-mono">
                2012 – 2025 Real Examination Questions
              </span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
              HKDSE Exam Practice &amp; Smart Marking System
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
              Practice authentic HKDSE Paper 1 multiple-choice questions and Paper 2 structured data-response questions with step-by-step marking rubrics and performance diagnosis.
            </p>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700 self-start">
            <button
              onClick={() => setPracticeTab('mc')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                practiceTab === 'mc'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              Paper 1 (MC Drill)
            </button>
            <button
              onClick={() => setPracticeTab('structured')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                practiceTab === 'structured'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Paper 2 (Structured)
            </button>
            <button
              onClick={() => setPracticeTab('report')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                practiceTab === 'report'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Diagnostic Report
            </button>
          </div>
        </div>
      </div>

      {/* Mode 1: Multiple Choice Practice */}
      {practiceTab === 'mc' && (
        <div className="space-y-6">
          {/* Filter Bar & Progress Indicator */}
          <div className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 shadow-sm">
            {/* Topic Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-stone-400" />
              <span className="text-xs font-bold text-stone-600 dark:text-stone-400">
                Filter Topic:
              </span>
              <div className="flex flex-wrap gap-1">
                {[
                  { id: 'all', labelEn: 'All Topics' },
                  { id: 'TR', labelEn: 'Total Revenue' },
                  { id: 'Ed', labelEn: 'Demand Elasticity' },
                  { id: 'Es', labelEn: 'Supply Elasticity' },
                  { id: 'Factors-Ed', labelEn: 'Ed Factors' },
                  { id: 'Straight-Line', labelEn: 'Straight Line' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => { setSelectedTopic(t.id); setCurrentMCIndex(0); }}
                    className={`px-2.5 py-1 text-xs rounded-md transition-colors cursor-pointer ${
                      selectedTopic === t.id
                        ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200 font-bold'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                    }`}
                  >
                    {t.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Score & Counter */}
            <div className="flex items-center gap-3 text-xs">
              <span className="text-stone-500">
                {`Question ${currentMCIndex + 1} of ${filteredMCs.length}`}
              </span>
              <span className="px-2.5 py-1 rounded-full font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                {`Score: ${correctCount} / ${answeredCount}`}
              </span>
            </div>
          </div>

          {/* Active Question Card */}
          {activeMC && (
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-sm space-y-5">
              {/* Question Header */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900">
                    HKDSE {activeMC.year} {activeMC.questionNumber}
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                    {activeMC.difficulty}
                  </span>
                </div>

                {/* Question Navigator */}
                <div className="flex items-center gap-1">
                  <button
                    disabled={currentMCIndex === 0}
                    onClick={() => setCurrentMCIndex(prev => Math.max(0, prev - 1))}
                    className="px-2.5 py-1 text-xs rounded border border-stone-200 dark:border-stone-700 disabled:opacity-30 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                  >
                    Prev
                  </button>
                  <button
                    disabled={currentMCIndex === filteredMCs.length - 1}
                    onClick={() => setCurrentMCIndex(prev => Math.min(filteredMCs.length - 1, prev + 1))}
                    className="px-2.5 py-1 text-xs rounded border border-stone-200 dark:border-stone-700 disabled:opacity-30 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <div className="text-sm font-semibold text-stone-900 dark:text-stone-100 leading-relaxed whitespace-pre-line">
                {activeMC.questionEn}
              </div>

              {/* Table Data if available (e.g. 2015 Q11, 2022 Q12) */}
              {activeMC.tableData && (
                <div className="overflow-x-auto my-3">
                  <table className="min-w-full text-xs border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden">
                    <thead className="bg-stone-100 dark:bg-stone-800 font-bold">
                      <tr>
                        {activeMC.tableData.headersEn.map((h, idx) => (
                          <th key={idx} className="p-2 border-r border-stone-200 dark:border-stone-700 last:border-r-0 text-left">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 dark:divide-stone-700 font-mono">
                      {activeMC.tableData.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-stone-50 dark:hover:bg-stone-850">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-2 border-r border-stone-200 dark:border-stone-700 last:border-r-0">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Options List */}
              <div className="space-y-2.5 pt-2">
                {activeMC.optionsEn.map((opt) => {
                  const isSelected = userAnswers[activeMC.id] === opt.label;
                  const isCorrect = activeMC.correctAnswer === opt.label;
                  const isAnswered = Boolean(userAnswers[activeMC.id]);

                  let btnStyle = 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-emerald-400 cursor-pointer';
                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-bold ring-1 ring-emerald-500 cursor-pointer';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-red-50 dark:bg-red-950/50 border-red-400 text-red-900 dark:text-red-100 cursor-pointer';
                    }
                  }

                  return (
                    <button
                      key={opt.label}
                      onClick={() => handleSelectMCAnswer(activeMC.id, opt.label)}
                      className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                        isAnswered && isCorrect
                          ? 'bg-emerald-600 text-white'
                          : isAnswered && isSelected && !isCorrect
                          ? 'bg-red-600 text-white'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                      }`}>
                        {opt.label}
                      </span>
                      <span className="flex-1 mt-0.5 leading-relaxed">
                        {opt.text}
                      </span>
                      {isAnswered && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      )}
                      {isAnswered && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Detailed Solution & HKDSE Examiner Insights */}
              {showExplanation[activeMC.id] && (
                <div className="mt-6 pt-5 border-t border-stone-200 dark:border-stone-800 space-y-4 animate-in fade-in duration-300">
                  {/* Correctness banner */}
                  <div className={`p-3 rounded-lg flex items-center justify-between text-xs font-bold ${
                    userAnswers[activeMC.id] === activeMC.correctAnswer
                      ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-200'
                      : 'bg-red-100 text-red-900 dark:bg-red-900/60 dark:text-red-200'
                  }`}>
                    <span>
                      {userAnswers[activeMC.id] === activeMC.correctAnswer
                        ? '✓ Correct Answer!'
                        : `✗ Incorrect. The correct answer is (${activeMC.correctAnswer}).`}
                    </span>
                    <span className="font-mono">
                      HKDSE Mark: {userAnswers[activeMC.id] === activeMC.correctAnswer ? '1 / 1' : '0 / 1'}
                    </span>
                  </div>

                  {/* Step-by-Step Marking Explanation */}
                  <div className="p-4 bg-stone-50 dark:bg-stone-950 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2 text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                    <div className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      Official Solution &amp; Economic Deduction:
                    </div>
                    <p className="whitespace-pre-line">
                      {activeMC.explanationEn}
                    </p>
                  </div>

                  {/* Key Takeaway */}
                  <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-900/50 text-xs text-emerald-950 dark:text-emerald-200">
                    <strong>Key DSE Takeaway:</strong>{' '}
                    {activeMC.keyTakeawayEn}
                  </div>

                  {/* Examiner Trap Warning */}
                  {activeMC.hkdseTrapEn && (
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900/50 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Common Student Misconception / Trap:</strong>{' '}
                        {activeMC.hkdseTrapEn}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Paper 2 Structured / Data-Response Questions */}
      {practiceTab === 'structured' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 4 cols: Question Selector */}
          <div className="lg:col-span-4 space-y-2.5">
            <h3 className="font-bold text-stone-700 dark:text-stone-300 text-xs uppercase tracking-wider px-1">
              Past Paper 2 Questions
            </h3>
            {dseStructuredQuestions.map((q) => {
              const isSelected = activeStructuredId === q.id;
              return (
                <button
                  key={q.id}
                  onClick={() => setActiveStructuredId(q.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-sm ring-1 ring-emerald-500'
                      : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono font-bold text-emerald-800 dark:text-emerald-300">
                      HKDSE {q.year}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                      {q.marks} Marks
                    </span>
                  </div>
                  <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
                    {q.titleEn}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    {q.questionRef}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right 8 cols: Question Workspace & Marking Rubrics */}
          <div className="lg:col-span-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-sm space-y-6">
            {/* Scenario Box */}
            <div className="p-4 bg-stone-50 dark:bg-stone-950 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-stone-500">
                  {currentStructured.questionRef}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200">
                  Total {currentStructured.marks} Marks
                </span>
              </div>
              <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                {currentStructured.titleEn}
              </h3>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed bg-white dark:bg-stone-900 p-3 rounded-lg border border-stone-200 dark:border-stone-800">
                {currentStructured.scenarioEn}
              </p>
            </div>

            {/* Sub-questions loop */}
            {currentStructured.subQuestions.map((sub, sIdx) => {
              const subKey = `${currentStructured.id}-${sub.part}`;
              const isShowingModel = showModelAnswer[subKey];

              // Calculate marks from checked criteria
              const earnedMarks = sub.rubricCriteria.reduce((acc, crit, cIdx) => {
                const critKey = `${subKey}-${cIdx}`;
                return acc + (checkedRubrics[critKey] ? crit.mark : 0);
              }, 0);

              return (
                <div key={sIdx} className="space-y-4 pt-2 border-t border-stone-100 dark:border-stone-800">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      {sub.part} {sub.questionEn}
                    </h4>
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 shrink-0">
                      ({sub.marks}M)
                    </span>
                  </div>

                  {/* Structured Hints */}
                  <div className="p-3 bg-sky-50/60 dark:bg-sky-950/20 rounded-lg border border-sky-200 dark:border-sky-900/40 space-y-1">
                    <span className="text-[11px] font-bold text-sky-800 dark:text-sky-300 flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5" />
                      Examination Answering Hints &amp; Steps:
                    </span>
                    <ul className="list-disc list-inside text-[11px] text-stone-700 dark:text-stone-300 space-y-0.5">
                      {sub.hintsEn.map((hint, hIdx) => (
                        <li key={hIdx}>{hint}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Student Answer Box */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Type your draft answer / explanation here:
                    </label>
                    <textarea
                      rows={4}
                      value={studentText[subKey] || ''}
                      onChange={(e) => setStudentText({ ...studentText, [subKey]: e.target.value })}
                      placeholder="1. Condition: Demand is inelastic (|Ed| < 1)..."
                      className="w-full p-3 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-lg text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  {/* Toggle Model Answer & Marking Scheme */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => setShowModelAnswer({ ...showModelAnswer, [subKey]: !isShowingModel })}
                      className="px-3.5 py-1.5 text-xs font-bold bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      {isShowingModel
                        ? 'Hide Official Marking Scheme'
                        : 'View Official Marking Scheme & Model Answer'}
                    </button>

                    <div className="text-xs font-bold text-stone-600 dark:text-stone-400">
                      {`Self-Assessed Score: ${earnedMarks} / ${sub.marks}`}
                    </div>
                  </div>

                  {/* Marking Scheme & Model Answer Box */}
                  {isShowingModel && (
                    <div className="p-4 bg-stone-50 dark:bg-stone-950 rounded-xl border border-emerald-300 dark:border-emerald-800 space-y-4 animate-in fade-in duration-200">
                      {/* Rubric Criteria Checklist */}
                      <div>
                        <h5 className="font-bold text-xs text-stone-800 dark:text-stone-200 mb-2">
                          Official Mark Allocation Criteria (Click to Check Your Marks):
                        </h5>
                        <div className="space-y-2">
                          {sub.rubricCriteria.map((crit, cIdx) => {
                            const critKey = `${subKey}-${cIdx}`;
                            const isChecked = checkedRubrics[critKey];
                            return (
                              <button
                                key={cIdx}
                                onClick={() => handleToggleRubric(critKey)}
                                className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all flex items-start gap-2.5 cursor-pointer ${
                                  isChecked
                                    ? 'bg-emerald-100/70 border-emerald-400 text-emerald-950 dark:bg-emerald-950/60 dark:border-emerald-700 dark:text-emerald-200'
                                    : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                                }`}
                              >
                                {isChecked ? (
                                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                ) : (
                                  <Square className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                                )}
                                <div className="flex-1">
                                  <span className="font-semibold">
                                    {crit.criterionEn}
                                  </span>
                                </div>
                                <span className="px-1.5 py-0.5 rounded font-mono font-bold text-[10px] bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                                  +{crit.mark}M
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Full Model Answer */}
                      <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
                        <h5 className="font-bold text-xs text-emerald-800 dark:text-emerald-300 mb-1">
                          Full Level 5** Model Answer:
                        </h5>
                        <div className="p-3 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800 text-xs text-stone-800 dark:text-stone-200 whitespace-pre-line leading-relaxed font-sans">
                          {sub.modelAnswerEn}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mode 3: Diagnostic Report */}
      {practiceTab === 'report' && (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800">
            <div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                HKDSE Economics Performance Diagnostic
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Based on your interactive exercises, MC calculations, and structured question practice.
              </p>
            </div>

            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block">
                Predicted HKDSE Grade
              </span>
              <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400 font-mono">
                {getEstimatedDseLevel(accuracyPercent)}
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-stone-50 dark:bg-stone-850 rounded-xl border border-stone-200 dark:border-stone-700 text-center">
              <span className="text-xs text-stone-500 font-semibold">Questions Attempted</span>
              <div className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-mono mt-1">
                {answeredCount} / {dseMCQuestions.length}
              </div>
            </div>
            <div className="p-4 bg-stone-50 dark:bg-stone-850 rounded-xl border border-stone-200 dark:border-stone-700 text-center">
              <span className="text-xs text-stone-500 font-semibold">MC Accuracy Rate</span>
              <div className="text-2xl font-bold text-emerald-600 font-mono mt-1">
                {accuracyPercent}%
              </div>
            </div>
            <div className="p-4 bg-stone-50 dark:bg-stone-850 rounded-xl border border-stone-200 dark:border-stone-700 text-center">
              <span className="text-xs text-stone-500 font-semibold">Correct Answers</span>
              <div className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-mono mt-1">
                {correctCount}
              </div>
            </div>
          </div>

          {/* Topic-by-Topic Breakdown */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-stone-700 dark:text-stone-300 uppercase tracking-wider">
              Topic Mastery Breakdown
            </h4>

            {[
              { id: 'TR', nameEn: 'Total Revenue & Elasticity (Gain vs Loss Box)' },
              { id: 'Ed', nameEn: 'Demand Elasticity & Arc Formula (Average Method)' },
              { id: 'Es', nameEn: 'Supply Elasticity & Intercept Rules (P/Q/Origin)' },
              { id: 'Factors-Ed', nameEn: 'Factors Affecting Ed (Substitutes, Proportion, etc.)' },
              { id: 'Straight-Line', nameEn: 'Straight-Line Demand Elasticity Variations' }
            ].map(t => {
              const topicQuestions = dseMCQuestions.filter(q => q.topic === t.id);
              const topicAnswered = topicQuestions.filter(q => userAnswers[q.id]);
              const topicCorrect = topicQuestions.filter(q => userAnswers[q.id] === q.correctAnswer);
              const pct = topicAnswered.length > 0 ? Math.round((topicCorrect.length / topicAnswered.length) * 100) : 0;

              return (
                <div key={t.id} className="p-3 bg-stone-50 dark:bg-stone-850 rounded-lg border border-stone-200 dark:border-stone-700 space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-stone-900 dark:text-stone-100">
                      {t.nameEn}
                    </span>
                    <span className="font-mono text-stone-600 dark:text-stone-400">
                      {topicCorrect.length} / {topicQuestions.length} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-stone-200 dark:bg-stone-700 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.max(5, pct)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
