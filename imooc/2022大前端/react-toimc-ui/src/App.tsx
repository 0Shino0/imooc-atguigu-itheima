import { Button, Icon, Menu } from "@/components";

export default function App() {
  return (
    <main className="semi-always-light">
      <h3>SubMenu组件</h3>
      <Menu
        className={"test"}
        mode="vertical"
        defaultIndex="2-0"
        defaultOpenKeys={["2"]}
        onSelect={val => {
          console.log(val);
        }}
      >
        <Menu.Item>首页</Menu.Item>
        <Menu.Item disabled>禁止菜单</Menu.Item>
        <Menu.SubMenu title="子菜单标题">
          <Menu.Item>选项1</Menu.Item>
          <Menu.Item>选项2</Menu.Item>
          <Menu.Item>选项3</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item>关于页面</Menu.Item>
        <Menu.Item>菜单子项</Menu.Item>
      </Menu>
      <h3>Menu组件</h3>
      {/* <Menu
        className={"test"}
        mode="vertical"
        onSelect={val => {
          console.log(val);
        }}
      >
        <Menu.Item index={0}>1</Menu.Item>
        <Menu.Item index={1} disabled>
          2
        </Menu.Item>
        <Menu.Item index={2}>3</Menu.Item>
        <Menu.Item index={3}>4</Menu.Item>
      </Menu> */}
      <h3>Icon组件</h3>
      <Icon type="bs" icon="BsFillArrowDownLeftSquareFill" color="red"></Icon>
      <Icon
        custom
        url="//at.alicdn.com/t/font_1791095_6urvhbxaj73.css"
        icon="qian"
        size="44px"
        style={{ color: "red" }}
      ></Icon>
      <h3>Button组件</h3>
      <Button
        id="app1"
        disabled
        onClick={() => {
          console.log("button click");
        }}
      >
        普通的Button
      </Button>
      <Button size="small">Small Btn</Button>
      <Button size="large">Large Btn</Button>
      <Button type="danger">danger Btn</Button>
      <Button type="primary" loading>
        primary Btn
      </Button>
      <Button type="default">default Btn</Button>
      <Button type="default" loading>
        default loading Btn
      </Button>
      <Button href="http://www.imooc.com" target="_blank" type="link">
        链接的Button
      </Button>
      <Button href="http://www.imooc.com" target="_blank" type="link" disabled>
        disabled 链接的Button
      </Button>
    </main>
  );
}
