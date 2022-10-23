import classnames from "classnames";
import { useContext } from "react";

import { MenuContext } from "./index";

export interface IMenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FunctionComponent<IMenuItemProps> = props => {
  const { onSelect, index: current } = useContext(MenuContext);
  const { index, className: cls, style, children, disabled } = props;
  const handleClick = () => {
    if (onSelect && !disabled && index && typeof index === "string") {
      onSelect(index);
    }
  };
  const classes = classnames("menu-item", cls, {
    disabled: disabled,
    active: index === current,
  });

  return (
    <li
      className={classes}
      style={style}
      onClick={handleClick}
      role="presentation"
    >
      {children}
    </li>
  );
};

MenuItem.displayName = "MenuItem";

export default MenuItem;
