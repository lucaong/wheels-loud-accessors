var config = module.exports;

config["Node tests"] = {
	rootPath: "../",
	tests: ["spec/*.spec.js"],
	environment: "node"
};

config["Tests with Require JS"] = {
	rootPath: "../",
	environment: "browser",
	libs:  ["node_modules/requirejs/require.js", "spec/lib/dependencies-built.js"],
	sources: ["wheels-loud-accessors.js"],
	tests: ["spec/**/*.spec.js"],
	extensions: [require("buster-amd")]
};