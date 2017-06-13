var FScroll = require('./FScroll');
var _config = {
	cancel: '取消',
	ok: '确认',
	list:[
		{
			value: 'value',
			text: 'text'
		}
	],
	action: {
		ok: function() {},
		cancel: function() {}
	}
};
var _tpl = '<div id="popup_wrapper"> \
				<div id="popup_content">\
		            <div class="top">\
		                <span class="ppp_cancel">@{cancel}</span>\
		                <span class="ppp_ok">@{ok}</span> \
		            </div> \
		            <div class="content"> \
		            	<div class="scroll_wrapper"> \
			            	<ul class="scroll_content">\
				            	@{list} \
			            	</ul>\
		            	</div>\
		            </div>\
		        </div>\
        </div>',
    _tpl_list = '<li class="ppp_item" data-value="@{value}">@{text}</li>';

var _ppp_dom, _ppp_wrapper, _scrollTop;

var _out_class = !!navigator.userAgent.match(/android/i) ? 'ppp_out_plain' : 'ppp_out';

function _clickHandler (e) {
	e.preventDefault();
	e.stopPropagation();
	var target = e.target;
	var action = _config.action;
	var c = document.querySelector('.ppp_checked');
	if(target.classList.contains('ppp_cancel')) {
		action.cancel && action.cancel();
		_hide();
	} else if(target.classList.contains('ppp_ok')) {
		var value = c && c.dataset['value'];
		action.ok && action.ok(value);
		_hide();
	} else if(target.classList.contains('ppp_item')) {
		c && c.classList.remove('ppp_checked');
		target.classList.add('ppp_checked');
	}
}

function _preventDef (e) {
	e.preventDefault();
	e.stopPropagation();
}
function _eventBind () {
	_ppp_dom.addEventListener('click', _clickHandler);
	_ppp_wrapper.addEventListener('click', _preventDef);
	_ppp_wrapper.addEventListener('touchmove', _preventDef);
}
function _show() {
	if(!_ppp_dom) {
		return;
	}
	var checkedItem = document.querySelector('#popup_content .ppp_checked');
	checkedItem && checkedItem.classList.remove('ppp_checked');
	var fItem = document.querySelector('#popup_content .ppp_item:first-child');
	fItem && fItem.classList.add('ppp_checked');

	_ppp_wrapper.classList.add(_out_class);
	setTimeout(function() {
		_ppp_wrapper.setAttribute('style', 'background: rgba(0, 0, 0, 0.2)');
	}, 0);
	
}
function _hide() {
	_ppp_wrapper && _ppp_wrapper.classList.remove(_out_class);

	_ppp_wrapper.setAttribute('style', 'background: none');
}

function _init (conf) {
	_config = _.extend(_config, conf);

	if(_ppp_dom) {
		//_eventBind();
		_show();
		return;
	}
	var list = _config.list,
		tpl_list = '',
		tpl = '';

	list.forEach(function(item) {
		tpl_list += _tpl_list.replace(/@\{value\}/, item.value).replace(/@\{text\}/, item.text);
	})

	tpl = _tpl.replace(/@\{cancel\}/, _config.cancel).replace(/@\{ok\}/, _config.ok).replace(/@\{list\}/, tpl_list);

	document.body.insertAdjacentHTML('beforeend', tpl);

	_ppp_dom = document.querySelector('#popup_content');
	_ppp_wrapper = document.querySelector('#popup_wrapper');

	_eventBind();
	_show();

	//FScroll
	FScroll.init({
		wrapperClass: 'scroll_wrapper',
		contentClass: 'scroll_content'
	});
}
module.exports = {
	init: _init,
	hide: _hide
};