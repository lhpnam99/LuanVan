import React from 'react';
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Contacts() {
    return (
        <div className="container mt-5">
            <h4><FontAwesomeIcon className="ml-2 mr-2" icon={faInfoCircle}/>Giới thiệu</h4>
            <br/>
            <p><b>Số điện thoại:</b> 0913 300 269<br/>
                <b>E-mail:</b> namb1704836@student.ctu.edu.vn</p>
            <br/>
            <h6>Giờ làm việc</h6>
            <p>Cửa hàng bán 8:00 đến 20:00 thứ 2 - thứ 7 hằng tuần. <br/>
                Nhận đặt hàng online 24/7.</p>
            <br/>
            <h6>Giao hàng</h6>
            <p>Sản phẩm sẽ đến với quý khách nhanh chóng bởi chúng tôi sử dụng dịch vụ chuyển phát nhanh.</p>
        </div>
    )
}

export default Contacts