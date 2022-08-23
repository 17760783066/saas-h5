import React, { Component } from 'react';
import { App, CTYPE, U } from '../common';
import '../assets/css/merchant.scss';
import { FilterBar, MyRate, MyTags, ProductLists } from './Comps';
import { FloatingBubble, Toast } from 'antd-mobile';
import { FingerdownOutline } from 'antd-mobile-icons'

const cates = ["家纺", "家居", "家具", "家居"]
class Merchant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            id: parseInt(this.props.match.params.id),
            merchant: {},
            score: 4.5,
            sortField: 'default',
            sortAscDesc: 'desc',
            listStyle: CTYPE.productStyles.mer,
        }
    }
    componentDidMount() {
        this.loadData();
    }
    loadData = () => {
        let { id, productQo } = this.state;
        App.api('usr/user/merchant', {
            id
        }).then((merchant) => {
            this.setState({
                merchant
            }, () => {
                U.setWXTitle(merchant.name);
            });
        });
        App.api('usr/user/productQo', {
            productQo: JSON.stringify({
                ...productQo,
                merchantId: id
            })
        }).then((products) => {
            this.setState({
                products
            });
        });
        setTimeout(() => {
            let { sortField, sortAscDesc, prices = [], products = [] } = this.state;
            let list = JSON.parse(JSON.stringify(products));
            if (prices[0] > 0 || prices[1] > 0) {
                list = list.filter((p) => !((prices[0] > 0 && p.specs[0].price < prices[0] * 100) || (prices[1] > 0 && p.specs[0].price > prices[1] * 100)));
            }
            let isDefault = sortField == 'default';
            let isPubAt = sortField == 'pubAt';
            let isPrice = sortField == 'price';
            let isDesc = sortAscDesc == 'desc';
            if (isDefault) {
                list = list.sort((a, b) => (a.id - b.id) * -1);
            } else if (isPubAt) {
                list = list.sort((a, b) => (a.createdAt - b.createdAt) * -1);
            } else if (isPrice) {
                list = list.sort((a, b) => (a.specs[0].price - b.specs[0].price) * (isDesc ? -1 : 1));
            }
            this.setState({ list });
            Toast.clear();
        }, 500);
    }
    filterCB = (obj, reload = true) => {
        this.setState({
            ...obj
        }, () => {
            reload && this.loadData()
        });
    }
    onClick = () => {
        App.go(`/shopping`);
    }
    render() {
        let { merchant, score, sortField, sortAscDesc, listStyle, products = [], } = this.state;
        let { cover, name, location = {} } = merchant;
        let { poiaddress, poiname } = location;
        return (
            <div className='merchant-page'>
                <div className='top'>
                    <img className='img' src={cover} />
                    <div className='inner'>
                        <div className='user-info'>
                            <img src={cover} />
                            <div className='u-info'>
                                <div className='details'>
                                    <div className='name'>
                                        {name}
                                    </div>
                                    <MyRate score={score} />
                                    <ul className='btns'>
                                        <li>2311购买</li>
                                        <p />
                                        <li>2311收藏</li>
                                    </ul>
                                    <MyTags list={cates} type='b' />
                                </div>
                                <div className='btn'>
                                    已收藏
                                </div>
                            </div>
                        </div>
                        <div className='addr'>{poiaddress}{poiname}</div>
                    </div>
                </div>
                <FilterBar sorter={{ sortField, sortAscDesc }} listStyle={listStyle} filterCB={this.filterCB} />
                <ProductLists list={products} listStyle={listStyle} />
                <FloatingBubble
                    axis='x'
                    magnetic='x'
                    style={{
                        '--initial-position-bottom': '24px',
                        '--initial-position-right': '24px',
                        '--edge-distance': '24px',
                    }}
                    onClick={this.onClick()}
                >
                    <FingerdownOutline fontSize={32} />
                </FloatingBubble>
            </div>
        );
    }
}

export default Merchant;