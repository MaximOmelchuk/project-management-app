import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";

export function Loader() {
  return (
    <Container sx={{ display: "flex", justifyContent: "center", margin: "25% auto" }}>
      <CircularProgress disableShrink={false} size={70} sx={{color: '#fff', opacity: '0.7'}} />
    </Container>
  );
}
