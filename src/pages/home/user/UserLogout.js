import React from 'react'
import { Card, Table, Spin, message, Pagination, Space, Modal } from 'antd';
import './user.less'
import userApi from './../../../services/home'
import homeApi from './../../../services/home';

const { confirm } = Modal;
class UserLogout extends React.Component {
    state = {
        userTab: [],
        loading: false,
        company: '',
        pageIndex: 1,
        pageSize: 10,
        total: 0,
    }

    componentWillMount() {
        this.getUserData()
    }

    getUserData = () => {
        this.setState({ loading: true })
        const {pageIndex, pageSize, company} = this.state;
        let d = {
            pageIndex,
            pageSize,
            company,
        }
        userApi.logoutList(d).then(res => {
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

    onDelete = (record) => {
        let that = this;
        confirm({
            title: '确定同意注销该员工账号么？',
            okText: '同意',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                homeApi.agreeDel(record.id).then(res => {
                    if (res.code === 0) {
                        message.success('操作成功')
                        that.getUserData()
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
                align: 'center'
            },
            {
                title: '公司',
                dataIndex: 'company',
                key: 'company',
                align: 'center'
            },
            {
                title: '职场',
                dataIndex: 'workplace',
                key: 'workplace',
                align: 'center'
            },
            {
                title: '申请注销时间',
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
                        <a onClick={() => this.onDelete(record)}>审批</a>
                    </Space>
                ),
            },
        ];
        const { loading, pageIndex, pageSize, total } = this.state;

        return (
            <div className='logout_bg'>
                <Spin spinning={loading}>
                    <Card title="注销公司员工列表" className='logout_card'>
                        <Table columns={columns} pagination={false} bordered dataSource={this.state.userTab} scroll={{ y: 550 }} />
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
            </div>
        )
    }
}

export default UserLogout