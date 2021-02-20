const path = require("path");
module.exports = function(_content) {
  const callback = this.async();
  const directory = path.dirname(this.resourcePath);

  this.addContextDependency(directory);

  const files = this.fs.readdirSync(directory).filter(file => {
    return path.extname(file) == ".mdx";
  });

  const collection = files.map(file => `  "${directory}/${file}": require("./${file}")`).join(",\n");

  callback(null, `
    import { Collection, Entry } from "next-index/dist/collection"

    export default Collection.from(Object.entries({
      ${collection}
    }).map(Entry.fromEntry))
  `);
};
