var faker = require('faker');
const categories = ['shoes', 'jackets', 'pants'];
const dummyData = [];

for (let i = 0; i < 12; i++) {
  const product = {
    id: i + 1,
    url: `https://source.unsplash.com/250x250/?${categories[i % 3]}/${i + 1}`,
    title: faker.commerce.productName(),
    category: categories[i % 3],
    description: faker.lorem.sentences(),
    price: faker.commerce.price()
  };
  dummyData.push(product);
}

export default dummyData;



/*
export default [
  {
    id: 1,
    url: `https://source.unsplash.com/300x300/?${categories[i % 3]}`,
    title: 'item1',
    description: 'dfadfsdfs',
    prices: 12.35,

  },
  {
    id: 2,
    url: `https://source.unsplash.com/300x300/?${categories[i % 3]}`,
    title: 'item1',
    description: 'dfadfsdfs',
    prices: 12.35,

  },
  ...
];
*/