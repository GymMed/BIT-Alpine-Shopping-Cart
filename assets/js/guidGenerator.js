class GuidGenerator {
    //in future implement a function that takes in
    //component name and creates a set and based on length
    //to check if it actually generated not duplicate
    //uuid(A Universally Unique Identifier)
    //if not generate again

    //Globally Unique Identifier (GUID)
    static getGUID() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
            (
                c ^
                (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
            ).toString(16)
        );
    }
}
