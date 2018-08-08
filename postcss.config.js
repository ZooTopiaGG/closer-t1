var postcssPr = require('postcss-pr');
var postcssImport = require('postcss-import');
var cssnext = require("postcss-cssnext")

module.exports = {
    plugins: [
        postcssImport,
        cssnext({
            features: {
                rem: false
            }
        }),
        postcssPr({
            fontSize: 32
        })
    ]
}