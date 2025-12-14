// FORMA TYPOGRAPHY

// FAMILY OF FOUNTAINS
// - Noto Sans JP Bold: logos / main titles
// - Satoshi Regular: interface / secondary text
// - Zen Kaku Gothic Antique: details / slogan

export const FONT_FAMILIES = {
    LOGO: 'NotoSansJP-Bold',
    HEADING: 'NotoSansJP-Bold',

    BODY: 'Satoshi-Regular',
    BODY_MEDIUM: 'Satoshi-Medium',
    BODY_BOLD: 'Satoshi-Bold',

    DECORATIVE: 'ZenKakuGothicAntique-Regular',

    SYSTEM: undefined,
    SYSTEM_IOS: undefined,
    SYSTEM_ANDROID: undefined
}

export const FONT_SIZES = {
    DISPLAY: 48, // main logo
    H1: 38, // main titles
    H2: 32, // large subtitles
    H3: 24, // medium subtitles
    H4: 20, // small subtitles
    BODY: 16, // main text
    BODY_SMALL: 14, // secondary text
    CAPTION: 12, // supporting text
    TINY: 11 // very small texts
}

export const LINE_HEIGHTS = {
    TIGHT: 1.2,
    NORMAL: 1.5,
    RELAXED: 1.75
}

export const LETTER_SPACING = {
    TIGHT: -0.5,
    NORMAL: 0,
    WIDE: 0.5,
    WIDER: 1
}

export const FONT_WEIGHTS = {
    // NOTE: do not use LIGHT (300) or lower weights - makes it difficult to read
    REGULAR: '400',
    MEDIUM: '500',
    SEMI_BOLD: '600',
    BOLD: '700'
}

export const TYPOGRAPHY = {
    LOGO: {
        fontFamily: FONT_FAMILIES.LOGO,
        fontSize: FONT_SIZES.DISPLAY,
        lineHeight: FONT_SIZES.DISPLAY * LINE_HEIGHTS.TIGHT,
        letterSpacing: LETTER_SPACING.WIDER,
        fontWeight: FONT_WEIGHTS.BOLD
    },

    HEADING_1: {
        fontFamily: FONT_FAMILIES.HEADING,
        fontSize: FONT_SIZES.H1,
        lineHeight: FONT_SIZES.H1 * LINE_HEIGHTS.TIGHT,
        letterSpacing: LETTER_SPACING.WIDE,
        fontWeight: FONT_WEIGHTS.BOLD
    },

    HEADING_2: {
        fontFamily: FONT_FAMILIES.HEADING,
        fontSize: FONT_SIZES.H2,
        lineHeight: FONT_SIZES.H2 * LINE_HEIGHTS.TIGHT,
        letterSpacing: LETTER_SPACING.NORMAL,
        fontWeight: FONT_WEIGHTS.BOLD
    },

    HEADING_3: {
        fontFamily: FONT_FAMILIES.BODY,
        fontSize: FONT_SIZES.H3,
        lineHeight: FONT_SIZES.H3 * LINE_HEIGHTS.NORMAL,
        letterSpacing: LETTER_SPACING.NORMAL,
        fontWeight: FONT_WEIGHTS.SEMI_BOLD
    },

    HEADING_4: {
        fontFamily: FONT_FAMILIES.BODY,
        fontSize: FONT_SIZES.H4,
        lineHeight: FONT_SIZES.H4 * LINE_HEIGHTS.NORMAL,
        letterSpacing: LETTER_SPACING.NORMAL,
        fontWeight: FONT_WEIGHTS.SEMI_BOLD
    },

    BODY: {
        fontFamily: FONT_FAMILIES.BODY,
        fontSize: FONT_SIZES.BODY,
        lineHeight: FONT_SIZES.BODY * LINE_HEIGHTS.NORMAL,
        letterSpacing: LETTER_SPACING.NORMAL,
        fontWeight: FONT_WEIGHTS.REGULAR
    },

    BODY_SMALL: {
        fontFamily: FONT_FAMILIES.BODY,
        fontSize: FONT_SIZES.BODY_SMALL,
        lineHeight: FONT_SIZES.BODY_SMALL * LINE_HEIGHTS.RELAXED,
        letterSpacing: LETTER_SPACING.NORMAL,
        fontWeight: FONT_WEIGHTS.REGULAR
    },

    CAPTION: {
        fontFamily: FONT_FAMILIES.BODY,
        fontSize: FONT_SIZES.CAPTION,
        lineHeight: FONT_SIZES.CAPTION * LINE_HEIGHTS.NORMAL,
        letterSpacing: LETTER_SPACING.NORMAL,
        fontWeight: FONT_WEIGHTS.REGULAR
    },

    TINY: {
        fontFamily: FONT_FAMILIES.BODY,
        fontSize: FONT_SIZES.TINY,
        lineHeight: FONT_SIZES.TINY * LINE_HEIGHTS.NORMAL,
        letterSpacing: LETTER_SPACING.NORMAL,
        fontWeight: FONT_WEIGHTS.REGULAR
    },

    SLOGAN: {
        fontFamily: FONT_FAMILIES.DECORATIVE,
        fontSize: FONT_SIZES.BODY_SMALL,
        lineHeight: FONT_SIZES.BODY_SMALL * LINE_HEIGHTS.RELAXED,
        letterSpacing: LETTER_SPACING.WIDE,
        fontWeight: FONT_WEIGHTS.REGULAR
    }
}

export default {
    FONT_FAMILIES,
    FONT_SIZES,
    LINE_HEIGHTS,
    LETTER_SPACING,
    FONT_WEIGHTS,
    TYPOGRAPHY
}