import { readFile } from "fs";
import { join } from "path";
import { Dependencies } from "../index.d";

export type Modules = {
    [module: string]: string;
}


export function getDeps(path_node_modules: string, module_names: string[], cb: (err: Error | null, deps: Dependencies) => void): void {
    const length_module_names = module_names.length;
    if (length_module_names === 0)
        cb(null, {});
    
    const walker = createWalker(path_node_modules, length_module_names, cb);
    for (let i = 0; length_module_names > i; ++i)
        getDep(path_node_modules, module_names[i], walker);
}


function createWalker(path_node_modules: string, length_module_names: number, cb: (err: Error | null, deps: Dependencies) => void) {
    let module_nodes = length_module_names;
    let complete_getDeps = 0;
    const dependencies: Dependencies = {};
    return function walk(err: Error | null, module_name: string, modules: Modules): void {
        if (err !== null)
            return cb(err, {});
        const _modules = getNewDeps(modules, dependencies);
        Object.assign(dependencies, { [module_name]: modules });
        module_nodes += _modules.length;
        if (++complete_getDeps === module_nodes)
            return cb(null, dependencies);
        for (let i = 0; _modules.length > i; ++i)
            getDep(path_node_modules, _modules[i], walk);
    };
}


export function getNewDeps(modules: Modules, dependencies: Dependencies): string[] {
    const result: string[] = [];
    for (let key in modules)
        if (dependencies.hasOwnProperty(key) === false)
            result.push(key);
    return result;
}


export function getDep(path_node_modules: string, module_name: string, cb: (err: Error | null, module_name: string, deps: Modules) => void): void {
    const path_module = join(path_node_modules, module_name, "package.json");
    readFile(path_module, { encoding: "utf-8" }, (err, data) => {
        if (err !== null)
            return cb(err, module_name, {});
        const packageObj = JSON.parse(data) as { dependencies?: { [module: string]: string } };
        cb(null, module_name, packageObj.dependencies || {});
    });
}
