
import React, { useState, useMemo, useEffect } from 'react';
import { EffortUnit, Config } from './types';
import { convertToHours, convertFromHours, formatValue } from './services/conversionService';
import { 
  ClockIcon, 
  CalendarIcon, 
  SettingsIcon, 
  ArrowRightIcon, 
  CalculatorIcon 
} from './components/icons';

const App: React.FC = () => {
  // State for Conversion
  const [inputValue, setInputValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<EffortUnit>(EffortUnit.DAYS);
  const [toUnit, setToUnit] = useState<EffortUnit>(EffortUnit.HOURS);
  
  // State for Configuration
  const [config, setConfig] = useState<Config>({
    hoursPerDay: 8,
    daysPerWeek: 5,
    daysPerMonth: 20
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Derived Values
  const result = useMemo(() => {
    const hours = convertToHours(inputValue, fromUnit, config);
    return convertFromHours(hours, toUnit, config);
  }, [inputValue, fromUnit, toUnit, config]);

  const breakdown = useMemo(() => {
    const hours = convertToHours(inputValue, fromUnit, config);
    return Object.values(EffortUnit).map(unit => ({
      unit,
      value: convertFromHours(hours, unit, config)
    }));
  }, [inputValue, fromUnit, config]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setInputValue(isNaN(val) ? 0 : val);
  };

  const handleConfigChange = (key: keyof Config, val: string) => {
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      setConfig(prev => ({ ...prev, [key]: num }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-slate-50">
      {/* Header */}
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2 text-indigo-600">
          <CalculatorIcon />
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">EffortFlow</h1>
        </div>
        <p className="text-slate-500 max-w-md mx-auto">
          Converter effort
        </p>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Input & Calculator Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Conversion</h2>
              <button 
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className={`p-2 rounded-xl transition-colors ${isSettingsOpen ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                title="Toggle Settings"
              >
                <SettingsIcon />
              </button>
            </div>

            {/* Settings Overlay / Section */}
            {isSettingsOpen && (
              <div className="mb-8 p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100 animate-in fade-in slide-in-from-top-4 duration-300">
                <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <SettingsIcon /> Work Schedule Settings
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Hours / Day</label>
                    <input 
                      type="number" 
                      value={config.hoursPerDay}
                      onChange={(e) => handleConfigChange('hoursPerDay', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Days / Week</label>
                    <input 
                      type="number" 
                      value={config.daysPerWeek}
                      onChange={(e) => handleConfigChange('daysPerWeek', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Days / Month</label>
                    <input 
                      type="number" 
                      value={config.daysPerMonth}
                      onChange={(e) => handleConfigChange('daysPerMonth', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Inputs */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 ml-1">Value</label>
                  <input 
                    type="number" 
                    value={inputValue === 0 ? '' : inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter amount..."
                    className="w-full text-2xl font-bold bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 ml-1">From Unit</label>
                  <select 
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value as EffortUnit)}
                    className="w-full text-lg font-semibold bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all appearance-none cursor-pointer"
                  >
                    {Object.values(EffortUnit).map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-center py-2">
                <div className="bg-indigo-600 text-white p-3 rounded-full shadow-lg shadow-indigo-200 rotate-90 md:rotate-0">
                  <ArrowRightIcon />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 order-2 md:order-1">
                  <label className="text-sm font-medium text-slate-600 ml-1">Result</label>
                  <div className="w-full text-2xl font-bold bg-indigo-50 text-indigo-700 border-2 border-transparent rounded-2xl px-5 py-4 transition-all flex items-center">
                    {formatValue(result)}
                  </div>
                </div>
                <div className="space-y-2 order-1 md:order-2">
                  <label className="text-sm font-medium text-slate-600 ml-1">To Unit</label>
                  <select 
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value as EffortUnit)}
                    className="w-full text-lg font-semibold bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all appearance-none cursor-pointer"
                  >
                    {Object.values(EffortUnit).map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer of Card */}
          <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-400 flex justify-between">
            <span>Basis: {config.hoursPerDay}h/day, {config.daysPerWeek}d/week</span>
            <span>EffortFlow v1.0</span>
          </div>
        </div>

        {/* Breakdown Panel */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8 flex-1">
            <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <ClockIcon /> Full Breakdown
            </h2>
            <div className="space-y-4">
              {breakdown.map(({ unit, value }) => (
                <div key={unit} className="group p-4 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all flex justify-between items-center">
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">{unit}</span>
                    <span className="text-2xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                      {formatValue(value)}
                    </span>
                  </div>
                  <div className="text-slate-200 group-hover:text-indigo-200 transition-colors">
                    {unit === EffortUnit.HOURS ? <ClockIcon /> : <CalendarIcon />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200">
            <h3 className="text-lg font-semibold mb-2">Quick Reference</h3>
            <div className="space-y-2 text-indigo-100 text-sm">
              <p>• 1 Man-Week = {config.daysPerWeek} Man-Days</p>
              <p>• 1 Man-Month = {config.daysPerMonth} Man-Days</p>
              <p>• 1 Man-Day = {config.hoursPerDay} Man-Hours</p>
            </div>
            <div className="mt-6 pt-6 border-t border-indigo-500/50 flex items-center gap-4">
               <div className="bg-indigo-500 p-2 rounded-lg">
                 <CalculatorIcon />
               </div>
               <p className="text-xs leading-relaxed opacity-80">
                 Calculations are based on your custom work schedule set in the conversion settings.
               </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="mt-12 text-slate-400 text-sm text-center">
        <p>© {new Date().getFullYear()} Created by Daffa Daniarfa</p>
      </footer>
    </div>
  );
};

export default App;
