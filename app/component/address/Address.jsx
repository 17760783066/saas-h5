import React, { Component } from 'react';
import { App } from '../../common';
import { U } from '../../common';
import '../../assets/css/address.scss';
import { Tag, SwipeAction, Dialog, Toast } from 'antd-mobile';
class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: [],
        }
    }
    componentDidMount() {
        U.setWXTitle('添加收货地址');
        this.loadData();
    }
    loadData = () => {
        App.api(`/usr/user/addresses`).then((addresses) => {
            this.setState({
                addresses
            })
        })
    };
    remove = (id) => {
        App.api('/usr/user/address-remove', {
            id,
        },
        ).then(() => {
            Toast.show("删除成功");
            this.loadData();
        })
    };

    render() {
        let { addresses = [] } = this.state;
        let length = addresses.length;

        return <div className='address-page'>
            {length !== 0 && <div className='length'>
                {
                    addresses.map((item) => {
                        let { mobile, name, id, isDefault ,location={}} = item;
                        let{poiaddress,poiname}=location;
                        return <SwipeAction
                            rightActions={[
                                {
                                    key: 'delete',
                                    text: '删除',
                                    color: 'light',
                                    onClick: async () => {
                                        await Dialog.confirm({
                                            content: '确定要删除吗？',
                                            onConfirm: async () => {
                                                this.remove(id);
                                            },
                                        })
                                    },
                                },
                            ]}>
                            <div className='body'>
                                <div className='title'>
                                    <div className='img' />
                                    <div className='code'>
                                        {poiaddress}
                                    </div>
                                </div>

                                <div className='detail'>
                                    {poiname}
                                    <img src='' onClick={() => {
                                        App.go(`/address-edit/${id}`);
                                    }} />
                                </div>
                                <div className='name'>
                                    {name}
                                    &nbsp;&nbsp;
                                    {mobile}
                                </div>
                                {
                                    isDefault == 1 && <div className='tit'>
                                        <Tag color='default'>默认地址</Tag>
                                    </div>
                                }

                            </div>
                        </SwipeAction>
                    })
                }

                <ul className='btn' onClick={() => {
                    App.go(`/address-edit/${0}`);
                }} >
                    +新建地址
                </ul>
            </div>
            }
            {
                length === 0 && <div className='address-empty' onClick={() => App.go(`/address-edit/${0}`)}>
                    <div className='empty-icon' />
                </div>

            }


        </div>
    }
}

export default Address;