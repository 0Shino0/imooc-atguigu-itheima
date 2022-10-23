import "./style.scss";

import { CSSTransition } from "react-transition-group";

interface ITransitionProps {
  in: boolean;
  timeout?: number;
  classNames?: string;
}

const Transition: React.FunctionComponent<ITransitionProps> = props => {
  const { children, in: inFlag, timeout, ...rest } = props;
  return (
    <CSSTransition timeout={timeout || 400} in={inFlag} unmountOnExit {...rest}>
      {children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  timeout: 400,
  classNames: "fade-top",
};

export default Transition;
