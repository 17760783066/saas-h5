import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Utils } from '../common';
import '../assets/css/home-wrap.scss';
class HomeWrap extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            setTimeout(() => {
                Utils.common.scrollTop();
            }, 500);
        });
    }
    render() {

        return (
            <div className='home-wrap'>
                <div className='inner-page'>
                    {this.props.children}
                </div>

                <ul className='btm-menu'>
                    <li><NavLink to='/home'><i className='home' /><p>首页</p></NavLink></li>
                    <li><NavLink to='/products'><i className='products' /><p>装修</p></NavLink></li>
                    <li><NavLink to='/add'>
                        <div className='a'></div><i className='add' /><p></p></NavLink></li>

                    <li><NavLink to='/store'><i className='store' /><p>商城</p></NavLink></li>

                    <li><NavLink to='/profile'><i className='profile' /><p>我的</p></NavLink></li>
                </ul>

            </div>
        );
    }
}

export default HomeWrap;