const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@text-color": "#FFFFFF",
              "@component-background": "rgb(61, 63, 81)",
              "@select-item-active-bg":"rgb(115 118 139)",
              "@select-selection-item-bg":"#272a34",
              "@select-background":"#272a34",
              "@select-selection-item-border-color":"transparent",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
