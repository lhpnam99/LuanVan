import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";

import AccountNavbar from "../../component/AccountNavbar/AccountNavbar";
import {IMG_URL} from "../../utils/constants/url";
import {updatePerfume, formReset} from "../../actions/admin-actions";
import {fetchPerfume} from "../../actions/perfume-actions";

class EditPerfume extends Component {
    state = {
        id: "",
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
        filename: "",
        file: null
    };

    componentDidMount() {
        this.props.fetchPerfume(this.props.match.params.id);
        this.props.formReset();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            ...nextProps.perfume
        });
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        const {
            id, perfumeTitle, perfumer, year, country, type, volume, perfumeGender, fragranceTopNotes, fragranceMiddleNotes,
            fragranceBaseNotes, price, file
        } = this.state;

        const bodyFormData = new FormData();

        bodyFormData.append("file", file);
        bodyFormData.append("id", id);
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

        this.props.updatePerfume(bodyFormData, this.props.history);
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
            fragranceBaseNotes, price, filename
        } = this.state;

        const {
            perfumeTitleError, perfumerError, yearError, countryError, typeError, volumeError,
            perfumeGenderError, fragranceTopNotesError, fragranceMiddleNotesError, fragranceBaseNotesError,
            priceError
        } = this.props.errors;

        return (
            <div>
                <AccountNavbar/>
                <div className="container mt-5">
                    <h4><FontAwesomeIcon className="mr-2" icon={faEdit}/>Chỉnh sửa sản phẩm</h4>
                    <form onSubmit={this.onFormSubmit}>
                        <div className="col-md-5 mb-5 mt-5">
                            <img src={IMG_URL + `${filename}`}
                                 className="rounded mx-auto w-100 mb-2"/>
                            <input type="file" name="file" onChange={this.handleFileChange}/>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Tên nước hoa: </label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className={perfumeTitleError ? "form-control is-invalid" : "form-control"}
                                    name="perfumeTitle"
                                    value={perfumeTitle}
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{perfumeTitleError}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Thương hiệu: </label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className={perfumerError ? "form-control is-invalid" : "form-control"}
                                    name="perfumer"
                                    value={perfumer}
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{perfumerError}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Năm phát hành: </label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className={yearError ? "form-control is-invalid" : "form-control"}
                                    name="year"
                                    value={year}
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{yearError}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Xuất xứ: </label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className={countryError ? "form-control is-invalid" : "form-control"}
                                    name="country"
                                    value={country}
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{countryError}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Loại sản phẩm: </label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className={typeError ? "form-control is-invalid" : "form-control"}
                                    name="type"
                                    value={type}
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{typeError}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Dung tích: </label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className={volumeError ? "form-control is-invalid" : "form-control"}
                                    name="volume"
                                    value={volume}
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{volumeError}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Giới tính: </label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className={perfumeGenderError ? "form-control is-invalid" : "form-control"}
                                    name="perfumeGender"
                                    value={perfumeGender}
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{perfumeGenderError}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Nốt hương đầu: </label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className={fragranceTopNotesError ? "form-control is-invalid" : "form-control"}
                                    name="fragranceTopNotes"
                                    value={fragranceTopNotes}
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{fragranceTopNotesError}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Nốt hương giữa: </label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className={fragranceMiddleNotesError ? "form-control is-invalid" : "form-control"}
                                    name="fragranceMiddleNotes"
                                    value={fragranceMiddleNotes}
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{fragranceMiddleNotesError}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Nốt hương cuối: </label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className={fragranceBaseNotesError ? "form-control is-invalid" : "form-control"}
                                    name="fragranceBaseNotes"
                                    value={fragranceBaseNotes}
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{fragranceBaseNotesError}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Giá: </label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className={priceError ? "form-control is-invalid" : "form-control"}
                                    name="price"
                                    value={price}
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{priceError}</div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-dark">
                            <FontAwesomeIcon className="mr-2" icon={faEdit}/>Chỉnh sửa
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

EditPerfume.propTypes = {
    updatePerfume: PropTypes.func.isRequired,
    fetchPerfume: PropTypes.func.isRequired,
    formReset: PropTypes.func.isRequired,
    admin: PropTypes.object.isRequired,
    perfume: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    errors: state.admin.errors,
    perfume: state.perfume.perfume
});

const mapDispatchToProps = (dispatch) => {
    return {
        updatePerfume: (data, history) => dispatch(updatePerfume(data, history)),
        fetchPerfume: (id) => dispatch(fetchPerfume(id)),
        formReset: () => dispatch(formReset())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPerfume);