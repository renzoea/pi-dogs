import React from "react" 

export default function Paginado({dogPerPage, allDogs, paginado}){
    let pageNumber = []

    for(let i =1; i<= Math.ceil(allDogs/dogPerPage); i++){
        pageNumber.push(i)
    }

    return (
        <nav>
            <ul className="paginado">
                {
                    pageNumber && pageNumber.map(e=>(
                        <button className="paginado" key={e} onClick={()=>Paginado(e) > {e}}></button>
                    ))
                }
            </ul>
        </nav>
    )
}