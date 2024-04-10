import { expect } from "chai";
import { addCardToCollection, deleteCardToCollection, Card, Color, LineType, Rarity } from "../src/index.js";



describe("Asynchronous function weatherInfo tests", () => {
  it ("deleteCardToCollection should delete a card", (done) => {
    deleteCardToCollection("edusegre",  new Card(777, 'Black Lotus', 69, Color.Black, LineType.Tierra, Rarity.Rare, 'Tap to delete the enemy creature.', 100 ), (error) => {
      if (!error) {
        expect(error).to.be.equal(undefined);
        done();
      }
    });
  });
  it("weatherInfo should get weather information", (done) => {
    addCardToCollection("edusegre",  new Card(777, 'Black Lotus', 69, Color.Black, LineType.Tierra, Rarity.Rare, 'Tap to delete the enemy creature.', 100 ), (error) => {
      if (!error) {
        expect(error).to.be.equal(undefined);
        done();
      }
    });
  });
  it("weatherInfo should provide an error", (done) => {

    addCardToCollection("edusegre",  new Card(777, 'Black Lotus', 69, Color.Black, LineType.Tierra, Rarity.Rare, 'Tap to delete the enemy creature.', 100 ), (error) => {
      if (error) {
        expect(error.message).to.be.equal("La carta ya existe en la colección.");
        done();
      }
    });
  });
  it ("deleteCardToCollection should delete a card", (done) => {
    deleteCardToCollection("edusegre",  new Card(777, 'Black Lotus', 69, Color.Black, LineType.Tierra, Rarity.Rare, 'Tap to delete the enemy creature.', 100 ), (error) => {
      if (!error) {
        expect(error).to.be.equal(undefined);
        done();
      }
    });
  });

});
