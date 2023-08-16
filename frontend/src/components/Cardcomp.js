import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({
  Name,
  description,
  difficulty,
  subject,
  image,
  steps,
  materialsList,
  safetyPrecautions,
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[300] }} aria-label="recipe">
            {difficulty}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={Name}
        subheader={`Subject: ${subject}`}
      />
      <CardMedia
        component="img"
        sx={{ height: 100, width: 100, margin: 4 }}
        image={image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ fontWeight: 700 }} color="text.secondary">
            Safety Precautions:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {safetyPrecautions}
          </Typography>
        </CardContent>
        <CardContent>
          {materialsList.map((item, index) => (
            <div key={index}>
              <Typography paragraph>Material Name: {item.name}</Typography>
              <Typography paragraph>
                Material Quantity: {item.quantity}
              </Typography>
            </div>
          ))}
        </CardContent>
        <CardContent>
          {steps.map((item, index) => (
            <div key={index}>
              <Typography paragraph>Steps: {item.number}</Typography>
              <CardMedia
                component="img"
                sx={{ height: 100, width: 100, margin: 4 }}
                image={item.image}
                alt="Paella dish"
              />
              <Typography paragraph>{item.description}</Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then
                serve.
              </Typography>
            </div>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
