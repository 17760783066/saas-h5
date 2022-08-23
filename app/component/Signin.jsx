import React from 'react';
import { U, App, CTYPE } from '../common';
import { Toast, Picker ,Input,Button} from 'antd-mobile';
import classnames from 'classnames';
import CountryArray from "../common/CountryArray";
import OEM from "../common/OEM";
import '../assets/css/signin.scss';

const { countries = [] } = CountryArray;
export default class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valCode: {
                userType: CTYPE.userType.user,
                accountType: CTYPE.accountType.mobile
            },
            count: 60,
            disabled: false,
            countryCode: '86',
        };
        this.timerId = 0;
    }

    componentDidMount() {
        U.setWXTitle("登录/注册");
    }
    sendValCode = () => {
        let { valCode = {} } = this.state;
        let { account } = valCode;
        let key = new Date().getTime();
        account = U.str.trim(account);
        valCode.key = key;
        App.api("common/gen_valCode", {
            valCode: JSON.stringify({
                ...valCode,
                account,
            })
        }).then(() => {
            this.startTimer();
            this.setState({
                disabled: true, valCode
            });
            Toast.show({content:"验证码发送成功请注意查收"});
        });
    };
    startTimer = () => {
        this.timerId = setInterval(() => {

            let { count } = this.state;

            if (count - 1 <= 0) {
                this.setState({
                    disabled: false,
                    count: 60
                });
                clearInterval(this.timerId);
            } else {
                this.setState({
                    disabled: true,
                    count: count - 1
                });
            }
        }, 1000);
    };
    modValCoe = (field, val) => {
        let { valCode = {} } = this.state;

        valCode[field] = val;

        this.setState({ valCode });

        if (field == 'code') {
            if (val.length == 6) {
                this.setState({ status: false });
            } else {
                this.setState({ status: true });
            }
        }
    }
    signcode = () => {
        let { valCode = {} } = this.state;
        let { account, code } = valCode;
        if (!U.str.isChinaMobile(account)) {
            Toast.fail("请填写正确的手机号");
            return;
        }
        if (U.str.isEmpty(code)) {
            Toast.fail("请填写验证码");
            return;
        }
        App.api('/usr/user/signin', {
            valCode: JSON.stringify(valCode)
        }).then(res => {
            let {  userSession = {} } = res;

            App.saveCookie('user-token', userSession.token);
            Toast.show({content:'登录成功'});
            App.go('/home');
        })
    };

    render() {
        let { status, valCode, disabled, count } = this.state;
        let { account = '' } = valCode;
        let isMobile = U.str.isChinaMobile(account);

        return <div className='signin-page'>
            <div className='signin-bg'>

                <div className='signin-signup'>登录/注册</div>

                <div className='signin'>
                    <Input className='input-mobile' placeholder='手机号' maxLength={11} clearable onChange={(v) => {
                        this.modValCoe('account', v)
                    }}> </Input>

                    <div className='signin-code-get'>
                        <Input className='input-code' placeholder='请输入验证码' clearable onChange={(v) => {
                            this.modValCoe('code', v)
                        }}></Input>
                        <div className='code' ><span onClick={() => {
                            if (!isMobile) {
                                Toast.show({ content: <span>请输入正确的手机号</span>, icon: 'fail' });
                            }
                            return isMobile && this.sendValCode()
                        }
                        }>{disabled ? `${count}秒后获取` : '获取验证码'}</span></div>
                    </div>
                    <div className='signin-btn-line'>
                        <Button className='singin-btn' disabled={status} onClick={() => {
                            this.signcode()
                        }}>登录</Button>
                    </div>

                </div>

            </div>

        </div>
    }
}