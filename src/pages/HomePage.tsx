import { useNavigate } from 'react-router-dom';



function HomePage() {

    const navigate = useNavigate();

    const handleClickEvent = (e: EventTarget) => {
        navigate('/auth');
    }

    return (
        <div>
        <h1 className="text-4xl font-bold text-white justify-center text-center">Project Manager App</h1>
        <div className="flex justify-center">
            <button className="bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white p-3 m-5" onClick={(e) => handleClickEvent(e.target)}>Login/Register</button>
        </div>
        </div>
    );
}
export default HomePage;