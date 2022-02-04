import { Link } from 'react-router-dom';

const Profile = () => {

    return (
        <div className = 'text-center'>
            <div className="text-uppercase">Profile</div>
            <div>
                <Link to="/">Dashboard</Link>
            </div>
        </div>

    );
};

export default Profile;