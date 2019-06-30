function createDate(){
    const date = new Date();
    const formatedDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}h-${date.getMinutes()}m-${date.getSeconds()}s`;
    return formatedDate;
}

module.exports = createDate;