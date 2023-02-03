
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

const dataSource = [
  {
    id: '1',
    title: '关于正则表达式',
    time: '2021-01-03',
  },
  {
    id: '2',
    title: 'TCP协议',
    time: '2023-01-03',
  },
];
const { RangePicker } = DatePicker;
const { Column, ColumnGroup } = Table;


function Css() {
  
    // const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
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
        {/* <Descriptions.Item label="最高浏览量文章">18:00:00</Descriptions.Item> */}
        {/* <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
      <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
      <Descriptions.Item label="Official">$60.00</Descriptions.Item>
      <Descriptions.Item label="Config Info">
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
      </Descriptions.Item> */}

      </Descriptions>
      <Divider>*</Divider>
      <div>
        <Row gutter={26}>
          <Col span={5}>
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
            title="Action"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <a>编辑 </a>
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


