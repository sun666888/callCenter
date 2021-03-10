import React from 'react'
import { Card, Button, message, Modal, Tooltip, Form, Input, Alert, } from 'antd';
import './test.less'
import { PauseOutlined, AudioOutlined, CaretRightOutlined } from '@ant-design/icons';
import testApi from './../../../services/home'
import Recorder from 'js-audio-recorder';

let recorder = new Recorder();


const { TextArea } = Input;
class Test extends React.Component {
    state = {
        recordShow: false,
        record_text: '您说的这种情况我们也很理解，但是咱们这张腾讯王卡相对其他产品，包括您在用的产品，它的性价比是最高的。第一呢，资费低，每月49元，第一年还每月赠送10元话费，相当于39元每月；第二呢，您激活当月正常充值话费，一次性金额在50元及以上，多享受100分钟的免费通话，还有1年价值240元的腾讯VIP会员使用；第三呢，更是有超多流量让您使用。腾讯类多达100款APP都是免流的，非腾讯使用流量也不用担心，每月20G全国通用流量，不用超也不会额外扣费，即使用超了，也有1天1元800M的日租宝可以使用。我这边帮您登记，免费给您配送下您先用用看的好吧~',
        type_text: '上海市杨浦区包头路市光四村208号301上海市浦东新区高桥镇江东路1217栋8号401上海市宝山区兰岗路679号12月初电话联系配送上海市宝山区南蕰藻路108号上海市闵行区纪王镇赵家村西马40号103上海市青浦区天仙路1号101上海市奉贤区奉城镇建南新区19号302上海市浦东新区祝桥镇竹西村1713号上海市奉贤区泰日镇正泰路45号上海市嘉定区海波路118弄59号1402上海市浦东新区光泽路429弄15号502上海市松江区洞泾镇沪松公路铂金公馆1栋404上海市崇明区港沿镇鲁东区630号上海市奉贤区钱桥镇南星村周路704号上海市松江区久富路650号上海市浦东新区上南路6733弄46号502上海市宝山区美丹路1033弄12号2402室上海市浦东新区沪南路2000号上海市浦东新区新场镇石笋一村3号404室上海市金山区亭林镇六塔村1053室上海市宝山区庙行镇自立产业园3号楼北楼3层典范公司',
        recordState: '',
        record_file: null,
        textShow: false,
        isStart: false,
        timer: null,
        text_timer: '00:00',
        textTimer: 1,
        textStr: '',
        btnLoading: false,
        rateData: {
            recording_accuracy: '',
            accuracy: '',
            speed: ''
        }

    }
    componentWillMount() {
        document.oncontextmenu = function () { return false; };
        // 禁止文字选择
        document.onselectstart = function () { return false; };
        // 禁止复制
        document.oncopy = function () { return false; };
        // 禁止剪切
        document.oncut = function () { return false; };
        // 禁止粘贴
        document.onpaste = function () { return false; };

        this.getUserInfo()
    }

    // 获取用户简介
    getUserInfo() {
        testApi.userInfo().then(
            res => {
                this.setState({
                    rateData: {
                        recording_accuracy: res.data.recording_accuracy,
                        accuracy: res.data.accuracy,
                        speed: res.data.speed
                    }
                })

            }
        )
    }


    record = () => {
        this.setState({ recordShow: true })
        if (navigator.mediaDevices.getUserMedia) {
            const constraints = { audio: true };
            navigator.mediaDevices.getUserMedia(constraints).then(
                stream => {
                    // message.success("授权成功！");
                },
                () => {
                    message.error("授权失败！");
                }
            );
        } else {
            message.error("浏览器不支持 getUserMedia");

        }
    }

    btn = () => {
        this.setState({ btnLoading: true })   // recordShow: false,
        setTimeout(() => {
            // 上传录音
            const { record_file } = this.state;
            let fd = new FormData();
            fd.append("audio", record_file);
            testApi.uploadFile(fd).then(res => {
                if (res.code === 0) {
                    testApi.recordRate(res.data.taskid).then(res=> {
                        if (res.code === 0) {
                            message.success('上传成功~')
                            this.setState({ 
                                btnLoading: false,
                                recordShow: false,
                            })
                            
                        } else {
                            this.setState({ btnLoading: false})
                            message.error('识别失败~')
                        }
                    })
                    
                } else {
                    this.setState({ btnLoading: false})
                    message.error('上传失败~请稍后重试')
                }
            })

        }, 100)
    }

    // 开始录音
    start = () => {
        const {recordState} = this.state;
        if (recordState === 'recording') {
            console.log('结束录音')
            this.setState({ recordState: 'stop' })
            recorder.stop();
            console.log(recorder.duration);
            let url = recorder.getWAVBlob();
            let files = new window.File([url], 'demo.wav', { type: "audio/wav" })
            this.setState({
                record_file: files
            })
            
        } else {
            recorder.start().then(() => {
                // 开始录音
                this.setState({ recordState: 'recording' })
                console.log('开始录音')
            });
        }
        
    }
    // 播放录音
    onPlay = () => {
        recorder.play();
    }

    onCancel = () => {
        this.setState({
            recordShow: false,
            record_file: null
        })

    }

    


    render() {
        let recordStyle = {
            display: 'flex',
            width: '50%',
            margin: '10px auto',
            justifyContent: 'center',
            alignItems: 'center'
        }
        let { recordState,  isStart, text_timer, btnLoading, rateData } = this.state;
        let recordIcon = null,
            recordTit = '点击开始录音',
            recordType = false;
        if (recordState === 'recording') {
            recordIcon = <PauseOutlined />
            recordTit = '点击结束录音'
            recordType = true
        } else {
            recordIcon = <AudioOutlined />
            recordType = false
            recordTit = '点击开始录音'
        }

        const props = {
            name: 'file',
            beforeUpload: file => {
                let fd = new FormData();
                fd.append("audio", file);
                testApi.uploadFile(fd).then(res => {
                    if (res.code === 0) {
                        this.setState({ btnLoading: false })
                    } else {
                        this.setState({ btnLoading: false })
                    }
                })
            },
          };

        return (

            <div className='homeTest_bg'>
                <Card title="打字录音测试" className='test_card'>
                    <strong className='test_tit'>下面为一段录音测试模板，点击开始进行录音测试</strong>
                    <p className='test_con' style={{ userSelect: 'none' }}>
                        {this.state.record_text}
                    </p>
                    <Button type='primary' onClick={this.record}>
                        开始测试
                    </Button>
                    <span style={{display: rateData.recording_accuracy === '' ? 'none' : 'inline-block',marginLeft: '20px'}}>准确率：{rateData.recording_accuracy}</span>
                    <strong className='test_tit test_mar'>下面为一段打字测试模板，点击开始进行打字测试</strong>
                    <p className='test_con' style={{ userSelect: 'none' }}>
                        {this.state.type_text}
                    </p>
                    <Button type='primary' onClick={this.text}>
                        开始测试
                    </Button>
                    <span style={{display: rateData.accuracy === '' ? 'none' : 'inline-block',marginLeft: '20px'}}>准确率：{rateData.accuracy}&nbsp;&nbsp;&nbsp;&nbsp; 速度：{rateData.speed}</span>
                </Card>

                <Modal
                    title="录音测试"
                    width='50%'
                    visible={this.state.recordShow}
                    onOk={this.btn}
                    onCancel={this.onCancel}
                    confirmLoading={btnLoading}
                    okText="上传录音"
                    cancelText="取消"
                >
                    <p>{this.state.record_text}</p>
                    <Alert message="点击开始录音，请将上段文字完整流利读完，读完之后点击结束录音。结束后可以听取刚才的录音，若觉得不太满意可点击开始重新录音。最后点击上传录音。" style={{ margin: '10px 0' }} type="warning" />
                    <div className='record_con' style={recordStyle}>
                        <Tooltip title={recordTit}>
                            <Button type='primary' danger={recordType} shape="circle" size='large' icon={recordIcon} onClick={this.start} />
                        </Tooltip>
                        <Tooltip title='播放录音'>
                            <Button style={{display: recordState === 'stop' ? 'inline-block' : 'none',marginLeft: '20px'}} type='primary' shape="circle" size='large' icon={<CaretRightOutlined />} onClick={this.onPlay} />
                        </Tooltip>
                    </div>

                </Modal>
                <Modal
                    title="打字测试"
                    width='50%'
                    visible={this.state.textShow}
                    onCancel={this.onTextCancel}
                    okText="确定"
                    cancelText="取消"
                    footer={null}
                >
                    <p style={{ userSelect: 'none', lineHeight: '2' }}>{this.state.type_text}</p>
                    <Alert message="点击开始请在下面文本域中输入上面这段文字，输入完毕点击结束按钮将停止计时并上传成绩" style={{ margin: '10px 0' }} type="warning" />
                    <div className='record_con' style={{ margin: '20px 0', }}>
                        <Form
                            ref={this.clearRef}
                        >   
                            <Form.Item
                                name='textStr'
                            >
                                <TextArea  rows={6} readOnly={isStart ? false : true} onInput={this.onTextArea} />
                            </Form.Item>
                            
                        </Form>
                    </div>
                    <Button type="primary" style={{ display: isStart ? 'none' : 'inline-block' }} onClick={this.onStart}>开始</Button>
                    <Button type="primary" style={{ display: isStart ? 'inline-block' : 'none' }} danger onClick={this.onEnd}>结束</Button>
                    <span style={{ marginLeft: '20px' }}>用时：{text_timer}</span>
                    <Button style={{float: 'right'}} type="primary" danger onClick={this.onReset}>重新测试</Button>

                </Modal>
            </div>
        )
    }
    text = () => {
        this.setState({
            textShow: true
        })
    }

    onTextCancel = () => {
        this.setState({
            textShow: false,
            textStr: '',
            isStart: false
        })
        clearInterval(this.state.timer)
        window.location.reload()
    }
    onTextArea = (e) => {
        this.setState({
            textStr: e.target.value
        })
    }

    clearRef = React.createRef();
    // 重新测试
    onReset = () => {
        if (this.state.isStart) {
            message.error('抱歉~您正在测试中，无法重新测试哦~')
        } else {
            this.setState({
                textTimer: 1,
                text_timer: '00:00'
            })
            clearInterval(this.state.timer)
            // this.state.timer = setInterval(this.getTimer, 1000)
            setTimeout(()=> {
                this.clearRef.current.setFieldsValue({textStr: ''})
            },100)
            message.success('已重置，请开始')
            
        }
        
    }
    // 开始
    onStart = () => {
        this.setState({
            isStart: true
        })
        this.state.timer = setInterval(this.getTimer, 1000)
    }
    // 结束
    onEnd = () => {
        this.setState({
            isStart: false
        })
        clearInterval(this.state.timer)
        const { textStr, textTimer, type_text } = this.state;
        
        var right_rate, speed; // 初始定义正确率和速度
        let str = type_text.split(''),    //  正确答案
        str_user = textStr.split('');       // 用户输入的内容
        speed = str_user.length/(textTimer-1)   // 打字速度=输入个数/用时

        if (str_user.length < str.length ) {     // 如果用户输入的内容个数小于正确答案的个数 自动用空字符串补齐个数
            let l = str.length-str_user.length;
            for(let i=0;i<l;i++) {
                str_user.push('')
            }
            let num = 0;    // 初始定义正确的个数  一一比对
            for(let j=0;j<str.length;j++) {
                if (str[j] === str_user[j]) {
                    num++
                }
            }
            right_rate = num/str.length   // 正确率=正确个数/总数
            
        } else {  // 如果字数相等或者大于正确答案的字数  直接比较
            let num = 0;    // 初始定义正确的个数  一一比对
            for(let j=0;j<str.length;j++) {
                if (str[j] === str_user[j]) {
                    num++
                }
            }
            right_rate = num/str.length   // 正确率=正确个数/总数
        }
        
        let d = {
            str: right_rate,
            time_spent: speed  
        }

        testApi.textSub(d).then(res => {
            if (res.code === 0) {
                message.success('成绩已上传，若还未输入完毕可继续点击开始测试~')
            } else {
                message.error(res.msg)
            }
        })
    }
    // 计时
    getTimer = () => {
        let minutes = Math.floor(this.state.textTimer / 60);
        if (minutes < 10) {
            minutes = '0' + minutes
        }
        let seconds = Math.floor(this.state.textTimer % 60);
        if (seconds < 10) {
            seconds = '0' + seconds
        }
        this.setState({
            text_timer: minutes + ":" + seconds
        })
        this.state.textTimer++;
    }
}

export default Test