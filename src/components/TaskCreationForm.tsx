import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useGetBoardQuery } from "../state/apiSlice";
import { useParams } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";


interface TaskCreationFormProps {
    onSubmit: any,
    onCancel: any,

}

const TaskCreationForm: React.FC<TaskCreationFormProps> = (props) => {

    const { id = 'default-id' } = useParams() //theres maybe a better way to get the id / save it into the apislice somehow
    const board = useGetBoardQuery(id)

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            taskTitle: "",
            corners: [],
            description: "",
            color: "#ffffff",
            sizeEstimate: ""
        }
    });

    const {
        onSubmit,
        onCancel,
    } = props;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography gutterBottom variant="h6" > Create task </Typography>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Name' helperText={errors.taskTitle?.message} error={Boolean(errors.taskTitle)} {...register("taskTitle", {
                        minLength: {
                            value: 3,
                            message: "Task name must be at least 3 characters"
                        },
                        required: {
                            value: true,
                            message: "Task name is required"
                        }
                    })} />
                </Grid>
                <Grid item xs={12}>
                    <TextField  type="number" placeholder ="size" InputLabelProps={{ shrink: true, }} {...register("sizeEstimate", {})} />
                </Grid>
                <Grid item xs={12}>
                    <>
                        {!board.data?.users ? (
                            <p>no users, add users to assign caretakers (button to add users)</p>
                        ) : (
                            <>
                                <Controller
                                    name="corners"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <Autocomplete
                                            multiple
                                            id="tags-standard"
                                            options={board.data?.users || []}
                                            getOptionLabel={(option) => option.name}
                                            value={value || []}
                                            onChange={(_event, newValue) => {
                                                onChange(newValue);
                                            }}
                                            isOptionEqualToValue={(option, value) => option.id === value.id}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Assignees"  />
                                            )}
                                        />
                                    )}
                                />
                            </>


                        )}
                    </>
                </Grid>
                <Grid item xs={240}>
                    <TextField label='Description' multiline rows={6} fullWidth {...register("description", {
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



export default TaskCreationForm