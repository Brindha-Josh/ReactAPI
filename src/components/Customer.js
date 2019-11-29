import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import { AddCustModal } from "./AddCustModal";
import { EditCustModal } from "./EditCustModal";
export class Customer extends Component {
  constructor(props) {
    super(props);
    // this.setState({ cust: data });
    this.state = { cust: [], addModalShow: false, editModalShow: false };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList() {
    fetch("https://localhost:44344/api/Customer1")
      .then(response => response.json())
      .then(data => {
        this.setState({ cust: data });
      });
  }
  deletecust(cusid) {
    if (window.confirm("Are you sure?")) {
      fetch("https://localhost:44344/api/Customer1/Del/" + cusid, {
        method: "DELETE",
        headers: {
          Accept: "application/JSON",
          "Content-Type": "application/JSON"
        }
      });
    }
  }
  componentDidUpdate() {
    this.refreshList();
  }
  render() {
    const { cust, cusid, cusname, cusage, cusaddress } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
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
            {cust.map(cus => (
              <tr key={cus.id}>
                <td>{cus.id}</td>
                <td>{cus.name}</td>
                <td>{cus.age}</td>
                <td>{cus.address}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="info"
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          cusid: cus.id,
                          cusname: cus.name,
                          cusage: cus.age,
                          cusaddress: cus.address
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      className="mr-2"
                      variant="danger"
                      onClick={() => this.deletecust(cus.id)}
                    >
                      Delete
                    </Button>
                    <EditCustModal
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      cusid={cusid}
                      cusname={cusname}
                      cusage={cusage}
                      cusaddress={cusaddress}
                    />
                    <EditCustModal
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      cusid={cusid}
                      cusname={cusname}
                      cusage={cusage}
                      cusaddress={cusaddress}
                    />
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ButtonToolbar>
          <Button
            variant="primary"
            onClick={() => this.setState({ addModalShow: true })}
          >
            Add Customer
          </Button>
          <AddCustModal show={this.state.addModalShow} onHide={addModalClose} />
        </ButtonToolbar>
      </div>
    );
  }
}
