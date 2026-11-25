(function () {
    'use strict';

    // Захист від подвійного запуску
    if (window.__torrentStylesInit) return;
    window.__torrentStylesInit = true;

    // Текстові заміни
    const REPLACEMENTS = {
        'Дублированный': 'Дубльований',
        'Дубляж': 'Дубльований',
        'Многоголосый': 'Багатоголосий',
        'Украинский': '🇺🇦 Українською',
        'Ukr': '🇺🇦 Українською',
        'Zetvideo': 'UaFlix',
        'Нет истории просмотра': 'Історія перегляду відсутня'
    };

    // Пороги розміру (ГБ)
    const SIZE_THRESHOLDS = {
        mid: 50,
        high: 100,
        top: 200
    };

    const SIZE_CLASSES = ['mid-size', 'high-size', 'top-size'];

    const CONTAINERS = [
        '.online-prestige-watched__body',
        '.online-prestige--full .online-prestige__title',
        '.online-prestige--full .online-prestige__info'
    ].join(', ');

    // ---------- Стилі ----------
    const css = `
        .torrent-item__tracker.utopia { color: #9b59b6 !important; font-weight: bold !important; }
        .torrent-item__tracker.toloka { color: #2ecc71 !important; font-weight: bold !important; }

        .torrent-item__size.ts-size {
            color: #5cd4b0 !important;
            background-color: rgba(92, 212, 176, 0.12) !important;
            border: 0.15em solid rgba(92, 212, 176, 0.82) !important;
            box-shadow: 0 0 0.7em rgba(92, 212, 176, 0.26) !important;
            font-weight: 700 !important;
            border-radius: 0.5em !important;
            padding: 0.15em 0.45em !important;
        }
        .torrent-item__size.ts-size.mid-size {
            color: #43cea2 !important;
            background-color: rgba(67, 206, 162, 0.16) !important;
            border: 0.15em solid rgba(67, 206, 162, 0.92) !important;
            box-shadow: 0 0 0.9em rgba(67, 206, 162, 0.34) !important;
        }
        .torrent-item__size.ts-size.high-size {
            color: #ffc371 !important;
            background: linear-gradient(135deg, rgba(255, 195, 113, 0.28), rgba(67, 206, 162, 0.10)) !important;
            border: 0.15em solid rgba(255, 195, 113, 0.95) !important;
            box-shadow: 0 0 1.05em rgba(255, 195, 113, 0.40) !important;
            text-shadow: 0 0 0.25em rgba(255, 195, 113, 0.22) !important;
        }
        .torrent-item__size.ts-size.top-size {
            color: #ff5f6d !important;
            background: linear-gradient(135deg, rgba(255, 95, 109, 0.28), rgba(67, 206, 162, 0.08)) !important;
            border: 0.15em solid rgba(255, 95, 109, 0.95) !important;
            box-shadow: 0 0 1.1em rgba(255, 95, 109, 0.42) !important;
            text-shadow: 0 0 0.25em rgba(255, 95, 109, 0.22) !important;
        }
    `;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // ---------- Заміни текстів ----------
    const escapeRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Довші ключі першими; для латинських — межі слів
    const RE = new RegExp(
        Object.keys(REPLACEMENTS)
            .sort((a, b) => b.length - a.length)
            .map(k => /^[A-Za-z]/.test(k) ? '\\b' + escapeRe(k) + '\\b' : escapeRe(k))
            .join('|'),
        'g'
    );

    // "Ua" як окреме слово; необов'язковий прапорець перед ним — щоб не дублювати
    const RE_UA = /(🇺🇦 )?\bUa\b/g;

    function replaceInNode(node) {
        const old = node.nodeValue;
        if (!old) return;
        const next = old
            .replace(RE, m => REPLACEMENTS[m])
            .replace(RE_UA, (m, flag) => flag ? m : '🇺🇦 Ua');
        if (next !== old) node.nodeValue = next;
    }

    function replaceTexts() {
        document.querySelectorAll(CONTAINERS).forEach(container => {
            const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
            let node;
            while ((node = walker.nextNode())) replaceInNode(node);
        });
    }

    // ---------- Торренти ----------
    function parseSizeToGb(text) {
        const t = String(text || '').replace(/\u00A0/g, ' ').trim();
        const m = t.match(/(\d+(?:[.,]\d+)?)\s*(kb|mb|gb|tb|кб|мб|гб|тб)/i);
        if (!m) return null;

        const num = parseFloat(m[1].replace(',', '.')) || 0;
        switch (m[2].toLowerCase()) {
            case 'tb': case 'тб': return num * 1024;
            case 'gb': case 'гб': return num;
            case 'mb': case 'мб': return num / 1024;
            case 'kb': case 'кб': return num / (1024 * 1024);
        }
        return null;
    }

    function applyTier(el, tier) {
        SIZE_CLASSES.forEach(c => el.classList.toggle(c, c === tier));
    }

    function updateTorrentStyles() {
        // Трекери
        document.querySelectorAll('.torrent-item__tracker').forEach(tracker => {
            const text = tracker.textContent;
            tracker.classList.toggle('utopia', text.includes('UTOPIA (API)'));
            tracker.classList.toggle('toloka', !text.includes('UTOPIA (API)') && text.includes('Toloka'));
        });

        // Розмір
        document.querySelectorAll('.torrent-item__size').forEach(el => {
            el.classList.add('ts-size');

            const gb = parseSizeToGb(el.textContent);
            let tier = '';
            if (gb !== null) {
                if (gb >= SIZE_THRESHOLDS.top) tier = 'top-size';
                else if (gb >= SIZE_THRESHOLDS.high) tier = 'high-size';
                else if (gb >= SIZE_THRESHOLDS.mid) tier = 'mid-size';
            }
            applyTier(el, tier);
        });
    }

    // ---------- Оновлення ----------
    function updateAll() {
        replaceTexts();
        updateTorrentStyles();
    }

    let scheduled = false;
    function scheduleUpdate() {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(() => {
            scheduled = false;
            updateAll();
        });
    }

    new MutationObserver(mutations => {
        if (mutations.some(m => m.addedNodes.length)) scheduleUpdate();
    }).observe(document.body, { childList: true, subtree: true });

    updateAll();
})();

Lampa.Platform.tv();