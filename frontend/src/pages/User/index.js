import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import {
  Table,
  Layout,
  Menu,
  Space,
  Input,
  Modal,
  Card,
  Row,
  Col,
  Form,
  DatePicker,
  notification,
} from "antd";
import moment from "moment";

import "./styles.css";
const { Header, Content, Footer } = Layout;
const { Search } = Input;
const FormItem = Form.Item;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function User() {
  const [users, setUser] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idUpdate, setIdUpdate] = useState();
  const [form] = Form.useForm();
  const history = useHistory();
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    const result = await api.get("users", {
      headers: {
        Authorization: token,
      },
    });
    setUser(result.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  const onSearch = async (value) => {
    const result = await api.get("users", {
      headers: {
        Authorization: token,
      },
      params: {
        search: value,
      },
    });
    setUser(result.data.data);
  };

  const showModal = (id) => {
    setIdUpdate(id);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const email = form.getFieldValue("email");
    const birthday = form.getFieldValue("birthday");
    const data = {
      id: idUpdate,
      email,
      birthday,
    };
    const config = {
      headers: {
        Authorization: token,
      },
    };
    console.log(data);
    api.put("user", data, config).then((r) => {
      notification["success"]({
        message: "Cập nhật thành công",
        description: "Đã cập nhật thành công!",
      });
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      render: (_, val) => {
        return moment(val.birthday).format("DD/MM/YYYY");
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={()=>showModal(record.id)}>Edit</a>
        </Space>
      ),
    },
  ];

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="u"> User</Menu.Item>
          <Menu.Item key="l" onClick={handleLogout}>
            {" "}
            Logout{" "}
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Search placeholder="Search by username or email" onSearch={onSearch} />
        <div className="site-layout-content">
          {users.length !== 0 && <Table columns={columns} dataSource={users} />}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
      {isModalVisible && (
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Card>
            <Form {...layout} form={form}>
              <Row gutter={24}>
                <Col span={20}>
                  <FormItem label="Email" name="email">
                    <Input />
                  </FormItem>
                </Col>
                <Col span={20}>
                  <FormItem label="Birthday" name="birthday">
                    <DatePicker />
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Card>
        </Modal>
      )}
    </Layout>
  );
}
