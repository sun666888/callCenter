import React from 'react'
import { Card, Table, Space, Spin, message, Pagination, Form, Input, Modal, Button } from 'antd';
import comApi from './../../../services/home'

const formItemLayout = {
    labelCol: {
        sm: { span: 6 },
    },
};
const { confirm } = Modal;
class Workplace extends React.Component {
    state = {
        workplaceTab: [],
        total: 0,
        page: 1,
        limit: 10,
        workName: '',
        isAddShow: false,
        addForm: {
            name: '',
        },
        modalLoad: false

    }

    componentWillMount() {
        this.getWorkplaceData()
    }

    getWorkplaceData = () => {
        this.setState({ loading: true })
        const { page, limit } = this.state;
        let d = {
            page,
            limit,
        }
        comApi.workList(d).then(res => {
            if (res.code === 0) {
                this.setState({
                    loading: false,
                    workplaceTab: res.data.list,
                    total: res.data.count
                })
            } else {
                this.setState({ loading: false })
                message.error(res.msg)
            }
        })
    }

    onChange = (page) => {
        this.setState({
            page: page,
        });
        setTimeout(() => {
            this.getWorkplaceData()
        },100)
    }

    formRef = React.createRef()

    // 修改
    onModify = (record) => {
        this.setState({
            isShow: true,
            modalLoad: true,
            cid: record.id,
            workName: record.name

        })
        comApi.workDetail(record.id).then(res => {
            if (res.code === 0) {
                this.formRef.current.setFieldsValue(res.data)
                setTimeout(() => {
                    this.setState({ modalLoad: false })
                }, 500);
            } else {
                message.error(res.msg)
            }
        })

    }
    onBtn = () => {
        let { cid, workName } = this.state;
        let d = {
            id: cid,
            name: workName
        }
        comApi.workModify(d).then(res => {
            if (res.code === 0) {
                message.success('修改成功')
                this.setState({ cid: '', workName: '', isShow: false })
                this.getWorkplaceData()
            } else {
                message.error(res.msg)
            }
        })
    }

    // 删除
    onDel = (record) => {
        let that = this;
        confirm({
            title: '确定删除该职场信息么？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                comApi.workRemove(record.id).then(res => {
                    if (res.code === 0) {
                        message.success('删除成功')
                        that.getWorkplaceData()
                    } else {
                        message.error(res.msg)
                    }
                })
            },
          });
    }


    addFormRef = React.createRef()

    // 添加
    onAddShow = () => {
        let {addForm} = this.state;
        this.setState({
            isAddShow: true
        })
        setTimeout(() => {
            this.addFormRef.current.setFieldsValue(addForm)
        },100)
        
    }
    onAddBtn = () => {
        let {addForm} = this.state;
        comApi.workCreate(addForm).then(res => {
            if (res.code === 0) {
                message.success('添加成功')
                this.setState({
                    isAddShow: false,
                    addForm: {
                        name: '',
                    }
                })
                this.getWorkplaceData()
            } else {
                message.error(res.msg)
            }
        })
    }


    onAddHide = () => {
        this.setState({
            isAddShow: false,
            addForm: {
                name: '',
            }
        })
    }

    render() {
        const columns = [
            {
                title: '公司名称',
                dataIndex: 'name',
                key: 'name',
                fixed: 'left',
                align: 'center'
            },
            {
                title: '创建时间',
                dataIndex: 'created_at',
                key: 'created_at',
                align: 'center'
            },
            {
                title: '操作',
                key: 'action',
                fixed: 'right',
                render: (text, record) => (
                    <Space size="middle">
                        <a onClick={() => this.onModify(record)}>修改</a>
                        <a onClick={() => this.onDel(record)}>删除</a>
                    </Space>
                ),
            },
        ];
        const { loading, isShow, modalLoad, isAddShow, page, limit, total, workplaceTab, } = this.state;
        return(
            <div>
                <Spin spinning={loading}>
                    <Card title="职场管理" className='Workplace_card'>
                    <Button type='primary' style={{display: 'block',marginBottom: '20px'}} onClick={this.onAddShow}>
                                    添加职场
                            </Button>
                            <Table columns={columns} pagination={false} bordered dataSource={workplaceTab} scroll={{ y: 550 }} />
                            <Pagination
                                style={{ margin: '20px 0', float: 'right' }}
                                current={page}
                                pageSize={limit}
                                total={total}
                                showTotal={total => `共 ${total} 条`}
                                onChange={this.onChange}
                            />
                    </Card>
                </Spin>

                <Modal title="添加" visible={isAddShow} onOk={this.onAddBtn} onCancel={this.onAddHide}>
                    <Spin spinning={modalLoad}>
                        <Form ref={this.addFormRef} {...formItemLayout}>
                            <Form.Item
                                label="职场名称"
                                name='name'
                            >
                                <Input placeholder="请输入职场名称" autoComplete='off' onChange={this.bindAddName} />
                            </Form.Item>
                        </Form>
                    </Spin>
                </Modal>

                <Modal title="修改" visible={isShow} onOk={this.onBtn} onCancel={this.onHide}>
                    <Spin spinning={modalLoad}>
                        <Form ref={this.formRef}>
                            <Form.Item
                                label="职场名称"
                                name='name'
                            >
                                <Input placeholder="请输入职场名称" autoComplete='off' onChange={this.bindName} />
                            </Form.Item>
                        </Form>
                    </Spin>
                </Modal>
            </div>
        )
    }

    onHide = () => {
        this.setState({
            isShow: false,
            workName: ''
        }) 
    }

    bindAddName = (e) => {
        this.state.addForm.name = e.target.value
    }
    bindName = (e) => {
        this.setState({
            workName: e.target.value
        }) 
        
    }
}

export default Workplace