import { Button } from 'flowbite-react';
import { auth } from '../context/firebase';

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            await auth.signOut();
            console.log("User logged out successfully!");
        } catch (error) {
            console.error("Failed to log out: ", error.message);
        }
    };

    return (
        <Button onClick={handleLogout}>Logout</Button>
    );
}

export default LogoutButton;