const initialState={
    temperaments:[],
    allDogsTemp:[],
}


function rootReducer(state= initialState, action){
    switch (action.type) {
        case 'GET_DOGS':
            return{
                ...state,
                allDogsTemp: action.payload
            }
            
        case 'GET_NAME_DOG':
            return{
                ...state,
                allDogsTemp: action.payload 
            }
        case 'GET_NAME_DOGS_CREATE':
            return{
                ...state,
                allDogsTemp: action.payload,
            }
        case 'GET_SEARCH_BAR':
            return {
                ...state, 
                allDogsTemp: action.payload
            }
        case 'GET_TEMPERAMENT':
            return{
                ...state,
                temperaments: action.payload
            }
        case 'FILTER_BY_FILTER':
            const allTemp= state.allDogsTemp

            let arr=[]
            allTemp.map(e => {
                if(e.temperaments !== undefined){
                    if(e.temperaments.include(action.payload)){
                        arr.push(e)
                    }
                }
            })
            return {
                ...state,
                allDogsTemp: arr,
            }
        case 'POST_DOGS':
            const alldog = state.allDogsTemp
            const FilterApi =action.payload === 'Created' ? alldog.filter(e => e.createInDb) : alldog.filter(e=> !e.createInDb)
            return{ 
                ...state,
                allDogsTemp: FilterApi
            }
        case 'ORDER_BY_NAME':
            const sortName= action.payload === 'A-Z'? state.allDogsTemp.sort((a,b) =>{
                if (a.name > b.name){
                    return 1
                }
                if (a.name < b.name) {
                    return -1
                }
                return 0
            })
            : state.allDogsTemp.sort((a,b)=>{
                if (a.name > b.name) {
                    return -1
                }
                if (a.name < b.name) {
                    return 1 
                }
                return 0 
            })
            return { 
                ...state,
                allDogsTemp: sortName
            }
        case 'ORDER_BY_WEIGTH':
            const sortWeigth = action.payload === 'men' ? state.allDogsTemp.sort((a,b)=> {
                if (parseInt(a.weight_min)> parseInt(b.weight_max)) {
                    return 1 
                }
                if (parseInt(a.weight_min) < parseInt(b.weight_max)) {
                    return -1
                }
                return 0
            }) : state.allDogsTemp.sort((a,b)=>{
                if(parseInt(a.weight_min) > parseInt(b.weight_max)){
                    return -1
                }
                if (parseInt(a.weight_min) < parseInt(b.weight_max)) {
                    return 1
                }
                return 0 
            })
            return {
                ...state,
                allDogsTemp: sortWeigth,
            }
            
    
        default:
            return state
    }
}
export default rootReducer