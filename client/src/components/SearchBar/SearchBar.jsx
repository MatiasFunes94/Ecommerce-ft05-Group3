import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "./SearchBar.css";
import { connect } from 'react-redux';
import Register from '../Users/userRegister';

/*-------------redux-------------*/
import { getProductsFromSearch } from '../../actions/catalogoActions';

function SearchBar(props) {

  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value)
    handleOnSubmit(e)
    if (e.target.value.length === 1) {
      setSearch("")
      return props.getProductsFromSearch(e.target.value)
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault()
    props.getProductsFromSearch(search);
  }

  return (
    <div className="navigation">
      <Link to="/user/catalogo">
      <div className="mt-3 brand">
          <img className="image-brand" src={"/images/brand4.png"} alt="logo"></img>
      </div>
      </Link>
      <div className="mt-4">
        <Form className="d-flex">
          <input
            className="search mr-2 mt-3"
            name="search"
            type="text"
            placeholder="Search Product"
            onChange={handleChange}
          ></input>
          <button
            className="button-search-bar mt-3"
            type="submit"
            variant="outline-primary"
            onClick={handleOnSubmit}
          >
            Search
          </button>
          
        </Form>
        <Link to="/user/carrito">     
        <button> AL CARRITO </button>
        </Link>
      </div>
      {/* {props.user ?
      <div className="mt-5 login-message">{`Welcome ${props.user.name} !`}</div>
      :
      <div className="sign mt-5 d-flex">
      <button className="mr-2 button-search-bar">Sign In</button>
      <div className="sign-up-button"><Register /></div>
      </div>
      } */}
      {/* <div>
      <Link to ="/admin">
        <button className="button mr-3">Admin</button>
        </Link>
        <Link to="/">
        <button className="button mr-5 mt-3 sign-up">Sign out</button>
        </Link>   
      </div> */}

      <div className="sign mt-5 d-flex">
      <button className="mr-2 button-search-bar">Sign In</button>
      <div className="sign-up-button"><Register /></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    productsFromSearch: state.catalogo.productsFromSearch,
    user: state.userReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProductsFromSearch: (search) => dispatch(getProductsFromSearch(search)),
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(SearchBar)