import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";

export function Loader({flag} : {flag: boolean}) {
  return (
    <Container sx={{ display: "flex", justifyContent: "center", margin: "25% auto" }}>
      <CircularProgress disableShrink={flag} size={70} sx={{color: 'red', opacity: '0.7'}} />
    </Container>
  );
}
