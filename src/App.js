import "./App.css";
import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddNewProductPage from "./components/AddNewProductPage";
import ProductListPage from "./components/ProductListPage";
import ProductContext from "./context/ProductContext";
import { Modal } from "antd";
import { v4 as uuidv4 } from "uuid";

class App extends Component {
  state = { productsList: [], editData: {}, isEditing: false };

  componentDidMount() {
    this.getProductData();
  }

  getProductData = async () => {
    const response = await fetch("https://dummyjson.com/products/");
    const data = await response.json();
    this.setState({ productsList: data.products });
    console.log(data);
  };

  onDelete = (id) => {
    const { productsList } = this.state;
    const filteredList = productsList.filter((each) => each.id !== id);

    Modal.confirm({
      title: "Are you Sure, You want to Delete?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        this.setState({ productsList: filteredList });
      },
    });
  };

  updateCategory = (event) => {
    this.setState((prevState) => ({
      editData: { ...prevState.editData, category: event.target.value },
    }));
  };

  updateDescription = (event) => {
    this.setState((prevState) => ({
      editData: { ...prevState.editData, description: event.target.value },
    }));
  };

  updateTitle = (event) => {
    this.setState((prevState) => ({
      editData: { ...prevState.editData, title: event.target.value },
    }));
  };

  updatePrice = (event) => {
    this.setState((prevState) => ({
      editData: { ...prevState.editData, price: event.target.value },
    }));
  };

  onEditProduct = (record) => {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing,
      editData: record,
    }));
  };

  saveTheUpdate = () => {
    const { editData } = this.state;
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing,
      productsList: prevState.productsList.map((eachProduct) => {
        if (editData.id === eachProduct.id) {
          return { ...editData };
        }
        return eachProduct;
      }),
    }));
  };

  addNewProduct = (values) => {
    const newProduct = {
      id: uuidv4(),
      category: values.category,
      description: values.description,
      title: values.title,
      price: values.price,
    };
    this.setState((prevState) => ({
      productsList: [...prevState.productsList, newProduct],
    }));
  };

  render() {
    const { productsList, editData, isEditing } = this.state;
    return (
      <ProductContext.Provider
        value={{
          productsList,
          editData,
          isEditing,
          onDelete: this.onDelete,
          onEditProduct: this.onEditProduct,
          updateCategory: this.updateCategory,
          updateDescription: this.updateDescription,
          updateTitle: this.updateTitle,
          updatePrice: this.updatePrice,
          saveTheUpdate: this.saveTheUpdate,
          addNewProduct: this.addNewProduct,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<ProductListPage />} />
            <Route exact path="/productadd" element={<AddNewProductPage />} />
          </Routes>
        </BrowserRouter>
      </ProductContext.Provider>
    );
  }
}

export default App;
