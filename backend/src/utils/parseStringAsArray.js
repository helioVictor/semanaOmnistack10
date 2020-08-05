module.exports = function ParseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map( techs => techs.trim());
}