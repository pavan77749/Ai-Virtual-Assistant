import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
export const UserDataContext = createContext();
const HOST_URL = import.meta.env.VITE_HOST_URL;

function UserDataProvider({ children }) {
    const [userData, setUserData] = useState(null);
    const handleCurrentUser = async() => {
        try {
            const response = await axios.get(`${HOST_URL}/api/user/me`, {
                withCredentials: true,
            });
            if (response.status === 200) {
                setUserData(response.data);
                console.log("Fetched user data:", response.data);
            } else {
                console.error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        handleCurrentUser();
    }, []);
    const value = { userData, setUserData, handleCurrentUser, HOST_URL };
    return (
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    );
}

export default UserDataProvider;
