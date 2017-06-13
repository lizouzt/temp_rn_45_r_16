'use strict';

import ActionTypes from '../constants/ItemDetail';

export type Action = 
{
	type: ActionTypes.ITEM_INFO_END,
	data: object
} | {
	type: ActionTypes.DETAIL_INFO_END,
	data: string
} | {
	type: ActionTypes.INIT_SELECTOR,
	data: object
} | {
	type: ActionTypes.SELECTOR_ACTIVE
} | {
	type: ActionTypes.TOGGLE_SELECTOR,
	flag: boolean
} | {
	type: ActionTypes.UPDATE_ITEM_COUNT,
	data: object
};