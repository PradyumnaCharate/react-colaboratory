import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let service: esbuild.Service;
const bundle = async (rawCode: string) => {
  if (!service) {
    //starting service which will retuurn esbuild.Service tuype object
    service = await esbuild.startService({
      worker: true,
      //instead of giving direct file in publuic folder we give unpckage url
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  }

  
  try{
      const result = await service.build({
        //define index.js as entrypoint and 2 plugins to transpile and undle the code
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
        //replace these production.env.Node.env and global with production and window respectively to avoid
        //errors
        define: {
          'process.env.NODE_ENV': '"production"',
          global: 'window',
        },
        //here we are overriding default jsx buiilder ...we will call _React.createElement instead
        //of default React.createElement because o fnaming collision issue
        jsxFactory: '_React.createElement',
      jsxFragment: '_React.Fragment',
      });
      //bundled code is present in array's first element text field
      return {
        code: result.outputFiles[0].text,
        err: '',
      };
} catch (err:any) {
  return {
    code: '',
    err: err.message,
  };
}
};

export default bundle;
