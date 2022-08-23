import React, { Component } from 'react';
import { App, CTYPE, Utils, _DATA } from '../common';
import { CommonTabs, SearchInput } from './Comps';
import '../assets/css/categories.scss'
import classnames from 'classnames';
const { BRANDS } = _DATA.store;

class Categorize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: -1,
            categories: [],
            listStyle: CTYPE.productStyles.box,
            brandQo: []
        };
    }
    componentDidMount() {
        this.loadData();
    }
    loadData = () => {
        App.api('usr/user/list_category').then((categories) => {
            this.setState({
                categories,
                loading: false
            })
        });
        App.api('usr/user/all_brands', {
        }).then((brandQo) => {
            this.setState({
                brandQo,
                loading: false
            });
        });

    }
    render() {
        let { categories = [], activeIndex = -1, brandQo = [] } = this.state;
        let categoriesChildren = [];
        if (activeIndex > -1) {
            categoriesChildren = categories[activeIndex].children || [];
        }
        return (
            <div className='categories-page'>
                <SearchInput type='b' txt='输入建材或者品牌' />
                <div className='categories-content'>
                    <div className='left'>
                        <div className='all'>
                            <a onClick={() => {
                                this.setState({ activeIndex: -1 }, this.loadData)
                            }}>全部品牌</a>
                        </div>
                        {
                            <div className='categories-one'>
                                {categories.map((item, index) => {
                                    let { name } = item;
                                    return <React.Fragment key={index}>
                                        <li key={index} className={classnames({ 'active': activeIndex === index })}
                                            onClick={() => {
                                                this.setState({ activeIndex: index });
                                            }}>
                                            {name}
                                        </li>
                                    </React.Fragment>;
                                })}
                                {/* <CommonTabs list={categories} type='b' activeIndex={activeIndex} callback={(activeIndex) => {
                                    this.setState({ activeIndex }, this.loadData)
                                }} /> */}
                            </div>
                        }
                    </div>
                    <div className='right'>
                        <div className='two'>
                            {
                                activeIndex == -1 && <div className='brands'>
                                    <div className='title'>
                                        全部品牌
                                    </div>
                                    <div className='body'>
                                        {
                                            brandQo.map((h, i) => {
                                                let { cover } = h;
                                                return <div className='logo' >
                                                    <div className='frame'>
                                                        <img src={cover} style={{ width: `15vw`, height: `9vw` }} />
                                                    </div>

                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            }
                            {activeIndex > -1 &&
                                categoriesChildren.map((item, index) => {
                                    let { name, children = [] } = item
                                    return <div className='two-a'>
                                        <div className='two-name'>
                                            {name}
                                        </div>
                                        <div className='three'>
                                            {children.map((g, h) => {
                                                let { icon, name } = g;
                                                return <div className='three-a'>
                                                    <img src={icon} />
                                                    <div className='three-name'>
                                                        {name}
                                                    </div>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Categorize;