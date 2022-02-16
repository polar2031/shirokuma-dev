import { GetStaticProps } from 'next'
import { fetchAPI, getStrapiURL } from "../lib/api"
import ResponsiveAppBar from '../component/nav'
import { Box, Card, CardMedia, Container, Grid } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from '@mui/material/Link';

interface Profile {
  name: string
  title: string
  summary: string
  email: string
  phone: string
  location: string
  github: string
  linkedin: string
  picture: {
    data: {
      attributes: {
        name: string
        width: number
        height: number
        url: string
      }
    }
  }
}

const Profile = (props: { title: string, profile: Profile }) => {
  return (
    <>
      <ResponsiveAppBar title={props.title}></ResponsiveAppBar>
      <Container
        sx={{
          p: 2
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card>
              <CardMedia
                component="img"
                image={getStrapiURL() + props.profile.picture.data.attributes.url}
              >
              </CardMedia>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <div>{props.profile.name}</div>
              <div>{props.profile.title}</div>
              <div>{props.profile.summary}</div>
              <div>{props.profile.location ? <><LocationOnIcon></LocationOnIcon>{props.profile.location}</> : ""}</div>
              <div>
                {props.profile.email ? <Link href={"mailto:" + props.profile.email}><EmailIcon></EmailIcon></Link> : ""}
                {props.profile.email ? <Link href={"tel:" + props.profile.phone}><PhoneIcon></PhoneIcon></Link> : ""}
                {props.profile.github ? <Link href={"https://github.com/" + props.profile.github}><GitHubIcon></GitHubIcon></Link> : ""}
                {props.profile.linkedin ? <Link href={"https://linkedin.com/in/" + props.profile.linkedin}><LinkedInIcon></LinkedInIcon></Link> : ""}
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // Run API calls in parallel
  const [site, profile] = await Promise.all([
    fetchAPI("/site", {
      populate: "*",
    }),
    fetchAPI("/profile", {
      populate: "*",
    }),
  ])

  return {
    props: {
      title: site.data.attributes.title,
      profile: profile.data.attributes
    },
    revalidate: 1,
  }
}

export default Profile
