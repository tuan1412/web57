Giả sử Product Collection có dữ liệu như sau: 

```
// Product collection
[
  {
    title: "Áo thun nam Polo cao cấp",
    slug: 'ao-thun-name-polo-cao-cap',
    description: "Áo ngắn tay, cotton, rẻ",
    rating: 4.1,
    viewCount: 1200,
    imageUrl: "http://example.png",
    tags: ["áo", "nam"],
    category: "Quần áo",
    price: 200000,
    sellQuantity: 1280, // số lượng bán ra
    stockQuantity: 2 // số lượng tồn kho
    
  },
  {
    title: "Quần đùi thể thao",
    slug: 'quan-dui-the-thao',
    description: "Quần dai không sợ rách",
    rating: 4.9,
    viewCount: 1200,
    imageUrl: "http://example.png",
    tags: ["thể thao", "nam"],
    category: "Quần áo",
    price: 18000,
    sellQuantity: 2000, // số lượng bán ra
    stockQuantity: 80 // số lượng tồn kho
  },
  {
    title: "Khăn quàng cổ",
    slug: 'khan-quang-co',
    description: "Khăn ấm",
    rating: 2.2,
    viewCount: 2000,
    imageUrl: "http://example.png",
    tags: ["khăn quàng", "unisex"],
    category: "Phụ kiện",
    price: 150000,
    sellQuantity: 20, // số lượng bán ra
    stockQuantity: 0 // số lượng tồn kho
  },
]
```
Với ProductModel là model thoả mãn schema của Product trên. Hãy viết các câu lệnh thoả mãn điều kiện sau.

1. Danh sách tất cả sản phẩm có category là "Quần áo"
```
const products = await ProductModel.find({ category: "Quần áo" })
```

Các ví dụ sau làm tương tự

2. Danh sách sản phẩm có giá bán từ 50000 đến 100000
3. Danh sách sản phẩm có title hoặc description chứa từ khoá "áo" (không phân biệt hoa thường) 
4. Danh sách sản phẩm không thể bán (hết số lượng tồn kho)
5. Danh sách sản phẩm được đánh giá cao (có rating lớn hơn hoặc bằng 4)
6. Danh sách sản phẩm trending (có lượt view từ 2000) sắp xếp theo chiều giảm dần số view
7. Danh sách sản phẩm có tags là "nam"
8. Danh sách sản phẩm theo giá bán tăng dần
9. Danh sách sản phẩm thuộc danh mục "Quần áo" bán chạy (số lượng bán ra lớn hơn 100) sắp xếp theo bảng chữ cái alphabet tăng dần của title
10. [Nâng cao] Cho từ khoá "khăn quang" (Người dùng nhập từ khăn có dấu còn từ quàng không có dấu), làm thế nào để ra được danh sách các sản phẩm có từ khoá "khăn quàng"