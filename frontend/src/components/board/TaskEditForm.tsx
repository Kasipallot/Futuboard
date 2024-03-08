import { Button, ClickAwayListener, Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material";
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

    const initialFormValues = {
        taskTitle: task.title,
        corners: task.caretakers,
        cornerNote: task.cornernote,
        description: task.description,
        color: task.color,
        size: task.size,
    };

    const { register, handleSubmit, control, formState: { errors }, setValue, watch, getValues  } = useForm<FormData>({
        //set initial values form the task prop
        defaultValues: initialFormValues
    });

    const selectedColor = watch("color");

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue("color", event.target.value);
    };

    const closeModule = () => {
        if(JSON.stringify(initialFormValues) === JSON.stringify(getValues())) {
            onCancel();
            return;
        }
        handleSubmit(onSubmit)();
    };

    const handleFormSubmit = (data: FormData) => {
        onSubmit(data);
    };

    return (
        <ClickAwayListener onClickAway={closeModule}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                    <TextField type="number" placeholder="size" InputLabelProps={{ shrink: true }} helperText={errors.size?.message} error={Boolean(errors.size)} {...register("size", {
                        valueAsNumber: true,
                        min: {
                            value: 0,
                            message: "Size must be at least 0"
                        },
                        max: {
                            value: 99,
                            message: "Size must be smaller than 100"
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
                    <FormControl component="fieldset">
                        <Typography variant="subtitle1">Color</Typography>
                        <RadioGroup row aria-label="color" value={selectedColor} onChange={handleColorChange}>
                            <FormControlLabel value="#ffffff" control={<Radio style={{ color: "#ffffff" }} />} label={null} />
                            <FormControlLabel value="#ffeb3b" control={<Radio style={{ color: "#ffeb3b" }} />} label={null} />
                            <FormControlLabel value="#8bc34a" control={<Radio style={{ color: "#8bc34a" }} />} label={null} />
                            <FormControlLabel value="#ff4081" control={<Radio style={{ color: "#ff4081" }} />} label={null} />
                            <FormControlLabel value="#03a9f4" control={<Radio style={{ color: "#03a9f4" }} />} label={null} />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" color="primary" variant="contained">Save Changes</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </Grid>
            </Grid>
        </form>
        </ClickAwayListener>
    );
};

export default TaskEditForm;
