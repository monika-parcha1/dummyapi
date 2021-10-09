import React, { Component } from "react";
import Child from "./child";
import { connect } from "react-redux";

class Parent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentName: "Test",
      users: [],
      page: 1,
      hasMore : true
    };
  }

  componentDidMount() {
    this.fetchdata()
  }


  componentDidUpdate(pre,prevstate){
    if(prevstate.page !== this.state.page){
      if (this.state.users >= 12) {
        this.setState({ hasMore: false });
        return;
      }
      this.fetchdata()
    }
  }

  fetchdata = async()=>{
    const res = await fetch(
      `https://reqres.in/api/users?page=${this.state.page}`
    );
    const json = await res.json();
    const userData = [...this.state.users, ...json.data]
    this.setState({ users: userData,});
  }

  onScrollEnd = () => {
    this.setState({
      page : this.state.page + 1,
      hasMore : false
    });
  };

  changeName = (updatedName) => {
    this.setState({
      studentName: updatedName,
    });
  };

  render() {
    const { studentName, users } = this.state;
    const { number } = this.props;
    return (
      <>
        <p> update count of name is {number} </p>
        <Child
          studentName={studentName}
          changeName={this.changeName}
          users={users}
          onScrollEnd = {this.onScrollEnd}
          hasMore = {this.state.hasMore}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    number: state.number,
  };
};

export default connect(mapStateToProps)(Parent);
