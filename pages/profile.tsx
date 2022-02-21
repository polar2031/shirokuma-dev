import { GetStaticProps } from "next";
import { Box, Card, CardMedia, Container, Grid } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Link from "@mui/material/Link";
import { getStrapiURL } from "../lib/api";
import { getDefaultLayout } from "../component/layout";
import {
  getProfile,
  getProfilePictureUrl,
  getSiteTitle,
  IProfile,
} from "../lib/dataFetching";
import ResponsiveAppBar from "../component/nav";

const Profile = (props: {
  title: string;
  profile: IProfile;
  profilePictureUrl: string;
}) => {
  return (
    <>
      <ResponsiveAppBar title={props.title}></ResponsiveAppBar>
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
                image={getStrapiURL() + props.profilePictureUrl}
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
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Run API calls in parallel
  const [title, profile, profilePictureUrl] = await Promise.all([
    getSiteTitle(),
    getProfile(),
    getProfilePictureUrl(),
  ]);

  console.log(profilePictureUrl);

  return {
    props: {
      title: title,
      profile: profile,
      profilePictureUrl: profilePictureUrl,
    },
    revalidate: 1,
  };
};

Profile.getLayout = getDefaultLayout;
export default Profile;
