'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fs = require('fs');
var path = require('path');

function getDeps(path_node_modules, module_names, cb) {
    _getDeps(path_node_modules, module_names.concat(), {}, cb);
}
function _getDeps(path_node_modules, module_names, dependencies, cb) {
    if (module_names.length === 0)
        return cb(null, dependencies);
    const module_name = module_names.pop();
    getDep(path_node_modules, module_name, (err, modules) => {
        if (err !== null)
            return cb(err, {});
        const newDeps = getNewDeps(modules, dependencies);
        Object.assign(dependencies, { [module_name]: modules });
        const _module_names = module_names.concat(newDeps);
        setImmediate(_getDeps, path_node_modules, _module_names, dependencies, cb);
    });
}
function getNewDeps(modules, dependencies) {
    const result = [];
    for (let key in modules)
        if (dependencies.hasOwnProperty(key) === false)
            result.push(key);
    return result;
}
function getDep(path_node_modules, module_name, cb) {
    const path_module = path.join(path_node_modules, module_name, "package.json");
    fs.readFile(path_module, { encoding: "utf-8" }, (err, data) => {
        if (err !== null)
            return cb(err, {});
        const packageObj = JSON.parse(data);
        cb(null, packageObj.dependencies || {});
    });
}

exports.getDeps = getDeps;
