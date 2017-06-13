import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import ActionTypes from '../../constants/ItemDetail';
import {dispatch} from '../../dispatcher/utilsDispatcher';

import Api from '../../api/ItemDetailApi';
import ItemCell from './ItemCell';
import SkuCell from './SkuCell';

function generateFirstCell (item) {
	return (
		<ItemCell 
			key={item.goods_id}
			onTryToChangeItem={this._tryToChangeItem}
			item={item}
			curId={this.props.selector.goods_id}/>
	)
}

function generateFirstSet (selector) {
	if (_.isArr(selector.super_goods_list) &&  selector.super_goods_list.length != 0) {
		const attrFirst = selector.super_goods_list.map(generateFirstCell.bind(this));
		return (
			<div className="first">
				<h4>{selector.super_goods_desc}</h4>
				<ul 
					className="clearfix">
					{attrFirst}
				</ul>
			</div>
		)
	}
}

function generateSecondCell (item) {
	return (
		<SkuCell
			key={item.sku_id}
			item={item}
			curId={this.state.sku_id || null}
			onChangeSKU={this._changeSKU}/>
	)
}

function generateSecondSet (selector) {
	let attrSecond = selector.sku_list.map(generateSecondCell.bind(this));
	return (
		<div className={"second" + (!!selector.super_goods_desc ? '' : ' s_only')}>
			<h4>{!!selector.super_goods_desc ? selector.sku_list_desc : ' '}</h4>
			<ul className="clearfix">
				{attrSecond}
			</ul>
		</div>
	)
}

function generatePanel (selector) {
	const setFirst = generateFirstSet.bind(this)(selector);
	const setSecond = generateSecondSet.bind(this)(selector);

	const isActive = this.state.is_active || this.props.activeIt ? ' active' : '';

	return (
	    <div 
			id="J_ids_panel"
			className={"ids_panel" + isActive}>
			
			<div className="idsp_hold" onTouchStart={this._selectorNegative} onTouchMove={this.props.onPreventMove}></div>

			<div className="idsp_wrap">
				<div className="idsp_nav" onTouchMove={this.props.onPreventMove}>
					<span>{selector.sku_desc_org}</span>
					<button 
						type="button"
						onTouchStart={this._selectorNegative}>
						<i className="c_i i_close"></i>
					</button>
				</div>

				<div className="idsp_is" onTouchMove={this._preventMove}>
					<div className="idsp_selector">
						{setFirst}
						{setSecond}
					</div>

					<div className="idsp_counter">
						<span>购买数量</span>
						<div>
							<span onTouchStart={this._delItem} className={this.state.disDel ? 'disable' : ''}>-</span>
							<input 
								type="text"
								readOnly
								maxLength="3"
								value={this.state.item_count}
							></input>
							<span onTouchStart={this._addItem} className={this.state.disAdd ? 'disable' : ''}>+</span>
						</div>
					</div>
				</div>
			</div>
	    </div>
	)
}

let selectorRoll = false, entryTap = false;

export default class Selector extends Component {
	state = {
		/*
		*	商品属性值
		* */
		sku_id: this.props.selector.sku_id || '',
		item_count: 1,

		mail_fee: '',
		left_count: 100,
		is_active: false,

		disDel: true,
		disAdd: false,
		moveprevented: false,

		tip: "该商品没有更多库存了"
	}

	componentDidMount = () => {
		this._scrollPreventJudge();
        document.getElementById('J_loading').classList.remove('active');
    }

    render(): ?ReactElement {
        const {selector} = this.props;
        const Panel = generatePanel.bind(this)(selector);

        return (
            <div className="id_selector">
          		<div 
          			onTouchStart={this._entryTouchStart}
          			onTouchMove={this._entryTouchMove}
          			onTouchEnd={this._entryTouchEnd}
          			className="ids_entry">
          			{selector.sku_desc}
          			<i className="c_i i_arrow_right_grey"></i>
          		</div>

          		{Panel}
            </div>
        );
    }

    _entryTouchStart = () => {
    	entryTap = true;
    }

    _entryTouchMove = () => {
    	entryTap = false;
    }

    _entryTouchEnd = () => {
    	entryTap && this._selectorActive();
    }

    _scrollPreventJudge = () => {
    	let selector_dom = ReactDOM.findDOMNode(this);

    	let inner_dom = selector_dom.querySelector('.idsp_is');
    	selectorRoll = inner_dom.scrollHeight <= inner_dom.clientHeight;
    }

    _preventMove = (e) => {
    	if (selectorRoll) {
			e.preventDefault();
			e.stopPropagation();
		}
    }

    _selectorActive = () => {
    	this.setState({is_active: true});
    }

    _selectorNegative = () => {
    	this.setState({is_active: false});
    	dispatch({
    		type: ActionTypes.ITEM_SELECT_UPDATE,
    		data: this.state
    	});
    }

    _tryToChangeItem = (id, name) => {
    	/*
    	*	TODO::update location parameter
    	* */
    	this._scrollPreventJudge();

    	this.setState({
    		item_name: name, 
    		goods_id: id,
    		sku_id: '',
    		unit_price: '',
    		mail_fee: '',
    		item_count: 1, 
    		disDel: true,
    		disAdd: false
    	});
    	Api.requestDetailInfo(id);
    	history.pushState(null, '商品详情', './item-detail.html?h_id=' + id);
    }

    _changeSKU = (sku) => {
    	if (sku.left_count > 0) {
	    	dispatch({
	    		type: ActionTypes.ITEM_SELECT_UPDATE,
	    		data: _.extend({}, {
	    			title: sku.title,
	    			sku_id: sku.sku_id,
		    		mail_type: sku.mail_type,
		    		mail_fee: sku.mail_fee,
		    		unit_price: sku.unit_price,
	    			activeIt: this.props.activeIt
	    		})
	    	});
	    	
	    	let min_num = sku.left_count, disTip = this.state.tip;
	    	if (this.props.totalLimit < min_num) {
	    		disTip = "限购商品,您无法购买更多该商品";
				min_num = this.props.totalLimit;
			}
	    	if (this.props.onceLimit < min_num) {
	    		disTip = "限购商品,您无法购买更多该商品";
				min_num = this.props.onceLimit;
			}
	    	
	    	if (min_num <= this.state.item_count) {
	    		this.setState({
	    			title: sku.title,
		    		sku_id: sku.sku_id,
		    		mail_type: sku.mail_type,
		    		mail_fee: sku.mail_fee,
		    		unit_price: sku.unit_price,
		    		left_count: min_num,
	    			item_count: min_num,
	    			disAdd: true,
	    			disDel: min_num <= 1,
	    			tip: disTip
	    		});

	    		dispatch({
		    		type: ActionTypes.UPDATE_ITEM_COUNT,
		    		data: {
		    			item_count: min_num
		    		}
		    	});
	    	} else {
	    		this.setState({
		    		title: sku.title,
		    		sku_id: sku.sku_id,
		    		mail_type: sku.mail_type,
		    		mail_fee: sku.mail_fee,
		    		unit_price: sku.unit_price,
		    		left_count: sku.left_count,
		    		disAdd: false,
	    			disDel: this.state.item_count <= 1
		    	});
	    	}
	    }
    }

    _delItem = () => {
    	const item_count = this.state.item_count;
    	let newCount = item_count - 1;
    	let flag = newCount <= 1 ? true : false;
    	if (item_count > 1) {
    		this.setState({item_count: newCount, disAdd: false, disDel: flag});

    		dispatch({
	    		type: ActionTypes.UPDATE_ITEM_COUNT,
	    		data: {
	    			item_count: newCount
	    		}
	    	});
    	} else 
    		this.setState({disDel: flag});
    }

    _addItem = () => {
    	if (!this.state.sku_id) {
    		lib.tip.toggle(this.props.selector.sku_desc_org);
    	} else if (this.state.disAdd) {
    		lib.tip.toggle(this.state.tip);
    	} else {
    		const item_count = this.state.item_count;
	    	let min_num = this.props.onceLimit, disTip = "限购商品, 您无法再购买该商品";
	    	min_num > this.props.totalLimit && (min_num = this.props.totalLimit);
	    	
	    	if (min_num > this.state.left_count) {
	    		min_num = this.state.left_count;
				disTip 	= "该商品没有更多库存了";
			}

	    	let newCount = item_count + 1;
	    	let flag = newCount >= min_num ? true : false;
	    	if (item_count < min_num) {
	    		this.setState({item_count: newCount, disDel: false, disAdd: flag, tip: disTip});

	    		dispatch({
		    		type: ActionTypes.UPDATE_ITEM_COUNT,
		    		data: {
		    			item_count: newCount
		    		}
		    	});
	    	} else 
	    		this.setState({disAdd: flag, tip: disTip});
    	}
    }
}