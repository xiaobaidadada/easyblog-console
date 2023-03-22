
import { Descriptions } from 'antd';
import { Divider } from 'antd';
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
  Table, Tag
} from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Pagination } from 'antd';
import { Switch } from 'antd';
import React, { useState, useEffect } from 'react';

const dataSource = [
  {
    id: '1',
    title: '关于正则表达式',
    time: '2021-01-03',
    action: '哈哈',
    on: true,
  },
  {
    id: '2',
    title: 'TCP协议',
    time: '2023-01-03',
    action: '看看',
    on: false,
  },
];
const { RangePicker } = DatePicker;
const { Column, ColumnGroup } = Table;

/**
 * ture 首页， false 博客 ；
 */
let checkbox = true;

function Css() {

  // const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));



  const on_switch = (checked) => {
    checkbox = checked;
    console.log(`switch to ${checkbox}`);
  };

  return (
    <div>
      <Descriptions
        title="CSS插件"
        bordered
        column={{
          xxl: 4,
          xl: 3,
          lg: 3,
          md: 3,
          sm: 2,
          xs: 1,
        }}
      >
        <Descriptions.Item label="插件数量">12</Descriptions.Item>
        <Descriptions.Item label="正在使用">Prepaid</Descriptions.Item>


      </Descriptions>
      <Divider>*</Divider>
      <div>
        <Row gutter={26}>
          <Col span={2}>
            <Input placeholder="id" />
          </Col>
          <Col span={6}>
            <Input placeholder="标题" />
          </Col>
          <Col span={6}>
            <RangePicker picker="month" />
          </Col>
          <Col span={3}>
            <Button icon={<SearchOutlined />}>搜索</Button>

          </Col>
          <Col span={3}>
            <Switch defaultChecked={true} checkedChildren="首页" unCheckedChildren="博客" onChange={on_switch} />
          </Col>
          <Col span={2}>
            <Button icon={<PlusOutlined />}>导入css</Button>

          </Col>
        </Row>
        {/* columns={columns}  */}
        <Table dataSource={dataSource} >
          <Column title="id" dataIndex="id" key="id" />
          <Column title="标题" dataIndex="title" key="title" />
          <Column title="更新时间" dataIndex="time" key="time" />
          <Column

            render={(record) => (
              <Space size="middle">
                <Switch defaultChecked={record.on}  />
              </Space>
            )}
          />
          <Column
            title="Action"
            render={(record) => (
              <Space size="middle">
                <a>编辑 {record.action}</a>
                <a>删除</a>
              </Space>
            )}
          />
        </Table>
        <Pagination defaultCurrent={6} total={500} />
      </div>

    </div>
  );
}

export default Css;


