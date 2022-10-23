import "./style.scss";

import classnames from "classnames";

// PureComponent -> 没有shouldComponentUpdate
// FunctionComponent -> hooks

export type ButtonSize = "large" | "default" | "small";
export type ButtonType = "primary" | "default" | "danger" | "link";

interface IButtonProps {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  size?: ButtonSize;
  type?: ButtonType;
  href?: string;
  children: React.ReactNode;
}

type NativeButtonProps = IButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLElement>, "type">;
type AnchorButtonProps = IButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLElement>, "type">;

// Partial -> 类似于?，代表所有的类型都是一个可选的类型
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FunctionComponent<ButtonProps> = props => {
  const { className, disabled, loading, size, type, href, children, ...rest } =
    props;

  const classes = classnames("btn", className, {
    [`btn-${type}`]: type,
    [`btn-${size}`]: size,
    disabled: type === "link" && disabled,
    loading: loading,
  });
  if (type === "link" && href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  } else {
    return (
      <button disabled={disabled} className={classes} {...rest}>
        {loading && (
          <span className="pr-1">
            <i className="fas fa-spinner pin"></i>
          </span>
        )}
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  type: "default",
};

export default Button;
