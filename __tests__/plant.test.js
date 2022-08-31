import { storeState, changeState } from "../src/plant.js";

describe('storeState', () => {
  test('should return an empty object and store it in a new variable', () => {
    const result = storeState()();
    expect(result).toEqual({});
  });
});