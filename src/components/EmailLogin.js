import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Form, Button, Spinner } from 'react-bootstrap';




export const EmailLogin = ( props ) => {
    // Form State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Context State
    const { login } = useAuth();
    const navigate = useNavigate();
    const {
        setError,
        setLoading,
        loading
    } = props;


    // ----------------------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            setError("");
            setLoading("loading");
            await login(email, password);
            setLoading("idle");
            navigate("/");

        }
        catch {
            setLoading("idle");
            setError("faild to sign in!");
        }

    }


    return (
        <>
            <Form onSubmit = { handleSubmit }>
                <Form.Group className = "mb-4">
                    <Form.Label htmlFor = 'email'> Email </Form.Label>
                    <Form.Control 
                    className = 'form-control' 
                    id        = "email" 
                    name      = "email"
                    type      = "email" 
                    onChange = { (e) => setEmail(e.target.value) }
                    required />
                </Form.Group>

                <Form.Group className = "mb-4">
                    <Form.Label htmlFor = "password"> Password </Form.Label>
                    <Form.Control 
                    className ='form-control' 
                    id        = "password" 
                    name      = "password" 
                    type      = "password" 
                    onChange  = { (e) => setPassword(e.target.value) }
                    required  />
                </Form.Group>

                <Button 
                disabled  = { loading === "idle" ? false : true } 
                className = "w-100" 
                type      = "submit">
                    { loading === "idle" ? "Log In" : <Spinner animation="border" /> }
                </Button>
            </Form>

            <div className='text-center my-4'>
                Need an account? <Link to = "/sign-up"> Sign Up </Link>
            </div>
        </>
    );
};