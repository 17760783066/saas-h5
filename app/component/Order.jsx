import React, { Component } from 'react';
import { Toast } from 'antd-mobile';
import { App } from '../common';
import { U } from '../common';
import { CTYPE } from '../common';
import classnames from 'classnames';
import '../assets/css/order.scss'
import { Utils } from '../common';
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: parseInt(this.props.match.params.type),
            trades:[]
        }
    }
    componentDidMount() {
        U.setWXTitle('我的订单');
        this.loadData();
    }
    loadData = () => {
        let {pagination = {}, type} = this.state;
        App.api('/usr/trade/trades', {
            tradeQo: JSON.stringify({
                pageSize: pagination.pageSize,
                pageNumber: pagination.current,
                type
            })
        }).then((result) => {
            let {content = []} = result;
            this.setState({
                trades: content,
                pagination,
                initializing: 2,
                last: result.last
            });

        });
    };
    updateType = (id, type) => {
        App.api('/usr/trade/pay', {id: id, type: type}).then(() => {
            if (type === 5) {
                Toast.show("取消成功");
            }
            if (type === 4) {
                Toast.show("确认收货成功");
            }
            if (type === 6) {
                Toast.show("评论成功");
            }
            this.loadData();
        });

    };

    // remove = (id) => {
    //     App.api('/usr/user/address-remove', {
    //         id,
    //     },
    //     ).then(() => {
    //         Toast.show("删除成功");
    //         this.loadData();
    //     })
    // };
    render() {
        let { trades = [], type, pagination = {}, initializing, last } = this.state;
        let length = trades.length;
        return (
            <div className='order-page'>
                <div className='top-bar'>
                    {CTYPE.topBars.map((menu, index) => {
                        return <div className={classnames('menu', { 'cur': type === menu.type })}
                            onClick={() => {
                                this.setState({
                                    type: menu.type,
                                    pagination: { ...pagination, current: 1 }
                                }, () => {
                                    this.loadData();
                                });
                            }} key={index}>
                            <div className='title'>
                                <span>{menu.title}</span>
                            </div>
                        </div>;
                    })}

                </div>
                {trades.length === 0 && <div className='trade-empty'>
                    <div className='empty-icon' />
                    <p>您暂时没有相关订单！</p>
                </div>}
                <div className='trade-list'>
                {trades.map((trade, index) => {
                    let {tradeItems = [], totalAmount, type, id, totalPrice, merchant} = trade;
                    let {cover = '', name} = merchant;

                    return <div className='trade-detail' key={index}>

                        <div className='title-bar' /* onClick={() => {
                            App.go(`/trade-detail/${id}`);
                        }} */>
                            <div className='detail'>
                                <img className='merchant-logo' src={cover}/>
                            <span className='merchant-name'>{name}</span>
                            </div>
                            
                            <div
                                className={classnames('trade-type', {'comp': (type === 4 || type === 5 || type === 6)})}>{Utils.trade.typeToName(type)}</div>
                        </div>

                        {tradeItems.map((item, index) => {
                            let {product = {}, number, productSno} = item;
                            let {specs = [], name} = product;
                            let _specs = specs.filter(ss => ss.sno === productSno) || {};
                            return <div className='product-detail' key={index} /* onClick={() => {
                                App.go(`/trade-detail/${id}`);
                            }} */>
                                {_specs.map((s, index) => {
                                    let {price, imgs = [], params = []} = s;
                                    return <div className='inner' key={index}>
                                        <img className='left' src={imgs[0]}/>
                                        <div className='mid'>
                                            <span className='title'>{name}</span>
                                            {params.map((item, index) => {
                                                let {label, value} = item;
                                                return <span className='param' key={index}>
                                                            <span className='label'>{label}：</span>
                                                            <span className='value'>{value}</span>
                                                        </span>;
                                            })}
                                        </div>
                                        <div className='right'>
                                            <div className='price'>
                                                <em>￥</em>{U.price.cent2yuan(totalAmount, false)}</div>
                                            <div className='buy-num'>共{number}件</div>
                                        </div>
                                    </div>;
                                })}
                            </div>;
                        })}

                        <div className='btns'>
                            {type === 4 && <div className='btn comment' onClick={() => {
                                this.updateType(id, 6)
                            }}>去评价</div>}
                            <div className='btn'>联系客服</div>

                            {type === 3 && <React.Fragment>
                                <div className='btn' onClick={() => {
                                }}>查看物流
                                </div>
                                <div className='btn price' onClick={() => {
                                    this.updateType(id, 4);
                                }}>确认收货
                                </div>
                            </React.Fragment>}

                            {type === 1 && <React.Fragment>
                                <div className='btn' onClick={() => {
                                    this.updateType(id, 5);
                                }}>取消订单
                                </div>
                                <div className='btn price' onClick={() => {
                                    this.pay(id);
                                }}>立即付款
                                </div>
                            </React.Fragment>}

                        </div>
                        <div className='divider-h7'/>

                    </div>;
                })}
            </div>
            {/* {length > 0 && <Tloader
                className="main"
                autoLoadMore
                onRefresh={this.refresh} onLoadMore={this.loadMore} hasMore={!last}
                initializing={initializing}>
            </Tloader>} */}


            </div>
        );
    }
}

export default Order;