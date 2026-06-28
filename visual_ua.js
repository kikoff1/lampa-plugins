(function(){  
    // Список текстових замін  
    const REPLACEMENTS = {  
        'Дублированный': 'Дубльований',  
        'Ukr': '🇺🇦 Українською',  
        'Ua': '🇺🇦 Ua',  
        'Дубляж': 'Дубльований',  
        'Многоголосый': 'Багатоголосий',  
        'Украинский': '🇺🇦 Українською',  
        'Zetvideo': 'UaFlix',  
        'Нет истории просмотра': 'Історія перегляду відсутня'  
    };  
  
    // Пороги для розміру (в ГБ)  
    const SIZE_THRESHOLDS = {  
        mid_from_gb: 50,  
        high_from_gb: 100,  
        top_from_gb: 200  
    };  
  
    // Конфігурація стилів  
    const STYLES = {  
        '.torrent-item__seeds span.high-seeds': {  
            color: '#00ff00',  
            'font-weight': 'bold'  
        },  
        '.torrent-item__bitrate span.high-bitrate': {  
            color: '#ff0000',  
            'font-weight': 'bold'  
        },  
        '.torrent-item__tracker.utopia': {  
            color: '#9b59b6',  
            'font-weight': 'bold'  
        },  
        '.torrent-item__tracker.toloka': {  
            color: '#2ecc71',  
            'font-weight': 'bold'  
        },  
        // Стилі для розміру торрентів  
        '.torrent-item__size.ts-size': {  
            color: '#5cd4b0',  
            'background-color': 'rgba(92, 212, 176, 0.12)',  
            border: '0.15em solid rgba(92, 212, 176, 0.82)',  
            'box-shadow': '0 0 0.7em rgba(92, 212, 176, 0.26)',  
            'font-weight': '700',  
            'border-radius': '0.5em',  
            'padding': '0.15em 0.45em'  
        },  
        '.torrent-item__size.ts-size.mid-size': {  
            color: '#43cea2',  
            'background-color': 'rgba(67, 206, 162, 0.16)',  
            border: '0.15em solid rgba(67, 206, 162, 0.92)',  
            'box-shadow': '0 0 0.9em rgba(67, 206, 162, 0.34)'  
        },  
        '.torrent-item__size.ts-size.high-size': {  
            color: '#ffc371',  
            background: 'linear-gradient(135deg, rgba(255, 195, 113, 0.28), rgba(67, 206, 162, 0.10))',  
            border: '0.15em solid rgba(255, 195, 113, 0.95)',  
            'box-shadow': '0 0 1.05em rgba(255, 195, 113, 0.40)',  
            'text-shadow': '0 0 0.25em rgba(255, 195, 113, 0.22)'  
        },  
        '.torrent-item__size.ts-size.top-size': {  
            color: '#ff5f6d',  
            background: 'linear-gradient(135deg, rgba(255, 95, 109, 0.28), rgba(67, 206, 162, 0.08))',  
            border: '0.15em solid rgba(255, 95, 109, 0.95)',  
            'box-shadow': '0 0 1.1em rgba(255, 95, 109, 0.42)',  
            'text-shadow': '0 0 0.25em rgba(255, 95, 109, 0.22)'  
        }  
    };  
  
    // Додаємо CSS-стилі  
    let style = document.createElement('style');  
    style.innerHTML = Object.entries(STYLES).map(([selector, props]) => {  
        return `${selector} { ${Object.entries(props).map(([prop, val]) => `${prop}: ${val} !important`).join('; ')} }`;  
    }).join('\n');  
    document.head.appendChild(style);  
  
    // Функція для парсингу розміру в ГБ  
    function parseSizeToGb(text) {  
        try {  
            const t = ((text || '') + '').replace(/\u00A0/g, ' ').trim();  
            const m = t.match(/(\d+(?:[.,]\d+)?)\s*(kb|mb|gb|tb|кб|мб|гб|тб)/i);  
            if (!m) return null;  
  
            const num = parseFloat((m[1] || '0').replace(',', '.')) || 0;  
            const unit = (m[2] || '').toLowerCase();  
            let gb = 0;  
  
            if (unit === 'tb' || unit === 'тб') gb = num * 1024;  
            else if (unit === 'gb' || unit === 'гб') gb = num;  
            else if (unit === 'mb' || unit === 'мб') gb = num / 1024;  
            else if (unit === 'kb' || unit === 'кб') gb = num / (1024 * 1024);  
  
            return gb;  
        } catch (e) {  
            return null;  
        }  
    }  
  
    // Функція для застосування класів  
    function applyTier(el, classesToClear, classToAdd) {  
        try {  
            for (let i = 0; i < classesToClear.length; i++) el.classList.remove(classesToClear[i]);  
            if (classToAdd) el.classList.add(classToAdd);  
        } catch (e) { }  
    }  
  
    // Функція для заміни текстів у вказаних контейнерах  
    function replaceTexts() {  
        const containers = [  
            '.online-prestige-watched__body',  
            '.online-prestige--full .online-prestige__title',  
            '.online-prestige--full .online-prestige__info'  
        ];  
  
        containers.forEach(selector => {  
            document.querySelectorAll(selector).forEach(container => {  
                const walker = document.createTreeWalker(  
                    container,  
                    NodeFilter.SHOW_TEXT,  
                    null,  
                    false  
                );  
  
                let node;  
                while (node = walker.nextNode()) {  
                    let text = node.nodeValue;  
                    Object.entries(REPLACEMENTS).forEach(([original, replacement]) => {  
                        if (text.includes(original)) {  
                            text = text.replace(new RegExp(original, 'g'), replacement);  
                        }  
                    });  
                    node.nodeValue = text;  
                }  
            });  
        });  
    }  
  
    // Функція для оновлення стилів торентів  
    function updateTorrentStyles() {  
        // Seeds > 19  
        document.querySelectorAll('.torrent-item__seeds span').forEach(span => {  
            span.classList.toggle('high-seeds', (parseInt(span.textContent) || 0) > 19);  
        });  
  
        // Бітрейт > 50  
        document.querySelectorAll('.torrent-item__bitrate span').forEach(span => {  
            span.classList.toggle('high-bitrate', (parseFloat(span.textContent) || 0) > 50);  
        });  
  
        // Трекери  
        document.querySelectorAll('.torrent-item__tracker').forEach(tracker => {  
            const text = tracker.textContent.trim();  
            tracker.classList.remove('utopia', 'toloka');  
              
            if (text.includes('UTOPIA (API)')) tracker.classList.add('utopia');  
            else if (text.includes('Toloka')) tracker.classList.add('toloka');  
        });  
  
        // Розмір торрентів (кольорове кодування)  
        document.querySelectorAll('.torrent-item__size').forEach(el => {  
            const text = (el.textContent || '');  
            el.classList.add('ts-size');  
  
            const gb = parseSizeToGb(text);  
            if (gb === null) {  
                applyTier(el, ['mid-size', 'high-size', 'top-size'], '');  
                return;  
            }  
  
            let szTier = '';  
            if (gb > SIZE_THRESHOLDS.top_from_gb) szTier = 'top-size';  
            else if (gb >= SIZE_THRESHOLDS.high_from_gb) szTier = 'high-size';  
            else if (gb >= SIZE_THRESHOLDS.mid_from_gb) szTier = 'mid-size';  
            applyTier(el, ['mid-size', 'high-size', 'top-size'], szTier);  
        });  
    }  
  
    // Основна функція оновлення  
    function updateAll() {  
        replaceTexts();  
        updateTorrentStyles();  
    }  
  
    // Оптимізований спостерігач  
    const observer = new MutationObserver(mutations => {  
        if (mutations.some(m => m.addedNodes.length)) {  
            updateAll();  
        }  
    });  
  
    // Ініціалізація  
    observer.observe(document.body, { childList: true, subtree: true });  
    updateAll();  
})();  
  
Lampa.Platform.tv();