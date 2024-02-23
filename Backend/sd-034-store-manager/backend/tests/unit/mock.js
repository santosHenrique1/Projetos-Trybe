const mockAllData = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];
const mockData = {
  id: 1,
  name: 'Martelo de Thor',
};
const mockMessage = {
  message: 'product not found',
};
const mockAllSales = [{
  id: 1,
  date: '2022-03-17T00:00:00.000Z',
},
{
  id: 2,
  date: '2021-03-17T00:00:00.000Z',
}];
const mockSales = [{
  id: 1,
  date: '2021-03-17T00:00:00.000Z',
},
];
const mockCratedProduct = {
  status: 'CREATED',
  data: { id: 4,
    name: 'Produto1',
  },

};
const createSaleMock = {
  status: 'CREATED',
  data: {
    id: 3,
    itemsSold: [
      {
        productId: 1,
        quantity: 2,
      },
      {
        productId: 2,
        quantity: 3,
      },
    ],
  },
};
const mockNewSales = [{
  productId: 1,
  quantity: 2,
},
{
  productId: 2,
  quantity: 3,
},
];
const mockUpdateProduct = {
  id: 1,
  name: 'Martelo de Thor',
};
const mockProductResponseAll = {
  status: 'SUCCESS',
  data: mockAllData,
};
const mockResponse = {
  status: 'SUCCESS',
  data: mockData,
};
const mockResponseSales = {
  status: 'SUCCESS',
  data: mockSales,
};
const mockResponseAllSales = {
  status: 'SUCCESS',
  data: mockAllSales,
};
const mockSalesResponse = {
  status: 'SUCCESS',
  data: [
    { id: 1, date: '2021-03-17T00:00:00.000Z' },
    { id: 2, date: '2021-03-17T00:00:00.000Z' },
  ],
};

module.exports = { mockAllData,
  mockData,
  mockMessage,
  mockSales,
  mockAllSales,
  mockCratedProduct,
  createSaleMock,
  mockNewSales,
  mockUpdateProduct,
  mockProductResponseAll,
  mockResponse,
  mockResponseSales,
  mockResponseAllSales,
  mockSalesResponse,
};