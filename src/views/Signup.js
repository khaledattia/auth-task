import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import { Form, Button, Card, Alert } from 'react-bootstrap';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passConfirm, setPassConfirm] = useState("");
    const [errors, setErrors] = useState([]);
    const { signup, currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if( currentUser ) {
            navigate("/");
        };

    }, [currentUser, navigate]);
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // check password matching
        if( password !== passConfirm || !password.trim() ) {
            let msg = "password do not match!";
            
            if( !existError(msg)) {
                setErrors([...errors, msg]);
            }

            return;
        }

        try{
            setErrors([]);
            await signup(email, password)
            navigate("/");
        }catch( err ){
            console.log(err)
            setErrors([...errors, "faild to signup!"]);
        }

    }


    const existError = ( msg ) => {
        
        let i = errors.length;
            
        while( i-- ){
            if( errors[i] === msg ){
                return true;
            }

        }            
        
        return false;
    }
    

    const displayErrors = () => {
        return errors.map((error, i) => <Alert variant = "danger" key = { i } className='errors'>{ error }</Alert>)
    }

    return (

        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Sign Up</h2>
                { errors.length ? displayErrors() : null }

                <Form onSubmit = { handleSubmit }>
                    <Form.Group className = "mb-4">
                        <Form.Label htmlFor='email'>Email</Form.Label>
                        <Form.Control className='form-control' id = "email" type="email" required onChange = { (e) => setEmail(e.target.value) } />
                    </Form.Group>

                    <Form.Group className = "mb-4">
                        <Form.Label htmlFor = "password">Password</Form.Label>
                        <Form.Control className='form-control' id = "password" name = "password" type = "password" required onChange = { (e) => setPassword(e.target.value) } />
                    </Form.Group>
                    
                    <Form.Group className = "mb-4" >
                        <Form.Label htmlFor = "password-confirm">Password Confirmation</Form.Label>
                        <Form.Control className='form-control' id="password-confirm" type="password" required onChange = { (e) => setPassConfirm(e.target.value) } />
                    </Form.Group>

                    <Button className = "w-100" type = "submit">Sign Up</Button>
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