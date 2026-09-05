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


const useIsomorphicLayoutEffect =
  typeof window !== "undefined"
    ? useLayoutEffect
    : useEffect;


export default function ForgentisAnimation({ children }) {

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

  const [finished, setFinished] =
    useState(false);

  const [revealWebsite, setRevealWebsite] =
    useState(false);


  useIsomorphicLayoutEffect(() => {

    const show = shouldShowIntro();

    setShouldRender(show);
    setFinished(!show);
    setReady(true);

    if (!show) {
      setRevealWebsite(true);
    }

  }, []);


  useEffect(() => {

    if (!ready || !shouldRender) {
      return;
    }

    try {

      window.sessionStorage.setItem(
        INTRO_STORAGE_KEY,
        "false"
      );

    } catch (err) {
      /* sessionStorage unavailable — ignore */
    }


    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";


    const ICON_DELAY = 300;
    const LETTERS_DELAY = 1000;
    const SLOGAN_DELAY = 2000;

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


    // Website ko logo ke upar slide karo
    const revealTimer =
      setTimeout(() => {

        setRevealWebsite(true);

      }, INTRO_CLOSE_DELAY);


    const finishTimer =
      setTimeout(() => {

        setFinished(true);

        document.body.style.overflow =
          previousOverflow;

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
        revealTimer
      );

      clearTimeout(
        finishTimer
      );

      document.body.style.overflow =
        previousOverflow;
    };

  }, [ready, shouldRender]);


  if (!ready) {
    return null;
  }


  return (
    <>
      {/* Main Intro Animation - Logo stays visible always */}
      {!finished && shouldRender && (
        <div
          role="presentation"
          aria-hidden="true"
          className="logo-reveal"
        >
          <div className="intro-stack">

            <div className="icon-wrap">

              <img
                src="/optimize/forgentis_icon.webp"
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
                    src={`/optimize/${char}.webp`}
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
              src="/optimize/fabrication.webp"
              alt=""
              className={`slogan-mark ${
                sloganVisible
                  ? "slogan-mark-show"
                  : ""
              }`}
            />

          </div>
        </div>
      )}

      {/* Website Content Wrapper - Slides OVER the logo */}
      <div 
        className={`website-wrapper ${
          revealWebsite
            ? "website-reveal"
            : ""
        }`}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          zIndex: 1000000, // Website ABOVE logo (logo z-index: 999999)
          transform: revealWebsite ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)',
          background: 'var(--color-black)', // Add background to cover logo completely
        }}
      >
        {children}
      </div>
    </>
  );
}