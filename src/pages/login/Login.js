import React from 'react'
import './login.css'
import { Layout } from 'antd';
const { Header,} = Layout;



class Login extends React.Component {
    render() {
        return(
            <div className='login_bg'>
                <Layout>
                    <Header className='header'>
                        
                    </Header>
                </Layout>
            </div>
        )
    }
}

export default Login
