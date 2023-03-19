import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/mode/css';
import 'brace/mode/markdown';
import 'brace/theme/github';


export default class Ace extends React.Component {

    constructor(props) {
        super();

        this.onChange = this.onChange.bind(this);//绑定this

        if (this.mode == null || this.mode == undefined) {
            this.setState({
                mode: 'javascript'
            })
        }

        this.prevalue = '提示:\
        \n1. 如果直接打开这个界面，会出现三个不同的保存按钮，保存到文章，保存到css或者Js插件\
        \n2. 如果是通过某个插件打开的编辑功能，只会出现一个保存按钮，保存到特定的css或者js，通过他们的id进行更新记录'
    }

    //设置插入的值；
    onChange(newValue) {

        localStorage.setItem('md_context', newValue);

    }

    render() {
        return (
            <div>
                <AceEditor
                    mode={this.props.mode}
                    theme="github"
                    onChange={this.onChange}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{
                        $blockScrolling: true
                    }}

                    width='100%'
                    value={this.prevalue}
                />
                {this.props.mode}
            </div>
        );
    }
}