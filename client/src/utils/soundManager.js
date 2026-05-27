// Sound manager using Howler for better control
import { Howl } from 'howler';

// Sound URLs - using data URIs and reliable sources
const sounds = {
  // Simple beep sounds as fallback
  open: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
  close: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
  click: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
  minimize: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
  maximize: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
  drag: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
  error: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
  startup: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
  shutdown: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
  folder: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
  file: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA=='
};

class SoundManager {
  constructor() {
    this.sounds = {};
    this.enabled = true;
    this.volume = 0.5;
    this.audioUnlocked = false;
    this.audioContext = null;
    this.loadSounds();
    this.initAudioContext();
  }

  // Initialize audio context early
  initAudioContext() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioContext = new AudioContext();
        console.log('✅ AudioContext initialized');
      }
    } catch (error) {
      console.error('Error initializing AudioContext:', error);
    }
  }

  // ✅ INIT METHOD FOR UNLOCKING AUDIO ON FIRST CLICK
  init() {
    if (!this.audioUnlocked && this.audioContext) {
      try {
        if (this.audioContext.state === 'suspended') {
          this.audioContext.resume().then(() => {
            console.log('✅ Audio Context Resumed');
          });
        }
        this.audioUnlocked = true;
      } catch (error) {
        console.error('Error unlocking audio:', error);
      }
    }
  }

  // ✅ WEB AUDIO API FALLBACK - Generate simple beep sounds
  playBeep(frequency = 1000, duration = 100) {
    try {
      if (!this.audioContext || !this.enabled) return;
      
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration / 1000);
      
      console.log(`🔊 Beep played (${frequency}Hz, ${duration}ms)`);
    } catch (error) {
      console.error('Beep generation failed:', error);
    }
  }

  loadSounds() {
    Object.entries(sounds).forEach(([key, url]) => {
      try {
        this.sounds[key] = new Howl({
          src: [url],
          volume: this.volume,
          html5: false,
          preload: false,
          onload: () => {
            console.log(`✅ Sound loaded: ${key}`);
          },
          onloaderror: (id, error) => {
            console.warn(`⚠️ Failed to load sound ${key}:`, error);
            // Will fallback to beep
          },
          onplayerror: (id, error) => {
            console.warn(`⚠️ Failed to play sound ${key}:`, error);
          }
        });
      } catch (error) {
        console.error(`Error creating Howl for ${key}:`, error);
      }
    });
  }

  play(soundName) {
    if (!this.enabled) return;

    try {
      // Unlock audio on first play
      if (!this.audioUnlocked) {
        this.init();
      }

      // Map sound names to frequencies and types
      const soundMap = {
        'open': { freq: 800, duration: 150 },
        'close': { freq: 600, duration: 100 },
        'click': { freq: 1000, duration: 50 },
        'minimize': { freq: 900, duration: 80 },
        'maximize': { freq: 1100, duration: 80 },
        'drag': { freq: 700, duration: 40 },
        'error': { freq: 200, duration: 200 },
        'startup': { freq: 1200, duration: 100 },
        'shutdown': { freq: 400, duration: 100 },
        'folder': { freq: 950, duration: 60 },
        'file': { freq: 1050, duration: 60 }
      };

      const soundConfig = soundMap[soundName] || { freq: 1000, duration: 50 };

      // Try Howler first
      if (this.sounds[soundName]) {
        try {
          const sound = this.sounds[soundName];
          if (sound.state && sound.state() === 'loaded') {
            sound.play();
            console.log(`🔊 Playing: ${soundName} (Howler)`);
          } else {
            // Fallback to beep if Howler sound not loaded
            this.playBeep(soundConfig.freq, soundConfig.duration);
            console.log(`🔊 Playing: ${soundName} (Web Audio Beep)`);
          }
        } catch (error) {
          console.warn(`Howler play failed, using Web Audio:`, error);
          this.playBeep(soundConfig.freq, soundConfig.duration);
        }
      } else {
        // Direct Web Audio API beep
        this.playBeep(soundConfig.freq, soundConfig.duration);
      }
    } catch (error) {
      console.error(`Sound playback failed for ${soundName}:`, error);
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    console.log(`🔊 Sound ${this.enabled ? 'enabled' : 'disabled'}`);
    return this.enabled;
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    Object.values(this.sounds).forEach(sound => {
      if (sound && sound.volume) {
        sound.volume(this.volume);
      }
    });
    console.log(`🔊 Volume: ${(this.volume * 100).toFixed(0)}%`);
  }
}

export const soundManager = new SoundManager();