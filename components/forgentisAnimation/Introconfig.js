/**
 * Shared config between the one-time intro animation
 * (mainAnimation.jsx) and any component that needs to know
 * whether the intro is currently playing / already finished
 * (e.g. Hero.jsx) — so the two can never drift out of sync
 * again (this file replaces two hardcoded, duplicated
 * strings/numbers that used to live separately in each file).
 *
 * Place this at: components/forgentisAnimation/introConfig.js
 */

// sessionStorage key used to remember "has this session
// already seen the intro".
export const INTRO_STORAGE_KEY = "forgentis_intro_shown";

// Custom window event the intro dispatches the instant it
// finishes closing. Other components can listen for this
// instead of guessing a duration.
export const INTRO_COMPLETE_EVENT = "welcomeAnimationComplete";

// How long the intro holds the fully-formed logo before it
// starts sliding away.
export const INTRO_CLOSE_DELAY = 3600;

// How long the slide-up-and-off close transition itself
// takes. Must stay in sync with the CSS transition duration
// on .intro-closing in style.css.
export const INTRO_SLIDE_UP_DURATION = 700;

// Total time from mount to fully gone. Anything that needs
// a safety-net timeout (e.g. Hero.jsx, in case its event
// listener attaches a beat too late) should use this instead
// of hardcoding a number.
export const INTRO_TOTAL_DURATION =
  INTRO_CLOSE_DELAY + INTRO_SLIDE_UP_DURATION;