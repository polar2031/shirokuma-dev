import { GetStaticProps } from "next";
import { Box, Card, CardMedia, Container, Grid } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Link from "@mui/material/Link";
import { fetchAPI, getStrapiURL } from "../lib/api";
import { getDefaultLayout } from "../component/layout";

interface Profile {
  name: string;
  title: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  picture: {
    data: {
      attributes: {
        name: string;
        width: number;
        height: number;
        url: string;
      };
    };
  };
}

const Profile = (props: { profile: Profile }) => {
  return (
    <Container
      sx={{
        p: 2,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card>
            <CardMedia
              component="img"
              image={getStrapiURL() + props.profile.picture.data.attributes.url}
            ></CardMedia>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <div>{props.profile.name}</div>
            <div>{props.profile.title}</div>
            <div>{props.profile.summary}</div>
            <div>
              {props.profile.location ? (
                <>
                  <LocationOnIcon></LocationOnIcon>
                  {props.profile.location}
                </>
              ) : (
                ""
              )}
            </div>
            <div>
              {props.profile.email ? (
                <Link href={"mailto:" + props.profile.email}>
                  <EmailIcon></EmailIcon>
                </Link>
              ) : (
                ""
              )}
              {props.profile.email ? (
                <Link href={"tel:" + props.profile.phone}>
                  <PhoneIcon></PhoneIcon>
                </Link>
              ) : (
                ""
              )}
              {props.profile.github ? (
                <Link href={"https://github.com/" + props.profile.github}>
                  <GitHubIcon></GitHubIcon>
                </Link>
              ) : (
                ""
              )}
              {props.profile.linkedin ? (
                <Link
                  href={"https://linkedin.com/in/" + props.profile.linkedin}
                >
                  <LinkedInIcon></LinkedInIcon>
                </Link>
              ) : (
                ""
              )}
            </div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Run API calls in parallel
  const [profile] = await Promise.all([
    fetchAPI("/profile", {
      populate: "*",
    }),
  ]);

  return {
    props: {
      profile: profile.data.attributes,
    },
    revalidate: 1,
  };
};

Profile.getLayout = getDefaultLayout;
export default Profile;
