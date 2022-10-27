import { Program } from "./class/Program.js"
import { pokeType } from "./param.js"


const titre = document.querySelector("#titre")

titre.innerText = "Commencez !"

new Program(pokeType.Evoli, pokeType.Mew)



// Object String Number Boolean Null Undefined BigInt Symbol