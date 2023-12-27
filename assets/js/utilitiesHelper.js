class UtilitiesHelper {
    constructor() {}

    static isInArraySize(array, value) {
        if (!Array.isArray(array)) {
            return false;
        } else if (
            isNaN(value) ||
            value < 0 ||
            !Array.isArray(array) ||
            value > array.length - 1
        ) {
            return false;
        }
        return true;
    }

    static isEmptyArray(array) {
        if (!Array.isArray(array)) return true;

        if (array.length < 1) return true;

        return false;
    }

    static fillArrayToLength(array, fillToLength) {
        for (
            let currentElement = array.length;
            currentElement < fillToLength;
            currentElement++
        ) {
            array[currentElement] = currentElement;
        }
    }

    static getArrayWithNotContainedValues(array, valuesArray) {
        const newArray = [];
        let currentValue = 0;
        let foundMatch = false;

        for (
            let currentElement = 0;
            currentElement < array.length;
            currentElement++
        ) {
            for (
                currentValue = 0;
                currentValue < valuesArray.length;
                currentValue++
            ) {
                if (array[currentElement] === valuesArray[currentValue]) {
                    foundMatch = true;
                    break;
                }
            }

            if (foundMatch) foundMatch = false;
            else newArray.push(array[currentElement]);
        }

        return newArray;
    }

    static getSwicthedObjectsKeys(objectToSwitchKeys, objectOfKeys) {
        if (
            typeof objectToSwitchKeys !== "object" ||
            typeof objectOfKeys !== "object"
        )
            return object;

        const originalKeys = Object.keys(objectToSwitchKeys);
        const switchKeys = Object.keys(objectOfKeys);
        const newObject = {};
        let originalKey = 0;

        for (
            let currentOriginalKey = 0;
            currentOriginalKey < originalKeys.length;
            currentOriginalKey++
        ) {
            originalKey = originalKeys[currentOriginalKey];

            if (!objectOfKeys.hasOwnProperty(originalKey)) {
                newObject[originalKey] = objectToSwitchKeys[originalKey];
                continue;
            }

            newObject[objectOfKeys[originalKey]] =
                objectToSwitchKeys[originalKey];
        }

        return newObject;
    }

    static isLink(string) {
        const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

        return urlPattern.test(string);
    }

    static async isImageLink(url) {
        try {
            const response = await fetch(url, {
                method: "HEAD",
            });

            const contentType = response.headers.get("content-type");

            if (contentType && contentType.startsWith("image/")) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
            // console.error(error);
        }
    }
}
