var WebviewPrefix   = "codoon://www.codoon.com/codoon/web_view?url=";
var NOTAPP          = !(/codoon/i.test(window.navigator.userAgent));
var _hrefs          = {};

function _printError(err) {
    console.warn(err);
}
function _config(h) {
    _hrefs = h || {};
}
/*
*   跳转方式默认优先Native版本
*   主客内部跳转H5默认在新WebView打开
*   每个Native链接增加版本号匹配，如果当前客户端低于配置版本则改用H5地址，此处不考虑没有对应H5页面的情况
*
* pageKey: 'xmall.goods.list',
* config: {
*      web: {h_id: '234234', msg: ''},
*      client: {goods_id: '234234', msg: ''},
*      newView: true,
* }
*/
function _getHref(pageKey, config) {
    config = _.extend({newView: !NOTAPP}, config);
    var page = _hrefs[pageKey];
    if (!page) {
        _printError('未找到页面' + pageKey);
        return false;
    }

    var href    = NOTAPP ? page.web : page.client || page.web;
    var params  = NOTAPP ? config.web : config.client || config.web;

    if ('version' in href && href.version > DEVICES.APPVersion) {
        href    = page.web;
        params  = config.web;
    }
    
    if('params' in href) {
        var err = '';
        for(var p in href.params) {
            if(href.params[p]['require'] && !(p in params)) {
                err += 'param "' + p + '" is required!\n'
            }
        }
        if(err) {
            _printError(err)
            return;
        }
    }

    var searchArr = [];
    var searchStr = '';
    for(var q in params) {
        searchArr.push(q + '=' + params[q]);
    }
    if(searchArr.length) {
        searchStr = '?' + searchArr.join('&');
    }
    var url = (/^(http|https|codoon)/.test(href.url) ? '' : window.location.protocol) + href.url + searchStr;
    if(config.newView && !/codoon:\/\//.test(url)) {
        url = WebviewPrefix + encodeURIComponent(encodeURI(url));
    }

    return url;
    
}

var lib = window.lib || (window['lib'] = {});
lib.Href = {
    config: _config,
    get: _getHref,
};
