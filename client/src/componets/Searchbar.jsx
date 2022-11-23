import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  {getNameDogs}  from '../actions'

function SearchBar(){

    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDeFault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDeFault()
        console.log(name)
        dispatch(getNameDogs(e))
        setName("")
    }

    return (
        <div>
            <input value={name} type="text" placeholder='search dogs' onChange={(e)=> handleInputChange(e)}/>
            <button onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}

export default SearchBar