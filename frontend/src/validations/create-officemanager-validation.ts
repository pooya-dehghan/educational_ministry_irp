import * as Yup from 'yup';

export const officeManagerValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('نام اجباریست'),
  lastName: Yup.string().required('نام خانوادگی اجباریست'),
  region: Yup.string().required('منطقه اجباریست'),
  nationalCode: Yup.string()
    .required('کد ملی اجباریست')
    .matches(/^\d{10}$/, 'کد ملی باید دقیقاً ۱۰ رقم باشد'),
  email: Yup.string().required('ایمیل اجباریست').email('فرمت ایمیل نادرست است'),
});
