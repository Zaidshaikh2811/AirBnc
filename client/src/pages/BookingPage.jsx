import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import axios from 'axios';
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";


const BookingPage = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null)
    useEffect(() => {
        if (id) {
            axios.get('/bookings').then((res) => {
                const foundBooking = res.data.find(({ _id }) => _id === id)
                if (foundBooking) {
                    setBooking(foundBooking)
                }
            })
        }
    }, [id])

    if (!booking) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="m-8 ">
            <h1>{booking.place.title}</h1>

            <AddressLink className="my-2 block"> {booking.place.address}</AddressLink>
            <div className="bg-gray-200 p-6 my-6   rounded-2xl items-center  flex justify-between">
                <div>

                    <h2 className="text-2xl mb-4">Your Booking Information</h2>
                    <BookingDates booking={booking} className=""></BookingDates>
                </div>
                <div className="bg-primary p-6 text-white rounded-2xl">
                    <div >

                        Total Price
                    </div>
                    <div className="text-3xl ">

                        ${booking.place.price}
                    </div>
                </div>
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    )
}

export default BookingPage
