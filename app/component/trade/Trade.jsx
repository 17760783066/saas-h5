import React, { Component } from 'react';
import { Toast, Popup, Input, Checkbox, Radio } from 'antd-mobile';
import { App } from '../../common';
import U from '../../common/U';
import { Utils } from '../../common';
import '../../assets/css/trade.scss';
const DISCOUNT = ['满100减9.9', '满200减29.9', '满500减100']
class Trade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ids: this.props.match.params.ids,
            show_discount: false,
            discount: DISCOUNT[0],
            carts: [],
            total: 0,
            couponPrice: 0,
            payMethod: 0,
            show_modal: false,
            address: {},
            addresses: [],
            totalAmoun: 0,
            type: 1,
        };
    }
    componentDidMount() {
        U.setWXTitle('确认订单');
        this.loadData();
    }
    loadData = () => {
        let { ids } = this.state;
        let cartIds = JSON.parse(decodeURIComponent(decodeURIComponent(ids)));
        App.api(`/usr/user/cart_list`, { ids: JSON.stringify(cartIds) }).then((carts) => {
            this.setState({ carts: carts });
            this.totalAmount();
        });

        App.api('/usr/user/addresses').then((result) => {
            let address = result.find(add => add.isDefault === 1) || {};
            this.setState({ address: address, addresses: result });
        });
    };
    totalAmount = () => {
        let { carts = [], total, discount, totalAmoun } = this.state;
        carts.map((carts) => {
            let { productSno, number, product = {} } = carts;
            let { specs = [] } = product;
            let _specs = specs.filter(ss => ss.sno === productSno) || {};
            _specs.map((sp) => {
                let { linePrice } = sp;
                total += linePrice * number;
            });
        });
        if (discount == DISCOUNT[0]) {
            totalAmoun = total - 990;
        } else if (discount == DISCOUNT[1]) {
            totalAmoun = total - 2990;
        } else if (discount == DISCOUNT[2]) {
            totalAmoun = total - 10000;
        }
        this.setState({ total });
        this.setState({ totalAmoun });
    };
    saveTrade = () => {
        let { carts = [], address = {}, payMethod, total, totalAmoun, type } = this.state;
        if (payMethod === 0) {
            Toast.show('请选择支付方式');
            return;
        }

        if (address.id == null) {
            Toast.show('请添加收货地址');
            return;
        }
        App.api('/usr/trade/save', {
            trade: JSON.stringify({
                tradeItems: [...carts],
                address: address,

            }), total,
            totalAmoun
        }).then((id) => {
            Toast.show('下单成功');
            App.go(`/trade-detail/${id}/${type}`);
        });

    };

    render() {
        let { carts = [], total, couponPrice, payMethod, address, addresses = [], show_discount, discount, } = this.state;
        let { name, id, location = {}, mobile = '' } = address;
        let { poiaddress, poiname } = location;
        let strMobile = mobile.substr(0, 3) + "****" + mobile.substr(7);
        return (
            <div className='trade-page'>
                {!id && <div className='user-location-none' onClick={() => App.go('/address/')}>
                    <div className='create-location'>
                        +添加收货地址
                    </div>
                    <div className='divider' />
                </div>}
                {id && <div className='addr-bar' >
                    <div className='user-info'>
                        <span className='name'>{name}</span>
                        <span className='mobile'>{strMobile}</span>
                    </div>
                    <div className='addr-detail'>
                        <span>{poiaddress}&nbsp;{poiname}</span>
                    </div>
                    <div className='divider' onClick={() => App.go('/address/')} />
                </div>}

                <div className='img' />
                <div className='products'>
                    {
                        carts.map((carts) => {
                            let { productSno, number, product = {} } = carts;
                            let { specs = [] } = product;
                            let _specs = specs.filter(ss => ss.sno === productSno) || {};
                            return _specs.map((sp) => {
                                let { imgs = [], linePrice, params = [] } = sp;
                                return <div className='product'>
                                    <img src={imgs[0]} />
                                    <div className='right'>
                                        <div className='name'>
                                            {name}
                                        </div>
                                        <div className='specs'>
                                            {
                                                params.length < 2 && <div className='def'>
                                                    默认规格
                                                </div>
                                            }
                                            {
                                                params.length >= 2 && <div className='opt'>
                                                    {params[0].value}/{params[1].value}
                                                </div>
                                            }

                                            &nbsp;&nbsp;
                                            <div className='number'>
                                                X{number}
                                            </div>
                                        </div>
                                        <div className='price'>
                                            <span>¥</span>
                                            {U.price.cent2yuan(linePrice)}
                                        </div>
                                    </div>
                                </div>
                            });
                        })
                    }
                    <div className='delivery'>
                        配送方式
                        <div className='style'>
                            送货上门
                        </div>
                    </div>
                    <div className='order'>
                        <div className='title'>
                            订单备注
                        </div>
                        <Input placeholder='选填，请与卖家协商一致' clearable
                        // onChange={(e) => {
                        //     this.setState({
                        //     });
                        // }}
                        > </Input>
                    </div>
                </div>

                <div className='discount' onClick={() => this.setState({ show_discount: true, action: 'cart' })}>
                    优惠券
                    <i />
                    {
                        DISCOUNT.length === 0 && <div className='style'>
                            无可用优惠券
                        </div>
                    }
                    {
                        DISCOUNT.length !== 0 && <div className='styles'>
                            {discount}
                        </div>
                    }

                </div>
                <Popup
                    visible={show_discount}
                    onMaskClick={() => {
                        this.setState({ show_discount: false })
                    }}
                    onClose={() => this.setState({ show_discount: false })}

                    bodyStyle={{ height: '60vh' }}
                >
                    {DISCOUNT.length !== 0 && DISCOUNT.map((txt, index) => {
                        let isDiscount = txt == discount;
                        return <li key={index}
                            className={isDiscount ? 'active' : ''}
                            onClick={() => {
                                !isDiscount && this.setState({ discount: txt, show_discount: false });
                            }}>
                            {txt}
                        </li>
                    })}
                    {DISCOUNT.length == 0 && <div className='null'>
                        无可用优惠券
                    </div>}
                </Popup>
                <div className='total'>
                    <div className='price'>
                        <div className='pr'>
                            商品金额
                        </div>
                        <div className='price-number' >
                            ¥{U.price.cent2yuan(total)}
                        </div>

                    </div>
                    <div className='freight'>
                        <div className='tit'>
                            运费
                        </div>
                        <div className='freight-number'>
                            + ¥ 0.00
                        </div>
                    </div>
                    <div className='dis'>
                        <div className='tit'>
                            优惠券
                        </div>
                        <div className='discount-number'>
                            {discount}
                        </div>
                    </div>
                    <div className='total'>
                        {
                            DISCOUNT[0] === discount && <div className='first'>
                                合计 ¥ {U.price.cent2yuan(total - 990)}
                            </div>
                        }
                        {
                            DISCOUNT[1] === discount && <div className='second'>
                                合计 ¥ {U.price.cent2yuan(total - 2990)}
                            </div>
                        }
                        {
                            DISCOUNT[2] === discount && <div className='tired'>
                                合计 ¥ {U.price.cent2yuan(total - 10000)}
                            </div>
                        }
                    </div>
                </div>
                <div className='pay-method'>
                    <div className='pay'>
                        <div className='icon-wechat' />
                        <span className='span-word'>微信支付</span>
                        <Checkbox checked={payMethod === 1} onChange={() => {
                            if (payMethod === 1) {
                                this.setState({ payMethod: 0 });
                            } else {
                                this.setState({ payMethod: 1 });
                            }
                        }} />
                    </div>

                    <div className='pay'>
                        <div className='icon-out-line' />
                        <span className='span-word'>线下支付</span>
                        <Checkbox checked={payMethod === 2} onChange={() => {
                            if (payMethod === 2) {
                                this.setState({ payMethod: 0 });
                            } else {
                                this.setState({ payMethod: 2 });
                            }
                        }} />
                    </div>
                </div>
                <div className='bar'>
                    <div className='left'>
                        <div className='tit'>
                            实付金额
                        </div>
                        <div className='total'>
                            {
                                DISCOUNT[0] === discount && <div className='first'>
                                    ¥{U.price.cent2yuan(total - 990)}
                                </div>
                            }
                            {
                                DISCOUNT[1] === discount && <div className='second'>
                                    ¥{U.price.cent2yuan(total - 2990)}
                                </div>
                            }
                            {
                                DISCOUNT[2] === discount && <div className='tired'>
                                    ¥{U.price.cent2yuan(total - 10000)}
                                </div>
                            }
                        </div>
                    </div>

                    <div className='btn' onClick={() => {
                        this.saveTrade()
                    }}>
                        提交订单
                    </div>
                </div>
            </div >
        );
    }
}

export default Trade;