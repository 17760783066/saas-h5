import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

import Address from './component/address/Address';
import AddressEdit from './component/address/AddressEdit';
import Categorize from './component/Categorize';
import Home from './component/Home';
import HomeWrap from './component/HomeWrap';
import Merchant from './component/Merchant';
import Order from './component/Order';
import Product from './component/Product';
import Products from './component/Products';
import Shopping from './component/Shopping';
import Signin from './component/Signin';
import Store from './component/Store';
import Trade from './component/trade/Trade';
import TradeDetail from './component/trade/TradeDetail';


const routes = (
    <HashRouter>
        <Switch>

            <Redirect exact from='/' to='/home' />
            <Route path='/signin' component={Signin} />
            <Route path='/categorize' component={Categorize} />
            <Route path='/products' component={Products} />
            <Route path='/product/:id' component={Product} />
            <Route path='/merchant/:id' component={Merchant} />
            <Route path='/shopping' component={Shopping} />
            <Route path='/trade/:ids' component={Trade} />
            <Route path='/address/' component={Address} />
            <Route path='/address-edit/:id' component={AddressEdit} />
            <Route path='/trade-detail/:id/:type' component={TradeDetail} />
            <Route path='/order/' component={Order} />
            <Route path='/' children={() => (
                <HomeWrap>
                    <Switch>
                        <Route path='/home' component={Home} />
                        <Route path='/home-warp' component={HomeWrap} />
                        <Route path='/store' component={Store} />
                    </Switch>
                </HomeWrap>

            )}>
            </Route>
        </Switch>

    </HashRouter>
);

export default routes;
