
import { Link } from 'react-router-dom';
import AccountNav from '../AccountNav';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PlaceImg from '../PlaceImg';
const Places = () => {

    const [places, setPlaces] = useState([])

    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
            console.log(data);
            setPlaces(data);
        });

    }, []);



    return (
        <div className=''>
            <AccountNav></AccountNav>

            <div className="text-center">



                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full primary" to={'/account/places/new'}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                    Add new Places</Link>
            </div>
            List of all added places
            <div className='mt-4 '>
                {
                    places.length > 0 && places.map((data, index) => {
                        return <Link to={'/account/places/' + data._id} key={index} className='mt-2 cursor-pointer gap-4  bg-gray-100 rounded-2xl p-4 flex ' >
                            {/* grow shrink-0 */}
                            <div className='flex w-32 h-32 bg-gray-300 '>
                                {/* {data.photos.length && (
                                    <img className='object-cover' src={'http://localhost:3000/uploads/' + data.photos[0]} alt="" />
                                )} */}
                                <PlaceImg place={data}></PlaceImg>
                            </div>
                            <div className='grow-0 shrink'>
                                <h2 className='text-xl'>{data.title} </h2>

                                <p className="text-sm mt-2" >{data.description}</p>
                            </div>
                        </Link>
                    })
                }
            </div>
        </div >
    )
}
export default Places