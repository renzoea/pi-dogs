import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {postNameDogs, getTemperament} from "../actions"


export default function CreateDog(){
    const dispatch = useDispatch()
    const  temperament = useSelector((state)=> state.temperament)

    const [input, setInput] = useState({
        name: "",
        weigth_min: "",
        weigth_max: "",
        heigth_min: "",
        heigth_max: "",
        life_span: "",
        image: "",
        temperament: []
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        console.log(input)
    }

    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                temperament: e.target.value
            })
        }
    }

    function handleSelect(e){
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    }

    useEffect(()=>{
        dispatch(getTemperament)
    },[])

    return (
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Crear rope</h1>
            <from>
                <div>
                    <label>Nombre: </label>
                        <input type='text' value={input.name} name="name" onChange={handleChange} />
                </div>
                <div>
                    <label>Peso: </label>
                    <input type='text' value={input.weigth} name="weigth" onChange={handleChange}/>
                </div>
                <div>
                    <label>Altura: </label>
                    <input type='text' value={input.heigth} name="heigth" onChange={handleChange}/>
                </div>
                <div>
                    <label>Temperamentos: </label>
                        <select>
                            {temperament.amp((e)=>(
                                <option value={e.name}>{e.name}</option>
                            ))}
                        </select>
                </div>
                <div>
                    <label>Imagen: </label>
                    <input type='text' value={input.imagen} name="imagen" onChange={handleChange}/>
                </div>
                <ul><li>{input.temperament.map(e=>e + ",")}</li></ul>
                <button type="submit">Crear Rope</button>
            </from>
        </div>
    )
}
