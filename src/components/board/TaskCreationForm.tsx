import { Autocomplete, Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useGetBoardQuery } from "../../state/apiSlice";
import { User } from "../../types";

interface TaskCreationFormProps {
    onSubmit: (data: FormData) => void,
    onCancel: () => void,

}

interface FormData {
    taskTitle: string;
    corners: User[];
    description: string;
    color: string;
    size: number;
}

const TaskCreationForm: React.FC<TaskCreationFormProps> = (props) => {

    const { id = "default-id" } = useParams();

    //focus on the title field when the form is opened
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, []);

    //get board data to see users to assign as caretakers
    const board = useGetBoardQuery(id);

    const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            taskTitle: "",
            corners: [],
            description: "",
            color: "#ffffff",
            size: 0,
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
                    <Typography gutterBottom variant="h6" > Create Card </Typography>
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
                    onKeyDown={(event) => {
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
                    <TextField label="Description" multiline minRows={6} maxRows={15} fullWidth {...register("description", {
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

export default TaskCreationForm;