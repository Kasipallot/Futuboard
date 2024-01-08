import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useGetBoardQuery } from "../../state/apiSlice";
import { User } from "../../types";
import { Task as TaskType } from "../../types";

interface TaskEditFormProps {
    onSubmit: (data: FormData) => void,
    onCancel: () => void,
    task: TaskType

}

interface FormData {
    taskTitle: string;
    corners: User[];
    description: string;
    color: string;
    size: string;
}

const TaskEditForm: React.FC<TaskEditFormProps> = (props) => {

    const { id = "default-id" } = useParams();
    const board = useGetBoardQuery(id);

    const {
        onSubmit,
        onCancel,
        task,
    } = props;

    const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
        //set initial values form the task prop
        defaultValues: {
            taskTitle: task.title,
            corners: task.caretakers,
            description: task.description,
            color: "#ffffff",
            size: task.size,
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography noWrap gutterBottom variant="h6" > {task.title}</Typography>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Name" helperText={errors.taskTitle?.message} error={Boolean(errors.taskTitle)} {...register("taskTitle", {
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
                    <TextField type="number" placeholder="size" InputLabelProps={{ shrink: true, }} {...register("size", {})} />
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
                                                <TextField {...params} label="Assignees" />
                                            )}
                                        />
                                    )}
                                />
                            </>

                        )}
                    </>
                </Grid>
                <Grid item xs={240}>
                    <TextField label="Description" multiline minRows={6} maxRows={15} fullWidth {...register("description", {
                    })} />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" color="primary" variant="contained">Save Changes</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default TaskEditForm;