'use client'

import React, {
  useEffect,
  useState,
} from "react";

import "./style.css";


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
   Reads the "toShow" flag from sessionStorage.

   - Missing / anything other than the string
     "false"  -> intro HAS NOT played yet this
                 session, so it should show.
   - "false"  -> intro already played this
                 session, skip it entirely.

   Wrapped in try/catch in case sessionStorage
   is unavailable (privacy mode, SSR, etc.) —
   in that case we just default to showing it.
   ========================================== */

const shouldShowIntro = () => {

  try {

    const stored =
      window.sessionStorage.getItem(
        "toShow"
      );

    return stored !== "false";

  } catch (err) {

    return true;
  }
};


export default function ForgentisAnimation() {

  /*
   * Decided once, on first render, before
   * anything animates — so a session that has
   * already seen the intro never even mounts
   * the black overlay for a single frame.
   */

  const [shouldRender] = useState(
    shouldShowIntro
  );

  const [iconVisible, setIconVisible] =
    useState(false);

  const [lettersVisible, setLettersVisible] =
    useState(false);

  const [sloganVisible, setSloganVisible] =
    useState(false);

  const [closing, setClosing] =
    useState(false);

  const [finished, setFinished] =
    useState(!shouldRender);


  useEffect(() => {

    /*
     * Already shown this session — do nothing.
     * (finished is already true from the
     * initial state above, so nothing rendered
     * and the real site is visible immediately.)
     */

    if (!shouldRender) {
      return;
    }


    /*
     * About to show the intro — flip the flag
     * right away so even a refresh mid-animation
     * won't trigger it again this session.
     */

    try {

      window.sessionStorage.setItem(
        "toShow",
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
                        the intro
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

    const CLOSE_DELAY = 3600;

    /*
     * How long the whole intro takes to
     * slide up and off the page. Must
     * stay in sync with the CSS
     * transition duration on
     * .intro-closing.
     */
    const SLIDE_UP_DURATION = 700;

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

      }, CLOSE_DELAY);


    const finishTimer =
      setTimeout(() => {

        setFinished(true);

        document.body.style.overflow =
          previousOverflow;

      }, CLOSE_DELAY + SLIDE_UP_DURATION);


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

  }, [shouldRender]);


  /*
   * Don't render anything after
   * intro has finished — or if this
   * session already saw it play.
   */

  if (finished) {
    return null;
  }


  return (
    <main
      className={`logo-reveal${
        closing
          ? "intro-closing"
          : ""
      }`}
    >

      <div className="intro-stack">

        <div className="icon-wrap">

          <img
            src="/forgentis_icon.png"
            alt="Forgentis"
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
                key={index}
                src={`/${char}.png`}
                alt={char}
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
          alt="The Mark of Excellence"
          className={`slogan-mark ${
            sloganVisible
              ? "slogan-mark-show"
              : ""
          }`}
        />

      </div>

    </main>
  );
}