import { createProduct, getAllProducts, getProductDetails, getSellerProduct } from "../service/product.api";
import { useDispatch } from "react-redux";
import { setProducts, setSellerProducts, setProductDetails } from "../state/product.slice";

export const useProduct = () => {
  const dispatch = useDispatch();

  async function handleCreateProduct(formData) {
    const data = await createProduct(formData);
    return data.product;
  }

  async function handleGetSellerProduct() {
    const data = await getSellerProduct();
    dispatch(setSellerProducts(data.products));
    return data.products;
  }

  async function handleGetAllProducts(){
    const data = await getAllProducts();
    dispatch(setProducts(data.products)); 
    return data.products;
  }

  async function handleGetProductDetails(productId){
    const data = await getProductDetails(productId);
    dispatch(setProductDetails(data.product));
    return data.product;
  }

  return { handleCreateProduct, handleGetSellerProduct, handleGetAllProducts, handleGetProductDetails };
};
