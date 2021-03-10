import React from 'react'
import { Card, Alert, Form, Input, Button, message } from 'antd';
import './changePassword.less'
import { CheckOutlined } from '@ant-design/icons';
import loginApi from './../../../services/login'

const formItemLayout = {
    labelCol: {
        sm: { span: 3 },
    },
};
class ChangePassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        }
    }
    
    render() {
        const { loading } = this.state;
        return (
            <div className='changePassword_bg'>
                <Card title="修改密码" className='pass_card'>
                    <Alert className='pass_alert' message="安全提醒：请妥善保管好您的密码！中移在线不会以任何理由向您索取或者泄露您的密码。" type="warning" showIcon closable />
                    <Form {...formItemLayout} onFinish={this.onSubmit}>
                        <Form.Item
                            label="原密码"
                            name='password'
                            rules={[{ required: true, message: '请输入您的当前密码' }]}
                        >
                            <Input.Password placeholder="请输入您的当前密码" autoComplete='off' />
                        </Form.Item>
                        <Form.Item
                            label="新密码"
                            name='newPassword'
                            rules={[{ required: true, message: '请输入您的新密码' }]}
                        >
                            <Input.Password placeholder="请输入您的新密码" autoComplete='off' />
                        </Form.Item>
                        <Form.Item
                            label="重复新密码"
                            name='rePassword'
                            rules={[{ required: true, message: '请再次输入您的新密码' }]}
                        >
                            <Input.Password placeholder="请再次输入您的新密码" autoComplete='off' />
                        </Form.Item>
                        <Button style={{display: 'block',width: '20%',margin: '20px auto 0 auto'}} type='primary' htmlType="submit" loading={loading} icon={<CheckOutlined />}>
                            提交
                        </Button>
                    </Form>
                </Card>
            </div>
        )
    }

    onSubmit = (value) => {
        this.setState({loading: true})
        loginApi.modifyPasswd(value).then(
            res => {
                if (res.code === 0) {
                    message.success('修改成功，请重新登录')
                    this.props.history.push('/login')
                    this.setState({loading: false})
                } else {
                    this.setState({loading: false})
                    message.error(res.msg)
                }
            }
        )
    }
}

export default ChangePassword