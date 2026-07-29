/* ============================================================================
   ASTROVENTURE // SPITI COUNTDOWN — MISSION CONFIGURATION
   ----------------------------------------------------------------------------
   This is the ONLY file you need to edit to re-point the countdown subpage at a
   new expedition. Change the values below — every visible mission parameter,
   the live countdown, the gauges and the clearance link all read from here.
   ========================================================================== */

export const MISSION = {
  /* --- Identity (top-left secure-comm HUD) ------------------------------- */
  INITIATIVE: "ASTRIS SPACE",
  PROTOCOL: "SPITI",

  /* --- Countdown ---------------------------------------------------------
     COUNTDOWN_TARGET is the moment the observation window opens.
     Full ISO-8601 WITH an explicit timezone offset (+05:30 = IST) so the
     countdown is identical for every visitor.                              */
  COUNTDOWN_TARGET: "2026-09-20T20:00:00+05:30",
  MISSION_DATE: "20 SEP 2026",

  /* --- Extraction point (REQUEST CLEARANCE button, opens in a new tab) --- */
  GOOGLE_FORM_URL: "https://forms.gle/REPLACE_WITH_REAL_FORM",

  /* --- Environment parameters (Mission Dossier) ------------------------- */
  COORDINATES: "32.2396° N, 78.0349° E",
  ALTITUDE: "12,500 ft",
  DISTORTION: "Atmospheric distortion minimized by 40%",
  VISIBILITY: "Bortle Class 1 — absolute dark, Milky Way casts shadows",
  BORTLE_CLASS: 1,

  /* --- Arsenal & optics -------------------------------------------------- */
  OPTICS: "Lab-grade Dobsonian arrays and advanced astrophotography rigs.",
  GUIDANCE:
    "Real-time cosmological breakdown — from stellar nurseries to the cosmic microwave background.",

  /* --- Mission status ---------------------------------------------------- */
  MISSION_STATUS: "HEAVY RESTRICTIONS — LIMITED CLEARANCE CODES AVAILABLE",

  /* --- Live atmospheric telemetry (Dossier gauges), 0–100 --------------- */
  SKY_QUALITY: 97,
  ATMOSPHERIC_TRANSPARENCY: 92,
  MOON_ILLUMINATION: 3,
  OBSERVER_READINESS: 68,

  /* --- SEO --------------------------------------------------------------- */
  CANONICAL_PATH: "/spiti-countdown",
} as const

export type MissionConfig = typeof MISSION
