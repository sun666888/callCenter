import React from 'react'
import { Card, Empty, Skeleton, Row, Col, } from 'antd';
import './homeInfo.less'
import medalImg from'./zhang.png'

class HomeInfo extends React.Component {

    render() {
        const { loading, userInfo, mobile} = this.props;
        let skillCol = {
            cursor: 'pointer',
            background: '#e6f7ff',
            borderRadius: '5px',
            padding: '10px'
        }
        return (
            <div className='home_info'>
                <Skeleton loading={loading} active>
                    <div className='user_info'>
                        <p>公司：{userInfo.company}</p>
                        <p>职场：{userInfo.workplace}</p>
                        <p>电话：{mobile}</p>
                        <p>邮箱：{userInfo.email}</p>
                    </div>
                </Skeleton>
                <Skeleton loading={loading} active>
                    <Card title="我的技能" className='skill_card'>
                        {
                            typeof userInfo.work_license === 'string' ?
                                (
                                    <Empty className='skill_p' description='对不起，暂时没有数据' />
                                ) :
                                (
                                    <Row className='skill_row'>
                                        {
                                            userInfo.work_license.map((item, index) => {
                                                return (
                                                    <Col span={3} key={index} offset={1} style={skillCol}>
                                                        <img className='skill_img' src={medalImg} alt='' />
                                                        <div className='skill_text'>{item.area}</div>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                )
                        }
                    </Card>
                </Skeleton>
            </div>
        )
    }
}

export default HomeInfo