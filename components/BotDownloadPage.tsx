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
    AlertCircle,
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
        // ... (existing restricted view)
    }

    if (isPending) {
        // ... (existing pending view)
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
                    {/* ... (Existing Recommended Config List) */}
                </div>
            </div>

            {/* Installation Guide ... (Existing Guide Content) */}
        </div>
    );
};

export default BotDownloadPage;

