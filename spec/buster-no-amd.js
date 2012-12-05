var config = module.exports;

/* Test in browser with no AMD */
config["Browser tests"] = {
	rootPath: "../",
	libs: ["node_modules/wheels-pubsub/node_modules/wheels-class/wheels-class.js", "node_modules/wheels-pubsub/wheels-pubsub.js"],
	sources: ["wheels-loud-accessors.js"],
	tests: ["spec/*.spec.js"]
};