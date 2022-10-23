/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";

import Menu, { IMenuProps } from "./index";

// 触发事件
// 加入断言

const genMenuSkeleton = (props: IMenuProps) => {
  return (
    <Menu {...props}>
      <Menu.Item>activeTxt</Menu.Item>
      <Menu.Item disabled>disabledTxt</Menu.Item>
      <Menu.SubMenu title="子菜单标题">
        <Menu.Item>选项1</Menu.Item>
        <Menu.Item>选项2</Menu.Item>
        <Menu.Item>选项3</Menu.Item>
      </Menu.SubMenu>
      <Menu.Item>about</Menu.Item>
      <Menu.Item>菜单子项</Menu.Item>
    </Menu>
  );
};

const testMenuProps: IMenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test",
};

const testVerticalMenuProps: IMenuProps = {
  mode: "vertical",
  defaultIndex: "0",
  defaultOpenKeys: ["2"],
};

let menuElement: HTMLElement;
let activeElement: HTMLElement;
let disabledElement: HTMLElement;
describe("水平菜单测试集", () => {
  beforeEach(() => {
    // 准备组件
    render(genMenuSkeleton(testMenuProps));
    // 渲染组件 -> 加入断言
    menuElement = screen.getByTestId("custom-menu");
    activeElement = screen.getByText("activeTxt");
    disabledElement = screen.getByText("disabledTxt");
  });

  test("默认的菜单加载", () => {
    expect(menuElement).toBeInTheDocument();
    expect(activeElement).toBeInTheDocument();
    expect(disabledElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("menu test");
  });

  test("默认的菜单加载，点击事件的反馈是否正常", () => {
    const clickItem = screen.getByText("about");
    expect(clickItem).not.toHaveClass("active");
    fireEvent.click(clickItem);
    expect(clickItem).toHaveClass("active");
    expect(activeElement).not.toHaveClass("active");
    expect(testMenuProps.onSelect).toHaveBeenCalledWith("3");
    fireEvent.click(disabledElement);
    expect(testMenuProps.onSelect).toHaveBeenCalledTimes(1);
    expect(testMenuProps.onSelect).not.toHaveBeenCalledWith("1");
  });

  test("默认的菜单加载，hover事件是否反馈正常", () => {
    let hoverItem = screen.queryByText("选项1");
    expect(hoverItem).not.toBeInTheDocument();
    const subMenuTitle = screen.getByText("子菜单标题");
    fireEvent.mouseEnter(subMenuTitle);
    hoverItem = screen.queryByText("选项1") as HTMLElement;
    expect(hoverItem).toBeInTheDocument();
    fireEvent.click(hoverItem);
    expect(hoverItem).toHaveClass("active");
    expect(activeElement).not.toHaveClass("active");
    expect(testMenuProps.onSelect).toHaveBeenCalledWith("2-0");
  });

  test("默认的子菜单项加载正常", () => {
    expect(menuElement.querySelectorAll("li")).toHaveLength(5);
    expect(activeElement).toHaveClass("menu-item active");
    expect(disabledElement).toHaveClass("menu-item disabled");
  });
});
describe("垂直菜单测试集", () => {
  beforeEach(() => {
    render(genMenuSkeleton(testVerticalMenuProps));
    menuElement = screen.getByTestId("custom-menu");
  });
  test("垂直项设置正常后，菜单加载正常", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("menu vertical");
    // 默认的展开项
    expect(menuElement.querySelectorAll("li")).toHaveLength(8);
  });

  test("垂直项设置正常后，点击菜单展开正常", async () => {
    let clickItem = screen.queryByText("选项1");
    expect(clickItem).toBeInTheDocument();
    const subMenuTitle = screen.getByText("子菜单标题");
    fireEvent.click(subMenuTitle);
    // Wait until the callback does not throw an error. In this case, that means
    // it'll wait until the mock function has been called once.
    await waitFor(() => {
      clickItem = screen.queryByText("选项1");
      return expect(clickItem).not.toBeInTheDocument();
    });
    fireEvent.click(subMenuTitle);
    await waitFor(() => {
      clickItem = screen.queryByText("选项1") as HTMLElement;
      return expect(clickItem).toBeInTheDocument();
    });
    clickItem && fireEvent.click(clickItem);
    expect(clickItem).toHaveClass("active");
  });

  test("设置了默认的展开项后，加载正常展开", () => {
    // 默认的展开项
    expect(menuElement.querySelectorAll("li")).toHaveLength(8);
    expect(screen.getByText("选项1")).toBeInTheDocument();
  });
});
