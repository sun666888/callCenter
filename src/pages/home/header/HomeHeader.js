import React from 'react'
import loginApi from './../../../services/login'
import { message, Modal, Input } from 'antd';
import logoImg from './../../logo.png'
import dangerImg from './danger.png'
import './homeHeader.less'

const { TextArea } = Input;
class HomeHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            mobile: '',
            reason: ''
        }
    }


    componentDidMount() {
        let m = localStorage.getItem('mobile');
        m = m.substr(0, 3) + "****" + m.substr(7);
        this.setState({
            userName: localStorage.getItem('name'),
            mobile: m
        })
    }


    render() {
        const { userName, mobile, isShow } = this.state;
        let imgStyle = {
            display: 'block',
            margin: '20px auto',
        }
        return (
            <div className='HomeHeader_bg'>
                <div className='header_con'>
                    <div className='header_logo'><img className='logo_img' src={logoImg} alt='' /><span>易声呼叫中心众包平台</span></div>
                    <div className='header_handle'>
                        <span onClick={this.toHome}>您好，{userName}</span> &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
                        <span onClick={this.onLogout}>退出</span> &nbsp;&nbsp;&nbsp;
                        <span onClick={this.del}>账户销户</span>
                    </div>
                </div>
                <Modal title="警告" visible={isShow} onOk={this.delBtn} onCancel={this.hideModel} okText="确定" cancelText="取消">
                    <img style={imgStyle} src={dangerImg} alt='' />
                    <p style={{textAlign: 'center'}}>您确定注销{mobile}该账户吗？</p>
                    <p style={{textAlign: 'center'}}>账户注销后将不能再次登陆！</p>
                    <TextArea style={{display: 'block',margin: '0 auto'}} rows={4} placeholder='请填写注销原因' onChange={this.bindReason} />
                </Modal>
            </div>
        )
    }
    // 退出登录
    onLogout = () => {
        loginApi.logout().then(
            res => {
                if (res.code === 0) {
                    message.success('退出成功')
                    this.props.history.push('/login')
                    localStorage.clear()
                } else {
                    message.error(res.msg)
                }
            }
        )
    }
    // 回首页
    toHome = () => {
        let role = localStorage.getItem('name');
        if (role === 'Normal') {
            localStorage.setItem('active_id', 0)
            localStorage.setItem('active_path', '')
            window.location.reload()
        }
    }
    bindReason = (e) => {
        this.setState({
            reason: e.target.value
        })
    }

    del = () => {
        this.setState({ isShow: true })
    }
    // 销户
    delBtn = () => {
        let {reason} = this.state;
        if (reason === '') {
            message.error('请填写注销原因')
        } else {
            loginApi.deleUser(reason).then(res => {
                if (res.code === 0) {
                    message.success('注销成功')
                    this.props.history.push('/login')
                    localStorage.clear()
                } else {
                    message.error(res.msg)
                }
            })
        }
    }

    hideModel = () => {
        this.setState({ isShow: false })
    }

}

export default HomeHeader