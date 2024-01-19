import { Typography } from "@mui/material";

import { User } from "@/types";

interface UserMagnetProps {
    user: User;
}

const UserMagnet: React.FC<UserMagnetProps> = ({ user }) => {

    //make magnet styles
    //make droppable
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center", margin: "5px", border: "solid 1px", borderRadius: "10px", color: "black", width: "60px", overflow: "hidden", height:"20px"
        }}>
            <Typography sx={{
                fontSize: "13px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: "inline-block",
                }}>{user.name}</Typography>
        </div>
    );
};

export default UserMagnet;
