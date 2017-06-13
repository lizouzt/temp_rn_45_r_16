/*
*
* TODO::改写
usage :
toast.show({
	type: "success", 	//type,title存在一个即可：success or false
    title: '提示',
    text: '你已经成功获得了一张50元优惠券！快去选购心仪的商品吧！',
    btn: [
        {
            text: '返回'
        },
        {
            text: '去选商品',
            callback: function () {
                console.log(1);
            }
        }
    ]
});
toast.hide()

*/
var tpl = '<div class="toast-wrapper">\
	<div class="toast-mask"></div>\
    <div class="toast-frame">\
        <div class="toast-top">\
        </div>\
        <div class="toast-text">\
        </div>\
        <div class="toast-btn-group">\
        </div>\
    </div>\
</div>';

var dom = null;
function init () {
	document.body.insertAdjacentHTML('beforeend', tpl);
	dom = document.body.querySelector('.toast-wrapper');
}
function setOption (options) {
	if(typeof options.type != 'undefined'){
		setImg(options.type)
	}else {
		setTitle(options.title || '');
	}
	setText(options.text || '');
	setBtn(options.btn || []);
	dom.classList.add('show');
}
function setImg(type){
	dom.querySelector('.toast-top').innerHTML = `<div class="toast-logo ${type}"></div>`
}
function setTitle (title) {
	dom.querySelector('.toast-top').innerHTML = `<div class="toast-title">${title}</div>`;
}
function setText (text) {
	dom.querySelector('.toast-text').innerHTML = text;
}
function setBtn (optGroup) {
	var groupDom = dom.querySelector('.toast-btn-group');
	groupDom.innerHTML = '';

	if (optGroup) {
		optGroup.forEach(function (item) {
			var doc = document.createElement('button');
			doc.classList.add('btn');
			doc.innerText = item.text;
			doc.addEventListener('click', function () {
				hide();
				item.callback && item.callback();
			});
			groupDom.appendChild(doc);
		}, false);
	} else {
		groupDom.classList.add('hide');
	}
}
function hide () {
	dom && dom.classList.remove('show');
}

init();

module.exports = window.toast = {
	show: function (opt) {
		setOption(opt);
	},
	toggle: function(opt, t){
		this.show(opt);
		setTimeout(this.hide, t || 2000)
	},
	hide: hide
};