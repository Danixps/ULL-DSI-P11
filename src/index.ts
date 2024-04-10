import fs from 'fs';

export enum Rarity {
    Common = 'común',
    Uncommon = 'infrecuente',
    Rare = 'rara',
    Mythic = 'mítica'
}

/**
 * Descripcion: Enumerado de colores de cartas
 */
export enum Color {
    White = 'blanco',
    Blue = 'azul',
    Black = 'negro',
    Red = 'rojo',
    Green = 'verde',
    Colorless = 'incoloro',
    Multicolor = 'multicolor'
}

export enum LineType {
    Tierra = 'tierra',
    Criatura = 'criatura',
    Encantamiento = 'encantamiento',
    Conjuro = 'conjuro',
    Instantaneo = 'instantaneo',
    Artefacto = 'artefacto',
    Planeswalker = 'planeswalker'
}

/**
 * Descripcion: La interfaz card_characteristics representa los aributos de las cartas
 */
export interface Card_Characteristics {
    id: number,
    color: Color,
    type: LineType,
    rarity: Rarity,
    rulesText: string,
    marketValue: number,
    powerandtoughness?: [number, number],
    loyalty?: number,
}

/**
 * Descripción: La
 */
export class Card implements Card_Characteristics {
    id: number;
    name: string;
    manaCost: number;
    color: Color;
    type: LineType;
    rarity: Rarity;
    rulesText: string;
    marketValue: number;
    powerandtoughness?: [number, number];
    loyalty?: number;

    /**
     * Crea una instancia de la clase Card.
     * @param id - El ID de la carta.
     * @param name - El nombre de la carta.
     * @param manaCost - El costo de maná de la carta.
     * @param color - El color de la carta.
     * @param type - El tipo de la carta.
     * @param rarity - La rareza de la carta.
     * @param rulesText - El texto de las reglas de la carta.
     * @param marketValue - El valor de mercado de la carta.
     * @param powerandtoughness - La fuerza y resistencia de la carta (solo para criaturas).
     * @param loyalty - La lealtad de la carta (solo para planeswalkers).
     */
    constructor(id: number, name: string, manaCost: number, color: Color, type: LineType, rarity: Rarity, rulesText: string, marketValue: number, powerandtoughness?: [number, number], loyalty?: number) {
        this.id = id;
        this.name = name;
        this.manaCost = manaCost;
        this.color = color;
        this.type = type;
        this.rarity = rarity;
        this.rulesText = rulesText;
        this.marketValue = marketValue;
        this.powerandtoughness = powerandtoughness;
        this.loyalty = loyalty;
    }
}
type Data = string;


// Función para añadir una carta a la colección
/**
 * Descripcion: cuando se ejecute un evento mensaje en el cliente analizara los parametros del mensaje recibido
 * @param mensaje Es el mensaje recibido del servidor
 */
export const addCardToCollection = (user: string, card: Card, callback:( err: Error | undefined, data: Data | undefined) => void) => {
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

/**
 * Descripcion: Elimia la carta de la collection de forma asyncrona
 * @param user usuario propietario de
 */
export const deleteCardToCollection = (user: string, card: Card, callback:( err: Error | undefined, data: Data | undefined) => void) => {
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
export const modifyCardToCollection = (user: string, card: Card, callback:( err: Error | undefined, data: Data | undefined) => void) => {
    const filePath = `./collections/${user}/${card.id}.json`;
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
            // La carta ya existe, proceder a eliminar el archivo JSON
            fs.writeFile(filePath, (JSON.stringify(card)), (err) => {
                if (err) {
                    callback(err, '_'); // Error al eliminar el archivo
                } else {
                    callback(undefined, 'Éxito al modificar la carta de ' + user ); // Éxito al eliminar la carta
                } 
            });
        } else {
            // La carta no existe, emitir un mensaje de error
            callback(new Error("La carta no existe en la colección de " + user + "."), '_');
        }
    });
}

// public modificarCarta(usuario: string) {
//     const directorioUsuario = `./${usuario}`;
//     const rutaArchivoid = `${directorioUsuario}/${this.id}.json`;
//     if (!fs.existsSync(rutaArchivoid)) {
//         console.error(chalk.red(`Card not found at ${usuario} collection`));
//         const result = `Card not found at ${usuario} collection`;
//         return result;
//     } 
//     const rutaArchivo = `${directorioUsuario}/${this.id}.json`;
//     fs.writeFileSync(rutaArchivo, JSON.stringify(this, null, 2));
//     console.log(chalk.green(`Card updated at ${usuario} collection!`));
//     const result = `Card updated at ${usuario} collection!`;
//     return result;
// }


// Uso de la función addCardToCollection con un callback
deleteCardToCollection("edusegre", new Card(777, 'Black Lotus', 69, Color.Black, LineType.Tierra, Rarity.Rare, 'Tap to delete the enemy creature.', 100 ), (error) => {
    if (error) {
        console.error("Error:", error.message);
    } else {
        console.log("¡Nueva carta añadida a la colección!");
    }
});

// Uso de la función deleteCardToCollection con un callback
addCardToCollection("edusegre", new Card(777, 'Black Lotus', 69, Color.Black, LineType.Tierra, Rarity.Rare, 'Tap to delete the enemy creature.', 100 ), (error) => {
    if (error) {
        console.error("Error:", error.message);
    } else {
        console.log("Éxito al eliminar la carta");
    }
});
