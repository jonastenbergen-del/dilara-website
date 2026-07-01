'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface SurpriseItem {
    id: number;
    type: 'letter' | 'video' | 'voice' | 'game' | 'coupon' | 'hidden';
    title_de: string;
    title_tr: string;
    description_de: string;
    description_tr: string;
    emoji: string;
    color: string;
    isHidden: boolean;
    clickCount: number;
}

const surprisesData: SurpriseItem[] = [
    {
        id: 1,
        type: 'letter',
        title_de: 'Brief für dich 💌',
        title_tr: 'Sana Mektup 💌',
        description_de: 'Ein Brief, den ich für dich geschrieben habe. Klicke, um ihn zu öffnen.',
        description_tr: 'Senin için yazdığım bir mektup. Açmak için tıkla.',
        emoji: '💌',
        color: 'from-pink-400 to-rose-500',
        isHidden: false,
        clickCount: 0,
    },
    {
        id: 2,
        type: 'video',
        title_de: 'Video-Erinnerung 🎬',
        title_tr: 'Video Anısı 🎬',
        description_de: 'Unsere schönste Video-Erinnerung. Klicke, um sie zu sehen.',
        description_tr: 'En güzel video anımız. Görmek için tıkla.',
        emoji: '🎬',
        color: 'from-blue-400 to-indigo-500',
        isHidden: false,
        clickCount: 0,
    },
    {
        id: 3,
        type: 'voice',
        title_de: 'Sprachnachricht 🎤',
        title_tr: 'Sesli Mesaj 🎤',
        description_de: 'Eine Sprachnachricht, die ich für dich aufgenommen habe.',
        description_tr: 'Senin için kaydettiğim bir sesli mesaj.',
        emoji: '🎤',
        color: 'from-purple-400 to-violet-500',
        isHidden: false,
        clickCount: 0,
    },
    {
        id: 4,
        type: 'coupon',
        title_de: 'Gutschein 🎁',
        title_tr: 'Kupon 🎁',
        description_de: 'Ein Gutschein für einen gemeinsamen Tag. Klicke, um ihn zu lösen.',
        description_tr: 'Birlikte bir gün için kupon. Çözmek için tıkla.',
        emoji: '🎁',
        color: 'from-amber-400 to-orange-500',
        isHidden: false,
        clickCount: 0,
    },
    {
        id: 5,
        type: 'hidden',
        title_de: 'Geheimer Bereich 🔒',
        title_tr: 'Gizli Alan 🔒',
        description_de: 'Klicke 7x auf das Herz, um das Geheimnis zu entdecken!',
        description_tr: 'Gizliyi keşfetmek için kalbe 7 kez tıkla!',
        emoji: '🔒',
        color: 'from-neutral-600 to-neutral-800',
        isHidden: true,
        clickCount: 0,
    },
    {
        id: 6,
        type: 'game',
        title_de: 'Kleines Spiel 🎮',
        title_tr: 'Küçük Oyun 🎮',
        description_de: 'Ein kleines Spiel für dich. Klicke, um zu spielen!',
        description_tr: 'Senin için küçük bir oyun. Oynamak için tıkla!',
        emoji: '🎮',
        color: 'from-emerald-400 to-green-500',
        isHidden: false,
        clickCount: 0,
    },
];

function SurpriseCard({
    item,
    index,
    onClick,
}: {
    item: SurpriseItem;
    index: number;
    onClick: (id: number) => void;
}) {
    const { language } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.3, once: false });

    const title = language === 'tr' ? item.title_tr : item.title_de;
    const description = language === 'tr' ? item.description_tr : item.description_de;

    const typeIcons = {
        letter: '💌',
        video: '🎬',
        voice: '🎤',
        game: '🎮',
        coupon: '🎁',
        hidden: '🔒',
    };

    return (
        <motion.div
            ref={ref}
            className="relative cursor-pointer group"
            initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1, type: 'spring' }}
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onClick(item.id)}
        >
            <div className={`glass rounded-2xl p-6 h-48 flex flex-col items-center justify-center shadow-soft-lg hover:shadow-glow transition-all duration-300 ${item.isHidden && item.clickCount >= 7 ? 'ring-2 ring-primary-400' : ''}`}>
                <motion.div
                    className="text-5xl mb-4"
                    animate={isInView ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                    } : {}}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                >
                    {item.isHidden && item.clickCount >= 7 ? '🎉' : typeIcons[item.type]}
                </motion.div>

                <h3 className="text-lg font-bold font-display gradient-text text-center mb-2">
                    {title}
                </h3>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center px-2">
                    {description}
                </p>

                {item.isHidden && item.clickCount < 7 && (
                    <motion.p
                        className="text-xs text-neutral-500 dark:text-neutral-500 mt-2"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        {language === 'tr' ? 'Gizli!' : 'Geheim!'}
                    </motion.p>
                )}

                {item.isHidden && item.clickCount >= 7 && (
                    <motion.p
                        className="text-xs text-primary-500 font-medium mt-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                    >
                        {language === 'tr' ? 'Keşfedildi! ✨' : 'Entdeckt! ✨'}
                    </motion.p>
                )}
            </div>
        </motion.div>
    );
}

function LetterModal({ onClose }: { onClose: () => void }) {
    const { language } = useLanguage();

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-white dark:bg-neutral-800 rounded-3xl p-8 max-w-lg w-full shadow-2xl relative overflow-hidden bg-[#FFFDF7] dark:bg-[#1A1A2E]"
                initial={{ scale: 0.5, y: 100, rotateX: 90 }}
                animate={{ scale: 1, y: 0, rotateX: 0 }}
                exit={{ scale: 0.5, y: 100, rotateX: -90 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                style={{ fontFamily: 'Georgia, serif' }}
            >
                <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 28px, #000 28px, #000 29px)',
                }} />

                <motion.button
                    className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 z-10"
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                >
                    ✕
                </motion.button>

                <div className="relative z-10 p-4">
                    <motion.div
                        className="text-4xl text-center mb-6"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        💌
                    </motion.div>

                    <h3 className="text-2xl font-bold text-center mb-6 gradient-text" style={{ fontFamily: 'Georgia, serif' }}>
                        {language === 'tr' ? 'Sevimli Dilara\'m,' : 'Mein liebste Dilara,'}
                    </h3>

                    <div className="space-y-4 text-neutral-700 dark:text-neutral-300 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                        <p>{language === 'tr'
                            ? 'Biliyorum, biz şu an uzaktaız. Ama biliyor musun, her gece aynı gözlere bakıyoruz ve aynı yıldızları izliyoruz.'
                            : 'Ich weiß, wir sind gerade weit voneinander entfernt. Aber weißt du was? Jeder Nacht blicke ich in die gleichen Sterne und schaue auf dieselben Sterne.'
                        }</p>

                        <p>{language === 'tr'
                            ? 'Her mesajını okuduğumda, her sesini duyduğumda gülümsüyorum. Sanki yan başdaymışsın gibi.'
                            : 'Jede Nachricht, die ich lese, jede Stimme, die ich höre, lässt mich lächeln. Als wärst du gleich da.'
                        }</p>

                        <p>{language === 'tr'
                            ? 'Seninle olduğum her an, dünyadaki en güzel yer. Uzaklık sadece bir sayı, gerçeğimiz bu kadar güçlü ki.'
                            : 'Jeder Moment mit dir ist der schönste Ort der Welt. Entfernung ist nur eine Zahl, unsere Realität ist so stark.'
                        }</p>

                        <p className="font-bold text-primary-500">{language === 'tr'
                            ? 'Seni seviyorum, bugün, yarın ve sonsuza kadar. 🌟'
                            : 'Ich liebe dich, heute, morgen und für immer. 🌟'
                        }</p>

                        <p className="text-right text-lg mt-8 italic">
                            {language === 'tr' ? '— Senin, her zaman' : '— Dein, für immer'}
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function VideoModal({ onClose }: { onClose: () => void }) {
    const { language } = useLanguage();
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-neutral-900 rounded-3xl p-8 max-w-3xl w-full shadow-2xl relative"
                initial={{ scale: 0.5, y: 100 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.5, y: 100 }}
                transition={{ type: 'spring', stiffness: 200 }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
                <motion.button
                    className="absolute top-4 right-4 text-white/70 hover:text-white z-10 text-2xl"
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                >
                    ✕
                </motion.button>

                <div className="flex justify-center mb-6">
                    <motion.div
                        className="transform rotate-[-45deg]"
                        animate={{ rotate: [-45, -45] }}
                    >
                        <video
                            ref={videoRef}
                            className="max-h-[400px] rounded-2xl"
                            controls
                            autoPlay
                            loop
                        >
                            <source src="/videos/our-video.mp4" type="video/mp4" />
                            {language === 'tr' ? 'Tarayıcınız video etiketini desteklemiyor.' : 'Ihr Browser unterstützt das video-Element.'}
                        </video>
                    </motion.div>
                </div>

                <div className="text-center bg-white/5 rounded-xl p-4 mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">🎬 {language === 'tr' ? 'Video-Erinnerung' : 'Video Anısı'}</h3>
                    <p className="text-white/60 text-sm">
                        {language === 'tr'
                            ? 'Video dosyasını "public/videos/our-video.mp4" olarak ekleyin'
                            : 'Fügen Sie Ihre Videodatei als "public/videos/our-video.mp4" hinzu'
                        }
                    </p>
                </div>

                <div className="text-center">
                    <p className="text-white/40 text-xs">
                        Unterstützt: MP4, WebM, OGG
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
}

function VoiceModal({ onClose }: { onClose: () => void }) {
    const { language } = useLanguage();

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-white dark:bg-neutral-800 rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
                initial={{ scale: 0.5, y: 100, rotateX: 90 }}
                animate={{ scale: 1, y: 0, rotateX: 0 }}
                exit={{ scale: 0.5, y: 100, rotateX: -90 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
                <motion.button
                    className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                >
                    ✕
                </motion.button>

                <div className="text-center">
                    <motion.div
                        className="text-6xl mb-6"
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        🎤
                    </motion.div>

                    <h3 className="text-2xl font-bold font-display gradient-text mb-2">
                        {language === 'tr' ? 'Sesli Mesaj' : 'Sprachnachricht'}
                    </h3>

                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                        {language === 'tr' ? 'Senin için kaydettiğim mesaj' : 'Die Nachricht, die ich für dich aufgenommen habe'}
                    </p>

                    <div className="flex items-center justify-center gap-1 mb-6 h-16">
                        {Array.from({ length: 40 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1 bg-gradient-to-t from-primary-400 to-magenta-500 rounded-full"
                                animate={{
                                    height: [8, Math.random() * 48 + 8, 8],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.03,
                                    ease: 'easeInOut',
                                }}
                            />
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-primary-100 to-magenta-100 dark:from-primary-900/30 dark:to-magenta-900/30 rounded-2xl p-6 mb-4">
                        <audio controls className="w-full" preload="metadata">
                            <source src="/audio/voice-message.mp3" type="audio/mpeg" />
                            {language === 'tr' ? 'Tarayıcınız audio etiketini desteklemiyor.' : 'Ihr Browser unterstützt das audio-Element.'}
                        </audio>
                    </div>

                    <p className="text-xs text-neutral-500">
                        {language === 'tr'
                            ? 'MP3 dosyasını "public/audio/voice-message.mp3" olarak ekleyin'
                            : 'Fügen Sie Ihre MP3-Datei als "public/audio/voice-message.mp3" hinzu'}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
}

function GameModal({ onClose }: { onClose: () => void }) {
    const { language, t } = useLanguage();
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [hearts, setHearts] = useState<{ id: number; x: number; top: number }[]>([]);

    const startGame = () => {
        setGameStarted(true);
        setGameOver(false);
        setScore(0);
        setTimeLeft(30);
        setHearts([]);
    };

    useEffect(() => {
        if (!gameStarted || gameOver) return;

        const spawnInterval = setInterval(() => {
            const newHeart = {
                id: Date.now(),
                x: Math.random() * 85 + 5,
                top: Math.random() * 50 + 10,
            };
            setHearts(prev => [...prev.slice(-6), newHeart]);
        }, 600);

        return () => clearInterval(spawnInterval);
    }, [gameStarted, gameOver]);

    useEffect(() => {
        if (!gameStarted || gameOver) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setGameOver(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [gameStarted, gameOver]);

    const catchHeart = (id: number) => {
        setHearts(prev => prev.filter(h => h.id !== id));
        setScore(prev => prev + 1);
    };

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-gradient-to-br from-emerald-900 to-green-900 rounded-3xl p-8 max-w-lg w-full shadow-2xl relative overflow-hidden"
                initial={{ scale: 0.5, y: 100, rotateX: 90 }}
                animate={{ scale: 1, y: 0, rotateX: 0 }}
                exit={{ scale: 0.5, y: 100, rotateX: -90 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
                <motion.button
                    className="absolute top-4 right-4 text-white/70 hover:text-white z-10 text-2xl"
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                >
                    ✕
                </motion.button>

                {!gameStarted || gameOver ? (
                    <div className="text-center">
                        <motion.div
                            className="text-6xl mb-6"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            🎮
                        </motion.div>

                        <h3 className="text-2xl font-bold text-white mb-4">
                            {t('game_title')}
                        </h3>

                        <p className="text-white/70 mb-6">
                            {t('game_description')}
                        </p>

                        {gameOver && (
                            <motion.div
                                className="mb-6 p-4 bg-white/10 rounded-xl"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                            >
                                <p className="text-white text-lg mb-2">
                                    {t('game_score')}
                                </p>
                                <p className="text-4xl font-bold text-primary-400">{score}</p>
                                <p className="text-white/50 text-sm mt-2">
                                    {score >= 15
                                        ? t('game_excellent')
                                        : score >= 10
                                            ? t('game_good')
                                            : t('game_try_again')}
                                </p>
                            </motion.div>
                        )}

                        <motion.button
                            className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 text-white font-semibold shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={startGame}
                        >
                            {gameOver
                                ? t('game_play_again')
                                : t('game_start')}
                        </motion.button>
                    </div>
                ) : (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-white">
                                <span className="text-white/60 text-sm">{t('game_score')}:</span>
                                <span className="text-2xl font-bold text-primary-400 ml-2">{score}</span>
                            </div>
                            <div className="text-white">
                                <span className="text-white/60 text-sm">{t('game_time')}:</span>
                                <span className={`text-2xl font-bold ml-2 ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-primary-400'}`}>
                                    {timeLeft}s
                                </span>
                            </div>
                        </div>

                        <div className="relative h-64 bg-white/5 rounded-xl overflow-hidden border border-white/10">
                            {hearts.map(heart => (
                                <motion.button
                                    key={heart.id}
                                    className="absolute text-3xl cursor-pointer hover:scale-125 transition-transform"
                                    style={{ left: `${heart.x}%`, top: `${heart.top}%` }}
                                    animate={{ y: [0, 200], opacity: [1, 0] }}
                                    transition={{ duration: 2.5, ease: 'linear' }}
                                    onClick={(e: React.MouseEvent) => {
                                        e.stopPropagation();
                                        catchHeart(heart.id);
                                    }}
                                >
                                    ❤️
                                </motion.button>
                            ))}

                            {hearts.length === 0 && gameStarted && !gameOver && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <p className="text-white/40 text-sm animate-pulse">
                                        {t('game_waiting')}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}

function SurpriseModal({
    item,
    onClose,
    onUpdateClickCount,
}: {
    item: SurpriseItem;
    onClose: () => void;
    onUpdateClickCount: (count: number) => void;
}) {
    const { language, t } = useLanguage();
    const [internalClickCount, setInternalClickCount] = useState(item.clickCount);
    const [showContent, setShowContent] = useState(!item.isHidden || item.clickCount >= 7);

    const title = language === 'tr' ? item.title_tr : item.title_de;

    const handleOpenClick = () => {
        if (item.isHidden && !showContent) {
            const newCount = internalClickCount + 1;
            setInternalClickCount(newCount);
            onUpdateClickCount(newCount);
            if (newCount >= 7) {
                setShowContent(true);
            }
        }
    };

    useEffect(() => {
        setInternalClickCount(item.clickCount);
        setShowContent(!item.isHidden || item.clickCount >= 7);
    }, [item.isHidden, item.clickCount]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-white dark:bg-neutral-800 rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
                initial={{ scale: 0.5, y: 100, rotateX: 90 }}
                animate={{ scale: 1, y: 0, rotateX: 0 }}
                exit={{ scale: 0.5, y: 100, rotateX: -90 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
                <motion.button
                    className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 z-10"
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                >
                    ✕
                </motion.button>

                {item.type === 'letter' && showContent && (
                    <LetterModal onClose={onClose} />
                )}
                {item.type === 'video' && showContent && (
                    <VideoModal onClose={onClose} />
                )}
                {item.type === 'voice' && showContent && (
                    <VoiceModal onClose={onClose} />
                )}
                {item.type === 'game' && showContent && (
                    <GameModal onClose={onClose} />
                )}
                {item.type === 'coupon' && showContent && (
                    <div className="text-center">
                        <motion.div
                            className="text-6xl mb-6"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            🎁
                        </motion.div>
                        <h3 className="text-2xl font-bold font-display gradient-text mb-4">
                            {t('coupon_title')}
                        </h3>
                        <div className="bg-gradient-to-r from-primary-100 to-magenta-100 dark:from-primary-900/30 dark:to-magenta-900/30 rounded-2xl p-6 mb-6">
                            <p className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                                {t('coupon_voucher')}
                            </p>
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                {t('coupon_description')}
                            </p>
                        </div>
                        <p className="text-neutral-500 text-sm">
                            {t('coupon_valid')}
                        </p>
                    </div>
                )}

                {item.isHidden && !showContent && (
                    <div className="text-center">
                        <motion.div
                            className="text-6xl mb-6"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            🔒
                        </motion.div>
                        <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
                            {t('secret_locked')}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                            {language === 'tr'
                                ? `Kalbe ${7 - internalClickCount} kez daha tıkla`
                                : `Noch ${7 - internalClickCount}x auf das Herz klicken`}
                        </p>
                        <motion.button
                            className="mt-4 px-8 py-4 rounded-full bg-gradient-to-r from-primary-400 to-magenta-500 text-white font-semibold shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleOpenClick}
                        >
                            {t('secret_open')}
                        </motion.button>
                    </div>
                )}

                {item.isHidden && showContent && (
                    <div className="text-center">
                        <motion.div
                            className="text-7xl mb-6"
                            animate={{
                                scale: [1, 1.3, 1],
                                rotate: [0, 360],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            🎉
                        </motion.div>

                        <h3 className="text-2xl font-bold font-display gradient-text mb-4">
                            {t('secret_unlocked_title')}
                        </h3>

                        <div className="flex justify-center gap-2 mb-6">
                            {['🎊', '🎉', '✨', '💕', '🌟', '💖', '🎊', '🎉'].map((emoji, i) => (
                                <motion.span
                                    key={i}
                                    className="text-2xl"
                                    animate={{
                                        y: [0, -30, 0],
                                        rotate: [0, 180, 360],
                                        scale: [1, 1.3, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.1,
                                        ease: 'easeInOut',
                                    }}
                                >
                                    {emoji}
                                </motion.span>
                            ))}
                        </div>

                        <div className="bg-gradient-to-r from-primary-100 via-magenta-100 to-gold-100 dark:from-primary-900/30 dark:via-magenta-900/30 dark:to-gold-900/30 rounded-2xl p-6 mb-6 border-2 border-primary-300 dark:border-primary-600">
                            <p className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-3 leading-relaxed">
                                {t('secret_unlocked_message')}
                            </p>
                            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                                {t('secret_gift_message')}
                            </p>

                            <div className="bg-white/50 dark:bg-neutral-700/50 rounded-xl p-4 mb-4">
                                <p className="text-sm italic text-neutral-600 dark:text-neutral-400 mb-2">
                                    "{t('secret_quote')}"
                                </p>
                                <p className="text-xs text-primary-500 font-medium">
                                    {t('secret_signature')}
                                </p>
                            </div>

                            <div className="flex justify-center gap-4 text-3xl">
                                <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>💕</motion.span>
                                <motion.span animate={{ scale: [1, 1.2, 1], delay: 0.3 }} transition={{ duration: 1.5, repeat: Infinity }}>💖</motion.span>
                                <motion.span animate={{ scale: [1, 1.2, 1], delay: 0.6 }} transition={{ duration: 1.5, repeat: Infinity }}>💗</motion.span>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl p-4 mb-6">
                            <p className="text-white font-bold text-lg mb-2">
                                🎁 {t('secret_bonus_title')}
                            </p>
                            <p className="text-white/90 text-sm">
                                {t('secret_bonus_message')}
                            </p>
                        </div>

                        <motion.button
                            className="px-8 py-4 rounded-full bg-gradient-to-r from-primary-400 to-magenta-500 text-white font-semibold shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onClose}
                        >
                            {t('close')}
                        </motion.button>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}

export default function SurprisesSection() {
    const { t } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.2, once: false });
    const [surprises, setSurprises] = useState(surprisesData);
    const [selectedSurprise, setSelectedSurprise] = useState<SurpriseItem | null>(null);

    const handleClick = (id: number) => {
        const surprise = surprises.find(s => s.id === id);
        if (surprise) {
            setSelectedSurprise(surprise);
        }
    };

    const handleUpdateClickCount = (count: number) => {
        if (selectedSurprise) {
            setSurprises(prev =>
                prev.map(s =>
                    s.id === selectedSurprise.id ? { ...s, clickCount: count } : s
                )
            );
        }
    };

    const handleModalClose = () => {
        setSelectedSurprise(null);
    };

    return (
        <section
            id="more"
            className="min-h-screen py-24 bg-gradient-to-b from-neutral-50 via-amber-50/20 to-neutral-50 dark:from-[#0A0A1A] dark:via-[#1A1520] dark:to-[#0A0A1A] relative overflow-hidden"
        >
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.div
                    ref={ref}
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="inline-block mb-4 text-5xl"
                        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        🎁
                    </motion.div>
                    <h2 className="text-4xl sm:text-5xl font-bold font-display gradient-text mb-4">
                        {t('surprises_title')}
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
                        {t('surprises_subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
                    {surprises.map((surprise, index) => (
                        <SurpriseCard
                            key={surprise.id}
                            item={surprise}
                            index={index}
                            onClick={handleClick}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedSurprise && (
                    <SurpriseModal
                        item={selectedSurprise}
                        onClose={handleModalClose}
                        onUpdateClickCount={handleUpdateClickCount}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}