import { createBrowserRouter } from 'react-router-dom';
import Root from '../Layouts/Root';
import Home from '../Pages/Home/Home';
import Register from '../Pages/Register/Register';
import Login from '../Pages/Login/Login';
import EmailVerification from '../Pages/Register/EmailVerification';
import ChatField from '../Pages/Dashboard/Chats/ChatField';
import Desktop from '../Layouts/Desktop';
import Profile from '../Pages/Dashboard/Profile/Profile';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/emailVerification",
                element: <EmailVerification />
            },
            {
                path: "/profile",
                element: <Profile />
            }
        ]
    },
    {
        path: "/chat",
        element: <Desktop />,
        children: [
            {
                path: "/chat/:email",
                element: <ChatField />
            }
        ]
    }
]);