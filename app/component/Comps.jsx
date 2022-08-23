import React, { Component } from 'react';
import { Swiper, Toast, Popup, Stepper, Modal } from 'antd-mobile';
import '../assets/css/comps.scss';
import { App, CTYPE, U, Utils, _DATA } from '../common';
import AutoResponsive from 'autoresponsive-react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import CartUtils from "../component/CartUtils";
const { BRANDS = [] } = _DATA.common;

function SearchInput(props) {
    let { type, txt } = props;
    return <div className='search-input'>
        {
            type == 'a' && <div className='a'>
                <input placeholder={txt} />
                <div className='i' />
            </div>
        }
        {
            type == 'b' && <div className='b'>
                <div className='i' />
                <input placeholder={txt} />
            </div>
        }

    </div>
}
function Navs(props) {
    let { list = [], count = 4 } = props;
    return <div className='navs'>
        <ul>
            {list.map((item, index) => {
                let { icon, label } = item;
                return <li key={index} style={{ width: `${(92 / count)}vw` }}>
                    <img src={icon} />
                    <p>{label}</p>
                </li>
            })}

            <div className='clearfix' />
        </ul>
    </div>
}
function Banners(props) {

    let { list = [], type, autoplayInterval = 3000 } = props;
    let isAd = type == CTYPE.bannerTypes.ad;
    let clsName = type == CTYPE.bannerTypes.banner ? 'home-banner' : (isAd ? 'home-ad' : 'product-banner');

    return <div className={clsName}>
        {isAd && <div className='corner'>广告</div>}
        <Swiper autoplay={true} autoplayInterval={autoplayInterval} loop={true}>
            {list.map((item, index) => {
                let { img, act, payload } = item;
                return <Swiper.Item key={index} onClick={() => {
                    U.redirect.redirectByAction({ act, payload });
                }}>
                    <img src={img} />
                </Swiper.Item>
            })}
        </Swiper>
    </div>
}

function CommonTabs(props) {
    let { list = [], activeIndex, callback, type } = props;

    let offset = 90 * activeIndex;
    let off = 40 * activeIndex;
    return <div className='common-tabs-transfer-dot'>
        {
            type == 'a' && <ul className='a'>
                {list.map((item, index) => {
                    let active = activeIndex == index;
                    return <li key={index} onClick={() => {
                        !active && callback(index);
                    }}>{item}</li>
                })}
                <div className='dot' style={{ left: `${offset}px` }} />
            </ul>
        }
        {
            type == 'b' && <ul className='b'>
                {list.map((item, index) => {
                    let { name } = item;
                    let active = activeIndex == index;
                    return <li key={index} onClick={() => {
                        !active && callback(index);
                    }}>{name}</li>
                })}
                <div className='dot' style={{ top: `${off}px`, left: `-17px` }} >
                    <i style={{ width: `21.5vw`, height: `10.5vw` }} />
                </div>
            </ul>
        }
        {
            type == 'c' && <ul className='c'>
                {list.map((item, index) => {
                    let active = activeIndex == index;
                    return <li key={index} onClick={() => {
                        !active && callback(index);
                    }}>{item}</li>
                })}
                <div className='dot' style={{ left: `${offset}px` }} />
            </ul>
        }

    </div>
}

function Bannerss(props) {

    let { list = [], type, autoplayInterval = 3000 } = props;
    let isAd = type == CTYPE.bannerTypes.ad;
    let clsName = type == CTYPE.bannerTypes.banner ? 'home-banner' : (isAd ? 'home-ad' : 'product-banner');

    return <div className={clsName}>
        {isAd && <div className='corner'>广告</div>}
        <Swiper autoplay={true} autoplayInterval={autoplayInterval} loop={true}>
            {list.map((item, index) => {
                let { imgs = [] } = item;
                return <Swiper.Item key={index} >
                    <img src={imgs[0]} />
                </Swiper.Item>
            })}
        </Swiper>
    </div>
}
function MyTags(props) {
    let { list = [], type } = props;
    return <div className='tags'>
        {type == 'a' && <div className='my-tags'>{list.map((c, i) => {
            return <span key={i}>{c}</span>
        })}</div>}
        {
            type == 'b' && <div className='my-tag'>
                {list.map((c, i) => {
                    return <span key={i}>{c}</span>
                })}</div>
        }
    </div>

}

function TitleBar(props) {
    let { title, more = {}, type } = props;

    let { txt, action = {} } = more;

    return <div className='title-bar'>
        {
            type == 'a' && <div className='a'>
                <p>{title}</p>
                {txt && <a onClick={() => U.redirect.redirectByAction(action)}>{txt}
                </a>}
            </div>
        }
        {
            type == 'b' && <div className='b'>
                <p>{title}</p>
                {txt && <a onClick={() => U.redirect.redirectByAction(action)}>{txt}
                </a>}
            </div>
        }

    </div>
}

function HorizonalScrollContainer(props) {
    let { list = [], width, _render } = props;
    return <div className='horizonal-container '>
        <ul style={{ width: `${list.length * width}px` }}>
            {list.map(_render)}
            <div className='clearfix' />
        </ul>
    </div>
}
function ProductList(props) {
    let { list = [], listStyle = CTYPE.productStyles.box } = props;
    return <ul className='ul-products'>
        {list.map((p, i) => {
            let { specs, name } = p;
            let { imgs = [], price } = specs[0];
            return <li key={i} >
                <img src={imgs[0]} />
                <div className='p-info'>
                    <div className='title'>
                        {name}
                    </div>
                    <div className='btm'>
                        <div className='price'>{U.price.cent2yuan(price, true)}</div>
                        <div className='img' />
                    </div>
                </div>
            </li>
        })
        }
        <div className='clearfix' />
    </ul>
}
class WaterFall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list,
            type: this.props.type,
            heights: []
        }
    }
    componentDidMount() {
        this.loadData();
    }

    componentWillReceiveProps(p) {
        this.setState({ list: p.list, heights: [] }, this.loadData);
    }

    loadData = () => {
        let { list = [], type } = this.state;
        setTimeout(() => {
            let heights = [];
            list.map((item, i) => {
                let box = this.refs[`item_${type}_${i}`];
                if (box) {
                    heights[i] = box.clientHeight;
                }
            });
            this.setState({ heights });
        });
    };

    getAutoResponsiveProps = () => {
        return {
            itemMargin: 10,
            containerWidth: innerWidth * 0.92 + 10,
            itemClassName: "item",
            gridWidth: innerWidth * 0.46 + 5,
            // transitionDuration: '.5',
            closeAnimation: true,
        };
    };

    render() {
        let { _render } = this.props;
        let { heights = [], list = [] } = this.state;
        console.log(heights)
        return (
            <AutoResponsive ref="container" {...this.getAutoResponsiveProps()}>
                {list.map((item, i) => {
                    return _render(item, i, heights);
                })}
            </AutoResponsive>
        );
    }
}
function ProductLists(props) {

    let { list = [], listStyle = CTYPE.productStyles.box } = props;

    let isBox = listStyle == CTYPE.productStyles.box;
    let isMer = listStyle == CTYPE.productStyles.mer ? 'uls-product' : (isBox ? 'uls-products' : 'uls-products-flat');
    return <ul className={isMer}>
        {list.map((p, i) => {
            let { id, specs = [], name } = p;
            let { price, imgs = [] } = specs[0]
            return <li key={i} onClick={() => App.go(`/product/${id}`)}>
                {
                    <div className='products'>
                        <img src={imgs[0]} />
                        <div className='p-info'>
                            <div className='title'>
                                {name}
                            </div>
                            <div className='btm'>
                                <span>￥</span>
                                <div className='price'>{U.price.cent2yuan(price)}</div>
                                {isMer && <div className='buy'>1231购买 </div>}
                                {!isMer && <div className='img'></div>}
                            </div>
                        </div>
                    </div>
                }
            </li>
        })}
        <div className='clearfix' />
    </ul>
}




class FilterBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            prices: [0, 0],
            showDrawer: false,
        };
    }

    componentWillUnmount() {
        this.showDrawer(false);
    }

    showDrawer = (val = false) => {
        this.setState({ showDrawer: val });
        document.body.style.overflow = val ? 'hidden' : 'auto';
    }

    render() {

        let { sorter = {}, listStyle, filterCB } = this.props;
        let { sortField, sortAscDesc } = sorter;

        let { showDrawer, prices = [] } = this.state;

        let isDefault = sortField == 'default';
        let isPubAt = sortField == 'pubAt';
        let isPrice = sortField == 'price';

        let isDesc = sortAscDesc == 'desc';
        let isBox = listStyle == CTYPE.productStyles.box;
        let isMer = listStyle == CTYPE.productStyles.mer ? 'uls-product' : (isBox ? 'uls-products' : 'uls-products-flat');

        return <div>
            <div className='filter-bar'>
                <ul>
                    <li className={classnames({ 'active': isDefault })} onClick={() => {
                        if (!isDefault) {
                            filterCB({ sortField: 'default', sortAscDesc: 'desc' })
                        }
                    }}><span>综合</span></li>
                    <li className={classnames({ 'active': isPubAt })} onClick={() => {
                        if (!isPubAt) {
                            filterCB({ sortField: 'pubAt', sortAscDesc: 'desc' })
                        }
                    }}><span>上新</span></li>
                    <li className={classnames('sorter', { 'active': isPrice }, { 'sorter-desc': isPrice && isDesc }, { 'sorter-asc': isPrice && !isDesc })} onClick={() => {
                        let ascdesc = isPrice ? (isDesc ? 'asc' : 'desc') : 'asc';
                        filterCB({ sortField: 'price', sortAscDesc: ascdesc });
                    }}>
                        <span>价格</span>
                    </li>
                    <li className='filter' onClick={() => this.showDrawer(!showDrawer)}><span>筛选</span></li>
                </ul>
                {/* {isMer && <div className={isMer ? 'list-style' : 'list-style-box'} onClick={() => {
                    filterCB({ listStyle: isMer ? CTYPE.productStyles.mer : CTYPE.productStyles.box }, false)
                }} />} */}
                <div className={isBox ? 'list-style' : 'list-style-box'} onClick={() => {
                    filterCB({ listStyle: isBox ? CTYPE.productStyles.flat : CTYPE.productStyles.box }, false)
                }} />
            </div>
            <div className={showDrawer ? 'overlay' : 'overlay-fade-out'} onClick={() => this.showDrawer()} />
            <div className={showDrawer ? 'filter-drawer-open' : 'filter-drawer-close'}>
                <div className='container'>
                    <div className='block'>
                        <div className='title'>价格区间</div>
                        <div className='prices'>
                            <div className='input'>
                                <input value={prices[0] || ''} type='number' min={0} max={9999} onChange={(e) => {
                                    prices[0] = e.target.value;
                                    this.setState({ prices })
                                }} />
                            </div>
                            <div className='symbol'>~</div>
                            <div className='input'>
                                <input value={prices[1] || ''} type='number' min={0} max={9999} onChange={(e) => {
                                    prices[1] = e.target.value;
                                    this.setState({ prices })
                                }} />
                            </div>
                        </div>
                    </div>
                    <div className='split' />
                    <div className='block'>
                        <div className='title'>品牌</div>

                        <ul className='tags'>
                            {BRANDS.map((b, i) => {
                                let { id, icon, name } = b;
                                return <li key={i}>
                                    {icon && <img src={icon} />}
                                    {!icon && <span>{name}</span>}
                                </li>
                            })}
                            <div className='clearfix' />
                        </ul>
                    </div>
                    <div className='split' />
                    <div className='block'>
                        <div className='title'>风格</div>
                    </div>
                </div>
                <div className='btm'>
                    <div className='btn' onClick={() => {
                        this.setState({ prices: [0, 0] });
                        filterCB({ prices: [0, 0] });
                        this.showDrawer();
                    }}>重置</div>
                    <div className='btn-ok' onClick={() => {
                        filterCB({ prices });
                        this.showDrawer();
                    }}>确认</div>
                </div>
            </div>

        </div>;
    }
}

function PickBar(props) {
    let { label, val, callback } = props;

    return <div className='picker-bar'>
        <div className='bar'>
            <label>{label}</label>
            <span onClick={() => callback && callback()}>{val}</span>
            {callback && <i onClick={callback} />}
        </div>
        <div className='par' />

    </div>

}
class CommonPopup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }

    show = (val = false) => {
        this.setState({ show: val })
    }

    render() {

        let { show } = this.state;

        return <div >
            <div className={show ? 'overlay' : 'overlay-fade-out'} onClick={() => this.show()} />
            <div className={show ? 'my-popup-open' : 'my-popup-close'}>
                <div className='container'>
                    {this.props.children}
                </div>
                <div className='btm'>
                    <div className='btn'>
                        确定
                    </div>
                </div>
            </div>
        </div>
    }
}
class CommonPopups extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }

    show = (val = false) => {
        this.setState({ show: val })
    }

    render() {

        let { show } = this.state;

        return <div >
            <div className={show ? 'overlay' : 'overlay-fade-out'} onClick={() => this.show()} />
            <div className={show ? 'my-popup-open' : 'my-popup-close'}>
                <div className='container'>
                    {this.props.children}
                </div>
            </div>
        </div>
    }
}
function MyRate(props) {
    let { score } = props;
    let stars = [];
    let max = 5;

    for (let i = 0; i < parseInt(score); i++) {
        stars.push(<li key={i} className='star' />);
    }

    if (score % 1 > 0) {
        stars.push(<li key={9} className='star-half' />)
        max = 4;
    }

    for (let i = 0; i < max - parseInt(score); i++) {
        stars.push(<li key={10 + i} className='star-unchecked' />);
    }

    return <div className='my-rate'>
        <ul>
            {stars}
        </ul>
        {score}分
    </div>
}

class ParamModal extends React.Component {


    static propTypes = {
        product: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            product: this.props.product,
            defaultSno: this.props.defaultSno || '1',
            _specs: [],
            action: this.props.action || 'spec',
            currSpec: {},
            number: 1,
            isCart: this.props.isCart || false,
            sno: '',
            visible: this.props.visible
        };

    }

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({ visible: false });
        });
        this.sortSpecs();
    }

    sortSpecs = () => {

        let { product = {}, defaultSno } = this.state;

        let { specs = [] } = product;
        let _specs = [];
        let names = [];
        let defaultIndex = 0;

        //筛选出全部的标签
        specs.map((spe) => {
            let { params = [] } = spe;
            params.map((sp) => {
                names.push(sp.label);
            });
        });
        names = [...new Set(names)];

        let _params = [];
        specs.map((item) => {
            let { sno, params } = item;
            if (sno === defaultSno) {
                _params = params;
            }
        });

        //为标签筛选出全部的可选值，建立规格的二维关系
        names.map((name, index) => {
            let values = [];
            specs.map((spe) => {
                let { params = [] } = spe;
                params.map((sp) => {
                    if (sp.label === name) {
                        values.push(sp.value);
                    }
                });
            });
            values = [...new Set(values)];
            values.map((v, _index) => {
                _params.map((p) => {
                    if (p.value === v) {
                        defaultIndex = _index;
                    }
                });
            });
            _specs.push({ name, index, active: defaultIndex, values });
        });

        //根据可下单的第一个规格初始化默认选中标签

        let { params = [] } = specs.length > 0 ? specs[0] : {};
        for (let i = 0; i < params.length; i++) {
            let sprop = params[i];

            for (let j = 0; j < _specs.length; j++) {
                let spec = _specs[j];
                let { name, values = [] } = spec;
                if (sprop.name === name) {
                    for (let k = 0; k < values.length; k++) {
                        if (values[k] === sprop.value) {
                            spec.active = k;
                        }
                    }
                }
            }
        }

        this.setState({ _specs }, () => {
            this.setCurrentSpec();
        });

    };

    setCurrentSpec = () => {

        let currSpec = this.getCurrentSpec();
        let { params = [] } = currSpec;
        if (params.length > 0) {
            this.setState({
                currSpec: this.getCurrentSpec()
            }, () => {
                if (!this.state.isCart) {
                    this.props.setCurrSpec(currSpec);
                }
            });
        }
    };

    getCurrentSpec = () => {

        let { product = {}, _specs = [] } = this.state;
        let { specs = [] } = product;
        let currSpec = {};
        specs.map((spe, index) => {
            let { params = [] } = spe;
            let number = 0;
            params.map((spec) => {
                _specs.map((sp) => {
                    if (spec.label === sp.name && spec.value === sp.values[sp.active]) {
                        number++;
                    }
                });
            });
            if (number === _specs.length) {
                currSpec = spe;
            }
        });
        return currSpec;
    };

    showModal = (visible, action) => {
        this.setState({ visible, action });
    };

    checkable = (specs, _specs, name, value) => {

        let checkedspecs = { name: _specs[0].name, value: _specs[0].values[_specs[0].active] };
        for (let i = 0; i < specs.length; i++) {

            let prop = specs[i];
            let number = 0;
            let { params } = prop;
            for (let j = 0; j < params.length; j++) {
                let sprop = params[j];
                if ((sprop.label === name && sprop.value === value) || (sprop.label === checkedspecs.name && sprop.value === checkedspecs.value)) {
                    number++;
                }
            }
            if (number === _specs.length) {
                return true;
            }
        }
    };

    // cart = () => {
    //     let { currSpec = {}, number, product } = this.state;
    //     let { merchantId, id, stock } = product;
    //     if (number > stock) {
    //         Toast.show("库存不足");
    //         return;
    //     }
    //     if (U.str.isEmpty(number)) {
    //         Toast.show("所加购的商品数量有误");
    //         return;
    //     }
    //     if (Utils.token()) {
    //         App.api('usr/user/save', {
    //             shopping: JSON.stringify({
    //                 productId: id,
    //                 productSno: currSpec.sno,
    //                 number: number,
    //                 merchantId: merchantId
    //             })
    //         }).then(
    //             () => {
    //                 Toast.success("加入购物车成功");
    //                 this.setState({ visible: false });
    //                 this.loadData();
    //             }
    //         );
    //     } else {
    //         Toast.fail("请先登录");
    //     }
    // };
    loadData = () => {
        App.api('usr/user/carts').then((carts) => {
            this.setState({
                carts
            });
        })
    }
    // buy = () => {
    //     let { ids = [], number, currSpec = {}, product } = this.state;
    //     let { merchantId, id, stock } = product;
    //     if (number > stock) {
    //         Toast.show("库存不足");
    //         return;
    //     }
    //     if (U.str.isEmpty(number)) {
    //         Toast.show("所加购的商品数量有误");
    //         return;
    //     }
    //     if (id) {
    //         App.api('usr/user/save', {
    //             shopping: JSON.stringify({
    //                 productId: id,
    //                 number: number,
    //                 merchantId: merchantId,
    //                 productSno: currSpec.sno
    //             })
    //         }).then(
    //             (res) => {
    //                 let { id } = res;
    //                 ids.push(id);
    //                 this.setState({ visible: false });
    //                 let str = encodeURIComponent(encodeURIComponent(JSON.stringify(ids)));
    //                 App.go(`/trade/${str}`);
    //             });
    //     } else {
    //         Toast.fail('请先登录');
    //     }

    // };
    showModal = (visible, action) => {
        this.setState({ visible, action });
    };


    updateSno = () => {
        let { currSpec = {}, id } = this.state;
        App.api('/usr/user/update_params', {
            id,
            productSno: currSpec.sno
        }).then(() => {
            this.setState({ visible: false });
            this.loadData();
        });
    };

    render() {
        let { visible, product = {}, spe = '', currSpec = {}, _specs = [], number, isCart, action } = this.state;
        let { specs = [], rate } = product;
        let { imgs = [] } = currSpec;
        if (currSpec !== {}) {
            let { params = [] } = currSpec;
            params.map((p) => {
                spe = spe + p.label + ':' + p.value + '     ';
            });
        }

        return <div>
            <Popup
                visible={visible}
                onMaskClick={() => {
                    this.setState({ visible: false })
                }}
                onClose={() => this.setState({ visible: false })}
                bodyStyle={{ height: '60vh' }}
            >
                <div className='option'>
                    <img src={imgs[0]} />
                    <div className='price'>
                        <span>￥</span>
                        {U.price.cent2yuan(currSpec.linePrice)}
                    </div>
                    <div className='repertory'>剩余库存：{currSpec.repertory > 9999 ? '9999+' : currSpec.repertory}</div>
                    <div className='buy-body'>
                        {_specs.map((spec, index) => {
                            let { name, active, values = [] } = spec;
                            return <div className='specs' key={index}>
                                <div className='title'>{name}</div>
                                <ul>
                                    {values.map((str, i) => {
                                        let checkable = index === 0 || this.checkable(specs, _specs, name, str);
                                        return <li key={i}
                                            style={{ width: `${92 / 5}vw` }}
                                            className={checkable ? (active === i ? 'active' : '') : 'disabled'}
                                            onClick={() => {
                                                if (checkable) {
                                                    spec.active = i;
                                                    _specs[index] = spec;
                                                    this.setState({
                                                        _specs
                                                    }, () => {
                                                        this.setCurrentSpec();
                                                    });
                                                } else {
                                                    Toast.show('缺货');
                                                }
                                            }}>
                                            {str}
                                        </li>;
                                    })}
                                </ul>
                            </div>;
                        })}
                    </div>
                    {!isCart && <div className='buy_count_choose'>
                        数量
                        <a className='product-step'>
                            <Stepper
                                style={{ float: 'right', minWidth: '10vw' }}
                                showNumber
                                min={1}
                                value={number}
                                onChange={(e) => this.setState({ number: e })}
                            />
                        </a>
                    </div>}
                    <div className='btn'
                        onClick={() => {
                            if (isCart) {
                                this.updateSno();
                            } else {
                                if (action === 'cart') {
                                    this.cart();
                                } else if (action === 'order') {
                                    this.buy();
                                } else {
                                    this.showModal(false);
                                }
                            }

                        }}>
                        <a >确定</a>
                    </div>
                </div>
            </Popup>

        </div>;
    }


}

export {
    SearchInput, Navs, Banners, MyTags, CommonTabs, HorizonalScrollContainer, MyRate,
    TitleBar, ProductList, WaterFall, FilterBar, ProductLists, Bannerss, PickBar, CommonPopup, CommonPopups, ParamModal
};

