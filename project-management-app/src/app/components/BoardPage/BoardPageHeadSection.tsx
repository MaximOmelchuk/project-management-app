import { useNavigate } from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useTranslation } from "react-i18next";

type BoardPageHeadSectionProps = {
  contentArr: string[];
};

export default function BoardPageHeadSection({
  contentArr,
}: BoardPageHeadSectionProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const backClickHandler = () => {
    navigate(-1);
  };

  return contentArr.length ? (
    <Grid color="#fff" sx={{ maxWidth: "30rem", mb: 2 }}>
      <Grid container justifyContent="left" gap="1rem" sx={{ mb: 0.7 }}>
        <Button
          variant="outlined"
          size="large"
          sx={{
            background: "#070e4a",
            "&:hover": { opacity: ".8", background: "#070e4a" },
          }}
          startIcon={<ArrowBackIosIcon />}
          onClick={backClickHandler}
        >
          {t("boardPageContent.title")}
        </Button>
        <Typography variant="h4" sx={{ display: "inline-Block" }}>
          {contentArr[0]}
        </Typography>
      </Grid>
      <Typography align="left" variant="subtitle1" sx={{ opacity: ".7" }}>
        {contentArr[1]}
      </Typography>
    </Grid>
  ) : null;
}
