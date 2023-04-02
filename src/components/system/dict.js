import {Button, Card, message, Space} from 'antd';
import {Input} from 'antd';
import React, {useState, useEffect} from "react";
import {asy_post_by_json} from "../config/requests";
import {useNavigate} from "react-router-dom";

function Dict() {
    const navigate = useNavigate();
    //账号密码
    const [username, setUsername] = useState("admin")
    const [password, setPassword] = useState("admin")

    function username_chagne(new_value) {
        setUsername(new_value.target.value)

    }
    function password_chagne(new_value){
        setPassword(new_value.target.value)
    }

    function set_user_info(){
        asy_post_by_json('config/set_user', '', {
            username: username,
            password: password
        }, (data) => {
            if(data.code == '成功'){
                message.success('设置成功');
            }

        }, navigate)
    }

    return (


    <div>
        <Space direction="vertical" size={16}>
            <Card
                title="账号密码"
                extra={ <Button  onClick={()=>{set_user_info();}}>确认修改</Button>}
                style={{
                    width: 300,
                }}
            >
                <Input placeholder={"你的账号：defult-"+username}  onChange={username_chagne}/>
                <br />
                <br />
                <Input placeholder={"你的密码：defult-"+password}  onChange={password_chagne}/>

                <br />
                <br />

            </Card>

        </Space>
    </div>
)
    ;
}

export default Dict;

