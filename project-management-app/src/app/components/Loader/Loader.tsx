import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";

export function Loader({ isOpen } : {isOpen: boolean}) {
  return (
    <Container sx={{ display: "flex", justifyContent: "center", margin: "30% auto" }}>
      <CircularProgress disableShrink={isOpen} thickness={2.8} size={70} sx={{color: '#fff', opacity: '0.7'}} />
    </Container>
  );
}
