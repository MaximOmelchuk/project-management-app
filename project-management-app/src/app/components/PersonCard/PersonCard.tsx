import { useTranslation } from "react-i18next";

import { Link, List, ListItem, ListItemIcon, ListItemText, Paper, SvgIcon, Typography } from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import { ReactComponent as PersonIcon } from '../../assets/images/Person.svg'

export interface PersonCardProps {
  title: string,
  content: string[],
  link: string,
}

export default function PersonCard({ title, content, link }: PersonCardProps) {
  const { t } = useTranslation();

  return (
    <Link href={link} target="_blank" sx={{ textDecoration: "none" }}>
      <Paper
        sx={{
          width: "300px",
          minHeight: "365px",
          p: "1rem 1rem",
          boxSizing: "border-box",
          background: "rgb(44, 56, 126)",
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
        <Paper variant="outlined" sx={{ px: "0.5rem" }}>
          <List>
            {content.map(el => {
              return <ListItem sx={{ p: "0.1rem" }}>
                <ListItemIcon>
                  <FiberManualRecordIcon></FiberManualRecordIcon>
                </ListItemIcon>
                <ListItemText>{el}</ListItemText>
                </ListItem>
            })}
          </List>
        </Paper>

      </Paper>
    </Link>
  );
}
