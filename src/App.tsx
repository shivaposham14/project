import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  TrendingUp, 
  ArrowRight, 
  ArrowLeft,
  ChevronDown, 
  BookOpen, 
  Cpu, 
  Globe, 
  Shield, 
  Cloud, 
  Database,
  Code2,
  Layout,
  FileText,
  Download,
  Share2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  PieChart as PieChartIcon,
  Layers,
  Zap,
  Briefcase,
  Wrench,
  Columns
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { generateCurriculum, analyzeTrends } from './services/geminiService';
import { CurriculumData, IndustryTrend } from './types';
import { cn } from './lib/utils';

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-bottom border-zinc-200">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <GraduationCap className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-xl tracking-tight text-zinc-900">CurricuForge</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
        <a href="#generate" className="hover:text-indigo-600 transition-colors">Generator</a>
        <a href="#trends" className="hover:text-indigo-600 transition-colors">Trends</a>
        <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
      </div>
      <button className="bg-zinc-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 transition-all">
        Get Started
      </button>
    </div>
  </nav>
);

const Hero = ({ onAction }: { onAction: (type: 'generate' | 'trends') => void }) => (
  <section className="min-h-screen flex flex-col items-center justify-center pt-20 px-4 text-center bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6">
        <Zap className="w-3 h-3" /> AI-Powered Academic Design
      </div>
      <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 mb-6 tracking-tight leading-[1.1]">
        Forge the Future of <span className="text-indigo-600">Education.</span>
      </h1>
      <p className="text-lg text-zinc-600 mb-10 leading-relaxed">
        Design industry-aligned, accreditation-ready curricula in seconds. 
        Bridge the gap between academia and the evolving job market with AI-driven insights.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={() => onAction('generate')}
          className="group flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
        >
          Generate Curriculum <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
        <button 
          onClick={() => onAction('trends')}
          className="flex items-center justify-center gap-2 bg-white text-zinc-900 border border-zinc-200 px-8 py-4 rounded-2xl font-semibold hover:bg-zinc-50 transition-all"
        >
          View Industry Trends <TrendingUp className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
    
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
    >
      <ChevronDown className="text-zinc-400" />
    </motion.div>
  </section>
);

const TrendDashboard = ({ trends }: { trends: IndustryTrend[] }) => {
  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <section id="trends" className="py-24 bg-white px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 mb-4">Industry Trends Dashboard</h2>
          <p className="text-zinc-600">Real-time analysis of technology adoption and job market demand.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {['Stable', 'Growing', 'Emerging'].map((cat) => (
            <div key={cat} className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                {cat === 'Stable' && <Shield className="w-5 h-5 text-emerald-600" />}
                {cat === 'Growing' && <TrendingUp className="w-5 h-5 text-indigo-600" />}
                {cat === 'Emerging' && <Cpu className="w-5 h-5 text-amber-600" />}
                {cat} Technologies
              </h3>
              <div className="space-y-4">
                {trends.filter(t => t.category === cat).map(t => (
                  <div key={t.name} className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-zinc-900">{t.name}</span>
                      <span className="text-xs font-medium px-2 py-1 bg-zinc-100 rounded-full">{t.adoption}% Adoption</span>
                    </div>
                    <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full",
                          cat === 'Stable' ? "bg-emerald-500" : cat === 'Growing' ? "bg-indigo-500" : "bg-amber-500"
                        )}
                        style={{ width: `${t.adoption}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-zinc-900 rounded-3xl p-8 text-white">
            <h3 className="text-xl font-bold mb-8">Technology Growth (2018–2024)</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trends[0]?.growth || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="year" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} dot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100">
            <h3 className="text-xl font-bold mb-8 text-zinc-900">Market Demand Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trends.slice(0, 5)}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="demand"
                  >
                    {trends.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-4 justify-center mt-4">
              {trends.slice(0, 5).map((t, i) => (
                <div key={t.name} className="flex items-center gap-2 text-xs font-medium text-zinc-600">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  {t.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const GeneratorForm = ({ onGenerate }: { onGenerate: (data: any) => void }) => {
  const [mode, setMode] = useState<'institutional' | 'external' | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    institutionName: '',
    accreditation: 'NAAC',
    degree: 'B.Tech',
    duration: '4 Years',
    credits: 160,
    alignment: 80,
    internship: true,
    capstone: true,
    branch: 'CSE',
    specialization: 'AI/ML'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await generateCurriculum({ mode, ...formData });
      onGenerate(result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!mode) {
    return (
      <section id="generate" className="py-24 px-4 bg-zinc-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-zinc-900 mb-12">Choose Your Path</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <button 
              onClick={() => setMode('institutional')}
              className="group bg-white p-10 rounded-[2.5rem] border border-zinc-200 hover:border-indigo-600 transition-all text-left shadow-sm hover:shadow-xl hover:shadow-indigo-50"
            >
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-3">Institutional Design</h3>
              <p className="text-zinc-600 mb-6">Accreditation-ready curricula for universities and colleges with OBE mapping.</p>
              <div className="flex items-center gap-2 text-indigo-600 font-semibold">
                Start Building <ArrowRight className="w-4 h-4" />
              </div>
            </button>

            <button 
              onClick={() => setMode('external')}
              className="group bg-white p-10 rounded-[2.5rem] border border-zinc-200 hover:border-indigo-600 transition-all text-left shadow-sm hover:shadow-xl hover:shadow-indigo-50"
            >
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-3">External / Personal</h3>
              <p className="text-zinc-600 mb-6">Student-focused, industry-aligned learning paths for self-improvement.</p>
              <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                Start Building <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="generate" className="py-24 px-4 bg-zinc-50">
      <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] p-10 border border-zinc-200 shadow-xl">
        <button onClick={() => setMode(null)} className="text-sm text-zinc-500 hover:text-indigo-600 mb-8 flex items-center gap-1">
          <ArrowRight className="w-4 h-4 rotate-180" /> Back to selection
        </button>
        
        <h2 className="text-3xl font-bold text-zinc-900 mb-8">
          {mode === 'institutional' ? 'Institutional Configuration' : 'Personal Learning Path'}
        </h2>

        {error && (
          <div className="mb-8 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-medium">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'institutional' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Institution Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="e.g. Stanford University"
                  value={formData.institutionName}
                  onChange={e => setFormData({...formData, institutionName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700">Accreditation Type</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.accreditation}
                  onChange={e => setFormData({...formData, accreditation: e.target.value})}
                >
                  <option>NAAC</option>
                  <option>NBA</option>
                  <option>Autonomous</option>
                  <option>ABET</option>
                </select>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700">Degree Type</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.degree}
                onChange={e => setFormData({...formData, degree: e.target.value})}
              >
                <option>B.Tech</option>
                <option>M.Tech</option>
                <option>B.Sc</option>
                <option>Diploma</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700">Branch</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.branch}
                onChange={e => setFormData({...formData, branch: e.target.value})}
              >
                <option>CSE</option>
                <option>IT</option>
                <option>ECE</option>
                <option>Mechanical</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700">Specialization</label>
            <select 
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={formData.specialization}
              onChange={e => setFormData({...formData, specialization: e.target.value})}
            >
              <option>AI/ML</option>
              <option>Data Science</option>
              <option>Cybersecurity</option>
              <option>Cloud & DevOps</option>
              <option>Web3</option>
              <option>Full Stack</option>
            </select>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-zinc-700">Industry Alignment Target</label>
              <span className="text-indigo-600 font-bold">{formData.alignment}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              value={formData.alignment}
              onChange={e => setFormData({...formData, alignment: parseInt(e.target.value)})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <label className="flex items-center gap-3 p-4 rounded-2xl border border-zinc-200 cursor-pointer hover:bg-zinc-50 transition-all">
              <input 
                type="checkbox" 
                className="w-5 h-5 accent-indigo-600" 
                checked={formData.internship}
                onChange={e => setFormData({...formData, internship: e.target.checked})}
              />
              <span className="text-sm font-medium text-zinc-700">Include Internship</span>
            </label>
            <label className="flex items-center gap-3 p-4 rounded-2xl border border-zinc-200 cursor-pointer hover:bg-zinc-50 transition-all">
              <input 
                type="checkbox" 
                className="w-5 h-5 accent-indigo-600" 
                checked={formData.capstone}
                onChange={e => setFormData({...formData, capstone: e.target.checked})}
              />
              <span className="text-sm font-medium text-zinc-700">Include Capstone</span>
            </label>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Forging Curriculum...
              </>
            ) : (
              <>
                Generate Curriculum
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

const CurriculumDisplay = ({ data, onReset, onCompare }: { data: CurriculumData, onReset: () => void, onCompare: () => void }) => {
  const [activeSem, setActiveSem] = useState(1);

  const activeSemesterData = data.semesters.find(s => s.semester === activeSem);

  return (
    <div className="min-h-screen bg-zinc-50 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={onReset}
            className="flex items-center gap-2 text-zinc-500 hover:text-indigo-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Generator
          </button>
          <button 
            onClick={onCompare}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors font-bold text-sm uppercase tracking-wider"
          >
            <Columns className="w-4 h-4" /> Compare with another
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-widest mb-2">
              <CheckCircle2 className="w-4 h-4" /> Generation Complete
            </div>
            <h1 className="text-4xl font-bold text-zinc-900">{data.degree} in {data.branch}</h1>
            <p className="text-zinc-600">Specialization: {data.specialization} • Total Credits: {data.total_credits}</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white text-zinc-900 border border-zinc-200 px-5 py-2.5 rounded-xl font-semibold hover:bg-zinc-50 transition-all shadow-sm">
              <Download className="w-4 h-4" /> Export PDF
            </button>
            <button onClick={onReset} className="flex items-center gap-2 bg-zinc-900 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-zinc-800 transition-all shadow-sm">
              <RefreshCw className="w-4 h-4" /> Regenerate
            </button>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-indigo-600">{data.industry_score}%</span>
            </div>
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Industry Score</h3>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-emerald-600">8</span>
            </div>
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Semesters</h3>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-amber-600">{data.semesters.reduce((acc, s) => acc + s.subjects.length, 0)}</span>
            </div>
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Total Subjects</h3>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center text-rose-600">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-rose-600">{data.total_credits}</span>
            </div>
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Total Credits</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Semester Navigation & Table */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-zinc-200 shadow-sm overflow-hidden">
              <div className="flex border-b border-zinc-100 overflow-x-auto no-scrollbar">
                {data.semesters.map(s => (
                  <button
                    key={s.semester}
                    onClick={() => setActiveSem(s.semester)}
                    className={cn(
                      "px-8 py-5 text-sm font-bold transition-all whitespace-nowrap",
                      activeSem === s.semester 
                        ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50" 
                        : "text-zinc-500 hover:text-zinc-900"
                    )}
                  >
                    Semester {s.semester}
                  </button>
                ))}
              </div>
              <div className="p-8">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100">
                      <th className="pb-4">Code</th>
                      <th className="pb-4">Subject Name</th>
                      <th className="pb-4">Type</th>
                      <th className="pb-4 text-center">Credits</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50">
                    {data.semesters.find(s => s.semester === activeSem)?.subjects.map(sub => (
                      <tr key={sub.code} className="group hover:bg-zinc-50 transition-colors">
                        <td className="py-4 font-mono text-xs text-zinc-500">{sub.code}</td>
                        <td className="py-4 font-bold text-zinc-900">
                          {sub.name}
                          {sub.lab_required && <span className="ml-2 text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded uppercase">Lab</span>}
                        </td>
                        <td className="py-4">
                          <span className={cn(
                            "text-[10px] font-bold px-2 py-1 rounded-full uppercase",
                            sub.type === 'Core' ? "bg-emerald-100 text-emerald-700" :
                            sub.type === 'Adaptive' ? "bg-indigo-100 text-indigo-700" :
                            sub.type === 'Emerging' ? "bg-amber-100 text-amber-700" :
                            "bg-zinc-100 text-zinc-700"
                          )}>
                            {sub.type}
                          </span>
                        </td>
                        <td className="py-4 text-center font-bold text-zinc-900">{sub.credits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Subject Details Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-indigo-600" /> Subject Insights (Semester {activeSem})
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {activeSemesterData?.subjects.map(sub => (
                  <motion.div 
                    key={sub.code}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 rounded-[2rem] border border-zinc-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                      <div>
                        <div className="text-xs font-mono text-zinc-400 mb-1">{sub.code}</div>
                        <h4 className="text-xl font-bold text-zinc-900">{sub.name}</h4>
                      </div>
                      <span className={cn(
                        "text-[10px] font-bold px-3 py-1 rounded-full uppercase",
                        sub.type === 'Core' ? "bg-emerald-100 text-emerald-700" :
                        sub.type === 'Adaptive' ? "bg-indigo-100 text-indigo-700" :
                        sub.type === 'Emerging' ? "bg-amber-100 text-amber-700" :
                        "bg-zinc-100 text-zinc-700"
                      )}>
                        {sub.type}
                      </span>
                    </div>
                    
                    <p className="text-zinc-600 text-sm mb-6 leading-relaxed">
                      {sub.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                          <Wrench className="w-3 h-3" /> Tools & Technologies
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {sub.tools.map(tool => (
                            <span key={tool} className="text-xs bg-zinc-100 text-zinc-700 px-3 py-1 rounded-lg border border-zinc-200">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                          <Briefcase className="w-3 h-3" /> Future Employment
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {sub.employment.map(job => (
                            <span key={job} className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg border border-indigo-100">
                              {job}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 rounded-[2.5rem] p-10 text-white">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-indigo-400" /> AI Recommendations
              </h3>
              <ul className="space-y-4">
                {data.recommendations.map((rec, i) => (
                  <li key={i} className="flex gap-3 text-zinc-400 text-sm leading-relaxed">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar Analytics */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm">
              <h3 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                <PieChartIcon className="w-5 h-5 text-indigo-600" /> Layer Distribution
              </h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.analytics.layer_distribution}
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {data.analytics.layer_distribution.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={['#4f46e5', '#10b981', '#f59e0b'][index % 3]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3 mt-4">
                {data.analytics.layer_distribution.map((item, i) => (
                  <div key={item.name} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-zinc-600">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ['#4f46e5', '#10b981', '#f59e0b'][i % 3] }} />
                      {item.name}
                    </div>
                    <span className="font-bold text-zinc-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm">
              <h3 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-600" /> Skill Mapping
              </h3>
              <div className="space-y-4">
                {data.skill_mapping.map(skill => (
                  <div key={skill.skill} className="space-y-2">
                    <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{skill.skill}</div>
                    <div className="flex flex-wrap gap-2">
                      {skill.subjects.map(s => (
                        <span key={s} className="text-[10px] bg-zinc-100 text-zinc-600 px-2 py-1 rounded-lg">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ComparisonView = ({ curricula, onBack }: { curricula: CurriculumData[], onBack: () => void }) => {
  const [activeSem, setActiveSem] = useState(1);

  return (
    <div className="min-h-screen bg-zinc-50 pt-24 pb-12 px-4">
      <div className="max-w-full mx-auto px-4 lg:px-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-500 hover:text-indigo-600 transition-colors mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to View
        </button>

        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold text-zinc-900">Curriculum Comparison</h1>
          <div className="flex bg-white p-1 rounded-2xl border border-zinc-200">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
              <button
                key={s}
                onClick={() => setActiveSem(s)}
                className={cn(
                  "w-10 h-10 rounded-xl text-sm font-bold transition-all",
                  activeSem === s ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "text-zinc-400 hover:text-zinc-900"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {curricula.map((curr, idx) => (
            <div key={idx} className="space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-2">
                  Curriculum {idx + 1}
                </div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-1">{curr.degree} in {curr.branch}</h2>
                <p className="text-sm text-zinc-500 mb-6">{curr.specialization} • Industry Score: {curr.industry_score}%</p>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-2">
                    Semester {activeSem} Subjects
                  </h3>
                  <div className="space-y-3">
                    {curr.semesters.find(s => s.semester === activeSem)?.subjects.map(sub => (
                      <div key={sub.code} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-bold text-zinc-900">{sub.name}</div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-zinc-200 uppercase">
                            {sub.credits} CR
                          </span>
                        </div>
                        <div className="text-xs text-zinc-500 leading-relaxed line-clamp-2">{sub.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm">
                <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-4">Skill Focus</h3>
                <div className="flex flex-wrap gap-2">
                  {curr.skill_mapping.slice(0, 8).map(skill => (
                    <span key={skill.skill} className="text-[10px] bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-bold uppercase">
                      {skill.skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'home' | 'generate' | 'trends' | 'result' | 'compare'>('home');
  const [trends, setTrends] = useState<IndustryTrend[]>([]);
  const [curricula, setCurricula] = useState<CurriculumData[]>([]);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const data = await analyzeTrends();
        setTrends(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTrends();
  }, []);

  const handleAction = (type: 'generate' | 'trends') => {
    setView(type);
    const element = document.getElementById(type);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGenerate = (data: CurriculumData) => {
    setCurricula(prev => [data, ...prev].slice(0, 5)); // Keep last 5
    setView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      
      {view === 'result' && curricula[0] ? (
        <CurriculumDisplay 
          data={curricula[0]} 
          onReset={() => setView('home')} 
          onCompare={() => setView('compare')}
        />
      ) : view === 'compare' ? (
        <ComparisonView 
          curricula={curricula.slice(0, 2)} 
          onBack={() => setView('result')} 
        />
      ) : (
        <main>
          <Hero onAction={handleAction} />
          <GeneratorForm onGenerate={handleGenerate} />
          <TrendDashboard trends={trends} />
          
          <section id="about" className="py-24 bg-zinc-900 text-white px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-8">Responsible AI in Education</h2>
                <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                  CurricuForge uses advanced LLMs to analyze thousands of industry job descriptions, 
                  academic standards, and technological roadmaps to ensure your curriculum is not just 
                  accredited, but future-proof.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-3xl font-bold text-indigo-400 mb-2">100%</div>
                    <div className="text-sm text-zinc-500 uppercase font-bold tracking-widest">OBE Compliant</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-emerald-400 mb-2">24/7</div>
                    <div className="text-sm text-zinc-500 uppercase font-bold tracking-widest">Market Monitoring</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-indigo-600 to-violet-700 overflow-hidden shadow-2xl shadow-indigo-500/20">
                  <img 
                    src="https://picsum.photos/seed/edu/800/800" 
                    alt="Education" 
                    className="w-full h-full object-cover mix-blend-overlay opacity-50"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="text-center">
                      <GraduationCap className="w-20 h-20 mx-auto mb-6 text-white" />
                      <div className="text-2xl font-bold">Empowering Institutions</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      <footer className="py-12 border-t border-zinc-200 bg-white px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
              <GraduationCap className="text-white w-4 h-4" />
            </div>
            <span className="font-bold text-zinc-900">CurricuForge</span>
          </div>
          <div className="text-sm text-zinc-500">
            © 2026 CurricuForge AI. All rights reserved.
          </div>
          <div className="flex gap-6 text-zinc-400">
            <Share2 className="w-5 h-5 cursor-pointer hover:text-indigo-600 transition-colors" />
            <Globe className="w-5 h-5 cursor-pointer hover:text-indigo-600 transition-colors" />
            <Shield className="w-5 h-5 cursor-pointer hover:text-indigo-600 transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
}
