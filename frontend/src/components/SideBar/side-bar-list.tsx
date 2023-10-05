import SchoolIcon from '@mui/icons-material/School';
import HowToReg from '@mui/icons-material/HowToReg';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

export const ListItems = [
  {
    list: 'لیست مدارس',
    icon: <SchoolIcon />,
    to: '/list/schools',
  },
  {
    list: 'لیست مسئولین آموزش و پرورش',
    icon: <PersonSharpIcon />,
    to: '/list/officemanagers',
  },
  {
    list: 'لیست اساتید',
    icon: <PersonSharpIcon />,
    to: '/list/professors',
  },
  {
    list: 'لیست دانشجویان',
    icon: <PersonSharpIcon />,
    to: '/list/students',
  },
  {
    list: 'لیست دبیران',
    icon: <PersonSharpIcon />,
    to: '/list/teachers',
  },
  {
    list: 'افزودن مدرسه',
    icon: <SchoolIcon />,
    to: '/createSchool',
  },
  {
    list: 'افزودن مسئول اداره آموزش و پرورش',
    icon: <PersonAddAlt1Icon />,
    to: '/createOfficeManager',
  },
  {
    list: 'افزودن استاد',
    icon: <PersonAddAlt1Icon />,
    to: '/createProfessor',
  },
  {
    list: 'افزودن معلم مدرسه',
    icon: <PersonAddAlt1Icon />,
    to: '/createTeacher',
  },
  {
    list: 'درخواست ها',
    icon: <PersonAddAlt1Icon />,
    to: '/requests',
  },
];

export const appropriateListReturned = (userType: string, id: number) => {
  switch (userType) {
    case 'officemanager':
      return officeManagerList(userType, id);
    case 'admin':
      return adminList(userType, id);
    case 'superuser':
      return adminList(userType, id);
    case 'teacher':
      return teacherList(userType, id);
    case 'school':
      return schoolList(userType, id);
    case 'professor':
      return professorList(userType, id);
    case 'teacher':
      return teacherList(userType, id);
    case 'student':
      return studentList(userType, id);
    default:
      return studentList(userType, id);
  }
};

export const adminList = (usertype: string, id: number) => {
  return [
    {
      list: 'پروفایل کاربری',
      icon: <PersonAddAlt1Icon />,
      to: `/${usertype}/${id}`,
    },
    {
      list: 'لیست مدارس',
      icon: <SchoolIcon />,
      to: '/list/schools',
    },
    {
      list: 'لیست مسئولین آموزش و پرورش',
      icon: <PersonSharpIcon />,
      to: '/list/officemanagers',
    },
    {
      list: 'لیست اساتید',
      icon: <PersonSharpIcon />,
      to: '/list/professors',
    },
    {
      list: 'لیست دانشجویان',
      icon: <PersonSharpIcon />,
      to: '/list/students',
    },
    {
      list: 'افزودن مدرسه',
      icon: <SchoolIcon />,
      to: '/createSchool',
    },
    {
      list: 'افزودن مسئول اداره آموزش و پرورش',
      icon: <PersonAddAlt1Icon />,
      to: '/createOfficeManager',
    },
    {
      list: 'افزودن استاد',
      icon: <PersonAddAlt1Icon />,
      to: '/createProfessor',
    },
    {
      list: 'افزودن معلم مدرسه',
      icon: <PersonAddAlt1Icon />,
      to: '/createTeacher',
    },
    {
      list: 'درخواست ها',
      icon: <PersonAddAlt1Icon />,
      to: '/requests',
    },
  ];
};

export const officeManagerList = (usertype: string, id: number) => {
  return [
    {
      list: 'پروفایل کاربری',
      icon: <PersonAddAlt1Icon />,
      to: `/${usertype}/${id}`,
    },
    {
      list: 'لیست مدارس',
      icon: <SchoolIcon />,
      to: '/list/schools',
    },
    {
      list: 'لیست دانشجویان',
      icon: <PersonSharpIcon />,
      to: '/list/students',
    },
    {
      list: 'درخواست ها',
      icon: <PersonAddAlt1Icon />,
      to: '/requests',
    },
  ];
};

export const schoolList = (usertype: string, id: number) => {
  return [
    {
      list: 'پروفایل کاربری',
      icon: <PersonAddAlt1Icon />,
      to: `/${usertype}/${id}`,
    },
    {
      list: 'لیست دانشجویان',
      icon: <PersonSharpIcon />,
      to: '/list/students',
    },
  ];
};

export const teacherList = (usertype: string, id: number) => {
  return [
    {
      list: 'پروفایل کاربری',
      icon: <PersonAddAlt1Icon />,
      to: `/${usertype}/${id}`,
    },
    {
      list: 'لیست مدارس',
      icon: <SchoolIcon />,
      to: '/list/schools',
    },
    {
      list: 'لیست دانشجویان',
      icon: <PersonSharpIcon />,
      to: '/list/students',
    },
  ];
};
export const professorList = (usertype: string, id: number) => {
  return [
    {
      list: 'پروفایل کاربری',
      icon: <PersonAddAlt1Icon />,
      to: `/${usertype}/${id}`,
    },
    {
      list: 'لیست دانشجویان',
      icon: <PersonSharpIcon />,
      to: '/list/students',
    },
  ];
};

export const studentList = (usertype: string, id: number) => {
  return [
    {
      list: 'پروفایل کاربری',
      icon: <PersonAddAlt1Icon />,
      to: `/${usertype}/${id}`,
    },
  ];
};
