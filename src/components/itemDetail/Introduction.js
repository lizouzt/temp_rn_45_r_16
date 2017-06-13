import React from 'react';

var hasLoaded = false;

var Introduction = React.createClass({
	render: function () {
		const {href} = this.props;
        return (
        	<div>
        		<div className="id_tip"
	                onClick={this._loadIntroduction}>
	                <span>点击查看详情</span>
	            </div>
	            <div className="id_introducation">
	                <div id="J_intro_loading" className="loading active"><span>加载中</span><sup>......</sup></div>
	            </div>
        	</div>
        )
	},

	_loadIntroduction: function () {
        var docWrapper = document.querySelector('.id_introducation');

        if (!this.props.href) {
            lib.tip.toggle("没有商品详情");
            return false;
        }

        if (!hasLoaded) {
        	docWrapper.style.minHeight = document.documentElement.clientHeight - 80 + 'px';
            
            lib.ajax({
                url: this.props.href,
                format: 'text',
                success: function (obj) {
                	hasLoaded = true;

                	var body = obj.match(/<body[^\>.]*>(.+)<\/body>/i);
                	if (!!body && body.length > 1) {
                    	docWrapper.innerHTML = body[1];
                    } else lib.tip.toggle('详情数据有误<br>刷新试试！');
                    docWrapper.classList.remove('holder');
                },
                error: function (obj) {
                    lib.tip.toggle(obj.status.msg || '加载数据失败<br>刷新试试！');
                }
            });
        }
        
        docWrapper.classList.add('active');
        setTimeout(function () {
    		docWrapper.parentElement.scrollIntoView();
    	}, 100);
    }
})

module.exports = Introduction;
