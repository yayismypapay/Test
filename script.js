/* ============================================================
   Sonora — music player site
   Plain HTML/CSS/JS, no auth, no backend, localStorage state.
   ============================================================ */

(() => {
  'use strict';

  // -------- Data --------
  const SH = i => `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${i}.mp3`;
  const COVER = id => `assets/covers/${id}.svg`;

  const tracks = [
    { id: 't1',  title: 'Midnight Drive',      artist: 'Echo Vale',        album: 'Night Drive',      duration: 372, cover: 'cover-01', url: SH(1) },
    { id: 't2',  title: 'Aurora Lights',       artist: 'Lumen Sky',        album: 'Aurora',           duration: 374, cover: 'cover-02', url: SH(2) },
    { id: 't3',  title: 'Deep Focus',          artist: 'Halcyon',          album: 'Deep Focus',       duration: 363, cover: 'cover-03', url: SH(3) },
    { id: 't4',  title: 'Golden Hour',         artist: 'Iris Bloom',       album: 'Golden Hour',      duration: 348, cover: 'cover-04', url: SH(4) },
    { id: 't5',  title: 'Past Midnight',       artist: 'North Coast',      album: 'Midnight',         duration: 387, cover: 'cover-05', url: SH(5) },
    { id: 't6',  title: 'Slow Sundays',        artist: 'Tape Room',        album: 'Lo-Fi Diaries',    duration: 251, cover: 'cover-06', url: SH(6) },
    { id: 't7',  title: 'Solstice',            artist: 'Atlas & Vine',     album: 'Solstice',         duration: 408, cover: 'cover-07', url: SH(7) },
    { id: 't8',  title: 'Electric Skies',      artist: 'Neon Parade',      album: 'Electric',         duration: 297, cover: 'cover-08', url: SH(8) },
    { id: 't9',  title: 'Through the Forest',  artist: 'Halcyon',          album: 'Forest',           duration: 322, cover: 'cover-09', url: SH(9) },
    { id: 't10', title: 'Velvet Dream',        artist: 'Iris Bloom',       album: 'Velvet',           duration: 281, cover: 'cover-10', url: SH(10) },
    { id: 't11', title: 'Tides',               artist: 'North Coast',      album: 'Tides',            duration: 365, cover: 'cover-11', url: SH(11) },
    { id: 't12', title: 'Noir',                artist: 'Echo Vale',        album: 'Noir',             duration: 411, cover: 'cover-12', url: SH(12) },
    { id: 't13', title: 'Ember',               artist: 'Atlas & Vine',     album: 'Ember',            duration: 339, cover: 'cover-13', url: SH(13) },
    { id: 't14', title: 'Dusk Patrol',         artist: 'Neon Parade',      album: 'Dusk',             duration: 354, cover: 'cover-14', url: SH(14) },
    { id: 't15', title: 'Fern Meadow',         artist: 'Tape Room',        album: 'Fern',             duration: 273, cover: 'cover-15', url: SH(15) },
    { id: 't16', title: 'Ocean Floor',         artist: 'Lumen Sky',        album: 'Ocean',            duration: 318, cover: 'cover-16', url: SH(16) },
  ];

  const trackById = id => tracks.find(t => t.id === id);

  const playlists = [
    {
      id: 'pl1', name: 'Late Night Drive', owner: 'Sonora',
      cover: 'cover-01', accent: '#1ed760',
      description: 'Cinematic synths and slow tempos for empty highways.',
      trackIds: ['t1', 't5', 't11', 't14', 't7', 't12'],
    },
    {
      id: 'pl2', name: 'Deep Focus', owner: 'Sonora',
      cover: 'cover-03', accent: '#3a8dff',
      description: 'Quiet electronic textures to keep your mind in the work.',
      trackIds: ['t3', 't9', 't6', 't15', 't11', 't16'],
    },
    {
      id: 'pl3', name: 'Golden Hour', owner: 'Sonora',
      cover: 'cover-04', accent: '#ffaf7b',
      description: 'Warm guitars and sunset chords for the in-between moments.',
      trackIds: ['t4', 't10', 't7', 't13', 't2', 't8'],
    },
    {
      id: 'pl4', name: 'Lo-Fi Diaries', owner: 'Sonora',
      cover: 'cover-06', accent: '#a3a3a3',
      description: 'Soft beats, dusty samples, and rainy windows.',
      trackIds: ['t6', 't15', 't10', 't3', 't9'],
    },
    {
      id: 'pl5', name: 'Electric Skies', owner: 'Sonora',
      cover: 'cover-08', accent: '#fc466b',
      description: 'High-voltage synthwave to charge the rest of your day.',
      trackIds: ['t8', 't14', 't13', 't2', 't1', 't12'],
    },
    {
      id: 'pl6', name: 'Coastal Quiet', owner: 'Sonora',
      cover: 'cover-11', accent: '#1cb5e0',
      description: 'Ambient sketches inspired by saltwater air and morning fog.',
      trackIds: ['t11', 't16', 't9', 't15', 't5'],
    },
    {
      id: 'pl7', name: 'Velvet Nights', owner: 'Sonora',
      cover: 'cover-10', accent: '#c471f5',
      description: 'After-hours grooves with a touch of late-jazz haze.',
      trackIds: ['t10', 't4', 't2', 't13', 't12'],
    },
    {
      id: 'pl8', name: 'Forest Mind', owner: 'Sonora',
      cover: 'cover-09', accent: '#34e89e',
      description: 'Earthy textures for slow walks and clearer thinking.',
      trackIds: ['t9', 't15', 't3', 't16', 't11'],
    },
  ];

  const artistsList = (() => {
    const map = {};
    tracks.forEach(t => {
      if (!map[t.artist]) map[t.artist] = { name: t.artist, trackIds: [], coverPool: new Set() };
      map[t.artist].trackIds.push(t.id);
      map[t.artist].coverPool.add(t.cover);
    });
    return Object.values(map).map(a => ({
      id: 'a_' + a.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: a.name,
      trackIds: a.trackIds,
      cover: [...a.coverPool][0],
    }));
  })();

  const genres = [
    { name: 'Pop',         color: 'linear-gradient(135deg, #fc466b, #3f5efb)' },
    { name: 'Electronic',  color: 'linear-gradient(135deg, #00c6ff, #0072ff)' },
    { name: 'Indie',       color: 'linear-gradient(135deg, #ff8008, #ffc837)' },
    { name: 'Ambient',     color: 'linear-gradient(135deg, #1f4037, #99f2c8)' },
    { name: 'Lo-Fi',       color: 'linear-gradient(135deg, #232526, #414345)' },
    { name: 'Jazz',        color: 'linear-gradient(135deg, #614385, #516395)' },
    { name: 'Soul',        color: 'linear-gradient(135deg, #c33764, #1d2671)' },
    { name: 'Classical',   color: 'linear-gradient(135deg, #243b55, #141e30)' },
    { name: 'Rock',        color: 'linear-gradient(135deg, #870000, #190a05)' },
    { name: 'Hip-Hop',     color: 'linear-gradient(135deg, #f7971e, #ffd200)' },
    { name: 'R&B',         color: 'linear-gradient(135deg, #3a1c71, #d76d77)' },
    { name: 'Acoustic',    color: 'linear-gradient(135deg, #603813, #b29f94)' },
  ];

  // -------- State (with localStorage) --------
  const STORAGE_KEY = 'sonora.state.v1';
  const defaultState = {
    liked: [],
    recent: [],
    volume: 0.7,
    muted: false,
    shuffle: false,
    repeat: 'off',
    lastTrackId: null,
    queue: [],
    queueIndex: 0,
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...defaultState };
      const parsed = JSON.parse(raw);
      return { ...defaultState, ...parsed };
    } catch {
      return { ...defaultState };
    }
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }

  const state = loadState();

  // -------- DOM refs --------
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  const audio = $('#audio');
  const viewArea = $('#viewArea');

  // -------- Helpers --------
  function fmtTime(sec) {
    if (!isFinite(sec) || sec < 0) sec = 0;
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  function coverStyle(coverId) {
    return `background-image:url("${COVER(coverId)}")`;
  }

  function playlistMeta(p) {
    const total = p.trackIds.reduce((s, id) => s + (trackById(id)?.duration || 0), 0);
    const hours = Math.floor(total / 3600);
    const mins = Math.floor((total % 3600) / 60);
    const dur = hours > 0 ? `${hours} hr ${mins} min` : `${mins} min`;
    return `${p.trackIds.length} tracks · ${dur}`;
  }

  // -------- View routing --------
  const views = ['home', 'search', 'library', 'liked', 'playlist'];
  const navHistory = [];
  let historyIdx = -1;
  let suppressHistory = false;
  let currentView = 'home';
  let currentPlaylistId = null;

  function showView(name, opts = {}) {
    if (!views.includes(name)) return;

    // Render view content where needed
    if (name === 'home') renderHome();
    if (name === 'search') renderSearch();
    if (name === 'library') renderLibrary();
    if (name === 'liked') renderLiked();
    if (name === 'playlist' && opts.playlistId) {
      currentPlaylistId = opts.playlistId;
      renderPlaylistPage(opts.playlistId);
    }

    $$('.view').forEach(v => {
      v.classList.toggle('hidden', v.dataset.view !== name);
    });

    // Top nav highlight
    $$('.nav-item').forEach(b => b.classList.toggle('active',
      b.dataset.view === name || (name === 'playlist' && b.dataset.view === 'library')));
    $$('.m-nav-item').forEach(b => b.classList.toggle('active', b.dataset.view === name));

    // Sidebar playlist highlight
    $$('.sp-item').forEach(el => {
      el.classList.toggle('active', name === 'playlist' && el.dataset.playlistId === currentPlaylistId);
    });

    if (name === 'search') {
      setTimeout(() => $('#searchInput')?.focus(), 50);
    }

    currentView = name;
    viewArea.scrollTop = 0;

    if (!suppressHistory) {
      navHistory.splice(historyIdx + 1);
      navHistory.push({ name, opts: { ...opts } });
      historyIdx = navHistory.length - 1;
    }
    suppressHistory = false;
  }

  function navigate(name, opts = {}) { showView(name, opts); }

  // Back / Forward
  $('#navBack').addEventListener('click', () => {
    if (historyIdx > 0) {
      historyIdx--;
      const entry = navHistory[historyIdx];
      suppressHistory = true;
      showView(entry.name, entry.opts);
    }
  });
  $('#navForward').addEventListener('click', () => {
    if (historyIdx < navHistory.length - 1) {
      historyIdx++;
      const entry = navHistory[historyIdx];
      suppressHistory = true;
      showView(entry.name, entry.opts);
    }
  });

  // Sidebar nav clicks
  $$('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      if (view) navigate(view);
    });
  });
  $$('.m-nav-item').forEach(btn => {
    btn.addEventListener('click', () => navigate(btn.dataset.view));
  });

  // -------- Renderers --------

  function createCard({ cover, title, sub, onClick, onPlay, round = false }) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-cover ${round ? 'artist' : ''}" style='${coverStyle(cover)}'></div>
      <button class="card-play" aria-label="Play ${title}">
        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
      </button>
      <h3 class="card-title">${escapeHtml(title)}</h3>
      <p class="card-sub">${escapeHtml(sub || '')}</p>
    `;
    card.addEventListener('click', e => {
      if (e.target.closest('.card-play')) return;
      onClick && onClick();
    });
    card.querySelector('.card-play').addEventListener('click', e => {
      e.stopPropagation();
      onPlay && onPlay();
    });
    return card;
  }

  function renderHome() {
    // Greeting
    const hour = new Date().getHours();
    const greeting = hour < 5 ? 'Good night' : hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    $('#greeting').textContent = greeting;

    // Featured
    const featured = $('#featuredGrid');
    featured.innerHTML = '';
    playlists.slice(0, 6).forEach(p => {
      featured.appendChild(createCard({
        cover: p.cover,
        title: p.name,
        sub: p.description,
        onClick: () => navigate('playlist', { playlistId: p.id }),
        onPlay: () => playPlaylist(p.id),
      }));
    });

    // Recent
    const recent = $('#recentGrid');
    recent.innerHTML = '';
    const recentIds = state.recent.slice(0, 6);
    if (recentIds.length === 0) {
      playlists.slice(2, 8).forEach(p => {
        recent.appendChild(createCard({
          cover: p.cover, title: p.name, sub: p.description,
          onClick: () => navigate('playlist', { playlistId: p.id }),
          onPlay: () => playPlaylist(p.id),
        }));
      });
    } else {
      recentIds.forEach(tid => {
        const t = trackById(tid);
        if (!t) return;
        recent.appendChild(createCard({
          cover: t.cover,
          title: t.title,
          sub: t.artist,
          onClick: () => playTrack(t.id, tracks.map(x => x.id)),
          onPlay: () => playTrack(t.id, tracks.map(x => x.id)),
        }));
      });
    }

    // Recommended
    const recs = $('#recsGrid');
    recs.innerHTML = '';
    const recPlaylists = [...playlists].sort(() => 0.5 - Math.random()).slice(0, 6);
    recPlaylists.forEach(p => {
      recs.appendChild(createCard({
        cover: p.cover, title: p.name, sub: p.description,
        onClick: () => navigate('playlist', { playlistId: p.id }),
        onPlay: () => playPlaylist(p.id),
      }));
    });
  }

  function renderSearch() {
    // Genre grid (empty state)
    const grid = $('#genreGrid');
    grid.innerHTML = '';
    genres.forEach(g => {
      const tile = document.createElement('div');
      tile.className = 'genre-tile';
      tile.style.background = g.color;
      tile.innerHTML = `<h3>${g.name}</h3>`;
      tile.addEventListener('click', () => {
        $('#searchInput').value = g.name;
        performSearch(g.name);
      });
      grid.appendChild(tile);
    });

    const input = $('#searchInput');
    input.value = '';
    $('#searchEmpty').classList.remove('hidden');
    $('#searchResults').classList.add('hidden');

    input.oninput = () => performSearch(input.value);
  }

  function performSearch(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      $('#searchEmpty').classList.remove('hidden');
      $('#searchResults').classList.add('hidden');
      return;
    }
    $('#searchEmpty').classList.add('hidden');
    $('#searchResults').classList.remove('hidden');

    const trackHits = tracks.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.artist.toLowerCase().includes(q) ||
      t.album.toLowerCase().includes(q)
    ).slice(0, 8);

    const artistHits = artistsList.filter(a => a.name.toLowerCase().includes(q)).slice(0, 6);

    const playlistHits = playlists.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    ).slice(0, 6);

    // Tracks
    const trList = $('#resTracks');
    trList.innerHTML = '';
    $('#resTracksSection').classList.toggle('hidden', trackHits.length === 0);
    trackHits.forEach((t, idx) => {
      trList.appendChild(buildTrackRow(t, idx + 1, trackHits.map(x => x.id), { showAlbum: true }));
    });

    // Artists
    const arList = $('#resArtists');
    arList.innerHTML = '';
    $('#resArtistsSection').classList.toggle('hidden', artistHits.length === 0);
    artistHits.forEach(a => {
      arList.appendChild(createCard({
        cover: a.cover, title: a.name, sub: 'Artist', round: true,
        onClick: () => playArtist(a),
        onPlay: () => playArtist(a),
      }));
    });

    // Playlists
    const plList = $('#resPlaylists');
    plList.innerHTML = '';
    $('#resPlaylistsSection').classList.toggle('hidden', playlistHits.length === 0);
    playlistHits.forEach(p => {
      plList.appendChild(createCard({
        cover: p.cover, title: p.name, sub: p.description,
        onClick: () => navigate('playlist', { playlistId: p.id }),
        onPlay: () => playPlaylist(p.id),
      }));
    });
  }

  function playArtist(a) {
    const ids = a.trackIds;
    if (ids.length) playTrack(ids[0], ids);
  }

  function renderLibrary() {
    const grid = $('#libraryGrid');
    const activeFilter = $$('#libraryChips .chip').find(c => c.classList.contains('active'))?.dataset.filter || 'all';

    grid.innerHTML = '';
    const items = [];

    if (activeFilter === 'all' || activeFilter === 'liked') {
      if (state.liked.length > 0) {
        items.push({
          type: 'liked-card',
          render: () => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
              <div class="card-cover liked-cover" style="background:linear-gradient(135deg,#4a00e0,#8e2de2);display:grid;place-items:center;">
                <svg viewBox="0 0 64 64" style="width:48px;height:48px"><path d="M32 56s-19-12-19-26C13 22 19 16 26 16c3 0 5 1 6 3 1-2 3-3 6-3 7 0 13 6 13 14 0 14-19 26-19 26z" fill="#fff"/></svg>
              </div>
              <button class="card-play" aria-label="Play Liked Songs">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </button>
              <h3 class="card-title">Liked Songs</h3>
              <p class="card-sub">${state.liked.length} tracks you love</p>
            `;
            card.addEventListener('click', e => {
              if (e.target.closest('.card-play')) return;
              navigate('liked');
            });
            card.querySelector('.card-play').addEventListener('click', e => {
              e.stopPropagation();
              if (state.liked.length) playTrack(state.liked[0], state.liked.slice());
            });
            return card;
          }
        });
      }
    }

    if (activeFilter === 'all' || activeFilter === 'playlists' || activeFilter === 'recent') {
      const pls = activeFilter === 'recent' ? playlists.slice().reverse() : playlists;
      pls.forEach(p => {
        items.push({
          type: 'playlist',
          render: () => createCard({
            cover: p.cover, title: p.name, sub: `Playlist · ${p.owner}`,
            onClick: () => navigate('playlist', { playlistId: p.id }),
            onPlay: () => playPlaylist(p.id),
          })
        });
      });
    }

    items.forEach(it => grid.appendChild(it.render()));

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
    list.innerHTML = '';
    $('#likedCount').textContent = `${state.liked.length} track${state.liked.length === 1 ? '' : 's'}`;
    if (state.liked.length === 0) {
      list.innerHTML = `<div style="padding:24px 16px;color:var(--text-dim)">Tap the heart on any track to add it here.</div>`;
      return;
    }
    state.liked.forEach((id, idx) => {
      const t = trackById(id);
      if (!t) return;
      list.appendChild(buildTrackRow(t, idx + 1, state.liked.slice(), { showAlbum: true }));
    });
    $('#playLikedBtn').onclick = () => {
      if (state.liked.length) playTrack(state.liked[0], state.liked.slice());
    };
  }

  function renderPlaylistPage(playlistId) {
    const p = playlists.find(x => x.id === playlistId);
    if (!p) return;

    const header = $('#playlistHeader');
    header.style.background = `linear-gradient(180deg, ${p.accent}33 0%, transparent 280px)`;

    $('#playlistCover').style.cssText = coverStyle(p.cover);
    $('#playlistTitle').textContent = p.name;
    $('#playlistDesc').textContent = p.description;
    $('#playlistOwner').textContent = p.owner;
    $('#playlistStats').textContent = playlistMeta(p);

    const list = $('#playlistTracks');
    list.innerHTML = '';
    p.trackIds.forEach((id, idx) => {
      const t = trackById(id);
      if (!t) return;
      list.appendChild(buildTrackRow(t, idx + 1, p.trackIds.slice(), { showAlbum: true }));
    });

    $('#playPlaylistBtn').onclick = () => playPlaylist(p.id);
  }

  function buildTrackRow(track, index, contextIds, opts = {}) {
    const row = document.createElement('div');
    row.className = 'track-row';
    row.dataset.trackId = track.id;
    row.innerHTML = `
      <div class="track-num">
        <span class="num-text">${index}</span>
        <span class="num-play">
          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </span>
      </div>
      <div class="track-info">
        <div class="track-cover" style='${coverStyle(track.cover)}'></div>
        <div class="track-text">
          <div class="track-title">${escapeHtml(track.title)}</div>
          <div class="track-artist">${escapeHtml(track.artist)}</div>
        </div>
      </div>
      <div class="track-album hide-sm">${escapeHtml(opts.showAlbum ? track.album : '')}</div>
      <div class="track-duration">${fmtTime(track.duration)}</div>
    `;
    if (state.lastTrackId === track.id) row.classList.add('playing');
    row.addEventListener('click', () => {
      playTrack(track.id, contextIds);
    });
    return row;
  }

  function renderSidebarPlaylists() {
    const wrap = $('#sidebarPlaylists');
    wrap.innerHTML = '';
    playlists.forEach(p => {
      const el = document.createElement('div');
      el.className = 'sp-item';
      el.dataset.playlistId = p.id;
      el.innerHTML = `
        <div class="sp-cover" style='${coverStyle(p.cover)}'></div>
        <div class="sp-meta">
          <div class="sp-title">${escapeHtml(p.name)}</div>
          <div class="sp-sub">Playlist · ${escapeHtml(p.owner)}</div>
        </div>
      `;
      el.addEventListener('click', () => navigate('playlist', { playlistId: p.id }));
      wrap.appendChild(el);
    });
  }

  function escapeHtml(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  // -------- Player --------
  const playIcon = $('#playIcon');
  const pauseIcon = $('#pauseIcon');
  const volIcon = $('#volIcon');
  const muteIcon = $('#muteIcon');

  function currentTrack() {
    if (!state.queue.length) return null;
    return trackById(state.queue[state.queueIndex]);
  }

  function loadTrack(track, autoplay = true) {
    if (!track) return;
    state.lastTrackId = track.id;
    audio.src = track.url;

    $('#playerCover').style.cssText = coverStyle(track.cover);
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
      audio.play().catch(() => {
        showPlayIcon();
      });
    }
  }

  function playTrack(trackId, contextIds) {
    const ids = (contextIds && contextIds.length) ? contextIds.slice() : [trackId];
    state.queue = ids;
    state.queueIndex = Math.max(0, ids.indexOf(trackId));
    loadTrack(currentTrack(), true);
  }

  function playPlaylist(playlistId) {
    const p = playlists.find(x => x.id === playlistId);
    if (!p || !p.trackIds.length) return;
    let ids = p.trackIds.slice();
    if (state.shuffle) ids = shuffleArray(ids);
    playTrack(ids[0], ids);
  }

  function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function addToRecent(trackId) {
    state.recent = [trackId, ...state.recent.filter(id => id !== trackId)].slice(0, 12);
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
    if (!audio.src) {
      // Start with first featured playlist
      playPlaylist(playlists[0].id);
      return;
    }
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }

  $('#nextBtn').addEventListener('click', nextTrack);
  $('#prevBtn').addEventListener('click', prevTrack);

  function nextTrack(auto = false) {
    if (!state.queue.length) return;
    if (state.repeat === 'one' && auto) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
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

  // Shuffle / repeat
  const shuffleBtn = $('#shuffleBtn');
  const repeatBtn = $('#repeatBtn');
  function applyShuffleUI() { shuffleBtn.classList.toggle('active', state.shuffle); }
  function applyRepeatUI() {
    repeatBtn.classList.toggle('active', state.repeat !== 'off');
    repeatBtn.setAttribute('aria-label', `Repeat: ${state.repeat}`);
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

  // Audio events
  audio.addEventListener('play', showPauseIcon);
  audio.addEventListener('pause', showPlayIcon);
  audio.addEventListener('ended', () => nextTrack(true));
  audio.addEventListener('loadedmetadata', () => {
    $('#durTime').textContent = fmtTime(audio.duration);
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

  // Progress click + drag
  function setProgress(pct) {
    $('#progressBar').style.setProperty('--fill', `${pct}%`);
  }
  setupBarInteraction($('#progress'), pct => {
    if (!isFinite(audio.duration)) return;
    audio.currentTime = (pct / 100) * audio.duration;
    setProgress(pct);
  });

  // Volume
  function setVolumeUI(v) {
    $('#volumeBar').style.setProperty('--fill', `${v * 100}%`);
  }
  function applyVolume() {
    audio.volume = state.muted ? 0 : state.volume;
    setVolumeUI(state.muted ? 0 : state.volume);
    volIcon.classList.toggle('hidden', state.muted || state.volume === 0);
    muteIcon.classList.toggle('hidden', !(state.muted || state.volume === 0));
  }
  setupBarInteraction($('#volume'), pct => {
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

  function setupBarInteraction(el, onPct) {
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

  // Like button
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
    const t = trackById(state.lastTrackId);
    const btn = $('#likeBtn');
    if (!t) { btn.classList.remove('liked'); return; }
    btn.classList.toggle('liked', isLiked(t.id));
  }
  $('#likeBtn').addEventListener('click', () => {
    if (state.lastTrackId) toggleLike(state.lastTrackId);
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (e.target.matches('input,textarea')) return;
    if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
    if (e.code === 'ArrowRight' && e.shiftKey) { nextTrack(); }
    if (e.code === 'ArrowLeft' && e.shiftKey) { prevTrack(); }
  });

  // -------- Init --------
  renderSidebarPlaylists();
  applyShuffleUI();
  applyRepeatUI();
  applyVolume();
  if (state.lastTrackId) {
    const t = trackById(state.lastTrackId);
    if (t) {
      // Preload without autoplay
      state.queue = state.queue && state.queue.length ? state.queue : [t.id];
      state.queueIndex = Math.max(0, state.queue.indexOf(t.id));
      audio.src = t.url;
      $('#playerCover').style.cssText = coverStyle(t.cover);
      $('#playerTitle').textContent = t.title;
      $('#playerArtist').textContent = t.artist;
      $('#durTime').textContent = fmtTime(t.duration);
      updateLikeButton();
    }
  }
  navigate('home');
})();
