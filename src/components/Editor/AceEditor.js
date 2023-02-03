import React from 'react';

// Import Brace and the AceEditor Component
import brace from 'brace';
import AceEditor from 'react-ace';

// // Import a Mode (language)
// import 'brace/mode/java';

// // Import a Theme (okadia, github, xcode etc)
// import 'brace/theme/github';

export default class Ace extends React.Component {

    constructor(props, context) {
        super();
        // super(props, context);
        this.onChange = this.onChange.bind(this);//绑定this
        this.state={//可以在构造器中构造
            mode:props.mode,
            context:props.context
        }
        if(this.mode==null|| this.mode==undefined){
            this.setState({
                mode:'javascript'
            })
        }
       
        this.prevalue='提示:\
        \n1. 如果直接打开这个界面，会出现三个不同的保存按钮，保存到文章，保存到css或者Js插件\
        \n2. 如果是通过某个插件打开的编辑功能，只会出现一个保存按钮，保存到特定的css或者js，通过他们的id进行更新记录'
    }

    onChange(newValue) {
        console.log('change', newValue);
        
    }

    render() {
        return (
            <div>
                <AceEditor
                    mode={this.state.mode}
                    theme="github"
                    onChange={this.onChange}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{
                        $blockScrolling: true
                    }}

                    width='100%'
                    value={this.prevalue}
                />
            </div>
        );
    }
}