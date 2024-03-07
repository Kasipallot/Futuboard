import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

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
    cornerNote: string;
    description: string;
    color: string;
    size: number;
}

const TaskEditForm: React.FC<TaskEditFormProps> = (props) => {

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
            cornerNote: task.cornernote,
            description: task.description,
            color: task.color,
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
                                onKeyDown={(event: { key: string; preventDefault: () => void; }) => { // the multiline field starts a new line when enter is pressed which doesnt make sense for a title, thus just send the form
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
                            value: 99,
                            message: "Size must be at smaller than 100"
                        }
                    })} />
                </Grid>
                <Grid item xs={240}>
                    <TextField label="Corner note" fullWidth {...register("cornerNote", {
                    })} />
                </Grid>
                <Grid item xs={240}>
                    <TextField label="Description" multiline rows={11} fullWidth {...register("description", { //rows amount hardcoded due to bug with multiline textAreaAutoSize
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