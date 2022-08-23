const CTYPE = (() => {

    return {
        pagination: { pageSize: 10 },

        namespace: {
            default: 'file'
        },
        userType: {
            admin: "1",
            user: "2"
        },
        accountType: {
            mobile: "1",
            email: "2"
        },
        productStyles: {
            box: Symbol('box'),
            flat: Symbol('flat'),
            mer: Symbol('mer')
        },
        //图片裁切工具比例
        imgeditorscale: {
            square: 1,
            rectangle_h: 0.5625,
            identity: 0.63
        },
        bannerTypes: {
            banner: Symbol('banner'),
            card: Symbol('card'),
            ad: Symbol('ad'),

        },
        qqmapKey: 'LEHBZ-CAIAJ-MKTFI-FRZEA-GMUSJ-XYFSK',
        topBars: [
            {title: "全部", type: 0},
            {title: "待付款", type: 1},
            {title: "待发货", type: 2},
            {title: "待收货", type: 3},
            {title: "已关闭", type: 4},
        ]

    };

})();

export default CTYPE;
