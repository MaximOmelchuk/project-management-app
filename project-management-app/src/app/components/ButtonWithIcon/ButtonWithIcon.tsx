import { Button, SvgIconTypeMap, SxProps } from "@mui/material"
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface Props {
  text: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  onClick?: () => void;
  styleProps?: SxProps;
}

const ButtonWithIcon = ({text, onClick, Icon, styleProps}: Props) => {
  return (
    <Button sx={{ textTransform: 'none', ...styleProps }} startIcon={<Icon />} onClick={onClick} color='inherit' disableElevation={true} >{text}</Button>
  )
}

export default ButtonWithIcon;