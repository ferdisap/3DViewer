import { defineConfig } from 'vite';
import copy from "rollup-plugin-copy-assets";

export default defineConfig({
  plugins: [
    copy({
      assets: [
        "assets",
      ]
    })
  ],
  build: {
    rollupOptions: {
      input: [
        "index.html","iframe.html"
      ],
      output: {
        assetFileNames: ({originalFileNames, name}) => {
          const regex = /\/?[\w\.]+/g;
          const str = originalFileNames;
          const find = [];
          let m;
          while ((m = regex.exec(str)) !== null) {
            if (m.index === regex.lastIndex) {
              regex.lastIndex++;
            }
            m.forEach((match, groupIndex) => {
              find.push(match.replace('/', ''))
            });
          }
          find[find.length-1] = '[name].[ext]';
          if(find[0] === 'assets'){
            return find.join("/")
          } else {
            return 'others/' + find[find.length-1];
          }
        },
      }
    }
  },
  base: "3DViewer",
  // esbuild: {
  //   target: "esnext",
  //   platform: "windows"
  // }
})
