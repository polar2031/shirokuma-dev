import { Chip, Stack, Link as MuiLink } from "@mui/material";
import Link from "next/link";

const TagList = (props: { tags: Array<string> }) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      onMouseDown={(event) => event.stopPropagation()}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      {props.tags.map((tag) => {
        return (
          <Link href="#" key={tag} passHref>
            <Chip label={tag} size="small" key={tag} component={MuiLink} />
          </Link>
        );
      })}
    </Stack>
  );
};
export default TagList;
