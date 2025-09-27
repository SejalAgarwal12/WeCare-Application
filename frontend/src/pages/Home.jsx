import '../styles/home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
  return (
    <div className='main-content'>
        <h2>We are at the heart of appropiate care</h2>
        <div className='card'>
            <div className="coach-cards">
                <h3>For Coaches</h3>
                <p>Join WeCare and guide people towards better confidence and health.</p>
                <button onClick={()=>navigate('/coachLogin')}><i>Login as a coach</i></button>
                <button onClick={()=>navigate('/coachSignup')}><i>Join as a coach</i></button>
            </div>

            <div className="user-card">
                <h3>For Users</h3>
                <p>Find the best coaches, book appointments, and take care of your wellbeing.</p>
                <button onClick={()=>navigate('/userLogin')}><i>Login as a user</i></button>
                <button onClick={()=>navigate('/userSignup')}><i>Join as a user</i></button>
            </div>

        </div>
    </div>
  )
}

export default Home