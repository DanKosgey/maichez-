import React, { useState, useEffect } from 'react';
import { User, BotAsset } from '../types';
import { fetchBotAssets } from '../services/adminService';
import {
    Bot,
    Download,
    ShieldCheck,
    Zap,
    Server,
    Activity,
    CheckCircle2,
    FileCode,
    Lock,
    Clock,
    ArrowRight,
    FileText,
    Settings
} from 'lucide-react';
import { motion } from 'framer-motion';

interface BotDownloadPageProps {
    user: User;
}

const BotDownloadPage: React.FC<BotDownloadPageProps> = ({ user }) => {
    const isPending = user.botPurchaseStatus === 'pending';
    const [assets, setAssets] = useState<BotAsset[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user.botAccess) {
            const loadAssets = async () => {
                try {
                    const data = await fetchBotAssets();
                    setAssets(data);
                } finally {
                    setLoading(false);
                }
            };
            loadAssets();
        }
    }, [user.botAccess]);

    const getIcon = (type: string) => {
        switch (type) {
            case 'mql5': return Bot;
            case 'manual': return FileText;
            case 'preset': return Settings;
            default: return FileCode;
        }
    };

    if (!user.botAccess && !isPending) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-brand-primary/20 blur-3xl rounded-full" />
                    <div className="relative bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl">
                        <Lock className="h-20 w-20 text-slate-700" />
                        <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-brand-primary rounded-full flex items-center justify-center border-4 border-slate-900 shadow-lg">
                            <Zap className="h-5 w-5 text-slate-900" />
                        </div>
                    </div>
                </div>
                <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Access Restricted</h2>
                <p className="text-slate-400 max-w-md mx-auto mb-10 text-lg leading-relaxed">
                    The Zeta Expert bot is an exclusive institutional algorithm. Purchase a license to unlock the download and installation guide.
                </p>
                <button
                    onClick={() => window.dispatchEvent(new CustomEvent('navigateToView', { detail: 'bot' }))}
                    className="px-10 py-5 bg-brand-primary text-slate-900 font-black text-lg rounded-2xl hover:bg-green-400 transition shadow-xl shadow-brand-primary/20 active:scale-95 flex items-center gap-3"
                >
                    Visit Bot Store <ArrowRight className="h-6 w-6" />
                </button>
            </div>
        );
    }

    if (isPending) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-amber-500/10 blur-3xl rounded-full" />
                    <div className="relative bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl">
                        <Clock className="h-20 w-20 text-amber-500 animate-pulse" />
                    </div>
                </div>
                <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Verification in Progress</h2>
                <p className="text-slate-400 max-w-md mx-auto mb-6 text-lg leading-relaxed">
                    Our team is currently validating your purchase request. This process usually takes between 1-4 hours.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 text-xs font-black uppercase tracking-widest">
                    Status: Pending Admin Approval
                </div>
            </div>
        );
    }

    const mainBotAsset = assets.find(a => a.type === 'mql5') || assets[0];

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20 animate-in fade-in duration-700">
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 p-8 md:p-16">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-primary/10 to-transparent pointer-events-none" />

                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-wider"
                        >
                            <ShieldCheck className="h-4 w-4" /> Professional Grade
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-black text-white leading-tight"
                        >
                            Maichez <span className="text-brand-primary">Zeta Expert</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed"
                        >
                            The definitive institutional algorithm for MT5. Engineered for precision, speed, and consistent alpha generation.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-4 pt-4"
                        >
                            {mainBotAsset ? (
                                <a
                                    href={mainBotAsset.url}
                                    download={mainBotAsset.name}
                                    className="px-8 py-4 bg-brand-primary text-slate-900 font-black text-lg rounded-2xl hover:bg-green-400 transition shadow-lg shadow-brand-primary/20 flex items-center gap-3"
                                >
                                    <Download className="h-6 w-6" /> Download {mainBotAsset.name}
                                </a>
                            ) : (
                                <div className="px-8 py-4 bg-slate-800 text-slate-500 font-bold rounded-2xl border border-slate-700">
                                    No Files Available
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* (Right-side Stats Box Remains Same) */}
                </div>
            </div>

            {/* Assets & Files Section */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 space-y-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        <FileCode className="h-6 w-6 text-brand-primary" />
                        Available Assets
                    </h3>
                    <div className="space-y-4">
                        {loading ? (
                            [1, 2].map(i => <div key={i} className="h-16 bg-slate-800/30 rounded-2xl animate-pulse" />)
                        ) : assets.length > 0 ? (
                            assets.map((asset) => {
                                const Icon = getIcon(asset.type);
                                return (
                                    <div key={asset.id} className="bg-slate-800/30 border border-slate-700/50 p-4 rounded-2xl flex items-center justify-between group hover:border-brand-primary/30 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-brand-primary/10 rounded-lg">
                                                <Icon className="h-5 w-5 text-brand-primary" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white text-sm">{asset.name}</p>
                                                <p className="text-[10px] text-slate-500 font-mono italic">{asset.version} • {asset.fileSize}</p>
                                            </div>
                                        </div>
                                        <a href={asset.url} download className="p-2 bg-brand-primary/20 text-brand-primary rounded-lg hover:bg-brand-primary/30 transition-colors">
                                            <Download className="h-4 w-4" />
                                        </a>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-8 text-slate-500 text-sm italic">
                                No additional assets found.
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Info / Config Card */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <Settings className="h-6 w-6 text-brand-primary" />
                        Recommended Config
                    </h3>
                    <ul className="space-y-4">
                        {[
                            { label: "Timeframe", value: "M5 / M15" },
                            { label: "Risk Percent", value: "0.5% - 1.0%" },
                            { label: "Broker Type", value: "ECN / Raw Spread" },
                            { label: "Equity Filter", value: "Enabled" }
                        ].map((item, i) => (
                            <li key={i} className="flex items-center justify-between text-sm py-2 border-b border-slate-800/50 last:border-0">
                                <span className="text-slate-500">{item.label}</span>
                                <span className="text-white font-bold">{item.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Installation Guide */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12">
                <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                    <Activity className="h-7 w-7 text-brand-primary" />
                    Installation Roadmap
                </h2>
                <div className="grid md:grid-cols-3 gap-8 relative">
                    {[
                        { step: "01", title: "Move to Experts", desc: "Copy the .mq5 file into your MT5 Experts folder." },
                        { step: "02", title: "Allow Trading", desc: "Enable 'Allow Algo Trading' in MT5 settings." },
                        { step: "03", title: "Load Presets", desc: "Drag bot to chart and load the provided .set files." }
                    ].map((step, i) => (
                        <div key={i} className="relative space-y-4">
                            <div className="text-5xl font-black text-brand-primary/10 absolute -top-4 -left-2 select-none">{step.step}</div>
                            <h4 className="text-lg font-bold text-white relative z-10">{step.title}</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BotDownloadPage;

