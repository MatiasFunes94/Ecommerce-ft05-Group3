import {
  Card,
  Form,
  Button,
  Row,
  Col,
  Container,
  Modal,
  Alert,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { IconContext } from "react-icons";
import { BiShowAlt, BiHide } from "react-icons/bi";
import { Link, Redirect } from "react-router-dom";

/*-------------redux-------------*/
import { getAllUsers, loginUser } from "../../actions/userAction";
import { clearErrors } from "../../actions/errorActions";

class UserLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordShowing: false, //para el boton que muestra o esconde la password
      loading: false, //despues que das click en el boto ncrear cuenta se cambia a loading
      modal: false,
      email: "",
      password: "",
    };
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //check for inexistent email REVISAR!
      if (error.id === "LOGIN_FAIL") {
        let errorMsgs = [];
        error.msg.errors.map((ele) => errorMsgs.push(ele));
        this.setState({ msg: errorMsgs });
      } else {
        this.setState({ msg: null });
      }
    }
    if (isAuthenticated) {
      if (this.state.modal) {
        this.handleClose();
      }
    }
    // y siempre que se cambia el estado email
  }

  switchPassword = () => {
    //para mostrar o esconder el password
    this.setState({
      ...this.state,
      passwordShowing: !this.state.passwordShowing,
    });
  };

  handleClose = () => {
    if(this.props.state.modal){
      this.props.state.modal=false
    }
    this.props.clearErrors();
    this.setState({
      modal: false,
    });
  };

  handleShow = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log('que props existenen login',this.props.state)
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const user = { email, password };
    this.props.loginUser(user);
  };

  render() {
    return (
      <React.Fragment>
        <Button className="button-register" onClick={this.handleShow}>
          Sign in
        </Button>

        <Modal
          show={this.props.state.modal? this.props.state.modal : this.state.modal}
          onHide={this.handleClose}
          backdrop="true"
          keyboard={true}
        >
          <Modal.Header style={{ backgroundColor: "#8a2be2", color: "white" }}>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.msg &&
              this.state.msg.map((ele, id) => (
                <Alert key={id} variant="danger">
                  {ele}
                </Alert>
              ))}
            <Form>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  // onChange={onChangeEmail}
                  // ref={register()}
                  autoComplete="off"
                  name="email"
                  onChange={this.onChange /* , this.props.getAllUsers() */}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <IconContext.Provider
                  value={
                    this.state.passwordShowing
                      ? { className: "icon-change" }
                      : { className: "icon" }
                  }
                >
                  <Form.Label>
                    <span
                      style={{
                        marginRight: "0.125rem",
                      }}
                    >
                      Password
                    </span>{" "}
                    {this.state.passwordShowing ? (
                      <BiHide
                        type="button"
                        onClick={() => this.switchPassword()}
                        title="Hide Password"
                      />
                    ) : (
                      <BiShowAlt
                        type="button"
                        onClick={() => this.switchPassword()}
                        title="Show Password"
                      />
                    )}
                  </Form.Label>
                </IconContext.Provider>
                <Form.Control
                  // onChange={onChangePassword}
                  // ref={register()}
                  autoComplete="off"
                  name="password"
                  onChange={this.onChange}
                  type={this.state.passwordShowing ? "text" : "password"}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="d-flex justify-content-end">
                  
                   <a href= "/user/password/reset" className="mr-3 mt-2"> Forgot your password? </a>
                
                <Button
                  disabled={this.state.loading}
                  type="submit"
                  onClick={this.onSubmit}
                  className="button-register mt-1"
                  style={{ width: "5rem" }}
                >
                  {this.state.loading ? "Loading..." : "Sign In"}
                </Button>
                
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn"
              style={{ backgroundColor: "#8a2be2", color: "white" }}
              onClick={this.handleClose}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allUsers: state.userReducer.allUsers,
    error: state.error,
    isAuthenticated: state.userReducer.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => dispatch(loginUser(user)),
    clearErrors: () => dispatch(clearErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
