// ============================================
// INTERNATIONALIZATION (i18n) TRANSLATIONS
// ============================================
// Alle Texte der Website auf Deutsch und Türkisch
// ============================================

export type TranslationKey = keyof (typeof translations.de);

export const translations = {
    de: {
        // ===== NAVIGATION =====
        nav_home: "Home",
        nav_story: "Geschichte",
        nav_memories: "Erinnerungen",
        nav_love: "Liebe",
        nav_future: "Zukunft",
        nav_more: "Mehr",
        nav_dark_mode: "🌙",
        nav_light_mode: "☀️",

        // ===== HERO SECTION =====
        hero_welcome_typing: ["Willkommen 💕", "Merhaba ✨", "Unsere Geschichte 💫", "Liebe für immer 🌟"],
        hero_title: "Jonas & Dilara",
        hero_subtitle: "Eine Geschichte voller Liebe, Lachen und unendlicher Momente",
        hero_countdown_days: "Tage",
        hero_countdown_hours: "Stunden",
        hero_countdown_minutes: "Minuten",
        hero_countdown_seconds: "Sekunden",
        hero_countdown_infinity: "Mehr...",
        hero_cta: "Unsere Reise beginnen 💕",
        hero_scroll: "Scroll",

        // ===== OUR STORY / TIMELINE =====
        story_title: "Unsere Geschichte",
        story_subtitle: "Jeder Moment mit dir ist ein Geschenk",
        story_section_1_title: "Unser erster Chat",
        story_section_1_date: "28. Oktober 2025",
        story_section_1_description: "Der Tag, an dem alles begann. Unsere erste Nachricht und ich wusste noch nicht, was mich erwartet.",
        story_section_2_title: "Erstes Video Call",
        story_section_2_date: "November 2025",
        story_section_2_description: "Dein Gesicht zum ersten Mal sehen war etwas Unglaubliches. Selbst durch den Bildschirm strahlte deine Wärme.",
        story_section_3_title: "Erster Kuss",
        story_section_3_date: "Dezember 2025",
        story_section_3_description: "Ein Moment, der alles verändert hat. Die Zeit blieb stehen und ich wusste, du bist die Eine.",
        story_section_4_title: "Fernbeziehung beginnt",
        story_section_4_date: "Januar 2026",
        story_section_4_description: "Kilometer konnten uns nicht voneinander trennen. Jede Nachricht, jeder Call hat uns näher gebracht.",
        story_section_5_title: "Erste gemeinsame Reise",
        story_section_5_date: "Februar 2026",
        story_section_5_description: "Paris wartete auf uns. Die Stadt der Liebe wurde zum Zeugen unserer unendlichen Verbundenheit.",
        story_section_6_title: "Seni seviyorum",
        story_section_6_date: "März 2026",
        story_section_6_description: "Die drei Wörter, die alles sagen. In jeder Sprache, zu jeder Zeit, von ganzem Herzen.",
        story_section_7_title: "Unser tägliches Glück",
        story_section_7_date: "Jeden Tag seitdem",
        story_section_7_description: "Jede Nachricht, jedes Lachen, jede Umarmung – du machst mein Leben vollständig.",

        // ===== MEMORIES / ALBUM =====
        memories_title: "Erinnerungsalbum",
        memories_subtitle: "Momente, die für immer bleiben",
        memories_polaroid_hint: "Klicke auf ein Bild, um die Geschichte dahinter zu sehen",
        memories_empty: "Noch keine Erinnerungen vorhanden. Füge bald Fotos hinzu!",

        // ===== AI CHAT ANALYSIS =====
        chat_title: "Unsere Chat-Geschichten",
        chat_subtitle: "KI-analyisierte Momente aus unseren Gesprächen",
        chat_sweetest_messages: "Süßeste Nachrichten",
        chat_funny_moments: "Lustigste Momente",
        chat_first_i_love_you: 'Erstes "Ich liebe dich"',
        chat_longest_conversation: "Längstes Gespräch",
        chat_most_used_emoji: "Meistgenutztes Emoji",
        chat_active_month: "Aktivster Monat",
        chat_insider_joke: "Insider-Witz",
        chat_travel_plans: "Reisepläne",
        chat_voice_messages: "Stimmnachrichten",
        chat_stats_total_messages: "Gesamte Nachrichten",
        chat_stats_photos_shared: "Geteilte Fotos",
        chat_stats_voice_calls: "Sprachanrufe",

        // ===== WHY I LOVE YOU =====
        love_title: "Warum ich dich liebe",
        love_subtitle: "365 Gründe – einer für jeden Tag des Jahres",
        love_card_flip_hint: "Klicke, um die Rückseite zu sehen",
        love_card_1: "Dein Lächeln, das meine ganzen Tage erhellen kann",
        love_card_2: "Die Art, wie du über Dinge sprichst, die dich begeistern",
        love_card_3: "Deine Stärke, die mich jeden Tag inspiriert",
        love_card_4: "Die Wärme deiner Umarmung, selbst durch die Distanz",
        love_card_5: "Deine Geduld mit mir und meiner manchmal chaotischen Art",
        love_card_6: "Die Art, wie du mir immer das gute Gefühl gibst",
        love_card_7: "Deinen Sinn für Humor, der selbst schlechte Tage rettet",
        love_card_8: "Die Träume, die wir gemeinsam träumen",

        // ===== OUR FUTURE / BUCKET LIST =====
        future_title: "Unsere Zukunft",
        future_subtitle: "Träume, die wir gemeinsam verwirklichen wollen",
        future_bucket_list: "Unsere Traumliste",
        future_travel: "Reisen",
        future_goals: "Ziele",
        future_wishes: "Wünsche",
        future_projects: "Projekte",
        future_add_item: "Neuen Traum hinzufügen",
        future_completed: "Erfüllt! ✨",
        future_progress: "Fortschritt",
        future_travel_dream_1: "Zusammen nach Paris – die Stadt der Liebe",
        future_travel_dream_2: "Reise nach Istanbul – zu ihrer Familie",
        future_travel_dream_3: "Urlaub auf den Azoren",
        future_travel_dream_4: "Japan gemeinsam entdecken",
        future_goal_dream_1: "Zusammenziehen",
        future_goal_dream_2: "Gemeinsames Haus bauen",
        future_goal_dream_3: "Zusammen reisen und die Welt entdecken",
        future_wish_dream_1: "Einen Garten mit Blumen",
        future_wish_dream_2: "Jeden Tag zusammen aufwachen",
        future_wish_dream_3: "Unendliche Liebe und Glück",

        // ===== SURPRISES =====
        surprises_title: "Überraschungsbereich",
        surprises_subtitle: "Klicke und entdecke etwas Besonderes",
        surprise_letter: "Brief für dich",
        surprise_video: "Unsere Video-Erinnerung",
        surprise_voice: "Sprachnachricht",
        surprise_game: "Kleines Spiel",
        surprise_coupon: "Gutschein",
        surprise_hidden: "Geheimer Bereich",
        surprise_click_hint: "Klicke 7x auf das Herz",
        surprise_found: "🎉 Du hast ein Geheimnis gefunden!",
        surprise_valentines: "Valentinstag-Special!",
        surprise_birthday: "Geburtstags-Special!",

        // ===== GAME =====
        game_title: "Herzen-Jagd",
        game_description: "Fange so viele Herzen wie möglich in 30 Sekunden!",
        game_score: "Dein Score",
        game_time: "Zeit",
        game_waiting: "Herzen fallen...",
        game_start: "Starten",
        game_play_again: "Nochmal spielen",
        game_excellent: "🌟 Fantastisch!",
        game_good: "👏 Gut gemacht!",
        game_try_again: "💪 Versuch es nochmal!",

        // ===== COUPON =====
        coupon_title: "Gutschein",
        coupon_voucher: "🌟 Together Day Gutschein 🌟",
        coupon_description: "Dieser Gutschein berechtigt zu einem gemeinsamen Tag nach Wahl!",
        coupon_valid: "Immer gültig ❤️",

        // ===== SECRET =====
        secret_locked: "Geheim",
        secret_open: "Öffnen",
        secret_unlocked_title: "Glückwunsch! Entdeckt! ✨",
        secret_unlocked_message: "Du hast das Geheimnis entsperrt! 🗝️",
        secret_gift_message: "Dieses geheime Geschenk ist nur für dich, meine Lieblingsperson auf der Welt!",
        secret_quote: "Du bist für mich alles.",
        secret_signature: "— Dein, für immer",
        secret_bonus_title: "BONUS ÜBERRASCHUNG!",
        secret_bonus_message: "Du hast 7x auf das Herz geklickt – du bist wirklich motiviert!",

        // ===== GENERAL =====
        close: "Schließen",

        // ===== STAR SKY =====
        star_title: "Sternenhimmel",
        star_subtitle: "Jeder Stern ist eine Erinnerung an einen besonderen Moment mit dir",
        star_click_hint: "Klicke auf einen Stern, um die Erinnerung zu sehen",
        star_auto_night: "Automatischer Nachtmodus",

        // ===== MUSIC =====
        music_title: "Unsere Musik",
        music_subtitle: "Songs, die uns verbinden und aneinander erinnern",
        music_song_1_title: "Unser Song",
        music_song_1_story: "Dieser Song spielt, als wir uns das erste Mal begegnet sind.",
        music_song_2_title: "Melodie der Sterne",
        music_song_2_story: "Wir haben diese Melodie bei einem Video-Call gemeinsam gehört.",
        music_song_3_title: "Endless Love",
        music_song_3_story: "Der Song, der unsere Fernbeziehung beschrieben hat.",

        // ===== RANDOM MOMENT =====
        random_title: "Überrasche mich!",
        random_subtitle: "Drücke den Button und erhalte eine zufällige Erinnerung",
        random_button: "✨ Überrasche mich ✨",

        // ===== EASTER EGGS =====
        easter_secret: "Geheimer Bereich",
        easter_click_heart: "Klicke 7x auf das Herz",
        easter_confetti: "🎉 Konfetti!",
        easter_hearts: "💕 Herzen überall! 💕",
        easter_flowers: "🌹 Blumen für dich! 🌹",
        easter_konami: "🎮 Konami-Code aktiviert!",

        // ===== FOOTER =====
        footer_made_with: "Gemacht mit",
        footer_for: "für",
        footer_forever: "Für immer, Jonas & Dilara 💕",
    },

    tr: {
        // ===== NAVIGATION =====
        nav_home: "Ana Sayfa",
        nav_story: "Hikaye",
        nav_memories: "Anılar",
        nav_love: "Aşk",
        nav_future: "Gelecek",
        nav_more: "Daha",
        nav_dark_mode: "🌙",
        nav_light_mode: "☀️",

        // ===== HERO SECTION =====
        hero_welcome_typing: ["Hoş Geldin 💕", "Merhaba ✨", "Hikayemiz 💫", "Sonsuza dek aşk 🌟"],
        hero_title: "Jonas & Dilara",
        hero_subtitle: "Aşk, kahkaha ve sonsuz anlarla dolu bir hikaye",
        hero_countdown_days: "gün",
        hero_countdown_hours: "saat",
        hero_countdown_minutes: "dakika",
        hero_countdown_seconds: "saniye",
        hero_countdown_infinity: "Daha fazla...",
        hero_cta: "Yolculuğumuz Başlasın 💕",
        hero_scroll: "Kaydır",

        // ===== OUR STORY / TIMELINE =====
        story_title: "Hikayemiz",
        story_subtitle: "Seniyle her an bir hediyedir",
        story_section_1_title: "İlk Mesajımız",
        story_section_1_date: "28 Ekim 2025",
        story_section_1_description: "Her şeyin başladığı gün. İlk mesajımız ve henüz neler beklediğimi bilmiyordum.",
        story_section_2_title: "İlk Video Görüşmesi",
        story_section_2_date: "Kasım 2025",
        story_section_2_description: "Yüzünü ilk kez görmek inanılmazdı. Ekranın arkasına rağmen ışığını hissediyordum.",
        story_section_3_title: "İlk Öpücüğümüz",
        story_section_3_date: "Aralık 2025",
        story_section_3_description: "Her şeyi değiştiren bir an. Zaman dondu ve biliyordun, sen o birisin.",
        story_section_4_title: "Mesafeli İlişki Başlıyor",
        story_section_4_date: "Ocak 2026",
        story_section_4_description: "Kilometre bizi birbirimizden ayıramadı. Her mesaj, her görüşte daha da yakınlaştık.",
        story_section_5_title: "İlk Ortak Yolculuğumuz",
        story_section_5_date: "Şubat 2026",
        story_section_5_description: "Paris bize bekledi. Aşk kenti, sonsuz bağlantımızın tanığı oldu.",
        story_section_6_title: "Seni Seviyorum",
        story_section_6_date: "Mart 2026",
        story_section_6_description: "Her şeyi söyleyen üç kelime. Her dilde, her zamanda, içtenlikle.",
        story_section_7_title: "Günlük Mutluluğumuz",
        story_section_7_date: "O günden beri her gün",
        story_section_7_description: "Her mesaj, her kahkaha, her sarılma – sen hayatımı tamamlıyorsun.",

        // ===== MEMORIES / ALBUM =====
        memories_title: "Anı Albümü",
        memories_subtitle: "Sonsuza kalan anlar",
        memories_polaroid_hint: "Arkasındaki hikayeyi görmek için bir resme tıkla",
        memories_empty: "Henüz anı yok. Yakında fotoğraflar eklenecek!",

        // ===== AI CHAT ANALYSIS =====
        chat_title: "Sohbet Hikayelerimiz",
        chat_subtitle: "Konuşmalarımızdan AI-analize edilmiş anlar",
        chat_sweetest_messages: "En Tatlı Mesajlar",
        chat_funny_moments: "En Komik Anlar",
        chat_first_i_love_you: 'İlk "Seni seviyorum"',
        chat_longest_conversation: "En Uzun Sohbet",
        chat_most_used_emoji: "En Çok Kullanılan Emoji",
        chat_active_month: "En Aktif Ay",
        chat_insider_joke: "İç Şaka",
        chat_travel_plans: "Yolculuk Planları",
        chat_voice_messages: "Sesli Mesajlar",
        chat_stats_total_messages: "Toplam Mesajlar",
        chat_stats_photos_shared: "Paylaşılan Fotoğraflar",
        chat_stats_voice_calls: "Sesli Aramalar",

        // ===== WHY I LOVE YOU =====
        love_title: "Seni Neden Sevdiğim",
        love_subtitle: "365 neden – senenin her günü için biri",
        love_card_flip_hint: "Arkayı görmek için tıkla",
        love_card_1: "Gülüşün, tüm günlerimi aydınlatabilen",
        love_card_2: "Tutkuyla konuştuğu şeyler hakkında konuşma tarzın",
        love_card_3: "Her gün beni ilham veren gücün",
        love_card_4: "Uzaklığa rağmen kucaklamasının sıcaklığı",
        love_card_5: "Bazen kaotik tarzımla ilgili sabrın",
        love_card_6: "Her zaman bana iyi hissettirme şeklin",
        love_card_7: "Kötü günleri bile kurtaran mizah hissine",
        love_card_8: "Birlikte kurduğumuz hayaller",

        // ===== OUR FUTURE / BUCKET LIST =====
        future_title: "Geleceğimiz",
        future_subtitle: "Birlikte gerçekleştirmek istediğimiz hayaller",
        future_bucket_list: "Hayal Listemiz",
        future_travel: "Yolculuklar",
        future_goals: "Hedefler",
        future_wishes: "Dilekler",
        future_projects: "Projeler",
        future_add_item: "Yeni Hayal Ekle",
        future_completed: "Gerçekleşti! ✨",
        future_progress: "İlerleme",
        future_travel_dream_1: "Birlikte Paris'e – aşkın kentine",
        future_travel_dream_2: "İstanbul'a seyahat – ailesini görmeye",
        future_travel_dream_3: "Azorlarda tatil",
        future_travel_dream_4: "Japonya'yı birlikte keşfetmek",
        future_goal_dream_1: "Birlikte yaşamak",
        future_goal_dream_2: "Ortak ev inşa etmek",
        future_goal_dream_3: "Birlikte seyahat etmek ve dünyayı keşfetmek",
        future_wish_dream_1: "Çiçekli bir bahçe",
        future_wish_dream_2: "Her gün birlikte uyanmak",
        future_wish_dream_3: "Sonsuz aşk ve mutluluk",

        // ===== SURPRISES =====
        surprises_title: "Sürpriz Alanı",
        surprises_subtitle: "Tıkla ve bir şeyi keşfet",
        surprise_letter: "Sana Mektup",
        surprise_video: "Video Anımız",
        surprise_voice: "Sesli Mesaj",
        surprise_game: "Küçük Oyun",
        surprise_coupon: "Kupon",
        surprise_hidden: "Gizli Alan",
        surprise_click_hint: "Kalbe 7 kez tıkla",
        surprise_found: "🎉 Bir gizli buldun!",
        surprise_valentines: "Sevgililer Günü Özel!",
        surprise_birthday: "Doğum Günü Özel!",

        // ===== GAME =====
        game_title: "Kalp Avı",
        game_description: "30 saniyede mümkün olduğunca çok kalp topla!",
        game_score: "Skorun",
        game_time: "Süre",
        game_waiting: "Kalpler geliyor...",
        game_start: "Başla",
        game_play_again: "Tekrar Oyna",
        game_excellent: "🌟 Harika!",
        game_good: "👏 Güzel!",
        game_try_again: "💪 Tekrar dene!",

        // ===== COUPON =====
        coupon_title: "Kupon",
        coupon_voucher: "🌟 Together Day Kuponu 🌟",
        coupon_description: "Bu kupon herhangi bir birlikte gün için geçerlidir!",
        coupon_valid: "Her zaman geçerli ❤️",

        // ===== SECRET =====
        secret_locked: "Gizli",
        secret_open: "Aç",
        secret_unlocked_title: "Tebrikler! Keşfedildi! ✨",
        secret_unlocked_message: "Gizliyi çözdün! 🗝️",
        secret_gift_message: "Bu gizli hediye sadece senin için, dünyadaki en sevdiğim kişi!",
        secret_quote: "Sen benim için her şeyimsin.",
        secret_signature: "— Senin, her zaman",
        secret_bonus_title: "BONUS SÜRPRİZ!",
        secret_bonus_message: "Kalbe 7 kez tıkladın – gerçekten motivasyonlusun!",

        // ===== GENERAL =====
        close: "Kapat",

        // ===== STAR SKY =====
        star_title: "Yıldızlı Gökyüzü",
        star_subtitle: "Her yıldız seninle özel bir anının anısıdır",
        star_click_hint: "Anıyı görmek için bir yıldıza tıkla",
        star_auto_night: "Otomatik Gece Modu",

        // ===== MUSIC =====
        music_title: "Müziğimiz",
        music_subtitle: "Bizi bağlayan ve birbirimizi hatırlatan şarkılar",
        music_song_1_title: "Bizim Şarkımız",
        music_song_1_story: "Bu şarkı, ilk kez karşılaştığımızda çaldı.",
        music_song_2_title: "Yıldızlar Melodisi",
        music_song_2_story: "Bu melodiyi bir video görüşmesinde birlikte dinledik.",
        music_song_3_title: "Endless Love",
        music_song_3_story: "Mesafeli ilişkimizi tanımlayan şarkı.",

        // ===== RANDOM MOMENT =====
        random_title: "Sürpriz Yap!",
        random_subtitle: "Düğmeye bas ve rastgele bir anı al",
        random_button: "✨ Sürpriz yap ✨",

        // ===== EASTER EGGS =====
        easter_secret: "Gizli Alan",
        easter_click_heart: "Kalbe 7 kez tıkla",
        easter_confetti: "🎉 Konfeti!",
        easter_hearts: "💕 Kalpler her yerde! 💕",
        easter_flowers: "🌹 Sana çiçekler! 🌹",
        easter_konami: "🎮 Konami Kodu aktif!",

        // ===== FOOTER =====
        footer_made_with: "İle yapıldı",
        footer_for: "için",
        footer_forever: "Sonsuza dek, Jonas & Dilara 💕",
    },
};

// ============================================
// LANGUAGE TYPES
// ============================================
export type Language = "de" | "tr";

// ============================================
// HELPER FUNCTIONS
// ============================================
export function getTranslation(language: Language, key: TranslationKey): string | string[] {
    return translations[language]?.[key as keyof typeof translations[Language]] || translations.de[key as keyof typeof translations.de];
}

export function getAvailableLanguages(): Language[] {
    return ["de", "tr"];
}