const {
    getNavBar,
    getProducts,
    showProducts,
    showProductById,
    showNewProductForm, 
    createProduct,
    updateProductById, 
    deleteProductById,
} = require('../controllers/productController.js');
const Product = require('../models/Product.js');

jest.mock('../models/Product.js', () => ({
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()   
}));

const mockRes = () => ({
  send: jest.fn(),
  status: jest.fn().mockReturnThis()
})

const expectHTML = (res, values) => {
  values.forEach(v =>
    expect(res.send).toHaveBeenCalledWith(
      expect.stringContaining(v)
    )
  )
}

const mockProduct = {
  _id: 1,
  name: 'camiseta',
  description: 'camiseta con logo',
  price: 15,
  image: '',
  category: 'camisetas',
  size: 'M'
}

const mockProductBody = {
  name: 'camiseta',
  description: 'camiseta con logo',
  price: 15,
  image: '',
  category: 'camisetas',
  size: 'M'
}


beforeEach(() => {
  jest.clearAllMocks()
})

describe('getNavBar', () => {
  it.each([
    ['/dashboard', 'Logout'],
    ['/products', 'Login']
  ])('renders navbar correctly for %s', (path, authText) => {
    const html = getNavBar(path)

    expect(html).toContain(path)
    expect(html).toContain('Camisetas')
    expect(html).toContain(authText)
  })
})

describe('getProducts', () => {
  it('returns products HTML', () => {
    const html = getProducts('/products/', [mockProduct])

    expect(html).toContain(mockProduct.name)
    expect(html).toContain(`${mockProduct.price}€`)
  })
})

describe('showProducts', () => {
  it('renders products list', async () => {
    Product.find.mockResolvedValue([mockProduct])

    const req = { path: '/dashboard', query: {} }
    const res = mockRes()

    await showProducts(req, res)

    expect(Product.find).toHaveBeenCalled()
    expectHTML(res, ['Productos', mockProduct.name])
  })

  it('handles DB error', async () => {
    Product.find.mockRejectedValue(new Error())

    const res = mockRes()
    await showProducts({ path: '/dashboard', query: {} }, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      message: 'There was a problem trying get all products'
    })
  })
})

describe('showProductById', () => {
  it('renders product by id', async () => {
    Product.findById.mockResolvedValue(mockProduct)

    const req = { params: { productId: 1 }, path: '/dashboard' }
    const res = mockRes()

    await showProductById(req, res)

    expect(Product.findById).toHaveBeenCalledWith(1)
    expectHTML(res, [mockProduct.name, mockProduct.description])
  })

  it.each([
    ['not found', null],
    ['db error', new Error()]
  ])('handles error: %s', async (_, mockValue) => {
    Product.findById.mockImplementation(() => {
      if (mockValue instanceof Error) throw mockValue
      return mockValue
    })

    const res = mockRes()
    await showProductById({ params: { id: 1 } }, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      message: 'Error getting the product.'
    })
  })
})


describe('showNewProductForm', () => {
  it('renders new product form', async () => {
    const res = mockRes()
    await showNewProductForm({ path: '/dashboard' }, res)

    expectHTML(res, ['Crear producto', '<form'])
  })
})

describe('createProduct', () => {
  it('creates a product', async () => {
    Product.create.mockResolvedValue({ _id: 1, ...mockProductBody})

    const req = { body: mockProduct, path: '/dashboard' }
    const res = mockRes()

    await createProduct(req, res)

    expect(Product.create).toHaveBeenCalledWith(mockProductBody)
    expectHTML(res, [
      mockProduct.description,
      `${mockProduct.price}€`,
      mockProduct.category,
      mockProduct.size
    ])
  })

  it('validates required fields', async () => {
    const res = mockRes()
    await createProduct({ body: {} }, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      message: 'All fields marked with * are required'
    })
  })

  it('handles DB error', async () => {
    Product.create.mockRejectedValue(new Error())

    const res = mockRes()
    await createProduct({ body: {}, path: '/dashboard' }, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({
      message: 'There was a problem trying to create a product'
    })
  })
})


describe('updateProductById', () => {
  it('updates a product', async () => {
    Product.findByIdAndUpdate.mockResolvedValue(mockProduct)

    const updateBody = {
        name: 'camiseta',
        description: 'camiseta con logo',
        price: 15,
        image: '',
        category: 'camisetas',
        size: 'M'
    }

    const req = {
      params: { productId: 1 },
      body: updateBody,
      path: '/dashboard'
    }
    const res = mockRes()

    await updateProductById(req, res)

    expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
      1,
      updateBody,
      { new: true }
    )
    expectHTML(res, ['Volver'])
  })

  it('handles missing id', async () => {
    const res = mockRes()
    await updateProductById({ params: {}, body: {} }, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({ message: 'Product not found' })
  })

  it('handles DB error', async () => {
    Product.findByIdAndUpdate.mockRejectedValue(new Error())

    const res = mockRes()
    await updateProductById({ params: { productId: 1 } }, res)

    expect(res.status).toHaveBeenCalledWith(500)
  })
})


describe('deleteProductById', () => {
  it('deletes product', async () => {
    Product.findByIdAndDelete.mockResolvedValue(mockProduct)

    const res = mockRes()
    await deleteProductById({ params: { productId: 1 }, path: '/dashboard'}, res)

    expect(Product.findByIdAndDelete).toHaveBeenCalledWith(1)
    expectHTML(res, ['Product deleted'])
  })

  it('handles deletion error', async () => {
    Product.findByIdAndDelete.mockRejectedValue(new Error())

    const res = mockRes()
    await deleteProductById({ params: { productId: 1 }, path: '/dashboard' }, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expectHTML(res, ['There was a problem trying to delete'])
  })
})