import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Image from '../../../public/images/avatarerp.jpg';
import styles from './ListOf.module.css';

export default function ListOf() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Avatar className={styles.avatar} alt="Remy Sharp" src={Image} />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          رضا احمدی
        </Typography>
        <Typography variant="h5" component="div"></Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          مدیر مدرسه امام خمینی تهران
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">اطلاعات</Button>
      </CardActions>
    </Card>
  );
}
