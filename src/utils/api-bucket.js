/*
*接口映射表
*
{
    devUrl:     //开发环境地址
    url:        //线上环境地质
    methods:    //兼容的HTTP方法
    require:    //必填字段
    optional:   //选填字断
}
**/
var hostname = window.location.hostname;
var APIBucket = {
    'xmall.token2session': {
        devUrl: '//xmall.codoon.com/xmall/tokensession',
        url: '//xmall.codoon.com/xmall/tokensession',
        methods: ['GET'],
        required: [{
            'key': 'token',
            'type': 'string'
        }],
        desc: "cookie写入",
    },
    /****************************商家店铺***************************/
    'xmall.shop.itemList': {
        devUrl: '//xmall.codoon.com/api/mall/xmall/channel/query_sp_goods',
        url: '//xmall.codoon.com/api/mall/xmall/channel/query_sp_goods',
        methods: ['GET'],
        required: [{
            'key': 'sp_id',
            'type': "string"
        }],
        desc: "获取商品单价列表",
    },
    'xmall.shop.getInfo': {
        devUrl: '//xmall.codoon.com/api/mall/xmall/channel/get_spinfo',
        url: '//xmall.codoon.com/api/mall/xmall/channel/get_spinfo',
        methods: ['GET'],
        required: [{
            key: 'sp_id',
            type: "string",
            desc: "商户ID"
        }],
        desc: "获取商品单价列表",
    },
    /*****************************物流*************************/
    'xmall.logistics.getInfo': {
        devUrl: '//xmall.codoon.com/api/mall/order/xmall/get_logistics',
        url: '//xmall.codoon.com/api/mall/order/xmall/get_logistics',
        methods: ['GET'],
        required: [{
            key: 'order_id',
            type: 'string',
            desc: '订单ID'
        },{
            key: 'logistic_id',
            type: 'string',
            desc: '包裹ID'
        }],
        desc: "获取物流详情",
    },
    /*****************************商品详情**************************/
    'xmall.item.getDetailInfo': {
        devUrl: '//xmall.codoon.com/api/mall/webmall/query_goods',
        url: '//xmall.codoon.com/api/mall/webmall/query_goods',
        methods: ['POST'],
        required: [{
            key: 'goods_id',
            type: 'string',
            desc: '商品ID'
        }],
        desc: "商品详情信息.获取"
    },
    'xmall.item.getAssociates': {
        devUrl: '//xmall.codoon.com/api/mall/webmall/get_goods_comment',
        url: '//xmall.codoon.com/api/mall/webmall/get_goods_comment',
        methods: ['POST'],
        required: [{
            key: 'id',
            type: 'string',
            desc: '商品ID'
        }],
        desc: '商品详情.获取相关测评'
    },
    /**********************订单列表**************************/
    'xmall.orders.getList': {
        devUrl: '//xmall.codoon.com/api/mall/webmall/my_orders',
        url: '//xmall.codoon.com/api/mall/webmall/my_orders',
        methods: ['post'],
        desc: '订单列表.获取订单列表'
    },
    /**********************订单确认**************************/
    'xmall.order.confirm.getInfo': {
        //devUrl: 'http://ac-OnsG2j7w.clouddn.com/c8c070365ccb5851.json',
        devUrl: '//xmall.codoon.com/api/mall/webmall/new_order_param',
        url: '//xmall.codoon.com/api/mall/webmall/new_order_param',
        required: [{
            key: 'from_cart',
            type: "boolean"
        },{
            key: 'goods_id',
            type: "string"
        },{
            key: 'sku_id',
            type: "string"
        },{
            key: 'purchase_num',
            type: "number"
        }],
        methods: ['GET'],
        desc: "订单确认.获取详情"
    },
    'xmall.order.confirm.calpay': {
        devUrl: '//xmall.codoon.com/api/mall/webmall/pay_amount',
        url: '//xmall.codoon.com/api/mall/webmall/pay_amount',
        methods: ['POST'],
        required: [{
            key: 'from_cart',
            type: "boolean"
        },{
            key: 'coupon_id',
            type: "string",
            desc: "优惠券ID"
        },{
            key: 'balance_amount',
            type: "number"
        },{
            key: 'choose_balance',
            type: "boolean"
        },{
            key: 'choose_coin',
            type: "boolean"
        },{
            key: 'choose_coupon',
            type: "boolean"
        },{
            key: 'goods_info',
            type: "object"
        }],
        desc: "订单确认.计算价格"
    },
    'xmall.order.confirm.neworder': {
        devUrl: '//xmall.codoon.com/api/mall/webmall/new_order',
        url: '//xmall.codoon.com/api/mall/webmall/new_order',
        required: [{
            key: 'address',
            type: "object",
            desc: "地址信息"
        },{
            key: 'balance',
            type: "object",
            desc: "余额抵扣"
        },{
            key: 'cal_pay',
            type: "object",
            desc: "支付详情"
        },{
            key: 'coin',
            type: "object",
            desc: "卡币信息"
        },{
            key: 'coupon',
            type: "object",
            desc: "优惠券信息"
        },{
            key: 'goods_info',
            type: "object",
            desc: "商品详情"
        },{
            key: 'from_cart',
            type: "boolean"
        }],
        methods: ['POST'],
        desc: "订单确认.订单生成"
    },
    'xmall.order.pay': {
        devUrl: '//xmall.codoon.com/api/mall/webmall/pay_order',
        url: '//xmall.codoon.com/api/mall/webmall/pay_order',
        methods: ['POST'],
        required: [{
            key: 'order_id',
            type: "string"
        },{
            key: 'channel_id',
            type: "number",
            desc: "支付方式:1-支付宝;2-微信"
        }],
        desc: "订单确认.生成订单后获取支付信息"
    },
    /**************************订单详情*****************************/
    'xmall.order.detail.getInfo': {
        devUrl: '//xmall.codoon.com/api/mall/webmall/order_detail',
        //devUrl: 'http://ac-OnsG2j7w.clouddn.com/9b75ccf683215c0f.json',
        url: '//xmall.codoon.com/api/mall/webmall/order_detail',
        methods: ['GET'],
        required: [{
            key: 'order_id',
            type: "string",
            desc: "订单ID"
        }],
        desc: "订单详情页.获取详情"
    },

    'xmall.order.confirmReceive': {
        devUrl: '//xmall.codoon.com/api/mall/webmall/confirm_order_recved',
        url: '//xmall.codoon.com/api/mall/webmall/confirm_order_recved',
        methods: ['POST'],
        required: [{
            key: 'order_id',
            type: "string",
            desc: "订单ID"
        }],
        desc: '订单详情&订单列表.确认收货'
    },
    'xmall.order.cancelOrder': {
        devUrl: '//xmall.codoon.com/api/mall/webmall/cancel_order',
        url: '//xmall.codoon.com/api/mall/webmall/cancel_order',
        methods: ['POST'],
        required: [{
            key: 'order_id',
            type: "string",
            desc: "订单ID"
        },{
            key: 'cancel_reason',
            type: "string",
            desc: "取消订单原因"
        }],
        desc: '订单详情&订单列表.取消订单'
    },
    /**************************支付详情*****************************/
    'xmall.order.response.trade.success': {
        devUrl: '//xmall.codoon.com/api/mall/webmall/order_pay_result',
        url: '//xmall.codoon.com/api/mall/webmall/order_pay_result',
        methods: ['POST'],
        required: [{
            key: 'order_id',
            type: "string",
            desc: "订单ID"
        },{
            key: 'channel_id',
            type: "number",
            desc: "支付类型:1-支付宝;2-微信"
        },{
            key: 'result',
            type: "number",
            desc: "支付结果:0-失败;1-支付成功;"
        }],
        desc: "支付成功后,告知服务器"
    },
    /**************************我的优惠券页*****************************/
    'xmall.coupon.get.list': {
        devUrl: '//xmall.codoon.com/api/mall/webmall/coupon/my_coupon',
        url: '//xmall.codoon.com/api/mall/webmall/coupon/my_coupon',
        //devUrl: "http://ac-OnsG2j7w.clouddn.com/8c4052f9dc84814a.json",
        methods: ['POST'],
        required: [{
            key: 'page_num',
            type: "number"
        },{
            key: 'page_size',
            type: "number"
        },{
            key: 'type',
            type: "string",
            desc: '是否过期'
        }],
        desc: "获取优惠券列表"
    },
    'xmall.coupon.add.one': {
        devUrl: '//xmall.codoon.com/api/mall/webmall/coupon/exchange_coupon',
        url: '//xmall.codoon.com/api/mall/webmall/coupon/exchange_coupon',
        //devUrl: 'http://ac-OnsG2j7w.clouddn.com/4dd6897a5008bb2a.json',
        methods: ['POST'],
        required: [{
            key: 'promotion_code',
            type: 'string',
            desc: '兑换码'
        },{
            key: 'type',
            type: 'string',
            desc: '标记我的优惠券or优惠券选择'
        }],
        optional: [{
            key: 'goods_id',
            type: 'string',
            desc: '商品ID'
        }, {
            key: 'total_fee',
            type: 'number',
            desc: '总价'
        },{
            key: 'mail_fee',
            type: 'number',
            desc: '邮费'
        }],
        desc: "兑换优惠券"
    },
    'xmall.coupon.get.choose.list': {
        devUrl: '//xmall.codoon.com/api/mall/webmall/coupon/valid_coupon',
        url: '//xmall.codoon.com/api/mall/webmall/coupon/valid_coupon',
        methods: ['POST'],
        required: [{
            key: 'goods_id',
            type: 'string',
            desc: '商品ID'
        }, {
            key: 'total_fee',
            type: 'number',
            desc: '总价'
        },{
            key: 'mail_fee',
            type: 'number',
            desc: '邮费'
        },{
            key: 'page_num',
            type: "number"
        },{
            key: 'page_size',
            type: "number"
        }],
        desc: "获取优惠券选择列表"
    },
    /**************************购物车***************************/
    'xmall.shopCart.getList': {
        // devUrl: '//ac-OnsG2j7w.clouddn.com/55839254c9679d0b.json',
        devUrl: '//xmall.codoon.com/api/mall/xmall/cart/get_list',
        url: '//xmall.codoon.com/api/mall/xmall/cart/get_list',
        methods: ['GET'],
        required: [{
            key: 'page_num',
            type: 'number'
        }, {
            key: 'page_size',
            type: 'number'
        }],
        desc: "用户购物车.获取列表"
    },
    'xmall.shopCart.skuSelect': {
        // devUrl: '//ac-OnsG2j7w.clouddn.com/f48ccdc48b0a3adb.json',
        devUrl: '//xmall.codoon.com/api/mall/xmall/cart/select_sku',
        url: '//xmall.codoon.com/api/mall/xmall/cart/select_sku',
        methods: ['GET'],
        required: [{
            key: 'goods_id',
            type: 'string'
        }, {
            key: 'sku_id',
            type: 'string'
        }, {
            key: 'positive',
            type: 'boolean'
        }],
        desc: "用户购物车.选择SKU"
    },
    'xmall.shopCart.skuCount': {
        // devUrl: '//ac-OnsG2j7w.clouddn.com/da53cc54134a2f06.json',
        devUrl: '//xmall.codoon.com/api/mall/xmall/cart/update_count',
        url: '//xmall.codoon.com/api/mall/xmall/cart/update_count',
        methods: ['GET'],
        required: [{
            key: 'goods_id',
            type: 'string'
        }, {
            key: 'sku_id',
            type: 'string'
        }, {
            key: 'num',
            type: 'number',
            desc: "更改为这个新数"
        }],
        desc: "用户购物车.改变SKU数量"
    },
    'xmall.shopCart.selectAll': {
        // devUrl: '//ac-OnsG2j7w.clouddn.com/d3009d1e9170b3b7.json',
        devUrl: '//xmall.codoon.com/api/mall/xmall/cart/select_all_sku',
        url: '//xmall.codoon.com/api/mall/xmall/cart/select_all_sku',
        methods: ['GET'],
        required: [{
            key: 'positive',
            type: 'boolean'
        }],
        desc: "用户购物车.全选SKU"
    },
    'xmall.shopCart.skuDel': {
        devUrl: '//xmall.codoon.com/api/mall/xmall/cart/del_sku',
        url: '//xmall.codoon.com/api/mall/xmall/cart/del_sku',
        methods: ['GET'],
        required: [{
            key: 'goods_id',
            type: 'string'
        }, {
            key: 'sku_id',
            type: 'string'
        }],
        desc: "用户购物车.删除SKU"
    },
    'xmall.shopCart.checkout': {
        devUrl: '//xmall.codoon.com/api/mall/xmall/cart/checkout',
        url: '//xmall.codoon.com/api/mall/xmall/cart/checkout',
        methods: ['POST'],
        desc: "用户购物车.结算确认"
    },
    'xmall.shopCart.getRecommend': {
        devUrl: '//xmall.codoon.com/api/mall/xmall/dms/pro/home_page_items',
        url: '//xmall.codoon.com/api/mall/xmall/dms/pro/home_page_items',
        methods: ['GET'],
        desc: "用户购物车.空购物车时的推荐列表"
    }
};

module.exports = APIBucket;
