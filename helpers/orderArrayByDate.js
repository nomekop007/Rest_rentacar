module.exports = (array) => {
    return array.sort(function (a, b) {
        const fechaA = new Date(a.createdAt);
        const fechaB = new Date(b.createdAt);
        if (fechaA > fechaB) {
            return 1;
        }
        if (fechaA < fechaB) {
            return -1;
        }
        return 0;
    });
}