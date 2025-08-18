
// frontend/src/contexts/UserContext.jsx
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [userData, setUserData] = useState(null);
    const addUserData = (patch) => setUserData((prev) => ({ ...(prev || {}), ...patch }));

    return (
        <UserContext.Provider value={{ userData, setUserData, addUserData }}>
            {children}
        </UserContext.Provider>
    );
}

export const useData = () => useContext(UserContext);
export const useUser = () => useContext(UserContext); // <-- real hook, not a class
