const fs = require('fs').promises
const readline = require('readline').promises

async function generaTauler(){
    let matriu = [
        [" ", 0,1,2,3,4,5,6,7],
        ["A", "·", "·", "·", "·", "·", "·", "·", "·"],
        ["B", "·", "·", "·", "·", "·", "·", "·", "·"],
        ["C", "·", "·", "·", "·", "·", "·", "·", "·"],
        ["D", "·", "·", "·", "·", "·", "·", "·", "·"],
        ["E", "·", "·", "·", "·", "·", "·", "·", "·"],
        ["F", "·", "·", "·", "·", "·", "·", "·", "·"]]

    for (let fila of matriu) {
        console.log(fila.join(" ")); // Une todos los elementos de la fila en una cadena
    }
}

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    salto = "\n"
        
    let menu = "------ MENU ------" + salto + "1: Ajuda" + salto + "2: Carregar Partida" + salto + "3: Guardar Partida" + salto +
    "4: Trampa" + salto + "5: Destapar" + salto + "6: Puntuacio" + salto + "0: Sortir"

    console.log(menu)
    generaTauler()

    opcion = await rl.question("Opcio: ")

    let exit = false;
    while (!exit){

        if (opcion.toLowerCase() == "ajuda" || opcion.toLowerCase() == "help" || opcion == 1 ){
            let menuAjuda = "------ MENU ------" + salto + "1: Ajuda" + salto + "2: Carregar Partida" + salto + "3: Guardar Partida" + salto +
            "4: Trampa" + salto + "5: Destapar" + salto + "6: Puntuacio" + salto + "0: Sortir"

            console.log("AQUI VA EL MENU DE AYUDA")

        } else if (opcion.toLowerCase() == "carregar partida" || opcion == 2 ){


        } else if (opcion.toLowerCase() == "guardar partida" || opcion == 3 ){


        } else if (opcion.toLowerCase() == "trampa" || opcion == 4 ){


        } else if (opcion.toLowerCase() == "destapar" || opcion == 5 ){


        } else if (opcion.toLowerCase() == "puntuacio" || opcion == 6 ){


        } else if (opcion.toLowerCase() == "sortir" || opcion == 0 ){
            console.log("Hasta la proxima!")
            exit = true;
            break

        } else{
            console.log("Opcion invalida!")
        }

        opcion = await rl.question("Opcio: ")            
    }
    rl.close()
}

main()
