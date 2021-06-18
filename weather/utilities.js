function capitalize(myString) {
    return myString[0].toUpperCase() + myString.slice(1, undefined);
}
function convertTemp(temp, units) {
    if (units === 'F') {
        return temp;
    }
    return (5 / 9 * (temp - 32)).toFixed(2);
}
export { capitalize as toTitleCase, convertTemp };
