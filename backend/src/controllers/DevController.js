const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

// index , show, store, update, destroy

// index - mostrar lista deste recurso (Dev)
// show -  quando quer mostrar um único(singular)
// store - criar
// update - alterar
// destroy - deletar

// Usa o async para dizer que nao vai ser na mesma hora, assim como o await para esperar
module.exports = {
    async index(request,response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request,response) {
        const { github_username, techs , latitude, longitude} = request.body;
    
        let dev = await Dev.findOne({ github_username });

        if (!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${ github_username }`);
            // continuar
        
            const { name, avatar_url, bio} = apiResponse.data;
        
            //console.log(name, avatar_url, bio, github_username);
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }
    
        return response.json(dev);
    }
    //para tentar
    /*async update(request, response) {
        // atualiza as informações dos devs
        // exceto o nome do dev
    },

    async destroy() {
        // deletar um dev do DB
    },*/
};