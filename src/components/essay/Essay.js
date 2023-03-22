import { useContext, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import { HandleFetch, HandleAjax } from "../../utils/fetch";
import CEditModal from "../editModal/CEditModal";
import {
  AutoComplete,
  Button,
  Cascader,
  Col,
  DatePicker,
  Input,
  InputNumber,
  Row,
  Select,
  Tooltip,
  Space,
  Table,
  Upload,
  Tag,
  Descriptions,
  Divider,
  Form,
  Modal,
} from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Column, ColumnGroup } = Table;
// 文章摘要
const column = {
  xxl: 4,
  xl: 3,
  lg: 3,
  md: 3,
  sm: 2,
  xs: 1,
};
// table分页器配置
const pagination = {
  defaultPageSize: 6,
  pageSizeOptions: [6, 20, 50, 100],
  total: 11,
  showSizeChanger: true,
};
// 搜索基础配置
const searchItem = [
  {
    type: "input",
    key: "id",
    label: "id",
    span: 6,
    placeholder: "请输入",
  },
  {
    type: "input",
    key: "title",
    label: "标题",
    span: 6,
    placeholder: "请输入",
  },
  {
    type: "rangePicker",
    key: "rangeMonth",
    label: "日期",
    span: 8,
    placeholder: ["开始月份", "结束月份"],
  },
];
// 搜索字段
const searchForm = {
  id: "",
  title: "",
  rangeMonth: "",
};
// 编辑数据回显
let editForm = {
  id: "",
  title: "",
  date: "",
};
// 表格数据源
const dataSource = [
  {
    id: "1",
    title: "关于正则表达式",
    time: "2021-01-03",
  },
  {
    id: "2",
    title: "TCP协议",
    time: "2023-01-03",
  },
  {
    id: "3",
    title: "TCP协议",
    time: "2023-01-03",
  },
  {
    id: "4",
    title: "TCP协议",
    time: "2023-01-03",
  },
  {
    id: "5",
    title: "TCP协议",
    time: "2023-01-03",
  },
  {
    id: "6",
    title: "TCP协议",
    time: "2023-01-03",
  },
  {
    id: "7",
    title: "TCP协议",
    time: "2023-01-03",
  },
  {
    id: "8",
    title: "TCP协议",
    time: "2023-01-03",
  },
  {
    id: "9",
    title: "TCP协议",
    time: "2023-01-03",
  },
  {
    id: "10",
    title: "TCP协议",
    time: "2023-01-03",
  },
  {
    id: "11",
    title: "TCP协议",
    time: "2023-01-03",
  },
  {
    id: "12",
    title: "TCP协议",
    time: "2023-01-03",
  },
  {
    id: "13",
    title: "TCP协议",
    time: "2023-01-03",
  },
];

// 搜索框值变化的回调
const handleSearchBack = (v, k) => {
  searchForm[k] = v;
};

function Essay() {
  let id = ""; // 当前编辑文章的id
  const [modal, contextHolder] = Modal.useModal(); // 删除弹窗-打开
  const [openEdit, setOpenEdit] = useState(false); // 编辑弹窗-打开
  const [openImport, setOpenImport] = useState(false); // 导入弹窗-打开
  const [loading, setLoading] = useState(false); // 搜索-加载
  const [cEditloading, setCEditloading] = useState(false); // 弹窗-编辑-加载

  // 改变分页
  const handleTableChange = async (val) => {
    console.log("handleTableChange", val);

    const res = await HandleFetch("/rand.music", "GET", {
      sort: "热歌榜",
      mid: "862101001",
      format: "json",
    });
  };
  // 搜索
  const handleSearch = async () => {
    console.log("搜索: ", searchForm);
    setLoading(true);
    const res = await HandleAjax("/api/essay/list", "GET", {});
    setLoading(false);
  };
  // 打开弹窗 编辑/删除/导入
  const openModal = async (mode, _) => {
    console.log(mode, _);
    id = _ && _.id;
    if (mode === "edit") {
      console.log("编辑, id=", id);
      setOpenEdit(true); // 打开弹窗
      setCEditloading(true); // 回显数据过程中不支持提交数据
      const res = await HandleFetch("/rand.music", "GET", {
        sort: "热歌榜",
        mid: "862101001",
        format: "json",
      });
      // editForm = res  // 回显数据
      setCEditloading(false);
    } else if (mode === "import") {
      setOpenImport(true);
    } else if (mode === "delete") {
      modal.confirm({
        title: "提示",
        content: "确定删除记录？",
        okText: "确定",
        cancelText: "取消",
        onOk: async (close) => {
          console.log("删除, id=", id);
          const res = await HandleFetch("/rand.music", "GET", {
            sort: "热歌榜",
            mid: "862101001",
            format: "json",
          });
          return close();
        },
      });
    }
  };
  // 导入
  const handleImport = async () => {
    console.log("导入");
    const res = await HandleFetch("/rand.music", "GET", {
      sort: "热歌榜",
      mid: "862101001",
      format: "json",
    });
    setOpenImport(false);
  };
  // 关闭弹窗 编辑/导入
  const hideModal = async (v) => {
    // 编辑-确定
    if (
      !openImport &&
      Object.prototype.toString.call(v) === "[object Object]"
    ) {
      setCEditloading(true);
      console.log("编辑, v=", v);
      const res = await HandleFetch("/rand.music", "GET", {
        sort: "热歌榜",
        mid: "862101001",
        format: "json",
      });
      setCEditloading(false);
      handleSearch(); // 更新列表数据
    }
    setOpenEdit(false);
    setOpenImport(false);
  };

  // 导入-上传
  const uploadProps = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    },
    defaultFileList: [
      // {
      //   uid: "1",
      //   name: "xxx.png",
      //   status: "uploading",
      //   url: "http://www.baidu.com/xxx.png",
      //   percent: 33,
      // },
    ],
  };
  // const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <div>
      <Descriptions
        title="文章概要"
        bordered
        column={column}
        scroll={{
          y: 40,
        }}
      >
        <Descriptions.Item label="文章总数量" key="文章总数量">
          12
        </Descriptions.Item>
        <Descriptions.Item label="文章浏览总量" key="文章浏览总量">
          800
        </Descriptions.Item>
        <Descriptions.Item label="最高浏览量文章" key="最高浏览量文章">
          FT23234
        </Descriptions.Item>
      </Descriptions>
      <Divider></Divider>
      <div>
        <Form name="searchForm">
          <Row gutter={26} className={styles.serachSection}>
            {searchItem.map((item, index) => {
              return (
                <Form.Item label={item.label} key={index}>
                  {item.type === "input" && (
                    <Input
                      placeholder={item.placeholder}
                      onChange={(e) => {
                        handleSearchBack(e.target.value, item.key, index);
                      }}
                    />
                  )}
                  {item.type === "rangePicker" && (
                    <RangePicker
                      picker="month"
                      placeholder={item.placeholder}
                      onChange={(e) => {
                        handleSearchBack([e[0].$d, e[1].$d], item.key, index);
                      }}
                    />
                  )}
                  <></>
                </Form.Item>
              );
            })}
            <Button
              icon={<SearchOutlined />}
              loading={loading}
              onClick={handleSearch}
            >
              搜索
            </Button>
            <Button icon={<PlusOutlined />} onClick={() => openModal("import")}>
              导入md
            </Button>
          </Row>
        </Form>

        <Table
          dataSource={dataSource}
          pagination={pagination}
          onChange={handleTableChange}
        >
          <Column title="id" dataIndex="id" key="id" />
          <Column title="标题" dataIndex="title" key="title" />
          <Column title="更新时间" dataIndex="time" key="time" />
          <Column
            title="操作"
            key="action"
            render={(_, record) => (
              <Space size="middle" key={record}>
                <a onClick={() => openModal("edit", _)}>编辑</a>
                <a onClick={() => openModal("delete", _)}>删除</a>
              </Space>
            )}
          />
        </Table>
      </div>

      <Modal
        title="选择导入文件"
        open={openImport}
        onOk={handleImport}
        onCancel={hideModal}
        okText="确认"
        cancelText="取消"
      >
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Modal>

      {contextHolder}

      <CEditModal
        loading={cEditloading} // 加载状态
        open={openEdit} // 是否显示
        title="编辑文章概要" // 标题
        width="70%" // 弹窗宽度
        type="edit" // 操作类型
        span={6} // 表单布局
        maskClosable={false} // 点击遮罩层是否关闭
        initData={editForm} // 初始化数据
        formItems={[
          {
            type: "input",
            label: "id",
            key: "id",
          },
          {
            type: "input",
            label: "标题",
            key: "title",
          },
          {
            type: "datepicker",
            label: "更新时间",
            key: "date",
          },
        ]} // 所有的项
        // onBack={handleEditBack} // 数据项变化的回调
        onClose={hideModal}
      ></CEditModal>
    </div>
  );
}

export default Essay;
