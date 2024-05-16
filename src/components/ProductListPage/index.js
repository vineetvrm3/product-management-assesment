import { Link } from "react-router-dom";
import { Modal, Table, Input, Statistic, Card, Row, Col } from "antd";
import ProductContext from "../../context/ProductContext";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Header from "../Header";
import "./index.css";

const categories = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
];

const ProductListPage = () => {
  return (
    <ProductContext.Consumer>
      {(value) => {
        const {
          productsList,
          onDelete,
          isEditing,
          onEditProduct,
          editData,
          updateCategory,
          updateDescription,
          updateTitle,
          updatePrice,
          saveTheUpdate,
        } = value;
        const smartphones = productsList.filter(
          (eachProduct) => eachProduct.category === "smartphones"
        );
        const laptops = productsList.filter(
          (eachProduct) => eachProduct.category === "laptops"
        );
        const fragrances = productsList.filter(
          (eachProduct) => eachProduct.category === "fragrances"
        );
        const skincare = productsList.filter(
          (eachProduct) => eachProduct.category === "skincare"
        );
        const groceries = productsList.filter(
          (eachProduct) => eachProduct.category === "groceries"
        );
        const homeDecoration = productsList.filter(
          (eachProduct) => eachProduct.category === "home-decoration"
        );

        const columns = [
          {
            title: "Category",
            dataIndex: "category",
            key: "id",
            filters: [
              { text: "smartphones", value: "smartphones" },
              { text: "laptop", value: "laptop" },
              { text: "fragrances", value: "fragrances" },
              { text: "skincare", value: "skincare" },
              { text: "groceries", value: "groceries" },
              { text: "home-decoration", value: "home-decoration" },
            ],
            onFilter: (value, record) => record.category.indexOf(value) === 0,
          },

          {
            title: "Description",
            dataIndex: "description",
            key: "id",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
              return (
                <>
                  <Input
                    autoFocus
                    placeholder="Enter Text Here"
                    value={selectedKeys[0]}
                    onChange={(e) => {
                      setSelectedKeys(e.target.value ? [e.target.value] : []);
                      confirm({ closeDropdown: false });
                    }}
                    onPressEnter={() => {
                      confirm();
                    }}
                    onBlur={() => {
                      confirm();
                    }}
                  />
                </>
              );
            },
            filterIcon: () => {
              return (
                <SearchOutlined style={{ fontSize: "18px", color: "#08c" }} />
              );
            },
            onFilter: (value, record) => {
              return record.description
                .toLowerCase()
                .includes(value.toLowerCase());
            },
          },

          {
            title: "Name",
            dataIndex: "title",
            key: "id",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
              return (
                <>
                  <Input
                    autoFocus
                    placeholder="Enter Text Here"
                    value={selectedKeys[0]}
                    onChange={(e) => {
                      setSelectedKeys(e.target.value ? [e.target.value] : []);
                      confirm({ closeDropdown: false });
                    }}
                    onPressEnter={() => {
                      confirm();
                    }}
                    onBlur={() => {
                      confirm();
                    }}
                  />
                </>
              );
            },
            filterIcon: () => {
              return (
                <SearchOutlined style={{ fontSize: "18px", color: "#08c" }} />
              );
            },
            onFilter: (value, record) => {
              return record.title.toLowerCase().includes(value.toLowerCase());
            },
          },

          { title: "Price in Rupees", dataIndex: "price", key: "id" },

          {
            title: "Actions",
            key: "id",
            render: (record) => {
              return (
                <>
                  <button
                    onClick={() => {
                      onEditProduct(record);
                    }}
                  >
                    <EditOutlined />
                  </button>
                  <button
                    onClick={() => {
                      onDelete(record.id);
                    }}
                  >
                    <DeleteOutlined />
                  </button>
                </>
              );
            },
          },
        ];
        console.log(productsList);
        return (
          <div className="products-list-container">
            <Header />

            <Row gutter={16}>
              <Col span={3}>
                <Card>
                  <Statistic
                    title="Total Products"
                    value={productsList.length}
                    valueStyle={{ color: "#3f8600" }}
                  />
                </Card>
              </Col>
              <Col span={3}>
                <Card>
                  <Statistic
                    title="Smartphones"
                    value={smartphones.length}
                    valueStyle={{ color: "#3f8600" }}
                  />
                </Card>
              </Col>
              <Col span={3}>
                <Card>
                  <Statistic
                    title="Laptops"
                    value={laptops.length}
                    valueStyle={{ color: "#3f8600" }}
                  />
                </Card>
              </Col>
              <Col span={3}>
                <Card>
                  <Statistic
                    title="Fragrances"
                    value={fragrances.length}
                    valueStyle={{ color: "#3f8600" }}
                  />
                </Card>
              </Col>
              <Col span={3}>
                <Card>
                  <Statistic
                    title="Skin Care"
                    value={skincare.length}
                    valueStyle={{ color: "#3f8600" }}
                  />
                </Card>
              </Col>
              <Col span={3}>
                <Card>
                  <Statistic
                    title="Groceries"
                    value={groceries.length}
                    valueStyle={{ color: "#3f8600" }}
                  />
                </Card>
              </Col>
              <Col span={4}>
                <Card>
                  <Statistic
                    title="Home Decoration"
                    value={homeDecoration.length}
                    valueStyle={{ color: "#3f8600" }}
                  />
                </Card>
              </Col>
            </Row>

            <Link to="/productadd">
              <button>Add New Product</button>
            </Link>
            <Table dataSource={productsList} columns={columns}></Table>
            <Modal
              title="Edit Product"
              open={isEditing}
              okText="Save"
              onCancel={onEditProduct}
              onOk={saveTheUpdate}
            >
              <div className="modal-container">
                <label>Category</label>
                <select value={editData.category} onChange={updateCategory}>
                  {categories.map((eachCategory, index) => {
                    return (
                      <option value={eachCategory} key={index}>
                        {eachCategory}
                      </option>
                    );
                  })}
                </select>
                <label>Description</label>
                <Input
                  value={editData.description}
                  onChange={updateDescription}
                />
                <label>Name</label>
                <Input value={editData.title} onChange={updateTitle} />
                <label>Price</label>
                <Input value={editData.price} onChange={updatePrice} />
              </div>
            </Modal>
          </div>
        );
      }}
    </ProductContext.Consumer>
  );
};

export default ProductListPage;
