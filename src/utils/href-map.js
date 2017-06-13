var _hrefs = {
    'xmall.order.detail': {
        web: {
            url:'./order-detail.html',
            params: {
                h_id:{
                    require: true,
                }
            }
        },
        client: {
            url: 'codoon://www.codoon.com/mall/order_detail',
            params: {
                order_id:{
                    require: true,
                },
            },
            version: '6.9.0'
        }
    },
}

module.exports = _hrefs;
