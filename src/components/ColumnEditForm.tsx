
import Button from '@mui/material/Button'

import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

import { useForm } from "react-hook-form"
import { Column } from '../types'

interface AddColumnCreationFormProps {
    onSubmit: (data : FormData) => void,
    onCancel: () =>void,
    column : Column
}

interface FormData {
    ColumnTitle: string;

}

const ColumnEditForm : React.FC<AddColumnCreationFormProps> = (props) => {

    const {
        onSubmit,
        onCancel,
        column,
    } = props;

    const {  register, handleSubmit, formState: {errors} } = useForm<FormData>({
        defaultValues:{
            ColumnTitle : column.title
        }
    });

    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing = {1}>
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



export default ColumnEditForm