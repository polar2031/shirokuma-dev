import { Box, Grid, Link, Typography } from "@mui/material";
import { Fragment } from "react";
import { variable } from "../site-config.js";

function createExternalLink(name: string, url: string) {
  return (
    <Link key={name} href={url} underline="none" color="primary.contrastText">
      {name}
    </Link>
  );
}

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
      }}
    >
      <Grid container padding={0.5}>
        {variable.poweredBy.length > 0 ? (
          <Grid item xs={12} md={6}>
            <Typography
              textAlign={{ xs: "left", md: "left" }}
              color="primary.contrastText"
              variant="caption"
              component="p"
            >
              {"Powered by "}
              {variable.poweredBy.slice(0, -1).map((item) => {
                return (
                  <Fragment key={item.name}>
                    {createExternalLink(item.name, item.url)},{" "}
                  </Fragment>
                );
              })}
              {variable.poweredBy.slice(-1).map((item) => {
                return (
                  <Fragment key={item.name}>
                    {createExternalLink(item.name, item.url)}
                  </Fragment>
                );
              })}
            </Typography>
          </Grid>
        ) : (
          <></>
        )}
        <Grid item xs={12} md={6}>
          <Typography
            textAlign={{ xs: "left", md: "right" }}
            color="primary.contrastText"
            variant="caption"
            component="p"
          >
            {variable.copyright}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
