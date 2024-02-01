import { Draggable, Droppable, DroppableProvided } from "@hello-pangea/dnd";

import { User } from "@/types";

import UserMagnet from "./UserMagnet";

interface UserListProps {
    users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    return (
        <Droppable droppableId="user-list" type="user" direction="horizontal" >
            {(provided: DroppableProvided) => {
                return(
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ display: "flex",
                        alignItems: "center",
                        border: "solid 1px black",
                        borderRadius: "10px",
                        }}
                    >
                        {users && users.map((user, index) => (
                            <Draggable key={user.userid} draggableId={user.userid} index={index} >
                                {(provided) => {
                                    return (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <UserMagnet user={user} />
                                        </div>
                                    );
                                }}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                );

            }}
        </Droppable>
    );
};

export default UserList;