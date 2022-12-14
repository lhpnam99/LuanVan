import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus, faPaperPlane} from "@fortawesome/free-solid-svg-icons";

import {IMG_URL} from "../../utils/constants/url";
import {fetchPerfume} from "../../actions/perfume-actions";
import {addToCart} from "../../actions/cart-actions";
import {addReviewToPerfume} from "../../actions/user-actions";

class Perfume extends Component {
    state = {
        author: "",
        message: ""
    };

    componentDidMount() {
        this.props.fetchPerfume(this.props.match.params.id);

        window.scrollTo(0, 0);
    }

    addToCart = () => {
        if (!localStorage.getItem("isLoggedIn")) {
            this.props.history.push("/login");
        } else {
            this.props.addToCart(this.props.perfume, this.props.history);
        }
    }

    addReview = (event) => {
        event.preventDefault();

        const bodyFormData = new FormData();
        bodyFormData.append("perfumeId", this.props.match.params.id);
        bodyFormData.append("author", this.state.author);
        bodyFormData.append("message", this.state.message);

        this.props.addReviewToPerfume(bodyFormData);
    };

    handleInputChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        const {author, message} = this.state;
        const {perfume, reviews} = this.props;
        const {authorError, messageError} = this.props.errors;

        return (
            <div className="container mt-5 pb-5">
                <div className="row">
                    <div className="col-md-5">
                        <div>
                            <img src={IMG_URL + `${perfume.filename}`} className="rounded mx-auto w-100"/>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <h2>{perfume.perfumeTitle}</h2>
                        <h3>{perfume.perfumer}</h3>
                        <p>M?? s???n ph???m: <span>{perfume.id}</span></p>
                        <p style={{color: "#54C0A1"}}>C??n b??n</p>
                        <div className="row ml-1">
                            <h6 className="mr-5"><span>{perfume.price}</span> vnd</h6>
                            <button type="submit"
                                    className="btn btn-success mx-3"
                                    onClick={this.addToCart}>
                                <FontAwesomeIcon className="mr-2 fa-lg" icon={faCartPlus}/> TH??M V??O GI???
                            </button>
                        </div>
                        <br/>
                        <table className="table">
                            <tbody>
                            <tr>
                                <td>T??n n?????c hoa:</td>
                                <td>{perfume.perfumeTitle}</td>
                            </tr>
                            <tr>
                                <td>Th????ng hi???u:</td>
                                <td>{perfume.perfumer}</td>
                            </tr>
                            <tr>
                                <td>Lo???i s???n ph???m:</td>
                                <td>{perfume.type}</td>
                            </tr>
                            <tr>
                                <td>N??m ph??t h??nh:</td>
                                <td>{perfume.year}</td>
                            </tr>
                            <tr>
                                <td>Dung t??ch:</td>
                                <td><span>{perfume.volume}</span> ml.</td>
                            </tr>
                            <tr>
                                <td>Xu???t x???:</td>
                                <td>{perfume.country}</td>
                            </tr>
                            <tr>
                                <td>Gi???i t??nh:</td>
                                <td>{perfume.perfumeGender}</td>
                            </tr>
                            <tr>
                                <td>N???t h????ng ?????u:</td>
                                <td>{perfume.fragranceTopNotes}</td>
                            </tr>
                            <tr>
                                <td>N???t h????ng gi???a:</td>
                                <td>{perfume.fragranceMiddleNotes}</td>
                            </tr>
                            <tr>
                                <td>N???t h????ng cu???i:</td>
                                <td>{perfume.fragranceBaseNotes}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mt-5">
                    <h3 className="text-center mb-5">GI???I THI???U S???N PH???M</h3>
                    {reviews.length === 0 ? <p className="text-center">Ch??a c?? gi???i thi???u n??o cho s???n ph???m n??y.</p> :
                        reviews.map((review) => {
                            return (
                                <div key={review.id}>
                                    <div className="form row mt-5">
                                        <div className="col-3">
                                            <p><b>{review.author}</b></p>
                                            <p>{review.date}</p>
                                        </div>
                                        <div className="col">
                                            <p>{review.message}</p>
                                        </div>
                                    </div>
                                    <hr/>
                                </div>
                            );
                        })
                    }
                    <form onSubmit={this.addReview}>
                        <div className="form-group border mt-5">
                            <div className="mx-3 my-3">
                                <label><span className="text-danger"><b>*</b></span> T??n c???a b???n</label>
                                <input
                                    type="text"
                                    className={authorError ? "form-control is-invalid" : "form-control"}
                                    name="author"
                                    value={author}
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{authorError}</div>
                                <label><span className="text-danger"><b>*</b></span> B??nh lu???n</label>
                                <textarea
                                    rows="4"
                                    className={messageError ? "form-control is-invalid" : "form-control"}
                                    name="message"
                                    value={message}
                                    style={{resize: "none"}}
                                    onChange={this.handleInputChange}/>
                                <div className="invalid-feedback">{messageError}</div>
                                <button type="submit" className="btn btn-dark mt-3">
                                    <FontAwesomeIcon className="mr-2" icon={faPaperPlane}/>G???i ????nh gi??
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

Perfume.propTypes = {
    fetchPerfume: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    perfume: PropTypes.object.isRequired,
    reviews: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    perfume: state.perfume.perfume,
    reviews: state.perfume.reviews,
    errors: state.user.errors
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPerfume: (id) => dispatch(fetchPerfume(id)),
        addToCart: (id, history) => dispatch(addToCart(id, history)),
        addReviewToPerfume: (data) => dispatch(addReviewToPerfume(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Perfume);
