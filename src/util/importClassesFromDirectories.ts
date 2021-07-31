import * as path from 'path';

/**
 * Loads all exported classes from the given directory.
 */
export function importClassesFromDirectories(directories: string[], formats = ['.js', '.ts', '.tsx']): Function[] {
    const loadFileClasses = (exported: any, allLoaded: Function[])  => {
        if (exported instanceof Function) {
            allLoaded.push(exported);
        } else if (exported instanceof Array) {
            exported.forEach((val: any) => loadFileClasses(val, allLoaded));
        } else if (exported instanceof Object || typeof exported === 'object') {
            Object.keys(exported).forEach((key) => loadFileClasses(exported[key], allLoaded));
        }

        return allLoaded;
    };

    const allFiles = directories.reduce<string[]>(
        (allDirs, dir) =>
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            allDirs.concat(require('glob').sync(path.normalize(dir))),
        []
    );

    const dirs = allFiles
        .filter((file) => {
            const dtsExtension = file.substring(file.length - 5, file.length);
            return formats.indexOf(path.extname(file)) !== -1 && dtsExtension !== '.d.ts';
        })
        .map((file) => require(file));

    return loadFileClasses(dirs, []);
}
