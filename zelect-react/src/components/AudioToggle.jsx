import { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';

/* ═══════════════════════════════════════════════════════════
   AMBIENT FOREST AUDIO TOGGLE
   ═══════════════════════════════════════════════════════════
   - Plays ambient forest sound on user interaction
   - Smooth GSAP-driven volume fade in/out
   - Persists preference to localStorage
   - Starts at 20% volume
   - Respects browser autoplay policies
   ═══════════════════════════════════════════════════════════ */

const TARGET_VOLUME = 0.2; // 20% max volume
const FADE_DURATION = 1.5; // seconds for fade in/out
const LS_KEY = 'forest-audio-preference';

const AudioToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);
  const volumeObjRef = useRef({ value: 0 }); // GSAP-animatable proxy
  const buttonRef = useRef(null);

  /* ─── Create audio element once ─── */
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0;
    audio.preload = 'none'; // Don't download until needed
    // Creative Commons ambient forest night sounds
    audio.src = 'https://cdn.freesound.org/previews/515/515823_11306307-lq.mp3';
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  /* ─── Wait for first user interaction before attempting playback ─── */
  useEffect(() => {
    const savedPref = localStorage.getItem(LS_KEY) === 'true';

    const handleFirstInteraction = () => {
      setHasInteracted(true);
      if (savedPref) {
        setIsPlaying(true);
      }
      // Clean up — only need the first interaction
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  /* ─── Play/Pause with smooth GSAP volume fading ─── */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasInteracted) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise) {
        playPromise.then(() => {
          // Smooth fade IN using GSAP
          volumeObjRef.current.value = audio.volume;
          gsap.to(volumeObjRef.current, {
            value: TARGET_VOLUME,
            duration: FADE_DURATION,
            ease: 'power2.out',
            onUpdate: () => {
              if (audioRef.current) {
                audioRef.current.volume = Math.max(0, Math.min(1, volumeObjRef.current.value));
              }
            },
          });
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    } else {
      // Smooth fade OUT using GSAP
      volumeObjRef.current.value = audio.volume;
      gsap.to(volumeObjRef.current, {
        value: 0,
        duration: FADE_DURATION,
        ease: 'power2.in',
        onUpdate: () => {
          if (audioRef.current) {
            audioRef.current.volume = Math.max(0, Math.min(1, volumeObjRef.current.value));
          }
        },
        onComplete: () => {
          if (audioRef.current) {
            audioRef.current.pause();
          }
        },
      });
    }

    localStorage.setItem(LS_KEY, String(isPlaying));
  }, [isPlaying, hasInteracted]);

  const toggle = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  /* ─── Pulse animation on the button icon ─── */
  useEffect(() => {
    if (!buttonRef.current) return;
    if (isPlaying) {
      gsap.to(buttonRef.current, {
        boxShadow: '0 0 20px rgba(0,191,255,0.35), 0 0 60px rgba(0,191,255,0.1)',
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    } else {
      gsap.killTweensOf(buttonRef.current);
      gsap.to(buttonRef.current, {
        boxShadow: '0 0 10px rgba(0,191,255,0.08)',
        duration: 0.4,
      });
    }
  }, [isPlaying]);

  return (
    <button
      ref={buttonRef}
      onClick={toggle}
      className="forest-audio-toggle"
      aria-label={isPlaying ? 'Mute ambient forest audio' : 'Play ambient forest audio'}
      title={isPlaying ? 'Mute Forest Ambience' : 'Play Forest Ambience'}
    >
      <span className="forest-audio-icon">
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </span>
      <span className="forest-audio-label">
        {isPlaying ? 'Mute' : 'Sound'}
      </span>
    </button>
  );
};

export default AudioToggle;
