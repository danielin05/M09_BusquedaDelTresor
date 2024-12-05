const fs = require('fs').promises
const readline = require('readline').promises;

let matriu = [
    [" ", 0, 1, 2, 3, 4, 5, 6, 7],
    ["A", "·", "·", "·", "·", "·", "·", "·", "·"],
    ["B", "·", "·", "·", "·", "·", "·", "·", "·"],
    ["C", "·", "·", "·", "·", "·", "·", "·", "·"],
    ["D", "·", "·", "·", "·", "·", "·", "·", "·"],
    ["E", "·", "·", "·", "·", "·", "·", "·", "·"],
    ["F", "·", "·", "·", "·", "·", "·", "·", "·"]
];

let matriuTresors = [
    [" ", 0, 1, 2, 3, 4, 5, 6, 7],
    ["A", "·", "·", "·", "·", "·", "·", "·", "·"],
    ["B", "·", "·", "·", "·", "·", "·", "·", "·"],
    ["C", "·", "·", "·", "·", "·", "·", "·", "·"],
    ["D", "·", "·", "·", "·", "·", "·", "·", "·"],
    ["E", "·", "·", "·", "·", "·", "·", "·", "·"],
    ["F", "·", "·", "·", "·", "·", "·", "·", "·"]
];

const filaIndices = {
    "A": 1,
    "B": 2,
    "C": 3,
    "D": 4,
    "E": 5,
    "F": 6
};

const salto = "\n";

const menu =
    "------ MENU ------" + salto +
    "1: Ajuda" + salto +
    "2: Carregar Partida" + salto +
    "3: Guardar Partida" + salto +
    "4: Trampa" + salto +
    "5: Destapar" + salto +
    "6: Puntuacio" + salto +
    "0: Sortir" + salto;

const menuAjuda =
    "------ MENU AJUDA ------" + salto +
    "Les opcions: 1, ajuda, help. ----> Son per mostrar aquest menu d'ajuda" + salto +
    "Les opcions: 2, carregar partida. ----> Carregaran la partida del arxiu que seleccionis." + salto +
    "Les opcions: 3, guardar partida. ----> Guardaran la partida per poder carregarla mes tard" + salto +
    "Les opcions: 4, trampa, cheat. ----> Mostraran el taulell amb les caselles que tenen tressors destapades" + salto +
    "Les opcions: 5, destapar. ----> Serviran per destapar una casella escribint x + y per exemple 'D7'" + salto +
    "Les opcions: 6, puntuacio. ----> Serveixen per veure la puntuacio y les tirades restants" + salto +
    "Les opcions: 0, sortir, exit. ----> Serveixen per sortir del joc. SI NO HAS GUARDAT AVANTS EL PROGRES ES PERDRA" + salto;

let tresorsRestants = 16
let tiradas = 0
let maxTiradas = 32
let trampas = false

// Funció per escriure un objecte en un arxiu .json
async function guardarPartida(obj, file_path) {
    try {
        const txtData = JSON.stringify(obj, null, 2)
        await fs.writeFile(file_path, txtData, 'utf-8')
    } catch (error) {
        console.error("Error en escriure les dades:", error)
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function carregarPartida(file_path) {
    try {
        const txtData = await fs.readFile(file_path, 'utf-8')
        const data = JSON.parse(txtData)
        
        // Actualizar las variables globales con los valores cargados
        matriu = data.taulell;
        matriuTresors = data.taulellTresors;
        tresorsRestants = data.tresorsRestants;
        tiradas = data.tiradas;

        console.log("Carregant partida: temps restant 3 segons")
        for (let segons = 3; segons != 0; segons--){
            console.log(segons)
            await sleep(1000)
        }
        console.log("Press Enter to continue")

    } catch (error) {
        console.error("Error en llegir les dades:", error)
    }
}

function mostraPuntuacio(){
    let punts = 16 - tresorsRestants 
    console.log("---------- PUNTUACIO ----------")
    console.log(`Punts: ${punts}/16`)
    console.log(`Tirades: ${tiradas}/${maxTiradas}`)
    console.log("-------------------------------") 
}

function enterraTresors(){
    for (let i = 0; i < 16; i++){
        fila = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        columna = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
        
        while(matriuTresors[fila][columna] == "#"){
            fila = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
            columna = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
        }
        matriuTresors[fila][columna] = "#"
    }
}

function distanciaTesoroMasCercano(filaIndex, columna) {
    let menorDistancia = 1000
    let hayTesoro = false

    for (let fila = 1; fila < matriuTresors.length; fila++) { // Recorre filas
        for (let col = 1; col < matriuTresors[fila].length; col++) { // Recorre columnass
            if (matriuTresors[fila][col] === "#" && matriu[fila][col] !== "O") { // Si hay un tesoro
                hayTesoro = true
                let distancia = Math.abs(filaIndex - fila) + Math.abs(columna - col)
                if (distancia < menorDistancia) {
                    menorDistancia = distancia
                }
            }
        }
    }

    return menorDistancia // Si no hay tesoros, devolvemos -1
}

function printaTauler() {
    if(trampas){
        printaTaulers()
    }else{
        console.log(salto + "------- TAULELL -------" + salto)
        for (let fila of matriu) {
            console.log(fila.join(" "));
        }
    }
    console.log()
    
}

function printaTaulers() {
    console.log(salto + "------- TAULELL -------" + "           " + "------- TAULELL DESTAPAT -------" + salto);
    
    for (let i = 0; i < matriu.length; i++) {
        let filaMatriu = matriu[i].join(" ");           // Convierte la fila del primer tablero a string
        let filaTresors = matriuTresors[i].join(" ");   // Convierte la fila del segundo tablero a string
        console.log("  " + filaMatriu + "                      " + filaTresors); // Une ambas filas con un espacio entre ellas
    }
    console.log();
}

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    enterraTresors()
    printaTauler();
    console.log(menu);

    let exit = false;
    while (!exit && tiradas !== maxTiradas && tresorsRestants !== 0) {
        let opcion = (await rl.question("Opcio: ")).trim().toLowerCase();

        switch (opcion) {
            case "1":
            case "ajuda":
            case "help":
                console.log(menuAjuda);
                await rl.question("Press Enter to continue");
                break;
            case "2":
            case "carregar partida":
                const rutaCarrega = await rl.question("Nom de l'arxiu a carregar? ")

                carregarPartida(rutaCarrega)
                await rl.question(); 
                break;
            case "3":
            case "guardar partida":
                const ruta = await rl.question("Nom de l'arxiu a generar? ")

                const dades = {
                    taulell: matriu,
                    taulellTresors: matriuTresors,
                    tresorsRestants: tresorsRestants,
                    tiradas: tiradas
                }

                guardarPartida(dades, ruta)
                console.log(salto + `Dades escrites a ${ruta}`)

                break;
            case "4":
            case "trampa":
            case "cheat":
                if (!trampas){
                    console.log("Trampes activades, a partir d'hara es mostrara el taulell resolt")
                    trampas = true
                }else{
                    console.log("Trampes desactivades, ja no es mostrara el taulell resolt")
                    trampas = false    
                }
                break;
            case "5":
            case "destapar":
                let coordenada = (await rl.question("Introduce coordenada (ejemplo: D7): ")).trim().toUpperCase();
            
                let fila = coordenada[0]; // Primera letra (ejemplo: 'D')
                let columna = parseInt(coordenada[1]) + 1; // Resto como número (ejemplo: '7')
            
                if (fila in filaIndices && columna >= 1 && columna <= 8 && coordenada.length <= 2) {
                    let filaIndex = filaIndices[fila]; // Obtenemos el índice numérico de la fila
                    if (matriuTresors[filaIndex][columna] === "#") {
                        matriu[filaIndex][columna] = "O"; // Marcamos la casilla
                        console.log(`Casella ${coordenada} destapada.`);
                        console.log(`Enhorabona, has destapat un tresor!`);
                        tresorsRestants--
                    } else {
                        matriu[filaIndex][columna] = " "; // Marcamos la casilla
                        console.log(`Casella ${coordenada} destapada.`);
                        console.log(`No hi habia res a aquesta casella!`);
                        let distancia = distanciaTesoroMasCercano(filaIndex, columna);
                        console.log(`El tesoro más cercano está a ${distancia} casilla(s).`);
                        tiradas++
                        
                    }
                } else {
                    console.log("Coordenada inválida.");
                }

                if (tiradas === maxTiradas){
                    console.log(salto + `T'has quedat sense tirades! Has perdut, queden ${tresorsRestants} tresors restants.` + salto)
                }else if (tresorsRestants === 0){
                    console.log(salto + `Has destapat tots els tresors! Has guanyat amb nomes ${tiradas} tirades.` + salto)
                }

                break;
            case "6":
            case "puntuacio":
                mostraPuntuacio()
                await rl.question("Press Enter to continue");
                break;
            case "0":
            case "sortir":
            case "exit":
            case "salir":
                console.log("¡Hasta la próxima!");
                exit = true;
                break;
            default:
                console.log("¡Opción inválida!");
        }
        if(!exit && tiradas !== maxTiradas && tresorsRestants !== 0){
            printaTauler();
            console.log(menu);
        }
    }
    rl.close();
}

main();
