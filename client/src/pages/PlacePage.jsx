import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";


const PlacePage = () => {

    const [place, setPlace] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        if (!id) return;
        axios.get('/places/' + id,).then(({ data }) => {

            setPlace(data);
        })
    }, [id])

    if (!place) return <h1>Loading</h1>



    return (
        <div className="mt-8 bg-gray-100 -mx-8 px-8 py-8">
            <h1>{place.title}</h1>

            <AddressLink> {place.address}</AddressLink>
            <PlaceGallery place={place} />



            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold">Description</h2>
                        {place.description}

                    </div>
                    <b>Check-in: </b>{place.checkIn}<br />
                    <b>Check-Out: </b>{place.checkOut}<br />
                    Max number of Guests: {place.maxGuests}

                </div>
                <div>
                    <BookingWidget place={place}></BookingWidget>

                </div>
            </div>
            <div className="bg-white -mx-8 p-8 border-t" >

                <div className="">
                    <h2 className="font-semibold text-2xl">Extra Info</h2>
                </div>
                <div className="text-sm  text-gray-700 leading-5 mt-2 ">
                    {place.extraInfo}
                </div>

            </div>
        </div>
    )
}

export default PlacePage
