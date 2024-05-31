import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import { UserContext } from "./userContext";


const BookingWidget = ({ place }) => {

    const [checkIn, setChechIn] = useState('');
    const [checkOut, setChechOut] = useState('');
    const [name, setName] = useState('');
    const [phone, setphone] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState('');
    const [redirect, setRedirect] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        setName(user.name);
    }, [user])

    function differenceInCalenderDays(checkOutDate, checkInDate) {
        const differenceInMilliseconds = Math.abs(checkOutDate - checkInDate);
        const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
        return differenceInDays;
    }

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalenderDays(new Date(checkOut), new Date(checkIn))
    }
    async function bookThisPlace() {
        console.log(place);
        const { data } = await axios.post('/bookings', {
            checkOut, checkIn,
            name,
            phone,
            numberOfGuests,
            place: place._id,
            price: numberOfNights * place.price
        })
        const bookingId = data._id;
        setRedirect('/account/bookings/' + bookingId);
    }
    if (redirect) {
        <Navigate to={redirect}></Navigate>
    }
    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <h2 className="text-2xl text-center">
                Price:$   {place.price} / per night
            </h2>
            <div className="border rounded-2xl mt-4">
                <div className="flex">


                    <div className=" p-2  px-4 py-4">
                        <label htmlFor="">Check-In</label>
                        <input type="date" value={checkIn} onChange={(e) => setChechIn(e.target.value)} />
                    </div>
                    <div className="   p-2  px-4 py-4">
                        <label htmlFor="">Check-Out</label>
                        <input type="date" value={checkOut} onChange={(e) => setChechOut(e.target.value)} />
                    </div>

                </div>
                <div className="  px-4 py-4 border-t">
                    <label htmlFor="">Number of Guests:</label>
                    <input type="number" value={numberOfGuests} onChange={(e) => setNumberOfGuests(e.target.value)} />
                </div>
                {checkIn && checkOut && (
                    <>
                        <div className="  px-4 py-4 border-t">
                            <label htmlFor="">Your Full Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="  px-4 py-4 border-t">
                            <label htmlFor="">Your Mobile-No:</label>
                            <input type="number" value={phone} onChange={(e) => setphone(e.target.value)} />
                        </div>
                    </>
                )}
                <button onClick={bookThisPlace} className="primary mt-4">
                    Book This Place {checkOut && checkIn &&
                        (
                            <span>
                                $ {numberOfNights * place.price}
                            </span>
                        )}
                </button>
            </div>
        </div>
    )
}

export default BookingWidget
