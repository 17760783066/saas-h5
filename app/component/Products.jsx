import React, { Component } from 'react';
import { Toast } from 'antd-mobile';
import { App, CTYPE, U, Utils, _DATA } from '../common';
import { FilterBar, ProductLists } from "./Comps";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            prices: [0, 0],
            sortField: 'default',
            sortAscDesc: 'desc',
            listStyle: CTYPE.productStyles.box,
            products:[],
        };
    }
    componentDidMount() {
        U.setWXTitle('所有商品');
        this.loadData();
    }
    loadData = () => {
        let { pagination, productQo = {} } = this.state;
        Toast.show({
            icon: 'loading',
            content: '加载中…',
        });
        this.setState({ list: [] });
        App.api('usr/user/products', {
            productQo: JSON.stringify({
                ...productQo,
            })
        }).then((products) => {
            this.setState({
                products
            });
        });
        setTimeout(() => {
            let { sortField, sortAscDesc, prices = [] ,products=[]} = this.state;
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
    render() {
        let { list = [], sortField, sortAscDesc, listStyle, } = this.state;
        return (
            <div className='products-page'>
                <FilterBar sorter={{ sortField, sortAscDesc }} listStyle={listStyle} filterCB={this.filterCB} />
                <ProductLists list={list} listStyle={listStyle} />
            </div>
        );
    }
}

export default Products;