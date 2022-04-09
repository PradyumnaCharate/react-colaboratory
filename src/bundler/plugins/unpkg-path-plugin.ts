import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
     //name is just for debugging
    name: 'unpkg-path-plugin',
    //setup is function which takes single argument from esbuildto build the code so we are 
    //kind of overrriding this function for our purpose
    setup(build: esbuild.PluginBuild) {
      //onresolve is function/event listner in esbuild which we are overriding which 
      //searches where the imported file is located i.e path of file
      //napecpace is kind of filtering the file names
      //so if we change this path:args.path to unpackage - package name path then it will go to that path
      //here we are using if args.path and branching but we can also use this filter param to condition
      //which file esbuild should look for 
      // Handle root entry file of 'index.js'
      // Handle root entry file of 'index.js'
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: 'index.js', namespace: 'a' };
      });

      // Handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: 'a',
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/')
            .href,
        };
      });

      // Handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });
    },
  };
};
