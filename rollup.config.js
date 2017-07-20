import tsp from "rollup-plugin-typescript"
import typescript from "typescript"

export default {
    entry: "src/index.ts",
    external: ["fs", "path"],
    dest: "index.js",
    format: "cjs",
    plugins: [tsp({ typescript })]
}