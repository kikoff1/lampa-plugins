(function() {    
    'use strict';    
    
    function startPlugin() {    
        window.plugin_menu_editor_ready = true    
    
        function initialize() {    
            // Додаємо переклади    
            Lampa.Lang.add({    
                menu_editor_title: {    
                    ru: 'Редактирование меню',    
                    uk: 'Редагування меню',    
                    en: 'Menu Editor'    
                },    
                menu_editor_left: {    
                    ru: 'Левое меню',    
                    uk: 'Ліве меню',    
                    en: 'Left Menu'    
                },    
                menu_editor_top: {    
                    ru: 'Верхнее меню',    
                    uk: 'Верхнє меню',    
                    en: 'Top Menu'    
                },    
                menu_editor_settings: {    
                    ru: 'Меню настроек',    
                    uk: 'Меню налаштувань',    
                    en: 'Settings Menu'    
                },    
                menu_editor_hide_nav: {    
                    ru: 'Скрыть панель навигации',    
                    uk: 'Приховати панель навігації',    
                    en: 'Hide Navigation Bar'    
                },    
                menu_editor_add_reload_button: {    
                    ru: 'Добавить кнопку перезагрузки в верхнее меню',    
                    uk: 'Додати кнопку перезавантаження у верхнє меню',    
                    en: 'Add reload button to top menu'    
                },    
                menu_editor_add_clear_cache_button: {    
                    ru: 'Добавить кнопку очистки кеша в верхнее меню',    
                    uk: 'Додати кнопку очищення кешу у верхнє меню',    
                    en: 'Add clear cache button to top menu'    
                },    
                menu_editor_add_player_switch_button: {    
                    ru: 'Добавить кнопку выбора плеера в верхнее меню',    
                    uk: 'Додати кнопку вибору плеєра в верхнє меню',    
                    en: 'Add player switch button to top menu'    
                },    
                head_action_clear_cache: {    
                    ru: 'Очистить кеш',    
                    uk: 'Очистити кеш',    
                    en: 'Clear cache'    
                },    
                head_action_reload: {    
                    ru: 'Перезагрузка',    
                    uk: 'Перезавантаження',    
                    en: 'Reload'    
                },    
                head_action_search: {    
                    ru: 'Поиск',    
                    en: 'Search',    
                    uk: 'Пошук'    
                },    
                head_action_feed: {    
                    ru: 'Лента',    
                    en: 'Feed',    
                    uk: 'Стрічка'    
                },    
                head_action_notice: {    
                    ru: 'Уведомления',    
                    en: 'Notifications',    
                    uk: 'Сповіщення'    
                },    
                head_action_settings: {    
                    ru: 'Настройки',    
                    en: 'Settings',    
                    uk: 'Налаштування'    
                },    
                head_action_profile: {    
                    ru: 'Профиль',    
                    en: 'Profile',    
                    uk: 'Профіль'    
                },    
                head_action_fullscreen: {    
                    ru: 'Полный экран',    
                    en: 'Fullscreen',    
                    uk: 'Повноекранний режим'    
                },    
                head_action_broadcast: {    
                    ru: 'Трансляции',    
                    en: 'Broadcast',    
                    uk: 'Трансляції'    
                },    
                head_action_player_switch: {    
                    ru: 'Выбор плеера',    
                    en: 'Player switch',    
                    uk: 'Вибір плеєра'    
                },    
                no_name: {    
                    ru: 'Элемент без названия',    
                    en: 'Unnamed element',    
                    uk: 'Елемент без назви'    
                },    
                top_bar_player_switch: {    
                    en: 'Player switcher',    
                    ru: 'Смена плеера',    
                    uk: 'Перемикач плеєра'    
                },    
                top_bar_player_online: {    
                    en: 'Online',    
                    ru: 'Онлайн',    
                    uk: 'Онлайн'    
                },    
                top_bar_player_iptv: {    
                    en: 'IPTV',    
                    ru: 'IPTV',    
                    uk: 'IPTV'    
                },    
                top_bar_player_torrent: {    
                    en: 'Torrents',    
                    ru: 'Торренты',    
                    uk: 'Торренти'    
                },    
                top_bar_player_current: {    
                    en: 'Current player',    
                    ru: 'Текущий',    
                    uk: 'Поточний'    
                }    
            })    
    
            // Застосування налаштувань лівого меню    
            function applyLeftMenu() {    
                let sort = Lampa.Storage.get('menu_sort', [])    
                let hide = Lampa.Storage.get('menu_hide', [])    
    
                let menu = $('.menu')    
                if(!menu.length) return    
    
                if(sort.length) {    
                    sort.forEach((name) => {    
                        let item = menu.find('.menu__list:eq(0) .menu__item').filter(function() {    
                            return $(this).find('.menu__text').text().trim() === name    
                        })    
                        if(item.length) item.appendTo(menu.find('.menu__list:eq(0)'))    
                    })    
                }    
    
                $('.menu .menu__item').removeClass('hidden')    
    
                if(hide.length) {    
                    hide.forEach((name) => {    
                        let item = $('.menu .menu__list').find('.menu__item').filter(function() {    
                            return $(this).find('.menu__text').text().trim() === name    
                        })    
                        if(item.length) {    
                            item.addClass('hidden')    
                        }    
                    })    
                }    
            }    
    
            // Застосування налаштувань верхнього меню    
            function applyTopMenu() {    
                let sort = Lampa.Storage.get('head_menu_sort', [])    
                let hide = Lampa.Storage.get('head_menu_hide', [])    
    
                let actionsContainer = $('.head__actions')    
                if(!actionsContainer.length) return    
    
                $('.head__action.head__action--clear-cache, .head__action.head__action--reload, .head__action.head__action--player-switch').remove()    
    
                if (Lampa.Storage.get('add_player_switch_button', false)) {    
                    initPlayerSwitch();    
                }    
    
                if (Lampa.Storage.get('add_clear_cache_button', false)) {    
                    let clearBtn = Lampa.Head.addIcon(    
                        `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">    
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>    
                        </svg>`,    
                        () => {    
                            Lampa.Storage.clear(false)    
                            Lampa.Cache.clearAll()    
                            Lampa.Noty.show(Lampa.Lang.translate('settings_clear_cache_only'))    
                        }    
                    )    
                    clearBtn.addClass('head__action head__action--clear-cache')    
                }    
    
                if (Lampa.Storage.get('add_reload_button', false)) {    
                    let reloadBtn = Lampa.Head.addIcon(    
                        `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">    
                            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" fill="currentColor"/>    
                        </svg>`,    
                        () => {    
                            window.location.reload()    
                        }    
                    )    
                    reloadBtn.addClass('head__action head__action--reload')    
                }    
    
                if(sort.length) {    
                    sort.forEach((uniqueClass) => {    
                        let item = $('.head__action.' + uniqueClass)    
                        if(item.length) item.appendTo(actionsContainer)    
                    })    
                }    
    
                $('.head__action').removeClass('hide')    
                if(hide.length) {    
                    hide.forEach((uniqueClass) => {    
                        let item = $('.head__action.' + uniqueClass)    
                        if(item.length) item.addClass('hide')    
                    })    
                }    
            }    
    
            // Застосування налаштувань меню налаштувань    
            function applySettingsMenu() {    
                let sort = Lampa.Storage.get('settings_menu_sort', [])    
                let hide = Lampa.Storage.get('settings_menu_hide', [])    
    
                let settingsContainer = $('.settings .scroll__body > div')    
                if(!settingsContainer.length) return    
    
                if(sort.length) {    
                    sort.forEach((name) => {    
                        let item = $('.settings-folder').filter(function() {    
                            return $(this).find('.settings-folder__name').text().trim() === name    
                        })    
                        if(item.length) item.appendTo(settingsContainer)    
                    })    
                }    
    
                $('.settings-folder').removeClass('hide')    
                if(hide.length) {    
                    hide.forEach((name) => {    
                        let item = $('.settings-folder').filter(function() {    
                            return $(this).find('.settings-folder__name').text().trim() === name    
                        })    
                        if(item.length) item.addClass('hide')    
                    })    
                }    
            }    
    
            // Функція для отримання назви пункту верхнього меню    
            function getHeadActionName(mainClass) {    
                let titleKey = '';    
    
                if (mainClass.includes('open--search')) {    
                    titleKey = 'head_action_search';    
                } else if (mainClass.includes('open--feed')) {    
                    titleKey = 'head_action_feed';    
                } else if (mainClass.includes('notice--')) {    
                    titleKey = 'head_action_notice';    
                } else if (mainClass.includes('open--settings')) {    
                    titleKey = 'head_action_settings';    
                } else if (mainClass.includes('open--profile')) {    
                    titleKey = 'head_action_profile';    
                } else if (mainClass.includes('full--screen')) {    
                    titleKey = 'head_action_fullscreen';    
                } else if (mainClass.includes('open--broadcast')) {    
                    titleKey = 'head_action_broadcast';    
                } else if (mainClass === 'head__action--clear-cache') {    
                    titleKey = 'head_action_clear_cache';    
                } else if (mainClass === 'head__action--reload') {    
                    titleKey = 'head_action_reload';    
                } else if (mainClass.includes('open--player-switch')) {    
                    titleKey = 'head_action_player_switch';    
                }    
    
                return titleKey ? Lampa.Lang.translate(titleKey) : Lampa.Lang.translate('no_name');    
            }    
    
            // Функція для редагування лівого меню    
            function editLeftMenu() {    
                let list = $('<div class="menu-edit-list"></div>')    
                let menu = $('.menu')    
    
                menu.find('.menu__item').each(function(){    
                    let item_orig = $(this)    
                    let item_clone = $(this).clone()    
                    let text = item_clone.find('.menu__text').text().trim()    
                    let isFirstSection = item_orig.closest('.menu__list').is('.menu__list:eq(0)')    
                        
                    let moveButtons = isFirstSection ? `    
                        <div class="menu-edit-list__move move-up selector">    
                            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">    
                                <path d="M2 12L11 3L20 12" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>    
                            </svg>    
                        </div>    
                        <div class="menu-edit-list__move move-down selector">    
                            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">    
                                <path d="M2 2L11 11L20 2" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>    
                            </svg>    
                        </div>` : '';    
    
                    let item_sort = $(`<div class="menu-edit-list__item">    
                        <div class="menu-edit-list__icon"></div>    
                        <div class="menu-edit-list__title">${text}</div>    
                        ${moveButtons}    
                        <div class="menu-edit-list__toggle toggle selector">    
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">    
                                <rect x="1.89111" y="1.78369" width="21.793" height="21.793" rx="3.5" stroke="currentColor" stroke-width="3"/>    
                                <path d="M7.44873 12.9658L10.8179 16.3349L18.1269 9.02588" stroke="currentColor" stroke-width="3" class="dot" opacity="0" stroke-linecap="round"/>    
                            </svg>    
                        </div>    
                    </div>`)    
    
                    item_sort.find('.menu-edit-list__icon').append(item_clone.find('.menu__ico').html())    
    
                    if(isFirstSection) {    
                        item_sort.find('.move-up').on('hover:enter', ()=>{    
                            let prev = item_sort.prev()    
                            while(prev.length && prev.data('isSecondSection')) {    
                                prev = prev.prev()    
                            }    
                            if(prev.length){    
                                item_sort.insertBefore(prev)    
                                item_orig.insertBefore(item_orig.prev())    
                            }    
                        })    
    
                        item_sort.find('.move-down').on('hover:enter', ()=>{    
                            let next = item_sort.next()    
                            while(next.length && next.data('isSecondSection')) {    
                                next = next.next()    
                            }    
                            if(next.length){    
                                item_sort.insertAfter(next)    
                                item_orig.insertAfter(item_orig.next())    
                            }    
                        })    
                    } else {    
                        item_sort.data('isSecondSection', true)    
                    }    
    
                    item_sort.find('.toggle').on('hover:enter', ()=>{    
                        item_orig.toggleClass('hidden')    
                        item_sort.find('.dot').attr('opacity', item_orig.hasClass('hidden') ? 0 : 1)    
                    }).find('.dot').attr('opacity', item_orig.hasClass('hidden') ? 0 : 1)    
    
                    list.append(item_sort)    
                })    
    
                Lampa.Modal.open({    
                    title: Lampa.Lang.translate('menu_editor_left'),    
                    html: list,    
                    size: 'small',    
                    scroll_to_center: true,    
                    onBack: ()=>{    
                        saveLeftMenu()    
                        Lampa.Modal.close()    
                        Lampa.Controller.toggle('settings_component')    
                    }    
                })    
            }    
    
            // Функція для редагування верхнього меню    
            function editTopMenu() {    
                let list = $('<div class="menu-edit-list"></div>')    
                let head = $('.head')    
                    
                list.empty()    
                    
                head.find('.head__action').each(function(){    
                    let item_orig = $(this)    
                        
                    if (item_orig.hasClass('head__action--clear-cache') ||     
                        item_orig.hasClass('head__action--reload') ||    
                        item_orig.hasClass('head__action--player-switch')) {    
                        return    
                    }    
                        
                    let item_clone = $(this).clone()    
                    let allClasses = item_clone.attr('class').split(' ')    
                    let mainClass = allClasses.find(c =>     
                        c.startsWith('open--') ||     
                        c.startsWith('notice--') ||     
                        c.startsWith('full--')    
                    ) || ''    
                        
                    let displayName = getHeadActionName(mainClass)    
                    let item_sort = $(`<div class="menu-edit-list__item">    
                        <div class="menu-edit-list__icon"></div>    
                        <div class="menu-edit-list__title">${displayName}</div>    
                        <div class="menu-edit-list__move move-up selector">    
                            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">    
                                <path d="M2 12L11 3L20 12" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>    
                            </svg>    
                        </div>    
                        <div class="menu-edit-list__move move-down selector">    
                            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">    
                                <path d="M2 2L11 11L20 2" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>    
                            </svg>    
                        </div>    
                        <div class="menu-edit-list__toggle toggle selector">    
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">    
                                <rect x="1.89111" y="1.78369" width="21.793" height="21.793" rx="3.5" stroke="currentColor" stroke-width="3"/>  
                                <path d="M7.44873 12.9658L10.8179 16.3349L18.1269 9.02588" stroke="currentColor" stroke-width="3" class="dot" opacity="0" stroke-linecap="round"/>  
                            </svg>  
                        </div>  
                    </div>`)  
                        
                    let svg = item_clone.find('svg')  
                    if(svg.length) {  
                        item_sort.find('.menu-edit-list__icon').append(svg.clone())  
                    }  
                        
                    item_sort.find('.move-up').on('hover:enter', ()=>{  
                        let prev = item_sort.prev()  
                        if(prev.length){  
                            item_sort.insertBefore(prev)  
                            item_orig.insertBefore(item_orig.prev())  
                        }  
                    })  
                        
                    item_sort.find('.move-down').on('hover:enter', ()=>{  
                        let next = item_sort.next()  
                        if(next.length){  
                            item_sort.insertAfter(next)  
                            item_orig.insertAfter(item_orig.next())  
                        }  
                    })  
                        
                    item_sort.find('.toggle').on('hover:enter', ()=>{  
                        item_orig.toggleClass('hide')  
                        item_sort.find('.dot').attr('opacity', item_orig.hasClass('hide') ? 0 : 1)  
                    }).find('.dot').attr('opacity', item_orig.hasClass('hide') ? 0 : 1)  
                        
                    list.append(item_sort)  
                })  
                    
                // Додаємо кнопку вибору плеєра якщо увімкнено  
                if (Lampa.Storage.get('add_player_switch_button', false)) {  
                    let playerSwitchItem = $(`  
                        <div class="menu-edit-list__item">  
                            <div class="menu-edit-list__icon">  
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="currentColor"/></svg>  
                            </div>  
                            <div class="menu-edit-list__title">${Lampa.Lang.translate('head_action_player_switch')}</div>  
                            <div class="menu-edit-list__move move-up selector">  
                                <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">  
                                    <path d="M2 12L11 3L20 12" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>  
                                </svg>  
                            </div>  
                            <div class="menu-edit-list__move move-down selector">  
                                <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">  
                                    <path d="M2 2L11 11L20 2" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>  
                                </svg>  
                            </div>  
                            <div class="menu-edit-list__toggle toggle selector">  
                                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">  
                                    <rect x="1.89111" y="1.78369" width="21.793" height="21.793" rx="3.5" stroke="currentColor" stroke-width="3"/>  
                                    <path d="M7.44873 12.9658L10.8179 16.3349L18.1269 9.02588" stroke="currentColor" stroke-width="3" class="dot" opacity="0" stroke-linecap="round"/>  
                                </svg>  
                            </div>  
                        </div>  
                    `)  
                        
                    playerSwitchItem.find('.move-up').on('hover:enter', ()=>{  
                        let prev = playerSwitchItem.prev()  
                        if(prev.length){  
                            playerSwitchItem.insertBefore(prev)  
                            $('.head__action--player-switch').insertBefore($('.head__action--player-switch').prev())  
                        }  
                    })  
                        
                    playerSwitchItem.find('.move-down').on('hover:enter', ()=>{  
                        let next = playerSwitchItem.next()  
                        if(next.length){  
                            playerSwitchItem.insertAfter(next)  
                            $('.head__action--player-switch').insertAfter($('.head__action--player-switch').next())  
                        }  
                    })  
                        
                    playerSwitchItem.find('.toggle').on('hover:enter', ()=>{  
                        $('.head__action--player-switch').toggleClass('hide')  
                        playerSwitchItem.find('.dot').attr('opacity', $('.head__action--player-switch').hasClass('hide') ? 0 : 1)  
                    }).find('.dot').attr('opacity', $('.head__action--player-switch').hasClass('hide') ? 0 : 1)  
                        
                    list.append(playerSwitchItem)  
                }  
                    
                // Додаємо кнопку очищення кешу тільки якщо увімкнено  
                if (Lampa.Storage.get('add_clear_cache_button', false)) {  
                    let clearItem = $(`  
                        <div class="menu-edit-list__item">  
                            <div class="menu-edit-list__icon">  
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">  
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>  
                                </svg>  
                            </div>  
                            <div class="menu-edit-list__title">${Lampa.Lang.translate('head_action_clear_cache')}</div>  
                            <div class="menu-edit-list__move move-up selector">  
                                <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">  
                                    <path d="M2 12L11 3L20 12" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>  
                                </svg>  
                            </div>  
                            <div class="menu-edit-list__move move-down selector">  
                                <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">  
                                    <path d="M2 2L11 11L20 2" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>  
                                </svg>  
                            </div>  
                            <div class="menu-edit-list__toggle toggle selector">  
                                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">  
                                    <rect x="1.89111" y="1.78369" width="21.793" height="21.793" rx="3.5" stroke="currentColor" stroke-width="3"/>  
                                    <path d="M7.44873 12.9658L10.8179 16.3349L18.1269 9.02588" stroke="currentColor" stroke-width="3" class="dot" opacity="0" stroke-linecap="round"/>  
                                </svg>  
                            </div>  
                        </div>  
                    `)  
                        
                    clearItem.find('.move-up').on('hover:enter', ()=>{  
                        let prev = clearItem.prev()  
                        if(prev.length){  
                            clearItem.insertBefore(prev)  
                            $('.head__action--clear-cache').insertBefore($('.head__action--clear-cache').prev())  
                        }  
                    })  
                        
                    clearItem.find('.move-down').on('hover:enter', ()=>{  
                        let next = clearItem.next()  
                        if(next.length){  
                            clearItem.insertAfter(next)  
                            $('.head__action--clear-cache').insertAfter($('.head__action--clear-cache').next())  
                        }  
                    })  
                        
                    clearItem.find('.toggle').on('hover:enter', ()=>{  
                        $('.head__action--clear-cache').toggleClass('hide')  
                        clearItem.find('.dot').attr('opacity', $('.head__action--clear-cache').hasClass('hide') ? 0 : 1)  
                    }).find('.dot').attr('opacity', $('.head__action--clear-cache').hasClass('hide') ? 0 : 1)  
                        
                    list.append(clearItem)  
                }  
                    
                // Додаємо кнопку перезавантаження якщо увімкнено  
                if (Lampa.Storage.get('add_reload_button', false)) {  
                    let reloadItem = $(`  
                        <div class="menu-edit-list__item">  
                            <div class="menu-edit-list__icon">  
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">  
                                    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" fill="currentColor"/>  
                                </svg>  
                            </div>  
                            <div class="menu-edit-list__title">${Lampa.Lang.translate('head_action_reload')}</div>  
                            <div class="menu-edit-list__move move-up selector">  
                                <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">  
                                    <path d="M2 12L11 3L20 12" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>  
                                </svg>  
                            </div>  
                            <div class="menu-edit-list__move move-down selector">  
                                <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">  
                                    <path d="M2 2L11 11L20 2" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>  
                                </svg>  
                            </div>  
                            <div class="menu-edit-list__toggle toggle selector">  
                                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">  
                                    <rect x="1.89111" y="1.78369" width="21.793" height="21.793" rx="3.5" stroke="currentColor" stroke-width="3"/>  
                                    <path d="M7.44873 12.9658L10.8179 16.3349L18.1269 9.02588" stroke="currentColor" stroke-width="3" class="dot" opacity="0" stroke-linecap="round"/>  
                                </svg>  
                            </div>  
                        </div>  
                    `)  
                        
                    reloadItem.find('.move-up').on('hover:enter', ()=>{  
                        let prev = reloadItem.prev()  
                        if(prev.length){  
                            reloadItem.insertBefore(prev)  
                            $('.head__action--reload').insertBefore($('.head__action--reload').prev())  
                        }  
                    })  
                        
                    reloadItem.find('.move-down').on('hover:enter', ()=>{  
                        let next = reloadItem.next()  
                        if(next.length){  
                            reloadItem.insertAfter(next)  
                            $('.head__action--reload').insertAfter($('.head__action--reload').next())  
                        }  
                    })  
                        
                    reloadItem.find('.toggle').on('hover:enter', ()=>{  
                        $('.head__action--reload').toggleClass('hide')  
                        reloadItem.find('.dot').attr('opacity', $('.head__action--reload').hasClass('hide') ? 0 : 1)  
                    }).find('.dot').attr('opacity', $('.head__action--reload').hasClass('hide') ? 0 : 1)  
                        
                    list.append(reloadItem)  
                }  
                    
                Lampa.Modal.open({  
                    title: Lampa.Lang.translate('menu_editor_top'),  
                    html: list,  
                    size: 'small',  
                    scroll_to_center: true,  
                    onBack: ()=>{  
                        saveTopMenu()  
                        Lampa.Modal.close()  
                        Lampa.Controller.toggle('settings_component')  
                    }  
                })  
            }  
    
            // Функція для редагування меню налаштувань    
            function editSettingsMenu() {    
                Lampa.Controller.toggle('settings')    
    
                setTimeout(()=>{    
                    let settings = $('.settings')    
    
                    if(!settings.length || !settings.find('.settings-folder').length){    
                        Lampa.Noty.show('Меню налаштувань ще не завантажене')    
                        return    
                    }    
    
                    let list = $('<div class="menu-edit-list"></div>')    
    
                    settings.find('.settings-folder').each(function(){    
                        let item_orig = $(this)    
                        let item_clone = $(this).clone()    
    
                        let name = item_clone.find('.settings-folder__name').text().trim()    
    
                        let item_sort = $(`<div class="menu-edit-list__item">    
                            <div class="menu-edit-list__icon"></div>    
                            <div class="menu-edit-list__title">${name}</div>    
                            <div class="menu-edit-list__move move-up selector">    
                                <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">    
                                    <path d="M2 12L11 3L20 12" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>    
                                </svg>    
                            </div>    
                            <div class="menu-edit-list__move move-down selector">    
                                <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">    
                                    <path d="M2 2L11 11L20 2" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>    
                                </svg>    
                            </div>    
                            <div class="menu-edit-list__toggle toggle selector">    
                                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">    
                                    <rect x="1.89111" y="1.78369" width="21.793" height="21.793" rx="3.5" stroke="currentColor" stroke-width="3"/>    
                                    <path d="M7.44873 12.9658L10.8179 16.3349L18.1269 9.02588" stroke="currentColor" stroke-width="3" class="dot" opacity="0" stroke-linecap="round"/>    
                                </svg>    
                            </div>    
                        </div>`)    
    
                        let icon = item_clone.find('.settings-folder__icon svg, .settings-folder__icon img')    
                        if(icon.length) {    
                            item_sort.find('.menu-edit-list__icon').append(icon.clone())    
                        }    
    
                        item_sort.find('.move-up').on('hover:enter', ()=>{    
                            let prev = item_sort.prev()    
                            if(prev.length){    
                                item_sort.insertBefore(prev)    
                                item_orig.insertBefore(item_orig.prev())    
                            }    
                        })    
    
                        item_sort.find('.move-down').on('hover:enter', ()=>{    
                            let next = item_sort.next()    
                            if(next.length){    
                                item_sort.insertAfter(next)    
                                item_orig.insertAfter(item_orig.next())    
                            }    
                        })    
    
                        item_sort.find('.toggle').on('hover:enter', ()=>{    
                            item_orig.toggleClass('hide')    
                            item_sort.find('.dot').attr('opacity', item_orig.hasClass('hide') ? 0 : 1)    
                        }).find('.dot').attr('opacity', item_orig.hasClass('hide') ? 0 : 1)    
    
                        list.append(item_sort)    
                    })    
    
                    Lampa.Modal.open({    
                        title: Lampa.Lang.translate('menu_editor_settings'),    
                        html: list,    
                        size: 'small',    
                        scroll_to_center: true,    
                        onBack: ()=>{    
                            saveSettingsMenu()    
                            Lampa.Modal.close()    
                            Lampa.Controller.toggle('settings_component')    
                        }    
                    })    
                }, 300)    
            }    
    
            // Збереження налаштувань лівого меню    
            function saveLeftMenu() {    
                let sort = []    
                let hide = []    
    
                $('.menu .menu__list:eq(0) .menu__item').each(function(){    
                    let name = $(this).find('.menu__text').text().trim()    
                    sort.push(name)    
                })    
    
                $('.menu .menu__item').each(function(){    
                    if($(this).hasClass('hidden')){    
                        let name = $(this).find('.menu__text').text().trim()    
                        hide.push(name)    
                    }    
                })    
    
                Lampa.Storage.set('menu_sort', sort)    
                Lampa.Storage.set('menu_hide', hide)    
            }    
    
            // Збереження налаштувань верхнього меню    
            function saveTopMenu() {    
                let sort = []    
                let hide = []    
    
                $('.head__action').each(function(){    
                    let classes = $(this).attr('class').split(' ')    
                    let uniqueClass = classes.find(c =>     
                        c.startsWith('open--') ||     
                        c.startsWith('notice--') ||     
                        c.startsWith('full--') ||  
                        c === 'head__action--clear-cache' ||  
                        c === 'head__action--reload' ||  
                        c === 'head__action--player-switch'  
                    )    
    
                    if(uniqueClass) {    
                        sort.push(uniqueClass)    
                        if($(this).hasClass('hide')){    
                            hide.push(uniqueClass)    
                        }    
                    }    
                })    
    
                Lampa.Storage.set('head_menu_sort', sort)    
                Lampa.Storage.set('head_menu_hide', hide)    
            }    
    
            // Збереження налаштувань меню налаштувань    
            function saveSettingsMenu() {    
                let sort = []    
                let hide = []    
    
                $('.settings-folder').each(function(){    
                    let name = $(this).find('.settings-folder__name').text().trim()    
                    sort.push(name)    
                    if($(this).hasClass('hide')){    
                        hide.push(name)    
                    }    
                })    
    
                Lampa.Storage.set('settings_menu_sort', sort)    
                Lampa.Storage.set('settings_menu_hide', hide)    
            }    
    
            // Функції для перемикача плеєра    
            var PLAYER_TYPES = ['online', 'iptv', 'torrent'];    
            var lastFocus = null;    
            var previousController = null;    
    
            function getAvailablePlayers(type) {    
                var paramName = type === 'online' ? 'player' : 'player_' + type;    
                var playersData = Lampa.Params.values[paramName];    
                    
                if (!playersData) {    
                    return { inner: Lampa.Lang.translate('settings_param_player_inner') };    
                }    
    
                var players = {};    
                for (var key in playersData) {    
                    if (playersData.hasOwnProperty(key)) {    
                        players[key] = Lampa.Lang.translate(playersData[key]);    
                    }    
                }    
                    
                return players;    
            }    
    
            function getPlayerName(key, players) {    
                return players[key] || key;    
            }    
    
            function getStorageKey(type) {    
                return type === 'online' ? 'player' : 'player_' + type;    
            }    
    
            function getCurrentPlayer(type) {    
                return Lampa.Storage.field(getStorageKey(type)) || 'inner';    
            }    
    
            function setPlayer(type, value) {    
                Lampa.Storage.set(getStorageKey(type), value);    
            }    
    
            function createMenuItem(name, descr, onClick, isActive) {    
                var item = $('<div class="settings-param selector"></div>');    
                item.append('<div class="settings-param__name">' + name + '</div>');    
                if (descr) {    
                    item.append('<div class="settings-param__descr">' + descr + '</div>');    
                }    
                if (isActive) {    
                    item.addClass('settings-param--active');    
                }    
                if (onClick) {    
                    item.on('hover:enter', onClick);    
                }    
                return item;    
            }    
    
            function saveFocusContext() {    
                var enabled = Lampa.Controller.enabled();    
                if (enabled && enabled.name !== 'modal') {    
                    previousController = enabled.name;    
                }    
            }    
    
            function restoreFocusContext() {    
                if (previousController) {    
                    Lampa.Controller.toggle(previousController);    
                    previousController = null;    
                }    
                lastFocus = null;    
            }    
    
            function openPlayerModal(title, html, onBack) {    
                if (Lampa.Controller.enabled().name === 'modal') {    
                    Lampa.Modal.close();    
                    setTimeout(function () {    
                        var modalHtml = prepareModalHtml(html);    
                        Lampa.Modal.open({    
                            title: title,    
                            html: modalHtml,    
                            size: 'medium',    
                            align: 'center',    
                            onBack: onBack    
                        });    
                    }, 100);    
                    return;    
                }    
    
                saveFocusContext();    
                var modalHtml = prepareModalHtml(html);    
                Lampa.Modal.open({    
                    title: title,    
                    html: modalHtml,    
                    size: 'medium',    
                    align: 'center',    
                    onBack: onBack    
                });    
            }    
    
            function prepareModalHtml(html) {    
                html.find('.selector').on('hover:focus', function (e) {    
                    lastFocus = e.target;    
                });    
                return html;    
            }    
    
            function showPlayerSelect(playerType) {    
                var availablePlayers = getAvailablePlayers(playerType);    
                var currentPlayer = getCurrentPlayer(playerType);    
                var html = $('<div></div>');    
    
                for (var key in availablePlayers) {    
                    if (!availablePlayers.hasOwnProperty(key)) continue;    
    
                    var isCurrent = key === currentPlayer;    
                    var playerName = availablePlayers[key];    
                    var descr = isCurrent ? Lampa.Lang.translate('top_bar_player_current') : null;    
    
                    var item = createMenuItem(    
                        playerName,    
                        descr,    
                        function (playerKey) {    
                            return function () {    
                                setPlayer(playerType, playerKey);    
                                Lampa.Modal.close();    
                                restoreFocusContext();    
                            };    
                        }(key),    
                        isCurrent    
                    );    
    
                    html.append(item);    
                }    
    
                openPlayerModal(    
                    Lampa.Lang.translate('top_bar_player_' + playerType),    
                    html,    
                    function () {    
                        Lampa.Modal.close();    
                        restoreFocusContext();    
                    }    
                );    
            }    
    
            function showMainPlayerMenu() {    
                var html = $('<div></div>');    
    
                PLAYER_TYPES.forEach(function (type) {    
                    var title = Lampa.Lang.translate('top_bar_player_' + type);    
                    var availablePlayers = getAvailablePlayers(type);    
                    var currentPlayerKey = getCurrentPlayer(type);    
                    var currentPlayerName = getPlayerName(currentPlayerKey, availablePlayers);    
    
                    var item = createMenuItem(    
                        title,    
                        currentPlayerName,    
                        function (playerType) {    
                            return function () {    
                                showPlayerSelect(playerType);    
                            };    
                        }(type)    
                    );    
    
                    html.append(item);    
                });    
    
                openPlayerModal(Lampa.Lang.translate('top_bar_player_switch'), html, function () {    
                    Lampa.Modal.close();    
                    restoreFocusContext();    
                });    
            }    
    
            function initPlayerSwitch() {    
                var playerIcon = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="currentColor"/></svg>';    
                    
                if ($('.head__action--player-switch').length === 0) {    
                    var button = Lampa.Head.addIcon(playerIcon, showMainPlayerMenu);    
                    button.addClass('head__action--player-switch');    
    
                    var headActions = Lampa.Head.render().find('.head__actions');    
                    var settingsButton = headActions.find('.open--settings');    
    
                    if (settingsButton.length) {    
                        settingsButton.before(button);    
                    }    
                }    
            }    
    
            // Додаємо налаштування    
            function addSettings() {    
                Lampa.SettingsApi.addComponent({    
                    component: 'menu_editor',    
                    icon: `<svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">    
                        <path d="M18.2989 5.27973L2.60834 20.9715C2.52933 21.0507 2.47302 21.1496 2.44528 21.258L0.706081 28.2386C0.680502 28.3422 0.682069 28.4507 0.710632 28.5535C0.739195 28.6563 0.793788 28.75 0.869138 28.8255C0.984875 28.9409 1.14158 29.0057 1.30498 29.0059C1.35539 29.0058 1.4056 28.9996 1.45449 28.9873L8.43509 27.2479C8.54364 27.2206 8.64271 27.1643 8.72172 27.0851L24.4137 11.3944L18.2989 5.27973ZM28.3009 3.14018L26.5543 1.39363C25.3869 0.226285 23.3524 0.227443 22.1863 1.39363L20.0469 3.53318L26.1614 9.64766L28.3009 7.50816C28.884 6.9253 29.2052 6.14945 29.2052 5.32432C29.2052 4.49919 28.884 3.72333 28.3009 3.14018Z" fill="currentColor"/>    
                    </svg>`,    
                    name: Lampa.Lang.translate('menu_editor_title')    
                })    
    
                Lampa.SettingsApi.addParam({    
                    component: 'menu_editor',    
                    param: {    
                        name: 'edit_left_menu',    
                        type: 'button',    
                    },    
                    field: {    
                        name: Lampa.Lang.translate('menu_editor_left'),    
                    },    
                    onChange: editLeftMenu    
                })    
    
                Lampa.SettingsApi.addParam({    
                    component: 'menu_editor',    
                    param: {    
                        name: 'edit_top_menu',    
                        type: 'button',    
                    },    
                    field: {    
                        name: Lampa.Lang.translate('menu_editor_top'),    
                    },    
                    onChange: editTopMenu    
                })    
    
                Lampa.SettingsApi.addParam({    
                    component: 'menu_editor',    
                    param: {    
                        name: 'edit_settings_menu',    
                        type: 'button',    
                    },    
                    field: {    
                        name: Lampa.Lang.translate('menu_editor_settings'),    
                    },    
                    onChange: editSettingsMenu    
                })    
    
                Lampa.SettingsApi.addParam({    
                    component: 'menu_editor',    
                    param: {    
                        name: 'add_reload_button',    
                        type: 'trigger',    
                        default: false    
                    },    
                    field: {    
                        name: Lampa.Lang.translate('menu_editor_add_reload_button'),    
                        description: 'Додає кнопку перезавантаження у верхнє меню'    
                    },    
                    onChange: function(value) {    
                        setTimeout(applyTopMenu, 100)    
                    }    
                })    
    
                Lampa.SettingsApi.addParam({    
                    component: 'menu_editor',    
                    param: {    
                        name: 'add_clear_cache_button',    
                        type: 'trigger',    
                        default: false    
                    },    
                    field: {    
                        name: Lampa.Lang.translate('menu_editor_add_clear_cache_button'),    
                        description: 'Додає кнопку очищення кешу у верхнє меню'    
                    },    
                    onChange: function(value) {    
                        setTimeout(applyTopMenu, 100)    
                    }    
                })    
    
                Lampa.SettingsApi.addParam({    
                    component: 'menu_editor',    
                    param: {    
                        name: 'add_player_switch_button',    
                        type: 'trigger',    
                        default: false    
                    },    
                    field: {    
                        name: Lampa.Lang.translate('menu_editor_add_player_switch_button'),    
                        description: 'Додає кнопку вибору плеєра у верхнє меню'    
                    },    
                    onChange: function(value) {    
                        setTimeout(applyTopMenu, 100)    
                    }    
                })    
    
                Lampa.SettingsApi.addParam({    
                    component: 'menu_editor',    
                    param: {    
                        name: 'hide_navigation_bar',    
                        type: 'trigger',    
                        default: false    
                    },    
                    field: {    
                        name: Lampa.Lang.translate('menu_editor_hide_nav'),    
                        description: 'Приховує нижню панель навігації на телефоні'    
                    },    
                    onChange: function(value) {    
                        if (Lampa.Storage.field('hide_navigation_bar') == true) {    
                            Lampa.Template.add('hide_nav_bar', '<style id="hide_nav_bar">.navigation-bar{display:none!important}</style>');    
                            $('body').append(Lampa.Template.get('hide_nav_bar', {}, true));    
                        }    
                        if (Lampa.Storage.field('hide_navigation_bar') == false) {    
                            $('#hide_nav_bar').remove();    
                        }    
                    }    
                })    
    
                if (Lampa.Storage.field('hide_navigation_bar') == true) {    
                    Lampa.Template.add('hide_nav_bar', '<style id="hide_nav_bar">.navigation-bar{display:none!important}</style>');    
                    $('body').append(Lampa.Template.get('hide_nav_bar', {}, true));    
                }    
            }    
    
            addSettings()    
    
            // Застосовуємо налаштування при завантаженні    
            setTimeout(() => {    
                applyLeftMenu()    
                setTimeout(applyTopMenu, 300)    
            }, 500)    
    
            // Слухач події завершення ініціалізації меню    
            Lampa.Listener.follow('menu', (e) => {    
                if(e.type === 'end') {    
                    setTimeout(applyLeftMenu, 200)    
                }    
            })    
    
            Lampa.Listener.follow('activity', (e) => {    
                if(e.type === 'start' && e.component === 'settings') {    
                    setTimeout(applySettingsMenu, 500)    
                }    
            })    
    
            if(Lampa.Settings && Lampa.Settings.listener) {    
                Lampa.Settings.listener.follow('open', (e) => {    
                    setTimeout(applySettingsMenu, 300)    
                })    
            }    
        }    
    
        if(window.appready) initialize()    
        else {    
            Lampa.Listener.follow('app', function (e) {    
                if (e.type == 'ready') initialize()    
            })    
        }    
    }    
    
    if(!window.plugin_menu_editor_ready) startPlugin()    
})();