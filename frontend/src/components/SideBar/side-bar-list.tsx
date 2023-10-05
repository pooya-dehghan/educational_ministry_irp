import SchoolIcon from "@mui/icons-material/School";
import HowToReg from "@mui/icons-material/HowToReg";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

export const ListItems = [
  {
    list: "لیست مدارس",
    icon: <SchoolIcon />,
    to: "/list/schools",
  },
  {
    list: "لیست مسئولین آموزش و پرورش",
    icon: <PersonSharpIcon />,
    to: "/list/officemanagers",
  },
  {
    list: "لیست اساتید",
    icon: <PersonSharpIcon />,
    to: "/list/professors",
  },
  {
    list: "لیست دانشجویان",
    icon: <PersonSharpIcon />,
    to: "/list/students",
  },
  {
    list: "لیست دبیران",
    icon: <PersonSharpIcon />,
    to: "/list/teachers",
  },
  {
    list: "افزودن مدرسه",
    icon: <SchoolIcon />,
    to: "/createSchool",
  },
  {
    list: "افزودن مسئول اداره آموزش و پرورش",
    icon: <PersonAddAlt1Icon />,
    to: "/createOfficeManager",
  },
  {
    list: "افزودن استاد",
    icon: <PersonAddAlt1Icon />,
    to: "/createProfessor",
  },
  {
    list: "افزودن معلم مدرسه",
    icon: <PersonAddAlt1Icon />,
    to: "/createTeacher",
  },
  {
    list: "درخواست ها",
    icon: <PersonAddAlt1Icon />,
    to: "/requests",
  },
];

export const appropriateListReturned = (userType: string) => {
  switch (userType) {
    case "officemanager":
      return officeManagerList;
    case "admin":
      return adminList;
    case "superuser":
      return adminList;
    case "teacher":
      return teacherList;
    case "school":
      return schoolList;
    case "professor":
      return professorList;
    case "teacher":
      return teacherList;
    default:
      return studentList;
  }
};

export const adminList = [
  {
    list: "لیست مدارس",
    icon: <SchoolIcon />,
    to: "/list/schools",
  },
  {
    list: "لیست مسئولین آموزش و پرورش",
    icon: <PersonSharpIcon />,
    to: "/list/officemanagers",
  },
  {
    list: "لیست اساتید",
    icon: <PersonSharpIcon />,
    to: "/list/professors",
  },
  {
    list: "لیست دانشجویان",
    icon: <PersonSharpIcon />,
    to: "/list/students",
  },
  {
    list: "افزودن مدرسه",
    icon: <SchoolIcon />,
    to: "/createSchool",
  },
  {
    list: "افزودن مسئول اداره آموزش و پرورش",
    icon: <PersonAddAlt1Icon />,
    to: "/createOfficeManager",
  },
  {
    list: "افزودن استاد",
    icon: <PersonAddAlt1Icon />,
    to: "/createProfessor",
  },
  {
    list: "افزودن معلم مدرسه",
    icon: <PersonAddAlt1Icon />,
    to: "/createTeacher",
  },
  {
    list: "درخواست ها",
    icon: <PersonAddAlt1Icon />,
    to: "/requests",
  },
];

export const officeManagerList = [
  {
    list: "لیست مدارس",
    icon: <SchoolIcon />,
    to: "/list/schools",
  },
  {
    list: "لیست دانشجویان",
    icon: <PersonSharpIcon />,
    to: "/list/students",
  },
  {
    list: "درخواست ها",
    icon: <PersonAddAlt1Icon />,
    to: "/requests",
  },
];

export const schoolList = [
  {
    list: "لیست دانشجویان",
    icon: <PersonSharpIcon />,
    to: "/list/students",
  },
];

export const teacherList = [
  {
    list: "لیست مدارس",
    icon: <SchoolIcon />,
    to: "/list/schools",
  },
  {
    list: "لیست دانشجویان",
    icon: <PersonSharpIcon />,
    to: "/list/students",
  },
];

export const professorList = [
  {
    list: "لیست دانشجویان",
    icon: <PersonSharpIcon />,
    to: "/list/students",
  },
];

export const studentList = [
  {
    list: "درخواست ها",
    icon: <PersonAddAlt1Icon />,
    to: "/requests",
  },
];
