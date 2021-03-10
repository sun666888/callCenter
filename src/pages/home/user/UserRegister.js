import React from 'react'
import { Card, Table, Space, Spin, message, Pagination } from 'antd';
import './user.less'
import userApi from './../../../services/home'


class UserRegister extends React.Component {
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
        this.setState({loading: true})
        const {pageIndex, pageSize, company} = this.state;
        let d = {
            pageIndex,
            pageSize,
            company,
        }
        userApi.staffList(d).then(res => {
            if (res.code === 0) {
                this.setState({ 
                    loading: false,
                    userTab: res.data.entities, 
                    total: res.data.total
                })
            } else {
                this.setState({loading: false})
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


    render() {
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                fixed: 'left',
                width: 100,
                align: 'center',
            },
            {
                title: '手机号',
                dataIndex: 'mobile',
                key: 'mobile',
                width: 120,
                align: 'center'
            },
            {
                title: '身份',
                dataIndex: 'identity',
                key: 'identity',
                align: 'center'
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
                width: 200,
                align: 'center'
            },
            {
                title: '邮寄地址',
                dataIndex: 'address',
                key: 'address',
                width: 300,
                align: 'center'
            },
            {
                title: '是否从事过话务',
                dataIndex: 'is_traffic',
                key: 'is_traffic',
                align: 'center'
            },
            {
                title: '期望周工作时间',
                dataIndex: 'week_work',
                key: 'week_work',
                align: 'center'
            },
            {
                title: '最高学历',
                children: [

                    {
                        title: '毕业院校',
                        dataIndex: 'school',
                        key: 'school',
                        width: 200,
                        align: 'center'
                    },
                    {
                        title: '起止时间',
                        dataIndex: 'ed_start_time',
                        key: 'ed_start_time',
                        align: 'center',
                        width: 300,
                        render: (text,record) => {
                            const {ed_start_time, ed_end_time} = record;
                            return (
                                <span>
                                    {ed_start_time} ~ {ed_end_time}
                                </span>
                            )
                        }
                    },
                    {
                        title: '专业',
                        dataIndex: 'major',
                        key: 'major',
                        align: 'center'
                    },
                    {
                        title: '学历',
                        dataIndex: 'education',
                        key: 'education',
                        align: 'center'
                    },
                    {
                        title: '学位',
                        dataIndex: 'academic_degree',
                        key: 'academic_degree',
                        align: 'center'
                    },
                ]
            },
            {
                title: '最近工作',
                children: [
                    {
                        title: '工作单位',
                        dataIndex: 'work',
                        key: 'work',
                        width: 200,
                        align: 'center'
                    },
                    {
                        title: '起止时间',
                        dataIndex: 'wo_start_time',
                        key: 'wo_start_time',
                        align: 'center',
                        width: 300,
                        render: (text,record) => {
                            const {wo_start_time, wo_end_time} = record;
                            return (
                                <span>
                                    {wo_start_time} ~ {wo_end_time}
                                </span>
                            )
                        }
                    },
                    {
                        title: '职务',
                        dataIndex: 'post',
                        key: 'post',
                        align: 'center'
                    },
                    {
                        title: '工作描述',
                        dataIndex: 'describe',
                        key: 'describe',
                        width: 200,
                        align: 'center',
                        ellipsis: true,
                    },
                ]
            },

            {
                title: '公司',
                dataIndex: 'company',
                key: 'company',
                align: 'center',
                fixed: 'right',
            },
            {
                title: '职场',
                dataIndex: 'workplace',
                key: 'workplace',
                align: 'center',
                fixed: 'right',
            },
            // {
            //   title: '操作',
            //   key: 'action',
            //   fixed: 'right',
            //   render: (text, record) => (
            //     <Space size="middle">
            //       <a>Delete</a>
            //     </Space>
            //   ),
            // },
        ];
        const {loading, pageIndex, pageSize, total} = this.state;

        return (
            <div className='register_bg'>
                <Spin spinning={loading}>
                    <Card title="在职员工管理" className='register_card'>
                        <Table columns={columns} pagination={false} bordered dataSource={this.state.userTab} scroll={{ x: 3000, y: 550 }} />
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

export default UserRegister