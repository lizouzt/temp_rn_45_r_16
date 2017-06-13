var React = require('react');
var ReactPropTypes = React.PropTypes;

var NotFound = React.createClass({
	propTypes: {
		text: ReactPropTypes.string
	},

	render: function () {
		return (
			<div className="J_not_found">
				<div className="warp">
					<div className="icon"></div>
					<div className="text">{this.props.text || '数据请求失败^_^'}</div>
					<div 
						className="reload"
						onClick={this._refresh}>
						<span className="reload-btn">重新加载</span>
					</div>
				</div>
			</div>
		);
	},

	_refresh: function () {
		window.location.reload();
	}
});

module.exports = NotFound;