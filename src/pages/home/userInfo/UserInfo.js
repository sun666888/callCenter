import React from 'react'
import { Card, Alert, Form, Input, Radio, Button, DatePicker, Spin, Select, message } from 'antd';
import './userInfo.less'
import { CheckOutlined, } from '@ant-design/icons';
import homeApi from './../../../services/home'

const moment = require('moment');

const { Option } = Select;
const formItemLayout = {
    labelCol: {
        sm: { span: 3 },
    },
};
class UserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            btnLoad: false,
            loading: false,
            userData: {},
            companyList: [],
            workList: [],
            ed_start_time: '',
            ed_end_time: '',
            wo_start_time: '',
            wo_end_time: '',
        }
    }

    componentWillMount() {
        this.getUserInfo()
        this.getCompany()
    }
    // 获取公司信息
    getCompany = () => {
        homeApi.userCompany().then(res => {
            if (res.code === 0) {
                this.setState({
                    companyList: res.data,
                })
            } else {
                message.error('公司信息获取失败')
            }
        })
    }
    // 获取职场信息
    getWorkplace = (id) => {
        homeApi.userWork(id).then(res => {
            if (res.code === 0) {
                this.setState({
                    workList: res.data,
                })
            } else {
                message.error(res.msg)
            }
        })
    }

    formRef = React.createRef()

    // 初始获取用户信息
    getUserInfo() {
        const id = localStorage.getItem('infoId')
        this.setState({ loading: true })
        homeApi.userInfoDetail(id).then(res => {
            if (res.code === 0) {
                let userData = res.data;
                userData.mobile = userData.mobile.substr(0, 3) + "****" + userData.mobile.substr(7);
                this.formRef.current.setFieldsValue(res.data)  // 初始化form赋值
                this.setState({
                    userData,
                    ed_start_time: userData.ed_start_time,
                    ed_end_time: userData.ed_end_time,
                    wo_start_time: userData.wo_start_time,
                    wo_end_time: userData.wo_end_time,
                })
                setTimeout(() => {
                    this.setState({ loading: false })
                }, 1000);
            } else {
                this.setState({ loading: false })
                message.error('获取失败')
            }
        }).catch(err => {
            this.setState({ loading: false })
            message.error('获取失败')
        })
    }

    timeChange = (time, name) => {
        let key = name;
        this.state[key] = moment(time).format('YYYY-MM-DD')
    }


    render() {
        const { loading, userData, companyList, workList } = this.state;

        return (
            <div className='userInfo_bg'>
                <Spin spinning={loading}>
                    <Card title="基本资料" className='info_card'>
                        <Alert message="温馨提示：平台注册会员需年满16周岁。 " type="warning" showIcon closable icon='' />
                        <div className='info_form'>
                            <Form ref={this.formRef} {...formItemLayout} onFinish={this.onSubmit}>
                                <Form.Item
                                    label="昵称"
                                    name='name'
                                    rules={[{ required: true, message: '请输入您的昵称' }]}
                                >
                                    <Input placeholder="请输入2-25个字符" autoComplete='off' />
                                </Form.Item>
                                <Form.Item
                                    label="手机号码"
                                    name='mobile'
                                    required
                                >
                                    <Input placeholder="请输入手机号码" bordered={false} autoComplete='off' readOnly />
                                </Form.Item>
                                <Form.Item name="identity" label="身份选择" rules={[{ required: true, message: '请选择您的身份' }]}>
                                    <Radio.Group>
                                        <Radio value="公司白领">公司白领</Radio>
                                        <Radio value="在校学生">在校学生</Radio>
                                        <Radio value="下岗人士">下岗人士</Radio>
                                        <Radio value="家庭主妇">家庭主妇</Radio>
                                        <Radio value="残疾人">残疾人</Radio>
                                        <Radio value="其他">其他</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    label="邮寄地址"
                                    name='address'
                                    rules={[{ required: true, message: '请输入您的邮寄地址' }]}
                                >
                                    <Input placeholder="请输入邮寄地址" autoComplete='off' />
                                </Form.Item>
                                <Form.Item name="is_traffic" label="是否从事过话务" rules={[{ required: true, message: '请选择您是否从事过话务' }]}>
                                    <Radio.Group>
                                        <Radio value="是">是</Radio>
                                        <Radio value="否">否</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    name="week_work"
                                    label="期望周工作时间"
                                >
                                    <Select placeholder="--请选择--">
                                        <Option value="5小时以下">5小时以下</Option>
                                        <Option value="5~10小时">5~10小时</Option>
                                        <Option value="10~20小时">10~20小时</Option>
                                        <Option value="20~30小时">20~30小时</Option>
                                        <Option value="30~40小时">30~40小时</Option>
                                        <Option value="40小时以上">40小时以上</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="电子邮箱"
                                    name='email'
                                >
                                    <Input placeholder="请输入电子邮箱" autoComplete='off' />
                                </Form.Item>
                                <Card title="最高学历" bordered={false}>
                                    <Form.Item label="时间" style={{ marginBottom: 0, marginTop: 10 }} required>
                                        <Form.Item
                                            style={{ display: 'inline-block', }}
                                            rules={[{ required: true, message: '请选择时间' }]}
                                        >
                                            <DatePicker format='YYYY-MM-DD' onChange={date => this.timeChange(date, 'ed_start_time')} />
                                        </Form.Item>
                                        <span
                                            style={{ display: 'inline-block', width: '24px', lineHeight: '32px', textAlign: 'center' }}
                                        >-</span>
                                        <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} rules={[{ required: true, message: '请选择时间' }]}>
                                            <DatePicker format='YYYY-MM-DD' onChange={date => this.timeChange(date, 'ed_end_time')} />
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item
                                        label="毕业院校"
                                        name='school'
                                        rules={[{ required: true, message: '请填写毕业院校' }]}
                                    >
                                        <Input placeholder="请填写毕业院校" autoComplete='off' />
                                    </Form.Item>
                                    <Form.Item
                                        name="education"
                                        label="学历"
                                        rules={[{ required: true, message: '请选择学历' }]}
                                    >
                                        <Select placeholder="--请选择--">
                                            <Option value="初中">初中</Option>
                                            <Option value="高中/中专">高中/中专</Option>
                                            <Option value="专科">专科</Option>
                                            <Option value="本科">本科</Option>
                                            <Option value="硕士">硕士</Option>
                                            <Option value="博士">博士</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label="专业"
                                        name='major'
                                    >
                                        <Input placeholder="请填写专业" autoComplete='off' />
                                    </Form.Item>
                                    <Form.Item
                                        name="academic_degree"
                                        label="学位"
                                    >
                                        <Select placeholder="--请选择--">
                                            <Option value="学士">学士</Option>
                                            <Option value="硕士">硕士</Option>
                                            <Option value="博士">博士</Option>
                                        </Select>
                                    </Form.Item>

                                </Card>
                                <Card title="工作经历" bordered={false}>
                                    <Alert message="丰富的工作经历能帮你取得更多的信任以及更多的工作机会。" type="info" />
                                    <Form.Item label="时间" style={{ marginBottom: 0, marginTop: 10 }} required>
                                        <Form.Item
                                            style={{ display: 'inline-block', }}
                                            rules={[{ required: true, message: '请选择时间' }]}
                                        >
                                            <DatePicker format='YYYY-MM-DD' onChange={date => this.timeChange(date, 'wo_start_time')} />
                                        </Form.Item>
                                        <span
                                            style={{ display: 'inline-block', width: '24px', lineHeight: '32px', textAlign: 'center' }}
                                        >-</span>
                                        <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} rules={[{ required: true, message: '请选择时间' }]}>
                                            <DatePicker format='YYYY-MM-DD' onChange={date => this.timeChange(date, 'wo_end_time')} />
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item
                                        label="工作单位"
                                        name='work'
                                        rules={[{ required: true, message: '请填写工作单位' }]}
                                    >
                                        <Input placeholder="请填写工作单位" autoComplete='off' />
                                    </Form.Item>
                                    <Form.Item
                                        label="职务"
                                        name='post'
                                        rules={[{ required: true, message: '请填写职务' }]}
                                    >
                                        <Input placeholder="请填写职务" autoComplete='off' />
                                    </Form.Item>
                                    <Form.Item
                                        label="工作描述"
                                        name='describe'
                                        rules={[{ required: true, message: '请填写工作描述' }]}
                                    >
                                        <Input placeholder="请填写工作描述" autoComplete='off' />
                                    </Form.Item>

                                </Card>
                                <Card title="申请加入公司" bordered={false}>
                                    <Form.Item
                                        label="公司"
                                        name='company'
                                        rules={[{ required: true, message: '请填写公司' }]}
                                    >
                                        <Select placeholder="--请选择--" onChange={this.onSelect}>
                                            {
                                                companyList.map((item, index) => {
                                                    return (
                                                        <Option key={index} value={item.id}>{item.name}</Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label="职场"
                                        name='workplace'
                                        rules={[{ required: true, message: '请填写职场' }]}
                                    >   
                                        <Select placeholder="--请选择--">
                                            {
                                                workList.map((item, index) => {
                                                    return (
                                                        <Option key={index} value={item.id}>{item.name}</Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                </Card>
                                <Button style={{ display: 'block', width: '20%', margin: '20px auto 0 auto' }} type='primary' loading={this.state.btnLoad} htmlType="submit" icon={<CheckOutlined />}>
                                    提交信息
                            </Button>
                            </Form>
                        </div>
                    </Card>
                </Spin>
            </div>
        )
    }

    onSubmit = (value) => {
        value.id = this.state.userData.id
        value.mobile = this.props.mobile
        value.ed_start_time = this.state.ed_start_time
        value.ed_end_time = this.state.ed_end_time
        value.wo_start_time = this.state.wo_start_time
        value.wo_end_time = this.state.wo_end_time
        this.setState({ btnLoad: true })
        homeApi.modifyInfo(value).then(
            res => {
                if (res.code === 0) {
                    this.setState({ btnLoad: false })
                    this.getUserInfo()
                    message.success('吼~资料上传成功，等待审批中~')
                } else {
                    this.setState({ btnLoad: false })
                    message.error('哎呀~更新失败了')
                }
            }
        )

    }

    onSelect = (value) => {
        console.log(value)
        this.getWorkplace(value)
    }
}

export default UserInfo