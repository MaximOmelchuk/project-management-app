import { Container, Toolbar, AppBar, Grid, Link } from "@mui/material"
import RssIcon from "../RSSIcon";

const Footer = () => {
  return (
    <AppBar position="static" sx={{ mt: "auto", padding: "15px 0" }} component="footer">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid container spacing={2} alignItems="center" direction={{ xs: 'column', sm: 'row' }} justifyContent={{ xs: 'center', sm: 'space-between' }}>
            <Grid item order={{ xs: 2, sm: 0 }}>
              <div>© 2022</div>
            </Grid>
            <Grid item>
              <Grid container spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
                <Grid item>
                  <Link href="https://github.com/MaximOmelchuk" sx={{ color: "inherit" }}>MaximOmelchuk</Link>
                </Grid>
                <Grid item>
                  <Link href="https://github.com/anton13602" sx={{ color: "inherit" }}>Anton13602</Link>
                </Grid>
                <Grid item>
                  <Link href="https://github.com/gavrilenkoartem038" sx={{ color: "inherit" }}>gavrilenkoartem038</Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <RssIcon />
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  )
};

export default Footer;