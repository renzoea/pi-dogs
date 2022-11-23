import React from 'react'


export default function Card({name, image, temperament, id, weight_min, weight_max, temperaments}){
    return(
        <div>
            <img src={image} alt="img not found" width="200px" height="250px" />
            <h3>{name}</h3>
            <h5>{weight_min} - {weight_max}</h5>
            <h5>{temperament} {temperaments}</h5>
            
        </div>
    )
}