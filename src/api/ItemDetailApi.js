import {dispatch} from '../dispatcher/utilsDispatcher';

import utils from '../utils/utils';
import ActionTypes from '../constants/ItemDetail';

const Api = {
    requestDetailInfo: function (id) {
        lib.tip.show('努力加载中...');
        lib.api.request({
            api: 'xmall.item.getDetailInfo',
            type: 'post',
            data: {goods_id: id},
            success: function (obj) {
                lib.tip.hide();
                if (utils.ruOK(obj)) {
                    dispatch({
                        type: ActionTypes.ITEM_INFO_END,
                        data: obj.data
                    });
                    
                    Api.getAssociates(id);

                } else utils.rendErr(obj, obj.status.msg)
            },
            error: function(e){
                lib.tip.hide();
                utils.rendErr(e, '连接错误，请刷新重试！')
            }
        });
    },

    getAssociates: function (id) {
        lib.api.request({
            api: 'xmall.item.getAssociates',
            data: {id: id},
            type: 'post',
            success: function (obj) {
                if (utils.ruOK(obj)) {
                    dispatch({
                        type: ActionTypes.ASSOCIATE_LIST_END,
                        list: obj.data.ass_list || []
                    });
                } else lib.tip.toggle(obj.status.msg);
            }, error: function (obj) {
                lib.tip.toggle(obj.status.msg);
            }
        });
    }
};

export default Api;