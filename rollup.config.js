import typescript from '@rollup/plugin-typescript';
// import eslint from '@rollup/plugin-eslint';
import { terser } from "rollup-plugin-terser";

const ENV_PROD = process.env.NODE_ENV === 'production' ? true : false;

const config = {
    input: 'src/index.ts',
    output: {
        dir: 'lib',
        format: 'cjs',
        sourcemap: ENV_PROD ? false : 'inline',
    },
    plugins: [
        typescript({
            module: 'esnext',
            exclude:[
                './src/__test__/*',
            ],
        }),
        // eslint(),
    ]
};

if (ENV_PROD) {
    config.plugins.push(terser());
}

export default config;