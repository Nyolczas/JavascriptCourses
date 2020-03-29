//--- https://zellwk.com/blog/async-await-in-loops/

const fruitBasket = {
    apple: 27,
    grape: 0,
    pear: 14
};

const getNumFruit = fruit => {
    return fruitBasket[fruit];
};

const numApples = getNumFruit('apple');
console.log(numApples);