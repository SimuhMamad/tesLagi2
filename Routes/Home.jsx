// TODO: answer here
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
    <div>
        <button data-testid="student-btn" onClick={() => {
            navigate("/student");
        }}>
            All Student
        </button>
    </div> // TODO: replace this
    )
};

export default Home;
