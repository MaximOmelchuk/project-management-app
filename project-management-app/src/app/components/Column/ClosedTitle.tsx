import { Grid, Button, Typography, IconButton, useMediaQuery } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type ClosedTitleProps = {
  titleSwitchHandler: () => void;
  deleteColumnHandler: () => void;
  backUpInput: string;
};

export default function ClosedTitle({
  titleSwitchHandler,
  backUpInput,
  deleteColumnHandler,
}: ClosedTitleProps) {

  const matches = useMediaQuery("(min-width:500px)");

  const style = {
    width: matches ? "80%" : '70%',
    color: "#fff",
    justifyContent: "left",
    textTransform: "none",
    "&:hover": {
      border: "2px solid #fff",
    },
  };

  return (
    <Grid container item direction="row">
      <Button disableElevation sx={style} onClick={titleSwitchHandler}>
        <Typography variant="h6" align="left" sx={{ overflow: "hidden" }}>
          {backUpInput}
        </Typography>
      </Button>
      <IconButton onClick={deleteColumnHandler}>
        <DeleteIcon fontSize="large" htmlColor="#fff" />
      </IconButton>
    </Grid>
  );
}
