import { useEffect, useState } from 'react'
import PhotosUploader from '../PhotosUploader';
import axios from 'axios';
import Perks from '../Perks';
import { Navigate, useParams } from 'react-router-dom';
import AccountNav from '../AccountNav';
const PlacesFormPage = () => {
    const { id } = useParams();
    useEffect(() => {
        if (!id) return;
        axios.get('/places/' + id).then((res) => {
            const { data } = res;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests)
            setPrice(data.price)

        })

    }, [id])


    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    // const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState();
    const [redirectToPlacesList, setRedirectToPlacesList] = useState(false);



    function inputHeader(label) {
        return <h2 className='text-2xl mt-4'>{label}</h2>
    }


    function inputDescription(text) {
        return <p className='text-gray-500 text-sm'>{text}</p>
    }
    function preInput(header, description) {
        return (
            <div>
                {inputHeader(header)}
                {inputDescription(description)}
            </div>
        )
    }


    async function savePlace(e) {
        e.preventDefault();
        const placeData = { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, price, maxGuests }
        if (id) {


            await axios.put("/places", { id, ...placeData })

        }
        else {


            await axios.post("/places", placeData)

        }
        setRedirectToPlacesList(true);

    }

    if (redirectToPlacesList) {
        return <Navigate to={"/account/places"}></Navigate>
    }

    return (
        <div>
            <AccountNav></AccountNav>
            <form onSubmit={savePlace}>
                {preInput("Title", "Title For your Place should be short and catchy as in advertisement")}

                <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder={'title,for example my lovely home'} />

                {/* {preInput("Address to your place", "")} */}


                <h2 className='text-2xl mt-4'>Address to your place</h2>
                <input type="text " value={address} onChange={e => setAddress(e.target.value)} placeholder='Address' />
                {preInput("Photos", "more=better")}


                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}></PhotosUploader>


                {preInput("Description", "Description of the place")}

                <textarea value={description} onChange={e => setDescription(e.target.value)}></textarea>
                {preInput("Perks", "Select all the perks of your place")}


                <div className='mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                    <Perks selected={perks} onChange={setPerks}></Perks>

                </div>

                {preInput("Extra Info", "Hose Rules,etc")}

                <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)}></textarea>

                {preInput("Check In & check out times,Max Guests", "add check in and check out time window for cleaning the room between guests")}
                <div className='grid gap-2 sm:grid-cols-2 md:grid-cols-4'>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check In Time</h3>
                        <input value={checkIn} onChange={e => setCheckIn(e.target.value)} type="text" placeholder='14:00' />
                    </div>

                    <div>
                        <h3 className='mt-2 -mb-1'>Check out Time</h3>
                        <input value={checkOut} onChange={e => setCheckOut(e.target.value)} type="text" />
                    </div>

                    <div>
                        <h3 className='mt-2 -mb-1'>Max Number of Guests</h3>
                        <input value={maxGuests} onChange={e => setMaxGuests(e.target.value)} type="text" />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Price per Night</h3>
                        <input value={price} onChange={e => setPrice(e.target.value)} type="text" />
                    </div>
                </div>

                <button className='primary my-4'>Save</button>

            </form>
        </div>
    )
}



export default PlacesFormPage
