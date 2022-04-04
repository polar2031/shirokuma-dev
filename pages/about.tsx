import { GetStaticProps } from "next";
import {
  Box,
  Card,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Link from "@mui/material/Link";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { getStrapiURL } from "../lib/api";
import { getDefaultLayout } from "../component/layout";
import {
  getProfile,
  getProfilePictureUrl,
  IProfile,
} from "../lib/dataFetching";
import { Variable } from "../site-config";

const Profile = (props: { profile: IProfile; profilePictureUrl: string }) => {
  const { asPath } = useRouter();

  return (
    <>
      <NextSeo
        title={`關於 | ${Variable.title}`}
        openGraph={{ title: `關於` }}
        canonical={`${Variable.siteUrl}${asPath}`}
      ></NextSeo>
      <Container
        sx={{
          p: 2,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          align="center"
          sx={{ fontWeight: 700 }}
        >{`關於我`}</Typography>
        <Grid container spacing={2}>
          {props.profilePictureUrl ? (
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="img"
                  image={getStrapiURL() + props.profilePictureUrl}
                ></CardMedia>
              </Card>
            </Grid>
          ) : (
            <></>
          )}
          <Grid item xs={12} md={6}>
            <Box margin={2}>
              <Stack spacing={1}>
                <Stack spacing={2} direction="row" alignItems="flex-end">
                  {/* Name */}
                  <Typography variant="h4" display="inline">
                    {props.profile.name}
                  </Typography>
                  {/* title */}
                  <Typography variant="h6" display="inline">
                    {props.profile.title}
                  </Typography>
                </Stack>
                {/* summary */}
                <Typography>{props.profile.summary}</Typography>

                <div>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Contacts
                  </Typography>
                  <Typography display="flex">
                    {props.profile.email ? (
                      <>
                        <Link
                          href={"mailto:" + props.profile.email}
                          marginRight={1}
                        >
                          <EmailIcon></EmailIcon>
                        </Link>
                        {props.profile.email}
                      </>
                    ) : (
                      ""
                    )}
                  </Typography>
                  <Typography display="flex">
                    {props.profile.email ? (
                      <>
                        <Link
                          href={"tel:" + props.profile.phone}
                          marginRight={1}
                        >
                          <PhoneIcon></PhoneIcon>
                        </Link>
                        {props.profile.phone}
                      </>
                    ) : (
                      ""
                    )}
                  </Typography>
                  <Typography display="flex">
                    {props.profile.github ? (
                      <>
                        <Link
                          href={"https://github.com/" + props.profile.github}
                          marginRight={1}
                        >
                          <GitHubIcon></GitHubIcon>
                        </Link>
                        {props.profile.github}
                      </>
                    ) : (
                      ""
                    )}
                  </Typography>
                  <Typography display="flex">
                    {props.profile.linkedin ? (
                      <>
                        <Link
                          href={
                            "https://linkedin.com/in/" + props.profile.linkedin
                          }
                          marginRight={1}
                        >
                          <LinkedInIcon></LinkedInIcon>
                        </Link>
                        {props.profile.linkedin}
                      </>
                    ) : (
                      ""
                    )}
                  </Typography>
                  <Typography display="flex">
                    {props.profile.location ? (
                      <>
                        <Link marginRight={1}>
                          <LocationOnIcon></LocationOnIcon>
                        </Link>
                        {props.profile.location}
                      </>
                    ) : (
                      ""
                    )}
                  </Typography>
                </div>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Run API calls in parallel
  const [profile, profilePictureUrl] = await Promise.all([
    getProfile(),
    getProfilePictureUrl(),
  ]);

  return {
    props: {
      profile: profile,
      profilePictureUrl: profilePictureUrl,
    },
    revalidate: false,
  };
};

Profile.getLayout = getDefaultLayout;
export default Profile;
