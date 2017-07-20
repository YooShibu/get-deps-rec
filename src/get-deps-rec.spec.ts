import { getDep, getDeps, getNewDeps } from "./get-deps-rec";
import { resolve, join } from "path";
import { readFileSync } from "fs";


describe("get-deps-tree", () => {
    const path_node_modules = resolve(__dirname, "../node_modules");
    
    describe("getDep", () => {
        it("should get dependencies of only target module", done => {
            const path_jasmine = join(path_node_modules, "jasmine", "package.json");
            const packageJSON = readFileSync(path_jasmine, { encoding: "utf-8" });
            const dependencies = JSON.parse(packageJSON).dependencies;
            getDep(path_node_modules, "jasmine", (err, deps) => {
                expect(err).toBeNull();
                expect(deps).toEqual(dependencies);
                done();
            });
        });
        it("should pass error if readFile occurs error", done => {
            getDep(path_node_modules, "__some-module__", (err, deps) => {
                expect(err).not.toBeNull();
                done();
            });
        });
    });

    describe("getNewDeps", () => {
        it("should return new array that filter new deps", () => {
            const deps = {
                react: "version",
                jasmine: "version",
                typescript: "version"
            };
            const modules = { jasmine: {} };
            const result = getNewDeps(deps, modules);
            expect(result).toEqual(["react", "typescript"]);
        });
    });

    
    describe("getDeps", () => {
        it("should pass empty object if modules is empty array", done => {
            getDeps(path_node_modules, [], (err, deps) => {
                expect(err).toBeNull();
                expect(deps).toEqual({});
                done();
            });
        });
        it("should pass error if error occured", done => {
            getDeps(path_node_modules, ["typescript", "__some_module__"], (err, deps) => {
                expect(err).not.toBeNull();
                expect(deps).toEqual({});
                done();
            });
        });
        it("should pass empty array if every modules has no dependencies to callback function", done => {
            getDeps(path_node_modules, ["typescript", "jasmine-core"], (err, deps) => {
                expect(err).toBeNull();
                expect(deps).toEqual({
                    typescript: {},
                    "jasmine-core": {}
                });
                done();
            });
        });
        it("should not change module_names array", done => {
            const module_names = ["typescript", "jasmine-core"];
            getDeps(path_node_modules, module_names, (err, deps) => {
                expect(err).toBeNull();
                expect(module_names).toEqual(["typescript", "jasmine-core"]);
                done();
            });
            
        });
        it("should pass all dependencies to callback function", done => {
            const alldeps  = [
                "exit", "glob", "inflight", "inherits", "minimatch", "once",
                "path-is-absolute","wrappy","brace-expansion", "balanced-match",
                "concat-map", "source-map-support", "source-map", "amdefine",
                "abbrev", "async", "escodegen", "esprima", "estraverse", "esutils",
                "optionator", "deep-is", "fast-levenshtein", "levn", "prelude-ls",
                "type-check", "wordwrap", "handlebars", "optimist", "minimist",
                "uglify-js", "uglify-to-browserify", "yargs", "camelcase", "cliui",
                "center-align", "align-text", "lazy-cache", "kind-of", "is-buffer", "longest",
                "repeat-string", "right-align", "decamelize", "window-size",
                "js-yaml", "argparse", "sprintf-js", "mkdirp", "nopt",
                "resolve", "supports-color", "has-flag", "which", "isexe", "jasmine-core",
                "jasmine", "rollup", "istanbul", "typescript"
            ].sort();
            
            getDeps(path_node_modules, ["jasmine", "rollup", "istanbul", "typescript"], (err, deps) => {
                expect(err).toBeNull();
                const result = Object.keys(deps).sort();
                expect(result).toEqual(alldeps);
                done();
            });
        });
    });
    
});