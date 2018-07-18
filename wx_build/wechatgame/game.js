require('libs/weapp-adapter/index');
var Parser = require('libs/xmldom/dom-parser');
window.DOMParser = Parser.DOMParser;
require('libs/wx-downloader.js');
wxDownloader.REMOTE_SERVER_ROOT = "http://www.enjoymygame.com/xiaochengxu";
wxDownloader.SUBCONTEXT_ROOT = "";
require('src/settings.64cd4');
require('main.90fcf');