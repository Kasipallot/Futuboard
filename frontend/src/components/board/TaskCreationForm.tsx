import { Button, Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import { User } from "../../types";

interface TaskCreationFormProps {
    onSubmit: (data: FormData) => void,
    onCancel: () => void,
}

interface FormData {
    taskTitle: string;
    cornerNote: string;
    corners: User[];
    description: string;
    color: string;
    size: number | undefined;
}

const TaskCreationForm: React.FC<TaskCreationFormProps> = (props) => {
    // Focus on the title field when the form is opened
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
        defaultValues: {
            taskTitle: "",
            corners: [],
            cornerNote: "",
            description: "",
            color: "#ffffff",
            size: undefined,
        }
    });

    const { 
        onSubmit, 
        onCancel 
    } = props;
    
    const selectedColor = watch("color");

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue("color", event.target.value);
    };

    const handleFormSubmit = (data: FormData) => {
        console.log(data); // Print the form data
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography gutterBottom variant="h6">Create Card</Typography>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Name" inputRef={inputRef} inputProps={{ spellCheck: "false" }} multiline fullWidth helperText={errors.taskTitle?.message} error={Boolean(errors.taskTitle)} {...register("taskTitle", {
                        required: {
                            value: true,
                            message: "Task name is required"
                        }
                    })}
//the multiline field starts a new line when enter is pressed which doesnt make sense for a title, thus just send the form
                        onKeyDown={(event: { key: string; preventDefault: () => void; }) => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                handleSubmit(onSubmit)();
                            }
                        }}
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
                <Grid item xs={12}>
                    <TextField label="Corner note" fullWidth {...register("cornerNote")} />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Description" multiline minRows={6} maxRows={15} fullWidth {...register("description")} />
                </Grid>
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <Typography variant="subtitle1">Color</Typography>
                        <RadioGroup row aria-label="color" value={selectedColor} onChange={handleColorChange}>
                            <FormControlLabel value="#ffffff" control={<Radio style={{ color: "#ffffff" }} />} checked={selectedColor === "#ffffff"} label={undefined} />
                            <FormControlLabel value="#ffeb3b" control={<Radio style={{ color: "#ffeb3b" }} />} checked={selectedColor === "#ffeb3b"} label={undefined} />
                            <FormControlLabel value="#8bc34a" control={<Radio style={{ color: "#8bc34a" }} />} checked={selectedColor === "#8bc34a"} label={undefined} />
                            <FormControlLabel value="#ff4081" control={<Radio style={{ color: "#ff4081" }} />} checked={selectedColor === "#ff4081"} label={undefined} />
                            <FormControlLabel value="#03a9f4" control={<Radio style={{ color: "#03a9f4" }} />} checked={selectedColor === "#03a9f4"} label={undefined} />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" color="primary" variant="contained">Submit</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default TaskCreationForm;
