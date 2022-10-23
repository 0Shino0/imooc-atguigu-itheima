import "./style.scss";

import classnames from "classnames";
import { Children, cloneElement, createContext, useState } from "react";

import { default as Item, IMenuItemProps } from "./MenuItem";
import { default as SubMenu, ISubMenuProps } from "./SubMenu";

// 1.使用classnames合并menu的公共类名
// 2.Menu触发onSelect -> 设置MenuItem action状态 -> 父子状态传递
// 状态管理：hooks -> useContext, 简单的状态管理方案

// type & interface
type MenuMode = "horizontal" | "vertical";
type MenuType = React.FunctionComponent<IMenuProps> & {
  Item: React.FunctionComponent<IMenuItemProps>;
  SubMenu: React.FunctionComponent<ISubMenuProps>;
};
type SelectFunction = (selectedIndex: string) => void;
export interface IMenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  defaultOpenKeys?: string[];
  onSelect?: SelectFunction;
}

interface IMenuContext {
  index: string;
  mode?: string;
  defaultOpenKeys?: string[];
  onSelect?: SelectFunction;
}

// code
export const MenuContext = createContext<IMenuContext>({ index: "0" });

const Menu: MenuType = props => {
  const {
    className: cls,
    mode,
    style,
    children,
    defaultIndex,
    defaultOpenKeys,
    onSelect,
  } = props;
  const classes = classnames("menu", cls, {
    vertical: mode === "vertical",
  });
  const [current, setCurrent] = useState(defaultIndex);
  const handleClick = (index: string) => {
    setCurrent(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  const value: IMenuContext = {
    index: current ? current : "0",
    mode,
    defaultOpenKeys,
    onSelect: handleClick,
  };

  const renderChildren = () => {
    // 1.父组件 -> 遍历children -> index -> React.Children.map
    return Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<IMenuItemProps>;
      if (
        (childElement.type && childElement.type.displayName === "MenuItem") ||
        childElement.type.displayName === "SubMenu"
      ) {
        // 2.children Item -> 添加index props -> React.cloneElement
        return cloneElement(childElement, {
          index: index + "",
        });
      } else {
        console.error("Menu Item must has a MenuItem or SubMenu Component");
      }
    });
  };

  return (
    // 需要去掉index属性：不方便手动设置，可能重复
    // 考虑树型数据的唯一标识的机制： 父index-子index-子子index .... -> index: string

    <ul className={classes} style={style} data-testid="custom-menu">
      <MenuContext.Provider value={value}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
  defaultOpenKeys: [],
};

// todo PropTypes -> 设置的defaultIndex等进行校验

Menu.Item = Item;
Menu.SubMenu = SubMenu;

export default Menu;
