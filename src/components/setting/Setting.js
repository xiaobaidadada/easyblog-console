import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import styles from "./styles.module.css";

// 账号信息
let accountValue = "";
// 表单
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
  style: { maxWidth: 600 },
  initialValues: { remember: true },
};

// 表单尾部-按钮
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

// 获取账号数据(缓存)
const AccountData = async (account, setAccount, messageApi) => {
  try {
    if (Object.is(account, "")) {
      const acc = await AsyncStorage.getItem("EasyBlog_Account");
      accountValue = acc;
      setAccount(accountValue);
    }
  } catch (err) {
    messageApi({
      type: "error",
      content: "获取账号数据失败",
    });
  }
};

// 修改密码
const InputPwd = ({ setMode, messageApi }) => {
  // setMode-》 mode模式: 1-显示账号 2-注册
  const [loading, setLoading] = useState(false); // 显示加载状态
  const [form] = Form.useForm(); // 表单

  // 提交表单
  const onFinish = async (formData) => {
    console.log("success:", formData);
    setLoading(true);
    try {
      // // TODO 请求代码，暂时注释
      // const res = await HandleFetch("/login", "POST", formData);

      // TODO 测试数据，调接口后删除【****** start *******】
      const res = { msg: 9, code: 201 };
      // 【************* end ************】

      if (res.code >= 400) {
        // 异常
        throw new Error(res.msg);
      } else {
        // 成功提示
        messageApi.open({
          type: "success",
          content: "修改成功！",
        });
      }
    } catch (err) {
      messageApi.open({
        type: "error",
        content: "修改失败！" + (err && err.toString()),
      });
    } finally {
      setLoading(false); // 加载
      setMode(1); // 跳转组件
    }
  };
  // 提交表单失败
  const onFinishFailed = (err) => {
    messageApi.open({
      type: "error",
      content: "请检查数据",
    });
  };
  // 校验第二次输入的密码
  const validatePassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue("password")) {
      return new Promise((resolve, reject) => {
        reject("两次输入的密码不一致！");
      });
    } else {
      return Promise.resolve();
    }
  };
  // 密码校验
  const rules = {
    pwd: [
      {
        required: true,
        message: "请输入密码",
      },
      {
        min: 6,
        message: "请输入不少于6位的密码",
      },
    ],
    confirm: [
      {
        required: true,
        message: "请再次输入密码",
      },
      { validator: validatePassword },
    ],
  };
  
  return (
    <>
      <Form
        {...layout}
        name="form"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="新密码"
          name="password"
          key="password"
          rules={rules.pwd}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="再次输入密码"
          name="confirmPassword"
          key="confirmPassword"
          rules={rules.confirm}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            确定
          </Button>
          <Button className={styles.cancel} onClick={() => setMode(1)}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

// 默认
const Setting = (props) => {
  const [account, setAccount] = useState(accountValue);
  const [mode, setMode] = useState(1); // 模式: 1-展示账号 2-修改密码
  const [messageApi, contextHolder] = message.useMessage();

  // 获取账号数据
  AccountData(account, setAccount, messageApi);

  return (
    <div className={styles.setting}>
      {mode === 1 && (
        <>
          <div className={styles.info}>
            <span>当前账号</span>
            <span>{account}</span>
          </div>
          <Button type="primary" onClick={() => setMode(2)}>
            修改密码
          </Button>
        </>
      )}
      {mode === 2 && (
        <InputPwd setMode={setMode} messageApi={messageApi}></InputPwd>
      )}
      {contextHolder}
    </div>
  );
};
export default Setting;
