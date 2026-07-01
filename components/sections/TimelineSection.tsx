'use client';

import { useRef, useState, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import timelineData from '@/data/timeline.json';
import AdminPanel from '@/components/admin/AdminPanel';

interface TimelineEvent {
    id: number;
    date: string;
    dateDisplay: string;
    title_de: string;
    title_tr: string;
    description_de: string;
    description_tr: string;
    emoji: string;
    image: string | null;
    highlight: boolean;
}

function TimelineCard({ event, index }: { event: TimelineEvent; index: number }) {
    const { language } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.2, once: false });
    const [isExpanded, setIsExpanded] = useState(false);

    const isEven = index % 2 === 0;

    // Use language-aware titles and descriptions
    const title = language === 'tr' ? event.title_tr : event.title_de;
    const description = language === 'tr' ? event.description_tr : event.description_de;
    const expandHint = language === 'tr'
        ? (isExpanded ? 'Daha az göster' : 'Daha fazla göster')
        : (isExpanded ? 'Weniger anzeigen' : 'Mehr anzeigen');

    return (
        <motion.div
            ref={ref}
            className={`flex items-center justify-center mb-16 sm:mb-24 ${isEven ? '' : 'flex-row-reverse'}`}
            initial={{ opacity: 0, x: isEven ? -80 : 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1, type: 'spring', stiffness: 100 }}
        >
            {/* Timeline dot */}
            <div className="absolute left-1/2 -translate-x-1/2 z-10">
                <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${event.highlight
                        ? 'bg-gradient-to-br from-primary-400 to-magenta-500 shadow-glow'
                        : 'bg-gradient-to-br from-primary-300 to-gold-500 shadow-soft'
                        }`}
                    animate={isInView ? { scale: [0, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                >
                    {event.emoji}
                </motion.div>
                {/* Glow effect for highlights */}
                {event.highlight && (
                    <motion.div
                        className="absolute inset-0 rounded-full bg-primary-400/30 blur-lg"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                )}
            </div>

            {/* Card */}
            <motion.div
                className={`w-full max-w-xl mx-4 sm:mx-12 glass rounded-2xl p-6 cursor-pointer shadow-soft-lg hover:shadow-glow transition-all duration-500 ${event.highlight ? 'border border-primary-300/30' : ''}`}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {/* Date badge */}
                <motion.div
                    className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-primary-400/20 to-magenta-500/20 text-sm font-medium text-primary-600 dark:text-primary-400 mb-3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1 + 0.2 }}
                >
                    {event.dateDisplay}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold font-display gradient-text mb-3">
                    {title}
                </h3>

                {/* Description (collapsible) */}
                <AnimatePresence>
                    {isExpanded ? (
                        <motion.p
                            className="text-neutral-700 dark:text-neutral-300 leading-relaxed"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {description}
                        </motion.p>
                    ) : (
                        <motion.p
                            className="text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            {description.substring(0, 80)}...
                        </motion.p>
                    )}
                </AnimatePresence>

                {/* Expand hint */}
                <motion.div
                    className="text-xs text-neutral-500 dark:text-neutral-500 mt-3 flex items-center gap-1"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <span>{isExpanded ? '▼' : '▶'}</span>
                    <span>{expandHint}</span>
                </motion.div>

                {/* Image (if exists) */}
                {event.image && (
                    <motion.div
                        className="mt-4 rounded-xl overflow-hidden"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="w-full h-48 bg-gradient-to-br from-primary-200 to-magenta-200 rounded-xl flex items-center justify-center text-4xl">
                            📸
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
}

export default function TimelineSection() {
    const { language, t } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.1, once: false });

    const [events, setEvents] = useState<TimelineEvent[]>(timelineData.events as TimelineEvent[]);
    const [adminOpen, setAdminOpen] = useState(false);

    const handleSaveEvent = (newEvent: any) => {
        const timelineEvent: TimelineEvent = {
            id: newEvent.id,
            date: newEvent.date || '',
            dateDisplay: newEvent.date || '',
            title_de: newEvent.title_de,
            title_tr: newEvent.title_tr,
            description_de: newEvent.description_de || '',
            description_tr: newEvent.description_tr || '',
            emoji: newEvent.emoji,
            image: null,
            highlight: false,
        };
        setEvents(prev => [...prev, timelineEvent]);
    };

    const handleDeleteEvent = (id: number) => {
        if (confirm(language === 'tr' ? 'Emin misiniz?' : 'Sind Sie sicher?')) {
            setEvents(prev => prev.filter(e => e.id !== id));
        }
    };

    // Translations for this section
    const storyHint = language === 'tr'
        ? '✨ Hikaye devam ediyor... ✨'
        : '✨ Die Geschichte geht weiter... ✨';

    return (
        <section
            id="story"
            className="min-h-screen py-24 bg-gradient-to-b from-neutral-50 via-primary-50/30 to-neutral-50 dark:from-[#0A0A1A] dark:via-[#12122A] dark:to-[#0A0A1A] relative overflow-hidden"
        >
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, rgba(232, 93, 122, 0.08), transparent)',
                    }}
                    animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, rgba(201, 169, 110, 0.08), transparent)',
                    }}
                    animate={{ scale: [1, 1.3, 1], x: [0, -40, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Section header */}
                <motion.div
                    ref={ref}
                    className="text-center mb-16 sm:mb-24"
                    initial={{ opacity: 0, y: -50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="inline-block mb-4"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        <span className="text-5xl">💕</span>
                    </motion.div>

                    <motion.h2
                        className="text-4xl sm:text-5xl md:text-6xl font-bold font-display gradient-text mb-4"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        {t('story_title')}
                    </motion.h2>

                    <motion.p
                        className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.4 }}
                    >
                        {t('story_subtitle')}
                    </motion.p>

                    {/* Timeline line */}
                    <motion.div
                        className="absolute left-1/2 top-64 bottom-64 w-0.5 bg-gradient-to-b from-primary-400 via-magenta-500 to-gold-500 -translate-x-1/2 opacity-30"
                        initial={{ height: 0 }}
                        animate={isInView ? { height: 'calc(100% - 20rem)' } : {}}
                        transition={{ duration: 2, delay: 0.5 }}
                    />
                </motion.div>

                {/* Timeline events */}
                <div className="relative">
                    {events.map((event, index) => (
                        <TimelineCard key={event.id} event={event} index={index} />
                    ))}
                </div>

                {/* Bottom decoration */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: events.length * 0.1 + 0.5 }}
                >
                    <p className="text-neutral-500 dark:text-neutral-500 text-sm">
                        {storyHint}
                    </p>
                </motion.div>

                {/* Admin Button */}
                <motion.button
                    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-primary-400 to-magenta-500 text-white shadow-glow flex items-center justify-center text-2xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setAdminOpen(true)}
                >
                    ⚙️
                </motion.button>
            </div>

            {/* Admin Panel Modal */}
            <AnimatePresence>
                {adminOpen && (
                    <AdminPanel
                        isOpen={adminOpen}
                        onClose={() => setAdminOpen(false)}
                        mode="timeline"
                        onSave={handleSaveEvent}
                        onDelete={handleDeleteEvent}
                        items={events}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
