import axios from 'axios'

export function getDogs(){
    return async function(dispatch){
        let json = await axios ("http://localhost3001/dogs")
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}

// export function getNameDog(){
//     return async function(dispatch){
//         let json = await axios ("http://localhost3001/dogs")

//         return dispatch({
//             type: 'GET_NAME_DOGS',
//             payload: json.data
//         })
//     } 
// }

export function postDogs(payload){
    return async function(dispatch){
        const json = await axios.post("http://localhost:3001/dogs",payload)
        return json
    }
}

export function getTemperament(){
    return async function(dispatch){
        let json = await axios.post("http://localhost:3001/dogs")
        
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json.data
        })
    }
}

export function getNameDogs(name){
    return async function (dispatch){
        try {
            let json = await axios.get("http://localhost3001/dogs?name=" + name)
            return dispatch({
                type: 'GET_NAME_DOGS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function filterTemperament(payload){
    return{
        type: 'FILTER_BY_FILTER',
        payload
    }   
}

export function filterbyApi(payload){
    return {
        type: 'FILTER_CREATE',
        payload
    }
}

export function orderbyWeigth(payload){
    return{
        type: 'ORDER_BY_WIGTH',
        payload
    }
}

export function getNameDogsCrete(name){
    return async function (dispatch){
        try {
            let json = await axios.get("http://localhost3001/dogs?name="+ name)
            return dispatch({
                type:'GET_NAME_DOGS_CREATED',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function orderByName(payload){
    return {
        type:'ORDER_BY_NAME',
        payload
    }
}