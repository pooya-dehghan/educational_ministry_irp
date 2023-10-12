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
import { deleteTeacherById } from '../../features/teacher/teacherSlice';
import { deleteProfessorById } from '../../features/professor/professorSlice';
import { deleteSchoolById } from '../../features/school/schoolSlice';
import { deleteOfficeManagerById } from '../../features/officemanager/officemanagerSlice';
import { deleteStudentById } from '../../features/student/studentSlice';


export default function ListOf({
  type = 'officemanager',
  username = 'نام کاربری',
  id = 0,
  buttonHide = false,
  image = '',
  selected = false,
  name = ' نام وارد نشده است ',
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
            dispatch(deleteOfficeManagerById(id));
            setButtonLoading(false);
            setOpenPermissionModal(false);
          })
          .catch((error: any) => {
            setOpenPermissionModal(false);
          });
        break;
      case 'professor':
        (dispatch as any)(deleteProfessorsAsync({ id }))
          .unwrap()
          .then((response: any) => {
            dispatch(deleteProfessorById(id));
            setButtonLoading(false);
            setOpenPermissionModal(false);
          })
          .catch((error: any) => {
            setOpenPermissionModal(false);
          });
        break;
      case 'school':
        (dispatch as any)(deleteSchoolsAsync({ id }))
          .unwrap()
          .then((response: any) => {
            dispatch(deleteSchoolById(id));
            setButtonLoading(false);
            setOpenPermissionModal(false);
          })
          .catch((error: any) => {
            setOpenPermissionModal(false);
          });
        break;
      case 'student':
        (dispatch as any)(deletestudentsAsync({ id }))
          .unwrap()
          .then((response: any) => {
            dispatch(deleteStudentById(id));
            setButtonLoading(false);
            setOpenPermissionModal(false);
          })
          .catch((error: any) => {
            setOpenPermissionModal(false);
          });
        break;
      case 'teacher':
        (dispatch as any)(deleteTeachersAsync({ id }))
          .unwrap()
          .then((response: any) => {
            dispatch(deleteTeacherById(id));
            setButtonLoading(false);
            setOpenPermissionModal(false);
          })
          .catch((error: any) => {
            setOpenPermissionModal(false);
          });
        break;
      default:
        break;
    }
  };
  const handleOpenPermissionModel = () => {
    setOpenPermissionModal(!openPermissionModal);
  };
  const generateDescription = () => {
    let holder = 'مسئول اموزش پرورش';
    switch (type) {
      case 'officemanager':
        holder = 'مسئول اموزش پرورش';
        break;
      case 'professor':
        holder = 'استاد';
        break;
      case 'student':
        holder = 'دانشجو';
        break;
      case 'school':
        holder = 'مدرسه';
        break;
      case 'teacher':
        holder = 'معلم';
        break;
      case 'universities':
        holder = 'دانشگاه';
        break;
      default:
        holder = 'مسئول اموزش پرورش';
        break;
    }
    return `${holder} : ${name}`;
  };
  return (
    <>
      <Card
        onClick={() => onClick({ id: id, name: username })}
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
              src={image ? 'http://localhost:8000' + image : Image}
              sx={{ margin: '10px' }}
            />
          }
          title={username}
        />
        <Divider />
        <CardContent>
          <Typography variant="h5" component="div"></Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {generateDescription()}
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
