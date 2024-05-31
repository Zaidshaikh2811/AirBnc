
import { useContext, useState } from 'react'
import { UserContext } from '../userContext'
import { useParams } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import Places from './Places'
import AccountNav from '../AccountNav'
const ProfilePage = () => {
    const { user, ready, setUser } = useContext(UserContext)
    const [redirect, setRedirect] = useState(null)
    let { subpage } = useParams();

    if (subpage == undefined) {
        subpage = 'profile';
    }
    console.log(subpage);
    if (!ready) {
        return "Loading"
    }
    async function logout() {
        await axios.post("/logout")
        setRedirect("/")

    }

    if (ready && !user && !redirect) {
        return <Navigate to={"/login"} />
    }


    if (redirect) {
        setUser(null);
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <AccountNav></AccountNav>
            {subpage == 'profile' && (
                <div className='text-center max-w-lg mx-auto '>
                    Logged in as {user.name} ({user.email})
                    <button onClick={logout} className='primary max-w-sm mt-2'>Logout</button>

                </div>
            )}
            {subpage == "places" && (
                <Places>

                </Places>
            )}
        </div>
    )
}

export default ProfilePage
