import { useState, useContext, type FormEvent } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { apiClient } from '../clients/api';
import { useNavigate } from 'react-router-dom';

function AuthPage () {

    const [isSignIn, setIsSignIn] = useState(true);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const { logIn, register } = useContext(AuthContext);

    const navigate = useNavigate();

const loginFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
        setError("");
        if (!email || !password) return;
        logIn(email, password);
        navigate('/projects');
    } catch (error: any) {
        console.error(error.message);
        setError(error.message);
    }
}

const registerFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
        setError("");
        if (!userName || !email || !password || !confirmPassword) return;

        register(userName, email, password);
        setIsSignIn(true);
        // eslint-disable-next-line @typescript-eslint//no-explicit-any
    } catch(error: any) {
        console.error(error.message);
        setError(error.message);
    }
}

return (
    <>
    {isSignIn == true &&
        <div className="flex justify-center mt-10">
            <form className="text-white flex flex-col border border-blue-500 w-75 align-center justify-center gap-6 p-5">
                <input name="loginUser" value={userName} placeholder="Enter username..." onChange={(e) => setUserName(e.target.value)}/>
                <input name="loginEmail" value={email} placeholder="Enter email..." onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" value={password} name="loginPassword" placeholder="Enter password..." onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" onClick={(e) => loginFormSubmit(e)} className="bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white p-3 w-50 justify-self-center self-center">Login</button>
                <button onClick={() => setIsSignIn(false)} className="bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white p-3 w-50 justify-self-center self-center">New User?</button>
            </form>

        </div>
        }
            {isSignIn == false &&
        <div className="flex justify-center mt-10">
            <form className="text-white flex flex-col border border-blue-500 w-75 align-center justify-center gap-6 p-5">
                <input name="registerUser" placeholder="Enter username..." onChange={(e) => setUserName(e.target.value)}/>
                <input name="registerEmail" placeholder="Enter email..." onChange={(e) => setEmail(e.target.value)}/>
                <input name="registerPassword" placeholder="Enter password..." onChange={(e) => setPassword(e.target.value)}/>
                <input name="confirmPassword" placeholder="Confirm password..." onChange={(e) => setConfirmPassword(e.target.value)}/>
                <button type="submit" onClick={(e) => registerFormSubmit(e)} className="bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white p-3 w-50 justify-self-center self-center">Login</button>
                <button onClick={() => setIsSignIn(true)} className="bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white p-3 w-50 justify-self-center self-center">Existing User?</button>
            </form>

        </div>
        }
    </>
)
}

export default AuthPage;