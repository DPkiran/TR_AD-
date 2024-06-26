import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles.js';

const PlaceDetails = ({place, selected, refProp}) => {
  if(selected) refProp?.current?.scrollIntoView({ behavior: "smooth", block : "start"})
 const classes = useStyles();

  return (
    <Card elevation = {6}>
      <CardMedia
       style={{ height: 350 }}
       image={place.photo ? place.photo.images.large.url : 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3Vwd2s2MTY2MTU3Ny13aWtpbWVkaWEtaW1hZ2Uta293YXBlZWouanBn.jpg'}
       title={place.name} 
       />
       <CardContent>
         <Typography gutterBottom variant="h5">{place.name}</Typography>
         <Box display="flex" justifyContent="space-between">
         <Rating value={Number(place.rating)} readOnly />
          <Typography gutterBottom variant="subtitle1"> out of {place.num_reviews} reviews </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Price</Typography> 
          <Typography gutterBottom variant="subtitle1">
            {place.price_level}
          </Typography> 
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.ranking}
          </Typography>
        </Box>
        {place?.awards?.map((award) => (
          <Box my={1} display="flex" justifyContent="space-between"  alignItems="center">
              <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
          </Box>
        ))}
           {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}
        {place.address && (
          <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
            <LocationOnIcon />{place.address}
          </Typography>
        )}
         {place.phone && (
          <Typography variant="body2" color="textSecondary" className={classes.spacing}>
            <PhoneIcon /> {place.phone}
          </Typography>
        )}
       </CardContent>
       <CardActions>
        <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
          Trip Advisor
        </Button>
        <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
          Website
        </Button>
      </CardActions>
    </Card>
  );
}

export default PlaceDetails