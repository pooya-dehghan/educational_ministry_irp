import React, { ChangeEvent, useState } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { uploadFileAsync } from '../../features/upload/uploadThunk';
import { updateResponse } from '../../features/response/responseSlice';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
const UploadFileButton = () => {
  const dispatch = useDispatch();
  const [buttonLoading, setButtonLoading] = useState(false);
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
        // const response = await axios.post('YOUR_API_ENDPOINT', formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        // });

        (dispatch as any)(uploadFileAsync(formData))
          .unwrap()
          .then((response: any) => {
            dispatch(
              updateResponse({
                severity: 'success',
                message: 'مدرسه با موفقیت اضافه شد.',
                open: true,
              })
            );
            setButtonLoading(false);
          })
          .catch((error: any) => {
            dispatch(
              updateResponse({
                severity: 'error',
                message: 'عملیات ناموفق. لطفا دوباره تلاش کنید.',
                open: true,
              })
            );
            setButtonLoading(false);
          });

        // Handle the API response as needed
      } catch (error) {
        dispatch(
          updateResponse({
            severity: 'error',
            message: 'عملیات ناموفق. لطفا دوباره تلاش کنید.',
            open: true,
          })
        );
      }
    }
  };
  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      بارگذاری تصویر پروفایل
      <VisuallyHiddenInput type="file" onChange={handleFileChange} />
    </Button>
  );
};

export default UploadFileButton;
