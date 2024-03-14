import { DeleteForever } from "@mui/icons-material";
import { Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Box, Typography, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useEffect, useRef } from "react";
import React from "react";
import { useForm } from "react-hook-form";

import { useDeleteColumnMutation } from "@/state/apiSlice";

import { Column } from "../../types";

interface DeleteColumnButtonProps {
    column: Column;
}

const DeleteColumnButton: React.FC<DeleteColumnButtonProps> = ({ column }) => {

    const [deleteColumn] = useDeleteColumnMutation();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete =  () => {
        deleteColumn({ column: column });
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title="Delete Column">
                <IconButton onClick={handleClickOpen}>
                    <DeleteForever />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this Column? This action cannot be undone. This will also delete all cards in this column.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

interface AddColumnCreationFormProps {
    onSubmit: (data : FormData) => void,
    onCancel: () => void,
    column : Column
}

interface FormData {
    columnTitle: string;

}

const ColumnEditForm : React.FC<AddColumnCreationFormProps> = (props) => {

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, []);

    const {
        onSubmit,
        onCancel,
        column,
    } = props;

    const {  register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues:{
            columnTitle : column.title
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography><b>{column.title}</b></Typography>
                        <DeleteColumnButton column={column} />
                    </Box>
                    <Divider/>
                </Grid>
                <Divider/>
                <Grid item xs={12}>
                <TextField inputRef={inputRef} label="Name" helperText={errors.columnTitle?.message} error={Boolean(errors.columnTitle)} {...register("columnTitle", {
                minLength: {
                    value : 3,
                    message: "Column name must be at least 3 characters"
                },
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

export default ColumnEditForm;