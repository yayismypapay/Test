/* =================================================================
   Musify — local-first music player
   ================================================================= */
(() => {
  'use strict';

  // ===== i18n =====
  const i18n = {
    en: {
      'nav.home': 'Home', 'nav.search': 'Search', 'nav.library': 'Library',
      'nav.add': 'Add music', 'nav.liked': 'Liked Songs', 'nav.settings': 'Settings',
      'sidebar.your_library': 'Your library',

      'home.eyebrow': 'Welcome',
      'home.sub': "Your personal music library — pure, private and built around the tracks you actually love.",
      'home.recently_added': 'Recently added',
      'home.shortcuts': 'Quick actions',
      'home.shortcut_add': 'Add music',
      'home.shortcut_library': 'Open library',
      'home.shortcut_liked': 'Liked songs',
      'home.shortcut_settings': 'Settings',
      'common.show_all': 'Show all',
      'common.cancel': 'Cancel',
      'common.confirm': 'Confirm',

      'empty.home_title': 'Your library is empty',
      'empty.home_sub': 'Add your first track to start building your collection.',
      'empty.cta_add': 'Add music',
      'empty.library_title': 'No tracks yet',
      'empty.library_sub': 'Upload your first MP3 to get started.',
      'empty.liked_title': 'No liked songs yet',
      'empty.liked_sub': 'Tap the heart on any track to add it here.',

      'search.title': 'Search',
      'search.placeholder': 'Search tracks, artists',
      'search.hint': 'Start typing to find tracks in your library.',
      'search.tracks': 'Tracks',
      'search.no_results': 'Nothing found',
      'search.try_again': 'Try a different track name or artist.',

      'library.title': 'Your library',
      'library.all': 'All',
      'library.liked': 'Liked',
      'library.recent': 'Recently added',
      'library.add': 'Add music',

      'liked.kind': 'Collection',
      'liked.title': 'Liked Songs',
      'liked.desc': "Every track you've marked as favorite.",

      'track.title': 'Title',
      'track.album': 'Album',
      'track.duration': 'Duration',

      'add.title': 'Add music',
      'add.sub': 'Upload an MP3 from your device. Title and artist are required.',
      'add.drop_title': 'Drop your MP3 here',
      'add.drop_sub': 'or click to choose a file',
      'add.field_title': 'Title',
      'add.field_artist': 'Artist',
      'add.field_album': 'Album',
      'add.field_cover': 'Cover art',
      'add.ph_title': 'Track title',
      'add.ph_artist': 'Artist name',
      'add.ph_album': 'Album (optional)',
      'add.choose_image': 'Choose image',
      'add.remove_image': 'Remove',
      'add.save': 'Save track',
      'add.toast_added': 'Track added to your library',
      'add.error_no_file': 'Please choose an MP3 file.',
      'add.error_required': 'Title and artist are required.',
      'add.error_not_audio': 'That file is not a supported audio format.',
      'add.error_too_big': 'File is too large to store in the browser.',
      'add.error_save_failed': 'Could not save the track. Try a smaller file.',

      'settings.title': 'Settings',
      'settings.sub': 'Personalize Musify and manage your data.',
      'settings.language': 'Language',
      'settings.language_sub': 'Choose the interface language.',
      'settings.data': 'Data',
      'settings.data_sub': 'Export a backup of your library, or restore one.',
      'settings.export': 'Export library',
      'settings.import': 'Import library',
      'settings.clear': 'Clear library',
      'settings.about': 'About',
      'settings.about_desc': 'A local-first music library that lives entirely in your browser.',
      'settings.export_preparing': 'Preparing export…',
      'settings.export_done': 'Backup downloaded.',
      'settings.export_empty': 'Your library is empty — nothing to export.',
      'settings.import_done': 'Library imported.',
      'settings.import_failed': 'Could not read that file.',
      'settings.confirm_clear_title': 'Clear library?',
      'settings.confirm_clear_body': 'This will remove every track and reset all preferences. This action cannot be undone.',
      'settings.cleared': 'Library cleared.',

      'player.empty_title': 'Nothing playing',
      'player.error': 'Cannot play this track.',
    },
    ru: {
      'nav.home': 'Главная', 'nav.search': 'Поиск', 'nav.library': 'Библиотека',
      'nav.add': 'Добавить', 'nav.liked': 'Любимые треки', 'nav.settings': 'Настройки',
      'sidebar.your_library': 'Ваша библиотека',

      'home.eyebrow': 'Добро пожаловать',
      'home.sub': 'Ваша личная музыкальная библиотека — приватная и собранная только из треков, которые вы любите.',
      'home.recently_added': 'Недавно добавленные',
      'home.shortcuts': 'Быстрые действия',
      'home.shortcut_add': 'Добавить музыку',
      'home.shortcut_library': 'Открыть библиотеку',
      'home.shortcut_liked': 'Любимые треки',
      'home.shortcut_settings': 'Настройки',
      'common.show_all': 'Показать все',
      'common.cancel': 'Отмена',
      'common.confirm': 'Подтвердить',

      'empty.home_title': 'Ваша библиотека пуста',
      'empty.home_sub': 'Добавьте первый трек, чтобы начать собирать коллекцию.',
      'empty.cta_add': 'Добавить музыку',
      'empty.library_title': 'Пока нет треков',
      'empty.library_sub': 'Загрузите первый MP3-файл, чтобы начать.',
      'empty.liked_title': 'Нет любимых треков',
      'empty.liked_sub': 'Нажмите сердечко на любом треке, чтобы добавить его сюда.',

      'search.title': 'Поиск',
      'search.placeholder': 'Поиск треков, исполнителей',
      'search.hint': 'Начните вводить, чтобы найти треки в библиотеке.',
      'search.tracks': 'Треки',
      'search.no_results': 'Ничего не найдено',
      'search.try_again': 'Попробуйте другое название или исполнителя.',

      'library.title': 'Ваша библиотека',
      'library.all': 'Все',
      'library.liked': 'Любимые',
      'library.recent': 'Недавно добавленные',
      'library.add': 'Добавить музыку',

      'liked.kind': 'Коллекция',
      'liked.title': 'Любимые треки',
      'liked.desc': 'Все треки, которые вы отметили сердечком.',

      'track.title': 'Название',
      'track.album': 'Альбом',
      'track.duration': 'Длительность',

      'add.title': 'Добавить музыку',
      'add.sub': 'Загрузите MP3 со своего устройства. Название и исполнитель обязательны.',
      'add.drop_title': 'Перетащите MP3 сюда',
      'add.drop_sub': 'или нажмите, чтобы выбрать файл',
      'add.field_title': 'Название',
      'add.field_artist': 'Исполнитель',
      'add.field_album': 'Альбом',
      'add.field_cover': 'Обложка',
      'add.ph_title': 'Название трека',
      'add.ph_artist': 'Имя исполнителя',
      'add.ph_album': 'Альбом (необязательно)',
      'add.choose_image': 'Выбрать изображение',
      'add.remove_image': 'Удалить',
      'add.save': 'Сохранить трек',
      'add.toast_added': 'Трек добавлен в библиотеку',
      'add.error_no_file': 'Пожалуйста, выберите MP3-файл.',
      'add.error_required': 'Заполните название и исполнителя.',
      'add.error_not_audio': 'Этот файл не является поддерживаемым аудио.',
      'add.error_too_big': 'Файл слишком большой для хранения в браузере.',
      'add.error_save_failed': 'Не удалось сохранить трек. Попробуйте файл поменьше.',

      'settings.title': 'Настройки',
      'settings.sub': 'Настройте Musify и управляйте своими данными.',
      'settings.language': 'Язык',
      'settings.language_sub': 'Выберите язык интерфейса.',
      'settings.data': 'Данные',
      'settings.data_sub': 'Создайте резервную копию библиотеки или восстановите её.',
      'settings.export': 'Экспорт библиотеки',
      'settings.import': 'Импорт библиотеки',
      'settings.clear': 'Очистить библиотеку',
      'settings.about': 'О приложении',
      'settings.about_desc': 'Локальная музыкальная библиотека, которая полностью живёт в вашем браузере.',
      'settings.export_preparing': 'Готовим экспорт…',
      'settings.export_done': 'Резервная копия скачана.',
      'settings.export_empty': 'Библиотека пуста — нечего экспортировать.',
      'settings.import_done': 'Библиотека импортирована.',
      'settings.import_failed': 'Не удалось прочитать этот файл.',
      'settings.confirm_clear_title': 'Очистить библиотеку?',
      'settings.confirm_clear_body': 'Это удалит все треки и сбросит настройки. Это действие нельзя отменить.',
      'settings.cleared': 'Библиотека очищена.',

      'player.empty_title': 'Ничего не играет',
      'player.error': 'Не удалось воспроизвести трек.',
    }
  };

  function t(key) {
    const lang = state.lang || 'en';
    return (i18n[lang] && i18n[lang][key]) || i18n.en[key] || key;
  }

  function applyI18n() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.getAttribute('data-i18n');
      el.textContent = t(k);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const k = el.getAttribute('data-i18n-placeholder');
      el.setAttribute('placeholder', t(k));
    });
    // Things rendered dynamically need a re-render
    refreshGreeting();
    if (currentView === 'home') renderHome();
    if (currentView === 'library') renderLibrary();
    if (currentView === 'liked') renderLiked();
    if (currentView === 'search') renderSearchHints();
    if (!state.lastTrackId) {
      $('#playerTitle').textContent = t('player.empty_title');
    }
  }

  // ===== State / storage =====
  const STORAGE_KEY = 'musify.state.v1';
  const defaultState = {
    lang: (navigator.language || 'en').startsWith('ru') ? 'ru' : 'en',
    tracks: [],          // [{id,title,artist,album,coverDataUri,duration,addedAt}]
    liked: [],           // track ids
    recent: [],          // track ids (most-recent first)
    volume: 0.75,
    muted: false,
    shuffle: false,
    repeat: 'off',       // 'off' | 'all' | 'one'
    lastTrackId: null,
    queue: [],
    queueIndex: 0,
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return structuredClone(defaultState);
      const parsed = JSON.parse(raw);
      return { ...structuredClone(defaultState), ...parsed };
    } catch {
      return structuredClone(defaultState);
    }
  }
  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }
  const state = loadState();

  // ===== IndexedDB for audio blobs =====
  const DB_NAME = 'musify-db';
  const STORE = 'audio';
  let _dbPromise = null;
  function db() {
    if (_dbPromise) return _dbPromise;
    _dbPromise = new Promise((resolve, reject) => {
      const r = indexedDB.open(DB_NAME, 1);
      r.onupgradeneeded = () => r.result.createObjectStore(STORE);
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error);
    });
    return _dbPromise;
  }
  async function dbPut(key, val) {
    const d = await db();
    return new Promise((res, rej) => {
      const tx = d.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(val, key);
      tx.oncomplete = () => res();
      tx.onerror = () => rej(tx.error);
    });
  }
  async function dbGet(key) {
    const d = await db();
    return new Promise((res, rej) => {
      const tx = d.transaction(STORE, 'readonly');
      const r = tx.objectStore(STORE).get(key);
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
  }
  async function dbDelete(key) {
    const d = await db();
    return new Promise((res, rej) => {
      const tx = d.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).delete(key);
      tx.oncomplete = () => res();
      tx.onerror = () => rej(tx.error);
    });
  }
  async function dbClear() {
    const d = await db();
    return new Promise((res, rej) => {
      const tx = d.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).clear();
      tx.oncomplete = () => res();
      tx.onerror = () => rej(tx.error);
    });
  }
  async function dbKeys() {
    const d = await db();
    return new Promise((res, rej) => {
      const tx = d.transaction(STORE, 'readonly');
      const r = tx.objectStore(STORE).getAllKeys();
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
  }

  // Cache of object URLs to free later
  const blobUrlCache = new Map(); // trackId -> ObjectURL

  async function getTrackUrl(trackId) {
    if (blobUrlCache.has(trackId)) return blobUrlCache.get(trackId);
    const blob = await dbGet(trackId);
    if (!blob) return null;
    const url = URL.createObjectURL(blob);
    blobUrlCache.set(trackId, url);
    return url;
  }
  function releaseTrackUrl(trackId) {
    const u = blobUrlCache.get(trackId);
    if (u) { URL.revokeObjectURL(u); blobUrlCache.delete(trackId); }
  }
  function releaseAllUrls() {
    blobUrlCache.forEach(u => URL.revokeObjectURL(u));
    blobUrlCache.clear();
  }

  // ===== DOM helpers =====
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  function escapeHtml(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function fmtTime(sec) {
    if (!isFinite(sec) || sec < 0) sec = 0;
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  // Hash to deterministic gradient cover
  function hashStr(s) {
    let h = 5381;
    for (let i = 0; i < s.length; i++) h = ((h << 5) + h) + s.charCodeAt(i);
    return Math.abs(h);
  }
  function generateCover(title, artist) {
    const seed = hashStr((title || '') + '|' + (artist || ''));
    const h1 = seed % 360;
    const h2 = (h1 + 40) % 360;
    const c1 = `hsl(${h1}, 70%, 30%)`;
    const c2 = `hsl(${h2}, 70%, 55%)`;
    const initial = (title || artist || '?').trim().charAt(0).toUpperCase() || '?';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/></linearGradient></defs><rect width="500" height="500" fill="url(#g)"/><circle cx="380" cy="130" r="150" fill="rgba(255,255,255,0.08)"/><circle cx="90" cy="420" r="220" fill="rgba(0,0,0,0.18)"/><text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-family="-apple-system, Segoe UI, Roboto, sans-serif" font-size="220" font-weight="800" fill="rgba(255,255,255,0.92)">${escapeHtml(initial)}</text></svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }
  function trackCoverUri(track) {
    return track.coverDataUri || generateCover(track.title, track.artist);
  }
  function coverStyle(uri) {
    return `background-image:url("${uri}")`;
  }

  // ===== Toast / Modal =====
  function toast(msg, kind = '') {
    const host = $('#toastHost');
    const el = document.createElement('div');
    el.className = `toast ${kind}`;
    el.textContent = msg;
    host.appendChild(el);
    setTimeout(() => {
      el.classList.add('fade-out');
      setTimeout(() => el.remove(), 280);
    }, 2600);
  }

  function confirmDialog({ title, body, confirmLabel = t('common.confirm'), cancelLabel = t('common.cancel') }) {
    return new Promise(resolve => {
      const modal = $('#confirmModal');
      $('#confirmTitle').textContent = title;
      $('#confirmBody').textContent = body;
      $('#confirmYes').textContent = confirmLabel;
      $('#confirmNo').textContent = cancelLabel;
      modal.hidden = false;
      function close(v) {
        modal.hidden = true;
        $('#confirmYes').removeEventListener('click', onYes);
        $('#confirmNo').removeEventListener('click', onNo);
        modal.removeEventListener('click', onBg);
        resolve(v);
      }
      function onYes() { close(true); }
      function onNo() { close(false); }
      function onBg(e) { if (e.target === modal) close(false); }
      $('#confirmYes').addEventListener('click', onYes);
      $('#confirmNo').addEventListener('click', onNo);
      modal.addEventListener('click', onBg);
    });
  }

  // ===== View routing =====
  const views = ['home', 'search', 'library', 'liked', 'add', 'settings'];
  const navHistory = [];
  let historyIdx = -1;
  let suppressHistory = false;
  let currentView = 'home';

  function navigate(name) {
    if (!views.includes(name)) return;

    if (name === 'home') renderHome();
    if (name === 'search') renderSearch();
    if (name === 'library') renderLibrary();
    if (name === 'liked') renderLiked();
    if (name === 'add') prepareAddForm();
    if (name === 'settings') renderSettings();

    $$('.view').forEach(v => v.classList.toggle('hidden', v.dataset.view !== name));
    $$('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.view === name));
    $$('.m-nav-item').forEach(b => b.classList.toggle('active', b.dataset.view === name));

    if (name === 'search') setTimeout(() => $('#searchInput')?.focus(), 30);

    currentView = name;
    $('#viewArea').scrollTop = 0;

    if (!suppressHistory) {
      navHistory.splice(historyIdx + 1);
      navHistory.push(name);
      historyIdx = navHistory.length - 1;
    }
    suppressHistory = false;
  }

  // ===== Renderers =====

  function refreshGreeting() {
    const hour = new Date().getHours();
    const lang = state.lang;
    let key;
    if (hour < 5) key = 'night';
    else if (hour < 12) key = 'morning';
    else if (hour < 18) key = 'afternoon';
    else key = 'evening';
    const map = {
      en: { night: 'Good night', morning: 'Good morning', afternoon: 'Good afternoon', evening: 'Good evening' },
      ru: { night: 'Доброй ночи', morning: 'Доброе утро', afternoon: 'Добрый день', evening: 'Добрый вечер' },
    };
    const g = $('#greeting');
    if (g) g.textContent = (map[lang] || map.en)[key];
  }

  function renderHome() {
    refreshGreeting();
    const recent = $('#homeRecentRow');
    const grid = $('#homeRecentGrid');
    const empty = $('#homeEmpty');
    const shortcuts = $('#homeShortcutsRow');

    grid.innerHTML = '';
    const recentTracks = state.recent
      .map(id => state.tracks.find(x => x.id === id))
      .filter(Boolean)
      .slice(0, 6);
    const fallback = (recentTracks.length === 0 && state.tracks.length > 0)
      ? state.tracks.slice().sort((a, b) => b.addedAt - a.addedAt).slice(0, 6)
      : recentTracks;

    if (fallback.length > 0) {
      empty.classList.add('hidden');
      recent.hidden = false;
      shortcuts.hidden = false;
      fallback.forEach(track => {
        grid.appendChild(buildTrackCard(track));
      });
    } else {
      recent.hidden = true;
      shortcuts.hidden = true;
      empty.classList.remove('hidden');
    }
  }

  function buildTrackCard(track) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-cover" style='${coverStyle(trackCoverUri(track))}'></div>
      <button class="card-play" aria-label="Play ${escapeHtml(track.title)}">
        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
      </button>
      <h3 class="card-title">${escapeHtml(track.title)}</h3>
      <p class="card-sub">${escapeHtml(track.artist)}</p>
    `;
    card.addEventListener('click', e => {
      if (e.target.closest('.card-play')) return;
      playTrack(track.id, state.tracks.map(x => x.id));
    });
    card.querySelector('.card-play').addEventListener('click', e => {
      e.stopPropagation();
      playTrack(track.id, state.tracks.map(x => x.id));
    });
    return card;
  }

  function renderSearchHints() {
    const input = $('#searchInput');
    const empty = $('#searchEmpty');
    if (!input.value) {
      empty.classList.remove('hidden');
      $('#searchResults').classList.add('hidden');
      $('#searchNoResults').classList.add('hidden');
    }
  }

  function renderSearch() {
    const input = $('#searchInput');
    input.value = '';
    renderSearchHints();
    input.oninput = () => performSearch(input.value);
  }

  function performSearch(query) {
    const q = query.trim().toLowerCase();
    const empty = $('#searchEmpty');
    const results = $('#searchResults');
    const noResults = $('#searchNoResults');

    if (!q) {
      empty.classList.remove('hidden');
      results.classList.add('hidden');
      noResults.classList.add('hidden');
      return;
    }

    const hits = state.tracks.filter(tr =>
      tr.title.toLowerCase().includes(q) ||
      tr.artist.toLowerCase().includes(q) ||
      (tr.album || '').toLowerCase().includes(q)
    );

    empty.classList.add('hidden');
    if (hits.length === 0) {
      results.classList.add('hidden');
      noResults.classList.remove('hidden');
      return;
    }
    noResults.classList.add('hidden');
    results.classList.remove('hidden');

    const list = $('#resTracks');
    list.innerHTML = '';
    hits.forEach((track, idx) => {
      list.appendChild(buildTrackRow(track, idx + 1, hits.map(h => h.id)));
    });
  }

  function renderLibrary() {
    const filter = $$('#libraryChips .chip').find(c => c.classList.contains('active'))?.dataset.filter || 'all';
    let list = state.tracks.slice();
    if (filter === 'liked') {
      list = list.filter(tr => state.liked.includes(tr.id));
    } else if (filter === 'recent') {
      list = list.sort((a, b) => b.addedAt - a.addedAt);
    } else {
      list = list.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    }

    const listEl = $('#libraryList');
    const wrap = $('#libraryListWrap');
    const empty = $('#libraryEmpty');

    listEl.innerHTML = '';
    if (list.length === 0) {
      wrap.classList.add('hidden');
      empty.classList.remove('hidden');
    } else {
      wrap.classList.remove('hidden');
      empty.classList.add('hidden');
      list.forEach((track, idx) => {
        listEl.appendChild(buildTrackRow(track, idx + 1, list.map(t => t.id), { withMenu: true }));
      });
    }

    $$('#libraryChips .chip').forEach(c => {
      c.onclick = () => {
        $$('#libraryChips .chip').forEach(x => x.classList.remove('active'));
        c.classList.add('active');
        renderLibrary();
      };
    });
  }

  function renderLiked() {
    const list = $('#likedTracks');
    const empty = $('#likedEmpty');
    list.innerHTML = '';

    const liked = state.liked
      .map(id => state.tracks.find(x => x.id === id))
      .filter(Boolean);

    $('#likedCount').textContent = `${liked.length} ${liked.length === 1
      ? (state.lang === 'ru' ? 'трек' : 'track')
      : (state.lang === 'ru' ? 'треков' : 'tracks')}`;

    if (liked.length === 0) {
      empty.classList.remove('hidden');
      $('#playLikedBtn').onclick = null;
    } else {
      empty.classList.add('hidden');
      liked.forEach((track, idx) => {
        list.appendChild(buildTrackRow(track, idx + 1, liked.map(x => x.id), { withMenu: true }));
      });
      $('#playLikedBtn').onclick = () => {
        playTrack(liked[0].id, liked.map(x => x.id));
      };
    }
  }

  function buildTrackRow(track, index, contextIds, opts = {}) {
    const row = document.createElement('div');
    row.className = 'track-row';
    row.dataset.trackId = track.id;
    const album = track.album || '';
    row.innerHTML = `
      <div class="track-num">
        <span class="num-text">${index}</span>
        <span class="num-play">
          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </span>
      </div>
      <div class="track-info">
        <div class="track-cover" style='${coverStyle(trackCoverUri(track))}'></div>
        <div class="track-text">
          <div class="track-title">${escapeHtml(track.title)}</div>
          <div class="track-artist">${escapeHtml(track.artist)}</div>
        </div>
      </div>
      <div class="track-album hide-sm">${escapeHtml(album)}</div>
      <div class="track-duration">
        <span>${fmtTime(track.duration)}</span>
        ${opts.withMenu ? `
          <button class="row-menu-btn" aria-label="Remove" title="Remove">
            <svg viewBox="0 0 24 24"><path d="M6 7h12l-1 13H7L6 7zm3-4h6l1 2H8l1-2zM4 5h16v2H4z"/></svg>
          </button>` : ''}
      </div>
    `;
    if (state.lastTrackId === track.id) row.classList.add('playing');

    row.addEventListener('click', e => {
      if (e.target.closest('.row-menu-btn')) return;
      playTrack(track.id, contextIds);
    });

    const menuBtn = row.querySelector('.row-menu-btn');
    if (menuBtn) {
      menuBtn.addEventListener('click', async e => {
        e.stopPropagation();
        const ok = await confirmDialog({
          title: state.lang === 'ru' ? 'Удалить трек?' : 'Remove track?',
          body: state.lang === 'ru'
            ? `«${track.title}» будет удалён из вашей библиотеки.`
            : `"${track.title}" will be removed from your library.`,
          confirmLabel: state.lang === 'ru' ? 'Удалить' : 'Remove',
        });
        if (ok) await removeTrack(track.id);
      });
    }
    return row;
  }

  // ===== Add Music =====
  let pendingFile = null;
  let pendingCoverDataUri = null;
  let detectedDuration = 0;

  function prepareAddForm() {
    pendingFile = null;
    pendingCoverDataUri = null;
    detectedDuration = 0;
    $('#fldTitle').value = '';
    $('#fldArtist').value = '';
    $('#fldAlbum').value = '';
    $('#dropFileName').hidden = true;
    $('#dropFileName').textContent = '';
    $('#coverPreview').style.backgroundImage = '';
    const af = $('#audioFile'); if (af) af.value = '';
    const cf = $('#coverFile'); if (cf) cf.value = '';
    const submitBtn = $('#addSubmitBtn');
    if (submitBtn) submitBtn.disabled = false;
  }

  function bindAddForm() {
    const dropZone = $('#dropZone');
    const fileInput = $('#audioFile');
    const coverInput = $('#coverFile');

    dropZone.addEventListener('click', e => {
      // Avoid recursion: a click that originated inside the (hidden) file input
      // bubbles back here after fileInput.click() — ignore it.
      if (e.target === fileInput) return;
      fileInput.click();
    });
    fileInput.addEventListener('click', e => e.stopPropagation());
    dropZone.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput.click(); }
    });
    dropZone.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      dropZone.classList.add('dragover');
    });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', e => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.remove('dragover');
      const file = e.dataTransfer.files?.[0];
      if (file) handleAudioFile(file);
    });
    fileInput.addEventListener('change', () => {
      const file = fileInput.files?.[0];
      if (file) handleAudioFile(file);
      // Reset so picking the same file again re-fires change
      fileInput.value = '';
    });

    $('#coverPickBtn').addEventListener('click', () => coverInput.click());
    coverInput.addEventListener('change', () => {
      const file = coverInput.files?.[0];
      if (file) handleCoverFile(file);
      coverInput.value = '';
    });
    $('#coverClearBtn').addEventListener('click', () => {
      pendingCoverDataUri = null;
      $('#coverPreview').style.backgroundImage = '';
      coverInput.value = '';
    });

    $('#addCancelBtn').addEventListener('click', () => {
      prepareAddForm();
      navigate('library');
    });

    $('#addForm').addEventListener('submit', async e => {
      e.preventDefault();
      await saveAddForm();
    });
  }

  function handleAudioFile(file) {
    const looksLikeAudio = file.type.startsWith('audio/') ||
      /\.(mp3|m4a|ogg|oga|wav|flac|aac|opus|webm)$/i.test(file.name);
    if (!looksLikeAudio) {
      toast(t('add.error_not_audio'), 'error');
      return;
    }
    // soft 50 MB cap to keep IndexedDB happy
    if (file.size > 50 * 1024 * 1024) {
      toast(t('add.error_too_big'), 'error');
      return;
    }
    pendingFile = file;
    detectedDuration = 0;
    $('#dropFileName').hidden = false;
    $('#dropFileName').textContent = `${file.name} · ${(file.size / 1024 / 1024).toFixed(1)} MB`;

    // Probe duration + auto-fill title if empty
    const tmp = document.createElement('audio');
    tmp.preload = 'metadata';
    const url = URL.createObjectURL(file);
    const cleanup = () => { try { URL.revokeObjectURL(url); } catch {} };
    tmp.src = url;
    tmp.addEventListener('loadedmetadata', () => {
      detectedDuration = isFinite(tmp.duration) ? tmp.duration : 0;
      cleanup();
    });
    tmp.addEventListener('error', cleanup);

    if (!$('#fldTitle').value) {
      $('#fldTitle').value = file.name.replace(/\.[^.]+$/, '').replace(/[_\-]+/g, ' ').trim();
    }
  }

  function handleCoverFile(file) {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      pendingCoverDataUri = reader.result;
      $('#coverPreview').style.backgroundImage = `url("${pendingCoverDataUri}")`;
    };
    reader.readAsDataURL(file);
  }

  async function saveAddForm() {
    const title = $('#fldTitle').value.trim();
    const artist = $('#fldArtist').value.trim();
    const album = $('#fldAlbum').value.trim();

    if (!pendingFile) { toast(t('add.error_no_file'), 'error'); return; }
    if (!title || !artist) { toast(t('add.error_required'), 'error'); return; }

    const submitBtn = $('#addSubmitBtn');
    submitBtn.disabled = true;
    const id = 'tr_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    try {
      await dbPut(id, pendingFile);
    } catch (err) {
      console.error('IDB put failed', err);
      const quota = err && (err.name === 'QuotaExceededError' || /quota/i.test(err.message || ''));
      toast(quota ? t('add.error_too_big') : t('add.error_save_failed'), 'error');
      submitBtn.disabled = false;
      return;
    }
    try {
      const track = {
        id,
        title,
        artist,
        album,
        coverDataUri: pendingCoverDataUri || null,
        duration: detectedDuration || 0,
        addedAt: Date.now(),
      };
      state.tracks.push(track);
      addToRecent(id);
      saveState();
      toast(t('add.toast_added'), 'success');
      prepareAddForm();
      navigate('library');
    } catch (err) {
      console.error(err);
      // Roll back the blob we just stored to avoid orphans
      try { await dbDelete(id); } catch {}
      toast(t('add.error_save_failed'), 'error');
    } finally {
      submitBtn.disabled = false;
    }
  }

  async function removeTrack(id) {
    // Stop if playing
    if (state.lastTrackId === id) {
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      state.lastTrackId = null;
      $('#playerTitle').textContent = t('player.empty_title');
      $('#playerArtist').textContent = '—';
      $('#playerCover').style.backgroundImage = '';
      showPlayIcon();
    }
    releaseTrackUrl(id);
    state.tracks = state.tracks.filter(tr => tr.id !== id);
    state.liked = state.liked.filter(x => x !== id);
    state.recent = state.recent.filter(x => x !== id);
    state.queue = state.queue.filter(x => x !== id);
    try { await dbDelete(id); } catch {}
    saveState();
    if (currentView === 'library') renderLibrary();
    if (currentView === 'liked') renderLiked();
    if (currentView === 'home') renderHome();
  }

  // ===== Settings =====
  function renderSettings() {
    $$('#langControl .seg-option').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === state.lang);
    });
    $('#exportStatus').hidden = true;
  }

  function bindSettings() {
    $$('#langControl .seg-option').forEach(b => {
      b.addEventListener('click', () => {
        state.lang = b.dataset.lang;
        saveState();
        applyI18n();
        renderSettings();
      });
    });

    $('#exportBtn').addEventListener('click', exportLibrary);
    $('#importBtn').addEventListener('click', () => $('#importFile').click());
    $('#importFile').addEventListener('change', e => {
      const f = e.target.files?.[0];
      if (f) importLibrary(f);
      e.target.value = '';
    });
    $('#clearBtn').addEventListener('click', async () => {
      const ok = await confirmDialog({
        title: t('settings.confirm_clear_title'),
        body: t('settings.confirm_clear_body'),
        confirmLabel: t('settings.clear'),
      });
      if (!ok) return;
      await clearEverything();
      toast(t('settings.cleared'), 'success');
    });
  }

  function showSettingsStatus(msg, kind) {
    const el = $('#exportStatus');
    el.hidden = false;
    el.textContent = msg;
    el.classList.remove('success', 'error');
    if (kind) el.classList.add(kind);
  }

  function blobToBase64(blob) {
    return new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result);
      r.onerror = () => rej(r.error);
      r.readAsDataURL(blob);
    });
  }
  function base64ToBlob(dataUri) {
    const [meta, b64] = dataUri.split(',');
    const mime = (meta.match(/data:([^;]+)/) || [, 'application/octet-stream'])[1];
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    return new Blob([arr], { type: mime });
  }

  async function exportLibrary() {
    if (state.tracks.length === 0) {
      showSettingsStatus(t('settings.export_empty'), 'error');
      return;
    }
    showSettingsStatus(t('settings.export_preparing'));
    try {
      const audios = [];
      for (const tr of state.tracks) {
        const blob = await dbGet(tr.id);
        if (!blob) continue;
        const b64 = await blobToBase64(blob);
        audios.push({ id: tr.id, data: b64 });
      }
      const payload = {
        app: 'musify',
        version: 1,
        exportedAt: new Date().toISOString(),
        state: {
          lang: state.lang,
          tracks: state.tracks,
          liked: state.liked,
          recent: state.recent,
        },
        audios,
      };
      const json = JSON.stringify(payload);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const stamp = new Date().toISOString().slice(0, 10);
      a.download = `musify-backup-${stamp}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      showSettingsStatus(t('settings.export_done'), 'success');
      toast(t('settings.export_done'), 'success');
    } catch (err) {
      console.error(err);
      showSettingsStatus(t('settings.import_failed'), 'error');
    }
  }

  async function importLibrary(file) {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!data || data.app !== 'musify' || !Array.isArray(data.audios) || !data.state) {
        throw new Error('Invalid file');
      }
      const incoming = data.state;
      const incomingTracks = Array.isArray(incoming.tracks) ? incoming.tracks : [];
      const existingIds = new Set(state.tracks.map(x => x.id));

      let added = 0;
      for (const tr of incomingTracks) {
        if (!tr.id || !tr.title || !tr.artist) continue;
        if (existingIds.has(tr.id)) continue;
        const audio = data.audios.find(a => a.id === tr.id);
        if (!audio || !audio.data) continue;
        const blob = base64ToBlob(audio.data);
        await dbPut(tr.id, blob);
        state.tracks.push({
          id: tr.id,
          title: String(tr.title).slice(0, 200),
          artist: String(tr.artist).slice(0, 200),
          album: tr.album ? String(tr.album).slice(0, 200) : '',
          coverDataUri: tr.coverDataUri || null,
          duration: Number(tr.duration) || 0,
          addedAt: Number(tr.addedAt) || Date.now(),
        });
        added++;
      }
      if (incoming.liked && Array.isArray(incoming.liked)) {
        const set = new Set([...state.liked, ...incoming.liked]);
        state.liked = [...set];
      }
      if (incoming.lang && i18n[incoming.lang]) state.lang = incoming.lang;
      saveState();
      applyI18n();
      toast(`${t('settings.import_done')} (+${added})`, 'success');
      showSettingsStatus(t('settings.import_done'), 'success');
    } catch (err) {
      console.error(err);
      toast(t('settings.import_failed'), 'error');
      showSettingsStatus(t('settings.import_failed'), 'error');
    }
  }

  async function clearEverything() {
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
    releaseAllUrls();
    state.tracks = [];
    state.liked = [];
    state.recent = [];
    state.queue = [];
    state.queueIndex = 0;
    state.lastTrackId = null;
    saveState();
    try { await dbClear(); } catch {}
    $('#playerTitle').textContent = t('player.empty_title');
    $('#playerArtist').textContent = '—';
    $('#playerCover').style.backgroundImage = '';
    $('#likeBtn').classList.remove('liked');
    showPlayIcon();
    setProgress(0);
    $('#curTime').textContent = '0:00';
    $('#durTime').textContent = '0:00';
    if (currentView === 'library') renderLibrary();
    if (currentView === 'liked') renderLiked();
    if (currentView === 'home') renderHome();
  }

  // ===== Player =====
  const audio = $('#audio');
  const playIcon = $('#playIcon');
  const pauseIcon = $('#pauseIcon');
  const volIcon = $('#volIcon');
  const muteIcon = $('#muteIcon');

  function currentTrack() {
    if (!state.queue.length) return null;
    return state.tracks.find(x => x.id === state.queue[state.queueIndex]);
  }

  async function loadTrack(track, autoplay = true) {
    if (!track) return;
    state.lastTrackId = track.id;

    const url = await getTrackUrl(track.id);
    if (!url) {
      toast(t('player.error'), 'error');
      return;
    }
    audio.src = url;

    $('#playerCover').style.cssText = coverStyle(trackCoverUri(track));
    $('#playerTitle').textContent = track.title;
    $('#playerArtist').textContent = track.artist;
    $('#durTime').textContent = fmtTime(track.duration);
    $('#curTime').textContent = '0:00';
    setProgress(0);
    updateLikeButton();
    refreshPlayingRows();
    addToRecent(track.id);
    saveState();

    if (autoplay) {
      try {
        await audio.play();
      } catch {
        showPlayIcon();
      }
    }
  }

  function playTrack(trackId, contextIds) {
    const ids = (contextIds && contextIds.length) ? contextIds.filter(id => state.tracks.find(t => t.id === id)) : [trackId];
    if (!ids.length) return;
    state.queue = ids.slice();
    state.queueIndex = Math.max(0, ids.indexOf(trackId));
    loadTrack(currentTrack(), true);
  }

  function addToRecent(id) {
    state.recent = [id, ...state.recent.filter(x => x !== id)].slice(0, 12);
  }

  function refreshPlayingRows() {
    $$('.track-row').forEach(r => {
      r.classList.toggle('playing', r.dataset.trackId === state.lastTrackId);
    });
  }

  function showPlayIcon() {
    playIcon.classList.remove('hidden');
    pauseIcon.classList.add('hidden');
    $('#playPauseBtn').setAttribute('aria-label', 'Play');
  }
  function showPauseIcon() {
    playIcon.classList.add('hidden');
    pauseIcon.classList.remove('hidden');
    $('#playPauseBtn').setAttribute('aria-label', 'Pause');
  }

  $('#playPauseBtn').addEventListener('click', togglePlay);
  function togglePlay() {
    if (!audio.src || !state.lastTrackId) {
      if (state.tracks.length > 0) {
        playTrack(state.tracks[0].id, state.tracks.map(t => t.id));
      } else {
        navigate('add');
      }
      return;
    }
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  }

  $('#nextBtn').addEventListener('click', () => nextTrack(false));
  $('#prevBtn').addEventListener('click', prevTrack);

  function nextTrack(auto = false) {
    if (!state.queue.length) return;
    if (state.repeat === 'one' && auto) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
      return;
    }
    if (state.shuffle && state.queue.length > 1) {
      let next = state.queueIndex;
      while (next === state.queueIndex) next = Math.floor(Math.random() * state.queue.length);
      state.queueIndex = next;
      loadTrack(currentTrack(), true);
      return;
    }
    state.queueIndex++;
    if (state.queueIndex >= state.queue.length) {
      if (state.repeat === 'all' || !auto) {
        state.queueIndex = 0;
      } else {
        state.queueIndex = state.queue.length - 1;
        audio.pause();
        audio.currentTime = 0;
        showPlayIcon();
        return;
      }
    }
    loadTrack(currentTrack(), true);
  }

  function prevTrack() {
    if (!state.queue.length) return;
    if (audio.currentTime > 3) { audio.currentTime = 0; return; }
    state.queueIndex--;
    if (state.queueIndex < 0) state.queueIndex = state.queue.length - 1;
    loadTrack(currentTrack(), true);
  }

  const shuffleBtn = $('#shuffleBtn');
  const repeatBtn = $('#repeatBtn');
  function applyShuffleUI() { shuffleBtn.classList.toggle('active', state.shuffle); }
  function applyRepeatUI() {
    repeatBtn.classList.toggle('active', state.repeat !== 'off');
    if (state.repeat === 'one') {
      repeatBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-6-5h2v6h-2v-4h-1v-2z"/></svg>`;
    } else {
      repeatBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>`;
    }
  }
  shuffleBtn.addEventListener('click', () => {
    state.shuffle = !state.shuffle;
    applyShuffleUI();
    saveState();
  });
  repeatBtn.addEventListener('click', () => {
    state.repeat = state.repeat === 'off' ? 'all' : state.repeat === 'all' ? 'one' : 'off';
    applyRepeatUI();
    saveState();
  });

  audio.addEventListener('play', showPauseIcon);
  audio.addEventListener('pause', showPlayIcon);
  audio.addEventListener('ended', () => nextTrack(true));
  audio.addEventListener('loadedmetadata', () => {
    const dur = audio.duration;
    if (isFinite(dur)) {
      $('#durTime').textContent = fmtTime(dur);
      const t = state.tracks.find(x => x.id === state.lastTrackId);
      if (t && (!t.duration || Math.abs(t.duration - dur) > 0.5)) {
        t.duration = dur;
        saveState();
      }
    }
  });
  audio.addEventListener('timeupdate', () => {
    if (!isFinite(audio.duration)) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    setProgress(pct);
    $('#curTime').textContent = fmtTime(audio.currentTime);
  });
  audio.addEventListener('error', () => {
    showPlayIcon();
  });

  function setProgress(pct) {
    $('#progressBar').style.setProperty('--fill', `${Math.max(0, Math.min(100, pct))}%`);
  }
  setupBar($('#progress'), pct => {
    if (!isFinite(audio.duration)) return;
    audio.currentTime = (pct / 100) * audio.duration;
    setProgress(pct);
  });

  function setVolumeUI(v) {
    $('#volumeBar').style.setProperty('--fill', `${v * 100}%`);
  }
  function applyVolume() {
    audio.volume = state.muted ? 0 : state.volume;
    setVolumeUI(state.muted ? 0 : state.volume);
    const off = state.muted || state.volume === 0;
    volIcon.classList.toggle('hidden', off);
    muteIcon.classList.toggle('hidden', !off);
  }
  setupBar($('#volume'), pct => {
    state.volume = Math.max(0, Math.min(1, pct / 100));
    state.muted = state.volume === 0;
    applyVolume();
    saveState();
  });
  $('#muteBtn').addEventListener('click', () => {
    state.muted = !state.muted;
    applyVolume();
    saveState();
  });

  function setupBar(el, onPct) {
    let dragging = false;
    function compute(e) {
      const rect = el.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      return Math.max(0, Math.min(100, (x / rect.width) * 100));
    }
    el.addEventListener('mousedown', e => { dragging = true; onPct(compute(e)); });
    document.addEventListener('mousemove', e => { if (dragging) onPct(compute(e)); });
    document.addEventListener('mouseup', () => { dragging = false; });
    el.addEventListener('touchstart', e => { dragging = true; onPct(compute(e)); }, { passive: true });
    document.addEventListener('touchmove', e => { if (dragging) onPct(compute(e)); }, { passive: true });
    document.addEventListener('touchend', () => { dragging = false; });
  }

  // Like
  function isLiked(id) { return state.liked.includes(id); }
  function toggleLike(id) {
    if (isLiked(id)) state.liked = state.liked.filter(x => x !== id);
    else state.liked = [id, ...state.liked];
    saveState();
    updateLikeButton();
    if (currentView === 'liked') renderLiked();
    if (currentView === 'library') renderLibrary();
  }
  function updateLikeButton() {
    const btn = $('#likeBtn');
    if (!state.lastTrackId) { btn.classList.remove('liked'); return; }
    btn.classList.toggle('liked', isLiked(state.lastTrackId));
  }
  $('#likeBtn').addEventListener('click', () => {
    if (state.lastTrackId) toggleLike(state.lastTrackId);
  });

  // Nav back / forward
  $('#navBack').addEventListener('click', () => {
    if (historyIdx > 0) { historyIdx--; suppressHistory = true; navigate(navHistory[historyIdx]); }
  });
  $('#navForward').addEventListener('click', () => {
    if (historyIdx < navHistory.length - 1) { historyIdx++; suppressHistory = true; navigate(navHistory[historyIdx]); }
  });

  // Sidebar & mobile-nav clicks.
  // Scope to button/link triggers only — the <section> view containers also
  // carry data-view, and matching them would re-navigate (and reset forms)
  // on every click inside a view.
  document.addEventListener('click', e => {
    const navBtn = e.target.closest('button[data-view], a[data-view]');
    if (navBtn) {
      const v = navBtn.dataset.view;
      if (v && views.includes(v)) navigate(v);
    }
  });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.target.matches('input, textarea')) return;
    if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
    if (e.code === 'ArrowRight' && e.shiftKey) nextTrack(false);
    if (e.code === 'ArrowLeft' && e.shiftKey) prevTrack();
  });

  // ===== Sync tracks with IndexedDB on boot =====
  async function reconcileWithDB() {
    try {
      const keys = new Set(await dbKeys());
      // Drop metadata for missing blobs
      state.tracks = state.tracks.filter(tr => keys.has(tr.id));
      const validIds = new Set(state.tracks.map(t => t.id));
      state.liked = state.liked.filter(id => validIds.has(id));
      state.recent = state.recent.filter(id => validIds.has(id));
      state.queue = state.queue.filter(id => validIds.has(id));
      if (state.queueIndex >= state.queue.length) state.queueIndex = 0;
      if (state.lastTrackId && !validIds.has(state.lastTrackId)) state.lastTrackId = null;
      saveState();
    } catch (e) {
      console.warn('IDB reconcile failed', e);
    }
  }

  // Prevent the browser from navigating away when a file is dropped
  // outside the drop zone (e.g. on the player or sidebar).
  ['dragover', 'drop'].forEach(evt => {
    window.addEventListener(evt, e => {
      if (e.target.closest('#dropZone')) return;
      e.preventDefault();
    });
  });

  // ===== Init =====
  async function init() {
    await reconcileWithDB();
    applyI18n();
    bindAddForm();
    bindSettings();
    applyShuffleUI();
    applyRepeatUI();
    applyVolume();

    if (state.lastTrackId) {
      const track = state.tracks.find(x => x.id === state.lastTrackId);
      if (track) {
        state.queue = state.queue.length ? state.queue : [track.id];
        state.queueIndex = Math.max(0, state.queue.indexOf(track.id));
        $('#playerCover').style.cssText = coverStyle(trackCoverUri(track));
        $('#playerTitle').textContent = track.title;
        $('#playerArtist').textContent = track.artist;
        $('#durTime').textContent = fmtTime(track.duration);
        updateLikeButton();
        const url = await getTrackUrl(track.id);
        if (url) audio.src = url;
      }
    }
    navigate('home');
  }

  init();
})();
