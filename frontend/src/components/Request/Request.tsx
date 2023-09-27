import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Request = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [seen, setSeen] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            دانشجو
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={() => setSeen(!seen)}>
            <VisibilityIcon style={{ color: seen ? 'blue' : 'inherit' }} />
          </IconButton>
        }
        title="درخواست ثبت کارورزی"
        subheader="24 مهر 1398"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          آقای/خانم مهدی باقری با شماره دانشجویی 389123928 از دانشگاه فرهنگیان
          تربیت دبیر استان تهران برای منطقه 5 تهران درخواست کارورزی دارند.
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
          <Typography variant="subtitle1" color="text.secondary">
            شرح درخواست:{' '}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            درخواست مربوطه با کد 401 در سامانه جامع دانشجویی ثبت گردیده است.
          </Typography>
          <Typography
            sx={{ marginBottom: '1rem' }}
            variant="subtitle2"
            color="text.secondary"
          >
            این درخواست در حال حاضر به حالت در حال بررسی در پروفایل شما ایجاد
            گشته است. لطفا پس از بررسی های لازم از منو زیر وضعیت این درخواست را
            مشخص کنید.
          </Typography>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Button
                color="success"
                variant="contained"
                endIcon={<ThumbUpIcon />}
              >
                موافقت
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                color="error"
                variant="contained"
                endIcon={<ThumbDownAltIcon />}
              >
                مخالفت
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Request;
