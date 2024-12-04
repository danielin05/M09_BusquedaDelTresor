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

function printaTauler() {
    for (let fila of matriu) {
        console.log(fila.join(" "));
    }
}

function printaTaulerTresors() {
    for (let fila of matriuTresors) {
        console.log(fila.join(" "));
    }
}

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

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

    enterraTresors()
    printaTauler();
    console.log(menu);

    let exit = false;
    while (!exit) {
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
                console.log("Función para cargar partida no implementada.");
                break;
            case "3":
            case "guardar partida":
                console.log("Función para guardar partida no implementada.");
                break;
            case "4":
            case "trampa":
            case "cheat":
                console.log(salto + "------- TAULELL DESTAPAT -------" + salto)
                printaTaulerTresors()
                break;
            case "5":
                case "destapar":
                    let coordenada = (await rl.question("Introduce coordenada (ejemplo: D7): ")).trim().toUpperCase()
                    let fila = coordenada[0] // Primera letra (ejemplo: 'D')
                    let columna = parseInt(coordenada[1]) // Resto como número (ejemplo: '7')
    
                    if (fila in filaIndices && columna >= 1 && columna <= 7) {
                        let filaIndex = filaIndices[fila] // Obtenemos el índice numérico de la fila
                        matriu[filaIndex][columna] = "B" // Marcamos la casilla
                        console.log(`Casella ${coordenada} destapada.`);
                    } else {
                        console.log("Coordenada inválida.")
                    }
                    break;
            case "6":
            case "puntuacio":
                console.log("Función para mostrar puntuación no implementada.");
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

        printaTauler();
        console.log(menu);
    }
    rl.close();
}

main();
