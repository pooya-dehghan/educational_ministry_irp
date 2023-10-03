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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { getAllOfRegionSchoolsAsync } from '../../features/school/schoolThunk';
import { useDispatch, useSelector } from 'react-redux';

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

type Request = {
  body: string;
  code: string;
  created: Date;
  id: number;
  receiver: number;
  sender: number;
  status: string;
  updated: Date;
};

type School = {
  capacity: number;
  city: string;
  id: number;
  manager: string;
  name: string;
  username: string;
};

interface RequestProps {
  acceptRequest: (schoolID: number | undefined, requestID: number) => void;
  rejectRequest: (id: number) => void;
  request: Request;
}

const Request: React.FC<RequestProps> = ({
  acceptRequest,
  rejectRequest,
  request,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [seen, setSeen] = React.useState(false);
  const [schoolID, setSchoolID] = React.useState<number | undefined>();
  const [regionSchools, setRegionSchools] = React.useState([]);
  const dispatch = useDispatch();
  console.log('request: ', request);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  React.useEffect(() => {
    (dispatch as any)(getAllOfRegionSchoolsAsync())
      .unwrap()
      .then((response: any) => {
        setRegionSchools(response);
      })
      .catch((error: any) => {});
  }, []);
  return (
    <Card sx={{ maxWidth: 600 }}>
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
          {request.body}
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
                onClick={() => acceptRequest(schoolID, request.id)}
              >
                موافقت
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="school_id_provider">مدرسه</InputLabel>
                <Select
                  labelId="school_id_provider"
                  id="demo-simple-select"
                  value={schoolID}
                  label="مدرسه"
                  onChange={(value) => setSchoolID(value.target.value)}
                >
                  {regionSchools.length >= 1 ? (
                    regionSchools.map((school: School, index) => {
                      return (
                        <MenuItem value={school.id}>{school.name}</MenuItem>
                      );
                    })
                  ) : (
                    <MenuItem>مدرسه ای وارد نشده</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Button
                color="error"
                variant="contained"
                endIcon={<ThumbDownAltIcon />}
                onClick={() => rejectRequest(request.id)}
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
