import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
const RegisterPage = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })


    const onChange = (e) => {
        const { name, value } = e.target;
        setData(() => ({ ...data, [name]: value }))
    }
    const registerUser = async (e) => {
        try {

            e.preventDefault();
            await axios.post('/register', data)
            alert("Registration Successful Uh can now Login");

        }
        catch (error) {
            alert("Registration Failed! please try again Later");
        }



    }


    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-32'>

                <h1 className='text-4xl text-center mb-4'>Register</h1>
                <form action="" className='max-w-md mx-auto' onSubmit={registerUser}>
                    <input type="text" name='name' value={data.name} onChange={onChange} placeholder='John Doe' />
                    <input type="email" name='email' value={data.email} onChange={onChange} placeholder='your@email.com' />
                    <input type="Password" name='password' value={data.password} onChange={onChange} placeholder='Password' />
                    <button className='primary'>Login</button>
                    <div className='text-center text-gray-500'>Already a Member <Link className=' underline text-black' to={'/login'} >Login</Link></div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage
