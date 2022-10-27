import { getRandomInt } from "../_utilities.js"


class Pokemon{
    constructor(type, nb){
        this.name = type.name
        this.hp = type.hp
        this.atk = type.atk
        this.def = type.def
        this.mp = type.mp
        this.state  // 0: attack, 2: defend, 3: cast
        if (nb === 0){document.querySelector("#playerOne > img").src = "./img/" + this.name + ".png"}
        if (nb === 1){document.querySelector("#playerTwo > img").src = "./img/" + this.name + ".png"}
    }



    



    // Attaque, renvoie les dommages
    attack(opponent){
        
        let bonus = getRandomInt(1,10);
        if (bonus === 10) bonus += this.atk; // critical strike
        const defence = opponent.state === 2 ? opponent.defend().value : opponent.def;
        const value = Math.max((this.atk+bonus) - defence , 0);
        opponent.hp -= value;


        let str = `${this.name} attaque ${opponent.name} [${this.atk+bonus}]`
        if (opponent.state === 2) str += "\n" + opponent.defend().label

        if (value === 0){
            str += `mais n'a fait aucun dommage`
        }else{
            str += ` dommage de [${value}]`
        }
        str += `
        Il reste ${opponent.hp} hp à ${opponent.name}`


        return {atk: this.atk+bonus,
                defence: defence,
                dom : value,
                label : str
        }
    }

    defend(){
        const bonus = getRandomInt(1,10)
        let str = `${this.name} s'est défendu de [${this.def + bonus}]`
        return {value : this.def + bonus, label : str}
    }

    cast(opponent){
        let mana
        let cost
        let str
        switch(opponent.state){
            // Attaque buff mais contre coup
            case 0 :    mana = getRandomInt(0,Math.floor(this.mp/2));
                        opponent.hp -= mana;
                        cost = Math.floor(getRandomInt(0, mana/2))
                        this.mp = Math.max(this.mp - cost,0);
                        str = `${this.name} a fait une attaque spéciale sur  ${opponent.name}
                        et a fait [${mana}] de dommage mais a consommé [${cost}] cp`
                        break;

            // Sort de soin
            case 1 :    mana = getRandomInt(0,Math.floor(this.mp/2));
                        this.hp += Math.floor(mana/2);
                        cost = mana
                        this.mp = Math.max(this.mp - mana,0);
                        str = `${this.name} a profité de la défense de ${opponent.name}
                        et a pu se soigner de [${mana}] mais a consommé [${cost}] de cp`
                        break;

            // Les deux lancent un sort
            case 2 :    cost = getRandomInt(0,Math.floor(this.mp/4));
                        this.mp = Math.max( this.mp - cost,0);
                        str = `${this.name} s'est confronté à la magie de ${opponent.name} et a perdu [${mana}] cp`
                        break;
        }

        return {mana: mana,
                cost: cost,
                label : str
            }
    }
}


export {Pokemon}