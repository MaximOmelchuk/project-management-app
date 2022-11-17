import React from "react";
import { useScrollTrigger } from "@material-ui/core";

interface Props {
  children: React.ReactElement;
  window?: () => Window;
}

const ScrollHandler = ({ window, children }: Props) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    style: {
      backgroundColor: trigger ? "#1976d2" : "black",
      transition: trigger ? "0.3s" : "0.5s",
    }
  });
};

const ScrollToColor = (props: Props) => {
  return <ScrollHandler {...props}>{props.children}</ScrollHandler>;
};

export default ScrollToColor;