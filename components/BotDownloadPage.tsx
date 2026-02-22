import React from 'react';
import { Bot, Download, ShieldCheck, Zap, Server, Activity, ArrowRight, CheckCircle2, FileCode } from 'lucide-react';
import { motion } from 'framer-motion';

const BotDownloadPage: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20 animate-in fade-in duration-700">
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden bg-trade-dark border border-gray-800 p-8 md:p-16">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-trade-neon/10 to-transparent pointer-events-none" />

                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-trade-neon/10 border border-trade-neon/20 text-trade-neon text-xs font-bold uppercase tracking-wider"
                        >
                            <ShieldCheck className="h-4 w-4" /> Professional Grade
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-black text-white leading-tight"
                        >
                            Maichez <span className="text-trade-neon">Alpha-V5</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed"
                        >
                            The definitive MQL5 algorithmic trading solution for MT5. Engineered for precision, speed, and consistent alpha generation across major currency pairs.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-4 pt-4"
                        >
                            <button className="px-8 py-4 bg-trade-neon text-black font-black text-lg rounded-2xl hover:bg-green-400 transition shadow-lg shadow-trade-neon/20 flex items-center gap-3">
                                <Download className="h-6 w-6" /> Download MQL5 File
                            </button>
                            <button className="px-8 py-4 bg-gray-800 text-white font-bold text-lg rounded-2xl hover:bg-gray-700 transition border border-gray-700 flex items-center gap-3">
                                View Backtests <Activity className="h-6 w-6" />
                            </button>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", damping: 15 }}
                        className="flex-1 hidden lg:block"
                    >
                        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700 rounded-3xl p-8 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-trade-neon/5 to-transparent" />
                            <div className="relative z-10 space-y-6">
                                <div className="flex justify-between items-center">
                                    <div className="bg-trade-neon/20 p-3 rounded-2xl text-trade-neon">
                                        <Bot className="h-10 w-10" />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500 font-bold uppercase">Status</p>
                                        <p className="text-trade-neon font-black italic">DEPLOYED</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "85%" }}
                                            transition={{ duration: 2 }}
                                            className="h-full bg-trade-neon"
                                        />
                                    </div>
                                    <div className="flex justify-between text-xs font-bold font-mono">
                                        <span className="text-gray-500">OPTIMIZATION</span>
                                        <span className="text-white">85.4%</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Win Rate</p>
                                        <p className="text-xl font-black text-white">68.4%</p>
                                    </div>
                                    <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Drawdown</p>
                                        <p className="text-xl font-black text-red-500">4.2%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { icon: Zap, title: "High-Frequency Ready", desc: "Optimized execution logic designed to handle rapid market shifts and minimize slippage." },
                    { icon: Server, title: "MetaTrader 5 Native", desc: "Leverages the full multi-threaded power and object-oriented architecture of MQL5." },
                    { icon: ShieldCheck, title: "Advanced Risk Engine", desc: "Built-in dynamic position sizing and multi-layered stop-loss management." }
                ].map((feat, i) => (
                    <div key={i} className="bg-gray-900/40 border border-gray-800 p-8 rounded-3xl hover:border-gray-700 transition">
                        <feat.icon className="h-12 w-12 text-trade-neon mb-6" />
                        <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{feat.desc}</p>
                    </div>
                ))}
            </div>

            {/* Installation Guide */}
            <div className="bg-gray-950 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-gray-800 bg-gray-900/20 flex items-center gap-4">
                    <FileCode className="h-8 w-8 text-blue-400" />
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight">Installation Guide</h2>
                </div>

                <div className="p-8 md:p-12 grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        {[
                            "Download the Alpha-V5 .mq5 or .ex5 file above.",
                            "Open MetaTrader 5 and navigate to File -> Open Data Folder.",
                            "Go into MQL5 -> Experts and paste the bot file there.",
                            "Refresh your Expert Advisors list in the MT5 Navigator.",
                            "Drag the bot onto a 1-Hour chart (EURUSD recommended).",
                            "Ensure 'Allow Algo Trading' is enabled in the MT5 settings."
                        ].map((step, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-sm font-bold text-gray-400">
                                    {i + 1}
                                </div>
                                <p className="text-gray-300 leading-relaxed pt-1">{step}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-trade-dark rounded-2xl p-8 border border-gray-800 space-y-6">
                        <div className="flex items-center gap-2 text-yellow-500 font-bold uppercase text-sm italic">
                            <Zap className="h-4 w-4" /> Recommended Configuration
                        </div>
                        <ul className="space-y-4">
                            {[
                                { label: "Platform", value: "MetaTrader 5" },
                                { label: "Min. Balance", value: "$1,000 USD" },
                                { label: "Pairs", value: "EURUSD, GBPUSD, XAUUSD" },
                                { label: "Timeframe", value: "1H / 15M" },
                                { label: "Leverage", value: "1:100 or Higher" }
                            ].map((item, i) => (
                                <li key={i} className="flex justify-between border-b border-gray-800 pb-2">
                                    <span className="text-gray-500 text-sm font-bold uppercase">{item.label}</span>
                                    <span className="text-white font-mono text-sm">{item.value}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-4">
                            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex gap-3">
                                <Server className="h-5 w-5 text-red-500 flex-shrink-0" />
                                <p className="text-[10px] text-red-400 leading-tight">
                                    <span className="font-bold">CAUTION:</span> Algorithmic trading involves significant risk. Always test on a demo account before going live. Maichez is not responsible for trading losses.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BotDownloadPage;
