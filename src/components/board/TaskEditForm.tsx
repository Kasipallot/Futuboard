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
    size: number;
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
                    <Controller
                        name="taskTitle"
                        control={control}
                        defaultValue={task.title}
                        rules={{
                            required: {
                                value: true,
                                message: "Task name is required"
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Name"
                                multiline
                                maxRows={3}
                                fullWidth
                                inputProps={{ spellCheck: "false" }}
                                helperText={errors.taskTitle?.message}
                                error={Boolean(errors.taskTitle)}
                                onKeyDown={(event) => { // the multiline field starts a new line when enter is pressed which doesnt make sense for a title, thus just send the form
                                    if (event.key === "Enter") {
                                        event.preventDefault();
                                        handleSubmit(onSubmit)();
                                    }
                                }}
                            />
                        )}

                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField type="number" placeholder="size" InputLabelProps={{ shrink: true, }} helperText={errors.size?.message} error={Boolean(errors.size)} {...register("size", {
                        valueAsNumber: true,
                        min: {
                            value: 0,
                            message: "Size must be at least 0"
                        },
                        max: {
                            value: 1000,
                            message: "Size must be at most 1000"
                        }
                    })} />
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
                    <TextField label="Description" multiline rows={15} fullWidth {...register("description", { //rows amount hardcoded due to bug with multiline textAreaAutoSize
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