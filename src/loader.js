const path = require("path");
module.exports = function(_content) {
  const callback = this.async();
  const directory = path.dirname(this.resourcePath);

  this.addContextDependency(directory);

  const files = this.fs.readdirSync(directory).filter(file => {
    const ext = path.extname(file)
    return ext == ".mdx" || ext == ".js"
  });

  const collection = files.map(file =>
  `    "${directory}/${file}": {
        module: require("${directory}/${file}")
      }`).join(",\n") ;

  callback(null, `
    import { Collection, Entry } from "@tomafro/next-index/dist/collection"

    export default Collection.from(Object.entries({
      ${collection}
    }).map(Entry.fromEntry))
  `);
};
