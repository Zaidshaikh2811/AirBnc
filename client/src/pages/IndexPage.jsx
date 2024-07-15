import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const IndexPage = () => {
    const [places, setPlaces] = useState([])
    useEffect(() => {
        axios.get('/places').then(({ data }) => {
            setPlaces(data);
        })
    }, [])
    return (


        <div className='mt-4 grid gap-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {places.length > 0 && places.map((place, index) => {
                return <Link to={'/place/' + place._id} key={index}>
                    {place.photos?.[0] && (
                        <div className='bg-gray-500 mb-2 rounded-2xl flex'>
                            <img className="rounded-2xl aspect-square object-cover" src={'            https://airbnc-5.onrender.com/uploads/' + place.photos?.[0]} alt="" />
                        </div>

                    )}
                    <h2 className='font-bold'>{place.address}</h2>
                    <h3 className='text-sm truncate '>

                        {place.title}
                    </h3>
                    <div className='mt-1'>
                        <span>
                            ${place.price} per Night
                        </span>
                    </div>
                </Link>
            })}
        </div>
    )
}

export default IndexPage
