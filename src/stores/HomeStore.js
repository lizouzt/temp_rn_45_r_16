import {ReduceStore} from 'flux/utils';

import Dispatcher from '../dispatcher/utilsDispatcher';
import ActionTypes from '../constants/HomePage';
import utils from '../utils/utils';

import {dispatch} from '../dispatcher/utilsDispatcher';

class HomeInfoStore extends ReduceStore {
	getInitialState () {
		return {
			today_title: 'THIS IS FKH'
		}
	}

	reduce (state: Object, action: Action) {
		switch (action.type) {
			default:
				return state;
		}
	}
}

const homeInfo = new HomeInfoStore(Dispatcher);
module.exports.HomeStore = homeInfo;