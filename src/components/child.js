import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "react-perfect-scrollbar/dist/css/styles.css";
import InfiniteScroll from "react-infinite-scroll-component";

const Child = (props) => {
  const {
    studentName,
    changeName,
    changeNameCounter,
    users,
    onScrollEnd,
    hasMore,
  } = props;
  const [value, setValue] = useState();

  return (
    <>
      <h2> {studentName} </h2>
      <input
        type="text"
        value={value}
        placeholder="enter new name"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button
        onClick={() => {
          if(value){
            changeName(value || studentName);
            setValue("");
            changeNameCounter();
          }
          
        }}
      >
        Update Name{" "}
      </button>

      <h1 className="flex">Fetched Users</h1>
      <InfiniteScroll
        dataLength={users.length}
        next={onScrollEnd}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div className="userDiv">
          {users &&
            users.length > 0 &&
            users.map((user, index) => {
              return (
                <div key={user.id}>
                  <p>{user.first_name}</p>
                  <p>{user.email}</p>
                  <img key={user.avatar} src={user.avatar} />
                </div>
              );
            })}
        </div>
      </InfiniteScroll>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeNameCounter: () => dispatch({ type: "ADD_ONE" }),
});

export default connect(null, mapDispatchToProps)(Child);
