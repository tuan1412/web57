- Thay đổi sản phẩm của cart
// có thể sử dụng kĩ thuật debounce để hạn chế lần gọi API
// useDebounce

useEffect(() => {
  api.put('/api/cart', { data: listProduct })
}, [listProduct])

// upsert là nếu có document trong DB thì update, còn nếu ko có thì create

const cart = CartModel.find({ user});

if cart {
  findOneAndUpdate()
} else {
  create
}

CartModel.findOneAndUpdate({ userId }, { listProducts }, { upsert: true, new: true })


listProduct: [
  {
    productId: 1,
    quantity: 2
  }
]