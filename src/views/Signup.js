import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';

const Signup = () => {
    // hanlde form
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passConfirm, setPassConfirm] = useState("");
    const [error, setErrors] = useState("");

    // handle data
    const { signup, currentUser } = useAuth();
    const [loading, setLoading] = useState('idle');
    const navigate = useNavigate();

    // handle Auth users
    useEffect(() => {
        if( currentUser ) {
            navigate("/");
        };

    }, [currentUser, navigate]);
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // check password matching
        if( password !== passConfirm || !password.trim() ) {
            let msg = "Passwords do not match!";

            setErrors(msg);
            return;
        };

        try{
            setErrors("");
            setLoading("loading");
            await signup(email, password);
            setLoading("idle");
            navigate("/");
        }
        catch( err ){

            setLoading("idle");
            setErrors("faild to signup!");
        };

    };

    
    return (

        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Sign Up</h2>
                { error && <Alert variant = "danger" className='errors'>{ error }</Alert> }

                <Form onSubmit = { handleSubmit }>
                    <Form.Group className = "mb-4">
                        <Form.Label htmlFor='email'> Email </Form.Label>
                        <Form.Control className='form-control' 
                        id       = "email" 
                        name     = "email" 
                        type     ="email" 
                        onChange = { (e) => setEmail(e.target.value) } 
                        required />
                    </Form.Group>

                    <Form.Group className = "mb-4">
                        <Form.Label htmlFor = "password"> Password </Form.Label>
                        <Form.Control className='form-control' 
                        id       = "password" 
                        name     = "password" 
                        type     = "password" 
                        onChange = { (e) => setPassword(e.target.value) } 
                        required />
                    </Form.Group>
                    
                    <Form.Group className = "mb-4" >
                        <Form.Label htmlFor = "password-confirm"> Password Confirmation </Form.Label>
                        <Form.Control 
                        className = 'form-control' 
                        id        = "password-confirm" 
                        name     = "password" 
                        type      ="password" 
                        onChange  = { (e) => setPassConfirm(e.target.value) }
                        required />
                    </Form.Group>

                    <Button 
                    disabled  = { loading === "idle" ? false : true } 
                    className = "w-100" 
                    type      = "submit">
                        { loading === "idle" ? "Sign Up" : <Spinner animation="border" /> }
                    </Button>
                </Form>
            </Card.Body>
            
            <div className='text-center mb-4'>
                Already have an account? <Link to = "/login">Log in</Link>
            </div>
        </Card>
    );
};

export default Signup;





















        // <form onSubmit = { handleSubmit }>
        //     { errors.length ? displayErrors() : null }
        //     <div className="form-group">
        //         <label>email</label>
        //         <input type="text" onChange={(e) => setEmail(e.target.value)}/>
        //     </div>

        //     <div className="form-group">
        //         <label>password</label>
        //         <input type="password" onChange={(e) => setPassword(e.target.value)}/>
        //     </div>

        //     <div className="form-group">
        //         <label>password confirmation</label>
        //         <input type="password" onChange={(e) => setPassConfirm(e.target.value)}/>
        //     </div>
            
        //     <button >Sign Up</button>
        //     <div>
        //         already have an account? <Link to = "/login">login</Link>
        //     </div>
        // </form>