import { useCallback, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface CatPlanetIntroProps {
  onComplete: () => void
}

const title = '猫咪星球'
const paws = Array.from({ length: 9 }, (_, index) => index)
const sparkles = Array.from({ length: 18 }, (_, index) => index)

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function CatPlanetIntro({ onComplete }: CatPlanetIntroProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const completedRef = useRef(false)

  const complete = useCallback(() => {
    if (completedRef.current) return
    completedRef.current = true
    onComplete()
  }, [onComplete])

  const skip = () => {
    if (!rootRef.current || completedRef.current) return
    timelineRef.current?.kill()
    gsap.to(rootRef.current, {
      autoAlpha: 0,
      scale: 1.02,
      duration: prefersReducedMotion() ? 0.01 : 0.18,
      ease: 'power2.out',
      overwrite: true,
      onComplete: complete,
    })
  }

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const reduceMotion = prefersReducedMotion()
    const context = gsap.context(() => {
      if (reduceMotion) {
        timelineRef.current = gsap.timeline({ onComplete: complete })
          .fromTo(
            root,
            { autoAlpha: 1 },
            { autoAlpha: 0, delay: 0.25, duration: 0.35, ease: 'power2.out' },
          )
        return
      }

      gsap.set(root, {
        autoAlpha: 1,
        clipPath: 'circle(150% at 50% 52%)',
      })
      gsap.set('.cat-intro-veil', { scaleX: 0, transformOrigin: 'left center' })
      gsap.set('.cat-intro-paw', {
        autoAlpha: 0,
        scale: 0.35,
        y: 18,
        rotate: -12,
      })
      gsap.set('.cat-intro-sparkle', {
        autoAlpha: 0,
        scale: 0,
        y: 10,
      })
      gsap.set('.cat-intro-logo', {
        autoAlpha: 0,
        scale: 0.45,
        rotate: -8,
        filter: 'blur(10px)',
      })
      gsap.set('.cat-intro-title-char', {
        autoAlpha: 0,
        y: 26,
        rotateX: -38,
        filter: 'blur(8px)',
      })
      gsap.set('.cat-intro-subtitle, .cat-intro-skip', {
        autoAlpha: 0,
        y: 10,
      })
      gsap.set('.cat-intro-orbit', {
        autoAlpha: 0,
        scale: 0.72,
        rotate: -18,
      })

      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: complete,
      })

      timeline
        .to('.cat-intro-veil', {
          scaleX: 1,
          duration: 0.5,
          ease: 'power2.out',
        }, 0)
        .to('.cat-intro-sparkle', {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.44,
          stagger: { each: 0.018, from: 'random' },
        }, 0.12)
        .to('.cat-intro-paw', {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          rotate: 0,
          duration: 0.58,
          ease: 'back.out(1.9)',
          stagger: { each: 0.035, from: 'random' },
        }, 0.2)
        .to('.cat-intro-logo', {
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          filter: 'blur(0px)',
          duration: 0.7,
          ease: 'back.out(1.55)',
        }, 0.48)
        .to('.cat-intro-orbit', {
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          duration: 0.72,
          ease: 'power3.out',
          stagger: 0.08,
        }, 0.72)
        .to('.cat-intro-title-char', {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 0.5,
          ease: 'back.out(1.75)',
          stagger: 0.055,
        }, 0.78)
        .to('.cat-intro-subtitle, .cat-intro-skip', {
          autoAlpha: 1,
          y: 0,
          duration: 0.34,
          ease: 'power2.out',
        }, 1.24)
        .to('.cat-intro-orbit', {
          rotate: 360,
          duration: 1.1,
          ease: 'none',
          stagger: 0.04,
        }, 1.16)
        .to('.cat-intro-logo', {
          y: -5,
          scale: 1.04,
          duration: 0.52,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: 1,
        }, 1.3)
        .to('.cat-intro-paw, .cat-intro-sparkle', {
          autoAlpha: 0,
          scale: 0.82,
          y: -10,
          duration: 0.38,
          ease: 'power2.in',
          stagger: { each: 0.009, from: 'edges' },
        }, 1.95)
        .to(root, {
          clipPath: 'circle(0% at 50% 52%)',
          autoAlpha: 0,
          scale: 1.025,
          duration: 0.7,
          ease: 'power3.inOut',
        }, 2.1)

      timelineRef.current = timeline
    }, root)

    return () => {
      timelineRef.current?.kill()
      context.revert()
    }
  }, [complete])

  return (
    <div ref={rootRef} className="cat-intro-overlay" aria-label="猫咪星球开场动画">
      <div className="cat-intro-veil" aria-hidden="true" />

      <div className="cat-intro-field" aria-hidden="true">
        {sparkles.map((sparkle) => (
          <span
            key={sparkle}
            className={`cat-intro-sparkle sparkle-${sparkle + 1}`}
          />
        ))}
        {paws.map((paw) => (
          <span key={paw} className={`cat-intro-paw paw-${paw + 1}`}>
            <span />
            <span />
            <span />
            <span />
          </span>
        ))}
      </div>

      <div className="cat-intro-stage">
        <div className="cat-intro-logo" aria-hidden="true">
          <span className="cat-intro-ear left" />
          <span className="cat-intro-ear right" />
          <span className="cat-intro-face">
            <span className="cat-intro-eye left" />
            <span className="cat-intro-eye right" />
            <span className="cat-intro-mouth">3</span>
          </span>
          <span className="cat-intro-orbit orbit-one" />
          <span className="cat-intro-orbit orbit-two" />
        </div>

        <h1 className="cat-intro-title" aria-label={title}>
          {[...title].map((char) => (
            <span key={char} className="cat-intro-title-char">
              {char}
            </span>
          ))}
        </h1>
        <p className="cat-intro-subtitle">Cat Planet · 3D 猫咪品种地球图鉴</p>
      </div>

      <button type="button" className="cat-intro-skip" onClick={skip}>
        跳过
      </button>
    </div>
  )
}
