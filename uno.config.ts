import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'flex-x-between': 'flex items-center justify-between',
    'flex-x-around': 'flex items-center justify-around',
    'flex-y-center': 'flex flex-col flex-wrap justify-center items-center',
    'flex-y-between': 'flex flex-col flex-wrap justify-between items-center',
    'flex-y-around': 'flex flex-col flex-wrap justify-around items-center',
    'wh-full': 'w-full h-full',
  },
  theme: {
    colors: {
      primary: '#027AFF',
      'primary-secondary': '#00FFFF',
      info: '#7CC1FF',
      warning: '#FFBE44',
      'warning-secondary': '#FEDB65',
    },
    fontSizes: {
      sm: 'font-size-[14px]',
      base: 'font-size-[16px]',
      lg: 'font-size-[18px]',
      xl: 'font-size-[22px]',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
