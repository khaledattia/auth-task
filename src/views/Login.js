import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Alert} from 'react-bootstrap';
import { useAuth } from "../contexts/AuthContext";
import { MobileLogin } from '../components/MobileLogin';
import { EmailLogin } from '../components/EmailLogin';

const Login = () => {
    // Context State
    const { currentUser } = useAuth();
    // UI State
    const [error, setError] = useState("");
    const [step, setStep] = useState(1);
    const [method, setMethod] = useState("mobile");
    const [loading, setLoading] = useState('idle');
    // navigation hook
    const navigate = useNavigate();
    
    // ---------------------------------------------
    

    useEffect(() => {
        if( currentUser ) {
            navigate("/");
        };

    }, [ currentUser, navigate ]);

    const handleLoginMethod = (e, m) => {
        e.preventDefault();
        setMethod(m);
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Log In</h2>
                    { error && <Alert variant = "danger" className='errors'>{ error }</Alert> }

                    <ul className = "nav nav-pills nav-fill mb-4">
                        <li className = "nav-item">
                            <a 
                            className = {`nav-link ${method === "email" ? "active": ""} 
                            ${step === 2? "disabled" : ""}`}  
                            aria-current="page" 
                            href='/' 
                            onClick={ (e) => { handleLoginMethod(e, "email"); setError("") } }>Login with Email</a>
                        </li>

                        <li className = "nav-item">
                            <a 
                            className = {`nav-link ${method === "mobile" ? "active": ""}`} 
                            href='/' 
                            onClick={ (e) => { handleLoginMethod(e, "mobile"); setError("") } }>
                                Login With Mobile
                            </a>
                        </li>
                    </ul>

                    {
                        method === "email" ? 
                        <EmailLogin 
                        setError   = { setError }
                        setLoading = { setLoading }
                        loading    = { loading } /> : 

                        <MobileLogin 
                        loading    = { loading }
                        step       = { step }
                        setStep    = { setStep }
                        setError   = { setError }
                        setLoading = { setLoading } /> 
                    }

                </Card.Body>
            </Card>

        </>
    );
};

export default Login;