import { Link, SvgIcon } from "@mui/material";
import { ReactComponent as RSSIcon } from '../assets/RSS.svg'

const RssIcon = () => {
  return (
    <Link href="https://rs.school/react/" target="_blank">
      <SvgIcon component={RSSIcon} inheritViewBox sx={{ color: "black", width: "100px" }} />
    </Link>
  );
}

export default RssIcon;