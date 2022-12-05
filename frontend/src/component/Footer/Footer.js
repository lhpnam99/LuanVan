import React from 'react';

import "./Footer.css";

const Footer = () => {
    return (
        <footer className="page-footer p-5 bg-black text-white">
            <div className="container">
                <div className="d-flex justify-content-between">
                    <div className="footer-left">
                        <h3>Phương Nam Perfume</h3>
                        <p>0913 300 269</p>
                        <br/>
                        <p>Cửa hàng bán 8:00 đến 20:00 thứ 2 - thứ 7 hằng tuần</p>
                    </div>
                    <div className="footer-right">
                        <h3>Liên hệ</h3>
                        <a href="https://www.linkedin.com/in/lhpnam99/">
                            <i className="fab fa-linkedin fa-2x mr-3" style={{color: "white"}}></i>
                        </a>
                        <a href="https://www.facebook.com/lhpn99/"><i className="fab fa-facebook-f fa-2x mr-3" style={{color: "white"}}></i></a>
                        <a href="https://twitter.com/LNam65452643"><i className="fab fa-twitter fa-2x mr-3" style={{color: "white"}}></i></a>
                    </div>
                </div>
                <div className="mx-auto" style={{width: "200px"}}>
                    <p>© Copy right 2022</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer