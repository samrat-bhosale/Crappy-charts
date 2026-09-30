/**
 * BEARTRAP TERMINAL - REAL GOOGLE FINANCE DATA & TIME-CONSUMING VERIFICATION ENGINE
 * Features:
 * - Real live data fetched from Google Finance & NASDAQ L1 Gateways
 * - Cryptographic SHA-256 verification signatures for all quotes
 * - 4-Stage high-friction, time-consuming execution ritual (~45-60s per trade)
 * - Steady-cursor biometric calibration (hold still for 6s or reset)
 * - Manual legal attestation transcription matching real Google price
 * - Active verified executed positions ledger
 * - Inverted candlestick logic (Green = Drop, Red = Surge)
 * - 14 sterile opaque hairline overlays completely obscuring the chart
 * - Dynamic shifting non-linear Y-axis
 * - Evasive runaway dialog boxes that dodge cursor
 * - Exponential unwanted inquiry multiplication on any Yes/No click
 * - Sub-bass rhythmic heartbeat audio & clinical telemetry alarms
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. REAL GOOGLE FINANCE DATA & VERIFICATION STATE
     ========================================================================== */
  let activeSymbol = 'GOOGL';
  let activeRealPrice = 340.92;
  let activeRealChange = -0.53;
  let activeHash = '0xE4A5E3AA16DD31A4';
  let activeCik = '0001652044';
  let currentShares = 450000;
  let executedPositions = [];

  const realQuotes = {
    'GOOGL': { price: 340.92, delta: -0.53, hash: '0xE4A5E3AA16DD31A4', cik: '0001652044' },
    'AAPL': { price: 329.40, delta: -2.66, hash: '0xAACBD86F8CBAC8F6', cik: '0000320193' },
    'NVDA': { price: 227.21, delta: -0.72, hash: '0x38AC08146FA2827F', cik: '0001045810' },
    'TSLA': { price: 352.84, delta: -1.29, hash: '0x7DCB0C2B62A66199', cik: '0001318605' },
    'MSFT': { price: 508.96, delta: 0.05, hash: '0x7652610EC8F30957', cik: '0000789019' },
    'SPY': { price: 764.20, delta: -0.18, hash: '0xA219E7BE3129C1C4', cik: '0000884394' }
  };

  // Fetch real Google Finance quotes from server API
  async function syncRealGoogleQuotes() {
    try {
      const res = await fetch('/api/quotes');
      if (!res.ok) return;
      const data = await res.json();
      if (data && data.quotes) {
        Object.keys(data.quotes).forEach(sym => {
          const q = data.quotes[sym];
          realQuotes[sym] = {
            price: q.price,
            delta: q.changePct,
            hash: q.verificationHash,
            cik: q.cik
          };

          // Update watchlist UI
          const priceCell = document.getElementById(`price-${sym}`);
          const deltaCell = document.getElementById(`delta-${sym}`);
          if (priceCell) priceCell.textContent = `$${q.price.toFixed(2)}`;
          if (deltaCell) {
            deltaCell.textContent = `${q.changePct >= 0 ? '+' : ''}${q.changePct.toFixed(2)}%`;
            // Inverted logic: Green = Drop, Red = Gain
            deltaCell.className = q.changePct <= 0 ? 'text-green-loss' : 'text-red-gain';
          }
        });

        // Update active symbol telemetry
        if (realQuotes[activeSymbol]) {
          applyActiveStockData(activeSymbol);
        }
      }
    } catch (e) {
      console.warn("Real data sync fallback to local cache:", e);
    }
  }

  function applyActiveStockData(sym) {
    const q = realQuotes[sym] || realQuotes['GOOGL'];
    activeSymbol = sym;
    activeRealPrice = q.price;
    activeRealChange = q.delta;
    activeHash = q.hash;
    activeCik = q.cik;

    document.getElementById('activeContractLabel').textContent = `${sym}:NASDAQ (500x)`;
    const priceEl = document.getElementById('headerLastPrice');
    priceEl.textContent = `$${q.price.toFixed(2)}`;
    priceEl.className = q.delta <= 0 ? 'inst-val text-green-loss' : 'inst-val text-red-gain';

    const changeEl = document.getElementById('headerChangePct');
    if (changeEl) {
      changeEl.textContent = `${q.delta <= 0 ? '▼' : '▲'} ${q.delta.toFixed(2)}%`;
    }

    document.getElementById('headerHashDisplay').textContent = q.hash;
    document.getElementById('telemetryHash').textContent = q.hash;
    document.getElementById('chartContractTitle').textContent = `${sym}:NASDAQ // GOOGLE FINANCE VERIFIED FEED`;
    document.getElementById('chartRealPriceBadge').textContent = `$${q.price.toFixed(2)}`;
    document.getElementById('limitPriceInput').value = `$${q.price.toFixed(2)}`;
    document.getElementById('orderFormHash').textContent = q.hash;

    basePrice = activeRealPrice;
    initCandles();
    drawChart();
    updateOrderMath(currentShares);
  }

  syncRealGoogleQuotes();
  setInterval(syncRealGoogleQuotes, 6000);

  document.getElementById('refreshRealQuotesBtn').addEventListener('click', () => {
    syncRealGoogleQuotes();
    showToast("GOOGLE DATA RE-SYNC: Querying NASDAQ L1 endpoints.", 2000);
  });

  document.getElementById('randomizePriceBtn').addEventListener('click', () => {
    syncRealGoogleQuotes();
    showToast("VERIFIED QUOTE UPDATED: Fetched from Google Finance API.", 2000);
  });


  /* ==========================================================================
     2. WEB AUDIO API: HIGH-STRESS SUB-BASS HEARTBEAT & CLINICAL ALARMS
     ========================================================================== */
  let audioCtx = null;
  let isAudioActive = false;
  let masterGain = null;
  let alarmInterval = null;
  let currentVolume = 0.35;
  let heartbeatBpm = 84;

  function initAudioEngine() {
    if (audioCtx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(currentVolume, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);
      isAudioActive = true;

      startAmbientHum();
      startHeartbeatLoop();
      alarmInterval = setInterval(playSonarWarning, 4500);

      showToast("FEED CONNECTED: AUDITORY BIOMETRIC TELEMETRY SYNCHRONIZED", 3000);
    } catch (e) {
      console.warn("Audio Context deferred:", e);
    }
  }

  function startAmbientHum() {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const humGain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(55, audioCtx.currentTime);
    humGain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    osc.connect(humGain);
    humGain.connect(masterGain);
    osc.start();
  }

  function startHeartbeatLoop() {
    function beat() {
      if (!audioCtx || !isAudioActive) return;
      playHeartbeatPulse(65, 0.25);
      setTimeout(() => {
        playHeartbeatPulse(52, 0.18);
      }, 160);

      const intervalMs = (60 / heartbeatBpm) * 1000;
      setTimeout(beat, intervalMs);
    }
    beat();
  }

  function playHeartbeatPulse(freq, intensity) {
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.14);

    gain.gain.setValueAtTime(intensity, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.16);
  }

  function playSonarWarning() {
    if (!audioCtx || !isAudioActive) return;
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1174.66, now);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.38);
  }

  function playTelemetryTick() {
    if (!audioCtx || !isAudioActive) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1600, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch(e) {}
  }

  function playAlertChime() {
    if (!audioCtx || !isAudioActive) return;
    try {
      const now = audioCtx.currentTime;
      [880, 587.33].forEach((f, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.08);
        gain.gain.setValueAtTime(0.07, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.12);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.14);
      });
    } catch(e) {}
  }

  function playSuccessChord() {
    if (!audioCtx || !isAudioActive) return;
    const now = audioCtx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.05);
      gain.gain.setValueAtTime(0.09, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now + i * 0.05);
      osc.stop(now + 0.85);
    });
  }

  function playPanicBurst() {
    if (!audioCtx || !isAudioActive) return;
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(2200, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.5);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.52);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.55);
  }

  // Entry Gate Modal
  const enterBtn = document.getElementById('enterExchangeBtn');
  const entryModal = document.getElementById('entryGateModal');

  enterBtn.addEventListener('click', () => {
    initAudioEngine();
    entryModal.style.display = 'none';
    startDynamicYAxisDistortion();
    spawnHydraPopup();
  });

  const decoyMuteBtn = document.getElementById('decoyMuteBtn');
  decoyMuteBtn.addEventListener('click', () => {
    heartbeatBpm = Math.min(150, heartbeatBpm + 12);
    if (audioCtx && masterGain) {
      currentVolume = Math.min(0.9, currentVolume + 0.1);
      masterGain.gain.setValueAtTime(currentVolume, audioCtx.currentTime);
    }
    showToast(`AUDIT ALERT: Audio feed mandatory under Regulation 42-B. Heart rate elevated to ${heartbeatBpm} BPM.`, 3500);
    decoyMuteBtn.textContent = `FEED: ${Math.round(currentVolume * 100)}% PRESSURE [ESCALATING]`;
  });

  const secretTrueMuteBtn = document.getElementById('secretTrueMuteBtn');
  secretTrueMuteBtn.addEventListener('click', () => {
    if (masterGain && audioCtx) {
      if (isAudioActive) {
        masterGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
        isAudioActive = false;
        showToast("TELEMETRY MUTED: Session silence authorized.", 2500);
      } else {
        masterGain.gain.setValueAtTime(currentVolume, audioCtx.currentTime);
        isAudioActive = true;
        showToast("TELEMETRY RESUMED: Feed active.", 2500);
      }
    }
  });


  /* ==========================================================================
     3. LIQUIDATION COUNTDOWN CLOCK
     ========================================================================== */
  const clockEl = document.getElementById('liquidationClock');
  let countdownSecs = 14.28;

  setInterval(() => {
    countdownSecs -= 0.05;
    if (countdownSecs <= 0) {
      countdownSecs = 14.99;
      triggerScreenShake();
      showToast("PENALTY APPLIED: Autonomous liquidation clock reset. Surcharge billed.", 3000);
    }
    const secs = Math.floor(countdownSecs % 60).toString().padStart(2, '0');
    const millis = Math.floor((countdownSecs % 1) * 100).toString().padStart(2, '0');
    clockEl.textContent = `00:${secs}.${millis}`;
  }, 50);


  /* ==========================================================================
     4. MINIMALIST INVERTED CHART & OPAQUE TECHNICAL OVERLAYS
     ========================================================================== */
  const canvas = document.getElementById('tradingChartCanvas');
  const ctx = canvas.getContext('2d');
  let chartCandles = [];
  const MAX_CANDLES = 44;
  let basePrice = activeRealPrice;
  let axisDistortionMode = 0;

  function resizeCanvas() {
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function initCandles() {
    chartCandles = [];
    let price = basePrice;
    for (let i = 0; i < MAX_CANDLES; i++) {
      const delta = (Math.random() - 0.52) * (basePrice * 0.004);
      const open = price;
      const close = Math.max(0.01, price + delta);
      const high = Math.max(open, close) + Math.random() * (basePrice * 0.002);
      const low = Math.min(open, close) - Math.random() * (basePrice * 0.002);
      chartCandles.push({ open, close, high, low });
      price = close;
    }
  }
  initCandles();

  setInterval(() => {
    const last = chartCandles[chartCandles.length - 1];
    const delta = (Math.random() - 0.52) * (basePrice * 0.003);
    const open = last.close;
    const close = Math.max(0.01, open + delta);
    const high = Math.max(open, close) + Math.random() * (basePrice * 0.0015);
    const low = Math.min(open, close) - Math.random() * (basePrice * 0.0015);

    chartCandles.push({ open, close, high, low });
    if (chartCandles.length > MAX_CANDLES) {
      chartCandles.shift();
    }
    drawChart();
  }, 800);

  function startDynamicYAxisDistortion() {
    setInterval(() => {
      axisDistortionMode = (axisDistortionMode + 1) % 5;
      distortYAxisLabels();
      drawChart();
    }, 3000);
  }

  const distortAxisBtn = document.getElementById('distortAxisBtn');
  distortAxisBtn.addEventListener('click', () => {
    axisDistortionMode = (axisDistortionMode + 1) % 5;
    distortYAxisLabels();
    drawChart();
    showToast("WARP ENGAGED: Non-linear projection applied to price scale.", 2000);
  });

  const yLabels = [
    document.getElementById('yLabel0'),
    document.getElementById('yLabel1'),
    document.getElementById('yLabel2'),
    document.getElementById('yLabel3'),
    document.getElementById('yLabel4'),
    document.getElementById('yLabel5'),
    document.getElementById('yLabel6'),
    document.getElementById('yLabel7')
  ];

  function distortYAxisLabels() {
    const schemes = [
      ["$1,000,000.00", "$42,000.00", "$999.99", "$0.00042", "-$12,000.00", "-$1,000,000.00", "-∞ USD", "NULL_PTR"],
      ["0.00000001", "4,291.00", "-88.42", "12.3456", "99,999.00", "0.0004", "-99,999.00", "NaN"],
      ["e^(iπ) + 1", "√(-420.69)", "log₁₀(-0.0001)", "∫(liquidation)dt", "42.00 USDT", "π / 0", "Δ Margin", "MARGIN_CALL"],
      ["-$9,999,999.00", "-$500,000.00", "$0.00", "$0.00001", "$0.00042", "$14,000.00", "$999,999.00", "$100,000,000.00"],
      ["PEAK GREED", "YOUR ENTRY", "LIQUIDATION", "SLIPPAGE", "DESPAIR", "BANKRUPTCY", "SUBPRIME", "EXTINCTION"]
    ];

    const currentScheme = schemes[axisDistortionMode];
    yLabels.forEach((el, idx) => {
      if (el && currentScheme[idx]) {
        el.textContent = currentScheme[idx];
      }
    });
  }

  let additionalIndicatorCount = 0;
  const moreIndicatorsBtn = document.getElementById('moreIndicatorsBtn');
  moreIndicatorsBtn.addEventListener('click', () => {
    additionalIndicatorCount += 5;
    drawChart();
    showToast(`OVERLAYS EXPANDED: 5 additional indicator traces rendered.`, 2500);
  });

  function drawChart() {
    if (!canvas || !ctx) return;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Minimal hairline grid
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    const gridSpacing = 40;
    for (let x = 0; x < w; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    let minP = Infinity;
    let maxP = -Infinity;
    chartCandles.forEach(c => {
      if (c.low < minP) minP = c.low;
      if (c.high > maxP) maxP = c.high;
    });

    if (axisDistortionMode === 0) {
      maxP *= 1.25;
      minP *= 0.75;
    } else if (axisDistortionMode === 3) {
      const temp = minP;
      minP = maxP;
      maxP = temp;
    }

    const candleWidth = (w - 120) / chartCandles.length;

    function priceToY(price) {
      if (maxP === minP) return h / 2;
      return h - 35 - ((price - minP) / (maxP - minP)) * (h - 70);
    }

    // 1. RENDER CANDLESTICKS (INVERTED LOGIC)
    // Clean Green (#00e575) = CRASH / LOSS
    // Clean Red (#ff1f44) = SURGE / GAIN
    chartCandles.forEach((c, i) => {
      const x = i * candleWidth + 12;
      const isDrop = c.close <= c.open;
      const candleColor = isDrop ? "#00e575" : "#ff1f44";

      const yOpen = priceToY(c.open);
      const yClose = priceToY(c.close);
      const yHigh = priceToY(c.high);
      const yLow = priceToY(c.low);

      ctx.strokeStyle = candleColor;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(x + candleWidth * 0.45, yHigh);
      ctx.lineTo(x + candleWidth * 0.45, yLow);
      ctx.stroke();

      ctx.fillStyle = candleColor;
      const top = Math.min(yOpen, yClose);
      const height = Math.max(2, Math.abs(yClose - yOpen));
      ctx.fillRect(x, top, Math.max(3, candleWidth * 0.8), height);
    });

    // 2. OVERLAY 14 DISTINCT UNCALIBRATED TECHNICAL INDICATORS
    ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
    ctx.lineWidth = 1.5;

    drawSmoothIndicator(chartCandles, (c, i) => priceToY(c.high) - 30 + Math.sin(i * 0.5) * 12);
    drawSmoothIndicator(chartCandles, (c, i) => (priceToY(c.open) + priceToY(c.close)) / 2);
    drawSmoothIndicator(chartCandles, (c, i) => priceToY(c.low) + 30 - Math.cos(i * 0.5) * 12);
    drawSmoothIndicator(chartCandles, (c, i) => h * 0.3 + Math.sin(i * 0.8) * (h * 0.22));
    drawSmoothIndicator(chartCandles, (c, i) => h * 0.5 + Math.cos(i * 0.4) * (h * 0.26));
    drawSmoothIndicator(chartCandles, (c, i) => h * 0.52 + Math.cos(i * 0.35 + 0.5) * (h * 0.25));
    drawSmoothIndicator(chartCandles, (c, i) => priceToY(c.open) + Math.sin(i * 1.2) * 20);
    drawSmoothIndicator(chartCandles, (c, i) => priceToY(c.close) - Math.cos(i * 0.9) * 18);
    drawSmoothIndicator(chartCandles, (c, i) => priceToY(c.high) + 16 + Math.sin(i * 0.3) * 8);
    drawSmoothIndicator(chartCandles, (c, i) => priceToY(c.close) + 8 - Math.sin(i * 0.4) * 6);
    drawSmoothIndicator(chartCandles, (c, i) => priceToY(c.low) - 8 + Math.cos(i * 0.5) * 10);
    drawSmoothIndicator(chartCandles, (c, i) => h * 0.45 + (Math.sin(i * 2.1) * 26));

    // SAR
    ctx.beginPath();
    chartCandles.forEach((c, i) => {
      const x = i * candleWidth + 12;
      const y = (i % 2 === 0 ? priceToY(c.high) - 12 : priceToY(c.low) + 12);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Spiral
    ctx.beginPath();
    for (let a = 0; a < Math.PI * 3.5; a += 0.12) {
      const r = a * 22;
      const sx = w * 0.45 + r * Math.cos(a);
      const sy = h * 0.5 + r * Math.sin(a);
      if (a === 0) ctx.moveTo(sx, sy);
      else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    for (let k = 0; k < additionalIndicatorCount; k++) {
      drawSmoothIndicator(chartCandles, (c, i) => {
        return h * 0.5 + Math.sin(i * (0.2 + k * 0.1) + k) * (h * 0.35);
      });
    }
  }

  function drawSmoothIndicator(candles, yCallback) {
    if (!candles || candles.length === 0) return;
    const w = canvas.width;
    const candleWidth = (w - 120) / candles.length;

    ctx.beginPath();
    candles.forEach((c, i) => {
      const x = i * candleWidth + 12;
      const y = yCallback(c, i);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }


  /* ==========================================================================
     5. ORDER TICKET FRICTION: SLIDER, INPUT TRAPS & SWAPPING BUTTONS
     ========================================================================== */
  const slider = document.getElementById('insaneOrderSlider');
  const sliderText = document.getElementById('sliderValueText');
  const manualQtyInput = document.getElementById('manualQtyInput');
  const baseValEl = document.getElementById('baseOrderVal');
  const leveragedExpEl = document.getElementById('leveragedExposureVal');
  const slippageEl = document.getElementById('slippageVal');
  const estMarginEl = document.getElementById('estMarginVal');

  function updateOrderMath(shares) {
    currentShares = shares;
    sliderText.textContent = `${shares.toLocaleString()} SHARES`;
    manualQtyInput.value = shares;

    const notionalBase = shares * activeRealPrice;
    const leverage = 500;
    const leveragedTotal = notionalBase * leverage;
    const slippage = notionalBase * 0.05 + 9410.00;
    const requiredMargin = (leveragedTotal * 0.30) + slippage;

    baseValEl.textContent = `$${notionalBase.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
    leveragedExpEl.textContent = `$${leveragedTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
    slippageEl.textContent = `$${slippage.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
    estMarginEl.textContent = `$${requiredMargin.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
  }

  let isDraggingSlider = false;
  let lastMouseX = 0;

  slider.addEventListener('mousedown', (e) => {
    isDraggingSlider = true;
    lastMouseX = e.clientX;
  });

  window.addEventListener('mouseup', () => {
    isDraggingSlider = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDraggingSlider) return;
    const deltaX = e.clientX - lastMouseX;
    lastMouseX = e.clientX;

    const jump = deltaX * 45000;
    let newShares = Math.min(1000000, Math.max(0, currentShares + jump));
    slider.value = newShares;
    updateOrderMath(newShares);
  });

  slider.addEventListener('input', () => {
    const raw = parseInt(slider.value, 10);
    const jittered = Math.min(1000000, Math.max(0, raw + Math.round((Math.random() - 0.5) * 80000)));
    slider.value = jittered;
    updateOrderMath(jittered);
  });

  manualQtyInput.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      manualQtyInput.value = (parseInt(manualQtyInput.value || "1000") * 10).toString();
      updateOrderMath(parseInt(manualQtyInput.value));
      showToast("CORRECTION PENALTY: Position scaled by 10x per risk policy.", 2500);
      return;
    }

    if (/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      const injected = manualQtyInput.value + e.key + "00";
      manualQtyInput.value = injected;
      const num = parseInt(injected, 10);
      updateOrderMath(isNaN(num) ? 500000 : num);
    }
  });

  // SWAPPING INSTANT ACTION BUTTONS
  const btnWrapper = document.getElementById('swapButtonsWrapper');
  const btn1 = document.getElementById('primaryActionBtn1');
  const btn2 = document.getElementById('primaryActionBtn2');
  let isSwapped = false;

  function swapButtons() {
    isSwapped = !isSwapped;
    if (isSwapped) {
      btnWrapper.appendChild(btn1);
    } else {
      btnWrapper.appendChild(btn2);
    }
    playTelemetryTick();
  }

  btn1.addEventListener('mouseenter', swapButtons);
  btn2.addEventListener('mouseenter', swapButtons);

  btn1.addEventListener('click', () => triggerMultiLayerModal("EXECUTE"));
  btn2.addEventListener('click', () => triggerMultiLayerModal("LIQUIDATE"));


  /* ==========================================================================
     6. THE TIME-CONSUMING REGULATORY VERIFICATION RITUAL (USER TRADING PATH)
     Allows the user to actually execute orders, but makes it deliberately
     and intensely time-consuming (~45-60 seconds of clinical compliance)!
     ========================================================================== */
  const startRitualBtn = document.getElementById('startRitualBtn');
  const ritualModal = document.getElementById('timeConsumingRitualModal');
  const stageBadge = document.getElementById('ritualStageBadge');

  const step1 = document.getElementById('ritualStep1');
  const step2 = document.getElementById('ritualStep2');
  const step3 = document.getElementById('ritualStep3');
  const step4 = document.getElementById('ritualStep4');
  const step5 = document.getElementById('ritualStep5');
  const stepFailure = document.getElementById('ritualStepFailure');

  // Launch Ritual
  startRitualBtn.addEventListener('click', () => {
    ritualModal.classList.remove('hidden');
    startStage1();
  });

  // STAGE 1: GOOGLE FINANCE REST HANDSHAKE (Takes ~1.2 seconds)
  function startStage1() {
    stageBadge.textContent = "STAGE 1 / 4";
    step1.classList.remove('hidden');
    step2.classList.add('hidden');
    step3.classList.add('hidden');
    step4.classList.add('hidden');
    step5.classList.add('hidden');
    if (stepFailure) stepFailure.classList.add('hidden');

    const bar = document.getElementById('stage1Progress');
    const log = document.getElementById('stage1StatusLog');
    bar.style.width = '0%';

    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      bar.style.width = `${progress}%`;

      if (progress === 20) {
        log.textContent = `Resolving Google Finance node for ${activeSymbol}... Querying CIK ${activeCik}...`;
        playTelemetryTick();
      } else if (progress === 50) {
        log.textContent = `Matched Quote: $${activeRealPrice.toFixed(2)} USD // Computing SHA-256 hash ${activeHash}...`;
        playTelemetryTick();
      } else if (progress === 85) {
        log.textContent = `Cryptographic token verified by NASDAQ L1 clearinghouse. Preparing Stage 2...`;
        playTelemetryTick();
      } else if (progress >= 100) {
        clearInterval(interval);
        playAlertChime();
        setTimeout(startStage2, 350);
      }
    }, 60); // Brisk ~1.2s total
  }

  // STAGE 2: MANDATORY SEC RULE 603 COOLING-OFF LOCKOUT (Brisk 3.0s on attempt 1, 2.0s on attempt 2)
  let coolingSecs = 3.0;
  let coolingInterval = null;
  const coolingTimerText = document.getElementById('coolingTimerText');
  const coolingProceedBtn = document.getElementById('coolingProceedBtn');

  function startStage2() {
    stageBadge.textContent = "STAGE 2 / 4";
    step1.classList.add('hidden');
    step2.classList.remove('hidden');

    coolingSecs = (userExecutionAttempt === 1 ? 3.0 : 2.0);
    heartbeatBpm = 110;
    coolingProceedBtn.disabled = true;
    coolingProceedBtn.classList.add('disabled-btn');
    coolingProceedBtn.textContent = "COOLING-OFF LOCKOUT ACTIVE...";

    clearInterval(coolingInterval);
    coolingInterval = setInterval(() => {
      coolingSecs -= 0.1;
      if (coolingSecs <= 0) {
        coolingSecs = 0;
        clearInterval(coolingInterval);
        coolingTimerText.textContent = "LOCKOUT EXPIRED // DELIBERATION SATISFIED";
        coolingProceedBtn.disabled = false;
        coolingProceedBtn.classList.remove('disabled-btn');
        coolingProceedBtn.textContent = "PROCEED TO STAGE 3 (BIOMETRIC CALIBRATION)";
        playAlertChime();
      } else {
        coolingTimerText.textContent = `LOCKOUT REMAINING: 00:${coolingSecs < 10 ? '0' : ''}${coolingSecs.toFixed(2)}`;
      }
    }, 100);
  }

  coolingProceedBtn.addEventListener('click', () => {
    if (coolingSecs > 0) {
      coolingSecs += 1.0;
      triggerScreenShake();
      showToast("⚠️ PENALTY: Impatience detected. Added +1.0 second.", 2000);
      return;
    }
    startStage3();
  });

  // STAGE 3: FINRA ANTI-BOT STEADY-CURSOR CALIBRATION (Hold still for 2.0 seconds)
  const targetBox = document.getElementById('cursorTargetBox');
  const targetText = document.getElementById('targetStatusText');
  const cursorProgress = document.getElementById('cursorProgressFill');
  const feedbackEl = document.getElementById('calibrationFeedback');

  let holdTime = 0;
  let isHolding = false;
  let holdInterval = null;
  let lastTargetMouseX = 0;
  let lastTargetMouseY = 0;
  const TARGET_HOLD_SECS = 2.0;

  function startStage3() {
    stageBadge.textContent = "STAGE 3 / 4";
    step2.classList.add('hidden');
    step3.classList.remove('hidden');

    holdTime = 0;
    cursorProgress.style.width = '0%';
    targetBox.classList.remove('active-hold');
    targetText.textContent = `HOVER & HOLD (${TARGET_HOLD_SECS.toFixed(1)}s)`;
    feedbackEl.textContent = "STATUS: Awaiting cursor placement inside target zone.";
  }

  targetBox.addEventListener('mouseenter', (e) => {
    isHolding = true;
    targetBox.classList.add('active-hold');
    lastTargetMouseX = e.clientX;
    lastTargetMouseY = e.clientY;

    clearInterval(holdInterval);
    holdInterval = setInterval(() => {
      if (!isHolding) return;
      holdTime += 0.1;
      const pct = Math.min(100, (holdTime / TARGET_HOLD_SECS) * 100);
      cursorProgress.style.width = `${pct}%`;
      targetText.textContent = `HOLD: ${holdTime.toFixed(1)}s / ${TARGET_HOLD_SECS.toFixed(1)}s`;
      feedbackEl.textContent = `STATUS: Calibration in progress... ${(TARGET_HOLD_SECS - holdTime).toFixed(1)}s remaining.`;

      if (holdTime >= TARGET_HOLD_SECS) {
        clearInterval(holdInterval);
        isHolding = false;
        targetText.textContent = "CALIBRATION PASSED";
        feedbackEl.textContent = "STATUS: Biometric stillness verified. Advancing...";
        playAlertChime();
        setTimeout(startStage4, 300);
      }
    }, 100);
  });

  targetBox.addEventListener('mousemove', (e) => {
    if (!isHolding) return;
    const movement = Math.hypot(e.clientX - lastTargetMouseX, e.clientY - lastTargetMouseY);
    lastTargetMouseX = e.clientX;
    lastTargetMouseY = e.clientY;

    if (movement > 10) {
      holdTime = Math.max(0, holdTime - 0.2);
      feedbackEl.textContent = `⚠️ JITTER DETECTED (>10px). Micro-penalty applied (-0.2s).`;
      playTelemetryTick();
    }
  });

  targetBox.addEventListener('mouseleave', () => {
    isHolding = false;
    clearInterval(holdInterval);
    targetBox.classList.remove('active-hold');
    holdTime = 0;
    cursorProgress.style.width = '0%';
    targetText.textContent = `HOVER & HOLD (${TARGET_HOLD_SECS.toFixed(1)}s)`;
    feedbackEl.textContent = "⚠️ CURSOR EXITED: Calibration reset. Please hold steady.";
  });

  // STAGE 4: MANUAL ATTESTATION TRANSCRIPTION & ONE-CLICK AUTO-INJECT
  const phraseEl = document.getElementById('attestationPhrase');
  const attestationInput = document.getElementById('attestationInput');
  const checkLog = document.getElementById('attestationCheckLog');
  const submitBtn = document.getElementById('attestationSubmitBtn');
  const quickAttestBtn = document.getElementById('quickAttestBtn');
  let requiredPhrase = "";

  function startStage4() {
    stageBadge.textContent = "STAGE 4 / 4";
    step3.classList.add('hidden');
    step4.classList.remove('hidden');

    requiredPhrase = `I VERIFY ${activeSymbol} AT $${activeRealPrice.toFixed(2)} IS ACCURATE`;
    phraseEl.textContent = requiredPhrase;
    attestationInput.value = "";
    checkLog.textContent = `Matches: 0 / ${requiredPhrase.length} characters typed.`;
    submitBtn.disabled = true;
    submitBtn.classList.add('disabled-btn');
    submitBtn.textContent = "ATTESTATION REQUIRED TO UNLOCK";
    attestationInput.focus();
  }

  if (quickAttestBtn) {
    quickAttestBtn.addEventListener('click', () => {
      attestationInput.value = requiredPhrase;
      validateAttestationInput();
      playTelemetryTick();
    });
  }

  function validateAttestationInput() {
    const val = attestationInput.value;
    const len = val.length;

    if (val === requiredPhrase) {
      checkLog.textContent = `MATCH 100%: All ${requiredPhrase.length} characters verified against Google quote!`;
      checkLog.style.color = '#00e5a3';
      submitBtn.disabled = false;
      submitBtn.classList.remove('disabled-btn');
      submitBtn.textContent = "EXECUTE & SETTLE CONTRACT NOW";
      playTelemetryTick();
    } else if (requiredPhrase.startsWith(val)) {
      checkLog.textContent = `Typing in progress: ${len} / ${requiredPhrase.length} characters matched.`;
      checkLog.style.color = 'var(--text-dim)';
      submitBtn.disabled = true;
      submitBtn.classList.add('disabled-btn');
      submitBtn.textContent = "ATTESTATION REQUIRED TO UNLOCK";
    } else {
      checkLog.textContent = `⚠️ TYPO DETECTED: Transcription does not match target quote verification!`;
      checkLog.style.color = 'var(--stress-crimson)';
      submitBtn.disabled = true;
      submitBtn.classList.add('disabled-btn');
    }
  }

  attestationInput.addEventListener('input', validateAttestationInput);

  // ATTEMPT TRACKING STATE (USER SUCCEEDS AFTER 2 TRIES)
  let userExecutionAttempt = 1;
  const failureTitle = document.getElementById('attemptFailureTitle');
  const failureReason = document.getElementById('attemptFailureReason');
  const cooldownTimer = document.getElementById('attemptCooldownTimer');
  const retryBtn = document.getElementById('retryAttemptBtn');

  function updateAttemptUI() {
    const mainAttemptDisplay = document.getElementById('attemptNumberDisplay');
    const ritualAttemptBadge = document.getElementById('ritualAttemptBadge');
    if (mainAttemptDisplay) mainAttemptDisplay.textContent = userExecutionAttempt;
    if (ritualAttemptBadge) {
      if (userExecutionAttempt === 1) {
        ritualAttemptBadge.textContent = "ATTEMPT 1 / 2";
        ritualAttemptBadge.className = "ritual-stage-badge text-danger";
      } else {
        ritualAttemptBadge.textContent = "FINAL ATTEMPT 2 / 2 (CLEARANCE UNLOCKED)";
        ritualAttemptBadge.className = "ritual-stage-badge text-verified";
      }
    }
  }
  updateAttemptUI();

  // STAGE 4 SUBMIT -> PROGRESSES THROUGH 2 TRIES BEFORE YIELDING RESULT!
  submitBtn.addEventListener('click', async () => {
    if (attestationInput.value !== requiredPhrase) return;
    submitBtn.disabled = true;
    submitBtn.textContent = "TRANSMITTING TO SEC CLEARINGHOUSE...";

    // TRY 1: REJECT WITH RAPID DESYNC WARNING & BRISK 2-SECOND COOLDOWN
    if (userExecutionAttempt < 2) {
      setTimeout(() => {
        triggerScreenShake();
        playPanicBurst();
        step4.classList.add('hidden');
        stepFailure.classList.remove('hidden');

        let cooldownSecs = 2.0;
        const nextAttempt = userExecutionAttempt + 1;

        failureTitle.textContent = "CLEARANCE REJECTED // ATTEMPT 1 FAILED";
        failureReason.textContent = `HIGH-FREQUENCY NODE DESYNCHRONIZATION: Google Finance clearinghouse reported 14.2ms latency drift during quote capture for ${activeSymbol}. Under SEC Rule 603, trade is voided. You must complete Final Clearance Attempt (Attempt 2 of 2).`;
        retryBtn.textContent = "WAITING FOR RETRY LOCKOUT...";

        retryBtn.disabled = true;
        retryBtn.classList.add('disabled-btn');

        const cdInterval = setInterval(() => {
          cooldownSecs -= 0.1;
          if (cooldownSecs <= 0) {
            clearInterval(cdInterval);
            cooldownTimer.textContent = "MANDATORY COOLDOWN EXPIRED // READY FOR FINAL ATTEMPT";
            retryBtn.disabled = false;
            retryBtn.classList.remove('disabled-btn');
            retryBtn.textContent = `PROCEED TO FINAL CLEARANCE (ATTEMPT 2 OF 2)`;
            playAlertChime();
          } else {
            cooldownTimer.textContent = `MANDATORY COOLDOWN: 00:0${cooldownSecs.toFixed(2)}`;
          }
        }, 100);

        retryBtn.onclick = () => {
          userExecutionAttempt = nextAttempt;
          updateAttemptUI();
          stepFailure.classList.add('hidden');
          showToast(`FINAL ATTEMPT ${userExecutionAttempt} INITIALIZED: Clearance gate unlocked!`, 2500);
          startStage1();
        };

      }, 600);
      return;
    }

    // ATTEMPT 2: FULL SUCCESS! USER GETS REAL VERIFIED RESULT!
    try {
      const res = await fetch(`/api/verify-order?symbol=${activeSymbol}&shares=${currentShares}`);
      if (!res.ok) throw new Error("API route unavailable on static host");
      const receipt = await res.json();
      finishExecutionReceipt(receipt);
    } catch (e) {
      const fallbackCert = `BT-CERT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      finishExecutionReceipt({
        certificateId: fallbackCert,
        symbol: activeSymbol,
        verifiedPrice: activeRealPrice,
        executedShares: currentShares,
        notionalValue: activeRealPrice * currentShares,
        verificationHash: activeHash,
        googleFinanceSource: "GOOGLE FINANCE // L1 NASDAQ GATEWAY",
        timestamp: Date.now() / 1000
      });
    }

    // Reset attempt counter after final success
    userExecutionAttempt = 1;
    updateAttemptUI();
  });

  function finishExecutionReceipt(receipt) {
    step4.classList.add('hidden');
    step5.classList.remove('hidden');
    stageBadge.textContent = "SETTLED (2/2 SUCCESS)";
    playSuccessChord();

    const certBox = document.getElementById('settlementCertBox');
    certBox.innerHTML = `
      <div><strong>CERTIFICATE ID:</strong> <span class="text-verified">${receipt.certificateId}</span></div>
      <div><strong>UNDERLYING INSTRUMENT:</strong> ${receipt.symbol} (${receipt.symbol === 'GOOGL' ? 'Alphabet Inc' : 'NASDAQ Equities'})</div>
      <div><strong>VERIFIED EXECUTED PRICE:</strong> $${receipt.verifiedPrice.toFixed(2)} USD [GOOGLE FINANCE]</div>
      <div><strong>EXECUTED VOLUME:</strong> ${receipt.executedShares.toLocaleString()} SHARES</div>
      <div><strong>NOTIONAL SETTLEMENT:</strong> $${receipt.notionalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</div>
      <div><strong>DATA PROVENANCE:</strong> ${receipt.googleFinanceSource}</div>
      <div><strong>CRYPTOGRAPHIC PROOF:</strong> <span class="text-verified">${receipt.verificationHash}</span></div>
      <div><strong>CLEARING STATUS:</strong> COMPLETED ON ATTEMPT 3 // SEC RULE 603 SATISFIED</div>
    `;

    // Append to active positions table
    executedPositions.push(receipt);
    renderExecutedPositionsTable();

    // Log to execution tape
    const recentTrades = document.getElementById('recentTradesContainer');
    const tr = document.createElement('div');
    tr.className = 'trade-row text-verified';
    tr.innerHTML = `
      <span>YOU (${receipt.symbol})</span>
      <span>$${receipt.verifiedPrice.toFixed(2)}</span>
      <span>${receipt.executedShares.toLocaleString()}</span>
    `;
    recentTrades.prepend(tr);

    showToast(`VERIFIED EXECUTION: Contract settled on Attempt 3 with live Google Finance data!`, 6000);
  }

  function renderExecutedPositionsTable() {
    const tbody = document.getElementById('executedPositionsBody');
    const badge = document.getElementById('positionsCountBadge');
    badge.textContent = `${executedPositions.length} OPEN CONTRACT${executedPositions.length === 1 ? '' : 'S'}`;

    let html = "";
    executedPositions.forEach(pos => {
      html += `
        <tr>
          <td class="font-mono text-verified">${pos.certificateId}</td>
          <td><strong>${pos.symbol}</strong></td>
          <td class="text-verified font-mono">$${pos.verifiedPrice.toFixed(2)}</td>
          <td>${pos.executedShares.toLocaleString()}</td>
          <td class="font-mono">$${pos.notionalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          <td class="font-mono text-verified">${pos.verificationHash}</td>
          <td><span class="panel-badge-verified">SETTLED</span></td>
        </tr>
      `;
    });
    tbody.innerHTML = html;
  }

  document.getElementById('finishRitualBtn').addEventListener('click', () => {
    ritualModal.classList.add('hidden');
    heartbeatBpm = 84;
  });


  /* ==========================================================================
     7. RUNAWAY EVASIVE DIALOGS & EXPONENTIAL UNWANTED BOXES
     ========================================================================== */
  function triggerScreenShake() {
    document.body.classList.remove('screen-shake');
    void document.body.offsetWidth;
    document.body.classList.add('screen-shake');
    setTimeout(() => document.body.classList.remove('screen-shake'), 300);
  }

  const unwantedInquiries = [
    {
      title: "RISK ARBITRATION // NOTICE OF INTENT",
      question: "Confirm that you do not request an exemption from the non-voluntary collateral foreclosure?",
      subNote: "Session recorded under CFTC Directive 99-A.",
      buttons: ["[ AFFIRM FORECLOSURE ]", "[ REJECT WAIVER ]"]
    },
    {
      title: "COMPLIANCE TELEMETRY // MARGIN BREACH",
      question: "Unhedged position deficit exceeds collateral threshold. Acknowledge assignment of personal assets?",
      subNote: "Option selection is irrevocable and legally binding.",
      buttons: ["[ ACKNOWLEDGE ASSIGNMENT ]", "[ EXPAND LIABILITY ]"]
    },
    {
      title: "ALGORITHMIC DISPATCH // AUDIT ERROR",
      question: "An execution error occurred while processing the previous rejection. Re-affirm intent to decline?",
      subNote: "Further delays will incur 500x leverage penalties.",
      buttons: ["[ CONFIRM DECLINE ]", "[ DISALLOW NEGATION ]"]
    },
    {
      title: "SURVEILLANCE NOTICE // CLIENT HESITATION",
      question: "Biometric analysis indicates hesitation. Agree to automated risk liquidator handling your terminal?",
      subNote: "Inactivity triggers liquidation protocol.",
      buttons: ["[ ASSIGN AUTOMATION ]", "[ SURRENDER CONTROL ]"]
    }
  ];

  const activeRunawayBoxes = new Set();
  let lastTickTime = 0;

  function registerRunawayBox(element, options = {}) {
    if (!element) return;
    activeRunawayBoxes.add(element);
    element._offsetX = 0;
    element._offsetY = 0;
    element._escapeRadius = options.radius || 150;
    element._escapeForce = options.force || 160;
  }

  function unregisterRunawayBox(element) {
    if (!element) return;
    activeRunawayBoxes.delete(element);
  }

  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    activeRunawayBoxes.forEach(box => {
      if (!box.isConnected) {
        activeRunawayBoxes.delete(box);
        return;
      }

      const rect = box.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const boxCenterX = rect.left + rect.width / 2;
      const boxCenterY = rect.top + rect.height / 2;

      const dx = boxCenterX - mouseX;
      const dy = boxCenterY - mouseY;
      const dist = Math.hypot(dx, dy);

      const radius = box._escapeRadius || 150;

      if (dist < radius && dist > 0) {
        const angle = Math.atan2(dy, dx);
        const pushDist = (radius - dist) + (box._escapeForce || 160);

        let newOffsetX = (box._offsetX || 0) + Math.cos(angle) * pushDist;
        let newOffsetY = (box._offsetY || 0) + Math.sin(angle) * pushDist;

        const projectedLeft = rect.left + (newOffsetX - (box._offsetX || 0));
        const projectedTop = rect.top + (newOffsetY - (box._offsetY || 0));

        if (projectedLeft < 20 || projectedLeft + rect.width > window.innerWidth - 20 ||
            projectedTop < 20 || projectedTop + rect.height > window.innerHeight - 20) {
          newOffsetX = (Math.random() - 0.5) * (window.innerWidth * 0.45);
          newOffsetY = (Math.random() - 0.5) * (window.innerHeight * 0.45);
        }

        box._offsetX = newOffsetX;
        box._offsetY = newOffsetY;
        box.style.transform = `translate(${newOffsetX}px, ${newOffsetY}px)`;

        const now = Date.now();
        if (now - lastTickTime > 200) {
          playTelemetryTick();
          lastTickTime = now;
        }
      }
    });
  });

  function spawnUnwantedBox(preferredX, preferredY) {
    const viewport = document.getElementById('runawayViewport');
    if (!viewport) return;

    if (activeRunawayBoxes.size > 18) {
      const first = activeRunawayBoxes.values().next().value;
      if (first && first.classList.contains('runaway-unwanted-box')) {
        first.remove();
        unregisterRunawayBox(first);
      }
    }

    const box = document.createElement('div');
    const template = unwantedInquiries[Math.floor(Math.random() * unwantedInquiries.length)];
    box.className = 'runaway-unwanted-box';

    const posX = preferredX !== undefined ? preferredX : Math.max(30, Math.floor(Math.random() * (window.innerWidth - 360)));
    const posY = preferredY !== undefined ? preferredY : Math.max(80, Math.floor(Math.random() * (window.innerHeight - 260)));

    box.style.left = `${posX}px`;
    box.style.top = `${posY}px`;

    let buttonsHTML = '';
    template.buttons.forEach((btnText, i) => {
      buttonsHTML += `<button class="runaway-btn" data-btn-idx="${i}">${btnText}</button>`;
    });

    box.innerHTML = `
      <div class="runaway-title-bar">
        <span>${template.title}</span>
        <button class="runaway-close-btn" title="Close Window">✖</button>
      </div>
      <div class="runaway-content-body">
        <div class="runaway-question-text">${template.question}</div>
        <div class="runaway-sub-note">${template.subNote}</div>
        <div class="runaway-buttons-cluster">
          ${buttonsHTML}
        </div>
      </div>
    `;

    viewport.appendChild(box);
    registerRunawayBox(box, { radius: 155, force: 170 });

    box.querySelectorAll('.runaway-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        playAlertChime();
        triggerScreenShake();
        showToast("AUDIT ESCALATION: 2 supplementary confirmation notices issued.", 2500);
        spawnUnwantedBox();
        spawnUnwantedBox();
      });
    });

    const closeBtn = box.querySelector('.runaway-close-btn');
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      playAlertChime();
      triggerScreenShake();
      box.remove();
      unregisterRunawayBox(box);
      showToast("CLOSURE REJECTED: 3 replacement arbitration notices generated.", 3000);
      spawnUnwantedBox();
      spawnUnwantedBox();
      spawnUnwantedBox();
    });

    playAlertChime();
  }


  /* ==========================================================================
     8. MAIN CONFIRMATION MODALS (FOR INSTANT BYPASS BUTTONS)
     ========================================================================== */
  const multiLayerModal = document.getElementById('multiLayerModal');
  const layer1 = document.getElementById('modalLayer1');
  const layer2 = document.getElementById('modalLayer2');
  const layer3 = document.getElementById('modalLayer3');
  const trapModal = document.getElementById('unskippableTrapModal');
  const acceptPenaltyBtn = document.getElementById('acceptPenaltyBtn');

  registerRunawayBox(layer1, { radius: 140, force: 150 });
  registerRunawayBox(layer2, { radius: 140, force: 150 });
  registerRunawayBox(layer3, { radius: 140, force: 150 });
  registerRunawayBox(document.querySelector('.trap-box'), { radius: 140, force: 150 });

  window.triggerMultiLayerModal = function(orderType = "ARBITRARY") {
    multiLayerModal.classList.remove('hidden');
    layer1.classList.remove('hidden');
    layer2.classList.add('hidden');
    layer3.classList.add('hidden');
    layer1._offsetX = 0;
    layer1._offsetY = 0;
    layer1.style.transform = 'translate(0px, 0px)';
  };

  const layer1BtnNo = document.getElementById('layer1BtnNo');
  const layer1BtnReject = document.getElementById('layer1BtnReject');

  layer1BtnNo.addEventListener('click', () => {
    triggerScreenShake();
    playAlertChime();
    showToast("ARBITRATION RECORDED: Spawning 2 verification notices.", 3000);
    layer1.classList.add('hidden');
    layer2.classList.remove('hidden');
    layer2._offsetX = 0;
    layer2._offsetY = 0;
    layer2.style.transform = 'translate(0px, 0px)';
    spawnUnwantedBox();
    spawnUnwantedBox();
  });

  layer1BtnReject.addEventListener('click', () => {
    triggerScreenShake();
    playAlertChime();
    showToast("REJECTION DENIED: Spawning 2 verification notices.", 3000);
    layer1.classList.add('hidden');
    layer2.classList.remove('hidden');
    layer2._offsetX = 0;
    layer2._offsetY = 0;
    layer2.style.transform = 'translate(0px, 0px)';
    spawnUnwantedBox();
    spawnUnwantedBox();
  });

  const layer2BtnDisallow = document.getElementById('layer2BtnDisallow');
  const layer2BtnProceed = document.getElementById('layer2BtnProceed');

  layer2BtnDisallow.addEventListener('click', () => {
    triggerScreenShake();
    playAlertChime();
    showToast("CONFIRMATION SUSPENDED: Spawning 3 audit notices.", 3000);
    layer2.classList.add('hidden');
    layer3.classList.remove('hidden');
    layer3._offsetX = 0;
    layer3._offsetY = 0;
    layer3.style.transform = 'translate(0px, 0px)';
    spawnUnwantedBox();
    spawnUnwantedBox();
    spawnUnwantedBox();
  });

  layer2BtnProceed.addEventListener('click', () => {
    triggerScreenShake();
    playAlertChime();
    showToast("PROCEEDING INITIATED: Spawning 3 audit notices.", 3000);
    layer2.classList.add('hidden');
    layer3.classList.remove('hidden');
    layer3._offsetX = 0;
    layer3._offsetY = 0;
    layer3.style.transform = 'translate(0px, 0px)';
    spawnUnwantedBox();
    spawnUnwantedBox();
    spawnUnwantedBox();
  });

  const layer3BtnAbstain = document.getElementById('layer3BtnAbstain');
  const layer3BtnDesist = document.getElementById('layer3BtnDesist');

  function completeHostileTrade() {
    multiLayerModal.classList.add('hidden');
    triggerScreenShake();
    playPanicBurst();
    showToast("BYPASS DENIED: Instant order cancelled. Use Verified Ritual to trade.", 4000);
    spawnUnwantedBox();
    spawnUnwantedBox();
    spawnUnwantedBox();
  }

  layer3BtnAbstain.addEventListener('click', completeHostileTrade);
  layer3BtnDesist.addEventListener('click', completeHostileTrade);

  function triggerCloseTrap(e) {
    if (e) e.stopPropagation();
    trapModal.classList.remove('hidden');
    triggerScreenShake();
    playAlertChime();
    slider.value = 1000000;
    updateOrderMath(1000000);
    spawnUnwantedBox();
    spawnUnwantedBox();
  }

  document.getElementById('modalCloseX1').addEventListener('click', triggerCloseTrap);
  document.getElementById('modalCloseX2').addEventListener('click', triggerCloseTrap);
  document.getElementById('modalCloseX3').addEventListener('click', triggerCloseTrap);

  acceptPenaltyBtn.addEventListener('click', () => {
    trapModal.classList.add('hidden');
    multiLayerModal.classList.add('hidden');
    triggerScreenShake();
    playAlertChime();
    showToast("PENALTY RATIFIED: Position pinned to 1,000,000 shares.", 3500);
    spawnUnwantedBox();
    spawnUnwantedBox();
  });


  /* ==========================================================================
     9. EVASIVE NAVIGATION BUTTONS
     ========================================================================== */
  const evasiveLogoutBtn = document.getElementById('evasiveLogoutBtn');
  const evasivePanicBtn = document.getElementById('evasivePanicBtn');

  function makeEvasive(btn, triggerRadius = 70) {
    window.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const distX = e.clientX - btnCenterX;
      const distY = e.clientY - btnCenterY;
      const dist = Math.hypot(distX, distY);

      if (dist < triggerRadius) {
        const angle = Math.atan2(distY, distX);
        const escapeX = -Math.cos(angle) * (triggerRadius + 40);
        const escapeY = -Math.sin(angle) * (triggerRadius + 40);

        btn.style.transform = `translate(${escapeX}px, ${escapeY}px)`;
        playTelemetryTick();
      } else if (dist > triggerRadius * 2) {
        btn.style.transform = 'translate(0px, 0px)';
      }
    });

    btn.addEventListener('click', () => {
      showToast("ACTION REFUSED: Session termination prohibited by risk controller.", 3000);
    });
  }

  makeEvasive(evasiveLogoutBtn, 75);
  makeEvasive(evasivePanicBtn, 65);


  /* ==========================================================================
     10. HYDRA AUDIT ALERTS
     ========================================================================== */
  const hydraContainer = document.getElementById('hydraContainer');
  let activeHydras = 0;

  const realSpamStocks = [
    { sym: "GOOGL", name: "Alphabet Class A", surge: "-0.53%", desc: "Google Finance L1 primary liquidity block." },
    { sym: "NVDA", name: "NVIDIA Corporation", surge: "-0.72%", desc: "High-frequency hedge pool rebalancing active." },
    { sym: "TSLA", name: "Tesla Inc.", surge: "-1.29%", desc: "Unhedged liquidation cascade detected." }
  ];

  function spawnHydraPopup() {
    if (activeHydras > 5) return;
    activeHydras++;

    const stock = realSpamStocks[Math.floor(Math.random() * realSpamStocks.length)];
    const card = document.createElement('div');
    card.className = 'hydra-card';

    const maxTop = window.innerHeight - 200;
    const maxLeft = window.innerWidth - 320;
    const top = Math.max(80, Math.floor(Math.random() * maxTop));
    const left = Math.max(20, Math.floor(Math.random() * maxLeft));

    card.style.top = `${top}px`;
    card.style.left = `${left}px`;

    card.innerHTML = `
      <div class="hydra-header">
        <span>ALERT // REAL GOOGLE DATA AUDIT</span>
        <button class="hydra-close-btn" title="Dismiss">✖</button>
      </div>
      <div class="hydra-body">
        <div class="hydra-title">${stock.sym} DELTA: <span class="text-danger">${stock.surge}</span></div>
        <p class="hydra-desc">${stock.desc}</p>
        <div class="hydra-timer-bar"><div class="hydra-timer-fill"></div></div>
        <button class="hydra-buy-btn">VERIFY ${stock.sym} QUOTE</button>
      </div>
    `;

    const closeBtn = card.querySelector('.hydra-close-btn');
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      card.remove();
      activeHydras--;
      showToast("HYDRA PROTOCOL: 1 Alert dismissed, 2 new risk events opened.", 2000);
      setTimeout(spawnHydraPopup, 300);
      setTimeout(spawnHydraPopup, 600);
    });

    const buyBtn = card.querySelector('.hydra-buy-btn');
    buyBtn.addEventListener('click', () => {
      applyActiveStockData(stock.sym);
      card.remove();
      activeHydras--;
      showToast(`CONTRACT SWITCHED: Active symbol set to ${stock.sym}`, 2500);
    });

    hydraContainer.appendChild(card);
  }

  setInterval(spawnHydraPopup, 9000);


  /* ==========================================================================
     11. REVERSE ORDER BOOK
     ========================================================================== */
  const orderBook = document.getElementById('reverseOrderBook');
  const asksContainer = document.getElementById('asksContainer');
  const bidsContainer = document.getElementById('bidsContainer');

  orderBook.addEventListener('wheel', (e) => {
    e.preventDefault();
    orderBook.scrollTop -= e.deltaY;
  }, { passive: false });

  function populateOrderBook() {
    let asksHTML = "";
    for (let i = 5; i >= 1; i--) {
      const price = (activeRealPrice + i * 0.15).toFixed(2);
      const qty = (Math.random() * 8000 + 500).toFixed(0);
      asksHTML += `
        <div class="book-row ask">
          <span>${price}</span>
          <span>${qty}</span>
          <span>ASK</span>
        </div>
      `;
    }
    asksContainer.innerHTML = asksHTML;

    let bidsHTML = "";
    for (let i = 1; i <= 5; i++) {
      const price = (activeRealPrice - i * 0.15).toFixed(2);
      const qty = (Math.random() * 8000 + 500).toFixed(0);
      bidsHTML += `
        <div class="book-row bid">
          <span>${price}</span>
          <span>${qty}</span>
          <span>BID</span>
        </div>
      `;
    }
    bidsContainer.innerHTML = bidsHTML;
  }
  populateOrderBook();
  setInterval(populateOrderBook, 1400);


  /* ==========================================================================
     12. COOKIE, CAPTCHA & WATCHLIST CLICK
     ========================================================================== */
  const cookieBanner = document.getElementById('cookieHostageBanner');
  const cookieAcceptBtn = document.getElementById('cookieAcceptBtn');
  const cookieCustomizeBtn = document.getElementById('cookieCustomizeBtn');

  cookieAcceptBtn.addEventListener('click', () => {
    cookieBanner.style.display = 'none';
    triggerScreenShake();
    playAlertChime();
    showToast("DATA CONSENT RATIFIED: 15% equity collateral transferred.", 3000);
    spawnUnwantedBox();
    spawnUnwantedBox();
  });

  cookieCustomizeBtn.addEventListener('click', () => {
    cookieCustomizeBtn.style.transform = `translateX(${(Math.random() - 0.5) * 30}px)`;
    triggerScreenShake();
    playAlertChime();
    showToast("ACCESS DENIED: Customization prohibited by risk engine.", 2500);
    spawnUnwantedBox();
  });

  window.toggleCaptchaTile = function(el) {
    el.classList.toggle('selected');
    const selectedCount = document.querySelectorAll('.captcha-cell.selected').length;
    const statusEl = document.getElementById('captchaStatus');
    triggerScreenShake();
    playAlertChime();
    spawnUnwantedBox();

    if (selectedCount === 4) {
      statusEl.textContent = "VERIFICATION FAILED: All selected assets defaulted.";
      statusEl.style.color = "var(--stress-crimson)";
      spawnUnwantedBox();
      spawnUnwantedBox();
    } else {
      statusEl.textContent = `Awaiting validation (${selectedCount}/4 Selected) - Verification impossible`;
      statusEl.style.color = "var(--text-dim)";
    }
  };

  const watchlistRows = document.querySelectorAll('.watchlist-row');
  watchlistRows.forEach(row => {
    row.addEventListener('click', () => {
      watchlistRows.forEach(r => r.classList.remove('active-row'));
      row.classList.add('active-row');
      const sym = row.getAttribute('data-symbol');
      applyActiveStockData(sym);
      showToast(`CONTRACT SWITCHED: ${sym} loaded from Google Finance.`, 2000);
    });
  });

  const toastContainer = document.getElementById('toastContainer');
  function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'hostile-toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }

});
