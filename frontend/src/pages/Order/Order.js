import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faShoppingBag} from "@fortawesome/free-solid-svg-icons";

import {IMG_URL} from "../../utils/constants/url";
import {fetchOrder, addOrder} from "../../actions/order-actions";
import {validateEmail} from "../../utils/input-validators";

class Order extends Component {
    state = {
        firstName: "",
        lastName: "",
        city: "",
        address: "",
        postIndex: "",
        phoneNumber: "",
        email: "",
        validateEmailError: ""
    };

    componentDidMount() {
        this.props.fetchOrder();
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        let totalPrice = 0;
        this.props.perfumes.map((perfume) => totalPrice = totalPrice + perfume.price);

        const perfumeList = this.props.perfumes;
        const {firstName, lastName, city, address, postIndex, phoneNumber, email} = this.state;
        const validateEmailError = validateEmail(email);

        if (validateEmailError) {
            this.setState({
                validateEmailError
            });
        } else {
            const order = {firstName, lastName, city, address, postIndex, phoneNumber, email, perfumeList, totalPrice};

            this.props.addOrder(order, this.props.history);
        }
    };

    handleInputChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        const {perfumes} = this.props;
        const {firstName, lastName, city, address, postIndex, phoneNumber, email, validateEmailError} = this.state;
        const {firstNameError, lastNameError, cityError, addressError, postIndexError, phoneNumberError, emailError} = this.props.errors;

        let totalPrice = 0;
        perfumes.map((perfume) => totalPrice = totalPrice + perfume.price);

        return (
            <div className="container mt-5 pb-5">
                <h4 className="mb-4 text-center">
                    <FontAwesomeIcon className="mr-2" icon={faShoppingBag}/> ?????t h??ng
                </h4>
                <br/>
                <form onSubmit={this.onFormSubmit}>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">T??n:</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className={firstNameError ? "form-control is-invalid" : "form-control"}
                                        name="firstName"
                                        value={firstName}
                                        placeholder="Nh???p t??n c???a b???n"
                                        onChange={this.handleInputChange}/>
                                    <div className="invalid-feedback">{firstNameError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">H???:</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className={lastNameError ? "form-control is-invalid" : "form-control"}
                                        name="lastName"
                                        value={lastName}
                                        placeholder="Nh???p h??? c???a b???n"
                                        onChange={this.handleInputChange}/>
                                    <div className="invalid-feedback">{lastNameError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">T???nh/Th??nh ph???:</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className={cityError ? "form-control is-invalid" : "form-control"}
                                        name="city"
                                        value={city}
                                        placeholder="Nh???p t???nh/th??nh ph???"
                                        onChange={this.handleInputChange}/>
                                    <div className="invalid-feedback">{cityError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">?????a ch???:</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className={addressError ? "form-control is-invalid" : "form-control"}
                                        name="address"
                                        value={address}
                                        placeholder="Nh???p ?????a ch???"
                                        onChange={this.handleInputChange}/>
                                    <div className="invalid-feedback">{addressError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">M?? b??u ch??nh:</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className={postIndexError ? "form-control is-invalid" : "form-control"}
                                        name="postIndex"
                                        value={postIndex}
                                        placeholder="Nh???p m?? b??u ch??nh"
                                        onChange={this.handleInputChange}/>
                                    <div className="invalid-feedback">{postIndexError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">S??? ??i???n tho???i:</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className={phoneNumberError ? "form-control is-invalid" : "form-control"}
                                        name="phoneNumber"
                                        value={phoneNumber}
                                        placeholder="____-___-___"
                                        onChange={this.handleInputChange}/>
                                    <div className="invalid-feedback">{phoneNumberError}</div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Email:</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        className={emailError || validateEmailError ? "form-control is-invalid" : "form-control"}
                                        name="email"
                                        value={email}
                                        placeholder="example@gmail.com"
                                        onChange={this.handleInputChange}/>
                                    <div className="invalid-feedback">{emailError || validateEmailError}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="container-fluid">
                                <div className="row">
                                    {perfumes.map((perfume) => {
                                        return (
                                            <div key={perfume.id} className="col-lg-6 d-flex align-items-stretch">
                                                <div className="card mb-5">
                                                    <img src={IMG_URL + `${perfume.filename}`}
                                                         className="rounded mx-auto w-50"/>
                                                    <div className="card-body text-center">
                                                        <h5>{perfume.perfumeTitle}</h5>
                                                        <h6>{perfume.perfumer}</h6>
                                                        <h6><span>{perfume.price}</span> vnd</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg btn-success px-5 float-right">
                                <FontAwesomeIcon icon={faCheckCircle}/> Thanh to??n
                            </button>
                            <div className="row">
                                <h4>Th??nh ti???n: <span>{totalPrice}</span> vnd</h4>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

Order.propTypes = {
    fetchOrder: PropTypes.func.isRequired,
    addOrder: PropTypes.func.isRequired,
    perfumes: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    perfumes: state.order.perfumes,
    errors: state.order.errors
});

export default connect(mapStateToProps, {fetchOrder, addOrder})(Order);
