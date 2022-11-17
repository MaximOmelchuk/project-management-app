import { Grid, Typography, Button } from "@mui/material";
import { useGetBoardsListQuery } from "../../services/service";
import Board from "../Board/Board";
import Column from "../Column/Column";
import InputModal from "../InputModal/InputModal";

export default function MainPage() {
  const { data, isSuccess } = useGetBoardsListQuery(null);
  // const fakeBoards = [
  //   {
  //     title: "Example title 1",
  //     content: "Some example text for the first board",
  //     key: 1,
  //   },
  //   {
  //     title: "Example title 2",
  //     content:
  //       "Some example text for the second board.Some example text for the second board",
  //     key: 2,
  //   },
  //   {
  //     title: "Example title 3",
  //     key: 3,
  //   },
  // ];
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
      <Button>Add new board</Button>
      <Grid container gap="1rem">
        {isSuccess &&
          data.map((item: { title: string }) => <Board {...item} />)}
        {/* <InputModal
          confirmHandler={() => alert("yes")}
          closeHandler={() => alert("close")}
          title="Input modal"
          inputsContent={["First input"]}
        /> */}
        <Column
          data={{ _id: "dfdf", title: "New Title", order: 1, boardId: "sdsds" }}
        />
      </Grid>
    </>
  );
}
