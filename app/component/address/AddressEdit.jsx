import React, { Component } from 'react';
import { Input, Popup, Switch, Toast, TextArea } from 'antd-mobile';
import '../../assets/css/address-edit.scss';
import classnames from 'classnames';
import { DownOutline } from 'antd-mobile-icons'
import { U } from '../../common';
import { App } from '../../common';
import { Utils } from '../../common';
import { CTYPE } from '../../common';

const NUMBER = ['+86', '+83', '+23']
class AddressEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: parseInt(this.props.match.params.id),
            number: NUMBER[0],
            showLocationPicker: false,
            show_picker: false,
            address: {},
            add: {},
        };
    }

    componentDidMount() {
        U.setWXTitle('添加收货地址');
        this.loadData();
    }
    loadData = () => {
        let { id } = this.state;
        if (id && id > 0) {
            App.api('/usr/user/address', { id }).then((add) => {
                let { code } = add;
                let codes = Utils.addr.getCodes(code);
                this.setState({ add, pickerValue: codes });
            });
        }
    };
    onMsg = (e) => {
        let { data = {}, origin } = e;
        if (origin.indexOf('m.amap.com') > 0) {
            this.showPicker(false);
            this.syncLocation(data);
            window.removeEventListener('message', this.onMsg);
        }
    };
    syncLocation = (loc) => {

        let { add = {} } = this.state;
        let { location = '', poiaddress, poiname } = loc;

        let ss = location.split(',');
        let _location = {
            ...add.location || {},
            lat: ss[1],
            lng: ss[0],
            poiaddress, poiname
        };
        // location = {
        //     ...location,
        //     lat: latlng.lat,
        //     lng: latlng.lng,
        //     poiaddress, poiname, code: _code || code
        // };
        this.setState({
            add: {
                ...add,
                location: _location,
            },
        }, () => {
            this.fetchGeo();
        });

    };
    fetchGeo = () => {
        let { add = {} } = this.state;
        let { location = {} } = add;
        App.api(`/common/geocoder`, {
            lat: location.lat,
            lng: location.lng,
            key: CTYPE.qqmapKey
        }).then((ret) => {
            let { result = {} } = ret;
            let { ad_info = {}, address, formatted_addresses = {} } = result;
            let { adcode } = ad_info;
            this.setState({
                add: {
                    ...add,
                    location: {
                        ...location,
                        code: adcode,
                        poiaddress: address, poiname: formatted_addresses.recommend
                    }
                },
                pickerValue: Utils.addr.getCodes(adcode),
            });
        });
    };
    showPicker = (show) => {
        if (show) {
            setTimeout(() => {
                let iframe = document.getElementById('location_picker').contentWindow;
                document.getElementById('location_picker').onload = () => {
                    iframe.postMessage('hello', 'https://m.amap.com/picker/');
                };
                window.addEventListener("message", this.onMsg, false);
            });
        }
        this.setState({ show_picker: show });
    };

    submit = () => {
        let { add, id } = this.state;
        add.id = id > 0 ? id : null;

        let {   mobile, name, isDefault,location={} } = add;
        if (U.str.isEmpty(name)) {
            Toast.show("请输入收件人姓名！");
            return;
        }
        if (U.str.isEmpty(mobile)) {
            Toast.show("请输入手机号！");
            return;
        }
        if (!U.str.isChinaMobile(mobile)) {
            Toast.show("请输入正确手机号！");
            return;
        }
        if (U.str.isEmpty(location.code)) {
            Toast.show("请输入收件人所在地区！");
            return;
        }
        if (U.str.isEmpty(location.detail)) {
            Toast.show("请输入收件人详细地址");
            return;
        }
        if (location.detail.length > 50) {
            Toast.show("收货地址过长");
            return;
        }
        if (U.str.isEmpty(isDefault)) {
            add.isDefault = 2;
        }
        App.api('/usr/user/address-save', { address: JSON.stringify(add) }).then(() => {
            Toast.show('保存成功！');
            window.history.back();
        });
    };

    render() {
        let { number, showLocationPicker, add = {}, wxLocation, show_picker } = this.state;
        let { name, mobile, isDefault, location = {} } = add;
        let { code, detail, lat, lng, poiaddress = '', poiname = '' } = location;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let pickerUrl = 'https://m.amap.com/picker/?key=713b447894b12eb95a7fc9d69cee7b2f';
        if (U.str.isNotEmpty(wxLocation)) {
            pickerUrl += '&center=' + wxLocation.longitude + ',' + wxLocation.latitude;
        }
        return (
            <div className='address-edit-page'>
                <Popup
                    visible={show_picker}
                    style={{ width, height: height - 50, marginTop: '50px' }}
                    onClose={() => this.showPicker(false)}
                    onMaskClick={() => {
                        this.showPicker(false);
                    }}>
                    <iframe id="location_picker" frameBorder="0" scrolling="no"
                        src={pickerUrl}
                        style={{ width: width, height: height - 100, border: 'none' }}>
                    </iframe>
                </Popup>
                <div className='name'>
                    <div className='nam'>
                        收货人
                    </div>
                    <Input placeholder='名字' maxLength={11} value={name} clearable onChange={(e) => {
                        this.setState({
                            add: {
                                ...add,
                                name: e
                            }
                        });
                    }}> </Input>
                </div>
                <div className='mobile'>
                    <div className='phone'>
                        手机号码
                    </div>
                    <div className='box'>
                        <Input placeholder='手机号' value={mobile} maxLength={11} clearable onChange={(e) => {
                            this.setState({
                                add: {
                                    ...add,
                                    mobile: e
                                }
                            });
                        }}>
                        </Input>
                        <div className='number' onClick={() => this.setState({ showLocationPicker: true })}>
                            <p>{number}</p>
                            <div className={classnames('icon', { 'rotate': showLocationPicker })}>
                                <DownOutline />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='location'>
                    <div className='locat'>
                        所在地区
                    </div>
                    <div className='box'>
                        <Input placeholder='省、市、区、街道' clearable value={poiaddress + poiname}
                            onFocus={() => {
                                this.showPicker(true);
                            }}
                        > </Input>
                        <div className='img' />
                    </div>

                </div>
                <div className='locations'>
                    <div className='locat'>
                        详细地址
                    </div>
                    <div className='box'>
                        <TextArea value={detail} rows={3} placeholder="小区楼栋/乡村名称" className="input-detail" onChange={(val) => {
                            location.detail = val;
                            this.setState({
                                add: {
                                    ...add,
                                    location
                                }
                            })
                        }} />
                        <div className='img' />
                    </div>

                </div>
                <div className='default'>
                    <div className='txt'>
                        设为默认收货地址
                    </div>
                    <div className='off'>
                        <Switch defaultChecked
                            style={{
                                '--checked-color': '#00b578',

                            }}
                            checked={isDefault === 1}
                            onChange={(e) => {
                                this.setState({
                                    add: {
                                        ...add,
                                        isDefault: e ? 1 : 2
                                    }
                                });
                            }}
                        />
                    </div>
                </div>
                <div className='btn' onClick={() => {
                    this.submit();
                }}>
                    保存
                </div>
                <Popup className='city-picker'
                    visible={showLocationPicker}
                    onMaskClick={() => {
                        this.setState({ showLocationPicker: false });
                    }}
                    bodyStyle={{ height: '40vh' }}>
                    <div className='header'>
                        请选择
                        <i onClick={() => this.setState({ showLocationPicker: false })} />
                    </div>

                    <div className='container'>
                        <div className='scroll-view'>
                            <ul>
                                {NUMBER.map((txt, index) => {
                                    let isActive = txt == number;
                                    return <li key={index} className={isActive ? 'active' : ''} onClick={() => {
                                        !isActive && this.setState({ number: txt, showLocationPicker: false });
                                    }}>{txt}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                </Popup>
            </div>
        );
    }
}

export default AddressEdit;