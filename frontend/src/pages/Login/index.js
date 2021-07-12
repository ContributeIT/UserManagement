import { Form, Input, Button, Row, Col } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
export default function Login() {
  const history = useHistory();
  const [form] = Form.useForm();

  async function handleLogin(e) {
    const username = form.getFieldValue("username");
    const password = form.getFieldValue("password");
    try {
      const response = await api.post("login", {
        username,
        password,
      });
      localStorage.setItem("remember_token", response.data.token);
      history.push("/users");
    } catch (err) {
      alert("Login failed, try again.");
    }
  }

  return (
    <Form {...layout} form={form}>
      <Row gutter={24}>
        <Col span={20}>
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>
        </Col>
        <Col span={20}>
          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>
        </Col>
        <Col span={20}>
          <Form.Item style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit" onClick={handleLogin}>
              Login
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
