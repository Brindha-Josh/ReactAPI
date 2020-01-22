import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import Snackbar from "@material-ui/core/SnackBar";
import IconButton from "@material-ui/core/IconButton";

export class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = { snackbarOpen: false, snackbarmsg: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  snackbarClose = event => {
    this.setState({ snackbarOpen: false });
  };

  handleSubmit(event) {
    event.preventDefault();
    fetch("https://localhost:44344/api/Customer/Add", {
      method: "POST",
      headers: {
        Accept: "application/JSON",
        "Content-Type": "application/JSON"
      },
      body: JSON.stringify({
        name: event.target.name.value,
        age: event.target.age.value,
        address: event.target.address.value,
        cityname: event.target.city.value,
        countryname: event.target.country.value
      })
    });

    this.setState({
      snackbarOpen: true,
      snackbarmsg: "Added Successfully"
    });
  }

  render() {
    return (
      <div className="container">
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.snackbarOpen}
          autoHideDuration={1500}
          onClose={this.snackbarClose}
          message={<span id="message-id">{this.state.snackbarmsg}</span>}
          action={[
            <IconButton
              key="close"
              arial-label="Close"
              color="inherit"
              onClick={this.snackbarClose}
            >
              x
            </IconButton>
          ]}
        />

        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Customer
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="name">
                    <Form.Label>CustomerName</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      required
                      placeholder="CustomerName"
                    />
                  </Form.Group>

                  <Form.Group controlId="age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      name="age"
                      required
                      placeholder="Age"
                    />
                  </Form.Group>

                  <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      required
                      placeholder="Address"
                    />
                  </Form.Group>

                  <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      required
                      placeholder="City Name"
                    />
                  </Form.Group>

                  <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      name="country"
                      required
                      placeholder="Country Name"
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Add Customer
                  </Button>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
