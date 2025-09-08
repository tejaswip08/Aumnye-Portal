import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";

export default createVuetify({
  theme: {
    defaultTheme: "customTheme",
    themes: {
      customTheme: {
        dark: false, // Set to true for a dark theme
        colors: {
          primary: "#2563eb",
        },
      },
    },
  },
});
