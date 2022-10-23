import classnames from "classnames";
import { Children, cloneElement, useContext, useState } from "react";

import Icon from "../Icon";
import { Transition } from "../index";
import { MenuContext } from "./index";
import { IMenuItemProps } from "./MenuItem";

export interface ISubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FunctionComponent<ISubMenuProps> = props => {
  const { title, children, className: cls, index: current } = props;
  // 鼠标Hover -> open
  // 鼠标点击 -> open展开
  // 点击子元素 -> 设置子元素的active
  const { index, mode, defaultOpenKeys } = useContext(MenuContext);
  const isOpen =
    (mode === "vertical" && defaultOpenKeys?.includes(current + "")) || false;
  const [open, setOpen] = useState(isOpen);
  // 父index-子index-子子index
  const classes = classnames("menu-item submenu-item", cls, {
    open: open,
    active: index === current || index.split("-")[0] === current,
    vertical: mode === "vertical",
  });

  // 点击菜单事件处理
  const clickHandle =
    mode === "vertical"
      ? {
          onClick: (e: React.MouseEvent) => {
            e.preventDefault();
            setOpen(!open);
          },
        }
      : {};

  // 鼠标hover事件处理
  const hoverHandle =
    mode !== "vertical"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            e.preventDefault();
            setOpen(true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            e.preventDefault();
            setOpen(false);
          },
        }
      : {};

  const renderChildren = () => {
    // 1.父组件 -> 遍历children -> index -> React.Children.map
    return Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<IMenuItemProps>;
      if (childElement.type && childElement.type.displayName === "MenuItem") {
        // 2.children Item -> 添加index props -> React.cloneElement
        return cloneElement(childElement, {
          index: current + "-" + index,
        });
      } else {
        console.error("SubMenu Item must has a MenuItem Component");
      }
    });
  };
  return (
    <li className={classes} {...hoverHandle}>
      <div className="submenu-title" {...clickHandle}>
        {title}
        {children && (
          <Icon type="fa" icon="FaAngleDown" className="arrow ml-1"></Icon>
        )}
      </div>
      <Transition in={open} classNames="fade-top">
        <ul className="submenu">{renderChildren()}</ul>
      </Transition>
    </li>
  );
};

SubMenu.displayName = "SubMenu";

export default SubMenu;
