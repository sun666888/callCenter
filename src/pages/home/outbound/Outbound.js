import React from 'react'
import { Card, Button, Modal, Select, message, Form,} from 'antd';
import trainApi from './../../../services/home'


const formItemLayout = {
    labelCol: {
        sm: { span: 4 },
    },
};
const { Option } = Select;
class Outbound extends React.Component {
    state = {
        areaShow: false,
        areaData: [],
        type: ''
    }


    componentWillMount() {
        this.getArea()
    }

    toUrl = () => {
        this.setState({
            areaShow:true
        })
    }

    // 获取外呼系统业务区
    getArea = () => {
        trainApi.accountArea().then(res => {
            if (res.code === 0) {
                this.setState({areaData: res.data})
            } else {
                message.error('业务区获取失败~')
            }
        })
    }

    render() {
        const {areaShow, areaData} = this.state;
        return(
            <div className='out_bg'>
                <Card title="外呼上岗" className='out_card'>
                    <Button type='primary' onClick={this.toUrl}>
                        外呼上岗
                    </Button>
                </Card>
                <Modal title='选择业务区' visible={areaShow} onOk={this.onOk} onCancel={this.onHide}>
                <Form {...formItemLayout}>
                            <Form.Item
                                label="业务区"
                                name='type'
                            >
                                <Select placeholder="--请选择--" onChange={this.onSelect}>
                                    {
                                        areaData.map((item, index) => {
                                            return (
                                                <Option key={index} value={item.type}>{item.type}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Form>
                </Modal>
            </div>
        )
    }
    onSelect = (value) => {
        this.setState({type: value})
    }
    onOk = () => {
        const { type } = this.state;
        if (type === '') {
            message.error('请选择业务区')
        } else {
            trainApi.toHua(type).then(res => {
                if (res.code === 0) {
                    this.setState({
                        areaShow: false
                    })
                    message.success('请求成功,请稍后~')
                } else {
                    message.error(res.msg)
                }
            })
        }
        
    }
    onHide = () => {
        this.setState({
            areaShow: false
        })
    }
}

export default Outbound