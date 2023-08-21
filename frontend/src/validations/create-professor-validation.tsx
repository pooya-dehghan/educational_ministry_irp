import * as Yup from "yup";

export const professorValidationSchema = Yup.object().shape({
  username: Yup.string().required("نام کاربری اجباریست"),
  password: Yup.string().required("رمز عبور اجباریست"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "تطابق رمز عبور اشتباه است")
    .required("تکرار رمز عبور اجباریست"),
});
