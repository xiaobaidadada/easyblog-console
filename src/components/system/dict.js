import {Button, Card, Col, message, Row, Space} from 'antd';
import {Input} from 'antd';
import React, {useState, useEffect} from "react";
import asy_get, {asy_post_by_json} from "../config/requests";
import {useNavigate} from "react-router-dom";

function Web_info() {
    const navigate = useNavigate();
    //账号密码
    const [website_name, setWebsite_name] = useState("")
    const [website_about, setWebsite_about] = useState("")
    const [website_about_added, setWebsite_about_added] = useState("")

    function website_name_chagne(new_value) {
        setWebsite_name(new_value.target.value)

    }

    function website_about_chagne(new_value) {
        setWebsite_about(new_value.target.value)
    }

    function website_about_added_chagne(new_value) {
        setWebsite_about_added(new_value.target.value)
    }

    function getinfo(){
        asy_get("config/get_web", ``, data => {

            if (data.code == "未知") alert("请求出错")
            else {
                    let result = data.data;
                setWebsite_name(result.website_name)
                setWebsite_about(result.website_about)
                setWebsite_about_added(result.website_about_added)
            }
        },navigate)
    }

    //组件挂载加载
    useEffect(() => {
        getinfo();

    }, []);// 仅在 []内变量  发生变化时，重新订阅

    function set_user_info() {
        asy_post_by_json('config/set_web', '', {
            website_name: website_name,
            website_about: website_about,
            website_about_added: website_about_added
        }, (data) => {
            if (data.code == '成功') {
                message.success('设置成功');
            }

        }, navigate)
    }

    return (


        <div>
            <Space direction="vertical" size={16}>
                <Card
                    title="网站信息"
                    extra={<Button onClick={() => {
                        set_user_info();
                    }}>确认修改</Button>}
                    style={{
                        width: 300,
                    }}
                >
                    <Input placeholder={"网站名称：" + website_name} onChange={website_name_chagne}/>
                    <br/>
                    <br/>
                    <Input placeholder={"网站引言：" + website_about} onChange={website_about_chagne}/>
                    <br/>
                    <br/>
                    <Input placeholder={"网站补充：" + website_about_added}
                           onChange={website_about_added_chagne}/>
                    <br/>
                    <br/>

                </Card>

            </Space>
        </div>
    )
        ;
}

function User_info() {
    const navigate = useNavigate();
    //账号密码
    const [username, setUsername] = useState("admin")
    const [password, setPassword] = useState("admin")

    function username_chagne(new_value) {
        setUsername(new_value.target.value)

    }

    function password_chagne(new_value) {
        setPassword(new_value.target.value)
    }

    function set_user_info() {
        asy_post_by_json('config/set_user', '', {
            username: username,
            password: password
        }, (data) => {
            if (data.code == '成功') {
                message.success('设置成功');
            }

        }, navigate)
    }

    return (


        <div>
            <Space direction="vertical" size={16}>
                <Card
                    title="账号密码"
                    extra={<Button onClick={() => {
                        set_user_info();
                    }}>确认修改</Button>}
                    style={{
                        width: 300,
                    }}
                >
                    <Input placeholder={"你的账号：defult-" + username} onChange={username_chagne}/>
                    <br/>
                    <br/>
                    <Input placeholder={"你的密码：defult-" + password} onChange={password_chagne}/>

                    <br/>
                    <br/>

                </Card>

            </Space>
        </div>
    )
        ;
}

function Dict() {

    return (
        <div>
            <Row gutter={10} >
                <Col span={5}  >
                    <User_info/>
                </Col>
                <Col style={{"margin-left":"6em"}} span={5}>
                    <Web_info/>
                </Col>
            </Row>


        </div>
    )
}

export default Dict;

