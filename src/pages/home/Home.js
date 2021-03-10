import React from 'react'
import { Helmet } from 'react-helmet';
import HomeHeader from './header/HomeHeader'
import HomeContent from './content/HomeContent'
import './home.less'

class Home extends React.Component {
    state = {
        
    }
    
    render() {

        return(
            <div className='home_bg'>
                <Helmet title="易声呼叫中心-平台首页" />
                <HomeHeader history={this.props.history}/>
                <HomeContent />
            </div>
        )
    }

}

export default Home

