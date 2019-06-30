function createDate(){
    const date = new Date();
    const formatedDate = `${date.getDate() - 2}.${date.getMonth()-1}.${date.getFullYear()} ${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
    return formatedDate;
}

module.exports = createDate;