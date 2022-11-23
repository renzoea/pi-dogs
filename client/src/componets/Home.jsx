import React from 'react'; 
import { useEffect, useState } from 'react';
import {useDispatch, useSelector } from 'react-redux'
import { filterbyApi, getDogs, orderbyWeigth, getTemperament, filterTemperament, orderByName } from '../actions'
import {Link} from 'react-router-dom'
import Card from "./Card";
import Paginado from "./paginado";
import SearchBar from "../componets/Searchbar";
// import './SearchBar.css';
import DogCreate from "./DogCreate";

export default function Home(){
    const dispatch =  useDispatch()
    const allDogs = useSelector((state)=> state.allDogsTemp)
    //console.log(allDogs)
    const temps= useSelector((state)=> state.temperaments)
    const [ currenPage, setCurrentPage ] = useState(1)
    const [dogPage, setDogPage ] = useState(8)
    const indexOfLastDog = currenPage * dogPage
    const indexOfFirstDog = indexOfLastDog - dogPage 
    const CurrentDog = allDogs.slice(indexOfFirstDog, indexOfLastDog)
    const [order, setOrder] = useState('')
    const [render, setRenderDog] = useState()
    const filterDogs= useSelector(state=> state.filterDogs)

    useEffect(()=>{
        setRenderDog(filterDogs)
    }, [filterDogs])

    useEffect(()=>{
        setRenderDog(currenPage)
    },[dispatch])

    useEffect(()=>{
       // console.log(filterDogs)
    },[filterDogs])

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getDogs)
        dispatch(getTemperament())
    }, [dispatch])

    function handleClick(e){
        e.preventDefault()
        dispatch(getDogs())
    }

    function handleOrderByWeight(e){
        e.preventDefault()
        dispatch(orderbyWeigth(e.target.value))
        setOrder(`Ordenado ${e.target.value}`)
    }

    function handleFilterTemp(e){
        e.preventDefault()
        dispatch(filterTemperament(e.target.value))
    }

    function handleOrderByApi(e){
        dispatch(filterbyApi(e.target.value))
    }
    
    function handleOrderByName(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setOrder(`Ordenado ${e.target.value}`)

        setCurrentPage(1)
        setOrder(`Orenado ${e.target.value}`)
    }
    return(
        <div>
            <Link to = '/dogs'>Crear Dog</Link>
            <h1>Perros</h1>
            <SearchBar />
            <button onClick={e => {handleClick(e)}}>Volver a cargar los perros</button>
                <div>
                    <select onChange={e => {handleOrderByName (e)}}>
                        <option defaultValue> Orden Alfabetico</option>
                        <option value='A-Z'>A - Z</option>
                        <option value='Z-A'>Z - A</option>
                    </select>
                    <select onChange={e => {handleOrderByWeight (e)}}>
                        <option defaultValue> Peso </option>
                        <option value='men'>Menor</option>
                        <option value='may'>Mayor</option>
                    </select>

                    <select onChange={e => {handleFilterTemp(e)}}>
                        <option value='all'>temperamentos</option>
                        {
                            temps.map((e,i)=>{
                                return (
                                    <option key={i}>{e.name}</option>
                                )
                            })
                        }
                    </select>


                    <select onChange={e => handleOrderByApi(e)}>
                        <option value='all'>Todos</option>
                        <option value='created'>Creados</option>
                        <option value='api'>Existentes</option>

                    </select>
                        <Paginado 
                        dogPage={dogPage} allDogs={allDogs.length} allTemps={temps.temperaments} paginados = {paginado} />
                    {
                        CurrentDog && CurrentDog.map((e,i)=>{
                            return(
                                <Link to={"/dogs/" +e.id}>
                                    <Card 
                                    name={e.name} 
                                    temperament={e.temperament} 
                                    image={e.image} 
                                    weight_max={e.weight_max}
                                    weight_min={e.weight_min}/>
                                </Link>
                            )
                        })
                    }
                </div>
        </div>
    )

}