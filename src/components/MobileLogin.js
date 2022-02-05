import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Form, Button, Spinner } from 'react-bootstrap';

export const MobileLogin = (props) => {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [code, setCode] = useState("");
    const [counter, setCounter] = useState(90);
    const { phoneLogin, confirmCode } = useAuth();
    const navigate = useNavigate();

    const mins = Math.floor( counter/60 );
    const secs = Math.floor( counter%60 );

    const { 
        step,
        setStep,
        setError,
        setLoading,
        loading
    } = props;


    
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


    const handlePhoneSignIn = async (e) => {
        e.preventDefault();
        const regex = /^01[0125][0-9]{8}$/gm

        if( !phoneNumber.trim() ) {
            const msg = "Mobile field is require";

            setError(msg);
            return;
        }

        if(!regex.test(phoneNumber)) {
            const msg = "Please enter a valid number!";

            setError(msg);
            return;
        }
        
        try{
            setError("");
            setLoading("loading")
            await phoneLogin(phoneNumber);
            setLoading("idle");
            setStep(2);
        } catch(err) {
            setLoading("idle");
            console.log("faild to sign in")
        }
    }


    

    const handleOtp = async (e) => {
        e.preventDefault();

        try {
            setLoading("loading")
            await confirmCode( code );
            setLoading("idle");
            navigate("/");
        }catch(err){
            setLoading("idle");
            console.log("faild to sign in")
        }
    }
    return (
        <div className = 'phone-panel mb-4' style={{ height: "116px" }}>
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

            <Form className = {`form ${ step === 2 ? "Active__Step" : "hidden"}`} onSubmit={ handleOtp }>

                <Form.Label htmlFor = "otp">OTP Verification</Form.Label>
                <Form.Control 
                type        = "text" 
                className   = 'mb-2'
                id          = "otp" 
                placeholder = 'Enter OTP' 
                name        = 'otp' 
                onChange    = { (e) => setCode(e.target.value) }/>

                <Button 
                disabled = { loading === "idle" ? false : true } 
                type = 'submit' 
                className = 'w-100 mb-1'>
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
        </div>
    );
};