import { createContext } from "react";

const ProductContext = createContext({
  productsList: [],
  editData: {},
  isEditing: "",
  onDelete: () => {},
  onEditProduct: () => {},
  updateCategory: () => {},
  updateDescription: () => {},
  updateTitle: () => {},
  updatePrice: () => {},
  saveTheUpdate: () => {},
  addNewProduct: () => {},
});

export default ProductContext;
