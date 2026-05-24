// ==================== STATE MANAGEMENT ====================
const state = {
  lang: localStorage.getItem("cineplay_lang") || "ru",
  activeCategory: "all",
  activeGenre: "all",
  activeYearRange: "all",
  searchQuery: "",
  sortBy: "rating", // 'rating', 'year', 'alphabetical'
  watchlist: JSON.parse(localStorage.getItem("cineplay_watchlist")) || [],
  customReviews: JSON.parse(localStorage.getItem("cineplay_reviews")) || {}, // { itemId: [ { author, rating, date, text }, ... ] }
  heroIndex: 0,
  heroInterval: null,
  similarLimit: 4
};

// Featured items for the main hero carousel (Dune, Cyberpunk 2077, Porsche 911 GT3)
const featuredIds = ["m1", "g1", "c1"];

// ==================== DOM ELEMENTS ====================
const els = {
  // Navigation & Header
  appTitle: document.querySelectorAll(".logo-text, .footer-logo-text"),
  navLinks: document.querySelectorAll(".nav-links a"),
  navLinksContainer: document.querySelector(".nav-links"),
  burgerMenu: document.querySelector(".burger-menu"),
  searchInput: document.querySelector(".search-container input"),
  watchlistToggle: document.querySelector(".btn-watchlist-toggle"),
  watchlistBadge: document.querySelector(".watchlist-badge"),
  langBtnEn: document.getElementById("lang-en"),
  langBtnRu: document.getElementById("lang-ru"),
  
  // Hero Slider
  heroSlider: document.querySelector(".hero-slider"),
  heroControls: document.querySelector(".hero-controls"),
  
  // Filters
  categoryBtns: document.querySelectorAll(".category-btn"),
  genreSelect: document.getElementById("filter-genre"),
  yearSelect: document.getElementById("filter-year"),
  sortSelect: document.getElementById("sort-by"),
  itemsFoundText: document.getElementById("items-found"),
  
  // Grid
  catalogGrid: document.querySelector(".catalog-grid"),
  
  // Watchlist Drawer
  watchlistDrawer: document.querySelector(".watchlist-drawer"),
  watchlistBackdrop: document.querySelector(".watchlist-backdrop"),
  watchlistContent: document.querySelector(".watchlist-content"),
  watchlistCloseBtn: document.getElementById("watchlist-close"),
  
  // Details Modal
  modal: document.getElementById("details-modal"),
  modalCloseBtn: document.querySelector(".modal-close-btn"),
  modalHeroBg: document.querySelector(".modal-hero-bg"),
  modalPoster: document.querySelector(".modal-poster"),
  modalTitle: document.querySelector(".modal-title"),
  modalRating: document.querySelector(".modal-rating-val"),
  modalYear: document.querySelector(".modal-year-val"),
  modalCategoryBadge: document.querySelector(".modal-category-badge"),
  modalDesc: document.querySelector(".modal-desc"),
  modalSpecsTable: document.querySelector(".specs-table"),
  modalTrailerFrame: document.querySelector(".trailer-frame"),
  modalReviewsContainer: document.querySelector(".reviews-container"),
  similarItemsContainer: document.querySelector(".similar-items"),
  
  // Review Form
  reviewForm: document.getElementById("add-review-form"),
  starRatingSelect: document.querySelector(".star-rating-select"),
  
  // Footer
  footerDesc: document.querySelector(".footer-desc")
};

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", () => {
  initLanguage();
  initHeroSlider();
  initWatchlistBadge();
  populateFilterDropdowns();
  renderCatalog(true); // render with skeleton loaders initially
  setupEventListeners();
  
  // Header scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      document.querySelector("header").classList.add("scrolled");
    } else {
      document.querySelector("header").classList.remove("scrolled");
    }
  });
});

// ==================== LANGUAGE CONTROLLERS ====================
function initLanguage() {
  els.langBtnEn.classList.toggle("active", state.lang === "en");
  els.langBtnRu.classList.toggle("active", state.lang === "ru");
  
  updateGlobalTranslations();
}

function switchLanguage(newLang) {
  if (state.lang === newLang) return;
  state.lang = newLang;
  localStorage.setItem("cineplay_lang", newLang);
  
  els.langBtnEn.classList.toggle("active", newLang === "en");
  els.langBtnRu.classList.toggle("active", newLang === "ru");
  
  updateGlobalTranslations();
  populateFilterDropdowns();
  renderHeroSlides();
  renderCatalog(false);
  
  // If modal is open, re-render its active item contents
  const activeModalId = els.modal.getAttribute("data-active-id");
  if (activeModalId) {
    openItemDetails(activeModalId, false);
  }
  
  // If watchlist is open, re-render watchlist
  if (els.watchlistDrawer.classList.contains("open")) {
    renderWatchlistDrawer();
  }
}

function updateGlobalTranslations() {
  const dict = translations[state.lang];
  
  // Header Nav
  document.getElementById("nav-movies-link").textContent = dict.navMovies;
  document.getElementById("nav-games-link").textContent = dict.navGames;
  document.getElementById("nav-cars-link").textContent = dict.navCars;
  document.getElementById("nav-watchlist-link").textContent = dict.navWatchlist;
  
  // Search
  els.searchInput.placeholder = dict.searchPlaceholder;
  
  // Filter labels
  document.getElementById("label-genre-all").textContent = dict.filterGenre;
  document.getElementById("label-year-all").textContent = dict.filterYear;
  document.getElementById("sort-rating-label").textContent = dict.sortRating;
  document.getElementById("sort-year-label").textContent = dict.sortYear;
  document.getElementById("sort-alpha-label").textContent = dict.sortAlphabetical;
  
  // Modal review form
  document.getElementById("modal-section-specs").textContent = dict.specifications;
  document.getElementById("modal-section-reviews").textContent = dict.reviewsTitle;
  document.getElementById("label-review-form").textContent = dict.submitReview;
  document.getElementById("label-your-name").textContent = dict.yourName;
  document.getElementById("label-your-rating").textContent = dict.yourRating;
  document.getElementById("submit-review-btn").textContent = dict.submitReview;
  document.getElementById("review-text-area").placeholder = dict.writeReviewPlaceholder;
  document.getElementById("modal-section-similar").textContent = dict.similarTitle;
  
  // Footer
  els.footerDesc.textContent = dict.footerText;
  
  // Dynamic Watchlist title
  document.getElementById("watchlist-drawer-title").innerHTML = `<i class="fas fa-bookmark"></i> ${dict.watchlistTitle}`;
}

// ==================== HERO SLIDER CONTROLLERS ====================
function initHeroSlider() {
  renderHeroSlides();
  startHeroAutoplay();
}

function renderHeroSlides() {
  els.heroSlider.innerHTML = "";
  els.heroControls.innerHTML = "";
  
  const featuredItems = catalogData.filter(item => featuredIds.includes(item.id));
  
  featuredItems.forEach((item, idx) => {
    // Slide card
    const slide = document.createElement("div");
    slide.className = `hero-slide ${idx === state.heroIndex ? "active" : ""}`;
    
    // Category tag label
    let categoryTag = translations[state.lang].categoryMovies;
    let tagClass = "badge-primary";
    if (item.category === "games") {
      categoryTag = translations[state.lang].categoryGames;
      tagClass = "badge-pink";
    } else if (item.category === "cars") {
      categoryTag = translations[state.lang].categoryCars;
      tagClass = "badge-cyan";
    }
    
    slide.innerHTML = `
      <div class="hero-backdrop" style="background-image: url('${item.image}')"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="badge ${tagClass} hero-tag"><i class="fas fa-fire"></i> ${translations[state.lang].featuredTitle}</span>
        <h1 class="hero-title">${item.title[state.lang]}</h1>
        <div class="hero-meta">
          <div class="hero-rating"><i class="fas fa-star"></i> ${item.rating.toFixed(1)}</div>
          <span class="badge badge-primary">${categoryTag}</span>
          <span class="badge badge-cyan">${item.year}</span>
        </div>
        <p class="hero-desc">${item.shortDescription[state.lang]}</p>
        <div class="hero-buttons">
          <button class="btn btn-primary" onclick="openItemDetails('${item.id}')">
            <i class="fas fa-info-circle"></i> ${translations[state.lang].quickView}
          </button>
          <button class="btn btn-secondary" onclick="toggleWatchlist('${item.id}')">
            <i class="${state.watchlist.includes(item.id) ? "fas" : "far"} fa-bookmark"></i>
            ${translations[state.lang].addToWatchlist}
          </button>
        </div>
      </div>
    `;
    els.heroSlider.appendChild(slide);
    
    // Control dot
    const dot = document.createElement("div");
    dot.className = `hero-dot ${idx === state.heroIndex ? "active" : ""}`;
    dot.addEventListener("click", () => {
      goToHeroSlide(idx);
    });
    els.heroControls.appendChild(dot);
  });
}

function startHeroAutoplay() {
  stopHeroAutoplay();
  state.heroInterval = setInterval(() => {
    const totalSlides = featuredIds.length;
    goToHeroSlide((state.heroIndex + 1) % totalSlides);
  }, 8000);
}

function stopHeroAutoplay() {
  if (state.heroInterval) {
    clearInterval(state.heroInterval);
  }
}

function goToHeroSlide(idx) {
  state.heroIndex = idx;
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");
  
  slides.forEach((slide, sIdx) => {
    slide.classList.toggle("active", sIdx === idx);
  });
  dots.forEach((dot, dIdx) => {
    dot.classList.toggle("active", dIdx === idx);
  });
  
  // restart autoplay duration
  startHeroAutoplay();
}

// ==================== FILTERING & DROPDOWN SYSTEM ====================
function populateFilterDropdowns() {
  const currentCategory = state.activeCategory;
  
  // 1. Populate Genres
  // Extract unique genres depending on the selected category
  const filteredItems = currentCategory === "all" 
    ? catalogData 
    : catalogData.filter(i => i.category === currentCategory);
    
  const allGenres = new Set();
  filteredItems.forEach(item => {
    item.genres[state.lang].forEach(genre => allGenres.add(genre));
  });
  
  // Clear other than first "All"
  while (els.genreSelect.options.length > 1) {
    els.genreSelect.remove(1);
  }
  
  allGenres.forEach(genre => {
    const opt = document.createElement("option");
    opt.value = genre;
    opt.textContent = genre;
    opt.selected = state.activeGenre === genre;
    els.genreSelect.appendChild(opt);
  });
  
  // 2. Populate Years
  // Let's create year range slots
  // Clear other than first "All"
  while (els.yearSelect.options.length > 1) {
    els.yearSelect.remove(1);
  }
  
  const yearRanges = state.lang === "ru" 
    ? [
        { value: "2020-2026", label: "2020 - 2026" },
        { value: "2010-2019", label: "2010 - 2019" },
        { value: "2000-2009", label: "2000 - 2009" }
      ]
    : [
        { value: "2020-2026", label: "2020 - 2026" },
        { value: "2010-2019", label: "2010 - 2019" },
        { value: "2000-2009", label: "2000 - 2009" }
      ];
      
  yearRanges.forEach(range => {
    const opt = document.createElement("option");
    opt.value = range.value;
    opt.textContent = range.label;
    opt.selected = state.activeYearRange === range.value;
    els.yearSelect.appendChild(opt);
  });
}

function handleCategoryChange(category) {
  state.activeCategory = category;
  state.activeGenre = "all";
  state.activeYearRange = "all";
  
  // Set active classes
  els.categoryBtns.forEach(btn => {
    const c = btn.getAttribute("data-category");
    btn.classList.toggle("active", c === category);
  });
  
  // Set active class on navbar links (Movies, Games, Cars)
  els.navLinks.forEach(link => {
    const lCategory = link.getAttribute("data-category");
    link.classList.toggle("active", lCategory === category);
  });
  
  populateFilterDropdowns();
  
  // Trigger loading visual cue, then render
  renderCatalog(true);
}

// ==================== CATALOG RENDERING ====================
function getFilteredItems() {
  let items = [...catalogData];
  
  // 1. Filter by category
  if (state.activeCategory !== "all") {
    items = items.filter(item => item.category === state.activeCategory);
  }
  
  // 2. Filter by genre
  if (state.activeGenre !== "all") {
    items = items.filter(item => item.genres[state.lang].includes(state.activeGenre));
  }
  
  // 3. Filter by Year Range
  if (state.activeYearRange !== "all") {
    const [start, end] = state.activeYearRange.split("-").map(Number);
    items = items.filter(item => item.year >= start && item.year <= end);
  }
  
  // 4. Search Query
  if (state.searchQuery.trim() !== "") {
    const query = state.searchQuery.toLowerCase().trim();
    items = items.filter(item => {
      const titleMatch = item.title[state.lang].toLowerCase().includes(query) || item.title["en"].toLowerCase().includes(query) || item.title["ru"].toLowerCase().includes(query);
      const genreMatch = item.genres[state.lang].some(g => g.toLowerCase().includes(query));
      const descMatch = item.shortDescription[state.lang].toLowerCase().includes(query);
      const yearMatch = item.year.toString().includes(query);
      return titleMatch || genreMatch || descMatch || yearMatch;
    });
  }
  
  // 5. Sorting
  if (state.sortBy === "rating") {
    items.sort((a, b) => b.rating - a.rating);
  } else if (state.sortBy === "year") {
    items.sort((a, b) => b.year - a.year);
  } else if (state.sortBy === "alphabetical") {
    items.sort((a, b) => a.title[state.lang].localeCompare(b.title[state.lang]));
  }
  
  return items;
}

function renderCatalog(showSkeletons = false) {
  els.catalogGrid.innerHTML = "";
  
  if (showSkeletons) {
    els.catalogGrid.classList.add("loading");
    // Show 6 skeletons
    for (let i = 0; i < 6; i++) {
      const skeleton = document.createElement("div");
      skeleton.className = "skeleton-card";
      skeleton.innerHTML = `
        <div class="skeleton-media"></div>
        <div class="skeleton-info">
          <div class="skeleton-text skeleton-title"></div>
          <div class="skeleton-text skeleton-meta"></div>
        </div>
      `;
      els.catalogGrid.appendChild(skeleton);
    }
    
    setTimeout(() => {
      els.catalogGrid.classList.remove("loading");
      renderCatalogData();
    }, 450); // Small delay to appreciate premium micro-animations
  } else {
    renderCatalogData();
  }
}

function renderCatalogData() {
  els.catalogGrid.innerHTML = "";
  const items = getFilteredItems();
  
  // Update count badge
  els.itemsFoundText.innerHTML = `<span>${items.length}</span> ${translations[state.lang].itemsFound}`;
  
  if (items.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.innerHTML = `
      <i class="fas fa-search"></i>
      <h3>${state.lang === 'ru' ? 'Ничего не найдено' : 'No Items Found'}</h3>
      <p>${state.lang === 'ru' ? 'Попробуйте изменить параметры фильтрации или поисковый запрос.' : 'Try adjusting your filters or search query.'}</p>
    `;
    els.catalogGrid.appendChild(emptyState);
    return;
  }
  
  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "card glass";
    
    // Category label
    let categoryTag = translations[state.lang].categoryMovies;
    let badgeClass = "badge-primary";
    if (item.category === "games") {
      categoryTag = translations[state.lang].categoryGames;
      badgeClass = "badge-pink";
    } else if (item.category === "cars") {
      categoryTag = translations[state.lang].categoryCars;
      badgeClass = "badge-cyan";
    }
    
    const isSaved = state.watchlist.includes(item.id);
    
    card.innerHTML = `
      <div class="card-media">
        <img class="card-img" src="${item.poster}" alt="${item.title[state.lang]}" loading="lazy">
        <div class="card-overlay"></div>
        <div class="card-actions">
          <button class="card-btn ${isSaved ? "active" : ""}" onclick="event.stopPropagation(); toggleWatchlist('${item.id}')" title="${translations[state.lang].addToWatchlist}">
            <i class="${isSaved ? "fas" : "far"} fa-bookmark"></i>
          </button>
          <button class="card-btn" onclick="event.stopPropagation(); openItemDetails('${item.id}')" title="${translations[state.lang].quickView}">
            <i class="fas fa-expand-alt"></i>
          </button>
        </div>
        <div class="card-rating">
          <i class="fas fa-star"></i> ${item.rating.toFixed(1)}
        </div>
      </div>
      <div class="card-info" onclick="openItemDetails('${item.id}')">
        <div class="card-meta">
          <span class="badge ${badgeClass}">${categoryTag}</span>
          <span class="card-year">${item.year}</span>
        </div>
        <h3 class="card-title">${item.title[state.lang]}</h3>
        <div class="card-genres">
          ${item.genres[state.lang].slice(0, 3).map(g => `<span>#${g}</span>`).join(" ")}
        </div>
      </div>
    `;
    
    els.catalogGrid.appendChild(card);
  });
}

// ==================== WATCHLIST DRAWER CONTROLLERS ====================
function initWatchlistBadge() {
  const count = state.watchlist.length;
  els.watchlistBadge.textContent = count;
  els.watchlistBadge.style.display = count > 0 ? "flex" : "none";
}

function toggleWatchlist(itemId) {
  const idx = state.watchlist.indexOf(itemId);
  if (idx === -1) {
    state.watchlist.push(itemId);
  } else {
    state.watchlist.splice(idx, 1);
  }
  
  localStorage.setItem("cineplay_watchlist", JSON.stringify(state.watchlist));
  
  initWatchlistBadge();
  
  // Re-render hero slides if they show watchlist state
  renderHeroSlides();
  
  // Re-render catalog cards
  const cards = document.querySelectorAll(".card");
  renderCatalogData();
  
  // If drawer is open, re-render drawer
  if (els.watchlistDrawer.classList.contains("open")) {
    renderWatchlistDrawer();
  }
}

function openWatchlistDrawer() {
  renderWatchlistDrawer();
  els.watchlistDrawer.classList.add("open");
  els.watchlistBackdrop.classList.add("show");
  document.body.style.overflow = "hidden"; // disable scroll
}

function closeWatchlistDrawer() {
  els.watchlistDrawer.classList.remove("open");
  els.watchlistBackdrop.classList.remove("show");
  document.body.style.overflow = ""; // enable scroll
}

function renderWatchlistDrawer() {
  els.watchlistContent.innerHTML = "";
  
  if (state.watchlist.length === 0) {
    els.watchlistContent.innerHTML = `
      <div class="empty-state" style="padding-top: 100px;">
        <i class="far fa-bookmark" style="font-size: 2.5rem;"></i>
        <p style="margin-top: 15px;">${translations[state.lang].watchlistEmpty}</p>
      </div>
    `;
    return;
  }
  
  state.watchlist.forEach(id => {
    const item = catalogData.find(i => i.id === id);
    if (!item) return;
    
    const div = document.createElement("div");
    div.className = "watchlist-item";
    div.addEventListener("click", () => {
      closeWatchlistDrawer();
      openItemDetails(item.id);
    });
    
    div.innerHTML = `
      <img src="${item.poster}" alt="${item.title[state.lang]}" class="watchlist-item-img">
      <div class="watchlist-item-info">
        <h4 class="watchlist-item-title">${item.title[state.lang]}</h4>
        <div class="watchlist-item-meta">
          <span class="watchlist-item-rating"><i class="fas fa-star"></i> ${item.rating.toFixed(1)}</span>
          <span>•</span>
          <span>${item.year}</span>
        </div>
        <button class="btn-remove-watchlist" onclick="event.stopPropagation(); toggleWatchlist('${item.id}')">
          <i class="far fa-trash-alt"></i> ${translations[state.lang].removeFromWatchlist}
        </button>
      </div>
    `;
    
    els.watchlistContent.appendChild(div);
  });
}

// ==================== DETAILS MODAL & REVIEWS ====================
function openItemDetails(itemId, scrollModalTop = true) {
  const item = catalogData.find(i => i.id === itemId);
  if (!item) return;
  
  els.modal.setAttribute("data-active-id", itemId);
  
  // Set modal details
  els.modalHeroBg.style.backgroundImage = `url('${item.image}')`;
  els.modalPoster.src = item.poster;
  els.modalPoster.alt = item.title[state.lang];
  els.modalTitle.textContent = item.title[state.lang];
  els.modalRating.innerHTML = `<i class="fas fa-star" style="color: var(--accent-cyan)"></i> ${item.rating.toFixed(1)}`;
  els.modalYear.textContent = item.year;
  
  // Category Badge
  let catText = translations[state.lang].categoryMovies;
  let bClass = "badge-primary";
  if (item.category === "games") {
    catText = translations[state.lang].categoryGames;
    bClass = "badge-pink";
  } else if (item.category === "cars") {
    catText = translations[state.lang].categoryCars;
    bClass = "badge-cyan";
  }
  els.modalCategoryBadge.textContent = catText;
  els.modalCategoryBadge.className = `badge ${bClass} modal-category-badge`;
  
  // Short/Full Description
  els.modalDesc.textContent = item.fullDescription[state.lang];
  
  // Specifications Table
  els.modalSpecsTable.innerHTML = "";
  const specs = item.specs[state.lang];
  for (const [key, val] of Object.entries(specs)) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="specs-label">${key}</td>
      <td class="specs-value">${val}</td>
    `;
    els.modalSpecsTable.appendChild(tr);
  }
  
  // Trailer Iframe
  els.modalTrailerFrame.src = item.trailer;
  
  // Render Reviews & Form Reset
  renderReviews(itemId);
  resetReviewForm();
  
  // Similar Items Grid
  renderSimilarItems(item);
  
  // Display Modal
  els.modal.classList.add("open");
  document.body.style.overflow = "hidden"; // disable body scrolling
  
  if (scrollModalTop) {
    els.modal.scrollTop = 0;
  }
}

function closeItemDetails() {
  els.modal.classList.remove("open");
  els.modal.removeAttribute("data-active-id");
  els.modalTrailerFrame.src = ""; // Stop trailer playing in background
  document.body.style.overflow = ""; // restore body scrolling
}

function renderReviews(itemId) {
  els.modalReviewsContainer.innerHTML = "";
  
  const item = catalogData.find(i => i.id === itemId);
  if (!item) return;
  
  // Static reviews + Dynamic localStorage reviews
  const staticRev = item.reviews || [];
  const customRev = state.customReviews[itemId] || [];
  const allRev = [...customRev, ...staticRev];
  
  if (allRev.length === 0) {
    els.modalReviewsContainer.innerHTML = `
      <p style="color: var(--text-secondary); font-size: 0.95rem; font-style: italic;">
        ${translations[state.lang].noReviews}
      </p>
    `;
    return;
  }
  
  allRev.forEach(rev => {
    const card = document.createElement("div");
    card.className = "review-card";
    
    // Check if text is string (dynamic user added) or localized object
    const textToShow = typeof rev.text === "string" ? rev.text : rev.text[state.lang];
    
    card.innerHTML = `
      <div class="review-header">
        <div>
          <span class="review-author">${rev.author}</span>
          <div class="review-date">${rev.date}</div>
        </div>
        <span class="review-rating"><i class="fas fa-star" style="color: #fbbf24"></i> ${rev.rating}/10</span>
      </div>
      <p class="review-text">${textToShow}</p>
    `;
    els.modalReviewsContainer.appendChild(card);
  });
}

function resetReviewForm() {
  els.reviewForm.reset();
  
  // Reset star ratings select UI
  const stars = els.starRatingSelect.querySelectorAll(".star-btn");
  stars.forEach((s, idx) => {
    s.classList.toggle("active", idx === 9); // default 10 star
    s.innerHTML = idx === 9 ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
  });
  
  els.reviewForm.setAttribute("data-rating-val", "10");
}

function handleReviewSubmit(e) {
  e.preventDefault();
  
  const activeId = els.modal.getAttribute("data-active-id");
  if (!activeId) return;
  
  const authorInput = document.getElementById("review-author-input").value.trim();
  const textInput = document.getElementById("review-text-area").value.trim();
  const ratingVal = parseInt(els.reviewForm.getAttribute("data-rating-val") || "10", 10);
  
  if (!authorInput || !textInput) {
    alert(translations[state.lang].reviewError);
    return;
  }
  
  // Create review object
  const newReview = {
    author: authorInput,
    rating: ratingVal,
    date: new Date().toISOString().split("T")[0],
    text: textInput // will be direct string
  };
  
  if (!state.customReviews[activeId]) {
    state.customReviews[activeId] = [];
  }
  
  state.customReviews[activeId].unshift(newReview); // add to top
  localStorage.setItem("cineplay_reviews", JSON.stringify(state.customReviews));
  
  // Notify
  alert(translations[state.lang].reviewSuccess);
  
  // Refresh review UI
  renderReviews(activeId);
  resetReviewForm();
}

function renderSimilarItems(currentItem) {
  els.similarItemsContainer.innerHTML = "";
  
  // Find similar of same category (excluding current)
  let similar = catalogData.filter(i => i.category === currentItem.category && i.id !== currentItem.id);
  
  // Sort by rating high to low, take top 4
  similar.sort((a, b) => b.rating - a.rating);
  similar = similar.slice(0, state.similarLimit);
  
  if (similar.length === 0) {
    els.similarItemsContainer.style.display = "none";
    document.getElementById("modal-section-similar").style.display = "none";
    return;
  }
  
  els.similarItemsContainer.style.display = "grid";
  document.getElementById("modal-section-similar").style.display = "flex";
  
  similar.forEach(item => {
    const sCard = document.createElement("div");
    sCard.className = "similar-card glass";
    sCard.addEventListener("click", () => {
      openItemDetails(item.id, true);
    });
    
    sCard.innerHTML = `
      <img src="${item.poster}" alt="${item.title[state.lang]}" class="similar-card-img">
      <div class="similar-card-info">
        <h4 class="similar-card-title">${item.title[state.lang]}</h4>
        <div class="similar-card-meta">
          <span>${item.year}</span>
          <span style="color: var(--accent-cyan); font-weight: 700;">
            <i class="fas fa-star"></i> ${item.rating.toFixed(1)}
          </span>
        </div>
      </div>
    `;
    
    els.similarItemsContainer.appendChild(sCard);
  });
}

// ==================== EVENT LISTENERS SETUP ====================
function setupEventListeners() {
  // Lang buttons
  els.langBtnEn.addEventListener("click", () => switchLanguage("en"));
  els.langBtnRu.addEventListener("click", () => switchLanguage("ru"));
  
  // Category switch
  els.categoryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const c = btn.getAttribute("data-category");
      handleCategoryChange(c);
    });
  });
  
  // Navbar categories links
  els.navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const cat = link.getAttribute("data-category");
      if (cat) {
        e.preventDefault();
        handleCategoryChange(cat);
        // Scroll smoothly to catalog
        const filterSection = document.querySelector(".filter-bar");
        filterSection.scrollIntoView({ behavior: "smooth", block: "start" });
        
        // Close mobile nav drawer if open
        els.navLinksContainer.classList.remove("open");
      }
    });
  });
  
  // Watchlist page navbar link toggle
  document.getElementById("nav-watchlist-link").addEventListener("click", (e) => {
    e.preventDefault();
    openWatchlistDrawer();
    els.navLinksContainer.classList.remove("open");
  });
  
  // Burger Menu toggle
  els.burgerMenu.addEventListener("click", () => {
    els.navLinksContainer.classList.toggle("open");
  });
  
  // Watchlist sidebar drawer trigger
  els.watchlistToggle.addEventListener("click", openWatchlistDrawer);
  els.watchlistCloseBtn.addEventListener("click", closeWatchlistDrawer);
  els.watchlistBackdrop.addEventListener("click", closeWatchlistDrawer);
  
  // Search actions
  els.searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderCatalog(false);
  });
  
  // Select filter drop downs
  els.genreSelect.addEventListener("change", (e) => {
    state.activeGenre = e.target.value;
    renderCatalog(false);
  });
  els.yearSelect.addEventListener("change", (e) => {
    state.activeYearRange = e.target.value;
    renderCatalog(false);
  });
  els.sortSelect.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    renderCatalog(false);
  });
  
  // Details Modal close trigger
  els.modalCloseBtn.addEventListener("click", closeItemDetails);
  document.querySelector(".modal-backdrop").addEventListener("click", closeItemDetails);
  
  // Custom Reviews - Stars interactive selection
  const starRow = els.starRatingSelect;
  // Populate 10 star selectors
  starRow.innerHTML = "";
  for (let s = 1; s <= 10; s++) {
    const sBtn = document.createElement("button");
    sBtn.type = "button";
    sBtn.className = "star-btn";
    sBtn.setAttribute("data-rating", s);
    sBtn.innerHTML = s === 10 ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
    sBtn.classList.toggle("active", s === 10);
    
    sBtn.addEventListener("click", () => {
      setStarRatingUI(s);
    });
    starRow.appendChild(sBtn);
  }
  
  // Review Form Submit
  els.reviewForm.addEventListener("submit", handleReviewSubmit);
}

function setStarRatingUI(ratingNum) {
  els.reviewForm.setAttribute("data-rating-val", ratingNum);
  const stars = els.starRatingSelect.querySelectorAll(".star-btn");
  
  stars.forEach((sBtn, idx) => {
    const sRating = idx + 1;
    if (sRating <= ratingNum) {
      sBtn.classList.add("active");
      sBtn.innerHTML = '<i class="fas fa-star"></i>';
    } else {
      sBtn.classList.remove("active");
      sBtn.innerHTML = '<i class="far fa-star"></i>';
    }
  });
}
