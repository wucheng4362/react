import React from 'react';
import { Popover, Button, Space } from '@universe-design/react';
import Cookies from 'js-cookie'
let isShow=true;
const handleClick=()=>{
  isShow=false;
}
const content = (
  <div>
    <p>帮助与支持</p>
    <p>功能介绍、应用案例、搭建指导，你需要的帮助资源都在这里</p>
    <button onClick={handleClick}>我知道了</button>
  </div>
);
export default () => (
  <Space size={'large'} wrap>
    <Popover content={content} trigger="hover" visible={true}>
      <Button>Hover me</Button>
    </Popover>
    <Popover content={content} title="Title" trigger="focus">
      <Button>Focus me</Button>
    </Popover>
    <Popover content={content} title="Title" trigger="click">
      <Button>Click me</Button>
    </Popover>
  </Space>
);

export const screenshot = {
  delay: 3000,
};
