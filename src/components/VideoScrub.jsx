"use client";

import { useEffect, useRef } from "react";

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export default function VideoScrub() {
  const sceneRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const video = videoRef.current;
    if (!scene || !video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let duration = 10;
    let targetTime = 0;
    let renderedTime = 0;
    let frameId = null;
    let seeking = false;
    let pendingTime = null;

    const getEndScroll = () => {
      const contact = document.getElementById("contact-section");
      if (!contact) {
        return Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      }

      return Math.max(
        1,
        contact.offsetTop + contact.offsetHeight * 0.35 - window.innerHeight * 0.5,
      );
    };

    const updateTarget = () => {
      const progress = clamp(window.scrollY / getEndScroll());
      targetTime = progress * duration;
      scene.style.setProperty("--scrub-progress", progress.toFixed(4));
      scene.style.setProperty("--video-scale", `${1.015 + progress * 0.035}`);
    };

    const flushSeek = () => {
      if (pendingTime === null) {
        seeking = false;
        return;
      }

      const nextTime = pendingTime;
      pendingTime = null;

      if (Math.abs(video.currentTime - nextTime) < 0.025) {
        seeking = false;
        return;
      }

      seeking = true;
      video.currentTime = nextTime;
    };

    const seek = (time) => {
      pendingTime = clamp(time, 0, duration);
      if (!seeking) flushSeek();
    };

    const tick = () => {
      const smoothing = window.innerWidth < 768 ? 0.24 : 0.18;
      renderedTime += (targetTime - renderedTime) * smoothing;

      if (!reducedMotion.matches && Math.abs(video.currentTime - renderedTime) > 0.025) {
        seek(renderedTime);
      }

      frameId = requestAnimationFrame(tick);
    };

    const onMetadata = () => {
      if (Number.isFinite(video.duration)) duration = video.duration;
      renderedTime = clamp((window.scrollY / getEndScroll()) * duration, 0, duration);
      targetTime = renderedTime;
      video.currentTime = renderedTime;
    };

    video.addEventListener("loadedmetadata", onMetadata);
    video.addEventListener("seeked", flushSeek);
    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget, { passive: true });

    if (video.readyState >= 1) onMetadata();
    updateTarget();
    frameId = requestAnimationFrame(tick);

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      video.removeEventListener("loadedmetadata", onMetadata);
      video.removeEventListener("seeked", flushSeek);
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
    };
  }, []);

  return (
    <div ref={sceneRef} className="video-scene" aria-hidden="true">
      <div className="mobile-video-backdrop" />
      <video
        ref={videoRef}
        src="/videos/optimized_junseo-scrub.mp4"
        poster="/photo/junseo-video-poster.webp"
        className="scene-video"
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
      />

      <div className="screen-glow" />
      <div className="floating-particles">
        <span /><span /><span /><span /><span /><span />
      </div>
      <div className="scene-shade" />
      <div className="scene-vignette" />

      <style jsx>{`
        .video-scene {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
          background: #050302;
          --video-scale: 1.015;
        }

        .scene-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          transform: scale(var(--video-scale));
          transform-origin: center;
          will-change: transform;
          filter: saturate(0.92) contrast(1.03);
        }

        .mobile-video-backdrop {
          display: none;
        }

        .screen-glow {
          position: absolute;
          right: 4%;
          bottom: -14%;
          width: 48vw;
          height: 48vw;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 111, 24, 0.14), transparent 68%);
          filter: blur(28px);
          mix-blend-mode: screen;
          animation: glowPulse 4s ease-in-out infinite alternate;
        }

        .scene-shade,
        .scene-vignette {
          position: absolute;
          inset: 0;
        }

        .scene-shade {
          background: linear-gradient(90deg, rgba(4, 3, 3, 0.88) 0%, rgba(4, 3, 3, 0.54) 34%, rgba(4, 3, 3, 0.08) 66%);
        }

        .scene-vignette {
          background:
            linear-gradient(to bottom, rgba(0, 0, 0, 0.35), transparent 24%, transparent 68%, rgba(0, 0, 0, 0.68)),
            radial-gradient(ellipse at center, transparent 42%, rgba(0, 0, 0, 0.34) 100%);
        }

        .floating-particles span {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #ff8a3d;
          box-shadow: 0 0 12px 2px rgba(255, 106, 26, 0.55);
          animation: particleFloat 5s ease-in-out infinite alternate;
        }

        .floating-particles span:nth-child(1) { left: 12%; top: 24%; animation-delay: -0.8s; }
        .floating-particles span:nth-child(2) { left: 31%; top: 72%; animation-delay: -2.1s; opacity: 0.45; }
        .floating-particles span:nth-child(3) { left: 53%; top: 18%; animation-delay: -3.2s; opacity: 0.35; }
        .floating-particles span:nth-child(4) { left: 74%; top: 64%; animation-delay: -1.5s; opacity: 0.5; }
        .floating-particles span:nth-child(5) { left: 87%; top: 31%; animation-delay: -4.1s; opacity: 0.7; }
        .floating-particles span:nth-child(6) { left: 94%; top: 78%; animation-delay: -2.8s; opacity: 0.4; }

        @keyframes particleFloat {
          from { transform: translate3d(0, 9px, 0) scale(0.7); }
          to { transform: translate3d(5px, -15px, 0) scale(1.2); }
        }

        @keyframes glowPulse {
          from { opacity: 0.45; transform: scale(0.94); }
          to { opacity: 0.9; transform: scale(1.08); }
        }

        @media (max-width: 767px) {
          .mobile-video-backdrop {
            display: block;
            position: absolute;
            inset: -8%;
            background-image: url('/photo/junseo-video-poster.webp');
            background-size: cover;
            background-position: 64% center;
            filter: blur(22px) brightness(0.52) saturate(0.82);
            transform: scale(1.16);
          }

          .scene-video {
            inset: 40% auto auto -104%;
            width: 230%;
            max-width: none;
            height: auto;
            object-fit: contain;
            object-position: center;
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 82%, transparent 100%);
            mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 82%, transparent 100%);
          }

          .scene-shade {
            background: linear-gradient(90deg, rgba(4, 3, 3, 0.83) 0%, rgba(4, 3, 3, 0.55) 58%, rgba(4, 3, 3, 0.16) 100%);
          }

          .screen-glow {
            width: 95vw;
            height: 95vw;
            right: -35%;
            bottom: 5%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .floating-particles span,
          .screen-glow {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
