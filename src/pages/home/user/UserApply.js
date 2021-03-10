import React from 'react'
import { Card, Table, Space, Spin, message, Modal,  Descriptions, Pagination} from 'antd';
import './user.less'
import userApi from './../../../services/home'

class UserApply extends React.Component {
    state = {
        userTab: [],
        loading: false,
        company: '',
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        isShow: false,
        userInfo: {},
        isLoad: false,
    }

    componentWillMount() {
        this.getUserData()
    }

    showModal = (data) => {
        this.setState({
            isShow: true,
            isLoad: true,
        });
        userApi.applyDetail(data.id).then(res => {
            if (res.code === 0) {
                this.setState({
                    isLoad: false,
                    userInfo: res.data
                })
            } else {
                message.error('哎呀~查询失败了，请稍后再试哦')
            }
        })
    };

    hideModal = () => {
        this.setState({
            isShow: false,
        });
    };

    getUserData = () => {
        this.setState({ loading: true })
        const {pageIndex, pageSize, company} = this.state;
        let d = {
            pageIndex,
            pageSize,
            company,
        }
        userApi.applyList(d).then(res => {
            if (res.code === 0) {
                this.setState({
                    loading: false,
                    userTab: res.data.entities,
                    total: res.data.total
                })
            } else {
                this.setState({ loading: false })
                message.error(res.msg)
            }
        })
    }

    onChange = (page) => {
        this.setState({
            pageIndex: page,
        });
        setTimeout(() => {
            this.getUserData()
        },100)
    }

    // 审核
    examine = (record) => {
        Modal.confirm({
            title: '申请审核',
            content: '是否同意该员工的申请？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                userApi.applyExamine(record.id).then(res => {
                    if (res.code === 0) {
                        message.success('设置成功')
                        this.getUserData()
                    } else {
                        message.error(res.msg)
                    }
                })
            },

        });
    }


    render() {
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                fixed: 'left',
                width: 100,
                align: 'center'
            },
            {
                title: '手机号',
                dataIndex: 'mobile',
                key: 'mobile',
                width: 120,
                align: 'center'
            },

            {
                title: '申请公司',
                dataIndex: 'company',
                key: 'company',
                width: 200,
                align: 'center'
            },
            {
                title: '申请职场',
                dataIndex: 'workplace',
                key: 'workplace',
                align: 'center'
            },
            {
                title: '申请时间',
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
                        <a onClick={() => this.showModal(record)}>查看资料</a>
                        <a onClick={() => this.examine(record)}>审核</a>
                    </Space>
                ),
            },
        ];
        const { loading, isLoad, userInfo, pageIndex, pageSize, total, userTab} = this.state;
        

        return (
            <div className='apply_bg'>
                <Spin spinning={loading}>
                    <Card title="申请绑定公司员工列表" className='apply_card'>
                        <Table columns={columns} pagination={false} bordered dataSource={userTab} scroll={{ y: 550 }} />
                        <Pagination
                            style={{margin: '20px 0',float: 'right'}}
                            current={pageIndex}
                            pageSize={pageSize}
                            total={total}
                            showTotal={total => `共 ${total} 条`}
                            onChange={this.onChange}
                        />
                    </Card>
                </Spin>
                <Modal
                    title="员工信息"
                    width='60%'
                    visible={this.state.isShow}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <Spin spinning={isLoad}>
                        <Descriptions title={userInfo.name} layout="vertical" bordered>
                            <Descriptions.Item label='手机号'>
                                <span style={{ color: userInfo.mobile ? '#1790ff' : '#ccc' }}>{userInfo.mobile ? userInfo.mobile : '暂无'}</span>
                            </Descriptions.Item>
                            <Descriptions.Item label='身份'>
                                <span style={{ color: userInfo.identity ? '#1790ff' : '#ccc' }}> {userInfo.identity ? userInfo.identity : '暂无'}</span>
                            </Descriptions.Item>
                            <Descriptions.Item label='邮箱'>
                                <span style={{ color: userInfo.email ? '#1790ff' : '#ccc' }} > {userInfo.email ? userInfo.email : '暂无'}</span>
                            </Descriptions.Item>
                            <Descriptions.Item label='邮寄地址'>
                                <span style={{ color: userInfo.address ? '#1790ff' : '#ccc' }}> {userInfo.address ? userInfo.identity : '暂无'}</span>
                            </Descriptions.Item>
                            <Descriptions.Item label='是否从事过话务'>
                                <span style={{ color: userInfo.is_traffic ? '#1790ff' : '#ccc' }}> {userInfo.is_traffic ? userInfo.is_traffic : '暂无'}</span>
                            </Descriptions.Item>
                            <Descriptions.Item label='期望周工作时间'>
                                <span style={{ color: userInfo.week_work ? '#1790ff' : '#ccc' }} >{userInfo.week_work ? userInfo.week_work : '暂无'}</span>
                            </Descriptions.Item>
                            <Descriptions.Item label='毕业院校'>
                                <span style={{ color: userInfo.school ? '#1790ff' : '#ccc' }}>{userInfo.school ? userInfo.school : '暂无'}</span>
                            </Descriptions.Item>
                            <Descriptions.Item label='起止时间'>
                                <span style={{color: '#1790ff'}}> {userInfo.ed_start_time} ~ {userInfo.ed_start_time}</span>
                            </Descriptions.Item>
                            <Descriptions.Item label='专业'>
                                <span style={{ color: userInfo.major ? '#1790ff' : '#ccc' }}>{userInfo.major ? userInfo.major : '暂无'}</span>
                            </Descriptions.Item>
                            <Descriptions.Item label='学历'>
                                <span style={{ color: userInfo.education ? '#1790ff' : '#ccc' }}>{userInfo.education ? userInfo.education : '暂无'}</span>
                            </Descriptions.Item>
                            <Descriptions.Item label='学位'>
                                <span style={{ color: userInfo.academic_degree ? '#1790ff' : '#ccc' }}>{userInfo.academic_degree ? userInfo.academic_degree : '暂无'}</span>
                            </Descriptions.Item>
                            <Descriptions.Item label='工作单位'>
                                <span style={{ color: userInfo.work ? '#1790ff' : '#ccc' }} >{userInfo.work ? userInfo.work : '暂无'}</span>
                            </Descriptions.Item>
                            <Descriptions.Item label='起止时间'>
                                <span style={{color: '#1790ff'}}>{userInfo.wo_start_time} ~ {userInfo.wo_end_time}</span>
                            </Descriptions.Item>
                            <Descriptions.Item label='职务'>
                                <span style={{ color: userInfo.post ? '#1790ff' : '#ccc' }}>{userInfo.post ? userInfo.post : '暂无'}</span>
                            </Descriptions.Item>
                            <Descriptions.Item label='工作描述'>
                                <span style={{ color: userInfo.describe ? '#1790ff' : '#ccc' }}>{userInfo.describe ? userInfo.describe : '暂无'}</span>
                            </Descriptions.Item>
                        </Descriptions>
                    </Spin>
                </Modal>
            </div>
        )
    }
}

export default UserApply