var _scrollWrapper,
	_scrollCont;

var _offset = 0;

var _moveY, _touchY, _distance = 0;
var _touchFlag = false;

function _move(here) {
	_scrollCont && _scrollCont.setAttribute('style', '-webkit-transform: translatey('+ here + 'px);')
}
function _moveBack(here) {
	_scrollCont && _scrollCont.setAttribute('style', '-webkit-transition: -webkit-transform 0.2s linear;-webkit-transform: translatey('+ here + 'px);')
}

function _startHandler(e) {
	var touch = e.touches[0];
	_touchY = touch.pageY;
	_touchFlag = true;
}
function _moveHandler(e) {
	e.preventDefault();	
	if(!_touchFlag) return;
	var touch = e.touches[0];
	_moveY = touch.pageY;
	var location = _moveY - _touchY + _distance;
	if(location < 20 && location > (-_offset-20) ) {
		_move(location);
	}
}
function _endHandler(e) {
	_distance = _moveY - _touchY + _distance;
	if(_distance > 0) {
		_moveBack(0);
		_distance = 0;
	} else if(_distance < -_offset) {
		_moveBack(-_offset);
		_distance = -_offset;
	}
	_touchFlag = false;
}

function _bindEvent() {
	_scrollWrapper.addEventListener('touchstart', _startHandler, false);
	_scrollWrapper.addEventListener('touchmove', _moveHandler, false);
	_scrollWrapper.addEventListener('touchend', _endHandler, false);
}

function _init(conf) {
	if(!conf.wrapperClass || ! conf.contentClass) return;
	_scrollWrapper = document.querySelector('.' + conf.wrapperClass);
	_scrollCont = document.querySelector('.' + conf.contentClass);

	_offset = _scrollCont.offsetHeight - _scrollWrapper.offsetHeight;
	_offset = _offset < 0 ? 0 : _offset;

	_bindEvent();
}

module.exports = {
	init: _init
}