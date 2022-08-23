import React, { Component } from 'react';
import { App } from '../../common';
import { U } from '../../common';
import '../../assets/css/trade-detail.scss'
import copy from 'copy-to-clipboard';
import { Toast } from 'antd-mobile';
class TradeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: parseInt(this.props.match.params.id),
            trade: {},
            type: parseInt(this.props.match.params.type),
        };
    }
    componentDidMount() {
        this.loadData();
    }
    loadData = () => {
        let { id } = this.state;
        App.api('/usr/trade/trade', { id }).then((trade) => {
            this.setState({ trade: trade });
        });
    };
    changeType = (id, type) => {
        App.api('/usr/trade/pay', { id, type: type }).then(() => {
            if (type === 2) {
                Toast.show("支付成功");
            }
            if (type === 4) {
                Toast.show("确认收货成功");
            }
            this.loadData();
        });
    };

    render() {
        let { trade, id, type } = this.state;
        let { address = {}, totalAmount, totalPrice, createdAt, orderNumber, tradeItems = [] } = trade;
        let { name, mobile = '', location = {} } = address;
        let { poiaddress, poiname } = location;
        let strMobile = mobile.substr(0, 3) + "****" + mobile.substr(7);
        return (
            <div className='detail-page'>
                <div className='img' />
                <div className='top-bar'>
                    {type === 1 && <div className='wait-pay'>
                        <div className='icon icon-wait' />
                        等待付款
                    </div>}
                    {type === 2 && <div className='wait-send'>
                        <div className='icon icon-payed' />
                        买家已付款
                    </div>}
                    {type === 3 && <div className='sent'>
                        <div className='icon icon-send' />
                        卖家已发货
                    </div>}
                    {type === 4 && <div className='comment'>
                        <div className='icon icon-comment' />
                        交易已成功
                    </div>}
                    {type === 5 && <div className='close'>
                        <div className='icon icon-close' />
                        交易已关闭
                    </div>}

                    {type === 1 && <div className='line-second'>
                        <span>需付款：￥{U.price.cent2yuan(totalAmount)}&nbsp;&nbsp;&nbsp;</span>
                        <span>剩余时间：29分</span>
                    </div>}

                    {(type === 2 || type === 3) && <div className='line-second'>
                        <span>剩余时间：8天20小时24分57秒</span>
                    </div>}


                </div>
                <div className={(type == 3 || type == 4) ? 'address-par' : 'address-bar'}>
                    {(type === 3 || type === 4) && <div className='expressage'>
                        <div className='icon' />
                        <div className='expressage-detail'>
                            圆通快递
                            <div className='expressage-number'>
                                快递单号:234244353234
                            </div>
                        </div>
                    </div>
                    }

                    <div className='address-detail'>
                        <div className='icon' />
                        <div className='address'>
                            <div className='people'>
                                {name} &nbsp;&nbsp;{strMobile}
                            </div>
                        </div>
                    </div>
                    <div className='location'>
                        <div className='code'>
                            地址：{poiaddress}{poiname}
                        </div>
                    </div>
                </div>
                <div className='product-detail'>
                    <div className='title'>
                        商品清单
                    </div>
                    <div className='body'>
                        {tradeItems.map((products) => {
                            let { number, product = {}, productSno } = products;
                            let { specs = [], name } = product;
                            let _specs = specs.filter(ss => ss.sno === productSno) || {};
                            return _specs.map((item) => {
                                let { params = [], imgs = [], linePrice } = item;
                                return <div className='products'>
                                    <img src={imgs[0]} alt="" />
                                    <div className='right'>
                                        <div className='title'>
                                            <span>
                                                {name}
                                            </span>
                                            <div className='product-price'>
                                                ¥
                                                {U.price.cent2yuan(linePrice)}
                                            </div>
                                        </div>
                                        <div className='body'>
                                            <div className='params'>
                                                {params.length < 2 && <div>
                                                    默认规格
                                                </div>}
                                                {params.length >= 2 && <div>
                                                    {params[0].value}X{params[1].value}
                                                </div>}
                                            </div>
                                            <div className='number'>
                                                X{number}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                        })}
                        <div className='btn'>
                            <div className='char'>
                                <div className='icon' />
                                &nbsp;
                                联系客服
                            </div>

                        </div>
                    </div>
                </div>
                <div className='other'>
                    <div className='trade'>
                        <div className='number'>
                            订单编号:&nbsp;{orderNumber}&nbsp;&nbsp;
                            <div className='copy-btn' onClick={() => {
                                copy(orderNumber);
                                Toast.show('复制成功')
                            }}>复制
                            </div>
                        </div>
                        <div className='time'>
                            下单时间:&nbsp;{U.date.format(new Date(createdAt), 'yyyy-MM-dd HH:mm:ss')}
                        </div>
                    </div>

                    <div className='way'>
                        <div className='pay'>
                            支付方式:&nbsp;微信支付
                        </div>
                        <div className='delivery'>
                            配送方式:&nbsp;上门提货
                        </div>
                    </div>
                    <div className='price'>
                        <div className='pro-price'>
                            商品金额
                            <div className='product-pri'>
                                ¥&nbsp;{U.price.cent2yuan(totalPrice)}
                            </div>
                        </div>
                        <div className='freight'>
                            运费
                            <div className='freight-pri'>
                                + ¥ 0.00
                            </div>
                        </div>
                        <div className='freight-discount'>
                            运费优惠
                            <div className='fre-dis-pri'>
                                - ¥ 0.00
                            </div>
                        </div>
                        <div className='discount'>
                            商品优惠
                            <div className='discount-pri'>
                                满100减9.9
                            </div>
                        </div>
                    </div>

                </div>
                <div className='total-Amount'>
                    需付款: <div className='Amount'>
                        ¥ {U.price.cent2yuan(totalAmount)}
                    </div>
                </div>
                {type === 1 && <div className='bar'>
                    <span>
                        联系客服
                    </span>
                    <span>
                        取消订单
                    </span>
                    <span onClick={() => {
                        this.changeType(id, 2),
                            this.setState({ type: 2 })
                    }}>
                        立即付款
                    </span>
                </div>}
                {type === 2 && <div className='bar-two'>
                    <span>联系客服</span>
                </div>}
                {type === 3 && <div className='bar-three'>
                    <span>联系客服</span>
                    <span onClick={() => {
                        this.changeType(id, 4),
                            this.setState({ type: 4 })
                    }}>确认收货</span>
                </div>}
                {type === 4 && <div className='bar-three'>
                    <span>联系客服</span>
                    <span onClick={() => {
                        this.changeType(id, 5),
                            this.setState({ type: 5 })
                    }}>去评价</span>
                </div>}
                {type === 5 && <div className='bar-two'>
                    <span>联系客服</span>
                </div>}
            </div>
        );
    }
}

export default TradeDetail;