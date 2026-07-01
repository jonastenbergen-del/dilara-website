'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
    const { language, toggleLanguage, t } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    // Check system preference for dark mode
    const handleScroll = () => {
        setScrolled(window.scrollY > 50);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode');
    };

    const navLinks = [
        { href: '#hero', label: t('nav_home') },
        { href: '#story', label: t('nav_story') },
        { href: '#memories', label: t('nav_memories') },
        { href: '#love', label: t('nav_love') },
        { href: '#future', label: t('nav_future') },
        { href: '#more', label: t('nav_more') },
    ];

    return (
        <>
            {/* Desktop Navbar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'py-2'
                    : 'py-4'
                    }`}
            >
                <div
                    className={`mx-auto max-w-6xl px-6 rounded-2xl transition-all duration-500 ${scrolled
                        ? 'glass shadow-soft-lg mt-2'
                        : 'bg-transparent'
                        }`}
                >
                    <div className="flex items-center justify-between h-14">
                        {/* Logo */}
                        <motion.a
                            href="#hero"
                            className="flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="text-2xl">💕</span>
                            <span className="font-display text-lg font-semibold gradient-text hidden sm:block">
                                Jonas & Dilara
                            </span>
                        </motion.a>

                        {/* Desktop Nav Links */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={i}
                                    href={link.href}
                                    className="px-4 py-2 rounded-full text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-2">
                            {/* Language Toggle */}
                            <motion.button
                                onClick={toggleLanguage}
                                className="px-3 py-1.5 rounded-full text-sm font-medium glass hover:scale-105 transition-transform"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {language === 'de' ? '🇩🇪' : '🇹🇷'} {language.toUpperCase()}
                            </motion.button>

                            {/* Dark Mode Toggle */}
                            <motion.button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-full glass hover:scale-105 transition-transform"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {darkMode ? t('nav_light_mode') : t('nav_dark_mode')}
                            </motion.button>

                            {/* Mobile Menu Button */}
                            <motion.button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 rounded-full glass hover:scale-105 transition-transform"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="w-5 h-5 relative">
                                    <motion.span
                                        className="absolute w-full h-0.5 bg-neutral-700 dark:bg-neutral-300 left-0 top-1/2 -translate-y-1/2 rounded-full"
                                        animate={{
                                            rotate: mobileMenuOpen ? 45 : 0,
                                            top: mobileMenuOpen ? '50%' : '30%',
                                        }}
                                    />
                                    <motion.span
                                        className="absolute w-full h-0.5 bg-neutral-700 dark:bg-neutral-300 left-0 top-1/2 -translate-y-1/2 rounded-full"
                                        animate={{
                                            opacity: mobileMenuOpen ? 0 : 1,
                                        }}
                                    />
                                    <motion.span
                                        className="absolute w-full h-0.5 bg-neutral-700 dark:bg-neutral-300 left-0 top-1/2 rounded-full"
                                        animate={{
                                            rotate: mobileMenuOpen ? -45 : 0,
                                            top: mobileMenuOpen ? '50%' : '70%',
                                        }}
                                    />
                                </div>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 bottom-0 w-72 glass m-4 rounded-3xl p-6"
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                            <div className="flex flex-col gap-2 mt-20">
                                {navLinks.map((link, i) => (
                                    <motion.a
                                        key={i}
                                        href={link.href}
                                        className="px-4 py-3 rounded-2xl text-lg font-medium text-neutral-700 dark:text-neutral-300 hover:bg-white/20 transition-colors"
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}