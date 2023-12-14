import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import { colors } from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    options: {
      customProperties: true,
    },
    themes: {
      dark: {
        primary: colors.blue.darken2,
        secondary: colors.grey.darken3,
        accent: colors.blue.accent1,
        error: colors.red.accent2,
        info: colors.blue.base,
        success: colors.green.base,
        warning: colors.orange.darken1,
      },
      light: {
        primary: colors.blue.base,
        secondary: colors.grey.darken3,
        accent: colors.pink.accent1,
        error: colors.red.accent2,
        info: colors.blue.base,
        success: colors.green.base,
        warning: colors.orange.darken1,
      },
    },
  },
});
