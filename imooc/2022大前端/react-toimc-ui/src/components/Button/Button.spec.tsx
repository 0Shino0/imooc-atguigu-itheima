import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import Button, { ButtonProps } from "./index";

const defaultBtnProps: ButtonProps = {
  onClick: jest.fn(),
};

const testBtnProps: ButtonProps = {
  type: "primary",
  size: "large",
  loading: true,
  className: "toimc",
  // onClick: jest.fn(),
};

const linkBtnProps: ButtonProps = {
  type: "link",
  href: "http://toimc.com",
};

const disabledBtnProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

describe("Button测试用例集", () => {
  test("默认的Button渲染", () => {
    render(<Button {...defaultBtnProps}>HelloButton</Button>);
    // 1.渲染是否成功 -> Button DOM -> Text
    const element = screen.getByText("HelloButton") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("BUTTON");
    // 2.判断是否有默认的ClassName
    expect(element).toHaveClass("btn btn-default");
    expect(element.disabled).toBeFalsy();

    // 3.模拟用户点击 -> 验证是否触发点击事件
    fireEvent.click(element);
    expect(defaultBtnProps.onClick).toHaveBeenCalled();
    expect(defaultBtnProps.onClick).toHaveBeenCalledTimes(1);
    fireEvent.click(element);
    expect(defaultBtnProps.onClick).toHaveBeenCalledTimes(2);
  });

  test("默认的Button渲染，查验Props属性", () => {
    render(<Button>HelloButton</Button>);
    const element = screen.getByText("HelloButton") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("BUTTON");
    // expect(element.tagName).not.toBe("A");
    expect(element).not.toHaveClass("btn-primary");
    expect(element).not.toHaveClass("loading");
    expect(element).toHaveClass("btn btn-default");
  });

  test("设置Button的Props，查验Props是否生效", () => {
    render(<Button {...testBtnProps}>HelloButton</Button>);
    const element = screen.getByText("HelloButton") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("BUTTON");
    expect(element).toHaveClass("btn btn-primary btn-large loading");
    expect(element).toHaveClass("toimc");
    expect(element).not.toHaveClass("btn-default");
  });

  test("默认的Button渲染，type属性是链接的情况", () => {
    render(<Button {...linkBtnProps}>HelloButton</Button>);
    const element = screen.getByText("HelloButton") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("A");
  });

  test("禁用的Button渲染", () => {
    render(<Button {...disabledBtnProps}>HelloButton</Button>);
    const element = screen.getByText("HelloButton") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("BUTTON");
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledBtnProps.onClick).not.toHaveBeenCalled();
  });
});
