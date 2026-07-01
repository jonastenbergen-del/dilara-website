'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import chatAnalysis from '@/data/chat-analysis.json';

const stats = chatAnalysis.statistics;

function StatCard({ emoji, value, label_de, label_tr }: {
    emoji: string;
    value: string | number;
    label_de: string;
    label_tr: string;
}) {
    const { language } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5, once: false });
    const label = language === 'tr' ? label_tr : label_de;

    return (
        <motion.div
            ref={ref}
            className="glass rounded-2xl p-6 text-center shadow-soft-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
        >
            <motion.div
                className="text-4xl mb-3"
                animate={isInView ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
            >
                {emoji}
            </motion.div>
            <motion.div
                className="text-3xl font-bold gradient-text font-display mb-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
            >
                {typeof value === 'number' && value > 100 ? value.toLocaleString('de-DE') : value}
            </motion.div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">{label}</div>
        </motion.div>
    );
}

export default function ChatAnalysisSection() {
    const { language } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.2, once: false });

    return (
        <section
            id="chat-analysis"
            className="min-h-screen py-24 bg-gradient-to-b from-neutral-50 via-cyan-50/20 to-neutral-50 dark:from-[#0A0A1A] dark:via-[#0A1520] dark:to-[#0A0A1A] relative overflow-hidden"
        >
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 right-10 w-80 h-80 rounded-full blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.08), transparent)',
                    }}
                    animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-20 left-10 w-72 h-72 rounded-full blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.08), transparent)',
                    }}
                    animate={{ scale: [1, 1.3, 1], x: [0, -40, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Section header */}
                <motion.div
                    ref={ref}
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="inline-block mb-4 text-5xl"
                        animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        💬
                    </motion.div>
                    <h2 className="text-4xl sm:text-5xl font-bold font-display gradient-text mb-4">
                        {language === 'tr' ? 'Chat Analizi' : 'Chat-Analyse'}
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
                        {language === 'tr' ? 'Bizim hikayemiz hakkında ilginç istatistikler' : 'Interessante Statistiken über unsere Geschichte'}
                    </p>
                </motion.div>

                {/* Stats Grid – Complete Overview from Screenshot */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                    <StatCard emoji="💬" value={stats.total_messages} label_de="Nachrichten" label_tr="Mesajlar" />
                    <StatCard emoji="📸" value={stats.total_photos} label_de="Fotos" label_tr="Fotoğraflar" />
                    <StatCard emoji="🎥" value={stats.total_videos} label_de="Videos" label_tr="Videolar" />
                    <StatCard emoji="🎤" value={stats.total_voice_messages} label_de="Sprachnachrichten" label_tr="Sesli Mesajlar" />
                    <StatCard emoji="😂" value={stats.total_gifs} label_de="GIFs" label_tr="GIF'ler" />
                    <StatCard emoji="🎁" value={stats.total_gifts} label_de="Geschenke" label_tr="Hediyeler" />
                    <StatCard emoji="🔗" value={stats.total_shared_links} label_de="Geteilte Links" label_tr="Paylaşılan Linkler" />
                    <StatCard emoji="📎" value={stats.total_files} label_de="Dateien" label_tr="Dosyalar" />
                </div>

                {/* Most Used Emojis Overview */}
                <div className="glass rounded-2xl p-6 mb-12">
                    <h3 className="text-xl font-bold gradient-text mb-4 text-center">
                        {language === 'tr' ? 'En Çok Kullanılan Emojiler' : 'Meistgenutzte Emojis'}
                    </h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {stats.most_used_emojis.slice(0, 5).map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/50 dark:bg-neutral-800/50"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.1 }}
                            >
                                <span className="text-4xl">{item.emoji}</span>
                                <span className="text-sm font-bold text-primary-500">{item.count}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Travel Plans Overview */}
                <div className="glass rounded-2xl p-6">
                    <h3 className="text-xl font-bold gradient-text mb-4 text-center">
                        {language === 'tr' ? 'Yolculuk Planları' : 'Reisepläne'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {stats.travel_plans.map((plan, index) => (
                            <motion.div
                                key={plan.id}
                                className="flex items-center gap-4 p-4 rounded-xl bg-white/50 dark:bg-neutral-800/50"
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <span className="text-4xl">{plan.emoji}</span>
                                <div>
                                    <p className="font-bold text-neutral-800 dark:text-neutral-200">
                                        {language === 'tr' ? plan.plan_tr : plan.plan_de}
                                    </p>
                                    <p className="text-xs text-neutral-500">
                                        {plan.status === 'geplant'
                                            ? (language === 'tr' ? 'Geplant' : 'Geplant')
                                            : (language === 'tr' ? 'Traum' : 'Traum')
                                        }
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}