import { Draggable, DraggableStateSnapshot, DraggableStyle, Droppable, DroppableProvided } from "@hello-pangea/dnd";

import { User } from "@/types";

import UserMagnet from "./UserMagnet";

interface UserListProps {
    users: User[];
}

const dropStyle = (style: DraggableStyle | undefined, snapshot: DraggableStateSnapshot) =>  {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    //get rid of drop animation, else it dorps the user to the wrong place
    return {
      ...style,
      transform: "scale(0)",
      transition: `all ${0.01}s`,
    };
  };

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
                                {(provided, snapshot) => {
                                    return (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={dropStyle(provided.draggableProps.style, snapshot)}
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