// FORMA COLOR PALETTE

// STRUCTURE ->
// - 5 BASE COLORS (with variations)
// - FUNCTIONAL COLORS (text, borders, shadows)
// - SEMANTIC COLORS (categories, priorities)

const DARK_BASE = '#232323';
const DARK_BASE_LIGHT = '#2A2A2A';
const DARK_BASE_DARK = '#1F1F1F';

const YELLOW_ACCENT = '#F2C57C';
const YELLOW_ACCENT_LIGHT = '#F5D09A';
const YELLOW_ACCENT_DARK = '#E8B86A';

const GREEN_NATURE = '#A3B18A';
const GREEN_NATURE_LIGHT = '#B5C4A0';
const GREEN_NATURE_DARK = '#8FA07A';

const BEIGE_ELEGANT = '#A39382';
const BEIGE_ELEGANT_LIGHT = '#B5A699';
const BEIGE_ELEGANT_DARK = '#8F8270';

const TERRACOTTA = '#D4A574';
const TERRACOTTA_LIGHT = '#E0B891';
const TERRACOTTA_DARK = '#C8945A';

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
    primaryLight: YELLOW_ACCENT_LIGHT,
    primaryDark: YELLOW_ACCENT_DARK,

    secondary: GREEN_NATURE,
    secondaryLight: GREEN_NATURE_LIGHT,
    secondaryDark: GREEN_NATURE_DARK,

    accent: BEIGE_ELEGANT,
    accentLight: BEIGE_ELEGANT_LIGHT,
    accentDark: BEIGE_ELEGANT_DARK,

    textPrimary: TEXT_PRIMARY,
    textSecondary: TEXT_SECONDARY,
    textTertiary: TEXT_TERTIARY,
    textQuaternary: TEXT_QUATERNARY,
    textDisabled: TEXT_DISABLED,

    success: GREEN_NATURE,
    successLight: GREEN_NATURE_LIGHT,
    successDark: GREEN_NATURE_DARK,

    warning: YELLOW_ACCENT,
    warningLight: YELLOW_ACCENT_LIGHT,
    warningDark: YELLOW_ACCENT_DARK,

    error: TERRACOTTA,
    errorLight: TERRACOTTA_LIGHT,
    errorDark: TERRACOTTA_DARK,

    info: BEIGE_ELEGANT,
    infoLight: BEIGE_ELEGANT_LIGHT,
    infoDark: BEIGE_ELEGANT_DARK,

    dark: DARK_BASE,
    darkSecondary: '#4B4033',
    darkTertiary: SURFACE_PRIMARY,
    darkQuaternary: DARK_BASE_DARK,

    category: {
        health: GREEN_NATURE,
        fitness: YELLOW_ACCENT,
        mindfulness: TERRACOTTA,
        work: BEIGE_ELEGANT,
        finance: BEIGE_ELEGANT_LIGHT
    },

    priority: {
        high: YELLOW_ACCENT,
        medium: BEIGE_ELEGANT,
        low: TEXT_QUATERNARY
    },

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