import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import { AddCustomer } from "./AddCustomer";
import { EditCustomer } from "./EditCustomer";
const Api_Key = "663f670dd8fbc561e29b49e05624dfe3";

export class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: [],
      currentWeather: [],
      addModalShow: false,
      editModalShow: false,
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: ""
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  getWeather = async (city, country, id, name, age, address) => {
    if (city && country) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`
      );
      const response = await api_call.json();
      console.log(response);
      this.setState({
        city: `${response.name},${response.sys.country}`,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        editModalShow: true,
        customerid: id,
        customername: name,
        customerage: age,
        customeraddress: address,
        customercity: city,
        customercountry: country
      });
    }
  };

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  refreshList() {
    fetch("https://localhost:44344/api/Customer")
      .then(response => response.json())
      .then(data => {
        this.setState({ customer: data });
      });
  }

  deleteCustomer = customerId => () => {
    if (window.confirm("Are you sure?")) {
      fetch("https://localhost:44344/api/Customer/Del/" + customerId, {
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
      customeraddress,
      customercity,
      customercountry
    } = this.state;
    const addModalClose = () => this.setState({ addModalShow: false });
    const editModalClose = () => this.setState({ editModalShow: false });
    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>CustomerID</th>
              <th>CustomerName</th>
              <th>AGE</th>
              <th>ADDRESS</th>
              <th>CITY</th>
              <th>COUNTRY</th>
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
                <td className="cityName">{customers.cityName}</td>
                <td className="countryName">{customers.countryName}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="info"
                      value={customers.cityName}
                      onClick={() =>
                        this.getWeather(
                          customers.cityName,
                          customers.countryName,
                          customers.id,
                          customers.name,
                          customers.age,
                          customers.address
                        )
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      className="mr-2"
                      variant="danger"
                      onClick={this.deleteCustomer(customers.id)}
                    >
                      Delete
                    </Button>

                    <EditCustomer
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      customerid={customerid}
                      customername={customername}
                      customerage={customerage}
                      customeraddress={customeraddress}
                      customercity={customercity}
                      customercountry={customercountry}
                      celsius={this.state.celsius}
                      temp_max={this.state.temp_max}
                      temp_min={this.state.temp_min}
                      description={this.state.description}
                    />
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>
          <Button
            className="mr-2"
            variant="danger"
            onClick={() => this.setState({ addModalShow: true })}
          >
            Add Customer
          </Button>
          <AddCustomer show={this.state.addModalShow} onHide={addModalClose} />
        </div>
      </div>
    );
  }
}
