import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaBolt, FaCheckCircle, FaClock, FaChartLine, 
  FaExternalLinkAlt, FaSpinner, FaExclamationTriangle,
  FaHistory, FaShieldAlt, FaPlus, FaMagic, FaListUl
} from "react-icons/fa";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import Card from "../components/Card";
import { getDashboardData } from "../../api/indexingApi";

const graphData = [
  { name: 'Mon', indexed: 40 }, { name: 'Tue', indexed: 30 }, { name: 'Wed', indexed: 65 },
  { name: 'Thu', indexed: 45 }, { name: 'Fri', indexed: 90 }, { name: 'Sat', indexed: 70 }, { name: 'Sun', indexed: 85 },
];

export default function DashboardHome() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadStats() {
      try {
        setLoading(true);
        const res = await getDashboardData();
        if (isMounted) {
          if (res.success) setData(res);
          else setError("Failed to fetch data.");
        }
      } catch (err) {
        if (isMounted) setError("Connection error.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadStats();
    return () => { isMounted = false; };
  }, []);

  if (loading) return (
    <div className="flex h-[60vh] flex-col items-center justify-center text-slate-400 gap-3">
      <FaSpinner className="animate-spin text-accent" size={32} />
      <span className="font-bold text-xs uppercase tracking-[0.2em] text-slate-500">Syncing Protocol...</span>
    </div>
  );

  const statsData = data?.stats || { totalIndexed: 0, pending: 0, failed: 0, credits: 0 };
  const recentActivity = data?.recentActivity || [];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10 px-4">
      
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">System Overview</h1>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">v2.4.0 Live Pulse</p>
        </div>
        <div className="flex gap-2">
            <Link to="/indexing" className="bg-accent text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-lg shadow-accent/20 hover:scale-105 transition-all flex items-center gap-2">
                <FaPlus size={10} /> INDEXING
            </Link>
            <Link to="/content" className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-lg hover:scale-105 transition-all flex items-center gap-2">
                <FaMagic size={10} /> AI STRATEGY
            </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-auto lg:h-[300px]">
        
        <Card className="lg:col-span-9 p-8 flex flex-col border-slate-200 overflow-hidden shadow-sm">
            <div className="flex justify-between items-center mb-8">
                <h3 className="font-black text-slate-800 text-[11px] uppercase tracking-widest flex items-center gap-2">
                    <FaChartLine className="text-accent" /> Performance Matrix
                </h3>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-accent"></div> <span className="text-[9px] font-bold text-slate-400">Signals</span></div>
                    <span className="text-[9px] font-black text-green-500 bg-green-50 px-2 py-1 rounded border border-green-100 uppercase">System Stable</span>
                </div>
            </div>
            
            <div className="flex-1 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={graphData} margin={{ top: 0, right: 10, left: -25, bottom: 0 }}>
                        <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25}/>
                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} dy={10} />
                        <YAxis hide={true} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '12px' }}
                          labelStyle={{ fontWeight: 900, marginBottom: '4px', fontSize: '12px' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="indexed" 
                          stroke="#f59e0b" 
                          strokeWidth={4} 
                          fillOpacity={1} 
                          fill="url(#chartGradient)" 
                          animationDuration={2500}
                          dot={{ r: 4, fill: '#fff', stroke: '#f59e0b', strokeWidth: 2 }}
                          activeDot={{ r: 6, fill: '#f59e0b', stroke: '#fff', strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>

        <div className="lg:col-span-3 flex flex-col gap-4 h-full">
            <Card className="flex-1 p-6 bg-accent text-white border-0 shadow-xl shadow-accent/20 flex flex-col justify-between overflow-hidden relative group">
                <FaBolt className="absolute -right-4 -top-4 text-white/10 text-8xl rotate-12 group-hover:rotate-45 transition-transform duration-700" />
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Available Node Credits</p>
                    <h2 className="text-4xl font-black mt-1 tracking-tighter">{statsData.credits?.toLocaleString()}</h2>
                </div>
                <Link to="/indexing" className="w-full py-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-[10px] font-black uppercase tracking-widest text-center transition-all">Refill Balance</Link>
            </Card>

            <Card className="flex-1 p-6 bg-slate-900 border-0 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-3xl"></div>
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <FaShieldAlt className="text-accent" /> System Integrity
                </h3>
                <div className="space-y-5">
                    <ProgressLine label="Google API Cluster" percent={99.9} color="bg-green-500" />
                    <ProgressLine label="Signal Propogation" percent={72} color="bg-accent" />
                </div>
            </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 h-28">
        <SmallStatBox label="Success Signals" value={statsData.totalIndexed} icon={<FaCheckCircle/>} color="text-green-500" tag="STABLE" />
        <SmallStatBox label="Active Queue" value={statsData.pending} icon={<FaClock/>} color="text-amber-500" tag="ACTIVE" />
        <SmallStatBox label="Dropped Signals" value={statsData.failed || 0} icon={<FaExclamationTriangle/>} color="text-red-500" tag="ERROR" />
        <SmallStatBox label="Node Latency" value="1.1ms" icon={<FaBolt/>} color="text-blue-500" tag="FAST" />
      </div>

      {/* Bottom Logs with View All Button */}
      <Card className="p-0 overflow-hidden border-slate-200 shadow-sm flex flex-col h-[300px]">
          <div className="px-6 py-4 border-b bg-slate-50/50 flex justify-between items-center shrink-0">
              <h3 className="font-black text-slate-800 text-[11px] uppercase tracking-widest flex items-center gap-2">
                  <FaHistory className="text-slate-400" /> Real-Time Signal Logs
              </h3>
              <div className="flex items-center gap-4">
                  <Link to="/logs" className="text-[10px] font-black text-accent hover:underline flex items-center gap-1.5 uppercase tracking-widest">
                    <FaListUl size={10} /> View All
                  </Link>
                  <div className="h-4 w-px bg-slate-200 mx-1"></div>
                  <div className="flex items-center gap-2">
                      <span className="flex h-2 w-2 relative"><span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Live Monitor</span>
                  </div>
              </div>
          </div>
          <div className="overflow-y-auto divide-y divide-slate-50 flex-1 custom-scrollbar bg-white">
              {recentActivity.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                  <FaClock size={24} className="opacity-20" />
                  <p className="text-xs font-bold uppercase tracking-widest opacity-40">No signals in current cycle</p>
                </div>
              ) : (
                recentActivity.map((job, idx) => (
                    <div key={idx} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/80 transition-all group">
                        <div className="flex items-center gap-5 min-w-0">
                            <div className={`w-2 h-2 rounded-full ${job.status === 'done' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]'}`} />
                            <div className="flex flex-col truncate">
                              <span className="text-[13px] font-bold text-slate-700 truncate group-hover:text-accent transition-colors">{job.url}</span>
                              <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest mt-0.5">{job.status === 'done' ? 'Protocol Success' : 'Injection Failed'}</span>
                            </div>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 font-mono bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg">
                          {new Date(job.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second: '2-digit'})}
                        </span>
                    </div>
                ))
              )}
          </div>
      </Card>
    </div>
  );
}

function ProgressLine({ label, percent, color }) {
    return (
        <div className="space-y-1.5 relative z-10">
            <div className="flex justify-between text-[9px] font-black text-slate-500 uppercase tracking-tighter">
                <span>{label}</span>
                <span className="text-slate-300">{percent}%</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full ${color} rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(255,255,255,0.1)]`} style={{ width: `${percent}%` }}></div>
            </div>
        </div>
    );
}

function SmallStatBox({ label, value, icon, color, tag }) {
  return (
    <Card className="p-5 border-slate-100 shadow-sm flex items-center gap-4 group hover:border-accent/30 transition-all cursor-default">
        <div className={`w-11 h-11 rounded-2xl bg-slate-50 flex items-center justify-center ${color} group-hover:scale-110 transition-transform shadow-inner`}>{icon}</div>
        <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none flex items-center gap-2">
              {label} <span className={`text-[7px] border px-1 rounded font-black ${color} border-current opacity-60 tracking-tighter`}>{tag}</span>
            </p>
            <p className="text-xl font-black text-slate-800 tracking-tighter leading-none">{value?.toLocaleString()}</p>
        </div>
    </Card>
  );
}