# get-deps-rec

## Installation

    npm install get-deps-rec


## Example

~~~ javascript
const { getDeps } = require("get-deps-rec");
const { resolve } = require("path");

const path_node_modules = resolve(__dirname, "node_modules");
getDeps(path_node_modules, ["jasmine", "rollup"], (err, deps) => {
    console.log(deps);
/* {
    jasmine: {
        exit: '^0.1.2',
        glob: '^7.0.6',
        'jasmine-core': '~2.6.0'
    },
    rollup: { 'source-map-support': '^0.4.0' },
    exit: {},
    glob: {
        inflight: '^1.0.4',
        inherits: '2',
        minimatch: '2 || 3',
        once: '^1.3.0',
        'path-is-absolute': '^1.0.0'
    },
    'jasmine-core': {},
    'source-map-support': { 'source-map': '^0.5.6' },
    inflight: {
        once: '^1.3.0',
        wrappy: '1'
    },
    inherits: {},
    minimatch: { 'brace-expansion': '^1.1.7' },
    once: { wrappy: '1' },
    'path-is-absolute': {},
    'source-map': { amdefine: '>=0.0.4' },
    wrappy: {},
    'brace-expansion': {
        'balanced-match': '^1.0.0',
        'concat-map': '0.0.1'
    },
    amdefine: {},
    'balanced-match': {},
    'concat-map': {}
}*/
});
~~~


## getDeps(path_node_moduels, module_names, cb)

* `path_node_modules` {String} the path for node_modules directory
* `module_names` {Array<String>} module names you want to know dependencies
* `cb` {Function} Called when an error occurs, or dependencies are found
  * `err` {Error | null}
  * `deps` {Object} pair of module and dependencies with version