import {ReduceStore} from 'flux/utils';

import Dispatcher from '../dispatcher/utilsDispatcher';
import ActionTypes from '../constants/ItemDetail';
import utils from '../utils/utils';

import {dispatch} from '../dispatcher/utilsDispatcher';

class ItemInfoStore extends ReduceStore {
	getInitialState () {
		return {
			goods_id: "",
			goods_title: "",
			goods_price: "",
			goods_mprice: "",
			goods_mail: "",
			goods_desc: "",
			pic_urls: ['https://codoon-img3.b0.upaiyun.com/cdmall9880933441460..name'],
			sp_phone: '',
			sp_name: '',
			sp_id: '',
			detail_info: '',
			state: '',  					//已审核、已上架、已撤下，除了已上架则disable button
			market_info: {
			    coin_desc: ''
			},
			show_sold_all: true,
			sold_all_desc: 999,

	        buy_once_limit: 100,         	//商品单个限购个数
	        buy_times_limit: 100,         	//商品当前还能买几个

	        quality_assure: true,			//正品保证、七天退货标语控制

	        ass_list: []					//关联商品
		}
	}

	reduce (state, action) {
		switch (action.type) {
			case ActionTypes.ITEM_INFO_END:
				let mail_fee = action.data.goods_mail;
				action.data.goods_mail = mail_fee == "0" ? "免邮" : ("¥" + mail_fee);

				return utils.extend({}, state, action.data);
			case ActionTypes.ITEM_SELECT_UPDATE:
				let goods_mail = String(action.data.mail_fee) && String(action.data.mail_fee) != 'undefined'
									? (action.data.mail_fee == "0" ? "免邮" : ("¥" + (action.data.mail_fee / 100).toFixed(2)))
									: state.goods_mail;

				let price = action.data.unit_price ? (action.data.unit_price / 100).toFixed(2) : state.goods_price;

				return utils.extend({}, state, {
					goods_mail: goods_mail,
					goods_price: price
				});
			case ActionTypes.ASSOCIATE_LIST_END:
				return utils.extend({}, state, {
					ass_list: action.list
				});
			case ActionTypes.UPDATE_ID:
				return utils.extend({}, state, {
					goods_id: action.data
				});
			default:
				return state;
		}
	}
}

const itemInfo = new ItemInfoStore(Dispatcher);
module.exports.ItemInfoStore = itemInfo;
