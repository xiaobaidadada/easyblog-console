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
import React, { useState, useEffect } from 'react';
import asy_get from '../config/requests'

const { RangePicker } = DatePicker;
const { Column, ColumnGroup } = Table;


function Comment() {
    // const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const [page, setPage] = useState(1);//默认是第一页的前面
    const [size, setSize] = useState(5);
    const [total, setTotal] = useState(100);

    const [dataSource, setDataSource] = useState([
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
    ]);
    const [info, setInfo] = useState({
        total: 100,
        title: "无",
    });

    //请求数据
    function to_get(e_size, e_page, title, id, context,time_begin, time_end) {
        //todo 参数需要改
        asy_get("comment/getCP", `size=${e_size}&page=${e_page }
  ${title != undefined && title != "" && title != null ? "&title=" + title : ""}
  ${id != undefined && id != "" && id != null ? "&id=" + id : ""}
  ${context != undefined && context != "" && context != null ? "&context=" + context : ""}`, data => {

            if (data.code == "未知") alert("请求出错")
            else {
                //设置信息
                let list = []
                let re_list = data.data.list;
                // todo 补充符合的代码
                for (let i = 0; i < re_list.length; i++) {
                    let v = re_list[i];
                    list.push({
                        id: v.id,
                        // eaasy_title: v.title,
                        time: "00",
                        context: v.context
                    })
                }
                setDataSource(list)

                //设置分页
                let p = data.data;
                console.log(p)
                setPage(p.page);
                setSize(p.size);
                setTotal(p.total);

            }
        })
    }

    //组件挂载加载
    useEffect(() => {
        asy_get("comment/get_static", "", data => {
        
            if (data.code == "未知") alert("请求出错")
            else {
                let rein = data.data;
                setInfo({
                    title: rein.title,
                    total: rein.total,
                })
        
            }
        });

        // 首次请求列表数据
        to_get(size, page);

    }, []);// 仅在 []内变量  发生变化时，重新订阅

    //搜索
    function search() {
        let id = document.getElementById("id").value;
        let title = document.getElementById("essay_title").value;
        let context = document.getElementById("context").value;
        to_get(size, page, title, id,context);
    }

    //下一页
    const onChange = (pageNumber) => {
        setPage(pageNumber)
        search();
    };

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
                <Descriptions.Item label="评论总数">{info.total}</Descriptions.Item>
                <Descriptions.Item label="评论最多文章">{info.title}</Descriptions.Item>



            </Descriptions>
            <Divider>*</Divider>
            <div>
                <Row gutter={26}>
                    <Col span={5}>
                        <Input placeholder="id" id='id' />
                    </Col>
                    <Col span={5}>
                        <Input placeholder="内容" id='context' />
                    </Col>
                    <Col span={5}>
                        <Input placeholder="文章标题" id='essay_title' />
                    </Col>
                    <Col span={6}>
                        <RangePicker picker="month" />
                    </Col>
                    <Col span={3}>
                        <Button icon={<SearchOutlined />} onClick={search} >搜索</Button>

                    </Col>

                </Row>
                {/* columns={columns}  */}
                <Table dataSource={dataSource} pagination={false} >
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
                <Pagination defaultCurrent={page} total={total} onChange={onChange} />
            </div>

        </div>

    );
}

export default Comment;


