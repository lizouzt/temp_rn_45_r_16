/*
*	common config and verify
* */
var bucket = require('./api-bucket');

/*
*	site config
* */
lib.api.config({
	bucket: bucket,
    proHost: 'xmall.codoon.com',
    data: {
        module: "mall"
    }
});

/*
* Hybird 
* */
var ua = navigator.userAgent.toLowerCase();
var isApp = /codoon/i.test(ua);
var isIOS 	= /iphone|ipod|ipad|itouch/i.test(ua);

var Devices = {
	isApp: isApp,
	isIOS: isIOS,
	APPVersion: (function  () {
		if (isApp) {
			var version = ua.split(" ")[0].split("(")[1];
			return version;
		}
		return '0';
	})()
};
/*
*	主客参数，全局暴露
* */
window.DEVICES 			= Devices;
window.NOTAPP		 	= !isApp;
window.WEBVIEWOPEN		= "codoon://www.codoon.com/codoon/web_view?url=";
window.APPITEMDETAIL	= 'codoon://www.codoon.com/mall/goods_detail?goods_id=';
window.WEBITEMDETAIL 	= location.href.match(/.+\/demo|.+\/html/) + '/item-detail.html?h_id=';
window.ITEMDETAIL 		= NOTAPP ? WEBITEMDETAIL : APPITEMDETAIL;

function HybirdMenu (needInit) {
	var options = JSON.stringify({"showShare": 0,"showFeedback": 0});
	if (isIOS && window.WebViewJavascriptBridge) {
		needInit && !window._isCBJInited && WebViewJavascriptBridge.init(function (message, responseCallback) {window._isCBJInited = true;});
		WebViewJavascriptBridge.callHandler("web_browser_setting", options);
	} else if (window.jsObj) {
		window.jsObj.web_browser_setting && window.jsObj.web_browser_setting(options);
	}
}

function initWebViewConfig () {
	if (!isApp) {
		return true;
	} else {
		if (!!window.WebViewJavascriptBridge || window.jsObj) {
			HybirdMenu(true);
		} else {
			document.addEventListener('WebViewJavascriptBridgeReady', function() {
				HybirdMenu(true);
			}, false);
		}
	}
}
initWebViewConfig();

require('./href-generator');
var hrefMap = require('./href-map');
lib.Href.config(hrefMap);
