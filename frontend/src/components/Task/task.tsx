import { ChangeEvent, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateResponse } from '../../features/response/responseSlice';
import { uploadTaskAsync } from '../../features/task/taskThunk';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

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

interface ITask {
  title: string;
  description: string;
  buttonText: string;
  taskID: string;
}

const Task: React.FC<ITask> = ({ title, description, buttonText, taskID }) => {
  const dispatch = useDispatch();
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('task_id', taskID.toString());
        (dispatch as any)(uploadTaskAsync(formData))
          .unwrap()
          .then((response: any) => {
            dispatch(
              updateResponse({
                severity: 'success',
                message: 'فایل با موفقیت اپلود شد.',
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
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardContent m={4}>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            {buttonText}
            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Task;
