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

    //请求数据
    function to_get(e_size, e_page, title, id, time_begin, time_end) {
        //todo 参数需要改
        asy_get("essay/getP", `size=${e_size}&page=${e_page }
  ${title != undefined && title != "" && title != null ? "&title=" + title : ""}
  ${id != undefined && id != "" && id != null ? "&id=" + id : ""}`, data => {

            if (data.code == "未知") alert("请求出错")
            else {
                //设置信息
                let list = []
                let re_list = data.data.list;
                // todo 补充符合的代码
                // for (let i = 0; i < re_list.length; i++) {
                //     let v = re_list[i];
                //     console.log(v)
                //     list.push({
                //         id: v.id,
                //         title: v.title,
                //         time: "00",
                //         type: v.type_id
                //     })
                // }
                // setDataSource(list)

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
        // asy_get("essay/get_static", "", data => {
        //
        //     if (data.code == "未知") alert("请求出错")
        //     else {
        //         let rein = data.data;
        //         setInfo({
        //             essay_total: rein.文章总数量,
        //             max_click: rein.最高浏览文章,
        //             essay_look_click: rein.文章浏览总量
        //         })
        //
        //     }
        // });

        to_get(size, page);

    }, []);// 仅在 []内变量  发生变化时，重新订阅

    //搜索
    function search() {
        // let id = document.getElementById("essay_id").value;
        // let title = document.getElementById("essay_title").value;
        // to_get(5, 1, title, id);
    }

    //下一页
    const onChange = (pageNumber) => {
        setPage(pageNumber)
        let id = document.getElementById("essay_id").value;
        let title = document.getElementById("essay_title").value;
        to_get(size, page, title, id);
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
                <Pagination defaultCurrent={6} total={500} />
            </div>

        </div>

    );
}

export default Comment;


