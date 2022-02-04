import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";



const Dashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();


    const handleLogOut = async (e) => {
        e.preventDefault();

        try {

            await logout();
            navigate("/login");
        }catch(er) {
            console.log(er)
            console.log("faild to sign out");
        }
    }
    
    return(
        <div className = 'text-center'>
            <div className="text-uppercase">Dashboard</div>

            <div>
                <Link to="/profile">Profile</Link>
            </div>

            <div>
                <Link to = "/log-in" onClick={ handleLogOut }>sign out</Link>
            </div>
        </div>
    )
}

export default Dashboard;