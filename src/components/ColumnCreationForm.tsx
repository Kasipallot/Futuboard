import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { useForm } from "react-hook-form"

interface AddColumnCreationFormProps {
    onSubmit: any,
    onCancel: any,
}

const ColumnCreationForm : React.FC<AddColumnCreationFormProps> = (props) => {
    const {  register, handleSubmit, formState: {errors} } = useForm({
        defaultValues:{
            ColumnTitle : ""
        }
    });

    const {
        onSubmit,
        onCancel,
    } = props;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing = {1}>
                <Grid item xs={12}>
                    <Typography gutterBottom variant="h6" > Create Column </Typography>
                    <Divider/>
                </Grid>
                <Grid item xs={12}>
                <TextField label='Name' helperText = {errors.ColumnTitle?.message} error = {Boolean(errors.ColumnTitle)} {...register("ColumnTitle", {
                minLength: {
                    value : 3,
                    message: "Column name must be at least 3 characters"
                },
                required: {
                    value: true,
                    message: "Column name is required"
                }
            })} />  
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" color="primary" variant="contained">Submit</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </Grid>
            </Grid>
        </form>
    );
}



export default ColumnCreationForm