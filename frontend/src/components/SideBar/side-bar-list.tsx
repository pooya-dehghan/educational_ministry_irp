import SchoolIcon from '@mui/icons-material/School';
import HowToReg from '@mui/icons-material/HowToReg';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ApartmentIcon from '@mui/icons-material/Apartment';

const ListItems = [
  {
    list: 'ثبت نام',
    icon: <HowToReg />,
    to: 'register',
  },
  {
    list: 'لیست مدارس',
    icon: <HomeWorkIcon />,
    to: '/list/schools',
  },
  {
    list: 'لیست مدیران',
    icon: <HomeWorkIcon />,
    to: '/list/managers',
  },
  {
    list: 'لیست ادارات',
    icon: <ApartmentIcon />,
    to: '/list/organs',
  },
  {
    list: 'لیست دانشگاه ها',
    icon: <SchoolIcon />,
    to: 'university',
  },
  {
    list: 'فرم ساخت مدرسه',
    icon: <SchoolIcon />,
    to: 'school-form',
  },
  {
    list: 'فرم ساخت مدیر',
    icon: <SchoolIcon />,
    to: 'manager-form',
  },
  {
    list: 'فرم ساخت مسئول اداره',
    icon: <SchoolIcon />,
    to: 'principal-form',
  },
];

export default ListItems;
