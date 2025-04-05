import type {AcceptedPlugin} from 'postcss';
import type {CSSOptions} from 'vite';

import {wrapperEnv} from './utils';

export const css = (mode: string): CSSOptions => {
    return {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/assets/styles/minix/sidebar" as  *;`,
            },
        },
    };
};


