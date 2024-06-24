export const theme = {
  colors: {
    primary: {
      high: "#E63946",
      medium: "#E63946CC",
      low: "#E6394699",
    },
    typography: {
      high: "#2D2D2D",
      medium: "#2D2D2DCC",
      low: "#ffffff",
    },
    background: {
      high: "#2D2D2DCC",
      medium: "#E8EEF3",
      low: "#ffffff",
    },
  },
  fonts: {
    family: {
      default: "Noto Sans",
    },
    body: {
      small: {
        size: 13,
        lineHeight: 16,
      },
      medium: {
        size: 14,
        lineHeight: "auto",
      },
    },
    header: {
      small: {
        size: 15,
        lineHeight: "auto",
      },
      medium: {
        size: 20,
        lineHeight: "auto",
      },
      large: {
        size: 34,
        lineHeight: "auto",
      },
    },
    button: {
      medium: {
        size: 14,
        lineHeight: 16,
      },
    },
    link: {
      medium: {
        size: 14,
        lineHeight: 16,
      },
    },
  },
};

export type AppTheme = typeof theme;

// Name of the colors and fonts
export type ColorName = keyof AppTheme["colors"];
export type FontName = keyof AppTheme["fonts"];

export type FontBodySize = keyof AppTheme["fonts"]["body"];
export type FontHeaderSize = keyof AppTheme["fonts"]["header"];

// Level of the colors
export type ColorLevel = "high" | "medium" | "low";
