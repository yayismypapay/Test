/* Sonary — minimal modern music player */
(() => {
  'use strict';

  // ===== Data =====
  // SoundHelix provides free, publicly-hosted audio samples used widely for player demos
  const AUDIO = (n) => `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${n}.mp3`;

  const PALETTES = [
    ['#1ed760', '#0b6b32'],
    ['#3b82f6', '#1e3a8a'],
    ['#f43f5e', '#7f1d1d'],
    ['#a855f7', '#4c1d95'],
    ['#f59e0b', '#7c2d12'],
    ['#06b6d4', '#0e7490'],
    ['#ec4899', '#831843'],
    ['#10b981', '#064e3b'],
    ['#6366f1', '#1e1b4b'],
    ['#eab308', '#713f12'],
    ['#84cc16', '#365314'],
    ['#22d3ee', '#155e75'],
  ];

  const TRACKS = [
    { id: 't1', title: 'Northern Lights', artist: 'Aurora Skyline', album: 'Polar', duration: 372, src: AUDIO(1), palette: 0 },
    { id: 't2', title: 'Silent Echoes', artist: 'Vela Moon', album: 'Reflections', duration: 422, src: AUDIO(2), palette: 1 },
    { id: 't3', title: 'Velvet Drift', artist: 'Cascade', album: 'Midnight Bloom', duration: 410, src: AUDIO(3), palette: 2 },
    { id: 't4', title: 'Paper Planes', artist: 'Hollow Sun', album: 'Levitate', duration: 297, src: AUDIO(4), palette: 3 },
    { id: 't5', title: 'Gravity Falls', artist: 'Nova Pulse', album: 'Orbit', duration: 354, src: AUDIO(5), palette: 4 },
    { id: 't6', title: 'Glass Garden', artist: 'Atlas Echo', album: 'Bloom', duration: 358, src: AUDIO(6), palette: 5 },
    { id: 't7', title: 'Late August', artist: 'Sienna Bay', album: 'Tides', duration: 326, src: AUDIO(7), palette: 6 },
    { id: 't8', title: 'Quiet City', artist: 'Hollow Sun', album: 'Levitate', duration: 220, src: AUDIO(8), palette: 7 },
    { id: 't9', title: 'Ocean Lines', artist: 'Vela Moon', album: 'Reflections', duration: 308, src: AUDIO(9), palette: 8 },
    { id: 't10', title: 'Wandering Hours', artist: 'Cascade', album: 'Midnight Bloom', duration: 286, src: AUDIO(10), palette: 9 },
    { id: 't11', title: 'Soft Static', artist: 'Aurora Skyline', album: 'Polar', duration: 384, src: AUDIO(11), palette: 10 },
    { id: 't12', title: 'Marble Sky', artist: 'Atlas Echo', album: 'Bloom', duration: 263, src: AUDIO(12), palette: 11 },
    { id: 't13', title: 'Lantern', artist: 'Nova Pulse', album: 'Orbit', duration: 318, src: AUDIO(13), palette: 0 },
    { id: 't14', title: 'Foreign Tides', artist: 'Sienna Bay', album: 'Tides', duration: 295, src: AUDIO(14), palette: 1 },
    { id: 't15', title: 'Slow Burn', artist: 'Hollow Sun', album: 'Levitate', duration: 271, src: AUDIO(15), palette: 2 },
    { id: 't16', title: 'Open Skies', artist: 'Vela Moon', album: 'Reflections', duration: 339, src: AUDIO(16), palette: 3 },
  ];

  const PLAYLISTS = [
    { id: 'pl1', name: 'Daily Mix 1', desc: 'A handpicked rotation of mellow electronic favorites — refreshed daily.', tracks: ['t1','t6','t11','t3','t9','t12'], palette: 0 },
    { id: 'pl2', name: 'Late Night Drive', desc: 'Smooth atmospheric tracks for empty highways and city lights.', tracks: ['t2','t5','t7','t14','t16'], palette: 1 },
    { id: 'pl3', name: 'Focus Flow', desc: 'Quiet, steady soundscapes to keep you in the zone.', tracks: ['t8','t11','t6','t1','t12'], palette: 5 },
    { id: 'pl4', name: 'Morning Coffee', desc: 'Warm, gentle starts. Press play before the kettle.', tracks: ['t10','t4','t7','t13'], palette: 6 },
    { id: 'pl5', name: 'Indie Pulse', desc: 'New voices, sharp hooks, and the sound of right now.', tracks: ['t3','t9','t15','t16','t2'], palette: 2 },
    { id: 'pl6', name: 'Deep House Sessions', desc: 'Long-form grooves for after hours.', tracks: ['t5','t6','t12','t1','t11'], palette: 4 },
    { id: 'pl7', name: 'Acoustic Hours', desc: 'Stripped down and close to the microphone.', tracks: ['t4','t10','t7','t14'], palette: 3 },
    { id: 'pl8', name: 'Discover Weekly', desc: 'Your weekly mixtape of new music tailored to your taste.', tracks: ['t13','t9','t15','t8','t2','t16'], palette: 7 },
  ];

  // ===== State =====
  const state = {
    currentTrackId: null,
    queue: [],
    queueIndex: 0,
    isPlaying: false,
    volume: 0.7,
    muted: false,
    shuffle: false,
    repeat: 'off', // off | all | one
    liked: new Set(JSON.parse(localStorage.getItem('sonary:liked') || '[]')),
    recent: JSON.parse(localStorage.getItem('sonary:recent') || '[]'),
    route: 'home',
    routeParams: null,
    history: [],
    historyIndex: -1,
  };

  const stored = JSON.parse(localStorage.getItem('sonary:settings') || '{}');
  if (typeof stored.volume === 'number') state.volume = stored.volume;
  if (typeof stored.muted === 'boolean') state.muted = stored.muted;
  if (typeof stored.shuffle === 'boolean') state.shuffle = stored.shuffle;
  if (typeof stored.repeat === 'string') state.repeat = stored.repeat;

  const saveSettings = () => {
    localStorage.setItem('sonary:settings', JSON.stringify({
      volume: state.volume, muted: state.muted, shuffle: state.shuffle, repeat: state.repeat,
    }));
  };
  const saveLiked = () => localStorage.setItem('sonary:liked', JSON.stringify([...state.liked]));
  const saveRecent = () => localStorage.setItem('sonary:recent', JSON.stringify(state.recent.slice(0, 20)));

  // ===== Helpers =====
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const fmtTime = (s) => {
    if (!isFinite(s) || s < 0) s = 0;
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const trackById = (id) => TRACKS.find(t => t.id === id);
  const playlistById = (id) => PLAYLISTS.find(p => p.id === id);
  const initials = (s) => s.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

  const coverStyle = (paletteIndex) => {
    const [c1, c2] = PALETTES[paletteIndex % PALETTES.length];
    return `style="--c1:${c1};--c2:${c2}"`;
  };
  const coverGradient = (paletteIndex) => {
    const [c1, c2] = PALETTES[paletteIndex % PALETTES.length];
    return `linear-gradient(135deg, ${c1}, ${c2})`;
  };

  const coverEl = (title, paletteIndex, sizeClass = '') => `
    <div class="cover-sq ${sizeClass}" ${coverStyle(paletteIndex)}>
      <span class="cover-letter">${initials(title)}</span>
    </div>`;

  // ===== Audio =====
  const audio = $('#audio');
  audio.volume = state.muted ? 0 : state.volume;

  function loadTrack(trackId, autoplay = false) {
    const t = trackById(trackId);
    if (!t) return;
    state.currentTrackId = trackId;
    audio.src = t.src;
    updatePlayerUI();
    updateLikeBtn();
    markPlayingRow();
    // Push to recent
    state.recent = [trackId, ...state.recent.filter(id => id !== trackId)].slice(0, 20);
    saveRecent();
    if (autoplay) play();
  }

  function play() {
    if (!state.currentTrackId && state.queue.length) {
      loadTrack(state.queue[state.queueIndex], false);
    }
    if (!state.currentTrackId) return;
    audio.play().then(() => {
      state.isPlaying = true;
      updatePlayPauseUI();
      markPlayingRow();
    }).catch(() => {
      state.isPlaying = false;
      updatePlayPauseUI();
    });
  }

  function pause() {
    audio.pause();
    state.isPlaying = false;
    updatePlayPauseUI();
    markPlayingRow();
  }

  function togglePlay() {
    if (state.isPlaying) pause(); else play();
  }

  function setQueue(trackIds, startId = null) {
    state.queue = [...trackIds];
    state.queueIndex = startId ? Math.max(0, state.queue.indexOf(startId)) : 0;
  }

  function playFromQueue(trackIds, startId) {
    setQueue(trackIds, startId);
    loadTrack(state.queue[state.queueIndex], true);
  }

  function nextTrack(auto = false) {
    if (!state.queue.length) return;
    if (state.repeat === 'one' && auto) {
      audio.currentTime = 0;
      play();
      return;
    }
    if (state.shuffle) {
      let i;
      do { i = Math.floor(Math.random() * state.queue.length); } while (state.queue.length > 1 && i === state.queueIndex);
      state.queueIndex = i;
    } else {
      state.queueIndex++;
      if (state.queueIndex >= state.queue.length) {
        if (state.repeat === 'all') {
          state.queueIndex = 0;
        } else {
          state.queueIndex = state.queue.length - 1;
          if (auto) { pause(); audio.currentTime = 0; updateProgress(); return; }
        }
      }
    }
    loadTrack(state.queue[state.queueIndex], true);
  }

  function prevTrack() {
    if (!state.queue.length) return;
    if (audio.currentTime > 3) { audio.currentTime = 0; return; }
    state.queueIndex--;
    if (state.queueIndex < 0) state.queueIndex = state.queue.length - 1;
    loadTrack(state.queue[state.queueIndex], true);
  }

  // ===== Player UI =====
  const playerCover = $('#playerCover');
  const playerTitle = $('#playerTitle');
  const playerArtist = $('#playerArtist');
  const playIcon = $('#playIcon');
  const pauseIcon = $('#pauseIcon');
  const progressFill = $('#progressFill');
  const progressHandle = $('#progressHandle');
  const currentTimeEl = $('#currentTime');
  const totalTimeEl = $('#totalTime');
  const volumeFill = $('#volumeFill');
  const volumeHandle = $('#volumeHandle');
  const likeBtn = $('#likeBtn');
  const shuffleBtn = $('#shuffleBtn');
  const repeatBtn = $('#repeatBtn');

  function updatePlayerUI() {
    const t = trackById(state.currentTrackId);
    if (!t) {
      playerCover.style.background = '#1f1f1f';
      playerTitle.textContent = 'Choose a song to start listening';
      playerArtist.textContent = '—';
      return;
    }
    playerCover.style.background = coverGradient(t.palette);
    playerTitle.textContent = t.title;
    playerArtist.textContent = t.artist;
  }

  function updatePlayPauseUI() {
    if (state.isPlaying) {
      playIcon.hidden = true;
      pauseIcon.hidden = false;
    } else {
      playIcon.hidden = false;
      pauseIcon.hidden = true;
    }
  }

  function updateLikeBtn() {
    if (state.currentTrackId && state.liked.has(state.currentTrackId)) {
      likeBtn.classList.add('liked');
      likeBtn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" fill="currentColor"/></svg>`;
    } else {
      likeBtn.classList.remove('liked');
      likeBtn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>`;
    }
  }

  function updateProgress() {
    const cur = audio.currentTime || 0;
    const total = audio.duration || (trackById(state.currentTrackId)?.duration ?? 0);
    const pct = total ? (cur / total) * 100 : 0;
    progressFill.style.width = pct + '%';
    progressHandle.style.left = pct + '%';
    currentTimeEl.textContent = fmtTime(cur);
    totalTimeEl.textContent = fmtTime(total);
  }

  function updateVolumeUI() {
    const v = state.muted ? 0 : state.volume;
    volumeFill.style.width = (v * 100) + '%';
    volumeHandle.style.left = (v * 100) + '%';
  }

  function updateToggleButtonsUI() {
    shuffleBtn.classList.toggle('active', state.shuffle);
    repeatBtn.classList.toggle('active', state.repeat !== 'off');
  }

  function markPlayingRow() {
    $$('.track-row').forEach(row => {
      const id = row.getAttribute('data-track');
      const isCur = id === state.currentTrackId;
      row.classList.toggle('playing', isCur);
      const numEl = row.querySelector('.tr-num');
      if (numEl) {
        const idx = numEl.getAttribute('data-idx');
        if (isCur && state.isPlaying) {
          numEl.innerHTML = `<span class="eq" aria-label="Playing"><span></span><span></span><span></span></span>`;
        } else {
          numEl.innerHTML = `<span class="num">${idx}</span><svg class="play-mini" viewBox="0 0 24 24" width="14" height="14"><path d="M7 5l12 7-12 7z" fill="currentColor"/></svg>`;
        }
      }
    });
  }

  // ===== Routing & views =====
  const view = $('#view');
  const topbarSearch = $('#topbarSearch');
  const searchInput = $('#searchInput');

  function navigate(route, params = null, push = true) {
    state.route = route;
    state.routeParams = params;
    if (push) {
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push({ route, params });
      state.historyIndex = state.history.length - 1;
    }

    // Active nav
    $$('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.route === route));
    $$('.m-nav-item').forEach(b => b.classList.toggle('active', b.dataset.route === route));

    topbarSearch.hidden = route !== 'search';

    view.scrollTop = 0;
    if (route === 'home') renderHome();
    else if (route === 'search') renderSearch();
    else if (route === 'library') renderLibrary();
    else if (route === 'playlists') renderPlaylists();
    else if (route === 'liked') renderLiked();
    else if (route === 'playlist') renderPlaylist(params);
  }

  // --- Home ---
  function renderHome() {
    const hour = new Date().getHours();
    const greet = hour < 5 ? 'Good night' : hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    const recentTracks = state.recent.map(trackById).filter(Boolean).slice(0, 6);
    const quickPicks = (recentTracks.length ? recentTracks : TRACKS.slice(0, 6));

    const recentSection = recentTracks.length ? `
      <div class="section-head">
        <h2 class="section-title">Recently played</h2>
      </div>
      <div class="cards">
        ${recentTracks.map(t => `
          <div class="card" data-action="play-track" data-id="${t.id}">
            ${coverEl(t.title, t.palette)}
            <div class="card-title">${t.title}</div>
            <div class="card-sub">${t.artist}</div>
            <button class="card-play" aria-label="Play"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M7 5l12 7-12 7z" fill="currentColor"/></svg></button>
          </div>
        `).join('')}
      </div>` : '';

    view.innerHTML = `
      <div class="hero">
        <h1>${greet}</h1>
        <p>Pick up where you left off, or start something new.</p>
      </div>

      <div class="quick-grid">
        ${quickPicks.map(t => `
          <div class="quick-card" data-action="play-track" data-id="${t.id}">
            ${coverEl(t.title, t.palette)}
            <div class="qc-title">${t.title}</div>
            <button class="qc-play" aria-label="Play"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M7 5l12 7-12 7z" fill="currentColor"/></svg></button>
          </div>
        `).join('')}
      </div>

      ${recentSection}

      <div class="section-head">
        <h2 class="section-title">Popular playlists</h2>
      </div>
      <div class="cards">
        ${PLAYLISTS.slice(0, 6).map(p => `
          <div class="card" data-action="open-playlist" data-id="${p.id}">
            ${coverEl(p.name, p.palette)}
            <div class="card-title">${p.name}</div>
            <div class="card-sub">${p.desc}</div>
            <button class="card-play" data-action="play-playlist" data-id="${p.id}" aria-label="Play"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M7 5l12 7-12 7z" fill="currentColor"/></svg></button>
          </div>
        `).join('')}
      </div>

      <div class="section-head">
        <h2 class="section-title">Recommended for you</h2>
      </div>
      <div class="cards">
        ${TRACKS.slice(6, 14).map(t => `
          <div class="card" data-action="play-track" data-id="${t.id}">
            ${coverEl(t.title, t.palette)}
            <div class="card-title">${t.title}</div>
            <div class="card-sub">${t.artist} · ${t.album}</div>
            <button class="card-play" aria-label="Play"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M7 5l12 7-12 7z" fill="currentColor"/></svg></button>
          </div>
        `).join('')}
      </div>
    `;
  }

  // --- Search ---
  function renderSearch(q = '') {
    if (!q) {
      view.innerHTML = `
        <div class="search-empty fade-in">
          <div class="big">Find your next favorite</div>
          <p>Search by track, artist, or playlist.</p>
          <div class="chips">
            ${['Aurora Skyline','Vela Moon','Cascade','Focus Flow','Late Night Drive','Indie Pulse'].map(c => `<button class="chip" data-action="search-chip">${c}</button>`).join('')}
          </div>
        </div>
      `;
      setTimeout(() => searchInput.focus(), 50);
      return;
    }

    const ql = q.toLowerCase();
    const matchedTracks = TRACKS.filter(t =>
      t.title.toLowerCase().includes(ql) ||
      t.artist.toLowerCase().includes(ql) ||
      t.album.toLowerCase().includes(ql));
    const matchedPlaylists = PLAYLISTS.filter(p =>
      p.name.toLowerCase().includes(ql) || p.desc.toLowerCase().includes(ql));
    const artists = [...new Set(TRACKS.map(t => t.artist))].filter(a => a.toLowerCase().includes(ql));

    const top = matchedTracks[0] || (matchedPlaylists[0] ? null : null);

    view.innerHTML = `
      <div class="fade-in">
        ${matchedTracks.length || matchedPlaylists.length || artists.length ? '' : `<div class="search-empty"><div class="big">No results for "${q}"</div><p>Please try a different keyword.</p></div>`}

        ${top ? `
        <div class="results-top">
          <div>
            <h2 class="section-title">Top result</h2>
            <div class="top-result" data-action="play-track" data-id="${top.id}">
              ${coverEl(top.title, top.palette)}
              <div class="tr-title">${top.title}</div>
              <div class="tr-artist">${top.artist}</div>
              <span class="tag">Song</span>
            </div>
          </div>
          <div>
            <h2 class="section-title">Songs</h2>
            <div class="track-list">
              ${matchedTracks.slice(0, 4).map((t, i) => trackRowHTML(t, i + 1)).join('')}
            </div>
          </div>
        </div>` : ''}

        ${artists.length ? `
          <div class="section-head"><h2 class="section-title">Artists</h2></div>
          <div class="cards">
            ${artists.slice(0, 6).map(a => {
              const sample = TRACKS.find(t => t.artist === a);
              return `<div class="card">
                ${coverEl(a, sample.palette)}
                <div class="card-title">${a}</div>
                <div class="card-sub">Artist</div>
              </div>`;
            }).join('')}
          </div>` : ''}

        ${matchedPlaylists.length ? `
          <div class="section-head"><h2 class="section-title">Playlists</h2></div>
          <div class="cards">
            ${matchedPlaylists.map(p => `
              <div class="card" data-action="open-playlist" data-id="${p.id}">
                ${coverEl(p.name, p.palette)}
                <div class="card-title">${p.name}</div>
                <div class="card-sub">${p.desc}</div>
                <button class="card-play" data-action="play-playlist" data-id="${p.id}" aria-label="Play"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M7 5l12 7-12 7z" fill="currentColor"/></svg></button>
              </div>`).join('')}
          </div>` : ''}
      </div>
    `;
    markPlayingRow();
  }

  // --- Library ---
  let libTab = 'playlists';
  function renderLibrary() {
    view.innerHTML = `
      <div class="hero"><h1>Your Library</h1></div>
      <div class="lib-tabs">
        <button class="lib-tab ${libTab==='playlists'?'active':''}" data-libtab="playlists">Playlists</button>
        <button class="lib-tab ${libTab==='liked'?'active':''}" data-libtab="liked">Liked Songs</button>
        <button class="lib-tab ${libTab==='recent'?'active':''}" data-libtab="recent">Recently added</button>
      </div>
      <div id="libBody"></div>
    `;
    renderLibBody();
  }

  function renderLibBody() {
    const body = $('#libBody');
    if (libTab === 'playlists') {
      body.innerHTML = `
        <div class="cards">
          ${PLAYLISTS.map(p => `
            <div class="card" data-action="open-playlist" data-id="${p.id}">
              ${coverEl(p.name, p.palette)}
              <div class="card-title">${p.name}</div>
              <div class="card-sub">${p.tracks.length} songs</div>
              <button class="card-play" data-action="play-playlist" data-id="${p.id}" aria-label="Play"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M7 5l12 7-12 7z" fill="currentColor"/></svg></button>
            </div>`).join('')}
        </div>`;
    } else if (libTab === 'liked') {
      renderLiked(body);
    } else {
      const recent = state.recent.map(trackById).filter(Boolean);
      if (!recent.length) {
        body.innerHTML = `<div class="search-empty"><div class="big">Nothing here yet</div><p>Play a track to see it appear in your recently added.</p></div>`;
      } else {
        body.innerHTML = `
          <div class="track-table">
            <span>#</span><span>Title</span><span class="th-album">Album</span><span class="th-dur">Duration</span>
          </div>
          ${recent.map((t, i) => trackRowHTML(t, i + 1)).join('')}
        `;
      }
    }
    markPlayingRow();
  }

  function renderPlaylists() {
    view.innerHTML = `
      <div class="hero"><h1>Playlists</h1><p>Curated mixes you can put on at any time.</p></div>
      <div class="cards">
        ${PLAYLISTS.map(p => `
          <div class="card" data-action="open-playlist" data-id="${p.id}">
            ${coverEl(p.name, p.palette)}
            <div class="card-title">${p.name}</div>
            <div class="card-sub">${p.desc}</div>
            <button class="card-play" data-action="play-playlist" data-id="${p.id}" aria-label="Play"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M7 5l12 7-12 7z" fill="currentColor"/></svg></button>
          </div>`).join('')}
      </div>
    `;
  }

  function renderLiked(target) {
    const likedTracks = [...state.liked].map(trackById).filter(Boolean);
    const container = target || view;
    const grad = PALETTES[0];

    if (!target) {
      // Full liked page with hero
      container.innerHTML = `
        <div class="pl-header" style="--pl-grad:${grad[0]}">
          <div class="pl-cover" style="background: linear-gradient(135deg,#22e57e,#064e3b); display:flex;align-items:center;justify-content:center;">
            <svg viewBox="0 0 24 24" width="80" height="80"><path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" fill="#fff"/></svg>
          </div>
          <div class="pl-info">
            <div class="pl-kind">Playlist</div>
            <h1 class="pl-name">Liked Songs</h1>
            <p class="pl-desc">Songs you've added to your favorites.</p>
            <div class="pl-meta"><strong>You</strong> · ${likedTracks.length} song${likedTracks.length===1?'':'s'}</div>
          </div>
        </div>
        ${likedTracks.length ? `
          <div class="pl-actions">
            <button class="btn-play-big" data-action="play-liked" aria-label="Play"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M7 5l12 7-12 7z" fill="currentColor"/></svg></button>
          </div>
          <div class="track-table">
            <span>#</span><span>Title</span><span class="th-album">Album</span><span class="th-dur">Duration</span>
          </div>
          ${likedTracks.map((t, i) => trackRowHTML(t, i + 1)).join('')}
        ` : `<div class="search-empty"><div class="big">Songs you like will appear here</div><p>Tap the heart on any track to save it.</p></div>`}
      `;
    } else {
      // Embedded in library
      if (!likedTracks.length) {
        container.innerHTML = `<div class="search-empty"><div class="big">No liked songs yet</div><p>Tap the heart on any track to save it here.</p></div>`;
      } else {
        container.innerHTML = `
          <div class="track-table">
            <span>#</span><span>Title</span><span class="th-album">Album</span><span class="th-dur">Duration</span>
          </div>
          ${likedTracks.map((t, i) => trackRowHTML(t, i + 1)).join('')}
        `;
      }
    }
    markPlayingRow();
  }

  function renderPlaylist(id) {
    const p = playlistById(id);
    if (!p) { navigate('home'); return; }
    const tracks = p.tracks.map(trackById).filter(Boolean);
    const total = tracks.reduce((a, t) => a + t.duration, 0);
    const totMin = Math.round(total / 60);
    const [c1] = PALETTES[p.palette];

    view.innerHTML = `
      <div class="pl-header" style="--pl-grad:${c1}">
        ${coverEl(p.name, p.palette).replace('cover-sq', 'cover-sq pl-cover')}
        <div class="pl-info">
          <div class="pl-kind">Playlist</div>
          <h1 class="pl-name">${p.name}</h1>
          <p class="pl-desc">${p.desc}</p>
          <div class="pl-meta"><strong>Sonary</strong> · ${tracks.length} songs, about ${totMin} min</div>
        </div>
      </div>
      <div class="pl-actions">
        <button class="btn-play-big" data-action="play-playlist" data-id="${p.id}" aria-label="Play"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M7 5l12 7-12 7z" fill="currentColor"/></svg></button>
        <button class="icon-btn-lg" aria-label="Shuffle" data-action="shuffle-toggle"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M16 3h5v5M21 3l-7 7M16 21h5v-5M21 21l-7-7M3 7l5 5-5 5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      </div>
      <div class="track-table">
        <span>#</span><span>Title</span><span class="th-album">Album</span><span class="th-dur">Duration</span>
      </div>
      ${tracks.map((t, i) => trackRowHTML(t, i + 1, p.id)).join('')}
    `;
    markPlayingRow();
  }

  function trackRowHTML(t, idx, playlistId = null) {
    const liked = state.liked.has(t.id);
    return `
      <div class="track-row" data-track="${t.id}" ${playlistId ? `data-playlist="${playlistId}"` : ''}>
        <div class="tr-num" data-idx="${idx}">
          <span class="num">${idx}</span>
          <svg class="play-mini" viewBox="0 0 24 24" width="14" height="14"><path d="M7 5l12 7-12 7z" fill="currentColor"/></svg>
        </div>
        <div class="tr-main">
          ${coverEl(t.title, t.palette, 'tr-cover')}
          <div class="tr-text">
            <div class="tr-title">${t.title}</div>
            <div class="tr-artist">${t.artist}</div>
          </div>
        </div>
        <div class="tr-album">${t.album}</div>
        <div class="tr-dur">
          <button class="tr-like ${liked?'liked':''}" data-action="like" data-id="${t.id}" aria-label="Like">
            ${liked
              ? `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" fill="currentColor"/></svg>`
              : `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>`
            }
          </button>
          ${fmtTime(t.duration)}
        </div>
      </div>`;
  }

  // ===== Sidebar playlists =====
  function renderSidebarPlaylists() {
    const el = $('#sidebarPlaylists');
    el.innerHTML = PLAYLISTS.map(p => `
      <div class="side-playlist" data-action="open-playlist" data-id="${p.id}">
        <div class="mini-cover" style="background:${coverGradient(p.palette)}"></div>
        <div class="mini-meta">
          <div class="mini-title">${p.name}</div>
          <div class="mini-sub">Playlist · Sonary</div>
        </div>
      </div>`).join('');
  }

  // ===== Event handling =====
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-action]');
    if (target) {
      const action = target.dataset.action;
      const id = target.dataset.id;
      e.stopPropagation();

      if (action === 'play-track') {
        // Play in context of current view if possible
        const inPlaylistRow = target.closest('[data-playlist]');
        const playlistId = inPlaylistRow?.dataset.playlist;
        if (playlistId) {
          const p = playlistById(playlistId);
          playFromQueue(p.tracks, id);
        } else {
          playFromQueue([id], id);
        }
      } else if (action === 'play-playlist') {
        const p = playlistById(id);
        if (p && p.tracks.length) playFromQueue(p.tracks, p.tracks[0]);
      } else if (action === 'play-liked') {
        const ids = [...state.liked];
        if (ids.length) playFromQueue(ids, ids[0]);
      } else if (action === 'open-playlist') {
        navigate('playlist', id);
      } else if (action === 'like') {
        toggleLike(id);
        // Update row icon inline without re-render
        const btn = target;
        const nowLiked = state.liked.has(id);
        btn.classList.toggle('liked', nowLiked);
        btn.innerHTML = nowLiked
          ? `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" fill="currentColor"/></svg>`
          : `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>`;
        if (id === state.currentTrackId) updateLikeBtn();
      } else if (action === 'search-chip') {
        searchInput.value = target.textContent;
        renderSearch(target.textContent);
      } else if (action === 'shuffle-toggle') {
        toggleShuffle();
      }
      return;
    }

    // Track row click (not the like button)
    const row = e.target.closest('.track-row');
    if (row) {
      const id = row.dataset.track;
      if (!e.target.closest('.tr-like')) {
        const playlistId = row.dataset.playlist;
        if (playlistId) {
          const p = playlistById(playlistId);
          playFromQueue(p.tracks, id);
        } else {
          // Use current displayed list as queue
          const ids = $$('.track-row').map(r => r.dataset.track);
          playFromQueue(ids.length ? ids : [id], id);
        }
      }
    }

    // Library tabs
    const libTabBtn = e.target.closest('.lib-tab');
    if (libTabBtn) {
      libTab = libTabBtn.dataset.libtab;
      $$('.lib-tab').forEach(t => t.classList.toggle('active', t === libTabBtn));
      renderLibBody();
    }
  });

  // Nav buttons
  $$('.nav-item, .m-nav-item').forEach(b => {
    b.addEventListener('click', () => navigate(b.dataset.route));
  });

  // Like current track
  likeBtn.addEventListener('click', () => {
    if (!state.currentTrackId) return;
    toggleLike(state.currentTrackId);
    updateLikeBtn();
    // Reflect in any open row
    const row = document.querySelector(`.track-row[data-track="${state.currentTrackId}"] .tr-like`);
    if (row) {
      const nowLiked = state.liked.has(state.currentTrackId);
      row.classList.toggle('liked', nowLiked);
      row.innerHTML = nowLiked
        ? `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" fill="currentColor"/></svg>`
        : `<svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>`;
    }
  });

  function toggleLike(id) {
    if (state.liked.has(id)) state.liked.delete(id); else state.liked.add(id);
    saveLiked();
  }

  // Transport
  $('#playBtn').addEventListener('click', togglePlay);
  $('#nextBtn').addEventListener('click', () => nextTrack(false));
  $('#prevBtn').addEventListener('click', prevTrack);

  shuffleBtn.addEventListener('click', toggleShuffle);
  function toggleShuffle() {
    state.shuffle = !state.shuffle;
    saveSettings();
    updateToggleButtonsUI();
  }

  repeatBtn.addEventListener('click', () => {
    state.repeat = state.repeat === 'off' ? 'all' : state.repeat === 'all' ? 'one' : 'off';
    saveSettings();
    updateToggleButtonsUI();
  });

  // Progress bar drag/click
  const progress = $('#progress');
  let dragging = false;
  function seekFromEvent(e) {
    const rect = progress.querySelector('.progress-bar').getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    if (audio.duration) audio.currentTime = pct * audio.duration;
    progressFill.style.width = (pct * 100) + '%';
    progressHandle.style.left = (pct * 100) + '%';
  }
  progress.addEventListener('mousedown', (e) => { dragging = true; seekFromEvent(e); });
  document.addEventListener('mousemove', (e) => { if (dragging) seekFromEvent(e); });
  document.addEventListener('mouseup', () => { dragging = false; });
  progress.addEventListener('touchstart', (e) => { dragging = true; seekFromEvent(e); }, { passive: true });
  document.addEventListener('touchmove', (e) => { if (dragging) seekFromEvent(e); }, { passive: true });
  document.addEventListener('touchend', () => { dragging = false; });

  // Volume
  const volume = $('#volume');
  let vDrag = false;
  function setVolFromEvent(e) {
    const rect = volume.querySelector('.volume-bar').getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    state.volume = pct;
    state.muted = pct === 0;
    audio.volume = state.volume;
    saveSettings();
    updateVolumeUI();
  }
  volume.addEventListener('mousedown', (e) => { vDrag = true; setVolFromEvent(e); });
  document.addEventListener('mousemove', (e) => { if (vDrag) setVolFromEvent(e); });
  document.addEventListener('mouseup', () => { vDrag = false; });

  $('#muteBtn').addEventListener('click', () => {
    state.muted = !state.muted;
    audio.volume = state.muted ? 0 : state.volume;
    saveSettings();
    updateVolumeUI();
  });

  // Audio events
  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('loadedmetadata', updateProgress);
  audio.addEventListener('ended', () => nextTrack(true));
  audio.addEventListener('play', () => { state.isPlaying = true; updatePlayPauseUI(); markPlayingRow(); });
  audio.addEventListener('pause', () => { state.isPlaying = false; updatePlayPauseUI(); markPlayingRow(); });

  // Search input
  let searchTimer;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => renderSearch(searchInput.value.trim()), 120);
  });

  // Top bar back/forward
  $('#backBtn').addEventListener('click', () => {
    if (state.historyIndex > 0) {
      state.historyIndex--;
      const h = state.history[state.historyIndex];
      navigate(h.route, h.params, false);
    }
  });
  $('#fwdBtn').addEventListener('click', () => {
    if (state.historyIndex < state.history.length - 1) {
      state.historyIndex++;
      const h = state.history[state.historyIndex];
      navigate(h.route, h.params, false);
    }
  });

  // Scroll shadow on topbar
  view.addEventListener('scroll', () => {
    $('.topbar').classList.toggle('scrolled', view.scrollTop > 8);
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea')) return;
    if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
    else if (e.code === 'ArrowRight' && e.shiftKey) nextTrack(false);
    else if (e.code === 'ArrowLeft' && e.shiftKey) prevTrack();
    else if (e.code === 'ArrowRight') { audio.currentTime = Math.min((audio.duration||0), audio.currentTime + 5); }
    else if (e.code === 'ArrowLeft') { audio.currentTime = Math.max(0, audio.currentTime - 5); }
    else if (e.key === 'm' || e.key === 'M') { $('#muteBtn').click(); }
  });

  // ===== Init =====
  renderSidebarPlaylists();
  updatePlayerUI();
  updatePlayPauseUI();
  updateVolumeUI();
  updateToggleButtonsUI();
  updateLikeBtn();
  navigate('home');
})();
