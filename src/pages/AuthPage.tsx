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
        <div>
            <form>
                <input name="loginUser" value={userName} placeholder="Enter username..." onChange={() => setUserName}/>
                <input name="loginEmail" value={email} placeholder="Enter email..." onChange={() => setEmail}/>
                <input type="password" value={password} name="loginPassword" placeholder="Enter password..." onChange={() => setPassword}/>
                <button type="submit" onClick={() => loginFormSubmit}>Login</button>
                <button onClick={() => setIsSignIn(false)}>Register</button>
            </form>

        </div>
        }
            {isSignIn == false &&
        <div>
            <form>
                <input name="registerUser" placeholder="Enter username..." onChange={() => setUserName}/>
                <input name="registerEmail" placeholder="Enter email..." onChange={() => setEmail}/>
                <input name="registerPassword" placeholder="Enter password..." onChange={() => setPassword}/>
                <input name="confirmPassword" placeholder="Confirm password..." onChange={() => setConfirmPassword}/>
                <button type="submit" onClick={() => registerFormSubmit}>Login</button>
                <button onClick={() => setIsSignIn(true)}>Login</button>
            </form>

        </div>
        }
    </>
)
}

export default AuthPage;