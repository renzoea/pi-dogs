const axios = require ('axios')
const { Dog, Temperament } = require ('../db.js')

const getApiDogsINfo = async (req,res)=> {
    let apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds`)
    let infoApi = await apiUrl.data.map(e=> {
        return{
            id: e.id,
            name: e.name,
            height_min: e.height.metric.split(' - ')[0] && e.height.metric.split(' - ')[0],
            height_max: e.height.metric.split(' - ')[1] && e.height.metric.split(' - ')[1],
            life_span_min: e.life_span.split(' - ')[0] && e.life_span.split(' - ')[0],
            life_span_max: e.life_span.split(' - ')[1] && e.life_span.split(' - ')[1],
            image: e.image.url,
            temperament: e.temperament
        }
    })
    return infoApi
}

const getDBInfo = async () =>{
    return await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ['name'],
            through:{
                attributes:[],
            } 
        }
    })
}

const getAllDogs = async ()=>{
    let apiInfo = await getApiDogsINfo()
    let DBinfo = await getDBInfo()
    let info = apiInfo.concat(DBinfo)
    return info
}

const dogsInfo = async (req,res) => {
    let {name} = req.query
    let dogsTotal = await getAllDogs()
    if(name){
        let dogsName = await dogsTotal.filter(e=> e.name.toLowerCase().includes(name.toLowerCase()))
        dogsName ? res.status(200).send(dogsName) :res.status(400).send('Perro no encontrodo')
    }else{
        res.status(200).send(dogsTotal)
    }
}

const DogsParams = async (req,res)=>{
    let {id} = req.params
    let idDogs = await getAllDogs()
    let idFiler = idDogs.filter(e=>e.id == id)
    if (idFiler.length > 0 ){
        res.status(200).send(idFiler)
    }else{
        res.status(404).send('Perro existe')
    }
}



const CreateDog = async (req,res)=>{
    const{
        name,
        height_min,
        height_max,
        weight_min,
        weight_max,
        life_span_min,
        life_span_max,
        temperament,
        image
    }= req.body
    const rope = {
        name,
        height_min,
        height_max,
        weight_min,
        weight_max,
        life_span_min,
        life_span_max,
        temperament,
        image
    }
    try {
        const Create= await Dog.create(rope)
        let tempDb = await Temperament.findAll({
            where: {name: temperament}
        })
        Create.addTemperament(tempDb)
        res.status(200).send('Rope creado')
    } catch (error) {
        console.log(error)
    }
}
module.exports={
    dogsInfo,
    DogsParams,
    //getTemp,
    CreateDog
}
