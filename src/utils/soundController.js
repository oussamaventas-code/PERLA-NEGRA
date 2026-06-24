let audioCtx = null;
let isMuted = true;

// --- Música épica de fondo (archivo real) ---
// Coloca el archivo en: public/audio/epic.mp3
let bgMusic = null;
let fadeTimer = null;
const MUSIC_SRC = '/audio/epic.mp3';
const MUSIC_VOLUME = 0.6; // Volumen objetivo (0 a 1). Súbelo/bájalo aquí.

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

// Fundido del volumen de la música hasta un valor objetivo
const fadeMusic = (target, ms, onDone) => {
  if (!bgMusic) return;
  clearInterval(fadeTimer);
  const steps = 30;
  const stepTime = Math.max(ms / steps, 10);
  const start = bgMusic.volume;
  const delta = (target - start) / steps;
  let i = 0;
  fadeTimer = setInterval(() => {
    i++;
    const v = Math.min(1, Math.max(0, start + delta * i));
    bgMusic.volume = v;
    if (i >= steps) {
      clearInterval(fadeTimer);
      bgMusic.volume = target;
      if (onDone) onDone();
    }
  }, stepTime);
};

export const playAmbient = () => {
  if (isMuted) return;
  try {
    if (!bgMusic) {
      bgMusic = new Audio(MUSIC_SRC);
      bgMusic.loop = true;
      bgMusic.preload = 'auto';
    }
    bgMusic.currentTime = 0; // Empieza desde el inicio para que "entre fuerte"
    bgMusic.volume = 0;
    bgMusic.play().catch((e) => console.warn('La música no pudo reproducirse:', e));
    fadeMusic(MUSIC_VOLUME, 600); // Entrada rápida y potente
  } catch (e) {
    console.warn('Música de fondo falló:', e);
  }
};

export const stopAmbient = () => {
  if (!bgMusic) return;
  fadeMusic(0, 400, () => {
    try {
      bgMusic.pause();
    } catch {
      // Silent catch
    }
  });
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
