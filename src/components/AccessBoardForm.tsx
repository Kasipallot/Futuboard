import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useForm } from 'react-hook-form';

interface AccessBoardFormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

interface FormData {
  password: string;
}

const AccessBoardForm: React.FC<AccessBoardFormProps> = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      password: '',
    },
  });

  const handleFormSubmit = (data: FormData) => {
    // Perform password validation or authentication here
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h6">
            Enter Board Password
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            type="password"
            helperText={errors.password?.message}
            error={Boolean(errors.password)}
            {...register('password', {
              minLength: {
                value: 3,
                message: 'Password must be at least 3 characters',
              },
              required: {
                value: true,
                message: 'Password is required',
              },
              // Add any additional validation rules here
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AccessBoardForm;
