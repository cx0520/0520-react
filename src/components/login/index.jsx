import React, {Component} from 'react';
import {Form, Input, Icon, Button, message} from 'antd';
import {reqLogin} from "../../apii";

import {connect} from 'react-redux';
import {saveUser} from "@redux/action-creators";

import logo from './logo.png';
import './index.less';

@connect(
    null,
    {saveUser}
)
@Form.create()
class Login extends Component {
    //自定义表单
    validator = (rule, value, callback) => {

        const name = rule.field === 'username' ? '用户名' : '密码';
        if (!value) {
            return callback(`请输入${name}`);
        }

        if (value.length < 3) {
            return callback(`${name}长度必须大于3位`);
        }

        if (value.length > 13) {
            return callback(`${name}长度必须小于13位`);
        }
        const reg = /^[a-zA-Z0-9_]{3,13}$/;
        if (!reg.test(value)) {
            return callback(`${name}只能包含英文、数字和下划线`);
        }
        callback();
    };
    //  登录函数（没封装之前）
    // login = (e) => {
    //     e.preventDefault();
    //     this.props.form.validateFields((error, values) => {
    //         if (!error) {
    //             const {username, password} = values;
    //             axios.post('http://localhost:3000/api/login', {username, password})
    //
    //                 // .then((response) => {//解构赋值
    //                 .then(({data}) => {
    //                     if (data.status === 0) {
    //                         message.success('登录成功~');
    //                         //保存的数据要存在  redux  LocalStorage（即使关机也在）/sessionStorage(关闭浏览器就结束了)中
    //
    //                         this.props.saveUser(data.data);
    //
    //                         this.props.history.replace('/');//跳转到home
    //                     } else {
    //                         message.error(data.msg);
    //                     }
    //                 })
    //                 .catch((error) => {
    //                     message.error('未知错误，请联系管理员~');
    //                 })
    //         }
    //     })
    // };
    //表单校验  高阶组件
    //登录函数（封装之后）
    login = (e) => {
        e.preventDefault();
        this.props.form.validateFields((error, values) => {
            if (!error) {
                const {username, password} = values;
                reqLogin(username,password)
                    .then((result) =>{
                        message.success('登录成功···');
                        this.props.saveUser(result);//保存用户数据
                        this.props.history.replace('/')//跳转到 /路由
                    })
                    .catch(() =>{
                        this.props.form.resetFields(['password']);
                    })
            }
        })
    };
    render() {
        const {getFieldDecorator} = this.props.form;
        return <div className="login">
            <header className="login-header">
                <img src={logo} alt="logo"/>
                <h1>React项目: 后台管理系统</h1>
            </header>
            <section className="login-section">
                <h3>用户登录</h3>
                <Form onSubmit={this.login}>
                    <Form.Item>
                        {getFieldDecorator(
                            'username',
                            {
                                rules: [
                                    {validator: this.validator}
                                ]
                            }
                        )(
                            <Input prefix={<Icon type="user"/>} placeholder="用户名"/>
                        )
                        }
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator(
                            'password',
                            {
                                rules: [
                                    {
                                        validator: this.validator
                                    }
                                ]
                            }
                        )(
                            <Input prefix={<Icon type="lock"/>} placeholder="密码" type="password"/>
                        )
                        }
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-btn">登录</Button>
                    </Form.Item>
                </Form>
            </section>
        </div>;
    }
}
//暴露
export default Login;