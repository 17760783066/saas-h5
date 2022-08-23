const _DATA = {

    common: {
        BRANDS: [{
            id: 1,
            icon: require('../assets/image/store/1.png'),
            name: '马可波罗'
        }, {
            id: 2,
            icon: require('../assets/image/store/1.png'),
            name: '欧普'
        }, {
            id: 3,
            icon: require('../assets/image/store/1.png'),
            name: '格力'
        }, {
            id: 4,
            icon: require('../assets/image/store/1.png'),
            name: '立邦'
        }, {
            id: 5,
            icon: require('../assets/image/store/1.png'),
            name: '三棵树漆河南总代'
        }],
        analysisTypes: [{
                key: 1,
                label: '性格测试',
                intro: '这里一段话介绍性格测试',
                icon: require('../assets/image/analysis/icon-analysis-type-1.png')
            },
            {
                key: 2,
                label: '职场测试',
                intro: '这里一段话介绍职场测试',
                icon: require('../assets/image/analysis/icon-analysis-type-2.png')
            },
            {
                key: 3,
                label: '亲子测试',
                intro: '这里一段话介绍亲子测试',
                icon: require('../assets/image/analysis/icon-analysis-type-3.png')
            },
            {
                key: 4,
                label: '情感测试',
                intro: '这里一段话介绍情感测试',
                icon: require('../assets/image/analysis/icon-analysis-type-4.png')
            }
        ]

    },
    store: {
        PRODUCTS: [{
            id: 11,
            imgs: [require('../assets/image/store/31.png'), require('../assets/image/store/36.png'), require('../assets/image/store/31.png')],
            title: '太空棉沙发',
            price: 900,
            buyNum: 1234,
            pubAt: 1599001107000
        }, {
            id: 12,
            imgs: [require('../assets/image/store/32.png')],
            title: '艺术水泥灰花盆',
            price: 1800,
            buyNum: 1234,
            pubAt: 1599010107000
        }, {
            id: 13,
            imgs: [require('../assets/image/store/33.png')],
            title: '太空系列陶瓷茶具',
            price: 18900,
            buyNum: 2379650,
            pubAt: 1589012107000
        }, {
            id: 14,
            imgs: [require('../assets/image/store/34.png')],
            title: '茶几组合',
            price: 138900,
            buyNum: 34587,
            pubAt: 1598012107000
        }, {
            id: 15,
            imgs: [require('../assets/image/store/35.png')],
            title: '莫兰蒂色沙发',
            price: 67900,
            buyNum: 12373,
            pubAt: 1599012107000
        }],

        MERCHANT: [{
                name: '极有家',
                avatar: require('../assets/image/store/24.png'),
                cover: require('../assets/image/store/21.png'),
            },
            {
                name: '丽芙家居',
                avatar: require('../assets/image/store/25.png'),
                cover: require('../assets/image/store/22.png'),
            },
            {
                name: '居然之家',
                avatar: require('../assets/image/store/26.png'),
                cover: require('../assets/image/store/23.png'),
            },
            
        ],
        banners: [{
                img: require('../assets/image/home/course/banner.png')
            },
            {
                img: require('../assets/image/home/course/banner.png')
            },
            {
                img: require('../assets/image/home/course/banner.png')
            },
            {
                img: require('../assets/image/home/course/banner.png')
            }
        ],
        MERCHANTS: [{
            id: 1,
            logo: require('../assets/image/store/26.png'),
            name: '欧司朗照明你身边的灯具专家',
            score: 4.5,
            cates: ['灯具', '照明'],
            addr: '郑州管城区红星美凯龙3馆5-503室'
        }, {
            id: 2,
            logo: require('../assets/image/store/26.png'),
            name: '立邦漆环保0甲醛',
            score: 4.5,
            cates: ['灯具', '照明'],
            addr: '郑州管城区红星美凯龙3馆5-503室'
        }, {
            id: 3,
            logo: require('../assets/image/store/26.png'),
            name: '多乐士油漆炫彩大师',
            score: 4,
            cates: ['灯具', '照明'],
            addr: '郑州管城区红星美凯龙3馆5-503室'
        }],

        BANNERS: [{
            act: 'LINK',
            img: require('../assets/image/store/muji.png'),
            payload: {
                url: 'http://edu.maidaotech.cn'
            }
        }, {
            act: 'PRODUCT',
            img: require('../assets/image/store/muji.png'),
            payload: {
                id: 1
            }
        }, {
            act: 'PRODUCTS',
            img: require('../assets/image/store/muji.png'),
        }, {

            act: 'MERCHANT',
            img: require('../assets/image/store/muji.png'),
            payload: {
                id: 1
            }
        }],
        NAVS: [{
            icon: require('../assets/image/store/1.png'),
            label: '家具'
        }, {
            icon: require('../assets/image/store/2.png'),
            label: '家电'
        }, {
            icon: require('../assets/image/store/3.png'),
            label: '家纺'
        }, {
            icon: require('../assets/image/store/4.png'),
            label: '花艺'
        }, {
            icon: require('../assets/image/store/5.png'),
            label: '家饰'
        }, {
            icon: require('../assets/image/store/1.png'),
            label: '家具'
        }, {
            icon: require('../assets/image/store/2.png'),
            label: '家电'
        }, {
            icon: require('../assets/image/store/3.png'),
            label: '家纺'
        }, {
            icon: require('../assets/image/store/4.png'),
            label: '花艺'
        }, {
            icon: require('../assets/image/store/5.png'),
            label: '全部'
        }],
        BRANDS: [{
            id: 1,
            icon: require('../assets/image/store/11.png'),
            name: '马可波罗'
        }, {
            id: 2,
            icon: require('../assets/image/store/12.png'),
            name: '欧普'
        }, {
            id: 3,
            icon: require('../assets/image/store/13.png'),
            name: '格力'
        }, {
            id: 4,
            icon: require('../assets/image/store/14.png'),
            name: '立邦'
        }, {
            id: 5,
            icon: require('../assets/image/store/12.png'),
            name: '三棵树漆河南总代'
        }],

    },
    home: {
        banners: [{
                img: require('../assets/image/home/course/banner.png')
            },
            {
                img: require('../assets/image/home/course/banner.png')
            },
            {
                img: require('../assets/image/home/course/banner.png')
            },
            {
                img: require('../assets/image/home/course/banner.png')
            }
        ],
        CASES: [{
            img: require('../assets/image/home/course/矩形2.png'),
            title: '141平方欧式三居室，小户型北欧风格可收纳的风格，我的新家装修很漂亮很漂亮很漂亮很漂亮很漂亮很漂亮很漂亮很漂亮',
            descr: '北欧风格在使大众利益得到关注的同时，北欧设计没有缺失对小众的关怀。例如消除残障人士在生活上的不便，为其设计风格很牛逼',
            author: {
                avatar: require('../assets/image/tmp/avatar/a-1.jpg'),
                name: '了小米'
            },
            favorNum: 123,
            favored: true,
            starNum: 89765,
            stared: true
        }, {
            img: require('../assets/image/home/course/矩形备份5.png'),
            title: '141平方欧式三居室，小户型北欧风格可收纳的风格，我的新家装修',
            descr: '北欧风格在使大众利益得到关注的同时，北欧设计没有缺失对小众的关怀。例如消除残障人士在生活上的不便，为其设计风格很牛逼',
            author: {
                name: '了小米了小米了小米了小米'
            },
            favorNum: 123,
            favored: false,
            starNum: 89765,
            stared: false

        }, {
            img: require('../assets/image/home/course/矩形备份8.png'),
            title: '141平方欧式三居室，小户型北欧风格可收纳的风格，我的新家装修',
            descr: '北欧风格在使大众利益得到关注的同时，北欧设计没有缺失对小众的关怀。例如消除残障人士在生活上的不便，为其设计风格很牛逼',
            author: {
                name: '了小米了小米了小米了小米'
            },
            favorNum: 123,
            favored: true,
            starNum: 89765,
            stared: true

        }],
        ARTICLES: [{
            cover: require('../assets/image/home/albums/1.png'),
            title: '房屋漏水怎么办,三个小妙招让你解决实际难题',
            cates: ['阳台', '防水', '卫生间'],
            author: {
                name: '了小米了小米了小米了小米',
                avatar: require('../assets/image/tmp/avatar/a-4.jpg'),
            },
            starNum: 89765,
            stared: true
        }, {
            cover: require('../assets/image/home/albums/2.png'),
            title: '房屋漏水怎么办,三个小妙招让你解决实际难题',
            cates: ['阳台', '防水', '卫生间'],
            author: {
                name: '了小米了小米了小米了小米',
                avatar: require('../assets/image/tmp/avatar/a-4.jpg'),
            },
            starNum: 89765,
            stared: true
        }, {
            cover: require('../assets/image/home/albums/3.png'),
            title: '房屋漏水怎么办,三个小妙招让你解决实际难题',
            cates: ['阳台', '防水', '卫生间'],
            author: {
                name: '了小米了小米了小米了小米',
                avatar: require('../assets/image/tmp/avatar/a-4.jpg'),
            },
            starNum: 89765,
            stared: true
        }, {
            cover: require('../assets/image/home/albums/4.png'),
            title: '房屋漏水怎么办,三个小妙招让你解决实际难题',
            cates: ['阳台', '防水'],
            author: {
                name: '了小米了小米了小米了小米',
                avatar: require('../assets/image/tmp/avatar/a-4.jpg'),
            },
            starNum: 89765,
            stared: true
        }, {
            cover: require('../assets/image/home/albums/5.png'),
            title: '房屋漏水怎么办,三个小妙招让你解决实际难题',
            cates: ['阳台', '防水'],
            author: {
                name: '了小米了小米了小米了小米',
                avatar: require('../assets/image/tmp/avatar/a-4.jpg'),
            },
            starNum: 89765,
            stared: false
        }, {
            cover: require('../assets/image/home/albums/7.png'),
            title: '房屋漏水怎么办,三个小妙招让你解决实际难题',
            cates: ['阳台', '防水'],
            author: {
                name: '了小米了小米了小米了小米',
                avatar: require('../assets/image/tmp/avatar/a-4.jpg'),
            },
            starNum: 89765,
            stared: false
        }],

        cates: [{
                img: require('../assets/image/home/cate/编组7备份.png'),
                name: '考公类型'
            },
            {
                img: require('../assets/image/home/cate/编组26备份.png'),
                name: '考研类型'
            },
            {
                img: require('../assets/image/home/cate/编组27备份.png'),
                name: '教师资格'
            },
            {
                img: require('../assets/image/home/cate/编组28备份.png'),
                name: '托福雅思'
            }, {
                img: require('../assets/image/home/cate/编组29备份.png'),
                name: '营养师'
            },
            {
                img: require('../assets/image/home/cate/编组30备份.png'),
                name: '消防证'
            },
            {
                img: require('../assets/image/home/cate/编组31备份.png'),
                name: '建筑师'
            },
            {
                img: require('../assets/image/home/cate/编组32备份.png'),
                name: '全部'
            }
        ],
        BANNERS: [{
            act: 'LINK',
            img: require('../assets/image/home/photo.png'),
            payload: {
                url: 'http://edu.maidaotech.cn'
            }
        }, {
            act: 'PRODUCT',
            img: require('../assets/image/home/photo.png'),
            payload: {
                id: 1
            }
        }, {
            act: 'PRODUCTS',
            img: require('../assets/image/home/photo.png'),
        }, {

            act: 'MERCHANT',
            img: require('../assets/image/home/photo.png'),
            payload: {
                id: 1
            }
        }],

        NAVS: [{
            icon: require('../assets/image/home/icon_nav_1.png'),
            label: '案例'
        }, {
            icon: require('../assets/image/home/icon_nav_2.png'),
            label: '灵感'
        }, {
            icon: require('../assets/image/home/icon_nav_3.png'),
            label: '好物'
        }, {
            icon: require('../assets/image/home/icon_nav_4.png'),
            label: '干货'
        }],

        levels: [{
            id: 1,
            name: '卡牌导师'
        }, {
            id: 2,
            name: '卡牌大师'
        }, {
            id: 3,
            name: '卡牌师'
        }],

        analysts: [{
            name: '周杰伦',
            avatar: require('../assets/image/tmp/avatar/a-1.jpg'),
            level: '1',
            grade: '卡皇',
            num: 4323,
            slogan: '擅长情感分析，专业解答，看破迷局'
        }, {
            name: '汪峰',
            avatar: require('../assets/image/tmp/avatar/a-2.jpg'),
            level: '1',
            grade: '卡皇',
            num: 2343,
            slogan: '擅长情感分析，专业解答，看破迷局'
        }, {
            name: '林俊杰',
            avatar: require('../assets/image/tmp/avatar/a-3.jpg'),
            level: '2',
            grade: '卡皇',
            num: 1467,
            slogan: '擅长情感分析，专业解答，看破迷局'
        }, {
            name: '陈近南',
            avatar: require('../assets/image/tmp/avatar/a-4.jpg'),
            level: '3',
            grade: '卡皇',
            num: 1233,
            slogan: '擅长情感分析，专业解答，看破迷局'
        }, {
            name: '张无忌',
            avatar: require('../assets/image/tmp/avatar/a-2.jpg'),
            level: '3',
            grade: '卡皇',
            num: 1223,
            slogan: '擅长情感分析，专业解答，看破迷局'
        }],
        ALBUMS: [{
                name: '陈近南',
                avatar: require('../assets/image/tmp/avatar/a-4.jpg'),
                cover: require('../assets/image/home/albums/1.png'),
                num: 12
            },
            {
                name: '陈近南',
                avatar: require('../assets/image/tmp/avatar/a-4.jpg'),
                cover: require('../assets/image/home/albums/2.png'),
                num: 12
            },
            {
                name: '陈近南',
                avatar: require('../assets/image/tmp/avatar/a-4.jpg'),
                cover: require('../assets/image/home/albums/3.png'),
                num: 12
            },
            {
                name: '陈近南',
                avatar: require('../assets/image/tmp/avatar/a-4.jpg'),
                cover: require('../assets/image/home/albums/4.png'),
                num: 1
            },
            {
                name: '陈近南',
                avatar: require('../assets/image/tmp/avatar/a-4.jpg'),
                cover: require('../assets/image/home/albums/5.png'),
                num: 12
            },
            {
                name: '陈近南',
                avatar: require('../assets/image/tmp/avatar/a-4.jpg'),
                cover: require('../assets/image/home/albums/7.png'),
                num: 12
            },
            {
                name: '陈近南',
                avatar: require('../assets/image/tmp/avatar/a-4.jpg'),
                cover: require('../assets/image/home/albums/8.png'),
                num: 123456
            },
            {
                name: '陈近南',
                avatar: require('../assets/image/tmp/avatar/a-4.jpg'),
                cover: require('../assets/image/home/albums/9.png'),
                num: 12
            },
            {
                name: '陈近南',
                avatar: require('../assets/image/tmp/avatar/a-4.jpg'),
                cover: require('../assets/image/home/albums/10.png'),
                num: 12
            }
        ],

        CITYS: ['北京', '上海', '深圳', '成都', '西安', '太原', '呼和浩特', '天津', '沈阳', '武汉'],


    },
    
    analysis: {
        analysisList: [{
                title: '性格测试报告',
                createdAt: 1632728967000,
                status: 5,
                type: 1,
                activityType: 2
            }, {
                title: '情感测试报告',
                createdAt: 1631728967000,
                status: 6,
                type: 4,
                activityType: 1
            }, {
                title: '亲子测试报告',
                createdAt: 1631998967000,
                status: 5,
                type: 3,
                activityType: 1
            }, {
                title: '职场测试报告',
                createdAt: 1633998967000,
                status: 6,
                type: 2,
                activityType: 2
            }, {
                title: '情感测试报告',
                createdAt: 1631728967000,
                status: 5,
                type: 4,
                activityType: 1
            }, {
                title: '情感测试报告',
                createdAt: 1631728967000,
                status: 6,
                type: 4,
                activityType: 1
            }

        ]
    },

    messages: [{
            txt: '一级建造师2021年冬季考试报名开始!',
            createdAt: 1630810567234
        },
        {
            txt: '二级建造师2021年冬季考试报名开始!',
            createdAt: 1633410567234
        },
        {
            txt: '三级建造师2021年冬季考试报名开始!',
            createdAt: 1632810567234
        }
    ]


};


export default _DATA;