import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

interface TaskCreationFormProps {
    onSubmit: any,
    onCancel: any,

}

const TaskCreationForm : React.FC<TaskCreationFormProps> = (props) => {
    const {  register, handleSubmit, formState: {errors} } = useForm({
        defaultValues:{
            taskTitle : "",
            corner1 : "",
            corner2 : "",
            description : "",
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
            <Grid container spacing = {2}>
                <Grid item xs={12}>
                    <Typography gutterBottom variant="h6" > Create task </Typography>
                    <Divider/>
                </Grid>
                <Grid item xs={12}>
                <TextField label='Name' helperText = {errors.taskTitle?.message} error = {Boolean(errors.taskTitle)} {...register("taskTitle", {
                minLength: {
                    value : 3,
                    message: "Task name must be at least 3 characters"
                },
                required: {
                    value: true,
                    message: "Task name is required"
                }
            })} />  
                </Grid>
                <Grid item xs={12}>
                <TextField label='size' type="number"
          InputLabelProps={{
            shrink: true,
          }}
           {...register("sizeEstimate", {
                    
                })} />
                
                
                </Grid>
                <Grid item xs={12}>
                <TextField label='Corner 1' {...register("corner1", {
                    
                })} />
                
                </Grid>
                <Grid item xs={12}>
                <TextField label='Corner 2' {...register("corner2", {
                    
                })} />
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