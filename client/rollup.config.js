// rollup.config.js
import typescript from 'rollup-plugin-typescript2';
 
export default {
    input: './src/main.ts',
    "output": {
        "format": "umd",
      },
    plugins: [
        typescript(/*{ plugin options }*/)
    ]
}