import { Grid, Typography } from "@mui/material";
import Board from "../Board/Board";
import InputModal from "../InputModal/InputModal";

export default function MainPage() {
  const fakeBoards = [
    {
      title: "Example title 1",
      content: "Some example text for the first board",
      key: 1,
    },
    {
      title: "Example title 2",
      content:
        "Some example text for the second board.Some example text for the second board",
      key: 2,
    },
    {
      title: "Example title 3",
      key: 3,
    },
  ];
  return (
    <>
      <Typography
        variant="h4"
        align="left"
        sx={{ mb: 2, fontWeight: "600" }}
        color="#fff"
      >
        YOUR BOARDS
      </Typography>
      <Grid container gap="1rem">
        {fakeBoards.map((item: { title: string; content?: string }) => (
          <Board {...item} />
        ))}
        <InputModal
          confirmHandler={() => alert("yes")}
          closeHandler={() => alert("close")}
          title="Input modal"
          inputsContent={["First input"]}
        />
      </Grid>
    </>
  );
}
