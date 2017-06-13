/*
*	Tap click Dom Element CN
*	by wooha@2016.04
* */

import React, {Component} from 'react';
import ReactDom from 'react-dom';

/*
*	React tap event component
*
*	Properties
*	@onTap::tap event handler
*	@tagName::component tagName,default with 'div'
*
*	case::
*	<ReactTapCN
*		className={clName}
*		onTap={this._onTap}
*		tagName={'li'}>
*		<div>xxxxx</div>
*	</ReactTapCN>
* */

class ReactTapCN extends Component {
	state = {
		isTap: "ontouchstart" in document ? false : true
	}

	render () {
		let TapDom = this.props.tagName || 'div';

		return (
			<TapDom {...this.props}
				onTouchStart={this._touchStart}
				onTouchMove={this._touchMove}
				onTouchEnd={this._touchEnd}
				onClick={this.state.isTap ? this._click : ''}>
				{this.props.children}
			</TapDom>
		)
	}

	_touchStart = () => {
		this.setState({isTap: true});
	}
	_touchMove = () => {
		this.setState({isTap: false});
	}
	_touchEnd = (e) => {
		if (this.state.isTap) {
			//this.props.onTap(this);
			this.props.onTap(e);
		}
		this.setState({isTap: false});
	}
	_click = (e) => {
		if (this.state.isTap) {
			this.props.onTap(e);
		}
	}
}

export default ReactTapCN;
