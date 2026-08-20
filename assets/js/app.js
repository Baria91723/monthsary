/**
 * MONTHSARY KEEPSAKE - APPLICATION LOGIC
 */

class KeepsakeAudioEngine {
  constructor(musicUrl = "picture/music.mp4") {
    this.musicUrl = musicUrl || "picture/music.mp4";
    this.mediaElement = document.getElementById('bgAudioMedia');

    if (!this.mediaElement) {
      try {
        const isVideo = /\.(mp4|webm|mov|m4v)$/i.test(this.musicUrl);
        this.mediaElement = document.createElement(isVideo ? 'video' : 'audio');
        this.mediaElement.id = 'bgAudioMedia';
        this.mediaElement.src = this.musicUrl;
        this.mediaElement.loop = true;
        this.mediaElement.preload = 'auto';
        this.mediaElement.setAttribute('playsinline', '');
        this.mediaElement.setAttribute('webkit-playsinline', '');
        this.mediaElement.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;opacity:0.001;pointer-events:none;z-index:-1;';
        document.body.appendChild(this.mediaElement);
      } catch (err) {
        console.warn("Could not create media element:", err);
      }
    } else {
      // Ensure volume is up and unmuted
      this.mediaElement.volume = 1.0;
      this.mediaElement.muted = false;
      if (this.musicUrl && !this.mediaElement.src.includes(this.musicUrl)) {
    // Continuous infinite loop listeners
    if (this.mediaElement) {
      this.mediaElement.loop = true;
      this.mediaElement.addEventListener('ended', () => {
        if (this.isPlaying) {
          this.mediaElement.currentTime = 0;
          this.mediaElement.play().catch(() => {});
        }
      });
      // Prevent browser throttling interruption
      this.mediaElement.addEventListener('pause', () => {
        // If it was supposed to be playing and reached end, restart
        if (this.isPlaying && this.mediaElement.currentTime >= (this.mediaElement.duration - 0.5)) {
          this.mediaElement.currentTime = 0;
          this.mediaElement.play().catch(() => {});
        }
      });
    }
  }

  toggle(onStateChange) {
    if (!this.mediaElement) {
      this.mediaElement = document.getElementById('bgAudioMedia');
    }

    if (this.mediaElement) {
      this.mediaElement.muted = false;
      this.mediaElement.volume = 1.0;
      this.mediaElement.loop = true;

      if (!this.isPlaying) {
        const playPromise = this.mediaElement.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            this.isPlaying = true;
            if (onStateChange) onStateChange(true);
          }).catch(err => {
            console.warn("Media play error:", err);
          });
        }
      } else {
        this.mediaElement.pause();
        this.isPlaying = false;
        if (onStateChange) onStateChange(false);
      }
    }
  }

  playSynthFallback(onStateChange) {
    this.initSynth();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (!this.isPlaying) {
      this.isPlaying = true;
      onStateChange(true);

      const chordList = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [174.61, 220.00, 261.63, 329.63], // Fmaj7
        [196.00, 246.94, 293.66, 349.23]  // G7
      ];
      let i = 0;

      this.playChord(chordList[0]);
      this.timer = setInterval(() => {
        i = (i + 1) % chordList.length;
        this.playChord(chordList[i]);
      }, 3400);

    } else {
      this.isPlaying = false;
      clearInterval(this.timer);
      onStateChange(false);
    }
  }
}

class MonthsaryApp {
  constructor() {
    this.config = window.ANNIVERSARY_CONFIG || {};
    this.audioEngine = new KeepsakeAudioEngine(this.config.musicUrl);

    this.initCanvas();
    this.initUI();
    this.renderContent();
    this.startCounter();
  }

  renderContent() {
    const cfg = this.config;

    // Header & Tags
    document.getElementById('envelopeToTag').textContent = `To: ${cfg.partnerName || 'My Love'}`;
    document.getElementById('envelopeDateTag').textContent = `Est. ${(cfg.monthsaryDate || '2026').split('-')[0]}`;
    document.getElementById('letterTitle').textContent = cfg.letterTitle || '';
    document.getElementById('letterSalutation').textContent = `My ${cfg.partnerName || 'Dearest'},`;
    document.getElementById('signatureName').textContent = cfg.yourName || 'Always You';

    // Keepsake Audio Info
    const keepsakeInfo = document.querySelector('.keepsake-info');
    if (keepsakeInfo) {
      const strongEl = keepsakeInfo.querySelector('strong');
      const spanEl = keepsakeInfo.querySelector('span');
      if (strongEl) strongEl.textContent = cfg.musicTitle || 'Our Special Melody';
      if (spanEl) spanEl.textContent = cfg.musicSubtitle || 'Special Keepsake Song • Playing for you';
    }

    // Letter Paragraphs
    const paragraphsContainer = document.getElementById('letterParagraphs');
    paragraphsContainer.innerHTML = '';
    const paragraphs = cfg.letterParagraphs || [];
    paragraphs.forEach(pText => {
      if (pText.trim()) {
        const p = document.createElement('p');
        p.className = 'letter-body-p';
        p.textContent = pText.trim();
        paragraphsContainer.appendChild(p);
      }
    });

    // Timeline
    const timelineContainer = document.getElementById('timelineContainer');
    timelineContainer.innerHTML = '';
    (cfg.timeline || []).forEach(item => {
      const el = document.createElement('div');
      el.className = 'timeline-item';
      el.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-date">${item.date}</div>
        <div class="timeline-title">${item.title}</div>
        <div class="timeline-desc">${item.desc}</div>
      `;
      timelineContainer.appendChild(el);
    });

    // Reasons Flip Cards
    const reasonsGrid = document.getElementById('reasonsGrid');
    reasonsGrid.innerHTML = '';
    (cfg.reasons || []).forEach(r => {
      const card = document.createElement('div');
      card.className = 'reason-card';
      card.innerHTML = `
        <div class="reason-inner">
          <div class="reason-front">
            <span class="num">${r.num}</span>
            <p>${r.short}</p>
          </div>
          <div class="reason-back">${r.full}</div>
        </div>
      `;
      card.addEventListener('click', () => card.classList.toggle('flipped'));
      reasonsGrid.appendChild(card);
    });

    // Polaroids
    const polaroidContainer = document.getElementById('polaroidContainer');
    polaroidContainer.innerHTML = '';
    (cfg.photos || []).forEach(photo => {
      const figure = document.createElement('figure');
      figure.className = 'polaroid-item';
      figure.innerHTML = `
        <img src="${photo.url}" alt="${photo.caption}" loading="lazy">
        <figcaption>${photo.caption}</figcaption>
      `;
      figure.addEventListener('click', () => this.openLightbox(photo.url, photo.caption));
      polaroidContainer.appendChild(figure);
    });
  }

  startCounter() {
    const update = () => {
      const start = new Date(this.config.monthsaryDate || "2026-06-30T02:08:00").getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById('cntDays').textContent = days;
      document.getElementById('cntHours').textContent = hours;
      document.getElementById('cntMins').textContent = mins;
      document.getElementById('cntSecs').textContent = secs;
    };
    update();
    setInterval(update, 1000);
  }

  openLightbox(url, caption) {
    const modal = document.getElementById('lightboxModal');
    document.getElementById('lightboxImg').src = url;
    document.getElementById('lightboxCaption').textContent = caption;
    modal.classList.add('active');
  }

  initCanvas() {
    const canvas = document.getElementById('petalCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const petals = Array.from({ length: 25 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 0.8 + 0.3,
      speedX: Math.random() * 0.4 - 0.2,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 1 - 0.5,
      opacity: Math.random() * 0.5 + 0.3
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      petals.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y > height) p.y = -10;
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = '#C88A98';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(draw);
    };
    draw();
  }

  initUI() {
    const sealBtn = document.getElementById('sealBtn');
    const stage = document.getElementById('stage');
    const envelope = document.getElementById('envelope');
    const letterScene = document.getElementById('letterScene');

    // Helper to update Audio UI state
    const updateAudioUI = (isPlaying) => {
      const label = document.getElementById('audioLabel');
      const playBtn = document.getElementById('keepsakePlayBtn');
      const keepsake = document.getElementById('keepsakePlayer');

      if (label && playBtn && keepsake) {
        if (isPlaying) {
          label.textContent = "Pause Music";
          playBtn.textContent = "❚❚";
          keepsake.classList.add('playing');
        } else {
          label.textContent = "Play Music";
          playBtn.textContent = "▶";
          keepsake.classList.remove('playing');
        }
      }
    };

    // Open Envelope Action & Start Music Automatically
    const handleOpenEnvelope = () => {
      if (envelope.classList.contains('open')) return;
      envelope.classList.add('open');

      // Auto-start music on opening if not already playing
      if (!this.audioEngine.isPlaying) {
        this.audioEngine.toggle(updateAudioUI);
      }

      setTimeout(() => {
        stage.classList.add('hidden');
        letterScene.classList.add('visible');
      }, 700);
    };

    sealBtn.addEventListener('click', handleOpenEnvelope);
    envelope.addEventListener('click', handleOpenEnvelope);

    // Also attempt autoplay immediately on load (will work if browser allows)
    setTimeout(() => {
      if (!this.audioEngine.isPlaying) {
        this.audioEngine.toggle(updateAudioUI);
      }
    }, 300);

    // Audio Play / Pause Handler
    const handleAudioToggle = () => {
      this.audioEngine.toggle(updateAudioUI);
    };

    document.getElementById('audioToggle').addEventListener('click', handleAudioToggle);
    document.getElementById('keepsakePlayBtn').addEventListener('click', handleAudioToggle);

    // Lightbox Close
    const lightboxModal = document.getElementById('lightboxModal');
    document.getElementById('lightboxClose').addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        lightboxModal.classList.remove('active');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new MonthsaryApp();
});
