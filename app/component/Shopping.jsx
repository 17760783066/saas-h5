import React, { Component } from 'react';
import { Checkbox, Toast, Stepper, SwipeAction, Dialog } from 'antd-mobile';
import { App, U, Utils } from '../common';


import { AddOutline } from 'antd-mobile-icons';
import '../assets/css/shopping.scss';
import { ParamModal } from './Comps';
import CartUtils from './CartUtils';


class Shopping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _specs: [],
            carts: [],
            checkEdit: false,
            cartIds: [],
            show_option: false,
            currSpec: {},
            count: 1,
        }
    }
    componentDidMount() {
        U.setWXTitle('购物车');
        this.loadData();
    }
    loadData = () => {
        let { shoppingQo = {} } = this.state;
        App.api('usr/user/shoppingQo', {
            shoppingQo: JSON.stringify({
                shoppingQo,
            })
        }).then((carts) => {
            this.setState({
                carts
            });
        });
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
    updateNum = (id, number) => {
        App.api('usr/user/update_number', {
            id: id,
            number: number
        }).then(() => this.loadData());
    };

    changeParam = (product, productSno, id) => {
        Utils.common.renderReactDOM(<ParamModal visible={true} comp={this} product={product}
            defaultSno={productSno} isCart={true} id={id} />);
    };
    remove = (id) => {
        App.api('/usr/user/remove', {
            id,
        },
        ).then(() => {
            Toast.show("删除成功");
            this.loadData();
        })
    };

    render() {
        let { carts = [], checkEdit, cartIds = [], currSpec = {}, spe = '', } = this.state;
        let merchants = [];
        let total = 0;
        let merchantIds = new Set();
        let length = cartIds.length;
        let checkedCarts = carts.filter(item => cartIds.indexOf(item.id) > -1) || [];
        let checkAllCarts = (length === carts.length);
        if (currSpec !== {}) {
            let { params = [] } = currSpec;
            params.map((p) => {
                spe = spe + p.label + ':' + p.value + '     ';
            });
        }
        carts.map((shopping) => {
            let { merchant = {} } = shopping;
            let find = merchants.filter(m => m.id === merchant.id) || [];
            {
                find.length === 0 && merchants.push(merchant)
            }
        })
        cartIds.map((id) => {
            let cart = carts.find(c => c.id === id) || {};
            let { number, product = {}, productSno } = cart;
            let { specs = [] } = product;
            specs.map((item) => {
                let { price = 0, sno } = item;
                if (sno == productSno) {
                    total += number * price;
                }

            })
        });
        checkedCarts.map((cart) => {
            let { merchant = {} } = cart;
            merchantIds.add(merchant.id);
        });

        return (
            <div className='shopping-page'>
                {merchants.map((merchant, index) => {
                    let _carts = carts.filter(c => (c.merchant || {}).id === merchant.id) || [];
                    let checkAll = _carts.every(c => cartIds.indexOf(c.id) > -1);
                    //店铺互斥
                    let disabled = !checkEdit && merchantIds.size === 1 && !merchantIds.has(merchant.id);
                    return <div className='cart' key={index}>
                        <div className='merchant'>
                            <Checkbox checked={checkAll}
                                key={index}
                                onChange={(e) => {
                                    if (disabled) {
                                        cartIds = [];
                                    }
                                    let checked = e;
                                    _carts.map((cart) => {
                                        let id = cart.id;
                                        let index = cartIds.indexOf(id);
                                        if (checked) {
                                            if (index === -1) {
                                                cartIds.push(id);
                                            }
                                        } else {
                                            if (index > -1) {
                                                cartIds = U.array.remove(cartIds, index);
                                            }
                                        }
                                    });
                                    this.setState({
                                        cartIds
                                    }, () => {
                                        this.loadData(carts);
                                    });
                                }}>
                                <div className='icon-merchant' />
                                <div className='name'
                                    onClick={() => App.go(`/merchant/${merchant.id}`)}>{merchant.name}</div>
                                <i />
                            </Checkbox>
                        </div>
                        {_carts.map((item, index) => {
                            let { product = {}, productSno, number, id } = item;
                            let { specs = [] } = product;
                            let _specs = specs.find(spe => spe.sno === productSno) || {};
                            let { price, params = [], imgs = [] } = _specs;

                            return <SwipeAction
                                rightActions={[
                                    {
                                        key: 'delete',
                                        text: '删除',
                                        color: 'danger',
                                        onClick: async () => {
                                            await Dialog.confirm({
                                                content: '确定要删除吗？',
                                                onConfirm: async () => {
                                                    this.remove(id);
                                                },
                                            })
                                        },
                                    },
                                ]}
                            >
                                <div className='product' key={index}>

                                    <Checkbox checked={cartIds.indexOf(id) > -1} key={index}
                                        onChange={(e) => {
                                            let checked = e;
                                            if (disabled) {
                                                cartIds = [];
                                            }
                                            if (checked) {
                                                cartIds.push(id);
                                            } else {
                                                cartIds = U.array.remove(cartIds, cartIds.indexOf(id));
                                            }
                                            this.setState({
                                                cartIds
                                            }, () => {
                                                this.loadData(carts);
                                            });
                                        }}>
                                    </Checkbox>
                                    <img src={imgs[0]} onClick={() => App.go(`/product/${product.id}`)} />
                                    <div className='right'>
                                        <p>{product.name}</p>
                                        <div className='specs' onClick={() => this.changeParam(product, productSno, id)}>
                                            <div className='params'>
                                                {params.map((item, index) => {
                                                    let { label, value } = item;
                                                    return <div className='param' key={index}>
                                                        <div className='label'>{label}：</div>
                                                        <div className='value'>{value}</div>
                                                    </div>;
                                                })}
                                                <div className='arrows' />

                                            </div>

                                        </div>
                                        <div className='down'>
                                            <div className='price'><em>￥</em>{U.price.cent2yuan(price, false)}</div>
                                            <div className='count'>
                                                <a className='product-step'>
                                                    <Stepper
                                                        style={{ float: 'right', minWidth: '10vw' }}
                                                        showNumber
                                                        min={1}
                                                        value={number}
                                                        onChange={(e) => {
                                                            this.updateNum(id, e);
                                                        }}
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwipeAction>

                        })}
                    </div>;
                })}
                <div className='btm-bar'>
                    <ul className='price'>
                        <em>￥</em>{U.price.cent2yuan(total, false)}
                    </ul>
                    <ul className='btns'>
                        <div className='account-btn' onClick={() => {
                            if (cartIds.length === 0) {
                                Toast.show("请选择商品");
                                return;
                            }
                            let ids = encodeURIComponent(encodeURIComponent(JSON.stringify(cartIds)));
                            App.go(`/trade/${ids}`);
                        }}>
                            结算{length > 0 && <span className='account-num' onClick={() => {

                            }}>({length}件)</span>}
                        </div>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Shopping;