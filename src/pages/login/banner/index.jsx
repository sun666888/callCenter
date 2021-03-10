import React, {Component} from 'react';
import './style.less';
import star from './star.png';

export default class index extends Component {
    state = {
        isMount: true,
    };



    render() {
        const {isMount} = this.state;

        return (
            <div className={isMount ? 'root active' : 'root'}>
                <div className="star">
                    <img src={star} alt="星星"/>
                </div>
                <div className="logo">
                    {/* <img src={logo} alt="图标"/> */}
                    <span>易声 呼叫中心众包平台</span>
                </div>
            </div>
        );
    }
}
