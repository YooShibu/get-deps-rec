export type Dependencies = {
    [dependencies: string]: {
        [module: string]: string; // version
    };
}

export function getDeps(path_node_modules: string, module_names: string[], cb: (err: Error | null, deps: Dependencies) => void): void;