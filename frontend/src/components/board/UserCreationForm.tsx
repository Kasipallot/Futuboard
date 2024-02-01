import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

interface AddUserCreationFormProps {
    onSubmit: ({ name }: { name: string }) => void,
    onCancel: () => void,
}

const UserCreationForm: React.FC<AddUserCreationFormProps> = (props) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: ""
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
                    <Typography gutterBottom variant="body2" > Add User </Typography>
                    <Divider/>
                </Grid>
                <Grid item xs={12}>
                    <TextField inputRef={inputRef} size="small" label="Name" helperText={errors.name?.message} error={Boolean(errors.name)} {...register("name", {
                        required: {
                            value: true,
                            message: "User name is required"
                        }
                    })} />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" size="small" color="primary" variant="contained">Submit</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default UserCreationForm;