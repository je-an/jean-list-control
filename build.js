({
    baseUrl: '.',
    out: 'dist/jean-list-control.js',
    optimize: 'none',
    name: 'node_modules/jean-amd/dist/jean-amd',
    include: ["src/ListControl"],
    wrap: {
        start:
            "(function (root, factory) { \n" +
            " \t if (typeof define === 'function' && define.amd) { \n" +
            "\t \t define([], factory); \n" +
            "\t} else { \n" +
            "\t \troot.ListControl = root.ListControl || {}; \n" +
            "\t \troot.ListControl = factory();\n" +
            "\t}\n" +
            "}(this, function() {",
        end:
            "\n \t return require('src/ListControl'); \n" +
            "}));"
    },
    paths: {
        "text": "node_modules/text/text",
        "css": "node_modules/require-css/css",
        "css-builder": "node_modules/require-css/css-builder",
        "normalize": "node_modules/require-css/normalize",
        TypeCheck: "node_modules/jean-type-check/src/TypeCheck",
        Failure: "node_modules/jean-failure/src/Failure",
        Inheritance: "node_modules/jean-inheritance/dist/jean-inheritance",
        ListControlBase: "node_modules/jean-list-control-base/dist/jean-list-control-base",
        DomUtil: "node_modules/jean-dom-util/dist/jean-dom-util",
        Merge: "node_modules/jean-merge/dist/jean-merge",
        "list-control-html": "src/html/list-control.html",
        "list-element-html": "src/html/list-element.html",
        "list-control-css": "src/css/list-control"
    },
    stubModules: ["css", "text", "normalize", "css-builder"]
})