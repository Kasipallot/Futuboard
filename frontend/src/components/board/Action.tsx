import { Draggable } from "@hello-pangea/dnd";
import { Box, ClickAwayListener, Typography } from "@mui/material";
import { useState } from "react";

import { useUpdateActionMutation } from "@/state/apiSlice";
import { Action as ActionType } from "@/types";

const Action: React.FC<{ action: ActionType, index: number }> = ({ action, index }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentTitle, setCurrentTitle] = useState(action.title);

    const [updateAction] = useUpdateActionMutation();

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = async () => {
        setIsEditing(false);

        if (currentTitle === action.title) {
            return;
        }

        const updatedAction = { ...action, title: currentTitle };
        await updateAction({ action: updatedAction });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setCurrentTitle(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            handleBlur();
        }
    };

    return (
    <Draggable key={action.actionid} draggableId={action.actionid} index={index}>
        {(provided) => (
            <Box boxShadow={1} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} sx={{ backgroundColor: "white", padding: "2px", marginBottom: "2px", borderRadius: "4px" }}>
                {isEditing ? (
                    <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={handleBlur}>
                        <input
                            name={"actionTitle"}
                            autoFocus
                            value={currentTitle}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            style={{
                                width: "100%",
                                boxSizing: "border-box",
                                padding: "4px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                fontSize: "12px",
                            }}
                        />
                    </ClickAwayListener>
                ) : (
                    <div onDoubleClick={handleDoubleClick}>
                        <Typography variant={"body1"} fontSize={12}>{currentTitle}</Typography>
                    </div>
                )}
            </Box>
        )}
    </Draggable>
);
};

export default Action;