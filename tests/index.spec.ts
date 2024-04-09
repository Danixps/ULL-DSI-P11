import { expect } from "chai";
import { addCardToCollection, deleteCardToCollection } from "../src/index.js";


describe("Asynchronous function weatherInfo tests", () => {
  it ("deleteCardToCollection should delete a card", (done) => {
    deleteCardToCollection("edusegre", { id: 1, name: "Black Lotus" }, (error) => {
      if (!error) {
        expect(error).to.be.equal(undefined);
        done();
      }
    });
  });
  it("weatherInfo should get weather information", (done) => {
    addCardToCollection("edusegre", { id: 1, name: "Black Lotus" }, (error) => {
      if (!error) {
        expect(error).to.be.equal(undefined);
        done();
      }
    });
  });
  it("weatherInfo should provide an error", (done) => {

    addCardToCollection("edusegre", { id: 1, name: "Black Lotus" }, (error) => {
      if (error) {
        expect(error.message).to.be.equal("La carta ya existe en la colección.");
        done();
      }
    });
  });
});
