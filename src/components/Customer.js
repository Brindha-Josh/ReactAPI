import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import { AddCustModal } from "./AddCustModal";
import { EditCustModal } from "./EditCustModal";
import { BrowserRouter as Router } from "react-router-dom";
import { FbAuth } from "./FbAuth";

export class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = { customer: [], addModalShow: false, editModalShow: false };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList() {
    fetch("https://localhost:44344/api/Customer")
      .then(response => response.json())
      .then(data => {
        this.setState({ customer: data });
      });
  }
  deletecus = customerid => () => {
    if (window.confirm("Are you sure?")) {
      fetch("https://localhost:44344/api/Customer/Del/" + customerid, {
        method: "DELETE",
        headers: {
          Accept: "application/JSON",
          "Content-Type": "application/JSON"
        }
      });
    }
  };

  componentDidUpdate() {
    this.refreshList();
  }

  render() {
    const {
      customer,
      customerid,
      customername,
      customerage,
      customeraddress
    } = this.state;
    const addModalClose = () => this.setState({ addModalShow: false });
    const editModalClose = () => this.setState({ editModalShow: false });
    return (
      <Router>
        <div>
          <Table className="mt-4" striped bordered hover size="sm">
            <thead>
              <tr>
                <th>CustomerID</th>
                <th>CustomerName</th>
                <th>AGE</th>
                <th>ADDRESS</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {customer.map(customers => (
                <tr key={customers.id}>
                  <td>{customers.id}</td>
                  <td>{customers.name}</td>
                  <td>{customers.age}</td>
                  <td>{customers.address}</td>
                  <td>
                    <ButtonToolbar>
                      <Button
                        className="mr-2"
                        variant="info"
                        onClick={() =>
                          this.setState({
                            editModalShow: true,
                            customerid: customers.id,
                            customername: customers.name,
                            customerage: customers.age,
                            customeraddress: customers.address
                          })
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        className="mr-2"
                        variant="danger"
                        onClick={this.deletecus(customers.id)}
                      >
                        Delete
                      </Button>
                      <EditCustModal
                        show={this.state.editModalShow}
                        onHide={editModalClose}
                        cusid={customerid}
                        cusname={customername}
                        cusage={customerage}
                        cusaddress={customeraddress}
                      />
                    </ButtonToolbar>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div>
            <Link to="/FbAuth" className="btn btn-primary">
              Add Customer
            </Link>
            <AddCustModal
              show={this.state.addModalShow}
              onHide={addModalClose}
            />
            <Route path="/FbAuth" component={FbAuth} exact={true} />
          </div>
        </div>
      </Router>
    );
  }
}
