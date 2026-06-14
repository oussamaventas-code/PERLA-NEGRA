let audioCtx = null;
let ambientOsc = null;
let ambientFilter = null;
let ambientGain = null;
let lfo = null;
let lfoGain = null;
let isMuted = true;

export const initAudio = () => {
  if (typeof window === 'undefined') return;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export const playClick = () => {
  if (isMuted || !audioCtx) return;
  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1000, audioCtx.currentTime); // Tono agudo limpio
    osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.03); // Caída rápida

    gainNode.gain.setValueAtTime(0.015, audioCtx.currentTime); // Muy suave y elegante
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.03);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.03);
  } catch (e) {
    console.warn('Audio failed to play:', e);
  }
};

export const playAmbient = () => {
  if (isMuted) return;
  try {
    initAudio();
    if (ambientOsc) return; // Ya está sonando

    ambientOsc = audioCtx.createOscillator();
    ambientFilter = audioCtx.createBiquadFilter();
    ambientGain = audioCtx.createGain();

    ambientOsc.type = 'triangle';
    ambientOsc.frequency.setValueAtTime(55, audioCtx.currentTime); // Nota La1 (A1) muy grave

    ambientFilter.type = 'lowpass';
    ambientFilter.frequency.setValueAtTime(80, audioCtx.currentTime); // Filtro ultra cerrado para un zumbido profundo
    ambientFilter.Q.setValueAtTime(1, audioCtx.currentTime);

    // Ganancia sutil y progresiva
    ambientGain.gain.setValueAtTime(0, audioCtx.currentTime);
    ambientGain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 2.0); // Entrada suave en 2 segundos

    ambientOsc.connect(ambientFilter);
    ambientFilter.connect(ambientGain);
    ambientGain.connect(audioCtx.destination);

    // LFO lento para simular la respiración del espacio
    lfo = audioCtx.createOscillator();
    lfoGain = audioCtx.createGain();
    lfo.frequency.setValueAtTime(0.12, audioCtx.currentTime); // Frecuencia de 0.12Hz
    lfoGain.gain.setValueAtTime(0.04, audioCtx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(ambientGain.gain);

    ambientOsc.start();
    lfo.start();
  } catch (e) {
    console.warn('Ambient drone failed to start:', e);
  }
};

export const stopAmbient = () => {
  try {
    if (ambientGain && audioCtx) {
      // Desvanecimiento suave de salida antes de apagar
      ambientGain.gain.cancelScheduledValues(audioCtx.currentTime);
      ambientGain.gain.setValueAtTime(ambientGain.gain.value, audioCtx.currentTime);
      ambientGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
      
      const oscToStop = ambientOsc;
      const lfoToStop = lfo;
      
      setTimeout(() => {
        try {
          if (oscToStop) oscToStop.stop();
          if (lfoToStop) lfoToStop.stop();
        } catch {
          // Silent catch for node stopping
        }
      }, 500);
    }
  } catch (e) {
    console.warn('Ambient drone failed to stop:', e);
  }
  ambientOsc = null;
  lfo = null;
};

export const toggleMute = () => {
  isMuted = !isMuted;
  if (!isMuted) {
    initAudio();
    playAmbient();
  } else {
    stopAmbient();
  }
  return isMuted;
};

export const getMuteState = () => isMuted;
