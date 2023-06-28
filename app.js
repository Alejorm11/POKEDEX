const baseURL = 'https://pokeapi.co/api/v2/pokemon/'
const pokemon = document.getElementById('pokeName')
const buttonSearch = document.getElementById('searchPokemon')
const removePokemon = document.getElementById('borrarPokemon')
const appNode = document.getElementById('app')

buttonSearch.addEventListener('click', insertarPokemon)
removePokemon.addEventListener('click', borrarPokemon)

function insertarPokemon(){
    window.fetch(`${baseURL}${pokemon.value.toLowerCase()}`)
    .then(Response =>{
        if(Response.status === 404){
            alert('Este pokemon no esta disponible')
        }else{
            return Response.json()
        }
    })
    .then(responseJSON => {
        const allItems = []
        const result = []

        for(let pokemonInfo in responseJSON){
            result.push([pokemonInfo, responseJSON[pokemonInfo]])
        }

        console.table(result)

        const pokeImagen = document.createElement('img')
        pokeImagen.src = result[14][1].front_default

        const pokemonName = document.createElement('h1')
        pokemonName.innerText = `Name: ${result[10][1]} | id: ${result[6][1]}`

        const pokemonType = document.createElement('h3')
        pokemonType.innerText = `Type: ${result[16][1][0].type.name}`

        const contenedor = document.createElement('section')
        contenedor.append(pokeImagen, pokemonName, pokemonType,)

        allItems.push(contenedor)
        appNode.append(...allItems)

    })
}

function borrarPokemon(){
    let allPokemon = appNode.childNodes
    allPokemon = Array.from(allPokemon)

    allPokemon.forEach(pokemon => {
        pokemon.remove(pokemon)
    })
}