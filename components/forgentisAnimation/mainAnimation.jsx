'use client'

import React, {
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import "./style.css";

import {
  INTRO_STORAGE_KEY,
  INTRO_COMPLETE_EVENT,
  INTRO_CLOSE_DELAY,
  INTRO_SLIDE_UP_DURATION,
} from "./Introconfig"


/* ==========================================
   Each entry is one letter image, in the
   order they should appear left -> right.

   Expects files at /<char>.png
   e.g. /F.png, /O.png ...

   Replace this array with your actual
   wordmark's letters/paths — this is just
   the example set you gave.
   ========================================== */

const LETTERS = [
  "F",
  "O",
  "R",
  "G",
  "E",
  "N",
  "T",
  "I",
  "S",
];


/* ==========================================
   Reads whether the intro has already played
   this session.

   - Missing / anything other than the string
     "false"  -> intro HAS NOT played yet this
                 session, so it should show.
   - "false"  -> intro already played this
                 session, skip it entirely.

   Wrapped in try/catch in case sessionStorage
   is unavailable (privacy mode, etc.) — in
   that case we just default to showing it.

   This is only ever called client-side (see
   the effect below), so `window` is always
   available when it runs.
   ========================================== */

const shouldShowIntro = () => {

  try {

    const stored =
      window.sessionStorage.getItem(
        INTRO_STORAGE_KEY
      );

    return stored !== "false";

  } catch (err) {

    return true;
  }
};


/*
 * React warns if useLayoutEffect is used
 * during SSR ("does nothing on the server").
 * This isomorphic version runs as a normal
 * effect on the server (no-op there anyway)
 * and as a real layout effect in the browser,
 * so the show/hide decision below happens as
 * early as possible on the client, with no
 * SSR warning.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined"
    ? useLayoutEffect
    : useEffect;


export default function ForgentisAnimation() {

  /*
   * IMPORTANT: both of these start out
   * false/false on every environment — server
   * render AND the very first client render
   * before hydration. That means server and
   * client always agree on the first paint
   * (nothing renders), so there is no
   * hydration mismatch.
   *
   * The *real* decision (does this session
   * need the intro?) only happens after mount,
   * client-side only, in the effect below.
   */
  const [ready, setReady] =
    useState(false);

  const [shouldRender, setShouldRender] =
    useState(false);

  const [iconVisible, setIconVisible] =
    useState(false);

  const [lettersVisible, setLettersVisible] =
    useState(false);

  const [sloganVisible, setSloganVisible] =
    useState(false);

  const [closing, setClosing] =
    useState(false);

  const [finished, setFinished] =
    useState(false);


  /*
   * Client-only decision: should this session
   * see the intro at all? Runs before paint
   * (layout effect) so there's no visible
   * flash of the real page before the overlay
   * appears.
   */
  useIsomorphicLayoutEffect(() => {

    const show = shouldShowIntro();

    setShouldRender(show);
    setFinished(!show);
    setReady(true);

  }, []);


  useEffect(() => {

    /*
     * Wait until the client-only decision above
     * has actually run, and only proceed if this
     * session needs to see the intro.
     */
    if (!ready || !shouldRender) {
      return;
    }


    /*
     * About to show the intro — flip the flag
     * right away so even a refresh mid-animation
     * won't trigger it again this session.
     */

    try {

      window.sessionStorage.setItem(
        INTRO_STORAGE_KEY,
        "false"
      );

    } catch (err) {
      /* sessionStorage unavailable — ignore */
    }


    /*
     * Prevent website scrolling while
     * intro animation is active.
     */

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";


    /* ==========================================
       TIMELINE

       iconTimer    -> icon slides straight down
                        from the top, smoothly —
                        no rotation, no bounce
       lettersTimer -> AFTER the icon settles,
                        letters start rocketing
                        up from below, one after
                        another (unchanged)
       sloganTimer  -> AFTER the letters finish
                        landing, the slogan image
                        fades/rises in underneath
       closeTimer   -> intro holds the fully-formed
                        icon + word + slogan this
                        long, then the WHOLE screen
                        slides straight up and off
                        the page (no more slicing)
       finishTimer  -> closeTimer + slide-up
                        duration, fully unmounts
                        the intro AND tells the
                        rest of the app (e.g. Hero)
                        that it's done
       ========================================== */

    const ICON_DELAY = 300;
    const LETTERS_DELAY = 1000;

    /*
     * Letters: 9 letters, 70ms apart, each
     * taking 0.5s to land -> last letter
     * finishes roughly
     * (LETTERS.length - 1) * 70 + 500ms
     * after LETTERS_DELAY. Slogan waits
     * a bit past that.
     */
    const SLOGAN_DELAY = 2200;

    const iconTimer =
      setTimeout(() => {

        setIconVisible(true);

      }, ICON_DELAY);


    const lettersTimer =
      setTimeout(() => {

        setLettersVisible(true);

      }, LETTERS_DELAY);


    const sloganTimer =
      setTimeout(() => {

        setSloganVisible(true);

      }, SLOGAN_DELAY);


    const closeTimer =
      setTimeout(() => {

        setClosing(true);

      }, INTRO_CLOSE_DELAY);


    const finishTimer =
      setTimeout(() => {

        setFinished(true);

        document.body.style.overflow =
          previousOverflow;

        /*
         * Let the rest of the app (Hero, etc.)
         * know the intro is fully done — instead
         * of every listener having to guess the
         * total duration.
         */
        try {

          window.dispatchEvent(
            new CustomEvent(
              INTRO_COMPLETE_EVENT
            )
          );

        } catch (err) {
          /* ignore */
        }

      }, INTRO_CLOSE_DELAY + INTRO_SLIDE_UP_DURATION);


    /* ==========================================
       CLEANUP
       ========================================== */

    return () => {

      clearTimeout(
        iconTimer
      );

      clearTimeout(
        lettersTimer
      );

      clearTimeout(
        sloganTimer
      );

      clearTimeout(
        closeTimer
      );

      clearTimeout(
        finishTimer
      );

      document.body.style.overflow =
        previousOverflow;
    };

  }, [ready, shouldRender]);


  /*
   * Don't render anything before the
   * client-only decision has run (keeps
   * server/client first paint identical —
   * see the comment above the state
   * declarations), and don't render anything
   * once the intro has finished or if this
   * session already saw it play.
   */

  if (!ready || finished) {
    return null;
  }


  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`logo-reveal ${
        closing
          ? "intro-closing"
          : ""
      }`}
    >

      <div className="intro-stack">

        <div className="icon-wrap">

          <img
            src="/forgentis_icon.png"
            alt=""
            fetchPriority="high"
            className={`icon-mark ${
              iconVisible
                ? "icon-mark-show"
                : ""
            }`}
          />

        </div>

        <div className="letters-row">

          {LETTERS.map(
            (char, index) => (
              <img
                key={`${char}-${index}`}
                src={`/${char}.png`}
                alt=""
                className={`letter-img ${
                  lettersVisible
                    ? "letter-img-show"
                    : ""
                }`}
                style={{
                  animationDelay: `${
                    index * 70
                  }ms`,
                }}
              />
            )
          )}

        </div>

        <img
          src="/fabrication.png"
          alt=""
          className={`slogan-mark ${
            sloganVisible
              ? "slogan-mark-show"
              : ""
          }`}
        />

      </div>

    </div>
  );
}