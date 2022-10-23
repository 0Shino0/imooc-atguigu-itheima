import classnames from "classnames";
import * as AI from "react-icons/ai";
import * as BI from "react-icons/bi";
import * as BS from "react-icons/bs";
import * as CG from "react-icons/cg";
import * as DI from "react-icons/di";
import * as FA from "react-icons/fa";
import * as FC from "react-icons/fc";
import * as FI from "react-icons/fi";
import * as GI from "react-icons/gi";
import * as GO from "react-icons/go";
import * as GR from "react-icons/gr";
import * as HI from "react-icons/hi";
import * as IM from "react-icons/im";
import * as IO from "react-icons/io";
import * as IO5 from "react-icons/io5";
import * as MD from "react-icons/md";
import * as RI from "react-icons/ri";
import * as SI from "react-icons/si";
import * as TI from "react-icons/ti";
import * as VSC from "react-icons/vsc";
import * as WI from "react-icons/wi";

const customCache = new Set<string>();

const IconTypeMap: { [key: string]: any } = {
  ai: AI,
  bs: BS,
  bi: BI,
  di: DI,
  fi: FI,
  fc: FC,
  fa: FA,
  gi: GI,
  go: GO,
  gr: GR,
  hi: HI,
  im: IM,
  io: IO,
  io5: IO5,
  md: MD,
  ri: RI,
  si: SI,
  ti: TI,
  vsc: VSC,
  wi: WI,
  cg: CG,
};

function isValidCustomScriptUrl(url: string): boolean {
  return Boolean(
    typeof url === "string" && url.length && !customCache.has(url)
  );
}

function loadUrl(url: string): void {
  if (isValidCustomScriptUrl(url)) {
    const link = document.createElement("link");
    link.href = url;
    link.rel = "stylesheet";
    customCache.add(url);
    document.body.appendChild(link);
  }
}

// console.log(Object.keys(FA));

export interface IIconProps {
  type?: keyof typeof IconTypeMap; // fa, bs
  color?: string;
  size?: string | number;
  className?: string;
  style?: React.CSSProperties;
  attr?: { [key: string]: string };
  title?: string;
  icon?: string;
  custom?: boolean;
  url?: string;
  prefix?: string;
}

export default function Icon(props: IIconProps) {
  // 1.需要判断custom url 属性 -> url -> 网址正则
  // 2.存储url -> 加载link -> 加载对应的css
  // 3.返回i -> class & prefix & icon
  const {
    icon,
    type,
    custom,
    url,
    className: cls,
    prefix,
    size,
    color,
    style,
    ...rest
  } = props;
  let Item;
  if (icon && type) {
    // type -> FA
    // 1.获取对应的type的模块 -> icons
    Item = IconTypeMap[type][icon];
    return <Item {...props}></Item>;
  } else if (custom && url) {
    // 自定义的iconfont
    loadUrl(url);
    const iconCls = classnames(
      "iconfont",
      prefix ? `${prefix}-${icon}` : `iconfont-${icon}`
    );
    const classes = cls ? cls : iconCls;
    const iconProp = {
      style: {
        fontSize: size,
        color,
        ...style,
      },
      ...rest,
    };
    return <i className={classes} {...iconProp}></i>;
  }
  return <></>;
}

Icon.defaultProps = {
  size: "1.2rem",
  // type: "fa",
  // color: "#000",
  // icon: "FaAppStorexxxx",
};

Icon.propTypes = {
  // 2.判断type, icon是否合法 -> icons[特定的icon] -> 能否取的到
  icon: function (props: IIconProps, propName: string, componentName: string) {
    let keys = [];
    if (props.type && props.icon) {
      keys = Object.keys(IconTypeMap[props.type]);
      if (!keys.includes(props.icon as string)) {
        return new Error(
          "Invalid prop `" +
            propName +
            "` supplied to" +
            " `" +
            componentName +
            "`. Validation failed."
        );
      }
    }
  },
  url: function (props: IIconProps, propName: string, componentName: string) {
    if (props.url && props.custom) {
      const regUrl =
        /^(\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i;
      if (!regUrl.test(props.url)) {
        return new Error(
          "Invalid iconfont Url supplied to" +
            " `" +
            componentName +
            "`. Validation failed."
        );
      }
    }
  },
};
