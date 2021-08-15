import path from "path";
import webpack from "webpack";
import { createFsFromVolume, Volume } from "memfs";

import withIndex from "../index.js";

const options = withIndex({
  pageExtensions: ["js", "jsx", "md", "mdx"]
});

export default (fixture, _options = {}) => {
  const compiler = webpack(
    options.webpack({
      context: __dirname,
      entry: `./${fixture}`,
      output: {
        path: path.resolve(__dirname),
        filename: "bundle.js",
      },
      module: { rules: [] },
      resolve: {
        alias: {
          "@tomafro/next-index": "/Users/tom/Work/tomafro/next-index/"
      }}
    })
  );

  compiler.outputFileSystem = createFsFromVolume(new Volume());
  compiler.outputFileSystem.join = path.join.bind(path);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      if (stats.hasErrors()) {
        console.log(stats.toJson().errors);
        reject(new Error(stats.toJson().errors));
      }

      resolve(stats);
    });
  });
};
