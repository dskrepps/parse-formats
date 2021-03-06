
/* Common patterns */
function parse (parser, data, opts) {
	return parser.parse(data, opts);
}

function self (parser, data, opts) {
	return parser(data, opts);
}


/* { ext: { moduleName: function(module, data, opts) } } */
module.exports = {
	'.cson':  { 'cson-parser': parse },
	'.csv':   {
		'parser-csv': function (parserCsv, data, opts) {
			return parserCsv.parseSync(data, opts);
		},
	},
	'.hjson': { 'hjson': parse },
	'.ini':   { 'ini': parse },
	'.json':  {
		'strip-json-comments': function (stripComments, data) {
			return JSON.parse(stripComments(data));
		},
		'path': function (_, data) {
			return JSON.parse(data);
		},
	},
	'.json5': { 'json5': parse },
	'.xml': {
		'xml2json': function (xml2json, data, opts) {
			return JSON.parse(xml2json.toJson(data, opts));
		},
	},
	'.yaml': { 'js-yaml': jsYaml },
	'.yml':  { 'js-yaml': jsYaml },
};

function jsYaml (jsYaml, data, opts) {
	return jsYaml.load(data, opts);
}