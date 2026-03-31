document.addEventListener("DOMContentLoaded", () => {
  const initBackToTop = () => {
    const backToTopBtn = document.getElementById("back-to-top");

    if (!backToTopBtn) return;

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    backToTopBtn.addEventListener("click", scrollToTop);
  };

  const initCounters = () => {
    const counters = document.querySelectorAll(".counter-value");
    if (!counters.length) return;

    counters.forEach((el) => {
      const target = +el.getAttribute("data-target");
      new countUp.CountUp(el, target, {
        duration: 2.5,
        useGrouping: false,
        enableScrollSpy: true,
        scrollSpyDelay: 0,
        scrollSpyOnce: true,
      });
    });
  };

  initBackToTop();
  initCounters();
});

var swiper = new Swiper(".swiperMain", {
  loop: true,
  effect: "fade",
  speed: 500,
  fadeEffect: { crossFade: true },
  parallax: true,
  navigation: { nextEl: ".main-next", prevEl: ".main-prev" },
  keyboard: { enabled: true },
  pagination: { el: ".swiper-pagination", clickable: true },
  autoplay: { delay: 5000, disableOnInteraction: true },
});

var productSwiper = new Swiper(".swiperProducts", {
  slidesPerView: "auto",
  spaceBetween: 20,
  loop: true,
  navigation: { nextEl: ".product-next", prevEl: ".product-prev" },
  breakpoints: {
    640: { slidesPerView: 2, spaceBetween: 30 },
    1024: { slidesPerView: 3, spaceBetween: 30 },
    1536: { slidesPerView: 4, spaceBetween: 30 },
  },
});

var newsSwiper = new Swiper(".swiperNews", {
  slidesPerView: "auto",
  spaceBetween: 16,
  breakpoints: {
    768: {
      spaceBetween: 20,
    },
    1536: {
      spaceBetween: 24,
    },
  },
  navigation: {
    nextEl: ".news-next",
    prevEl: ".news-prev",
  },
});

var Subswiper = new Swiper(".swiperSub", {
  loop: true,
  effect: "fade",
  speed: 500,
  fadeEffect: { crossFade: true },
  parallax: true,
  navigation: { nextEl: ".sub-next", prevEl: ".sub-prev" },
  keyboard: { enabled: true },
  autoplay: { delay: 5000, disableOnInteraction: true },
});

var productDetailStandartFeaturesSwiper = new Swiper(".swiperStandartFeatures", {
  slidesPerView: 2,
  spaceBetween: 16,
  loop: true,
  navigation: { nextEl: ".standart-features-next", prevEl: ".standart-features-prev" },
  breakpoints: {
    640: { slidesPerView: 3, spaceBetween: 24 },
    1024: { slidesPerView: 4, spaceBetween: 24 },
    1280: { slidesPerView: 5, spaceBetween: 32 },
    1536: { slidesPerView: 6, spaceBetween: 32 },
  },
});

var productDetailStandartFeaturesSwiper = new Swiper(".swiperOptionalFeatures", {
  slidesPerView: 2,
  spaceBetween: 16,
  loop: true,
  navigation: { nextEl: ".optional-features-next", prevEl: ".optional-features-prev" },
  breakpoints: {
    640: { slidesPerView: 3, spaceBetween: 24 },
    1024: { slidesPerView: 4, spaceBetween: 24 },
    1280: { slidesPerView: 5, spaceBetween: 32 },
    1536: { slidesPerView: 6, spaceBetween: 32 },
  },
});

Fancybox.bind("[data-fancybox]", {
  Carousel: { infinite: true, transition: "classic" },
  Thumbs: { autoStart: true, type: "classic" },
  Toolbar: {
    display: {
      left: ["infobar"],
      middle: ["zoomIn", "zoomOut", "rotateCCW", "rotateCW", "flipX", "flipY"],
      right: ["slideshow", "thumbs", "fullscreen", "download", "close"],
    },
  },
  Images: { zoom: true, Panzoom: { maxScale: 4 } },
  Slideshow: { timeout: 3000 },
  Hash: true,
});


// Video Gallery (videos.html)
(function () {
  const ITEMS_PER_PAGE = 3;

  document.querySelectorAll('[data-video-section]').forEach(function (section) {
    const grid = section.querySelector('[data-video-grid]');
    const buttons = section.querySelectorAll('[data-view-more-btn]');
    const items = grid.querySelectorAll(':scope > a');
    let visibleCount = ITEMS_PER_PAGE;

    items.forEach(function (item, index) {
      if (index >= ITEMS_PER_PAGE) {
        item.style.display = 'none';
      }
    });

    if (items.length <= ITEMS_PER_PAGE) {
      buttons.forEach(function (btn) {
        btn.style.display = 'none';
      });
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var newVisible = visibleCount + ITEMS_PER_PAGE;
        for (var i = visibleCount; i < newVisible && i < items.length; i++) {
          items[i].style.display = '';
        }
        visibleCount = newVisible;

        if (visibleCount >= items.length) {
          buttons.forEach(function (b) {
            b.style.display = 'none';
          });
        }
      });
    });
  });
})();

// Product Detail Video Swap (product-detail.html)
document.addEventListener('DOMContentLoaded', () => {
  const mainVideoLink = document.getElementById('main-video-link');
  const mainVideoThumbnail = document.getElementById('main-video-thumbnail');
  const mainVideoPlayer = document.getElementById('main-video-player');
  const galleryItems = document.querySelectorAll('.gallery-video-item');
  const prevBtn = document.getElementById('video-gallery-prev');
  const nextBtn = document.getElementById('video-gallery-next');

  if (!mainVideoLink || !mainVideoPlayer) return;

  const playlist = [];
  galleryItems.forEach(item => {
    const img = item.querySelector('img');
    playlist.push({
      href: item.getAttribute('href'),
      imgSrc: img ? img.getAttribute('src') : ''
    });
  });

  let currentIndex = 0;

  function loadMainVideo(index) {
    if (index < 0 || index >= playlist.length) return;

    currentIndex = index;
    const videoData = playlist[currentIndex];

    mainVideoLink.setAttribute('href', videoData.href);
    mainVideoThumbnail.setAttribute('src', videoData.imgSrc);

    mainVideoPlayer.pause();
    mainVideoPlayer.classList.add('hidden');
    mainVideoLink.classList.remove('hidden');
  }

  // Set the first item as main video
  if (playlist.length > 0) {
    loadMainVideo(0);
  }

  function playMainVideo() {
    mainVideoLink.classList.add('hidden');
    mainVideoPlayer.src = mainVideoLink.getAttribute('href');
    mainVideoPlayer.classList.remove('hidden');
    mainVideoPlayer.play();
  }

  mainVideoLink.addEventListener('click', function (e) {
    e.preventDefault();
    playMainVideo();
  });

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      loadMainVideo(index);
      playMainVideo();
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      let newIndex = currentIndex - 1;
      if (newIndex < 0) {
        newIndex = playlist.length - 1;
      }
      loadMainVideo(newIndex);
      playMainVideo();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      let newIndex = currentIndex + 1;
      if (newIndex >= playlist.length) {
        newIndex = 0;
      }
      loadMainVideo(newIndex);
      playMainVideo();
    });
  }

  // Product Detail Image Thumbnails Gallery
  const productMainImage = document.getElementById('product-main-image');
  const productThumbs = document.querySelectorAll('.product-thumb');

  if (productMainImage && productThumbs.length > 0) {
    const firstThumb = productThumbs[0];
    firstThumb.classList.remove('border-black/10');
    firstThumb.classList.add('border-black/20', 'active-thumb');
    const firstImg = firstThumb.querySelector('img');
    const firstBar = firstThumb.querySelector('div');
    if (firstImg) {
      firstImg.classList.remove('opacity-50', 'group-hover:opacity-100');
      firstImg.classList.add('opacity-100');
    }
    if (firstBar) {
      firstBar.classList.remove('opacity-0', 'group-hover:opacity-100');
      firstBar.classList.add('opacity-100');
    }

    productThumbs.forEach(thumb => {
      thumb.addEventListener('click', function () {
        const imgEl = this.querySelector('img');
        if (imgEl) {
          productMainImage.setAttribute('src', imgEl.getAttribute('src'));
        }

        productThumbs.forEach(t => {
          t.classList.remove('border-black/20', 'active-thumb');
          t.classList.add('border-black/10');

          const tImg = t.querySelector('img');
          const tBar = t.querySelector('div');

          if (tImg) {
            tImg.classList.remove('opacity-100');
            tImg.classList.add('opacity-50', 'group-hover:opacity-100');
          }
          if (tBar) {
            tBar.classList.remove('opacity-100');
            tBar.classList.add('opacity-0', 'group-hover:opacity-100');
          }
        });

        this.classList.remove('border-black/10');
        this.classList.add('border-black/20', 'active-thumb');

        const thisImg = this.querySelector('img');
        const thisBar = this.querySelector('div');

        if (thisImg) {
          thisImg.classList.remove('opacity-50', 'group-hover:opacity-100');
          thisImg.classList.add('opacity-100');
        }
        if (thisBar) {
          thisBar.classList.remove('opacity-0', 'group-hover:opacity-100');
          thisBar.classList.add('opacity-100');
        }
      });
    });
  }

  // Scroll to Product Form
  const productFormBtn = document.getElementById('product-form-btn');
  const productForm = document.getElementById('product-form');

  if (productFormBtn && productForm) {
    productFormBtn.addEventListener('click', () => {
      setTimeout(() => {
        const offset = 140;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = productForm.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 50);
    });
  }

  // Simulate Form Submission
  const productRequestForm = document.getElementById('product-request-form');
  const formSuccessMessage = document.getElementById('form-success-message');

  if (productRequestForm && formSuccessMessage && productForm) {
    productRequestForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const closeBtn = document.querySelector('[data-aether-action="close"][data-aether-target="product-form"]');
      if (closeBtn) {
        closeBtn.click();
      } else {
        productForm.classList.add('hidden');
      }

      formSuccessMessage.classList.remove('hidden');

      setTimeout(() => {
        const offset = 140;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = formSuccessMessage.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 50);

      setTimeout(() => {
        formSuccessMessage.classList.add('hidden');
        productRequestForm.reset();
      }, 5000);
    });
  }
});

// Search Modal
(function () {
  const originalClose = AetherUI.close.bind(AetherUI);
  AetherUI.close = function (id) {
    if (id === 'search-modal') {
      const modal = document.getElementById('search-modal');
      if (!modal || modal.classList.contains('hidden') || modal.classList.contains('search-modal-closing')) return;
      modal.classList.add('search-modal-closing');
      const content = modal.querySelector('.search-modal-content');
      const onEnd = () => {
        modal.classList.remove('search-modal-closing');
        content.removeEventListener('animationend', onEnd);
        originalClose(id);
      };
      content.addEventListener('animationend', onEnd, { once: true });
      setTimeout(() => {
        if (modal.classList.contains('search-modal-closing')) {
          modal.classList.remove('search-modal-closing');
          content.removeEventListener('animationend', onEnd);
          originalClose(id);
        }
      }, 300);
      return;
    }
    originalClose(id);
  };
})();