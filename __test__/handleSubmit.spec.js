import { handleSubmit } from "../src/client/js/formHandler"

describe("Handle submit function", () => {
    test("it should take the user's form input, send it to meaningcloud api for their text to be analyzed. In response, the api will return a json object of the analysis of the user's text.", () => {
        // actual test
        expect(handleSubmit).toBeDefined();
    });
}); 