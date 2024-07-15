import React from 'react'

const PlaceImg = ({ place, index = 0, className = null }) => {
    if (!place.photos?.length) {
        return '';
    }
    if (!className) {
        className = 'object-cover'
    }
    return (
        <div>

            <img className={className} src={'            https://airbnc-5.onrender.com/uploads/' + place.photos[index]} alt="" />

        </div>
    )
}

export default PlaceImg
