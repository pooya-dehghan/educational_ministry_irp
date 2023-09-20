import { useState, useEffect } from 'react';
import { getOfficeManagerAsync } from '../../features/officemanager/officemanagerThunk';
import { updateOfficeManager } from '../../features/officemanager/officemanagerSlice';
import { getProfessorAsync } from '../../features/professor/professorThunk';
import { updateProfessor } from '../../features/professor/professorSlice';
import { getSchoolAsync } from '../../features/school/schoolThunk';
import { updateSchool } from '../../features/school/schoolSlice';
import { getstudentAsync } from '../../features/student/studentThunk';
import { updatestudent } from '../../features/student/studentSlice';
import { getTeacherAsync } from '../../features/teacher/teacherThunk';
import { updateTeacher } from '../../features/teacher/teacherSlice';
import { useDispatch } from 'react-redux';

function useUserInfo(userType: string | undefined, id: number | undefined) {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (id) {
      switch (userType) {
        case 'officemanager':
          (dispatch as any)(getOfficeManagerAsync({ officemanagerID: id }))
            .unwrap()
            .then((response: any) => {
              dispatch(updateOfficeManager(response));
              setUserInfo(response);
            })
            .catch((error: any) => {
              setError(
                'مشکلی در گرفتن اطلاعات بوجود آمده ! لطفا از صحت اطلاعات اطلاع کسب کنید'
              );
            });
          break;
        case 'professor':
          (dispatch as any)(getProfessorAsync({ professorId: id }))
            .unwrap()
            .then((response: any) => {
              dispatch(updateProfessor(response));
              setUserInfo(response);
            })
            .catch((error: any) => {
              setError(
                'مشکلی در گرفتن اطلاعات بوجود آمده ! لطفا از صحت اطلاعات اطلاع کسب کنید'
              );
            });
          break;
        case 'student':
          (dispatch as any)(getstudentAsync({ studentID: id }))
            .unwrap()
            .then((response: any) => {
              dispatch(updatestudent(response));
              setUserInfo(response);
            })
            .catch((error: any) => {
              setError(
                'مشکلی در گرفتن اطلاعات بوجود آمده ! لطفا از صحت اطلاعات اطلاع کسب کنید'
              );
            });
          break;
        case 'school':
          (dispatch as any)(getSchoolAsync({ schoolID: id }))
            .unwrap()
            .then((response: any) => {
              dispatch(updateSchool(response));
              setUserInfo(response);
            })
            .catch((error: any) => {
              setError(
                'مشکلی در گرفتن اطلاعات بوجود آمده ! لطفا از صحت اطلاعات اطلاع کسب کنید'
              );
            });
          break;
        case 'teacher':
          (dispatch as any)(getTeacherAsync({ teacherID: id }))
            .unwrap()
            .then((response: any) => {
              dispatch(updateTeacher(response));
              setUserInfo(response);
            })
            .catch((error: any) => {
              setError(
                'مشکلی در گرفتن اطلاعات بوجود آمده ! لطفا از صحت اطلاعات اطلاع کسب کنید'
              );
            });
          break;

        default:
          break;
      }
    }
  }, []);

  const changeUserInfoHandler = (info: any) => {};

  const updateUserInfoHandler = (info: any) => {};
  return {
    userInfo,
    changeUserInfoHandler,
    updateUserInfoHandler,
    error,
  };
}

export default useUserInfo;
