import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

interface AddColumnCreationFormProps {
    onSubmit: ({ columnTitle }: { columnTitle: string }) => void,
    onCancel: () => void,
}

const ColumnCreationForm: React.FC<AddColumnCreationFormProps> = (props) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            columnTitle: ""
        }
    });

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, []);

    const {
        onSubmit,
        onCancel,
    } = props;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography gutterBottom variant="h6" > Create Column </Typography>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <TextField inputRef={inputRef} label="Name" helperText={errors.columnTitle?.message} error={Boolean(errors.columnTitle)} {...register("columnTitle", {
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

export default ColumnCreationForm;