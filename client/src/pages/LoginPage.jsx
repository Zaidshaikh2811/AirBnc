
import axios from 'axios';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../userContext';
import { useContext } from 'react';


const LoginPage = () => {

    const [data, setData] = useState({
        email: "",
        password: ""

    })
    const [Loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(UserContext);

    const submitForm = async (e) => {

        setLoading(true);
        try {
            e.preventDefault();
            const user = await axios.post('/login', data, { withCredentials: true });
            console.log(user.data);
            setUser(user.data);

            setLoading(false);

            setRedirect(true);
        }
        catch (err) {
            setLoading(false);
            alert("Please Try Again")
        }
    }

    if (redirect) {
        return <Navigate to={"/"}></Navigate>
    }


    const onChange = (e) => {
        const { name, value } = e.target;
        setData(() => ({ ...data, [name]: value }))
    }



    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-32'>

                <h1 className='text-4xl text-center mb-4'>Login</h1>
                <form action="" className='max-w-md mx-auto ' onSubmit={submitForm}>
                    <input type="email" name='email' onChange={onChange} value={data.email} placeholder='Enter your Email' />
                    <input type="Password" name='password' onChange={onChange} value={data.password} placeholder='Enter your Password' />
                    <button className='primary mb-4' disabled={Loading}>{Loading ? `Loading` : `Login`}</button>
                    <div className='text-center text-gray-500'> Dont Have an Account yet? <Link className=' underline text-black' to={'/register'} >Register now</Link></div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
