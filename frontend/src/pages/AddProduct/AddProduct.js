import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import ToastShow from "../../component/Toasts/ToastShow";
import AccountNavbar from "../../component/AccountNavbar/AccountNavbar";
import {addPerfume, formReset} from "../../actions/admin-actions";

class AddProduct extends Component {
    initialState = {
        perfumeTitle: "",
        perfumer: "",
        year: "",
        country: "",
        type: "",
        volume: "",
        perfumeGender: "",
        fragranceTopNotes: "",
        fragranceMiddleNotes: "",
        fragranceBaseNotes: "",
        price: "",
        file: null
    };

    state = {
        ...this.initialState,
        showToast: false
    };

    componentDidMount() {
        this.props.formReset();
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        const {
            perfumeTitle, perfumer, year, country, type, volume, perfumeGender, fragranceTopNotes, fragranceMiddleNotes,
            fragranceBaseNotes, price, file
        } = this.state;

        const bodyFormData = new FormData();

        bodyFormData.append("file", file);
        bodyFormData.append("perfumeTitle", perfumeTitle);
        bodyFormData.append("perfumer", perfumer);
        bodyFormData.append("year", year);
        bodyFormData.append("country", country);
        bodyFormData.append("type", type);
        bodyFormData.append("volume", volume);
        bodyFormData.append("perfumeGender", perfumeGender);
        bodyFormData.append("fragranceTopNotes", fragranceTopNotes);
        bodyFormData.append("fragranceMiddleNotes", fragranceMiddleNotes);
        bodyFormData.append("fragranceBaseNotes", fragranceBaseNotes);
        bodyFormData.append("price", price);

        this.props.addPerfume(bodyFormData)
            .then(() => {
                if (this.props.success) {
                    this.setState({
                        ...this.initialState,
                        showToast: true
                    });
                    setTimeout(() => this.setState({showToast: false}), 5000);
                    window.scrollTo(0, 0);
                }
            });
    };

    handleFileChange = (event) => {
        this.setState({
            file: event.target.files[0]
        });
    };

    handleInputChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        const {
            perfumeTitle, perfumer, year, country, type, volume, perfumeGender, fragranceTopNotes, fragranceMiddleNotes,
            fragranceBaseNotes, price, showToast
        } = this.state;

        const {
            perfumeTitleError, perfumerError, yearError, countryError, typeError, volumeError,
            perfumeGenderError, fragranceTopNotesError, fragranceMiddleNotesError, fragranceBaseNotesError,
            priceError
        } = this.props.errors;

        return (
            <div>
                <AccountNavbar/>
                <div className="container" style={{"display": showToast ? "block" : "none"}}>
                    <ToastShow showToast={showToast} message={"Perfume successfully added!"}/>
                </div>
                <div className="container mt-5">
                    <h4><FontAwesomeIcon className="mr-2" icon={faPlusSquare}/>Thêm sản phẩm</h4>
                    <br/>
                    <form onSubmit={this.onFormSubmit}>
                        <div className="form row">
                            <div className="col">
                                <label>Tên nước hoa: </label>
                                <input
                                    type="text"
                                    className={perfumeTitleError ? "form-control is-invalid" : "form-control"}
                                    name="perfumeTitle"
                                    value={perfumeTitle}
                                    placeholder="Nhập tên nước hoa"
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{perfumeTitleError}</div>
                            </div>
                            <div className="col">
                                <label>Thương hiệu: </label>
                                <input
                                    type="text"
                                    className={perfumerError ? "form-control is-invalid" : "form-control"}
                                    name="perfumer"
                                    value={perfumer}
                                    placeholder="Nhập tên thương hiệu"
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{perfumerError}</div>
                            </div>
                        </div>
                        <div className="form row mt-3">
                            <div className="col">
                                <label>Năm phát hành: </label>
                                <input
                                    type="text"
                                    className={yearError ? "form-control is-invalid" : "form-control"}
                                    name="year"
                                    value={year}
                                    placeholder="Nhập năm phát hành"
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{yearError}</div>
                            </div>
                            <div className="col">
                                <label>Xuất xứ: </label>
                                <input
                                    type="text"
                                    className={countryError ? "form-control is-invalid" : "form-control"}
                                    name="country"
                                    value={country}
                                    placeholder="Nhập xuất xứ"
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{countryError}</div>
                            </div>
                        </div>
                        <div className="form row mt-3">
                            <div className="col">
                                <label>Loại nước hoa: </label>
                                <input
                                    type="text"
                                    className={typeError ? "form-control is-invalid" : "form-control"}
                                    name="type"
                                    value={type}
                                    placeholder="Nhập loại nước hoa"
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{typeError}</div>
                            </div>
                            <div className="col">
                                <label>Dung tích: </label>
                                <input
                                    type="text"
                                    className={volumeError ? "form-control is-invalid" : "form-control"}
                                    name="volume"
                                    value={volume}
                                    placeholder="Nhập dung tích"
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{volumeError}</div>
                            </div>
                        </div>
                        <div className="form row mt-3">
                            <div className="col">
                                <label>Giới tính: </label>
                                <input
                                    type="text"
                                    className={perfumeGenderError ? "form-control is-invalid" : "form-control"}
                                    name="perfumeGender"
                                    value={perfumeGender}
                                    placeholder="Nhập giới tính"
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{perfumeGenderError}</div>
                            </div>
                            <div className="col">
                                <label>Nốt hương đầu: </label>
                                <input
                                    type="text"
                                    className={fragranceTopNotesError ? "form-control is-invalid" : "form-control"}
                                    name="fragranceTopNotes"
                                    value={fragranceTopNotes}
                                    placeholder="Nhập nốt hương đầu"
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{fragranceTopNotesError}</div>
                            </div>
                        </div>
                        <div className="form row mt-3">
                            <div className="col">
                                <label>Nốt hương giữa: </label>
                                <input
                                    type="text"
                                    className={fragranceMiddleNotesError ? "form-control is-invalid" : "form-control"}
                                    name="fragranceMiddleNotes"
                                    value={fragranceMiddleNotes}
                                    placeholder="Nhập nốt hương giữa"
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{fragranceMiddleNotesError}</div>
                            </div>
                            <div className="col">
                                <label>Nốt hương cuối: </label>
                                <input
                                    type="text"
                                    className={fragranceBaseNotesError ? "form-control is-invalid" : "form-control"}
                                    name="fragranceBaseNotes"
                                    value={fragranceBaseNotes}
                                    placeholder="Nhập nốt hương cuối"
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{fragranceBaseNotesError}</div>
                            </div>
                        </div>
                        <div className="form row mt-3">
                            <div className="col">
                                <label>Giá: </label>
                                <input
                                    type="text"
                                    className={priceError ? "form-control is-invalid" : "form-control"}
                                    name="price"
                                    value={price}
                                    placeholder="Nhập giá"
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{priceError}</div>
                            </div>
                            <div className="col" style={{marginTop: "35px"}}>
                                <input type="file"
                                       name="file"
                                       onChange={this.handleFileChange}/>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-dark mt-3">
                            <FontAwesomeIcon className="mr-2" icon={faPlusSquare}/>Thêm
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

AddProduct.propTypes = {
    addPerfume: PropTypes.func.isRequired,
    formReset: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    success: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    errors: state.admin.errors,
    success: state.admin.success,
});

export default connect(mapStateToProps, {addPerfume, formReset})(AddProduct);
