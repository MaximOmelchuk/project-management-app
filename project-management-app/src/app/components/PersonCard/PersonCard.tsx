import { Link, Paper, SvgIcon, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { ReactComponent as PersonIcon } from '../../assets/Person.svg'

export default function PersonCard({
  title,
  content,
}: {
  title: string;
  content?: string;
  // link: string
}) {
  const { t } = useTranslation();

  return (
    <Link href="fds.com" target="_blank" sx={{ textDecoration: "none" }}>
      <Paper
        sx={{
          width: "300px",
          minHeight: "200px",
          p: "1rem 1rem",
          boxSizing: "border-box",
          background: "#5385b5",
          color: "#fff",
          position: "relative",
          transition: "0.2s",
          "&:hover": {
            transform: "scale(1.01)",
          },
        }}
        elevation={4}
      >
        <SvgIcon component={PersonIcon} inheritViewBox sx={{ color: "black", width: "100px", height: "100px" }} />
        <Typography variant="h6">
          {t(title)}
        </Typography>
        {content && (
          <Typography variant="body1">
            {t(content)}
          </Typography>
        )}
      </Paper>
    </Link>
  );
}
