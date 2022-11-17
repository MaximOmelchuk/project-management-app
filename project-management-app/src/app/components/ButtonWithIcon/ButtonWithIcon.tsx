import { Button, SvgIconTypeMap } from "@mui/material"
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { MouseEventHandler } from "react";

interface Props {
  text: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ButtonWithIcon = ({text, onClick, Icon}: Props) => {
  return (
    <Button sx={{ textTransform: 'none' }} startIcon={<Icon />} onClick={onClick} color='inherit' disableElevation={true}>{text}</Button>
  )
}

export default ButtonWithIcon;