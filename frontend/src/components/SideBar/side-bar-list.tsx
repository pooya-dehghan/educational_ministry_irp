import SchoolIcon from '@mui/icons-material/School';
import HowToReg from '@mui/icons-material/HowToReg';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';

const ListItems = [
  {
    list: 'لیست مدارس',
    icon: <ApartmentIcon />,
    to: '/list/schools',
  },
  {
    list: 'لیست مدیران',
    icon: <PersonSharpIcon />,
    to: '/list/managers',
  },
  {
    list: 'لیست ادارات',
    icon: <ApartmentIcon />,
    to: '/list/organs',
  },
  {
    list: 'لیست اساتید',
    icon: <ApartmentIcon />,
    to: '/list/professors',
  },
  {
    list: 'لیست دانشگاه ها',
    icon: <ApartmentIcon />,
    to: 'university',
  },
  {
    list: 'افزودن مدرسه',
    icon: <ApartmentIcon />,
    to: '/createSchool',
  },
  {
    list: 'افزودن مدیر مدرسه',
    icon: <PersonSharpIcon />,
    to: '/createSchoolManager',
  },
  {
    list: 'افزودن مسئول اداره آموزش و پرورش',
    icon: <PersonSharpIcon />,
    to: '/createOfficeManager',
  },
  {
    list: 'افزودن استاد',
    icon: <PersonSharpIcon />,
    to: '/createProfessor',
  },
  {
    list: 'افزودن معلم مدرسه',
    icon: <PersonSharpIcon />,
    to: '/createTeacher',
  },
];

export default ListItems;
