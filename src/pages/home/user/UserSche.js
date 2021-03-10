import React from 'react'
import { Card, message, Table, Spin, Space, Modal, Transfer, } from 'antd';
import './user.less'
import userApi from './../../../services/home'

class UserSche extends React.Component {
    state = {
        schTab: [],
        loading: false,
        schUser: [],
        isShow: false,
        targetKeys: [],
        modLoad: false,
        saveForm: {
            worktime: '',
            uidstr: '',
        }

    }
    componentWillMount() {
        this.getSchList()
        this.getSchUser()

    }

    // 获取该公司该周的排班列表
    getSchList = () => {
        this.setState({ loading: true })
        userApi.schList().then(res => {
            if (res.code === 0) {
                this.setState({
                    schTab: res.data,
                    loading: false
                })
            } else {
                this.setState({ loading: false })
                message.error(res.msg)
            }
        })
    }

    // 获取该公司旗下的员工
    getSchUser = () => {
        let d = {
            pageIndex: 1,
            pageSize: 1000,
        }
        userApi.staffList(d).then(res => {
            if (res.code === 0) {
                let d = res.data.entities;
                const mockData = [];
                for (let i = 0; i < d.length; i++) {
                    const data = {
                      key: d[i].uid,
                      title: d[i].name,
                      description: `description of content${i + 1}`,
                    };
                    mockData.push(data);
                }
                this.setState({ schUser: mockData });
            }
        })
    }

    onSch = (record) => {
        this.state.saveForm.worktime = record.curDate
        this.setState({
            modLoad: true,
            isShow: true,
        })
        userApi.schDetail(record.curDate).then(res => {
            if (res.code === 0) {
                let d = res.data;
                const targetKeys = [];
                for (let i = 0; i < d.length; i++) {
                    // console.log(d[i])
                    const data = {
                      key: d[i].uid,
                      title: d[i].userData.username,
                      description: `description of content${i + 1}`,
                    };
                    // console.log(data)
                    targetKeys.push(data.key);
                }
                this.setState({ 
                    targetKeys,
                    modLoad: false
                 });
            } else {
                message.error('信息获取失败')
                this.setState({modLoad: false})
            }
        })
    }

    filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;

    handleChange = targetKeys => {
        // console.log(targetKeys)
        this.setState({ targetKeys });
    };

    handleSearch = (dir, value) => {
        // console.log('search:', dir, value);
    };

    render() {
        const columns = [
            {
                title: '日期',
                dataIndex: 'week',
                key: 'week',
                align: 'center'
            },
            {
                title: '人数',
                dataIndex: 'count',
                key: 'count',
                align: 'center'
            },
            {
                title: '操作',
                key: 'action',
                fixed: 'right',
                render: (text, record) => (
                    <Space size="middle">
                        <a onClick={() => this.onSch(record)}>排班</a>
                    </Space>
                ),
            },
        ];
        const { loading, schTab, isShow, modLoad } = this.state;

        return (
            <div className='sche_bg'>
                <Spin spinning={loading}>
                    <Card title="排班管理" className='sche_card'>
                        <Table columns={columns} pagination={false} bordered dataSource={schTab} />
                    </Card>
                </Spin>
                <Modal title="排班" visible={isShow} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <Spin spinning={modLoad}>
                    <Transfer
                        titles={['未选', '已选']}
                        dataSource={this.state.schUser}
                        filterOption={this.filterOption}
                        targetKeys={this.state.targetKeys}
                        onChange={this.handleChange}
                        onSearch={this.handleSearch}
                        render={item => item.title}
                    />
                    </Spin>
                </Modal>

            </div>
        )

    }
    handleOk = () => {
        this.setState({modLoad: true})
        let { saveForm, targetKeys } = this.state;
        saveForm.uidstr = targetKeys.join(',')
        userApi.schSave(saveForm).then(res => {
            if (res.code === 0) {
                message.success('操作成功~')
                this.setState({
                    isShow: false,
                    modLoad: false,
                    saveForm: {
                        worktime: '',
                        uidstr: '',
                    }
                })
                this.getSchList()
            } else {
                message.error(res.msg)
                this.setState({modLoad: false})
            }
        })
    }

    handleCancel = () => {
        this.setState({
            isShow: false,
            saveForm: {
                worktime: '',
                uidstr: '',
            }
        })
    }
}

export default UserSche