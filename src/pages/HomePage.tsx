import { useNavigate } from 'react-router-dom';



function HomePage() {

    const navigate = useNavigate();

    const handleClickEvent = (e: EventTarget) => {
        console.log(e);
        navigate('/auth');
    }

    return (
        <div>
        <h1 className="text-5xl font-bold text-white justify-center m-25 text-center">Project Manager App</h1>
        <div className="flex justify-center">
            <button className="bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white p-3 m-5 rounded-3" onClick={(e) => handleClickEvent(e.target)}>Login/Register</button>
        </div>
        </div>
    );
}
export default HomePage;