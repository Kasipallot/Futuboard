import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomeButton = () => {
    const navigate = useNavigate();
    return (
      <Button onClick={() => navigate("/")}>
        <Typography>Home</Typography>
      </Button>
    );
  };

  export default HomeButton;