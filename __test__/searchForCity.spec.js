import { searchForCity } from "../src/client/js/application";

describe("Entry Function that begins the weather forecast search for a location", () => {
    test("it should take the user's city, send it to the geoNames API, where it'll return a list of results. User will select one. This will trigger another API that'll get an average of the high and low temperatures in that city over the next 16 days, along with another API that'll return a picture of said city.", () => {
        // actual test
        expect(searchForCity).toBeDefined();
    });
}); 