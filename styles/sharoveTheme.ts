import { createTheme } from "@mui/material/styles";

export const sharoveTheme = createTheme({
  palette: {
    primary: {
      main: "#4bbcaa",
    },
    secondary: {
      main: "#afe9df",
    },
    grey: {
      50: "#fff",
      100: "#a4a4a4",
      200: "#dfdfdf",
      300: "#f9f9f9",
      400: "#f3f3f3",
      500: "#ececec",
      600: "#c7c7c7",
      700: "#666",
      800: "#333",
      900: "#999",
    },
    background: {
      paper: "#f4f4f4",
      default: "#fff",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "#fff",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          ".MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px !important",
            borderColor: "#c4c4c4",
          },
          ".Mui-error": {
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#d32f2f",
            },
          },
          "&:hover": {
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#c4c4c4",
              borderWidth: "1px",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          textTransform: "initial",
          boxShadow: "none",
          whiteSpace: "nowrap",
          padding: "6px 40px",
          height: "40px",
          "&.Mui-disabled": {
            backgroundColor: "rgba(0, 0, 0, 0.12) !important",
          },
        },
      },
      variants: [
        {
          props: { color: "primary", variant: "contained" },
          style: {
            fontSize: "1rem",
            backgroundColor: "#4BBCAA !important",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#4BBCAA !important",
            },
          },
        },
        {
          props: { color: "error", variant: "contained" },
          style: {
            fontSize: "1rem",
            backgroundColor: "#c62828 !important",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#c62828 !important",
            },
          },
        },
        {
          props: { color: "primary", variant: "text" },
          style: {
            fontSize: "1rem",
            color: "#898794",
          },
        },
      ],
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: "#4bbcaa !important",
          },
        },
      },
    },
  },
  typography: {
    fontWeightRegular: 300,
    body1: {
      fontSize: "1rem", // 16px
      color: "#333",
      fontWeight: 400,
    },
    body2: {
      fontSize: "1.125rem", // 18px
      color: "#333",
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: "1.125rem", //18px
      color: "#4BBCAA",
      fontWeight: 500,
    },
    caption: {
      fontSize: "0.75rem", //12px
      color: "#4BBCAA",
      fontWeight: 400,
    },
    h4: {
      fontSize: "1.375rem", //22px
      color: "#333",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.125rem", // 18px
      color: "#333",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem", // 16px
      color: "#333",
      fontWeight: 500,
    },
  },
});

declare module "@mui/material/styles" {
  // add custom text color in Palette Text types
  interface TypeText {
    default: string;
  }
  // allow configuration using `createTheme`
  interface TypeTextOptions {
    default: string;
  }
}
