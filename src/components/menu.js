import React, { Component } from "react";

class Test extends Component {
  constructor(props, context) {
    super(props);
  }
  render() {
    return (
     <div>
       <div style={div1}>123</div>
       <div style="background-color:red;" />
     </div>
    );
  }
}
export default Test;

var div1 = {
    width: "300px",
    margin: "30px auto",
    backgroundColor: "#44014C",  //驼峰法
    minHeight: "200px",
    boxSizing: "border-box"
  };