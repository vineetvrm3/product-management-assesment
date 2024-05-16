import { Form, Button, Input, Select } from "antd";
import ProductContext from "../../context/ProductContext";
import Header from "../Header";
import "./index.css";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";

const categories = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
];

const AddNewProductPage = (props) => {
  const navigate = useNavigate();
  return (
    <ProductContext.Consumer>
      {(value) => {
        const { addNewProduct } = value;

        return (
          <div className="main-form-container">
            <Header />
            <h2>Add A New Product</h2>
            <Form
              autoComplete="off"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 14 }}
              onFinish={(values) => {
                addNewProduct(values);
                navigate("/");
              }}
            >
              <Form.Item
                name="category"
                label="Categories"
                style={{ fontSize: "20px", fontWeight: "bold" }}
                rules={[
                  { required: true, message: "Please Select Category" },
                  { whitespace: true },
                ]}
              >
                <Select placeholder="Select Category">
                  {categories.map((each) => (
                    <Select.Option key={each} value={each}>
                      {each}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                style={{ fontSize: "20px", fontWeight: "bold" }}
                rules={[
                  { required: true, message: "Please Enter Description" },
                  { whitespace: true },
                ]}
              >
                <TextArea placeholder="Enter Description" />
              </Form.Item>

              <Form.Item
                name="title"
                label="Title"
                style={{ fontSize: "20px", fontWeight: "bold" }}
                rules={[
                  { required: true, message: "Please Enter Title" },
                  { whitespace: true },
                ]}
              >
                <Input placeholder="Enter title" />
              </Form.Item>

              <Form.Item
                name="price"
                label="Price"
                style={{ fontSize: "20px", fontWeight: "bold" }}
                rules={[
                  { required: true, message: "Please Enter Price" },
                  { whitespace: true },
                ]}
              >
                <Input placeholder="Enter Price" />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 24 }} labelCol={{ span: 20 }}>
                <Button block type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </ProductContext.Consumer>
  );
};

export default AddNewProductPage;
