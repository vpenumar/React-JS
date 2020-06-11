import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      salaryInfo: [],
      salaryTypeName: '',
      fixedSalary: '',
      incentive: '',
      minOrders: '',

      employeeInfo: [],
      employeeName: '',
      employeeOrdersDone: '',
      employeeSalaryType: 'No Salary Type'
    }
  }
  submitEmployeeForm(e) {
    e.preventDefault()
    let { employeeName, employeeOrdersDone, employeeSalaryType, employeeInfo, salaryInfo } = this.state
    if(employeeSalaryType === "No Salary Type") {
      return console.log("Select a valid salary type");
    }
    let fixedSalary
    let incentive
    let minOrders
    for (let data of salaryInfo) {
      if (data.salaryTypeName === employeeSalaryType) {
        fixedSalary = data.fixedSalary
        console.log(fixedSalary);
        incentive = data.incentive
        minOrders = data.minOrders
        break
      }
    }
    fixedSalary = parseInt(fixedSalary)
    console.log(fixedSalary);
    employeeOrdersDone = parseInt(employeeOrdersDone)
    incentive = parseInt(incentive)
    minOrders = parseInt(minOrders)
    const todaysSal = parseInt(fixedSalary / 30)
    let incentiveToGive = 0
    if (minOrders < employeeOrdersDone) {
      const diff = employeeOrdersDone - minOrders
      incentiveToGive = diff
    }
    const total = todaysSal + incentiveToGive

    const employeeInfoObj = {
      employeeName,
      employeeSalaryType,
      incentiveToGive,
      employeeOrdersDone,
      total
    }
    console.log(todaysSal);
    console.log(incentiveToGive);
    console.log(employeeInfoObj);

    employeeInfo.push(employeeInfoObj)
    this.setState({
      employeeInfo
    })
  }
  submitForm(e) {
    e.preventDefault()
    const { salaryTypeName, fixedSalary, incentive, minOrders, salaryInfo } = this.state
    //creating object
    const salaryInfoObj = {
      salaryTypeName,
      fixedSalary,
      incentive,
      minOrders
    }
    // adding the object in array
    salaryInfo.push(salaryInfoObj)
    this.setState({
      salaryInfo
    })
    console.log(salaryInfo);
    e.target.reset()
  }
  textChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  renderTable1() {
    const salaryInfo = this.state.salaryInfo;
    const data = salaryInfo.map((d, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{d.salaryTypeName}</td>
          <td>{d.fixedSalary}</td>
          <td>{d.incentive}</td>
          <td>{d.minOrders}</td>
        </tr>
      )
    })
    return data;
  }
  renderTable2() {
    const employeeInfo = this.state.employeeInfo;
    const data = employeeInfo.map((d, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{d.employeeName}</td>
          <td>{d.employeeOrdersDone}</td>
          <td>{d.incentiveToGive}</td>
          <td>{d.total}</td>
        </tr>
      )
    })
    return data;
  }
  renderSalaryType() {
    const salaryInfo = this.state.salaryInfo;
    const data = salaryInfo.map((d, i) => {
      return (
        <option value={d.salaryTypeName} key={i}>
          {d.salaryTypeName}
        </option>
      )
    })
    return data;
  }
  render() {
    return (
      <div className="container" >
        <div className="row">
          <div className="col-sm-6">
            <h2> Salary Info</h2>
            <form onSubmit={this.submitForm.bind(this)}>
              <MyInput name="salaryTypeName" placeholder="Enter Salary Type Name" value={this.state.salaryTypeName} title="Salary Type Name" change={this.textChange.bind(this)} />
              <MyInput name="fixedSalary" placeholder="Enter Fixed Salary" value={this.state.fixedSalary} title="Fixed Salary" change={this.textChange.bind(this)} />
              <MyInput name="incentive" placeholder="Enter Incentive" value={this.state.incentive} title="Incentive" change={this.textChange.bind(this)} />
              <MyInput name="minOrders" placeholder=" Enter Min Orders" value={this.state.minOrders} title="Min Orders" change={this.textChange.bind(this)} />
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Salary Type Name</th>
                  <th>Fixed Salary</th>
                  <th>Incentive</th>
                  <th>Min Orders</th>
                </tr>
              </thead>
              <tbody>
                {this.renderTable1()}
              </tbody>
            </table>
          </div>
          <div className="col-sm-6">
            <h2>Employee Info</h2>
            <form onSubmit={this.submitEmployeeForm.bind(this)}>
              <MyInput name="employeeName" placeholder="Enter Employee Name" value={this.state.employeeName} title="Employee Name" change={this.textChange.bind(this)} />
              <MyInput name="employeeOrdersDone" placeholder="Enter Employee Orders Done" value={this.state.employeeOrdersDone} title="Employee Orders Done" change={this.textChange.bind(this)} />
              <select name="employeeSalaryType" className="form-control" value={this.state.employeeSalaryType} onChange={this.textChange.bind(this)}>
                <option>No Salary Type</option>
                {this.renderSalaryType()}
              </select>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Employee Name</th>
                  <th>Orders Done</th>
                  <th>Incentive</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {this.renderTable2()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const MyInput = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.title}</label>
      <input required type="text" className="form-control" placeholder={props.placeholder} id={props.name} name={props.name} value={props.theValue} onChange={props.change} />
    </div>
  )
}

export default App;
