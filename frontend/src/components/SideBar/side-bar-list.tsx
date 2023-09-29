import SchoolIcon from '@mui/icons-material/School';
import HowToReg from '@mui/icons-material/HowToReg';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const ListItems = [
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

export default ListItems;
