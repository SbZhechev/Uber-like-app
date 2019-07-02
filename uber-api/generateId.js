function* myGenerator() {
    var index = 300;
    while(true)
        yield ++index;
};

const gen = myGenerator();

module.exports = gen;