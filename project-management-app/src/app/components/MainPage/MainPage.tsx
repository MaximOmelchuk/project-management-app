import { Grid } from "@mui/material";
import Board from "../Board/Board";

export default function MainPage() {
  const fakeBoards = [
    {
      title: "Example title 1",
      content: "Some example text for the first board",
      key: 1,
    },
    {
      title: "Example title 2",
      content: "Some example text for the second board.Some example text for the second board",
      key: 2,

    },
    {
      title: "Example title 3",
      key: 3,
    },
  ];
  return (
    <Grid container gap="1rem">
      {fakeBoards.map(
        (item: { title: string; content?: string }) => (
          <Board {...item} />
        )
      )}
    </Grid>
  );
}
