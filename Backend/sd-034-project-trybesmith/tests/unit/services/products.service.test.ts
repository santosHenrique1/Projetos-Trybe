import { expect } from 'chai';
import sinon from 'sinon';
import ProductsService  from '../../../src/service/product.services';
import ProductModel from '../../../src/database/models/product.model';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });

  it('criar um produto', async function () {
    const product = {
      id: 1,
      name: 'Produto de teste',
      price: 10.0,
      userId: 1,
    };
    sinon.stub(ProductsService, 'createProduct').resolves(product);
    const newProduct = await ProductsService.createProduct(product);
    expect(newProduct).to.be.deep.equal(product);
    
  });
  
  it("should return a 201 status and a new product", async function () {
    const product = {
      id: 1,
      name: 'Produto de teste',
      price: 10.0,
      userId: 1,
    };
    const product1 = { 
      name: 'Produto de teste1',
      price: 10.0,
      userId: 1,

    };
    sinon.stub(ProductModel, "create").resolves(ProductModel.build(product));
    const result = await ProductsService.createProduct(product1);
    expect(result).to.deep.equal(product);
  });
  it('listar produtos', async function () {
    const products = [
      {
        id: 1,
        name: 'Produto de teste',
        price: 10.0,
        userId: 1,
      },
      {
        id: 2,
        name: 'Produto de teste 2',
        price: 20.0,
        userId: 1,
      },
    ];
    sinon.stub(ProductsService, 'productList').resolves(products);
    const allProducts = await ProductsService.productList();
    expect(allProducts).to.be.deep.equal(products);
  });

});
