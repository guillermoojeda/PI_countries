function comparerCreator(prop, direction) {
    if (direction === "asc") {
        return function (a, b) {
            if (a[prop] < b[prop]) return -1;
            if (a[prop] > b[prop]) return 1;
            return 0;
        }
    }
    if (direction === "desc") {
        return function (a, b) {
            if (a[prop] > b[prop]) return -1;
            if (a[prop] < b[prop]) return 1;
            return 0;
        }
    }
}

function numComparerCreator(prop, direction) {
    if (direction === "asc") {
        return function (a, b) {
            if (Number(a[prop]) < Number(b[prop])) return -1;
            if (Number(a[prop]) > Number(b[prop])) return 1;
            return 0;
        }
    }
    if (direction === "desc") {
        return function (a, b) {
            if (Number(a[prop]) > Number(b[prop])) return -1;
            if (Number(a[prop]) < Number(b[prop])) return 1;
            return 0;
        }
    }
}

var byCountryAsc = comparerCreator("name", "asc");

var byCountryDesc = comparerCreator("name", "desc");

var byPopAsc = numComparerCreator("population", "asc");

var byPopDesc = numComparerCreator("population", "desc");

const comparers = {
    byCountryAsc, byCountryDesc, byPopAsc, byPopDesc
}

export default comparers;