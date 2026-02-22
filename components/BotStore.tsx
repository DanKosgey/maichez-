import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Bot,
    ShieldCheck,
    Zap,
    Target,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    Download,
    Terminal,
    Cpu
} from 'lucide-react';
import { User } from '../types';
import { supabase } from '../supabase/client';

interface BotStoreProps {
    user: User;
    onUpdateUser: (updatedUser: User) => void;
}

const BotStore: React.FC<BotStoreProps> = ({ user, onUpdateUser }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePurchase = async () => {
        try {
            setLoading(true);
            setError(null);

            const { error: updateError } = await supabase
                .from('profiles')
                .update({ bot_purchase_status: 'pending' })
                .eq('id', user.id);

            if (updateError) throw updateError;

            onUpdateUser({
                ...user,
                botPurchaseStatus: 'pending'
            });
        } catch (err: any) {
            console.error('Error initiating purchase:', err);
            setError(err.message || 'Failed to initiate purchase. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const isPending = user.botPurchaseStatus === 'pending';
    const hasAccess = user.botAccess || user.botPurchaseStatus === 'completed';

    return (
        <div className="space-y-8 pb-12">
            {/* Hero Header */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 md:p-12 text-white shadow-2xl">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-primary/20 blur-3xl" />
                <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-4 py-1.5 text-sm font-bold text-brand-primary border border-brand-primary/20">
                            <Zap className="h-4 w-4" />
                            ULTIMATE EDGE
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-white">
                            Alpha-<span className="text-brand-primary">V5</span> Trading Bot
                        </h1>

                        <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                            The world's first CRT-integrated MQL5 algorithm. Automate your institutional strategies with surgical precision.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <div className="flex items-center gap-2 text-slate-300">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                92% Success Rate
                            </div>
                            <div className="flex items-center gap-2 text-slate-300">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                No Martingale
                            </div>
                            <div className="flex items-center gap-2 text-slate-300">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                Smart Risk Guard
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/3 flex justify-center">
                        <motion.div
                            animate={{
                                y: [0, -15, 0],
                                rotate: [0, 2, 0]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-brand-primary/30 blur-2xl rounded-full" />
                            <div className="relative bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl">
                                <Bot className="h-32 w-32 text-brand-primary" />
                                <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-green-500 rounded-full flex items-center justify-center border-4 border-slate-800">
                                    <Cpu className="h-5 w-5 text-white" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Purchase Card */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                        <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                            <Terminal className="h-6 w-6 text-brand-primary" />
                            Algorithm Specs
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: "Execution Speed", value: "3ms", icon: Zap },
                                { title: "Pair Support", value: "Major & Indices", icon: Target },
                                { title: "Risk Model", value: "Equity Protection", icon: ShieldCheck },
                                { title: "Integration", value: "CTR Full Sync", icon: Cpu }
                            ].map((spec, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                    <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                                        <spec.icon className="h-5 w-5 text-brand-primary" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 font-bold uppercase">{spec.title}</div>
                                        <div className="text-lg font-black text-slate-900">{spec.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-6 rounded-2xl bg-violet-600/5 border border-violet-100">
                            <p className="text-slate-600 leading-relaxed italic">
                                "The Zeta Expert bot doesn't just trade; it reasons. It waits for the exact institutional liquidity sweep and displacement patterns."
                            </p>
                        </div>
                    </div>
                </div>

                {/* Pricing & CTA Card */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-white rounded-3xl border-2 border-slate-900 p-8 shadow-xl">
                        <div className="text-sm font-black text-brand-primary mb-2 uppercase">Lifetime Access</div>
                        <div className="text-5xl font-black text-slate-900 mb-6">$499 <span className="text-lg text-slate-400 font-normal">USD</span></div>

                        <div className="space-y-4 mb-8">
                            {[
                                "Unlimited License",
                                "MT5 Zeta Expert Bot",
                                "Lifetime Updates",
                                "Direct Installation Help",
                                "Private Discord Access"
                            ].map((f, i) => (
                                <div key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                                    <CheckCircle2 className="h-5 w-5 text-brand-primary flex-shrink-0" />
                                    {f}
                                </div>
                            ))}
                        </div>

                        {hasAccess ? (
                            <button
                                disabled
                                className="w-full py-4 bg-green-500 text-white font-black rounded-2xl shadow-lg flex items-center justify-center gap-2"
                            >
                                <CheckCircle2 className="h-5 w-5" />
                                ALREADY OWNED
                            </button>
                        ) : isPending ? (
                            <div className="space-y-4">
                                <div className="w-full py-4 bg-amber-100 text-amber-700 font-black rounded-2xl flex items-center justify-center gap-2 border border-amber-200">
                                    <AlertCircle className="h-5 w-5" />
                                    PENDING REVIEW
                                </div>
                                <p className="text-center text-xs text-slate-400 leading-relaxed">
                                    Your purchase request is being validated. <br />
                                    Usually takes 1-4 hours.
                                </p>
                            </div>
                        ) : (
                            <button
                                onClick={handlePurchase}
                                disabled={loading}
                                className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loading ? 'PROCESSING...' : (
                                    <>
                                        PURCHASE ACCESS <ArrowRight className="h-5 w-5" />
                                    </>
                                )}
                            </button>
                        )}

                        {error && (
                            <p className="mt-4 text-xs text-red-500 text-center font-bold">
                                {error}
                            </p>
                        )}

                        <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-center gap-6 opacity-40 grayscale">
                            <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-6" />
                            <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-6" />
                            <img src="https://img.icons8.com/color/48/bitcoin.png" alt="Bitcoin" className="h-6" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BotStore;
