import * as Yup from "yup";

export const teacherValidationSchema = Yup.object().shape({
  managerName: Yup.string().required("نام مدیر اجباریست"),
  schoolName: Yup.string().required("نام مدرسه اجباریست"),
  username: Yup.string().required("نام کاربری اجباریست"),
  password: Yup.string().required("رمز عبور اجباریست"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "تطابق رمز عبور اشتباه است")
    .required("تکرار رمز عبور اجباریست"),
});
