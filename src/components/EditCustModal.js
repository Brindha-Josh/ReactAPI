import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import Snackbar from "@material-ui/core/SnackBar";
import IconButton from "@material-ui/core/IconButton";
export class EditCustModal extends Component {
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
    fetch("https://localhost:44344/api/Customer/Edit/" + this.props.cusid, {
      method: "PUT",
      headers: {
        Accept: "application/JSON",
        "Content-Type": "application/JSON"
      },
      body: JSON.stringify({
        id: event.target.cusid.value,
        name: event.target.cusname.value,
        age: event.target.cusage.value,
        address: event.target.cusaddress.value
      })
    });

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
                  <Form.Group controlId="cusid">
                    <Form.Label>CustomerID</Form.Label>
                    <Form.Control
                      type="number"
                      name="cusid"
                      disabled
                      defaultValue={this.props.cusid}
                      placeholder="CustomerID"
                    />
                  </Form.Group>
                  <Form.Group controlId="cusname">
                    <Form.Label>CustomerName</Form.Label>
                    <Form.Control
                      type="text"
                      name="cusname"
                      required
                      defaultValue={this.props.cusname}
                      placeholder="CustomerName"
                    />
                  </Form.Group>
                  <Form.Group controlId="cusage">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      name="cusage"
                      required
                      defaultValue={this.props.cusage}
                      placeholder="Age"
                    />
                  </Form.Group>
                  <Form.Group controlId="cusaddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="cusaddress"
                      required
                      defaultValue={this.props.cusaddress}
                      placeholder="Address"
                    />
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
