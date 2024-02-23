import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import ProductsController from '../../../src/controller/product.controller';
import productServices from '../../../src/service/product.services';
chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  it('criar um produto', async function () {
    req.body = {
      name: 'Produto de teste',
      price: 10.0,
      userId: 1,
    };
    const product = {
      id: 1,
      name: 'Produto de teste',
      price: 10.0,
      userId: 1,
    };
    sinon.stub(productServices, 'createProduct').resolves(product);
    await ProductsController.createProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(product);

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
    sinon.stub(productServices, 'productList').resolves(products);
    await ProductsController.findAllProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });
  

});
