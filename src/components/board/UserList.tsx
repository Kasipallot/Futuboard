import { User } from "@/types";

import UserMagnet from "./UserMagnet";

interface UserListProps {
    users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            border: "solid 1px black",
            borderRadius: "10px",
        }}>
            {users.map((user) => (
                <UserMagnet key={user.userid} user={user} />
            ))}
        </div>
    );
};

export default UserList;
