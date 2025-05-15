// rollup.config.js
import replace from "@rollup/plugin-replace";

export default {
  plugins: [
    replace({
      __VUE_OPTIONS_API__: "true",
      __VUE_PROD_DEVTOOLS__: "false",
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
    }),
  ],
};
