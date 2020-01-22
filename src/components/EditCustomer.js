import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import "weather-icons/css/weather-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Snackbar from "@material-ui/core/SnackBar";
import IconButton from "@material-ui/core/IconButton";

export class EditCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: [],
      currentWeather: [],
      weather: [],
      snackbarOpen: false,
      snackbarmsg: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  snackbarClose = event => {
    this.setState({ snackbarOpen: false });
  };

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(
      "https://localhost:44344/api/Customer/Edit/" + this.props.customerid,
      {
        method: "PUT",
        headers: {
          Accept: "application/JSON",
          "Content-Type": "application/JSON"
        },
        body: JSON.stringify({
          id: event.target.customerid.value,
          name: event.target.customername.value,
          age: event.target.customerage.value,
          address: event.target.customeraddress.value,
          cityname: event.target.customercity.value,
          countryname: event.target.customercountry.value
        })
      }
    );

    this.setState({
      snackbarOpen: true,
      snackbarmsg: "Updated Successfully"
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
              Edit Customer
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="customerid">
                    <Form.Label>CustomerID</Form.Label>
                    <Form.Control
                      type="number"
                      name="customerid"
                      disabled
                      defaultValue={this.props.customerid}
                      placeholder="CustomerID"
                    />
                  </Form.Group>

                  <Form.Group controlId="customername">
                    <Form.Label>CustomerName</Form.Label>
                    <Form.Control
                      type="text"
                      name="customername"
                      required
                      defaultValue={this.props.customername}
                      placeholder="CustomerName"
                    />
                  </Form.Group>

                  <Form.Group controlId="customerage">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      name="customerage"
                      required
                      defaultValue={this.props.customerage}
                      placeholder="Age"
                    />
                  </Form.Group>

                  <Form.Group controlId="customeraddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="customeraddress"
                      required
                      defaultValue={this.props.customeraddress}
                      placeholder="Address"
                    />
                  </Form.Group>

                  <Form.Group controlId="customercity">
                    <Form.Label>City Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="customercity"
                      required
                      defaultValue={this.props.customercity}
                      placeholder="City"
                    />
                  </Form.Group>

                  <Form.Group controlId="customercountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      name="customercountry"
                      required
                      defaultValue={this.props.customercountry}
                      placeholder="Country"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Current Weather</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="5"
                      name="celsius"
                      disabled
                      value={
                        "Temperature :" +
                        this.props.celsius +
                        "deg celsius" +
                        " " +
                        "\n" +
                        "Description :" +
                        this.props.description +
                        "\n" +
                        "Maximum Temperature :" +
                        this.props.temp_max +
                        "deg celsius" +
                        " " +
                        "\n" +
                        "Minimum Temperature :" +
                        this.props.temp_min +
                        "deg celsius" +
                        " " +
                        "\n"
                      }
                    ></Form.Control>
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Edit Customer
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
