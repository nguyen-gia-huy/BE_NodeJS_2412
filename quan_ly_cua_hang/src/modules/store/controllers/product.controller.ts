import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../dto/product.dto";
import { products } from "../models/product.model";
// products (POST): Thêm một sản phẩm mới vào danh sách sản phẩm.
export const addProduct = (req: Request, res: Response) => {
  const { name, price, category } = req.body;

  const newProduct: Product = {
    id: uuidv4(),
    name,
    price,
    category,
  };
  products.push(newProduct);
  res.status(201).json({
    message: "them product thanh cong",
    data: newProduct,
  });
};
// products (GET): Liệt kê tất cả các sản phẩm hiện có.
export const getProducts = (req: Request, res: Response) => {
  res.status(200).json({
    data: products,
  });
};
// products/:id (GET): Lấy thông tin sản phẩm dựa trên mã sản phẩm.
export const getProduct = (req: Request, res: Response) => {
  const { id } = req.params;
  const product = products.find((e) => e.id == id);

  if (product) {
    res.status(200).json({
      data: product,
    });
  } else {
    res.status(404).json({
      message: "Không tìm thấy product phù hợp",
    });
  }
};
// products/:id (PUT): Cập nhật thông tin sản phẩm dựa theo mã sản phẩm.
export const updateProduct = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, category } = req.body;

  const index = products.findIndex((element) => element.id == id);

  if (index !== -1) {
    const updateProduct = {
      id,
      name,
      price,
      category,
    };

    products[index] = updateProduct;

    res.status(200).json({
      data: updateProduct,
    });
  } else {
    res.status(404).json({
      message: "Không tìm thấy Product phù hợp",
    });
  }
};
// products/:id (DELETE): Xóa sản phẩm khỏi danh sách dựa trên mã sản phẩm.
export const deleteProduct = (req: Request, res: Response) => {
  const { id } = req.params;

  const index = products.findIndex((element) => element.id == id);

  if (index !== -1) {
    products.splice(index, 1);
    res.status(200).json({
      message: "Xóa product thành công",
    });
  } else {
    res.status(404).json({
      message: "Không tìm thấy product phù hợp",
    });
  }
};
