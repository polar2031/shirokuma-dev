import { Box, Grid, Link, Typography } from "@mui/material";
import { Fragment } from "react";
import { Variable } from "../site-config";

function createExternalLink(name: string, url: string) {
  return (
    <Link key={name} href={url} underline="none" color="primary.contrastText">
      {name}
    </Link>
  );
}

const Footer = () => {
  return (
    <div className="footer">
      <Box
        sx={{
          backgroundColor: "primary.main",
        }}
      >
        <Grid container padding={0.5}>
          {Variable.poweredBy.length > 0 ? (
            <Grid item xs={12} md={6}>
              <Typography
                textAlign={{ xs: "left", md: "left" }}
                color="primary.contrastText"
                variant="caption"
                component="p"
              >
                {"Powered by "}
                {Variable.poweredBy.slice(0, -1).map((item) => {
                  return (
                    <Fragment key={item.name}>
                      {createExternalLink(item.name, item.url)},{" "}
                    </Fragment>
                  );
                })}
                {Variable.poweredBy.slice(-1).map((item) => {
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
              {Variable.copyright}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Footer;
