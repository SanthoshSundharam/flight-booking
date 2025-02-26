import React, { useState } from "react";
import axios from "axios";

function CreateUser({ onUserAdded }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const addUser = async () => {
        if (!name || !email) {
            setMessage("Please enter both name and email.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/add_user", { name, email });
            setMessage(response.data.message);
            onUserAdded(); // Refresh user list
            setName("");
            setEmail("");
        } catch (error) {
            setMessage("Error adding user.");
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Add User</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={addUser}>Add</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CreateUser;
