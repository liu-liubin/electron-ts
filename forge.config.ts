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
        authToken: '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',
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
            html: './src/index.html',
            js: './src/renderer.ts',
            name: 'main_window',
            preload: {
              js: './src/preload.ts',
            },
          },
        ],
      },
    }),
  ],
};

export default config;
