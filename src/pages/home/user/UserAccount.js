import React from 'react'
import { Card, Table, Space, Spin, message, Modal, Button, Pagination, Badge, Input, Form, Select,} from 'antd';
import userApi from './../../../services/home'

const formItemLayout = {
    labelCol: {
        sm: { span: 4 },
    },
};
const { Option } = Select;
const { confirm } = Modal;
class UserAccount extends React.Component {
    state = {
        loading: false,
        accountTab: [],
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        addForm: {
            type: '',
            account: '',
            password: '',
            url: '',
            id: ''
        },
        isAddShow: false,
        modalLoad: false,
        formTit: '',
        aid: '',    // 编辑id
        staffData: [],
        areaData: [],
        isFenShow: false,
        fenForm: {
            type: '',
            bids: []
        }

    }

    componentWillMount() {
        this.getAccount()
        this.getStaff()
        this.getArea()
    }

    getAccount = () => {
        this.setState({ loading: true })
        const { pageIndex, pageSize } = this.state;
        let d = {
            pageIndex,
            pageSize
        }
        userApi.accountList(d).then(res => {
            if (res.code === 0) {
                this.setState({
                    loading: false,
                    accountTab: res.data.entities,
                    total: res.data.total
                })
            } else {
                this.setState({ loading: false })
                message.error('哎呀~查询失败了，请稍后重试')
            }
        })
    }

    // 获取该公司下的所有在职员工
    getStaff = () => {
        let d = {
            pageIndex: 1,
            pageSize: 1000,
        }
        userApi.staffList(d).then(res => {
            if (res.code === 0) {
                let d = res.data.entities;
                this.setState({staffData: d})
            } else {
                message.error('在职员工获取失败~')
            }
        })
    }

    // 获取外呼系统业务区
    getArea = () => {
        userApi.accountArea().then(res => {
            if (res.code === 0) {
                this.setState({areaData: res.data})
            } else {
                message.error('业务区获取失败~')
            }
        })
    }





    onChange = (page) => {
        this.setState({
            pageIndex: page,
        });
        setTimeout(() => {
            this.getAccount()
        }, 100)

    }

    // form ref
    formRef = React.createRef()

    onEdit = (record) => {
        this.setState({
            isAddShow: true,
            modalLoad: true,
            formTit: '编辑账号'
        })
        this.state.addForm.id = record.id
        userApi.accountDetail(record.id).then(res => {
            if (res.code === 0) {
                this.setState({ addForm: res.data })
                this.formRef.current.setFieldsValue(res.data)
                setTimeout(() => {
                    this.setState({ modalLoad: false })
                }, 500);
            } else {
                message.error(res.msg)
            }
        })
    }


    onAddShow = () => {
        let { addForm } = this.state;
        this.setState({
            isAddShow: true,
            formTit: '添加账号'
        })
        setTimeout(() => {
            this.formRef.current.setFieldsValue(addForm)
        }, 100)

    }
    onAddBtn = () => {
        this.setState({ modalLoad: true })
        let { addForm, formTit } = this.state;
        if (formTit === '添加账号') {
            let d = {
                account: addForm.account,
                password: addForm.password,
                type: addForm.type,
                url: addForm.url
            }
            userApi.accountCreate(d).then(res => {
                if (res.code === 0) {
                    message.success('添加成功')
                    this.setState({
                        isAddShow: false,
                        modalLoad: false,
                        addForm: {
                            type: '',
                            account: '',
                            password: '',
                            url: ''
                        }
                    })
                    this.getAccount()
                } else {
                    message.error(res.msg)
                }
            })
        } else {
            let d = {
                id: addForm.id,
                account: addForm.account,
                password: addForm.password,
                type: addForm.type,
                url: addForm.url
            }
            userApi.accountModify(d).then(res => {
                if (res.code === 0) {
                    message.success('修改成功')
                    this.setState({
                        isAddShow: false,
                        modalLoad: false,
                        addForm: {
                            type: '',
                            account: '',
                            password: '',
                            url: '',
                            id: ''
                        }
                    })
                    this.getAccount()
                } else {
                    message.error(res.msg)
                }
            })
        }

    }

    onAddHide = () => {
        this.setState({
            isAddShow: false,
            addForm: {
                type: '',
                account: '',
                password: '',
                url: ''
            }
        })
    }

    // 删除
    onDel = (record) => {
        let that = this;
        confirm({
            title: '确定删除该账号信息么？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                userApi.accountRemove(record.id).then(res => {
                    if (res.code === 0) {
                        message.success('删除成功')
                        that.getAccount()
                    } else {
                        message.error(res.msg)
                    }
                })
            },
        });
    }

    render() {
        let columns = [
            {
                title: '账号',
                dataIndex: 'account',
                key: 'account',
                fixed: 'left',
                align: 'center'
            },
            {
                title: '密码',
                dataIndex: 'password',
                key: 'password',
                align: 'center'
            },
            {
                title: '登录链接',
                dataIndex: 'url',
                key: 'url',
                align: 'center',
                width: 200
            },
            {
                title: '类型',
                dataIndex: 'type',
                key: 'type',
                align: 'center'
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                align: 'center',
                render: text => {
                    return (
                        <Space size="middle">
                            <Badge status={text === 1 ? 'success' : 'default'} text={text === 1 ? '空闲中' : '已占用'} />
                        </Space>
                    )
                }
            },
            {
                title: '使用者',
                dataIndex: 'username',
                key: 'username',
                align: 'center'
            },
            {
                title: '创建时间',
                dataIndex: 'created_at',
                key: 'created_at',
                align: 'center',
                width: 200
            },
            {
                title: '操作',
                key: 'action',
                fixed: 'right',
                render: (text, record) => (
                    <Space size="middle">
                        <a onClick={() => this.onEdit(record)}>编辑</a>
                        <a onClick={() => this.onDel(record)}>删除</a>
                    </Space>
                ),
            },
        ];
        const { loading, accountTab, pageIndex, pageSize, total, isAddShow, modalLoad, formTit, staffData, areaData, isFenShow } = this.state;
        let role = localStorage.getItem('name');
        if (role === 'Comapny') {
            columns = columns.slice(0,7)
        }

        return (
            <div>
                <Spin spinning={loading}>
                    <Card title="上机账号管理" className='apply_card'>
                        <Button type='primary' style={{ display: role === 'Admin' ? 'block' : 'none', marginBottom: '20px', }} onClick={this.onAddShow}>
                            添加账号
                        </Button>
                        <Button type='primary' style={{ display: role === 'Comapny' ? 'block' : 'none', marginBottom: '20px', }} onClick={this.onFenShow}>
                            批量分配
                        </Button>
                        <Table columns={columns} pagination={false} bordered dataSource={accountTab} scroll={{ y: 500 }} />
                        <Pagination
                            style={{ margin: '20px 0', float: 'right' }}
                            current={pageIndex}
                            pageSize={pageSize}
                            total={total}
                            showTotal={total => `共 ${total} 条`}
                            onChange={this.onChange}
                        />
                    </Card>
                </Spin>
                <Modal title={formTit} visible={isAddShow} onOk={this.onAddBtn} onCancel={this.onAddHide}>
                    <Spin spinning={modalLoad}>
                        <Form ref={this.formRef} {...formItemLayout}>
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
                            <Form.Item
                                label="类型"
                                name='type'
                            >
                                <Input placeholder="请输入账号类型" autoComplete='off' onChange={this.bindAddType} />
                            </Form.Item>
                            <Form.Item
                                label="登录链接"
                                name='url'
                            >
                                <Input placeholder="请输入登录链接" autoComplete='off' onChange={this.bindAddUrl} />
                            </Form.Item>
                        </Form>
                    </Spin>
                </Modal>
                <Modal title='分配账号' visible={isFenShow} onOk={this.onFenBtn} onCancel={this.onFenHide}>
                    <Spin spinning={modalLoad}>
                        <Form ref={this.fenRef} {...formItemLayout}>
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
                            <Form.Item
                                label="分配员工"
                                name='bids'
                            >
                                <Select mode="multiple" placeholder="--请选择--"  onChange={this.onSelectId}>
                                    {
                                        staffData.map((item, index) => {
                                            return (
                                                <Option key={index} value={item.id}>{item.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Form>
                    </Spin>
                </Modal>
            </div>
        )
    }

    bindAddType = (e) => {
        this.state.addForm.type = e.target.value
    }
    bindAddAccount = (e) => {
        this.state.addForm.account = e.target.value
    }
    bindAddPass = (e) => {
        this.state.addForm.password = e.target.value
    }
    bindAddUrl = (e) => {
        this.state.addForm.url = e.target.value
    }

    onSelect = (value) => {
        this.state.fenForm.type = value
    }
    onSelectId = (value) =>{
        this.state.fenForm.bids = value
    }
    
    fenRef = React.createRef()
    // 分配账号
    onFenShow = () => {
        this.setState({
            isFenShow: true
        })
        setTimeout(() => {
            this.fenRef.current.setFieldsValue(this.state.fenForm)
        },100)
        
    }
    onFenBtn = () => {
        this.setState({modalLoad: true})
        const {fenForm} = this.state;
        let d = {
            type: fenForm.type,
            bids: fenForm.bids.join(',')
        }
        userApi.accountFen(d).then(res => {
            if (res.code === 0) {
                message.success('分配成功')
                this.setState({
                    isFenShow: false,
                    modalLoad: false,
                    fenForm: {
                        type: '',
                        bids: []
                    }
                })
                this.getAccount()
            } else {
                this.setState({isFenShow: false,modalLoad: false,})
                message.error('哎呀~分配失败，请稍后重试~')
            }
        })
    }
    onFenHide = () => {
        this.setState({
            isFenShow: false,
            fenForm: {
                type: '',
                bids: []
            }
        })
    }
}

export default UserAccount