
import axios from 'axios';
import AccountNav from '../AccountNav'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlaceImg from '../PlaceImg';

import { Link } from 'react-router-dom';
import BookingDates from '../BookingDates';

const BookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        console.log("BOOKINGS");
        axios.get('/bookings').then((res) => {
            console.log(res.data);
            setBookings(res.data)
        })
    }, [])


    return (
        <div>
            <AccountNav />
            {bookings?.length > 0 && bookings.map((booking, index) => {

                return <Link to={`/account/bookings/${booking._id}`} className='flex gap-4 mt-4 bg-gray-200 rounded-2xl overflow-hidden' key={index}>
                    <div className='w-48'>
                        <PlaceImg place={booking.place}></PlaceImg>
                    </div>
                    <div className='py-3 grow'>
                        <h2 className='text-xl'>{booking.place.title}</h2>
                        <div className=' flex gap-2 items-center border-t border-gray-300 mt-2 py-2'>

                        </div>
                        <div className='text-xl '>
                            {/* <div className="flex gap-1 items-center mb-2 mt-2 text-sm text-gray-500">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                </svg>

                                {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} Nights:
                                <div className="flex gap-1 items-center ml-2">

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                    </svg>
                                    {format(new Date(booking.checkIn), 'yyyy-MM-dd')} &rarr;
                                </div>

                                <div className="flex gap-1 items-center">

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                    </svg> {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
                                </div>

                            </div> */}
                            <BookingDates booking={booking} className="mb-2 mt-2  text-gray-500"></BookingDates>
                            <div className="flex gap-1 items-center ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <span className="text-2xl">

                                    Total Price: ${booking.place.price}
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            })}
            {id}
        </div>
    )
}

export default BookingsPage
