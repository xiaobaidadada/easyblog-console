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

const { RangePicker } = DatePicker;
const { Column, ColumnGroup } = Table;
const dataSource = [
    {
        id: '1',
        eaasy_title: '关于正则表达式',
        time: '2021-01-03',
        context: '哈哈'
    },
    {
        id: '2',
        eaasy_title: 'TCP协议',
        time: '2023-01-03',
        context: '不是吧'
    },
];

function Comment() {
    // const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    return (
        <div>
            <Descriptions
                title="文章概要"
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
                <Descriptions.Item label="评论总数">12</Descriptions.Item>
                <Descriptions.Item label="评论最多文章">Prepaid</Descriptions.Item>



            </Descriptions>
            <Divider>*</Divider>
            <div>
                <Row gutter={26}>
                    <Col span={5}>
                        <Input placeholder="id" />
                    </Col>
                    <Col span={5}>
                        <Input placeholder="内容" />
                    </Col>
                    <Col span={5}>
                        <Input placeholder="文章标题" />
                    </Col>
                    <Col span={6}>
                        <RangePicker picker="month" />
                    </Col>
                    <Col span={3}>
                        <Button icon={<SearchOutlined />}>搜索</Button>

                    </Col>

                </Row>
                {/* columns={columns}  */}
                <Table dataSource={dataSource} >
                    <Column title="id" dataIndex="id" key="id" />
                    <Column title="内容" dataIndex="context" key="context" />
                    <Column title="文章标题" dataIndex="eaasy_title" key="eaasy_title" />
                    <Column title="时间" dataIndex="time" key="time" />
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

export default Comment;


