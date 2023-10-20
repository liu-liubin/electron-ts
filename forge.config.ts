import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    osxSign: {
      identity: 'Liu Song (7PZMT8T5KL)'
    }
  },
  rebuildConfig: {},
  makers: [new MakerSquirrel({}), new MakerZIP({}), new MakerRpm({}), new MakerDeb({})],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config:{
        // authToken: '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',
        repository: {
          owner: 'liu-liubin',
          name: 'electron-ts'
        },
        prerelease: true
      }
    }
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            name: 'main_window',
            preload: {
              'js': './src/preload.ts'
            }
          },
          {
            html: './src/views/error/crash/index.html',
            js: './src/views/error/crash/index.ts',
            name: 'html_error_crash',
            // preload: {
            //   js: './src/views/login/preload.ts',
            // },
          },
          {
            html: './src/views/loading/index.html',
            js: './src/views/loading/index.ts',
            name: 'html_loading',
            // preload: {
            //   js: './src/views/login/preload.ts',
            // },
          },
        ],
      },
    }),
  ],
};

export default config;
