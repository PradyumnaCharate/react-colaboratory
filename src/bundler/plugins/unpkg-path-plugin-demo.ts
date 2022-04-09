import * as esbuild from 'esbuild-wasm';
import axios from "axios";
 
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
    build.onResolve({ filter: /.*/ }, async (args: any) => {
      console.log('onResolve', args);
      if (args.path === 'index.js') {
        return { path: args.path, namespace: 'a' };
      }

      if (args.path.includes('./') || args.path.includes('../')) {
        return {
          namespace: 'a',
          path: new URL(
            args.path,
            'https://unpkg.com' + args.resolveDir + '/'
          ).href,
        };
      }

      return {
        namespace: 'a',
        path: `https://unpkg.com/${args.path}`,
      };
    });
      
      //when path is found it loads the file by this listner to override esbuild natural way to search 
      //files on hard disk...so we are intercepting this way of finding  file instead we are giving contents 
      //by hardcoding here ..if path is index.js then return this or return message 
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);
 
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import React, { useState } from 'react';
              console.log(React, useState);
            `,
          };
        }
          const { data, request } = await axios.get(args.path);
        return {
          loader: 'jsx',
          contents: data,
          //describes where we found last file we were looking for 
          resolveDir: new URL('./', request.responseURL).pathname,
        };
      });
    },
  };
};