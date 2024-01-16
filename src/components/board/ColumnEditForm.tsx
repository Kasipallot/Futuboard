import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import { Column } from "../../types";

interface AddColumnCreationFormProps {
    onSubmit: (data : FormData) => void,
    onCancel: () => void,
    column : Column
}

interface FormData {
    columnTitle: string;

}

const ColumnEditForm : React.FC<AddColumnCreationFormProps> = (props) => {

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, []);

    const {
        onSubmit,
        onCancel,
        column,
    } = props;

    const {  register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues:{
            columnTitle : column.title
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                <TextField inputRef={inputRef} label="Name" helperText={errors.columnTitle?.message} error={Boolean(errors.columnTitle)} {...register("columnTitle", {
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
};

export default ColumnEditForm;