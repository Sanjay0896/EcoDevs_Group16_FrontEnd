import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/authContext/index.js'; // Adjust the import path as necessary
import axios from 'axios';
import PopUp from './components/PopUp';

const LoginComponant = () => {
    const navigate = useNavigate();

    const { setCurrentDBUser } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentUserId, setCurrentUserId] = useState('');
    const [popUp, setPopUp] = useState({ isVisible: false, message: '' }); // PopUp state

    const showPopUp = (message) => {
        setPopUp({ isVisible: true, message });
        setTimeout(() => {
            setPopUp({ isVisible: false, message: '' }); // Automatically close the pop-up after some time
        }, 5000); // Adjust time as needed
    };

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the form from refreshing the page
        try {
            const isEmailVerified = true;
            if (isEmailVerified) {
                // Email is verified, proceed with the application flow
                try {

                    const data = new URLSearchParams();
                    data.append("email", email);
                    data.append("password", password);

                    const config = {
                        method: 'post',
                        url: 'http://127.0.0.1:8000/login/',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Cookie': 'csrftoken=Q10eo92VTUqH3eLEtYyYOD5bKGAkL9ix'
                        },
                        data: data
                    };

                    axios(config)
                        .then(response => {
                            console.log(response.data);
                            if (response.status === 200) {
                                const userData = response.data; // Assuming the server returns user data
                                setCurrentUserId(userData.user_id);

                                const response2 = axios.get('http://127.0.0.1:8000/api/extendedusers', {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                });
                                response2.then(response2 => {
                                    if (response2.status === 200) {
                                        const userData2 = response2.data;
                                        const foundUser = userData2.find(user => user.user === userData.user_id);

                                        if (foundUser) {
                                            console.log('Found user:', foundUser);
                                            setCurrentDBUser(foundUser);
                                        } else {
                                            console.log('User not found.');
                                        }
                                        navigate('/'); // Redirect to the home page
                                    }
                                })

                            } else {
                                // Handle authentication failure
                                console.error("Failed to log in: ", response.statusText);
                                // Handle errors (e.g., show an error message)
                            }
                        })
                        .catch(error => {
                            console.log('error', error);
                        });

                    // const response = await axios.post('http://127.0.0.1:8000/login/', {
                    //     email: email,
                    //     password: password
                    // }, {
                    //     headers: {
                    //         'Content-Type': 'application/x-www-form-urlencoded'
                    //     }
                    // });


                } catch (error) {
                    console.error("Failed to log in: ", error.message);
                    // Handle errors (e.g., show an error message)
                }
                // Redirect or update state as needed
            } else {
                // Email is not verified
                showPopUp("Please verify your email to proceed.");
                // Handle accordingly, maybe show a message or redirect to a help page
            }
        } catch (error) {
            // Handle sign-in errors (e.g., show a notification or message)
            showPopUp("Sign-in failed: " + error.message);
        }

    };

    return (
        <>

            <div class="bg-gray-100 flex justify-center items-center h-screen">
                <div class="w-1/2 h-screen hidden lg:block">
                    <img src="/img/login.jpg" alt="Placeholder Image" class="object-cover w-full h-full" />
                </div>
                <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                    <h1 class="text-2xl font-semibold mb-4">Login</h1>
                    <form action="#" method="POST">
                        <div class="mb-4">
                            <label for="username" class="block text-gray-600">Username</label>
                            <input type="email"
                                name="email"
                                placeholder="Email"
                                required onChange={(e) => setEmail(e.target.value)} class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off" />
                        </div>
                        <div class="mb-4">
                            <label for="password" class="block text-gray-600">Password</label>
                            <input type="password"
                                name="password"
                                placeholder="Password"
                                required onChange={(e) => setPassword(e.target.value)} class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off" />
                        </div>
                        <div class="mb-4 flex items-center">
                            <input type="checkbox" id="remember" name="remember" class="text-blue-500" />
                            <label for="remember" class="text-gray-600 ml-2">Remember Me</label>
                        </div>
                        <div class="mb-6 text-blue-500">
                            <a href="#" class="hover:underline">Forgot Password?</a>
                        </div>
                        <button onClick={handleLogin} type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
                    </form>
                    <div class="mt-6 text-blue-500 text-center">
                        <a href="#" onClick={() => { navigate("/register") }} class="hover:underline">Sign up Here</a>
                    </div>
                    <div class="mt-6 text-blue-500 text-center">
                        <a href="#" onClick={() => { navigate("/") }} class="hover:underline">Back to Home</a>
                    </div>
                </div>
                < PopUp isVisible={popUp.isVisible} message={popUp.message} onClose={() => setPopUp({ isVisible: false, message: '' })} />

            </div>
        </>
    );
};

export default LoginComponant;