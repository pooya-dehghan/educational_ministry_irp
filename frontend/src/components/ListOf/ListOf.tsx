import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Image from '../../../public/images/avatarerp.jpg';
import styles from './ListOf.module.css';
import { CardHeader, Divider } from '@mui/material';
import PermissionModal from '../PermissionModal/PermissionModal';
import { deleteOfficeManagersAsync } from '../../features/officemanager/officemanagerThunk';
import { deleteProfessorsAsync } from '../../features/professor/professorThunk';
import { deleteSchoolsAsync } from '../../features/school/schoolThunk';
import { deleteTeachersAsync } from '../../features/teacher/teacherThunk';
import { deletestudentsAsync } from '../../features/student/studentThunk';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ListOf({
  type = 'officemanager',
  username = 'نام کاربری',
  id = 0,
  buttonHide = false,
  selected = false,
  onClick = (payload: any) => {},
}) {
  const [openPermissionModal, setOpenPermissionModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const handleInfoButton = (id: number) => {
    switch (type) {
      case 'officemanager':
        navigate(`/dashboard/officemanager/${id}`);
        break;
      case 'professor':
        navigate(`/dashboard/professor/${id}`);
        break;
      case 'school':
        navigate(`/dashboard/school/${id}`);
        break;
      case 'student':
        navigate(`/dashboard/student/${id}`);
        break;
      case 'teacher':
        navigate(`/dashboard/teacher/${id}`);
        break;
    }
  };
  const handleDeleteButton = () => {
    setButtonLoading(true);
    switch (type) {
      case 'officemanager':
        (dispatch as any)(deleteOfficeManagersAsync({ id }))
          .unwrap()
          .then((response: any) => {
            setButtonLoading(false);
          })
          .catch((error: any) => {});
        break;
      case 'professor':
        (dispatch as any)(deleteProfessorsAsync({ id }))
          .unwrap()
          .then((response: any) => {
            setButtonLoading(false);
          })
          .catch((error: any) => {});
        break;
      case 'school':
        (dispatch as any)(deleteSchoolsAsync({ id }))
          .unwrap()
          .then((response: any) => {
            setButtonLoading(false);
          })
          .catch((error: any) => {});
        break;
      case 'student':
        (dispatch as any)(deletestudentsAsync({ id }))
          .unwrap()
          .then((response: any) => {
            setButtonLoading(false);
          })
          .catch((error: any) => {});
        break;
      case 'teacher':
        (dispatch as any)(deleteTeachersAsync({ id }))
          .unwrap()
          .then((response: any) => {
            setButtonLoading(false);
          })
          .catch((error: any) => {});
        break;
      default:
        break;
    }
  };
  const handleOpenPermissionModel = () => {
    setOpenPermissionModal(!openPermissionModal);
  };
  return (
    <>
      <Card
        onClick={() => onClick({ id: id })}
        sx={{ minWidth: 275 }}
        className={`${styles.card} ${
          type === 'officemanager' ? styles.cardOfficeManager : ''
        }
      ${type === 'school' ? styles.cardSchool : ''}${
          type === 'universities' ? styles.carUniversity : ''
        }${type === 'professor' ? styles.cardProfessor : ''}
      ${type === 'teacher' ? styles.cardTeacher : ''}
      ${type === 'student' ? styles.cardStudent : ''}
      ${type === 'schoolmanager' ? styles.cardSchoolManager : ''}
      ${selected ? styles.slectedCard : ''}
      `}
      >
        <CardHeader
          avatar={
            <Avatar
              className={styles.avatar}
              alt="Remy Sharp"
              src={Image}
              sx={{ margin: '10px' }}
            />
          }
          title={username}
        />
        <Divider />
        <CardContent>
          <Typography variant="h5" component="div"></Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            مدیر مدرسه امام خمینی تهران
          </Typography>
        </CardContent>
        {!buttonHide ? (
          <CardActions>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleInfoButton(id)}
            >
              اطلاعات
            </Button>
            <Button
              onClick={handleOpenPermissionModel}
              variant="contained"
              color="error"
              size="small"
            >
              حذف
            </Button>
          </CardActions>
        ) : null}
      </Card>
      <PermissionModal
        open={openPermissionModal}
        handleClose={handleOpenPermissionModel}
        onClickDelete={handleDeleteButton}
        buttonLoading={buttonLoading}
      />
    </>
  );
}
