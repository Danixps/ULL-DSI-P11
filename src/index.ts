import fs from 'fs';
interface Card {
    id: number;
    name: string;
    // Otros campos de la carta
}


type Data = string;
// Función para añadir una carta a la colección
export function addCardToCollection(user: string, card: Card, callback:( err: Error | undefined, data: Data | undefined) => void) {
    const filePath = `./collections/${user}/${card.id}.json`;
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
            // La carta ya existe, emitir un mensaje de error
            callback(new Error("La carta ya existe en la colección."), '_');
        } else {
            // La carta no existe, proceder a escribir el archivo JSON
            fs.writeFile(filePath, JSON.stringify(card), (err) => {
                if (err) {
                    callback(err, '_'); // Error al escribir el archivo
                } else {
                    callback(undefined, 'Éxito al cargar la carta'); // Éxito al añadir la carta
                }
            });
        }
    });
}
//DELETE CARD
export function deleteCardToCollection(user: string, card: Card, callback:( err: Error | undefined, data: Data | undefined) => void) {
    const filePath = `./collections/${user}/${card.id}.json`;
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
            // La carta ya existe, proceder a eliminar el archivo JSON
            fs.unlink(filePath, (err) => {
                if (err) {
                    callback(err, '_'); // Error al eliminar el archivo
                } else {
                    callback(undefined, 'Éxito al eliminar la carta'); // Éxito al eliminar la carta
                }
            });
        } else {
            // La carta no existe, emitir un mensaje de error
            callback(new Error("La carta no existe en la colección."), '_');
        }
    });
}

// // Uso de la función addCardToCollection con un callback
// addCardToCollection("edusegre", { id: 1, name: "Black Lotus" /* Otros campos */ }, (error) => {
//     if (error) {
//         console.error("Error:", error.message);
//     } else {
//         console.log("¡Nueva carta añadida a la colección!");
//     }
// });
