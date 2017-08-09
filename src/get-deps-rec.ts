import { readFile } from "fs";
import { join } from "path";
import { Dependencies } from "../index.d";

export type Modules = {
    [module: string]: string;
}


export function getDeps(path_node_modules: string, module_names: string[], cb: (err: Error | null, deps: Dependencies) => void): void {
    _getDeps(path_node_modules, module_names.concat(), {}, cb);
}

function _getDeps(path_node_modules: string, module_names: string[], dependencies: Dependencies, cb: (err: Error | null, deps: Dependencies) => void): void {
    if (module_names.length === 0)
        return cb(null, dependencies);
    const module_name = module_names.pop()!;
    getDep(path_node_modules, module_name, (err, modules) => {
        if (err !== null)
            return cb(err, {});
        const newDeps = getNewDeps(modules, dependencies);
        Object.assign(dependencies, { [module_name]: modules });
        const _module_names = module_names.concat(newDeps);
        setImmediate(_getDeps, path_node_modules, _module_names, dependencies, cb);
    });
}


export function getNewDeps(modules: Modules, dependencies: Dependencies): string[] {
    const result: string[] = [];
    for (let key in modules)
        if (dependencies.hasOwnProperty(key) === false)
            result.push(key);
    return result;
}


export function getDep(path_node_modules: string, module_name: string, cb: (err: Error | null, modules: Modules) => void): void {
    const path_module = join(path_node_modules, module_name, "package.json");
    readFile(path_module, { encoding: "utf-8" }, (err, data) => {
        if (err !== null)
            return cb(err, {});
        const packageObj = JSON.parse(data) as { dependencies?: { [module: string]: string } };
        cb(null, packageObj.dependencies || {});
    });
}
