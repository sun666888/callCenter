import React from 'react'
import { Card, Table, Space, Spin, message, Pagination, Form, Input, Modal, Button } from 'antd';
import comApi from './../../../services/home'


const formItemLayout = {
    labelCol: {
        sm: { span: 6 },
    },
};
const { confirm } = Modal;
class Company extends React.Component {
    state = {
        companyTab: [],
        loading: false,
        page: 1,
        limit: 10,
        total: 0,
        name: '',
        isShow: false,
        comName: '',
        modalLoad: false,
        isAddShow:false,
        addForm: {
            name: '',
            account: '',
            password: ''
        }

    }

    componentWillMount() {
        this.getCompanyData()
    }

    getCompanyData = () => {
        this.setState({ loading: true })
        const { page, limit, name } = this.state;
        let d = {
            page,
            limit,
            name,
        }
        comApi.companyList(d).then(res => {
            if (res.code === 0) {
                this.setState({
                    loading: false,
                    companyTab: res.data.list,
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
            this.getCompanyData()
        },100)
    }

    formRef = React.createRef()

    // 修改
    onModify = (record) => {
        this.setState({
            isShow: true,
            modalLoad: true,
            cid: record.id,
            comName: record.name

        })
        comApi.companyDetail(record.id).then(res => {
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
        let { cid, comName } = this.state;
        let d = {
            id: cid,
            name: comName
        }
        comApi.companyModify(d).then(res => {
            if (res.code === 0) {
                message.success('修改成功')
                this.setState({ cid: '', comName: '', isShow: false })
                this.getCompanyData()
            } else {
                message.error(res.msg)
            }
        })
    }

    // 删除
    onDel = (record) => {
        let that = this;
        confirm({
            title: '确定删除该公司账号信息么？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                comApi.companyRemove(record.id).then(res => {
                    if (res.code === 0) {
                        message.success('删除成功')
                        that.getCompanyData()
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
        comApi.companyCreate(addForm).then(res => {
            if (res.code === 0) {
                message.success('添加成功')
                this.setState({
                    isAddShow: false,
                    addForm: {
                        name: '',
                        account: '',
                        password: ''
                    }
                })
                this.getCompanyData()
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
                account: '',
                password: '',
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
        const { loading, isShow, modalLoad, isAddShow, page, limit, total, companyTab, } = this.state;
        return (
            <div>
                <Spin spinning={loading}>
                    <Card title="公司管理" className='company_card'>
                        <Button type='primary' style={{display: 'block',marginBottom: '20px'}} onClick={this.onAddShow}>
                                添加公司
                        </Button>
                        <Table columns={columns} pagination={false} bordered dataSource={companyTab} scroll={{ y: 550 }} />
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
                                label="公司名称"
                                name='name'
                            >
                                <Input placeholder="请输入公司名称" autoComplete='off' onChange={this.bindAddName} />
                            </Form.Item>
                            <Form.Item
                                label="账号"
                                name='account'
                            >
                                <Input placeholder="请输入账号" autoComplete='off' onChange={this.bindAddAccount} />
                            </Form.Item>
                            <Form.Item
                                label="密码"
                                name='password'
                            >
                                <Input placeholder="请输入密码" autoComplete='off' onChange={this.bindAddPass} />
                            </Form.Item>
                        </Form>
                    </Spin>
                </Modal>

                <Modal title="修改" visible={isShow} onOk={this.onBtn} onCancel={this.onHide}>
                    <Spin spinning={modalLoad}>
                        <Form ref={this.formRef}>
                            <Form.Item
                                label="公司名称"
                                name='name'
                            >
                                <Input placeholder="请输入公司名称" autoComplete='off' onChange={this.bindName} />
                            </Form.Item>
                        </Form>
                    </Spin>
                </Modal>



            </div>
        )
    }

    onHide = () => {
        this.setState({
            isShow: false
        })
    }

    bindName = (e) => {
        this.setState({
            comName: e.target.value
        })
    }

    bindAddName = (e) => {
        this.state.addForm.name = e.target.value
    }
    bindAddAccount = (e) => {
        this.state.addForm.account = e.target.value
    }
    bindAddPass = (e) => {
        this.state.addForm.password = e.target.value
    }
}

export default Company