import { Popup } from 'antd-mobile';
import { DownOutline } from 'antd-mobile-icons';
import classnames from 'classnames';
import React, { Component } from 'react';
import '../assets/css/home.scss';
import { CTYPE, U, _DATA } from '../common';
import { Banners, CommonTabs, MyTags, Navs, SearchInput, WaterFall } from "./Comps";


const { BANNERS, NAVS, ARTISANS, CASES, ALBUMS, BANNERS_AD, ARTICLES, CITYS, productContent } = _DATA.home;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: CITYS[0],
            activeIndex: 0,
            showLocationPicker: false,
            heights: []
        }
    }
    componentDidMount() {
        U.setWXTitle('首页')

    }
    loadData = () => {
        let { activeIndex } = this.state
        // setTimeout(() => {
        //     let heights = [];
        //     ALBUMS.map((item, i) => {
        //         let box = this.refs[`item_item_${activeIndex}_${i}`];
        //         if (box) {
        //             heights[i] = box.clientHeight;
        //         }
        //     })

        //     this.setState({ heights })
        // }, 300)
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
        let { city, showLocationPicker, activeIndex = 0, heights = [] } = this.state;

        return (
            <div className='home-page'>
                <div className='top-bar'>

                    <div className='location' onClick={() => this.setState({ showLocationPicker: true })}>
                        <p>{city}</p>
                        <div className={classnames('icon', { 'rotate': showLocationPicker })}>
                            <DownOutline />

                        </div>
                    </div>
                    <SearchInput type='a' txt='请输入关键词搜索' />
                    <div className='msg'>
                        <i />
                        {/* 自己定义的图片 */}
                        <div className='dot' />
                        {/* 点 */}
                    </div>
                </div>
                <Navs list={NAVS} count={4} />
                <Banners list={BANNERS} type={CTYPE.bannerTypes.ad} autoplayInterval={5000} loop={true} />
                <CommonTabs list={['推荐案例', '找灵感', '装修技巧']} type='a' activeIndex={activeIndex} callback={(activeIndex, heights = []) => {
                    this.setState({ activeIndex, heights }/* , this.loadData */)
                }} />
                {activeIndex == 0 && <div className='cases'>
                    <ul>
                        {CASES.map((item, index) => {
                            let { title, img, descr, author = {}, favorNum, favored, starNum, stared } = item;
                            let { avatar = require('../assets/image/tmp/avatar/a-2.jpg'), name } = author;
                            return <li key={index}>
                                <img src={img} className='cover' />
                                <div className='s'>
                                    <div className='title'>{title}</div>
                                    <div className='descr'>{descr}</div>
                                    <div className='bar'>
                                        <div className='author'>
                                            <img src={avatar} />
                                            <div className='name'>{name}</div>
                                        </div>
                                        <div className='stats'>
                                            <div className={favored ? 'favored' : 'favor'}>
                                                {favorNum}
                                            </div>
                                            <div className={stared ? 'stared' : 'star'}>
                                                {starNum}

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </li>


                        })}
                    </ul>
                </div>
                }

                {activeIndex == 1 && <div className='waterfall-albums'>
                    <WaterFall list={ALBUMS} type='a' _render={(item, i, heights = []) => {
                        let { cover, num, name, avatar } = item;
                        return <li ref={`item_a_${i}`} key={i} style={{  width: (innerWidth * 0.92 - 10) / 2, height: heights.length > i ? heights[i] : 'auto' }} >
                            <img src={cover} />
                            <div className='num'>{num > 99 ? '99+' : num}张</div>
                            <div className='author'>
                                <img src={avatar} />
                                <div className='name'>
                                    {name}
                                </div>
                            </div>
                        </li>
                    }} />
                </div>}

                {activeIndex == 2 && <div className='waterfall-articles'>
                    <WaterFall list={ARTICLES} type='b' _render={(item, i, heights = []) => {
                        let { cover, title, cates = [], author = {}, starNum, stared } = item;
                        let { name, avatar } = author;
                        return <li ref={`item_b_${i}`} key={i} style={{  width: (innerWidth * 0.92 - 10) / 2, height: heights.length > i ? heights[i] : 'auto' }}>
                            <img src={cover} />
                            <div className='title'>{title}</div>
                            <MyTags list={cates} type='a'/>
                            <div className='a'>
                                <div className='author'>
                                    <img src={avatar} />
                                    <div className='name'>{name}</div>
                                </div>
                                <div className='stats'>
                                    <div className={stared ? 'stared' : 'star'}>
                                        {starNum}

                                    </div>
                                </div>
                            </div>

                        </li>

                    }} />
                </div>}
                <Popup className='city-picker'
                    visible={showLocationPicker}
                    onMaskClick={() => {
                        this.setState({ showLocationPicker: false });
                    }}
                    bodyStyle={{ height: '40vh' }}>
                    <div className='header'>
                        请选择地区
                        <i onClick={() => this.setState({ showLocationPicker: false })} />
                    </div>

                    <div className='container'>
                        <div className='scroll-view'>
                            <ul>
                                {CITYS.map((txt, index) => {
                                    let isActive = txt == city;
                                    return <li key={index} className={isActive ? 'active' : ''} onClick={() => {
                                        !isActive && this.setState({ city: txt, showLocationPicker: false });
                                    }}>{txt}</li>
                                })}
                            </ul>
                        </div>
                    </div>


                </Popup>
            </div>
        );
    }
}

export default Home;