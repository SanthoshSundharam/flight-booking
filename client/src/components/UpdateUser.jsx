import React, { useState } from "react";
import axios from "axios";

function UpdateUser({ user, onUpdate }) {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const updateUser = async () => {
        await axios.post("http://localhost:8000/update_user.php", { id: user.id, name, email });
        onUpdate();
    };

    return (
        <div>
            <h2>Edit User</h2>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={updateUser}>Update</button>
        </div>
    );
}

export default UpdateUser;
