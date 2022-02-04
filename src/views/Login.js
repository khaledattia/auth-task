import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { login, currentUser, phoneLogin, confirmCode } = useAuth();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [code, setCode] = useState("");
    const [step, setStep] = useState(1);
    const [method, setMethod] = useState("mobile");
    const [counter, setCounter] = useState(90);
    const navigate = useNavigate();
    const [loading, setLoading] = useState('idle')

    const mins = Math.floor(counter/60);
    const secs = Math.floor(counter%60);
    
    useEffect(() => {
        let intervalId = null;

        if(step === 2){

            intervalId = setInterval(() => {
                setCounter(prev => prev - 1)
            }, 1000);
        }

        return() => {
            if(intervalId){
                clearInterval(intervalId);
            }
        }
    
    }, [ step ]);

    useEffect(() => {
        if( currentUser ) {
            navigate("/");
        };

    }, [ currentUser, navigate ]);

    const handleSubmit = async (e) => {
        e.preventDefault();


        try{
            setErrors([]);
            setLoading("loading");
            await login(email, password);
            setLoading("idle");
            navigate("/");

        }catch {
            setLoading("idle");
            setErrors(["faild to sign in!"]);
        }

    }


    const handlePhoneSignIn = async (e) => {
        e.preventDefault();
        const regex = /^01[0125][0-9]{8}$/gm

        if( !phoneNumber.trim() ) {
            const msg = "Mobile field is require";

            if( !existError(msg) ){
                setErrors([msg]);
            }

            return;
        }

        if(!regex.test(phoneNumber)) {
            const msg = "Please enter a valid number!";
            if(!existError(msg)){
                setErrors([msg]);
            }
            return;
        }
        
        try{
            setErrors([]);
            setLoading("loading")
            await phoneLogin(phoneNumber);
            setLoading("idle");
            setStep(2);
        } catch(err) {
            setLoading("idle");
            console.log("faild to sign in")
        }
    }

    const handleCodeSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading("loading")
            await confirmCode( code );
            setLoading("idle")
            navigate("/");
        }catch(err){
            console.log(err)
            setLoading("idle");
            console.log("faild to sign in")
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

    const handleLoginMethod = (e, m) => {
        e.preventDefault();
        setMethod(m);
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Log In</h2>
                    { errors.length ? displayErrors() : null }

                    <ul className = "nav nav-pills nav-fill mb-4">
                        <li className = "nav-item">
                            <a 
                            className = {`nav-link ${method === "email" ? "active": ""} 
                            ${step === 2? "disabled" : ""}`}  
                            aria-current="page" 
                            href='/' 
                            onClick={ (e) => { handleLoginMethod(e, "email"); setErrors([]) } }>Login with Email</a>
                        </li>

                        <li className = "nav-item">
                            <a 
                            className = {`nav-link ${method === "mobile" ? "active": ""}`} 
                            href='/' 
                            onClick={ (e) => { handleLoginMethod(e, "mobile"); setErrors([]) } }>
                                Login With Mobile
                            </a>
                        </li>
                    </ul>


                    {method === "email" ? <>
                    
                        <Form onSubmit = { handleSubmit }>
                            <Form.Group className = "mb-4">
                                <Form.Label htmlFor='email'>Email</Form.Label>
                                <Form.Control className='form-control' id = "email" type="email" required onChange = { (e) => setEmail(e.target.value) } />
                            </Form.Group>

                            <Form.Group className = "mb-4">
                                <Form.Label htmlFor = "password">Password</Form.Label>
                                <Form.Control className='form-control' id = "password" name = "password" type = "password" required onChange = { (e) => setPassword(e.target.value) } />
                            </Form.Group>

                            <Button disabled = { loading === "idle" ? false : true } className = "w-100" type = "submit">
                                { loading === "idle" ? "Log In" : <Spinner animation="border" /> }
                            </Button>
                        </Form>
                        <div className='text-center my-4'>
                            Need an account? <Link to = "/sign-up">Sign Up</Link>
                        </div>
                    </> : null }

                    {method === "mobile" ? <div className = 'phone-panel mb-4' style={{ height: "116px" }}>
                        <Form className = {`form ${ step === 1 ? "Active__Step" : "hidden"}`} onSubmit = { handlePhoneSignIn }>
                            <div id = "sign-in-button"></div>
                            <Form.Label htmlFor = "mobile">Mobile</Form.Label>
                            <Form.Control 
                            type        = "text" 
                            className   = 'mb-2'
                            id          = "mobile" 
                            placeholder = 'Enter mobile Number' 
                            name        = 'mobile' 
                            onChange    = { (e) => setPhoneNumber(e.target.value) }/>
                            <Button disabled = { loading === "idle" ? false : true } type='submit' className = 'w-100'>
                                { loading === "idle" ? "Send OTP" : <Spinner animation="border" /> }
                            </Button>
                        </Form>

                        <Form className = {`form ${ step === 2 ? "Active__Step" : "hidden"}`} onSubmit={ handleCodeSubmit }>
                            <Form.Label htmlFor = "otp">OTP Verification</Form.Label>
                            <Form.Control 
                            type        = "text" 
                            className   = 'mb-2'
                            id          = "otp" 
                            placeholder = 'Enter OTP' 
                            name        = 'otp' 
                            onChange    = { (e) => setCode(e.target.value) }/>
                            <Button disabled = { loading === "idle" ? false : true } type = 'submit' className = 'w-100 mb-1'>
                                {loading === "idle" ? "Confirm" : <Spinner animation="border" />}
                            </Button>
                            <div className='counter'>
                                {
                                    counter > 0 ? 
                                    `0${mins}:${secs < 10 ? `0${secs}` : secs} and OTP will be expired` : 
                                    <span>if you didn't receive a code you can click&nbsp; 
                                        <span 
                                        className='text-primary'
                                        role = "button" 
                                        onClick = { (e) => {handlePhoneSignIn(e); setCounter(90); console.log(phoneNumber)} }>
                                            Re-send
                                        </span>
                                    </span>
                                }
                            </div>
                        </Form>
                    </div> : null }

                </Card.Body>
            </Card>

        </>
    );
};

export default Login;