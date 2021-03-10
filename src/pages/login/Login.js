import React from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet';
import Banner from './banner/index';
import './login.less'
import { Form, Col, Row, Input, Button, Checkbox, message, Modal } from 'antd';
import loginApi from './../../services/login'
import {
    UserOutlined,
    LockOutlined
} from '@ant-design/icons';
// const { Header,} = Layout;



class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            verifyText: '',
            mobile: '',
            password: '',
            repassword: '',
            verify: '',
            isClick: false,
            isAgree: true,
            privacyShow: false,
            pingShow: false
        };
    }

    componentDidMount() {
        this.setState({ verifyText: '获取验证码', isShow: true })
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        const { privacyShow, pingShow } = this.state;
        return (
            <div className="login-bg">
                <Helmet title="易声呼叫中心-会员登陆" />
                <div className="left">
                    <Banner />
                </div>
                <div className="right">
                    <div className="box">
                        <Form
                            name="login"
                            onSubmit={this.handleSubmit}
                            initialValues={{ remember: true }}
                            style={{ display: this.state.isShow ? "block" : "none" }}
                            className='login_bg'
                        >
                            <div className='login_header'>
                                欢迎登录
                            </div>
                            <Form.Item
                                name="login_username"
                                rules={[{ required: true, message: 'Please input your mobile!' }]}
                            >
                                <Input size="large" onChange={this.bindMobile} placeholder="手机号" autoFocus autoComplete='off' prefix={<UserOutlined className="site-form-item-icon" />} />
                            </Form.Item>

                            <Form.Item
                                name="login_password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password onChange={this.bindPass} size="large" placeholder="密码" autoComplete='off' prefix={<LockOutlined className="site-form-item-icon" />} />
                            </Form.Item>
                            <div className='login_agree'>
                                <Checkbox checked={this.state.isAgree} onChange={this.onChange}></Checkbox><span className='a_text'>我已阅读并接受<span onClick={this.onPri}>《隐私条款》</span>与<span onClick={this.onPing}>《平台协议》</span></span>
                            </div>
                            <Form.Item >
                                <Button className='login_but' onClick={this.onLogin} loading={this.state.loading} htmlType="submit">
                                    登录
                                </Button>
                            </Form.Item>
                            <div className='login_handle'>
                                <span onClick={this.registerNew}>没有账号？去注册</span>
                            </div>
                        </Form>
                        <Form
                            name="basic"
                            onSubmit={this.handleSubmit}
                            initialValues={{ remember: true }}
                            style={{ display: this.state.isShow ? "none" : "block" }}
                            className='login_bg'
                        >
                            <div className='login_header'>
                                欢迎注册
                            </div>
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your mobile!' }]}
                            >
                                <Input size="large" onChange={this.bindMobile} placeholder="手机号" autoFocus autoComplete='off' prefix={<UserOutlined className="site-form-item-icon" />} />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password onChange={this.bindPass} size="large" placeholder="密码" autoComplete='off' prefix={<LockOutlined className="site-form-item-icon" />} />
                            </Form.Item>
                            <Form.Item
                                name="repassword"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password onChange={this.bindRepass} size="large" placeholder="确认密码" autoComplete='off' prefix={<LockOutlined className="site-form-item-icon" />} />
                            </Form.Item>
                            <Input.Group size="large">
                                <Row gutter={8}>
                                    <Col span={16}>
                                        <Input onChange={this.bindVerify} placeholder="验证码" autoComplete='off' />
                                    </Col>
                                    <Col span={8}>
                                        <Button onClick={this.getVerify} className='login_get' size="large">{this.state.verifyText}</Button>
                                    </Col>
                                </Row>
                            </Input.Group>
                            <div className='login_agree'>
                                <Checkbox checked={this.state.isAgree} onChange={this.onChange}></Checkbox><span className='a_text'>我已阅读并接受<span onClick={this.onPri}>《隐私条款》</span>与<span onClick={this.onPing}>《平台协议》</span></span>
                            </div>
                            <Form.Item >
                                <Button className='login_but' onClick={this.onReg} loading={this.state.loading} htmlType="submit">
                                    注册
                                </Button>
                            </Form.Item>
                            <div className='login_handle'>
                                <span href="#!" onClick={this.registerNew}>已有账号？去登录</span>
                            </div>
                        </Form>
                    </div>
                </div>
                <Modal title='隐私协议' visible={privacyShow} footer={null} width='50%' onCancel={this.onHide}>
                    <div style={{ height: '500px', overflowY: 'auto' }}>
                        <p>尊敬的用户，欢迎您使用上海易胜来网络科技有限公司的“易声呼叫中心众包平台”。上海易胜来网络科技有限公司（注册地址/常用办公地址：上海市宝山区蕰川路516号泰德科技园B座3-5室；以下或称“我们”）尊重并保护您的隐私。</p>
                        <p>我们非常重视对于用户隐私的保护，因此特别制定本《隐私条款》。我们希望首先通过此《隐私条款》向您进行说明，在您使用我们的服务时，我们是如何收集、使用、披露以及存储您的信息，以及为您提供访问、更新、控制和保护这些信息的方式。同时，我们会通过本政策向您说明，我们如何为您提供访问、更新、管理和保护您的信息的服务。本《隐私条款》适用于用户与本平台的交互行为、用户使用本平台提供的相关服务。建议您仔细阅读本《隐私条款》，以帮助您更好地了解和维护您的隐私。如您继续使用我们的服务，即表示您同意我们按照本《隐私条款》收集、使用、披露以及存储您的信息。对本政策中与您的权益存在重大关系的条款和个人敏感信息，我们采用粗体字进行标注以提示您注意。</p>
                        <p> 一、信息收集范围</p>
                        <p>1、 为完成“众包平台”账号注册，您需要提交真实、合法、有效的个人身份信息，包括但不限于姓名、身份证号、手机号、照片、身份证正反面照片等。</p>
                        <p>2、 为持续为您提供本平台的服务，并保障服务质量，我们需要保留您登录和使用本平台的信息，包括但不限于浏览器类型、IP地址、登入登出的日期和时间、登入登出的成功与失败记录、软件版本、硬件信息等。</p>
                        <p>二、信息使用方式</p>
                        <p>为了为您提供更加优质、全面、适合您的服务，在严格遵守相关法律法规的情况下，我们可能将收集的信息用作以下用途：</p>
                        <p>1、为了保障您服务的用户信息安全，您登录众包平台后，看到的个人用户信息将进行加密脱敏保护。</p>
                        <p>2、 帮助我们改善提升服务，也更好地向您提供更优质的服务。我们会根据您使用本平台时产生的记录、报错、或者埋点信息反馈的结果来判断本平台所需优化的功能，从而优化本平台。</p>
                        <p>3、 用于提升服务质量或调查回访。我们可能会根据您提交的意见与您的个人信息，联系到您获取您最真实的意见或建议，以便更好地升级优化本平台。</p>
                        <p>4、 必要时，我们将使用收集的信息用于主张我方权利。</p>
                        <p>三、信息的共享、转让、公开</p>
                        <p>未经您同意，我们不会以任何方式向第三方分享您的个人信息或您服务的客户信息（包括但不限于姓名、身份证号、手机号、照片、身份证正反面照片、所属省市区等），但是以下特殊情形除外：</p>
                        <p>1、我们可能会将您的个人信息或您服务的客户信息与我们的关联公司或其他合作伙伴进行分享，仅做以下用途：</p>
                        <p>①提供“一、信息收集范围”中的相应的功能及服务所必需，以及“三、信息使用方式”中所列范围所必须</p>
                        <p>②履行我们在《用户协议》或本声明中的义务及行使法律赋予我们的权利 如我们与上述第三方分享您的个人信息或您服务的客户信息，我们将会尽最大可能、努力确保第三方在使用您的个人信息或您服务的客户信息时遵守本协议以及我们要求其必须遵守的其他保密协议及安全措施。</p>
                        <p>2、随着我们业务的持续发展，我们以及我们的关联公司有可能进行合并、收购、资产转让或类似的交易，您的个人信息或您服务的客户信息有可能作为此类交易的一部分而被转移。我们将遵守相关法律法规的要求，在转移前通知您，确保信息在转移时的机密性，以及变更后继续履行相关责任与义务。</p>
                        <p>3、我们还可能因以下原因而披露您的个人信息或您服务的客户信息：</p>
                        <p>（1）遵守适用的法律法规等有关规定。</p>
                        <p>（2）遵守法院判决、裁定或其他法律程序的规定。</p>
                        <p>（3）遵守相关政府机关或其他有权机关的要求。</p>
                        <p>（4）我们有理由确信需遵守法律法规等有关规定。</p>
                        <p>（5）为执行相关服务协议或本隐私声明、维护社会公共利益、处理投诉/纠纷，保护我们的客户、我们或我们的关联公司、其他用户或雇员的人身和财产安全或合法权益所合理必需的用途。</p>
                        <p>（6）经过您合法授权的情形,如我们因上述原因而披露您的个人信息或您服务的客户信息，我们将在遵守法律法规相关规定及本声明的基础上及时告知您。</p>
                        <p>四、信息存储问题</p>
                        <p>1、众包平台收集的有关您的个人信息或您服务的客户信息保存在众包平台位于中国大陆的服务器。</p>
                        <p>2、通常仅在为您提供服务期间保留您的个人信息或您服务的客户信息，保留时间不会超过满足相关使用所必须的时间。但在以下特殊情况下，我们可能需要较长时间存储您的个人信息或您服务的客户信息：</p>
                        <p>（1）遵守适用的法律法规等有关规定。</p>
                        <p>（2）遵守法院判决、裁定或其他法律程序的要求。</p>
                        <p>（3）遵守相关政府机关或其他有权机关的要求。</p>
                        <p>（4）我们有理由确信需遵守法律法规等有关规定。</p>
                        <p>（5）为执行相关服务协议或本隐私声明、维护社会公共利益、处理投诉/纠纷，保护我们的用户、我们或我们的关联公司、其他用户或雇员的人身和财产安全或合法权益所合理必需的用途。</p>
                        <p>五、信息安全</p>
                        <p>我们努力保障信息安全，以防信息的丢失、不当使用、未经授权阅览或披露。</p>
                        <p>1、我们使用各种安全技术以保障信息的安全。例如，我们将通过服务器多备份、密码加密等安全措施，防止信息泄露、毁损、丢失。</p>
                        <p>2、我们建立严格的管理制度和流程以保障信息的安全。例如，我们严格限制访问信息的人员范围，并进行审计，要求他们遵守保密义务。</p>
                        <p>但请您理解，由于技术的限制以及可能存在的各种恶意手段，在互联网环境下，即便竭尽所能加强安全措施，也不可能始终保证信息百分之百的安全。您需要了解，您接入我们的服务所用的系统和通讯网络，有可能因我们可控范围外的因素而出现问题。</p>
                        <p>若发生您个人信息或服务客户信息泄露等安全事件，我们会启动应急预案，阻止安全事件扩大，按照《国家网络安全事件应急预案》等有关规定及时上报，并以推送通知、公告等形式告知您相关情况，并向您给出安全建议。</p>
                        <p>3、为更有效的保障信息安全，我们也希望您能够加强自我保护意识。我们仅在众包平台直接导致您服务的客户信息泄露范围内承担责任，因此，请您妥善保管您的账号及密码信息，避免您的个人信息或您服务的客户信息泄露，除非您判断认为必要的情形下，不向任何第三人提供您的账号密码等账号信息。</p>
                        <p>六、用户的权利</p>
                        <p>1、您可以在使用该平台时，查看、修改、删除您服务的客户信息，具体方式取决于您使用的具体服务。</p>
                        <p>2、如您发现我们未按照本《隐私协议》或国家相关法律法规收集、使用、披露、存储您的信息，您可以联系我们进行删除。如您发现我们收集、存储的信息是错误的，您可以自行更正，如无法自行更正，您可以联系我们进行更正。</p>
                        <p>七、变更</p>
                        <p>我们可能适时修订本隐私声明的条款，修订内容为该《隐私条款》的一部分。如可能造成您在本《隐私条款》下权利的实质减少或扩大收集、使用信息的范围等重要规则变更时，我们将在修订生效前通过在本平台进行消息推送或以其他方式通知您。在该种情况下，若您继续使用我们的服务，即表示同意受经修订的本隐私声明的约束。</p>
                        <p>八、与我们联系</p>
                        <p>如您对本政策或其他相关事宜有疑问，可邮件联系ysl1236688@163.com</p>
                    </div>
                </Modal>
                <Modal title='平台协议' visible={pingShow} footer={null} width='50%' onCancel={this.onHide1}>
                    <div style={{ height: '500px', overflowY: 'auto' }}>
                        <p>业务众包平台（以下简称"本网站"）注册会员时，请您认真阅读本协议，审阅并接受或不接受本协议（未成年人应在法定监护人陪同下审阅）。 若您已经注册为本网站会员，即表示您已充分阅读、理解并同意自己与本网站订立本协议，且您自愿受本协议的条款约束。本网站有权随时变更本协议并在本网站上予以公告。经修订的条款一经在本网站公布，立即自动生效。如您不同意相关变更，必须停止使用本网站。本协议内容包括协议正文及所有已经发布的各类规则。所有规则为本协议不可分割的一部分，与本协议正文具有同等法律效力。一旦您继续使用本网站，则表示您已接受并自愿遵守经修订后的条款。</p>
                        <strong>第一条 会员资格</strong>
                        <p>1、只有符合下列条件之一的自然人才能申请成为本网站会员，可以使用本网站的服务：</p>
                        <p>A、年满十八岁，并具有民事权利能力和民事行为能力的自然人；</p>
                        <p>B、限制民事行为能力人应经过其监护人的同意。</p>
                        <p>2、会员需要提供明确的联系地址和联系电话，并提供真实姓名。</p>
                        <p>3、会员参与本网站任务活动，实际接受任务发布方的任务系一种承揽行为，不与本网站或任务发布方构成雇佣或劳动合同关系。</p>
                        <strong>第二条 会员的权利和义务</strong>
                        <p>1、会员有权根据本协议及本网站发布的相关规则，参加本网站的有关活动及有权享受本网站提供的其他有关资讯及信息服务。</p>
                        <p>2、会员须自行负责自己的会员账号和密码，且须对在会员账号密码下发生的所有活动（包括但不限于网上点击同意各类协议、规则、参与网站任务等）承担责任。会员有权根据需要更改登录和账户提现密码。因会员的过错导致的任何损失由会员自行承担，该过错包括但不限于：不按照交易提示操作，未及时进行交易操作，遗忘或泄漏密码，密码被他人破解，使用的计算机被他人侵入。</p>
                        <p>3、会员应当向本网站提供真实准确的注册信息，包括但不限于真实姓名、身份证号、联系电话、地址、邮政编码等。保证本网站可以通过上述联系方式与会员进行联系。同时，会员也应当在相关资料实际变更时及时更新有关注册资料；由于会员未提供真实联系方式或未及时更新相关注册资料导致本网站未能与会员进行联系而造成损失的，由会员自行承担责任。</p>
                        <p>4、会员不得以任何形式擅自转让或授权他人使用自己在本网站的会员帐号。</p>
                        <p>5、会员承诺自己在使用本网站实施的所有行为遵守法律、法规、行政规章和本网站的相关规定以及各种社会公共利益或公共道德。如有违反导致任何法律后果的发生，会员将以自己的名义独立承担相应的法律责任。</p>
                        <p>6、会员应当自行承担因交易产生或取得的相关费用，并依法纳税。</p>
                        <p>7、会员不得使用以下方式登录网站或破坏网站所提供的服务：</p>
                        <p>A、以任何机器人软件、蜘蛛软件、爬虫软件、刷屏软件或其它自动方式访问或登录本网站；</p>
                        <p>B、通过任何方式对本公司内部结构造成或可能造成不合理或不合比例的重大负荷的行为；</p>
                        <p>C、通过任何方式干扰或试图干扰网站的正常工作或网站上进行的任何活动。</p>
                        <p>8、会员同意接收来自本网站的信息，包括但不限于活动信息、交易信息、促销信息等。</p>
                        <strong>第三条 网站的权利和义务</strong>
                        <p>1、本网站仅为会员提供一个信息交流平台，是任务需求方发布任务需求和会员提供解决方案的一个交易市场。</p>
                        <p>2、本网站有权对会员的注册资料进行审查，对存在任何问题或怀疑的注册资料，本网站有权发出通知询问会员并要求会员做出解释、改正。</p>
                        <p>3、因网上信息平台的特殊性，本网站没有义务对所有会员的交易行为以及与交易有关的其他事项进行事先审查，但如发生以下情形，本网站有权无需征得会员的同意限制会员的活动、向会员核实有关资料、发出警告通知、暂时中止、无限期中止及拒绝向该会员提供服务：</p>
                        <p>（1）会员违反本协议；</p>
                        <p>（2）存在会员或其他第三方通知本网站，认为某个会员或具体交易事项存在违法或不当行为，并提供相关证据，而本网站无法联系到该会员核证或验证该会员向本网站提供的任何资料；</p>
                        <p>（3）存在会员或其他第三方通知本网站，认为某个会员或具体交易事项存在违法或不当行为，并提供相关证据。本网站以普通非专业交易者的知识水平标准对相关内容进行判别，认为这些内容或行为可能对本网站会员或本网站造成财务损失或法律责任；</p>
                        <p>（4）本网站认为需要限制会员的活动、向会员核实有关资料、发出警告通知、暂时中止、无限期中止及拒绝向该会员提供服务的其他情形；</p>
                        <p>（5）本协议终止或更新时，用户未确认新的协议的。</p>
                        <p>4、本网站有权在必要时修改服务条款，平台服务条款一旦发生变动，将会在重要页面上提示修改内容。如果不同意所改动的内容，用户可以主动取消获得的网络服务。如果用户继续享用本网站提供的服务，则视为接受服务条款的变动。本网站保留随时修改其服务体系和价格而不需通知用户的权利，在修改服务和价格体系之前用户就具体服务与本网站达成协议并已按照约定交纳费用的，将按照已达成的协议执行至已交纳费用的服务期期满。</p>
                        <strong>第四条 会员的信息</strong>
                        <p>1、本网站可自行全权决定以任何理由 (包括但不限于本网站认为会员已违反本协议及相关规则的字面意义和精神，或会员在超过180日内未登录本网站等) 终止对会员的服务，并有权在两年内保存会员在本网站的全部资料（包括但不限于会员信息、产品信息、交易信息等）。同时本网站可自行全权决定，在发出通知或不发出通知的情况下，随时停止提供全部或部分服务。服务终止后，本网站没有义务为会员保留原账户中或与之相关的任何信息，或转发任何未曾阅读或发送的信息给会员或第三方。</p>
                        <p>2、若会员向本网站提出注销本网站注册会员身份，需经本网站审核同意，由本网站注销该注册会员，会员即解除与本网站的协议关系，但本网站仍保留下列权利：</p>
                        <p>（1）会员注销后，本网站有权在法律、法规、行政规章规定的时间内保留该会员的资料,包括但不限于以前的会员资料、交易记录等；</p>
                        <p>（2）会员注销后，若会员注销前在本网站交易平台上存在违法行为或违反本协议的行为，本网站仍可行使本协议所规定的权利。</p>
                        <p>3、会员存在下列情况，本网站可以通过注销会员的方式终止服务：</p>
                        <p>（1）在会员违反本协议及相关规则规定时，本网站有权终止向该会员提供服务。本网站将在中断服务时通知会员。但该会员在被本网站终止提供服务后，再一次直接或间接或以他人名义注册为本网站会员的，本网站有权再次单方面终止为该会员提供服务；</p>
                        <p>（2）本网站发现会员注册资料中主要内容（姓名、身份证号、联系电话、地址、邮政编码）是虚假的，本网站有权随时终止为该会员提供服务。主要内容包括但不限于：姓名、身份证号、联系电话、地址、邮政编码等；</p>
                        <p>（3）本协议终止或更新时，会员未确认新的协议的；</p>
                        <p>（4）本网站认为需终止服务的其他情况。</p>
                        <strong>第五条 本网站的责任范围</strong>
                        <p>当会员接受该协议时，会员应当明确了解并同意：</p>
                        <p>1、本网站不能随时预见到任何技术上的问题或其他困难，该等困难可能会导致数据损失或其他服务中断。本网站是在现有技术基础上提供的服务，因此本网站不保证以下事项：</p>
                        <p>（1）本网站符合所有会员的要求；</p>
                        <p>（2）本网站不受干扰、能够及时提供、安全可靠或免于出错；</p>
                        <p>（3）本服务使用权的取得结果是正确或可靠的。</p>
                        <p>2、是否经由本网站下载或取得任何资料，由用户自行考虑、衡量并且自负风险，因下载任何资料而导致用户电脑系统的任何损坏或资料流失，用户应负完全责任。希望用户在使用本网站时，小心谨慎并运用常识。</p>
                        <p>3、用户经由本网站取得的建议和资讯，无论其形式或表现，绝不构成本协议未明示规定的任何保证。</p>
                        <p>4、基于以下原因而造成的利润、商誉、使用、资料损失或其它无形损失，本网站不承担任何直接、间接、附带、特别、衍生性或惩罚性赔偿（即使本网站已被告知前款赔偿的可能性）：</p>
                        <p>A、本网站的使用或无法使用；</p>
                        <p>B、用户的传输或资料遭到未获授权的存取或变更；</p>
                        <p>C、本网站中任何第三方之声明或行为；</p>
                        <strong>第六条 隐私权</strong>
                        <p>1、信息使用：</p>
                        <p>（1）本网站不会向任何人出售或出借会员的个人或法人信息，除非事先得到会员的许可。</p>
                        <p>（2）本网站亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播会员的个人信息。任何会员如从事上述活动，一经发现，本网站有权立即终止与该会员的服务协议，查封其账号，并保留向泄露他人信息的一方追究责任的权利。因从事上述活动产生的过错方与被泄露方之间的诉讼或其他纠纷，一概与本网站无关。</p>
                        <p>2、信息披露：会员的个人信息将在下述情况下部分或全部被披露：</p>
                        <p>（1）经会员同意，向第三方披露；</p>
                        <p>（2）根据法律的有关规定，或者行政、司法机关的要求，向第三方或者行政、司法机关披露；</p>
                        <p>（3）会员出现违反中国有关法律或者网站规定的情况，需要向第三方披露；</p>
                        <p>（4）为提供会员所要求的产品和服务，而必须和第三方分享会员的个人信息；</p>
                        <p>（5）本网站根据法律或者网站规定认为可以披露的其他情况。</p>
                        <strong>第七条 保密条款</strong>
                        <p>会员在使用本网站时所获知的本网站及任务发布方的信息，包括但不限于其用户的信息、培训内容、测试题目、绩效考核标准及薪酬等均属于商业秘密，知悉此类信息的会员不得将此类信息向任何第三方透露。会员违反本条规定给商业秘密所有人造成损失的，应依法予以赔偿。本保密条款长期有效，在会员关系存续期间及不论因任何原因注销会籍、不再使用本网站平台后，会员均应当遵守此保密义务。</p>
                        <strong>第八条 知识产权</strong>
                        <p>本网站平台的所有知识产权包括但不限于著作权、所使用的注册商标权、企业名称权，均归本网站相应权利主体所有。会员在其各项行为过程中不得侵犯本网站所享有的各项知识产权，若发现他人有侵犯本网站的各项知识产权时予以制止，并及时通知本网站。若本网站会员侵犯网站平台中的知识产权，本网站在接到权利人书面通知和证明材料后已采取必要措施的，不承担责任。相应的知识产权侵害人与权利人之间的纠纷，与本网站无关。</p>
                        <strong>第九条 不可抗力</strong>
                        <p>1、因不可抗力或者其他意外事件，使得本协议履行不可能、不必要或者无意义的，遭受不可抗力、意外事件的一方不承担责任。</p>
                        <p>2、不可抗力、意外事件是指不能预见、不能克服并不能避免且对一方或双方当事人造成重大影响的客观事件，包括但不限于自然灾害如洪水、地震、瘟疫流行和风暴等以及社会事件如战争、动乱、政府行为等。</p>
                        <strong>第十条　附则</strong>
                        <p>1、本协议中有关条款若被权威机构认定为无效，不应影响其他条款的效力，也不影响本协议的解释、违约责任及争议解决的有关约定的效力。</p>
                        <p>2、一方变更通知、通讯地址或其他联系方式，应自变更之日起及时将变更后的地址、联系方式通知另一方，否则变更方应对此造成的一切后果承担责任。用户同意，有关通知只需在本网站有关网页上发布即视为送达用户。用户在此再次保证已经完全阅读并理解了上述本协议并自愿正式进入本网站会员在线注册程序，接受上述所有条款的约束。</p>
                        <p>3、因履行本协议所产生的纠纷，各项应协商解决。协商不成的，提交本网站经营者公司注册地有管辖权的人民法院通过诉讼予以解决。</p>
                        {/* <p></p> */}
                    </div>
                </Modal>
            </div>
        )
    }
    onPri = () => {
        this.setState({ privacyShow: true })
    }
    onHide = () => {
        this.setState({ privacyShow: false })
    }

    onPing = () => {
        this.setState({ pingShow: true })
    }
    onHide1 = () => {
        this.setState({ pingShow: false })
    }

    bindMobile = (e) => {
        this.setState({
            mobile: e.target.value
        })
    }
    bindPass = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    bindRepass = (e) => {
        this.setState({
            repassword: e.target.value
        })
    }
    bindVerify = (e) => {
        this.setState({
            verify: e.target.value
        })
    }
    onChange = (e) => {
        this.setState({ isAgree: e.target.checked })
    }
    // 获取验证码
    getVerify = () => {
        let mobile = this.state.mobile
        if (mobile === '') {
            message.error('请先填写手机号');
        } else if (!(/^1[3456789]\d{9}$/.test(mobile))) {
            message.error('请填写正确的手机号');
        } else {
            // 是否可点击
            if (!this.state.isClick) {
                let d = {
                    mobile,
                    debug: true
                }
                loginApi.verify(d).then(
                    res => {
                        if (res.code === 0) {
                            message.success('验证码已发送，请注意查收')
                            this.verify()
                        } else {
                            message.error(res.msg)
                        }
                    }
                )
            }

        }

    }
    // 验证码倒计时
    verify = () => {
        let _that = this;
        _that.setState({ isClick: true, verifyText: '60s后重新获取' })
        let time = 59;
        let timer = setInterval(function () {
            _that.setState({ verifyText: time + 's后重新获取' })
            time--
            if (time < 0) {
                clearInterval(timer)
                _that.setState({ isClick: false, verifyText: '获取验证码' })
            }
        }, 1000)
    }
    // 登录-注册 相互跳转
    registerNew = () => {
        this.setState({ isShow: !this.state.isShow })
    }

    // 登录
    onLogin = () => {
        let { mobile, password, isAgree } = this.state
        if (mobile === '' || password === '') {
            message.error('请填写完整信息');
        } else if (isAgree === false) {
            message.error('请勾选已阅读《隐私条款》');
        } else {
            this.setState({ loading: true })
            let d = {
                mobile,
                password
            }
            loginApi.login(d).then(
                res => {
                    if (res.code === 0) {
                        this.setState({ loading: false })
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('mobile', res.data.mobile)
                        localStorage.setItem('name', res.data.roleData.name)
                        axios.defaults.headers['token'] = res.data.token;
                        this.props.history.push('/home')
                        let name = res.data.roleData.name;
                        if (name !== 'Normal') {
                            localStorage.setItem('active_id', '5')
                            localStorage.setItem('active_path', 'sub3')
                        }
                        window.location.reload()
                        message.success('欢迎进入呼叫中心管理平台~')
                    } else if (res.code === 604) {
                        this.setState({ loading: false })
                        message.error('该账号还未注册呢，请先去注册哦~')
                    } else {
                        this.setState({ loading: false })
                        message.error(res.msg)
                    }
                }
            )
        }
    }

    // 注册
    onReg = () => {
        let { mobile, password, repassword, verify, isAgree } = this.state
        if (mobile === '' || password === '' || verify === '') {
            message.error('请填写完整信息');
        } else if (!(/^1[3456789]\d{9}$/.test(mobile))) {
            message.error('请填写正确的手机号');
        } else if (isAgree === false) {
            message.error('请勾选已阅读《隐私条款》');
        } else {
            this.setState({ loading: true })
            let d = {
                mobile,
                verify,
                password,
                repassword
            }
            loginApi.register(d).then(
                res => {
                    if (res.code === 0) {
                        this.setState({ loading: false, mobile: '', password: '', repassword: '', verify: '', isShow: !this.state.isShow })
                        message.success('注册成功，快去登录吧~')
                    } else {
                        this.setState({ loading: false })
                        message.error(res.msg)
                    }
                }
            )
        }
    }
}

export default Login
