import { getRandomInt } from "../_utilities.js"
import { Pokemon } from "./Pokemon.js"

class Program {
    constructor(typeOne, typeTwo) {
        this.characters = []
        this.characters.push(new Pokemon(typeOne, 0))
        this.characters.push(new Pokemon(typeTwo, 1))
        this.turnNumber = 0                        // Securité pour le while de game
        this.loadEvents()
        this.displayStates()
    }

    loadEvents(){
        document.querySelector("#attack").addEventListener("click", (e) => {
            e.preventDefault()
            const audio = new Audio("./sound/sword-hit.mp3");
            audio.play();
            this.characters[0].state = 0 // Attack
            this.turn()
        })

        document.querySelector("#defend").addEventListener("click", (e) => {
            e.preventDefault()
            const audio = new Audio("./sound/defense.mp3");
            audio.play();
            this.characters[0].state = 1 // Defend
            this.turn()
        })

        document.querySelector("#magic").addEventListener("click", (e) => {
            e.preventDefault()
            const audio = new Audio("./sound/magic-spell.mp3");
            audio.play();
            this.characters[0].state = 2 // Cast
            this.turn()
        })
    }

    /* game(){
        let proceed = true
        do{
            this.roundNumber++
            console.log("Round : " + this.roundNumber)
            console.log(this.characters)
            this.turn()


            for (let player of this.characters)
            {if (player.hp <= 0) proceed = false}

        }while(proceed && this.roundNumber < 1000);
        
    } */

    turn() {
        this.turnNumber ++
        let str = ""
        this.characters[1].state = getRandomInt(0,2)

        for (let i = 0; i < 2; i++) {
            switch (this.characters[i].state){
                case 0: str += this.characters[i].attack(this.characters[(i+1)%2]).label;
                        break;

                case 1: str += `\n${this.characters[i].name} s'est defendu.`//`<p>${this.characters[i].name} s'est defendu.</p>`
                        break;

                // Pas besoin du case 1 (la defence) qui est gérée directement au moment de l'attaque.

                case 2: str += this.characters[i].cast(this.characters[(i+1)%2]).label;
                        break;

                // 
            }

        } 

        this.displayInfos(str)
        this.displayStates()
        // Condition de fin
        // avec la supression des events et desactivation des boutons
    }


    displayInfos(str){
        document.querySelector("#infos").textContent = str
    }


    displayStates(){
        document.querySelector("#statePlayerOne").innerHTML = `<span>${this.characters[0].name}</span><br>
        Vie : ${this.characters[0].hp}<br>
        Mana : ${this.characters[0].mp}<br>
        Atk : ${this.characters[0].atk}<br>
        Def : ${this.characters[0].def}<br>`
        
        /* document.querySelector("#statePlayerTwo").innerText = `${this.characters[1].name}
        Vie : ${this.characters[1].hp}
        Mana : ${this.characters[1].mp}` */

        document.querySelector("#statePlayerTwo").innerHTML = `<span>${this.characters[1].name}</span><br>
        Vie : ${this.characters[1].hp}<br>
        Mana : ${this.characters[1].mp}<br>
        Atk : ${this.characters[1].atk}<br>
        Def : ${this.characters[1].def}<br>`
    }
}

//Events


export { Program }