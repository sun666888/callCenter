import React from 'react'
import { Card, Button, message } from 'antd';
import trainApi from './../../../services/home'

class Train extends React.Component {

    // 免登录跳转至培训系统
    toTrain = () => {
        trainApi.trainToken().then(res => {
            if (res.code === 0) {
                let url = "u=" + res.data.username + "&p=" + res.data.password;
                let url1 = escape(encodeURI(url))
                window.open("http://47.100.41.95:811/train/index.html#/pages/login?" + url1);
            } else {
                message.error(res.msg)
            }
        })
    }

    render() {
        return(
            <div className='train_bg'>
                <Card title="基础培训" className='train_card'>
                    <Button type='primary' onClick={this.toTrain}>
                        申请认证
                    </Button>
                </Card>
            </div>
        )
    }
}

export default Train