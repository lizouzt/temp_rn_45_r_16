'use strict';
var keyMirror = require('keymirror');

const ActionTypes = keyMirror({
	ITEM_INFO_END: null,
	DETAIL_INFO_END: null,
	SELECTOR_ACTIVE: null,
	INIT_SELECTOR: null,
	ADD_ITEM: null,
	DEL_ITEM: null,
	ITEM_SELECT_UPDATE: null,
	SKU_CHANGE: null,
	TOGGLE_SELECTOR: null,
	UPDATE_ITEM_COUNT: null,
	ASSOCIATE_LIST_END: null
});

export default ActionTypes;
