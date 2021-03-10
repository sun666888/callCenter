import React from 'react'
import './HomeContent.less'
import homeApi from './../../../services/home'
import { Alert, Menu, Skeleton,  message,} from 'antd';
import userImg from './images/defaultUser.png'
import { AppstoreOutlined, MailOutlined, SettingOutlined, UsergroupAddOutlined, InsertRowRightOutlined } from '@ant-design/icons';
import HomeInfo from './../homeInfo/HomeInfo'
import UserInfo from './../userInfo/UserInfo'
import Test from './../test/Test'
import ChangePassword from './../changePassword/ChangePassword'
import UserRegister from './../user/UserRegister'
import UserApply from './../user/UserApply'
import UserLogout from './../user/UserLogout'
import UserSche from './../user/UserSche'
import UserAccount from './../user/UserAccount'
import Train from './../train/Train'
import Outbound from './../outbound/Outbound'
import Company from './../company/Company'
import Workplace from './../company/Workplace'

const { SubMenu } = Menu;

class HomeContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            mobile: '',
            userInfo: {
                company: '',
                workplace: '',
                email: '',
                work_license: []
            },
            loading: true,
            clickActive: 0,
            clickPath: '',
        }
    }
    componentWillMount() {
        this.getUserInfo() // 初始获取用户信息
        let m = localStorage.getItem('mobile');
        m = m.substr(0, 3) + "****" + m.substr(7);
        this.setState({
            mobile: m
        })
        let path = localStorage.getItem('active_path') // 记录左侧导航栏点击的页面
        let key = localStorage.getItem('active_id') // 记录左侧导航栏点击的页面
        this.setState({
            clickActive: key,
            clickPath: path
        })
    }

    // 获取用户简介
    getUserInfo() {
        homeApi.userInfo().then(
            res => {
                this.setState({
                    loading: false,
                    userInfo: res.data
                })
                localStorage.setItem('infoId',res.data.id)

            }
        )
    }

    handleClick = e => {
        this.setState({
            clickActive: e.key
        })
        localStorage.setItem('active_id',e.key)
        localStorage.setItem('active_path',e.keyPath[1])
    };

    showView = () =>{
        const { loading, clickActive, userInfo, mobile } = this.state;
        let view = null;
        switch (clickActive) {
            case '1': 
                view = (<UserInfo loading={loading} userId={userInfo.id} mobile={mobile} />)
                break;
            case '2':
                view = (<Test />)
                break;
            case '3':
                if (userInfo.company === '暂无') {
                    message.error('咦~还没有加入公司呢~先去申请公司或者等公司同意再来吧~')
                } else {
                    view = (<Train />)
                }
                
                break;
            case '4':
                view = (<ChangePassword />)
                break;
            case '5':
                view = (<UserRegister />)
                break;
            case '6':
                view = (<UserApply />)
                break;
            case '7':
                view = (<UserLogout />)
                break;
            case '8':
                view = (<UserSche />)
                break;
            case '9':
                if (userInfo.company === '暂无') {
                    message.error('咦~还没有加入公司呢~先去申请公司或者等公司同意再来吧~')
                } else {
                    view = (<Outbound />)
                }
                break;
            case '10':
                view = (<Company />)
                break;
            case '11':
                view = (<Workplace />)
                break;
            case '12':
                view = (<UserAccount />)
                break;
            default:
                view = (<HomeInfo loading={loading} userInfo={userInfo} mobile={mobile} />)
                break;
        }
        return view
    }

    render() {
        const { loading, clickActive, clickPath, } = this.state;

        let role = localStorage.getItem('name');
        return (
            <div className='HomeContent_bg'>
                <div className='content'>
                    <Alert style={{display: (this.state.userInfo.company === '暂无' && role === 'Normal') ? 'flex' : 'none'}} className='con_alert' message="您还没有完善个人资料，这将影响您的签约。快去 完善个人资料 吧. " type="info" showIcon closable />
                    <div className='con_info'>
                        <div className='con_left'>
                            <Skeleton loading={loading} active>
                                <div className='con_user'>
                                    <img className='con_user_img' src={userImg} alt='' />
                                    <p className='con_user_grade'>V1</p>
                                    <p className='con_user_name'>{this.state.userInfo.name}</p>
                                </div>
                            </Skeleton>
                            <Skeleton loading={loading} active>
                                <div className='con_model'>
                                    <Menu
                                        onClick={this.handleClick}
                                        mode="inline"
                                        defaultSelectedKeys={[clickActive]}
                                        defaultOpenKeys={[clickPath]}
                                    >   
                                        <SubMenu key="sub1" icon={<MailOutlined />} title="基础认证" style={{display: role === 'Normal' ? 'block' : 'none'}}>
                                            <Menu.Item key="1">个人资料</Menu.Item>
                                            <Menu.Item key="2">打字录音测试</Menu.Item>
                                        </SubMenu>
                                        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="我的培训" style={{display: role === 'Normal' ? 'block' : 'none'}}>
                                            <Menu.Item key="3">基础培训</Menu.Item>
                                            <Menu.Item key="9">外呼上岗</Menu.Item>
                                        </SubMenu>
                                        <SubMenu key="sub3" icon={<UsergroupAddOutlined />} title="员工管理" style={{display: role !== 'Normal' ? 'block' : 'none'}}>
                                            <Menu.Item key="5">在职员工管理</Menu.Item>
                                            <Menu.Item key="6" style={{display: role === 'Comapny' ? 'block' : 'none'}}>申请绑定员工管理</Menu.Item>
                                            <Menu.Item key="7" style={{display: role === 'Comapny' ? 'block' : 'none'}}>注销员工管理</Menu.Item>
                                            <Menu.Item key="8" style={{display: role === 'Comapny' ? 'block' : 'none'}}>排班管理</Menu.Item>
                                            <Menu.Item key="12" style={{display: role !== 'Normal' ? 'block' : 'none'}}>上机账号管理</Menu.Item>
                                        </SubMenu>
                                        <SubMenu key="sub5" icon={<InsertRowRightOutlined />} title={role === 'Admin' ? '公司管理' : '职场管理'} style={{display: (role === 'Comapny' || role === 'Admin') ? 'block' : 'none'}}>
                                            <Menu.Item key="10" style={{display: role === 'Admin' ? 'block' : 'none'}}>公司信息</Menu.Item>
                                            <Menu.Item key="11" style={{display: role === 'Comapny' ? 'block' : 'none'}}>职场信息</Menu.Item>
                                        </SubMenu>
                                        <SubMenu key="sub4" icon={<SettingOutlined />} title="账号安全">
                                            <Menu.Item key="4">修改密码</Menu.Item>
                                        </SubMenu>
                                    </Menu>
                                </div>
                            </Skeleton>
                        </div>

                        <div className='con_right'>
                            {
                                this.showView()
                            }
                        </div>

                    </div>
                </div>

            </div>
        )
    }


}

export default HomeContent