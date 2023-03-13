// import { useMediaQuery } from "@mui/material";//判断界面的大小
// import Button from '@mui/material/Button';
// import { Login as log_in } from "@mui/icons-material";
// import TextField from '@mui/material/TextField';
// import Input from '@mui/material/Input';
// "@react-native-async-storage/async-storage": "^1.17.11",
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import { setUser } from "@store/modules/app/action";
import { HandleFetch } from "../../utils/fetch";
import logo from "@assets/common/logo.png";

// 登录组件
function Login1(props) {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false); // 显示加载状态
  const [shouldRedirect, setShouldRedirect] = useState(false); // 是否开始延迟跳转

  // 延迟跳转
  const DelayRedirect = () => {
    useEffect(() => {
      const intervalId = setInterval(() => {
        navigate("essay");
      }, 1000);
      return () => clearInterval(intervalId);
    }, []);
    return <></>;
  };

  // 提交登录
  const onFinish = async (formData) => {
    setLoading(true);
    try {
      // // TODO 请求代码，暂时注释
      // // @params {object} formData { username: "aaa", password: "222222" };
      // const res = await HandleFetch("/login", "POST", formData);

      // TODO 测试数据，调接口后删除【***** start *****】
      const res = {
        msg: "666666",
        code: 200,
        token: "dddddddd",
        account: formData.username,
      };
      // 【************ end ***********】

      if (res.code >= 400) {
        // 异常
        throw new Error(res.msg);
      } else {
        // 本地缓存token和账号account
        // AsyncStorage.setItem("EasyBlog_Token", res && res.token);
        // AsyncStorage.setItem("EasyBlog_Account", res && res.account);

        // 成功提示
        messageApi.open({
          type: "success",
          content: "登录成功！",
        });
        // 跳转页面
        setShouldRedirect(true);
      }
    } catch (err) {
      // 失败提示
      messageApi.open({
        type: "error",
        content: "登录失败！" + err.toString(),
      });
    } finally {
      setLoading(false); // 加载
    }
  };

  // 提交登录失败
  const onFinishFailed = (err) => {
    messageApi.open({
      type: "error",
      content: "请检查数据",
    });
  };

  return (
    <div className={styles["login-wrapper"]}>
      <Form
        name="searchForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="账号"
          name="username"
          rules={[
            {
              required: true,
              message: "请输入账号",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: "请输入密码",
            },
            {
              min: 6,
              message: "请输入不少于6位的密码",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item className={styles["btn-box"]}>
          <Button type="primary" htmlType="submit" loading={loading}>
            登录
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
      {shouldRedirect && <DelayRedirect />}
    </div>
  );
}

// 登录组件
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);

    const param = {
      user: { id: 1186, name: values.username, password: values.password },
      permission: 1,
      auth: "auth-example",
      token: "easyblog" + new Date().getTime(),
    };
    dispatch(setUser(param));
    message.success("登录成功");
    navigate("/essay");
    return;
    HandleFetch({
      url: `/login`,
      method: "post",
      data: values,
    })
      .then((res) => {
        setLoading(false);
        if (res.code === 200) {
          const { permission, token } = res.data;
          let auth = {},
            param = {};
          permission
            .filter((item) => item.type === "btn")
            .forEach((item) => {
              if (auth[item.path]) {
                auth[item.path][item.key] = true;
              } else {
                auth[item.path] = {
                  [item.key]: true,
                };
              }
            });
          param = {
            user: { id: 1186, name: "张三" },
            permission,
            auth,
            token,
          };
          dispatch(setUser(param));
          message.success("登录成功");
          navigate("/essay");
        } else {
          setLoading(false);
          message.error(res.msg);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
        message.error(error);
      });
  };

  return (
    <div className={styles["login-wrapper"]}>
      <div className={styles["login"]}>
        <div className={styles["title"]}>
          <img src={logo} />
          个人博客管理系统
        </div>
        <Form name="basic" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入账号" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入账号"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="请输入密码"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
export default Login;
