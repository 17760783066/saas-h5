import React, { Component } from 'react';
import { App, CTYPE, U, Utils, _DATA } from '../common';
import { Bannerss, CommonPopup, CommonPopups, CommonTabs, PickBar } from './Comps';
import '../assets/css/product.scss';
import { Popup, Stepper, Toast } from 'antd-mobile';
const { PRODUCTS = [], MERCHANTS = [], productContent } = _DATA.store;
const QA = ["本产品全国联保，享受三包服务，质保期为：二年质保", "您可以查询本品牌在各地售后服务中心的联系方式。售后服务电话：800-820-3800", "注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本公司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！"]
class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _specs: [],
            id: parseInt(this.props.match.params.id),
            product: {},
            spec: '',
            delivery: '快递',
            activeIndex: 0,
            show_option: false,
            show_express: false,
            show_params: false,
            show_QA: false,
            currSpec: {},
            count: 1,
            _params: [],
            action: 'spec',
        };
    }

    componentDidMount() {
        let { id } = this.state;
        App.api('usr/user/product', {
            id
        }).then((product) => {
            this.setState({
                product
            }, () => {
                U.setWXTitle(product.name);
                this.sortSpecs();
                this.sortParms();
            });
        });
        setTimeout(() => {
            let urls = [];
            let dom = U.htmlstr.html2dom(productContent || '<div></div>');
            let imgs = dom.getElementsByTagName('img');
            for (let i = 0; i < imgs.length; i++) {
                let img = imgs[i];
                let src = img.src;
                if (src.startsWith('http://') || src.startsWith('https://')) {
                    if (U.url.getDomainFromUrl(src) !== window.location.host) {
                        urls.push(src);
                    }
                }
            }
            this.imgsClickListner(urls);
        }, 1000);
    }
    sortParms = () => {
        let { product = {} } = this.state;
        let { params = [] } = product;
        let _params = [];
        params.map((par) => {
            let { label } = par;
            _params.push(label);
        })
        this.setState({ _params });
    }
    sortSpecs = () => {

        let { product = {} } = this.state;

        let { specs = [] } = product;
        let _specs = [];
        let names = [];

        //筛选出全部的标签
        specs.map((spe) => {
            let { params = [] } = spe;
            params.map((sp) => {
                names.push(sp.label);
            });
        });
        names = [...new Set(names)];

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
            _specs.push({ name, index, active: 0, values });
        });

        //根据可下单的第一个规格初始化默认选中标签
        let { params } = specs[0];
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
                halt: true,
                currSpec: this.getCurrentSpec()
            });
            setTimeout(() => {
                this.setState({
                    halt: false
                });
            }, 200);
        }
    };
    getCurrentSpec = () => {

        let { product = {}, _specs = [] } = this.state;
        let { specs = [] } = product;

        let currSpec = {};
        specs.map((spe, index) => {
            let { params = [] } = spe;
            let count = 0;
            params.map((spec) => {
                _specs.map((sp) => {
                    if (spec.label === sp.name && spec.value === sp.values[sp.active]) {
                        count++;
                    }
                });
            });
            if (count === _specs.length) {
                currSpec = spe;
            }
        });
        return currSpec;
    };
    imgsClickListner = (urls) => {
        let imgs = document.getElementsByTagName('img');
        for (let i = 0; i < imgs.length; i++) {
            let img = imgs[i];
            let index = urls.indexOf(img.src);
            if (index > -1) {
                img.onclick = () => {
                    if (img.parentNode.tagName !== "A") {
                        Utils.common.showImgLightbox(urls, index);
                    }
                }
            }

        }
    }
    checkable = (specs, _specs, name, value) => {

        let checkedspecs = { name: _specs[0].name, value: _specs[0].values[_specs[0].active] };
        for (let i = 0; i < specs.length; i++) {
            let prop = specs[i];
            let count = 0;
            let { params } = prop;
            for (let j = 0; j < params.length; j++) {
                let sprop = params[j];
                if ((sprop.label === name && sprop.value === value) || (sprop.label === checkedspecs.name && sprop.value === checkedspecs.value)) {
                    count++;
                }
            }
            if (count === _specs.length) {
                return true;
            }
        }
    };
    showSpec = (val = false) => {
        if (val) {
            let { currSpec } = this.state;
            let _currSpec = JSON.parse(JSON.stringify(currSpec));
            this.setState({ _currSpec });
        }
        this.setState({ showSpec: val });
    };

    setSpec = () => {
        let { _currSpec = {} } = this.state;
        this.setState({ currSpec: _currSpec });
        this.showSpec();
    };
    buy = () => {
        let { id, ids = [], count, currSpec = {}, product } = this.state;
        let { merchantId } = product;
        if (U.str.isEmpty(count)) {
            Toast.show("所加购的商品数量有误");
            return;
        }
        if (id) {
            App.api('usr/user/save', {
                shopping: JSON.stringify({
                    productId: id,
                    number: count,
                    merchantId: merchantId,
                    productSno: currSpec.sno
                })
            }).then(
                (res) => {
                    let { id } = res;
                    ids.push(id);
                    let str = encodeURIComponent(encodeURIComponent(JSON.stringify(ids)));
                    App.go(`/trade/${str}`);
                });
        } else {
            Toast.show('请先登录');
        }

    };
    cart = () => {
        let { currSpec = {}, id, count, product } = this.state;
        let { merchantId } = product;
        if (U.str.isEmpty(count)) {
            Toast.show("所加购的商品数量有误");
            return;
        }
        if (Utils.token()) {
            App.api('usr/user/save', {
                shopping: JSON.stringify({
                    productId: id, productSno: currSpec.sno, number: count, merchantId: merchantId
                })
            }).then(
                () => {
                    Toast.show("加入购物车成功");
                    this.setState({ show_option: false });
                    App.go(`/shopping/`);
                }
            );
        } else {
            Toast.show("请先登录");
        }
    };
    render() {
        let { product = {}, delivery, activeIndex, currSpec = {}, spe = '', _currSpec = {}, action = 'spec', _specs = [], show_QA, show_option, show_express, show_params, count } = this.state;
        let { specs = [], name, merchant = {}, params = [], content } = product;
        let { cover, location = {}, id } = merchant;
        let { poiaddress, poiname } = location;
        let label = params.length > 0 ? params[0].label : '';
        let { imgs = [] } = currSpec;
        if (currSpec !== {}) {
            let { params = [] } = currSpec;
            params.map((p) => {
                spe = spe + p.label + ':' + p.value + '     ';
            });
        }
        return (
            <div className='product-page'>
                <Bannerss list={specs} type={CTYPE.bannerTypes.product} />
                <div className='product-info'>
                    <div className='mixed'>
                        <div className='left'>
                            <div className='price'>
                                <p>
                                    <span>￥</span>
                                    {U.price.cent2yuan(currSpec.linePrice)}
                                </p>
                                <label>
                                    <span>￥</span>
                                    {U.price.cent2yuan(currSpec.price)}
                                </label>
                            </div>
                            <div className='repertory'>
                                3245人购买
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                剩余库存：{currSpec.repertory}
                            </div>
                        </div>
                        <ul className='btns'>
                            <li>收藏</li>
                            <li>分享</li>
                        </ul>
                    </div>
                    <div className='title'>{name}</div>
                    <div className='img' />
                </div>
                <div className='merchant-info'>
                    <img src={cover} />
                    <div className='m-info'>
                        <div className='name'>{merchant.name}</div>
                        <div className='addr'>{poiaddress}{poiname}</div>
                    </div>
                    <div className='btn' onClick={() => App.go(`/merchant/${id}`)}>进入店铺</div>
                </div>

                <ul className='specs'>
                    <li onClick={() => this.setState({ show_option: true, action: 'spec' })}>
                        <div className='label'>选择</div>
                            {currSpec === {} && <div className='txt'>规格<div className='line' /></div>}
                            {currSpec !== {} && <div className='txt'>{spe}
                            <div className='line' />
                            </div>}
                            <i />
                        <div className='arrow' />
                    </li>

                    <li onClick={() => {
                        params.length > 0 ? this.setState({ show_params: true, action: 'spec' }) : '';
                    }}>
                        <div className='label'>参数</div>
                        {params.length > 0 && <div className='txt'>{params[0].label}:{params[0].value}<div className='line' /></div>}
                        {!params.length > 0 && <div className='txt'>暂无参数<div className='line' /></div>}
                        <i />
                        <div className='arrow' />
                    </li>
                    
                    {<li onClick={() => this.setState({ show_QA: true })}>
                        <div className='label'>质保卡</div>
                        <div className='txt txt_black'>7天无理由退换 终身质保 三年免修<div className='line' /></div>
                        <i />
                    </li>}
                    
                    <PickBar label='运费' val={delivery || ''} callback={() => this.setState({ show_express: true })} />
                </ul>

                {/* <PickBar label='选择' val={_specs.length > 0 ? _specs.join(' ') : '选择'} callback={() => this.setState({ show_option: true })} /> */}
                <Popup
                    visible={show_option}
                    onMaskClick={() => {
                        this.setState({ show_option: false })
                    }}
                    onClose={() => this.setState({ show_option: false })}

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
                        <div className='buy_count_choose'>
                            数量
                            <a className='product-step'>
                                <Stepper
                                    style={{ float: 'right', minWidth: '10vw' }}
                                    showNumber
                                    min={1}
                                    value={count}
                                    onChange={(e) => this.setState({ count: e })}
                                />
                            </a>
                        </div>
                        <div className='btn'
                            onClick={() => {
                                if (action === 'cart') {
                                    this.cart();
                                } else if (action === 'order') {
                                    this.buy();
                                } else {
                                    this.setState({ show_option: false })
                                }
                            }}>
                            <a >确定</a>
                        </div>
                    </div>
                </Popup>



                {/* <PickBar label='参数' val={params.length > 0 ? params.join('/') : ''} callback={() => this.setState({ show_params: true })} /> */}
                <Popup
                    visible={show_params}
                    onMaskClick={() => {
                        this.setState({ show_params: false })
                    }}
                    onClose={() => this.setState({ show_params: false })}
                    bodyStyle={{ height: '60vh' }}
                >
                    <div className='params'>
                        <div className='a'>
                            <div className='params-title'>产品参数</div>
                            <div className='img' onClick={() => {
                                this.setState({ show_params: false });
                            }} />
                        </div>
                        <ul>
                            {
                                params.map((param, index) => {
                                    let { label, value } = param;
                                    return <li key={index}>
                                        <div className="label">{label}：</div>
                                        <div className="value">{value}</div>
                                    </li>;
                                })
                            }
                        </ul>
                    </div>

                </Popup>
                {/* <PickBar label='质保' val='7天无理由退换 终身质保 三年免修' callback={() => this.setState({ show_QA: true })} /> */}
                <Popup
                    visible={show_QA}
                    onMaskClick={() => {
                        this.setState({ show_QA: false })
                    }}
                    onClose={() => this.setState({ show_QA: false })}

                    bodyStyle={{ height: '60vh' }}
                >
                    <div className='QA'>
                        <div className='b'>
                            <div className='title'>
                                质保
                            </div>
                            <div className='img' onClick={() => {
                                this.setState({ show_QA: false });
                            }} />
                        </div>
                        {QA.map((m, n) => {
                            return <div className='body'>
                                <div className='img' />
                                <div className='txt'>
                                    {m}
                                </div>
                            </div>
                        })}
                    </div>
                </Popup>
                <CommonTabs list={['商品详情', '评价']} type='c' activeIndex={activeIndex} callback={(activeIndex) => {
                    this.setState({ activeIndex })
                }} />
                {
                    activeIndex == 0 &&
                    <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
                }
                <div className='btm-bar'>
                    <ul className='icons'>
                        <li>
                            <div className='icon merchant' />
                            <p onClick={() => App.go(`/merchant/${id}`)}>店铺</p>
                        </li>
                        <li>
                            <div className='icon cart'>
                                <div className='badge'>12</div>
                            </div>
                            <p>客服</p>
                        </li>
                    </ul>
                    <ul className='btns'>
                        <a onClick={() => this.setState({ show_option: true, action: 'cart' })}>加入购物车</a>
                        <a onClick={() => this.setState({ show_option: true, action: 'order' })}>立即购买</a>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Product;