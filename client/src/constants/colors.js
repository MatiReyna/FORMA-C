// FORMA COLOR PALETTE

// STRUCTURE ->
// - 5 BASE COLORS (with variations)
// - FUNCTIONAL COLORS (text, borders, shadows)
// - SEMANTIC COLORS (categories, priorities)

const DARK_BASE = '#232323';
const DARK_BASE_LIGHT = '#2A2A2A';
const DARK_BASE_DARK = '#1F1F1F';

const YELLOW_ACCENT = '#F2C57C';
const GREEN_NATURE = '#A3B18A';
const BEIGE_ELEGANT = '#A39382';
const TERRACOTTA = '#D4A574';

const TEXT_PRIMARY = '#FBF7F4';
const TEXT_SECONDARY = '#E5DED2';
const TEXT_TERTIARY = '#B7B0A5';
const TEXT_QUATERNARY = '#8B857A';
const TEXT_DISABLED = '#5A5752';

const SURFACE_PRIMARY = '#2F2F2F';
const SURFACE_SECONDARY = '#2A2A2A';
const SURFACE_HIGHLIGHT = '#3A3A3A';

const BORDER_PRIMARY = '#3A3A3A';
const BORDER_SECONDARY = '#2A2A2A';
const DIVIDER = '#3A3A3A';

const SHADOW_LIGHT = 'rgba(0, 0, 0, 0.3)';
const SHADOW_MEDIUM = 'rgba(0, 0, 0, 0.5)';
const SHADOW_DARK = 'rgba(0, 0, 0, 0.7)';

export const COLORS = {
    background: DARK_BASE,
    backgroundSecondary: DARK_BASE_LIGHT,
    backgroundTertiary: DARK_BASE_DARK,

    surface: SURFACE_PRIMARY,
    surfaceSecondary: SURFACE_SECONDARY,
    surfaceHighlight: SURFACE_HIGHLIGHT,

    primary: YELLOW_ACCENT,
    secondary: GREEN_NATURE,
    accent: BEIGE_ELEGANT,

    textPrimary: TEXT_PRIMARY,
    textSecondary: TEXT_SECONDARY,
    textTertiary: TEXT_TERTIARY,
    textQuaternary: TEXT_QUATERNARY,
    textDisabled: TEXT_DISABLED,

    success: GREEN_NATURE,
    warning: YELLOW_ACCENT,
    error: TERRACOTTA,
    info: BEIGE_ELEGANT,

    dark: DARK_BASE,
    darkTertiary: SURFACE_PRIMARY,
    darkQuaternary: DARK_BASE_DARK,

    border: BORDER_PRIMARY,
    borderLight: '#4A4A4A',
    borderDark: BORDER_SECONDARY,
    divider: DIVIDER,

    shadow: '#000000',
    shadowLight: SHADOW_LIGHT,
    shadowMedium: SHADOW_MEDIUM,
    shadowDark: SHADOW_DARK
}

export default COLORS;