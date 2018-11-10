
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import commonjs from 'rollup-plugin-commonjs';

const config = {
    input: 'src/filterControl.js',
    external: ['react'],
    output: {
        format: 'umd',
        name: 'react-filter-control',
        globals: {
            react: "React"
        }
    },
    plugins: [
        babel({
            exclude: "node_modules/**"
        }),
        resolve({ }),
        postcss({
            plugins: []
        }),
        commonjs({
            include: 'node_modules/**',
            namedExports: {
                'node_modules/prop-types/index.js': ['PropTypes']
            }
        })
    ]
}
export default config