import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList({ onEdit }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get("http://localhost:8000/get_users.php");
        setUsers(response.data);
    };

    const deleteUser = async (id) => {
        await axios.post("http://localhost:8000/delete_user.php", { id });
        fetchUsers();
    };

    return (
        <div>
            <h2>User List</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => onEdit(user)}>Edit</button>
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;
