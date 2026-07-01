'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface AdminEvent {
    id: number;
    title_de: string;
    title_tr: string;
    date: string;
    description_de: string;
    description_tr: string;
    emoji: string;
}

interface AdminMemory {
    id: number;
    title_de: string;
    title_tr: string;
    date: string;
    description_de: string;
    description_tr: string;
    emoji: string;
}

interface AdminLoveCard {
    id: number;
    text_de: string;
    text_tr: string;
    emoji: string;
}

interface AdminPanelProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'timeline' | 'memories' | 'lovecards';
    onSave: (data: AdminEvent | AdminMemory | AdminLoveCard) => void;
    onDelete: (id: number) => void;
    items: any[];
}

export default function AdminPanel({
    isOpen,
    onClose,
    mode,
    onSave,
    onDelete,
    items,
}: AdminPanelProps) {
    const { language } = useLanguage();
    const [isAdmin, setIsAdmin] = useState(false);
    const [password, setPassword] = useState('');
    const [correctPassword, setCorrectPassword] = useState(false);

    // Admin password - change this to your preferred password
    const ADMIN_PASSWORD = 'dilara2026';

    const [formData, setFormData] = useState({
        title_de: '',
        title_tr: '',
        date: '',
        description_de: '',
        description_tr: '',
        emoji: '💕',
        text_de: '',
        text_tr: '',
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setCorrectPassword(true);
            setIsAdmin(true);
        } else {
            alert(language === 'tr' ? 'Yanlış şifre!' : 'Falsches Passwort!');
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const newItem = {
            id: Date.now(),
            ...formData,
        };
        onSave(newItem);
        setFormData({
            title_de: '',
            title_tr: '',
            date: '',
            description_de: '',
            description_tr: '',
            emoji: '💕',
            text_de: '',
            text_tr: '',
        });
        if (language === 'tr') {
            alert('Kaydedildi! ✨');
        } else {
            alert('Gespeichert! ✨');
        }
    };

    if (!isOpen) return null;

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-white dark:bg-neutral-800 rounded-3xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.5, y: 100 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.5, y: 100 }}
                transition={{ type: 'spring', stiffness: 200 }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
                {/* Close button */}
                <motion.button
                    className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                >
                    ✕
                </motion.button>

                <h2 className="text-2xl font-bold font-display gradient-text mb-6">
                    {mode === 'timeline' && (language === 'tr' ? 'Etkinlik Yöneticisi' : 'Ereignis-Verwaltung')}
                    {mode === 'memories' && (language === 'tr' ? 'Anı Yöneticisi' : 'Erinnerungen-Verwaltung')}
                    {mode === 'lovecards' && (language === 'tr' ? 'Kart Yöneticisi' : 'Karten-Verwaltung')}
                </h2>

                {!correctPassword ? (
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                {language === 'tr' ? 'Şifre girin:' : 'Passwort eingeben:'}
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-primary-300 dark:border-primary-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                        <motion.button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-400 to-magenta-500 text-white font-semibold"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {language === 'tr' ? 'Giriş' : 'Einloggen'}
                        </motion.button>
                    </form>
                ) : (
                    <div className="space-y-6">
                        {/* Current items */}
                        <div>
                            <h3 className="text-lg font-bold mb-4">
                                {language === 'tr' ? 'Mevcut Liste' : 'Aktuelle Liste'} ({items.length})
                            </h3>
                            <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
                                {items.map((item) => {
                                    const titleDe = item.title_de || item.text_de || 'Kein Titel';
                                    const titleTr = item.title_tr || item.text_tr || 'Başlık yok';
                                    return (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-primary-50 to-magenta-50 dark:from-neutral-800 dark:to-neutral-700 border border-primary-200 dark:border-neutral-600 shadow-md"
                                        >
                                            <div className="flex-1 mr-3">
                                                <p className="text-sm font-bold text-neutral-900 dark:text-white mb-1">
                                                    🇩🇪 {titleDe}
                                                </p>
                                                <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                                                    🇹🇷 {titleTr}
                                                </p>
                                            </div>
                                            <motion.button
                                                className="text-red-600 hover:text-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 p-2 rounded-lg transition-colors flex-shrink-0"
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => onDelete(item.id)}
                                            >
                                                🗑️
                                            </motion.button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Add new item form */}
                        <form onSubmit={handleSave} className="space-y-4">
                            <h3 className="text-lg font-bold">
                                {language === 'tr' ? 'Yeni Ekle' : 'Neues hinzufügen'}
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        {language === 'tr' ? 'Almanca Başlık' : 'Deutscher Titel'}
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title_de || formData.text_de}
                                        onChange={(e) => setFormData({ ...formData, title_de: e.target.value, text_de: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-primary-300 dark:border-primary-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        {language === 'tr' ? 'Türkçe Başlık' : 'Türkischer Titel'}
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title_tr || formData.text_tr}
                                        onChange={(e) => setFormData({ ...formData, title_tr: e.target.value, text_tr: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-primary-300 dark:border-primary-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {mode !== 'lovecards' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            {language === 'tr' ? 'Tarih' : 'Datum'}
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-primary-300 dark:border-primary-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all"
                                            placeholder="z.B. 1. Januar 2026"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                {language === 'tr' ? 'Almanca Açıklama' : 'Deutsche Beschreibung'}
                                            </label>
                                            <textarea
                                                value={formData.description_de}
                                                onChange={(e) => setFormData({ ...formData, description_de: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-primary-300 dark:border-primary-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all"
                                                rows={3}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                {language === 'tr' ? 'Türkçe Açıklama' : 'Türkische Beschreibung'}
                                            </label>
                                            <textarea
                                                value={formData.description_tr}
                                                onChange={(e) => setFormData({ ...formData, description_tr: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-primary-300 dark:border-primary-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all"
                                                rows={3}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    {language === 'tr' ? 'Emoji Seçin' : 'Emoji auswählen'}
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {['💕', '💖', '💗', '🌟', '✨', '💋', '🎬', '📸', '🐜', '😊', '🤗', '💪', '🙏', '😂', '🗼', '🎤', '👑', '😄', '💎', '🌈', '🗺️', '🎧', '💝'].map((emoji) => (
                                        <motion.button
                                            key={emoji}
                                            type="button"
                                            className={`text-2xl p-2 rounded-lg ${formData.emoji === emoji ? 'bg-primary-200 dark:bg-primary-800' : 'bg-neutral-100 dark:bg-neutral-700'}`}
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setFormData({ ...formData, emoji })}
                                        >
                                            {emoji}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-400 to-magenta-500 text-white font-semibold"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {language === 'tr' ? 'Kaydet' : 'Speichern'}
                            </motion.button>
                        </form>

                        {/* Logout button */}
                        <motion.button
                            className="w-full py-2 rounded-xl bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                setCorrectPassword(false);
                                setIsAdmin(false);
                                setPassword('');
                            }}
                        >
                            {language === 'tr' ? 'Çıkış' : 'Ausloggen'}
                        </motion.button>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}