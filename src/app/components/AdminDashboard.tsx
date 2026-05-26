import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Leaf, LogOut, Menu, X, Calendar, Filter, FileText, CheckSquare, MessageSquare, BarChart3, Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type TabType = 'all' | 'charter' | 'csm' | 'feedback';

const COLORS = ['#2E7D32', '#4CAF50', '#66BB6A', '#81C784', '#A5D6A7'];

// Expanded mock data to test pagination
const mockResponses = [
  { id: 1, date: '2026-05-01', clientType: 'Citizen', beneficiaryType: 'Individual', beneficiaryInfo: 'Farmer', name: 'Juan Dela Cruz', address: 'Brgy. San Jose, Bayombong, Nueva Vizcaya', intervention: 'Production Support' },
  { id: 2, date: '2026-05-02', clientType: 'Business', beneficiaryType: 'Group', beneficiaryInfo: 'FCA', name: 'Maria Santos', address: 'Brgy. Poblacion, Solano, Nueva Vizcaya', intervention: 'Training' },
  { id: 3, date: '2026-05-03', clientType: 'Government', beneficiaryType: 'Group', beneficiaryInfo: 'LGU', name: 'Pedro Reyes', address: 'Brgy. Bagumbayan, Bambang, Nueva Vizcaya', intervention: 'Equipment/Machinery' },
  { id: 4, date: '2026-05-10', clientType: 'Citizen', beneficiaryType: 'Individual', beneficiaryInfo: 'Fisher', name: 'Elena Gomez', address: 'Brgy. San Antonio, Aparri, Nueva Vizcaya', intervention: 'Production Support' },
  { id: 5, date: '2026-05-15', clientType: 'Business', beneficiaryType: 'Individual', beneficiaryInfo: 'Farmer', name: 'Ricardo Garcia', address: 'Brgy. Roxas, Solano, Nueva Vizcaya', intervention: 'Market Services' },
  { id: 6, date: '2026-05-20', clientType: 'Citizen', beneficiaryType: 'Group', beneficiaryInfo: 'FCA', name: 'Luis Fernando', address: 'Brgy. Magsaysay, Bayombong, Nueva Vizcaya', intervention: 'Training' },
  { id: 7, date: '2026-05-25', clientType: 'Government', beneficiaryType: 'Individual', beneficiaryInfo: 'AEW', name: 'Carmen Silva', address: 'Brgy. Don Tomas, Bambang, Nueva Vizcaya', intervention: 'Equipment/Machinery' },
  { id: 8, date: '2026-05-26', clientType: 'Citizen', beneficiaryType: 'Individual', beneficiaryInfo: 'Farmer', name: 'Jose Rizal', address: 'Brgy. Quirino, Solano, Nueva Vizcaya', intervention: 'Production Support' },
];

const mockFeedback = [
  { id: 1, date: '2026-05-01', intervention: 'Production Support', details: 'Seeds and fertilizer distribution', qty: '50 bags', suggestion: 'More timely distribution would be helpful. The seeds arrived late in the planting season which affected our timing.' },
  { id: 2, date: '2026-05-02', intervention: 'Training', details: 'Modern farming techniques workshop', qty: '25 participants', suggestion: 'Excellent training! Would appreciate more hands-on demonstrations and follow-up sessions.' },
  { id: 3, date: '2026-05-15', intervention: 'Market Services', details: 'Market linking assistance', qty: 'N/A', suggestion: 'The service was good, but the waiting time in the office was a bit long.' },
  { id: 4, date: '2026-05-25', intervention: 'Equipment/Machinery', details: 'Tractor distribution', qty: '1 unit', suggestion: 'Thank you for the tractor. It will greatly help our cooperative.' }
];

const cc1Data = [
  { name: 'Strongly Agree', value: 45, fill: '#2E7D32' },
  { name: 'Agree', value: 35, fill: '#4CAF50' },
  { name: 'Neutral', value: 15, fill: '#81C784' },
  { name: 'Do not know', value: 5, fill: '#A5D6A7' }
];

const cc2Data = [
  { name: 'Strongly Agree', value: 40, fill: '#2E7D32' },
  { name: 'Agree', value: 38, fill: '#4CAF50' },
  { name: 'Neutral', value: 18, fill: '#81C784' },
  { name: 'N/A', value: 4, fill: '#E0E0E0' }
];

const cc3Data = [
  { name: 'Strongly Agree', value: 42, fill: '#2E7D32' },
  { name: 'Agree', value: 36, fill: '#4CAF50' },
  { name: 'Neutral', value: 17, fill: '#81C784' },
  { name: 'N/A', value: 5, fill: '#E0E0E0' }
];

const csmData = [
  { question: 'Q1: Responsiveness', mean: 4.3, fill: '#4CAF50' },
  { question: 'Q2: Reliability', mean: 4.2, fill: '#4CAF50' },
  { question: 'Q3: Access & Facilities', mean: 4.0, fill: '#66BB6A' },
  { question: 'Q4: Communication', mean: 4.1, fill: '#4CAF50' },
  { question: 'Q5: Costs', mean: 3.8, fill: '#81C784' },
  { question: 'Q6: Integrity', mean: 3.9, fill: '#81C784' },
  { question: 'Q7: Assurance', mean: 3.7, fill: '#81C784' },
  { question: 'Q8: Outcome', mean: 4.2, fill: '#4CAF50' }
];

const timelinessData = [
  { name: '1 - Strongly Disagree', value: 2, fill: '#8B0000' },
  { name: '2 - Disagree', value: 5, fill: '#FF6B6B' },
  { name: '3 - Neutral', value: 15, fill: '#FFD93D' },
  { name: '4 - Agree', value: 38, fill: '#81C784' },
  { name: '5 - Strongly Agree', value: 40, fill: '#2E7D32' }
];

const overallData = [
  { name: '1 - Strongly Disagree', value: 1, fill: '#8B0000' },
  { name: '2 - Disagree', value: 3, fill: '#FF6B6B' },
  { name: '3 - Neutral', value: 10, fill: '#FFD93D' },
  { name: '4 - Agree', value: 42, fill: '#81C784' },
  { name: '5 - Strongly Agree', value: 44, fill: '#2E7D32' }
];

function DoughnutChartWithMean({ data, mean, title }: { data: any[], mean: number, title: string }) {
  return (
    <div className="flex flex-col items-center p-6 bg-card rounded-2xl shadow-sm border border-border/50 h-full">
      <h3 className="mb-6 text-base font-bold text-foreground self-start">{title}</h3>
      <div className="relative w-full aspect-square max-w-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart id={`pie-chart-${title.replace(/\s+/g, '-')}`}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="90%"
              dataKey="value"
              nameKey="name"
              paddingAngle={2}
              stroke="none"
              label={false}
            >
              {data.map((entry) => (
                <Cell key={`pie-cell-${title.replace(/\s+/g, '-')}-${entry.name.replace(/\s+/g, '-')}`} fill={entry.fill} className="hover:opacity-80 transition-opacity" />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-border)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-3xl font-black text-primary">{mean.toFixed(1)}</div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-1">Mean</div>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 w-full">
        {data.map((item, idx) => (
          <div key={`legend-${title.replace(/\s+/g, '-')}-${idx}`} className="flex items-center gap-2 text-xs text-foreground/80 font-medium">
            <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.fill }} />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Filtering state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activePreset, setActivePreset] = useState<string>('All Time');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [expandedSuggestions, setExpandedSuggestions] = useState<number[]>([]);

  const handleLogout = () => {
    navigate('/admin/login');
  };

  const toggleSuggestion = (index: number) => {
    setExpandedSuggestions(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const applyPresetFilter = (preset: string) => {
    setActivePreset(preset);
    const today = new Date('2026-05-26'); // Mock today's date based on data
    
    if (preset === 'Today') {
      const todayStr = today.toISOString().split('T')[0];
      setStartDate(todayStr);
      setEndDate(todayStr);
    } else if (preset === 'This Month') {
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
      const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];
      setStartDate(firstDay);
      setEndDate(lastDay);
    } else if (preset === 'This Year') {
      const firstDay = new Date(today.getFullYear(), 0, 1).toISOString().split('T')[0];
      const lastDay = new Date(today.getFullYear(), 11, 31).toISOString().split('T')[0];
      setStartDate(firstDay);
      setEndDate(lastDay);
    } else {
      setStartDate('');
      setEndDate('');
    }
    setCurrentPage(1); // Reset pagination on filter
  };

  const handleManualFilter = () => {
    setActivePreset('');
    setCurrentPage(1);
  };

  // Filtered data
  const filteredResponses = useMemo(() => {
    return mockResponses.filter(res => {
      if (startDate && res.date < startDate) return false;
      if (endDate && res.date > endDate) return false;
      return true;
    });
  }, [startDate, endDate]);

  const filteredFeedback = useMemo(() => {
    return mockFeedback.filter(fb => {
      if (startDate && fb.date < startDate) return false;
      if (endDate && fb.date > endDate) return false;
      return true;
    });
  }, [startDate, endDate]);

  // Paginated data
  const paginatedResponses = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredResponses.slice(start, start + itemsPerPage);
  }, [filteredResponses, currentPage]);

  const totalPages = Math.ceil(filteredResponses.length / itemsPerPage);

  const tabs = [
    { id: 'all', label: 'All Responses', icon: FileText },
    { id: 'charter', label: 'Citizen Charter', icon: CheckSquare },
    { id: 'csm', label: 'CSM Measurement', icon: BarChart3 },
    { id: 'feedback', label: 'Feedback & Comments', icon: MessageSquare }
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-primary text-primary-foreground transition-transform duration-300 ease-in-out flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-primary-foreground/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-foreground/10 rounded-lg">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight leading-tight">CSM Portal</h2>
              <p className="text-xs text-primary-foreground/70">Admin Dashboard</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 hover:bg-primary-foreground/10 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          <p className="text-xs font-semibold text-primary-foreground/50 uppercase tracking-wider mb-4 px-2">Analytics & Data</p>
          <nav className="space-y-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as TabType);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                    activeTab === tab.id 
                      ? 'bg-secondary text-primary-foreground shadow-sm' 
                      : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-primary-foreground' : 'opacity-70'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-primary-foreground/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground text-sm font-medium"
          >
            <LogOut className="w-4 h-4 opacity-70" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">
        {/* Top Header */}
        <header className="bg-card border-b border-border/50 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 text-foreground/70 hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold text-foreground">
                {tabs.find(t => t.id === activeTab)?.label || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-foreground/60 hover:text-foreground hover:bg-muted rounded-full transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border-2 border-card"></span>
              </button>
              <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                A
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* Date Filter Bar */}
          <div className="bg-card rounded-xl p-4 sm:p-5 border border-border/50 shadow-sm flex flex-col sm:flex-row flex-wrap items-start sm:items-end gap-4 justify-between">
            <div className="flex flex-wrap items-end gap-4 w-full sm:w-auto">
              <div className="w-full sm:w-auto">
                <label className="block mb-1.5 text-xs font-semibold text-foreground/70 uppercase tracking-wide">
                  Start Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => { setStartDate(e.target.value); setActivePreset(''); }}
                    className="pl-10 pr-4 py-2 w-full sm:w-auto bg-muted/50 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  />
                </div>
              </div>
              <div className="w-full sm:w-auto">
                <label className="block mb-1.5 text-xs font-semibold text-foreground/70 uppercase tracking-wide">
                  End Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => { setEndDate(e.target.value); setActivePreset(''); }}
                    className="pl-10 pr-4 py-2 w-full sm:w-auto bg-muted/50 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  />
                </div>
              </div>
              <button 
                onClick={handleManualFilter}
                className="w-full sm:w-auto px-5 py-2 bg-secondary hover:bg-secondary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Filter className="w-4 h-4" /> Filter
              </button>
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
              {['Today', 'This Month', 'This Year', 'All Time'].map((period) => (
                <button
                  key={period}
                  onClick={() => applyPresetFilter(period)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                    activePreset === period ? 'bg-primary/10 text-primary' : 'text-foreground/60 hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Content */}
          {activeTab === 'all' && (
            <div className="bg-card border border-border/50 rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-border/50 bg-muted/20 flex justify-between items-center">
                <h2 className="font-semibold text-foreground">Recent Submissions</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {filteredResponses.length} Total
                </span>
              </div>
              <div className="overflow-x-auto min-h-[350px]">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-foreground/60 uppercase bg-muted/50 border-b border-border/50">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Date</th>
                      <th className="px-6 py-4 font-semibold">Client Type</th>
                      <th className="px-6 py-4 font-semibold">Beneficiary</th>
                      <th className="px-6 py-4 font-semibold">Full Name</th>
                      <th className="px-6 py-4 font-semibold">Location</th>
                      <th className="px-6 py-4 font-semibold">Intervention</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {paginatedResponses.length > 0 ? (
                      paginatedResponses.map((response) => (
                        <tr key={response.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4 text-foreground/80 whitespace-nowrap">{response.date}</td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-1 rounded-md bg-secondary/10 text-secondary border border-secondary/20 text-xs font-medium">
                              {response.clientType}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-foreground/80">
                            <div>{response.beneficiaryType}</div>
                            <div className="text-xs text-muted-foreground">{response.beneficiaryInfo}</div>
                          </td>
                          <td className="px-6 py-4 font-medium text-foreground">{response.name}</td>
                          <td className="px-6 py-4 text-foreground/80 max-w-xs truncate" title={response.address}>{response.address}</td>
                          <td className="px-6 py-4 text-foreground/80">{response.intervention}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                          No responses found for the selected date range.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-border/50 flex items-center justify-between bg-muted/10">
                  <span className="text-sm text-muted-foreground">
                    Showing <span className="font-medium text-foreground">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-foreground">{Math.min(currentPage * itemsPerPage, filteredResponses.length)}</span> of <span className="font-medium text-foreground">{filteredResponses.length}</span> entries
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-1.5 rounded-md border border-border text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                          currentPage === page ? 'bg-primary text-primary-foreground' : 'border border-border text-foreground hover:bg-muted'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-1.5 rounded-md border border-border text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'charter' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <DoughnutChartWithMean data={cc1Data} mean={4.2} title="CC1: Knowledge of CC" />
                <DoughnutChartWithMean data={cc2Data} mean={4.1} title="CC2: CC Visibility" />
                <DoughnutChartWithMean data={cc3Data} mean={4.0} title="CC3: CC Helpfulness" />
              </div>
            </div>
          )}

          {activeTab === 'csm' && (
            <div className="space-y-6">
              <div className="bg-card border border-border/50 rounded-xl shadow-sm p-6">
                <h2 className="mb-8 text-lg font-bold text-foreground">Service Quality Dimensions (SQD)</h2>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart id="csm-bar-chart" data={csmData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                      <XAxis 
                        dataKey="question" 
                        angle={-45} 
                        textAnchor="end" 
                        interval={0} 
                        tick={{ fontSize: 12, fill: 'var(--color-foreground)', opacity: 0.8 }} 
                        axisLine={{ stroke: 'var(--color-border)' }}
                        tickLine={false}
                      />
                      <YAxis 
                        domain={[0, 5]} 
                        tick={{ fontSize: 12, fill: 'var(--color-foreground)', opacity: 0.8 }} 
                        axisLine={{ stroke: 'var(--color-border)' }}
                        tickLine={false}
                      />
                      <Tooltip 
                        cursor={{ fill: 'var(--color-muted)', opacity: 0.4 }}
                        contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-border)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="mean" radius={[6, 6, 0, 0]} maxBarSize={60}>
                        {csmData.map((entry) => (
                          <Cell key={`bar-cell-${entry.question.replace(/\s+/g, '-')}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DoughnutChartWithMean data={timelinessData} mean={4.1} title="Timeliness Rating" />
                <DoughnutChartWithMean data={overallData} mean={4.3} title="Overall Satisfaction Rating" />
              </div>
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="bg-card border border-border/50 rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-border/50 bg-muted/20 flex justify-between items-center">
                <h2 className="font-semibold text-foreground">Client Feedback & Comments</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {filteredFeedback.length} Entries
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-foreground/60 uppercase bg-muted/50 border-b border-border/50">
                    <tr>
                      <th className="px-6 py-4 font-semibold w-32">Date</th>
                      <th className="px-6 py-4 font-semibold w-48">Intervention</th>
                      <th className="px-6 py-4 font-semibold">Service Details</th>
                      <th className="px-6 py-4 font-semibold w-24">Qty</th>
                      <th className="px-6 py-4 font-semibold">Suggestions / Comments</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {filteredFeedback.length > 0 ? (
                      filteredFeedback.map((item) => (
                        <tr key={item.id} className="hover:bg-muted/30 transition-colors group">
                          <td className="px-6 py-4 text-foreground/80 whitespace-nowrap align-top">{item.date}</td>
                          <td className="px-6 py-4 text-foreground/80 align-top">
                            <span className="inline-flex items-center px-2 py-1 rounded bg-secondary/10 text-secondary text-xs font-medium">
                              {item.intervention}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-foreground/80 align-top">{item.details}</td>
                          <td className="px-6 py-4 text-foreground/80 align-top">{item.qty}</td>
                          <td className="px-6 py-4 text-foreground align-top max-w-md">
                            <div className="bg-muted/30 p-3 rounded-lg border border-border/30 group-hover:border-border transition-colors">
                              <MessageSquare className="w-4 h-4 text-muted-foreground mb-2 inline-block mr-2" />
                              {expandedSuggestions.includes(item.id) ? (
                                <>
                                  <span>{item.suggestion}</span>
                                  <button
                                    onClick={() => toggleSuggestion(item.id)}
                                    className="ml-2 text-primary font-medium text-xs hover:underline mt-1 block"
                                  >
                                    Show less
                                  </button>
                                </>
                              ) : (
                                <>
                                  <span>{item.suggestion.slice(0, 100)}{item.suggestion.length > 100 ? '...' : ''}</span>
                                  {item.suggestion.length > 100 && (
                                    <button
                                      onClick={() => toggleSuggestion(item.id)}
                                      className="ml-2 text-primary font-medium text-xs hover:underline mt-1 block"
                                    >
                                      Read more
                                    </button>
                                  )}
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                          No feedback found for the selected date range.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
