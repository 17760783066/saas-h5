import React from 'react';
import { Banners, Navs, SearchInput, TitleBar, HorizonalScrollContainer, Title, ProductList, WaterFall } from './Comps';
import '../assets/css/store.scss';
import { App, CTYPE, Utils, _DATA } from '../common';
import AutoResponsive from 'autoresponsive-react';

export default class Store extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            listStyle: CTYPE.productStyles.box,
            ui: {}
        };
    }
    componentDidMount() {
        this.loadData();
    }
    loadData = () => {
        App.api('usr/user/ui').then((ui) => {
            this.setState({
                ui,
                loading: false
            });
        });
    }
    getAutoResponsiveProps = () => {
        return {
            itemMargin: 10,
            containerWidth: innerWidth * 0.92 + 10,
            itemClassName: 'item',
            gridWidth: innerWidth * .46 + 5,
            // transitionDuration: '.5',
            closeAnimation: true
        };
    };
    render() {
        let { listStyle, ui = {} } = this.state
        let { components = [] } = ui;
        return (
            <div className="store-page">
                < SearchInput type='b' txt='请输入品牌/商品名称搜索' />
                {
                    components.map((a, j) => {
                        let { key, list = [] } = a;
                        return <div>

                            {key == 'BANNER' && <Banners list={list} type={CTYPE.bannerTypes.banner} autoplayInterval={5000} loop={true} />}
                            {key == 'NAV' && <Navs list={list} count={5} />}
                            {
                                key == "COURSE" && <div className='brands'>
                                    <TitleBar title='推荐品牌' more={{ txt: '换一换', action: { act: 'COURSE' } }} type='a' />
                                    <HorizonalScrollContainer list={list} width={100} _render={(item, index) => {
                                        let { cover } = item;
                                        return <li key={index}>
                                            <img src={cover} />
                                        </li>
                                    }} />
                                </div>
                            }
                            {
                                key == "TRAINER" && <div className='product'>
                                    <TitleBar title='推荐门店' more={{ txt: '换一换', action: { act: 'TRAINER' } }} type='a' />
                                    <div className='imgs'>
                                        {
                                            list.map((item, index) => {
                                                let { name, avatar, cover } = item;
                                                return <li key={index}>
                                                    <img src={cover} />
                                                    <div className='author'>
                                                        <img src={cover} />
                                                        <div className='name'>{name}</div>
                                                    </div>
                                                </li>
                                            })
                                        }
                                        <div className='clearfix' />
                                    </div>
                                </div>
                            }
                            {
                                key == "AD" && <Banners list={list} type={CTYPE.bannerTypes.ad} autoplayInterval={5000} loop={true} />
                            }
                            {
                                ((key == "LIVE") || (key == "TOP") || (key == 'PUTAWAY')) && <div className='products'>
                                    <TitleBar title='热销商品' more={{ txt: '查看更多', action: { act: 'LIVE' } }} type='b' />
                                    <div className='pro'>
                                        <ProductList list={list} listStyle={listStyle} />
                                    </div>
                                </div>
                            }
                            {
                                ((key == 'ARTICLE') || (key == 'DECORATION')) && <div className='article'>
                                    {list.map((item, index) => {
                                        let { title, cover, descr, author = {}, likeNum, collectNum, stared } = item;
                                        let { avatar = require('../assets/image/tmp/avatar/a-2.jpg'), name } = author;
                                        return <li key={index}>
                                            <img src={cover} />
                                            <div className='s'>
                                                <div className='title'>{title}</div>
                                                <div className='descr'>{descr}</div>
                                                <div className='bar'>
                                                    <div className='author'>
                                                        <img src={avatar} />
                                                        <div className='name'>{name}</div>
                                                    </div>
                                                    <div className='stats'>
                                                        <div className='favor'>
                                                            {likeNum}
                                                        </div>
                                                        <div className='star'>
                                                            {collectNum}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </li>
                                    })}
                                </div>
                            }
                            {
                                key == 'AFFLATUS' && <div className='waterfall-afflatus'><WaterFall type='c' list={list} _render={(item, i, heights = []) => {
                                    let { imgs } = item;
                                    return <div ref={`item_c_${i}`} className='item' key={i} style={{ width: (innerWidth * 0.92 - 10) / 2, height: heights.length > i ? heights[i] : 'auto' }}>
                                        <img src={imgs[0]} />

                                    </div>
                                }} /></div>
                            }
                        </div>
                    })
                }
            </div>
        );
    }
}

