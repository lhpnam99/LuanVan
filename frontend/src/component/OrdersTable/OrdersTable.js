import React from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingBag} from "@fortawesome/free-solid-svg-icons";

import AccountNavbar from "../AccountNavbar/AccountNavbar";

const OrdersTable = ({orders}) => {
    return (
        <div>
            <AccountNavbar/>
            <div className="container mt-5">
                <h4><FontAwesomeIcon className="ml-2 mr-2" icon={faShoppingBag}/> Danh sách đơn hàng</h4>
                <table className="table mt-4">
                    <thead>
                    <tr>
                        <th scope="col">Mã đơn</th>
                        <th scope="col">Ngày</th>
                        <th scope="col">Khách hàng</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Mã bưu chính</th>
                        <th scope="col">Mã sản phẩm</th>
                        <th scope="col">Thành tiền, VNĐ</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => {
                        return (
                            <tr key={order.id}>
                                <th>{order.id}</th>
                                <th>{order.date}</th>
                                <th>{order.firstName + " " + order.lastName}</th>
                                <th>{order.city + " " + order.address}</th>
                                <th>{order.postIndex}</th>
                                <th>
                                    {order.perfumeList.map((perfume) => {
                                        return (
                                            <p key={perfume.id}>
                                                <Link to={`/product/${perfume.id}`}>{perfume.id}</Link>
                                            </p>
                                        )
                                    })}
                                </th>
                                <th>{order.totalPrice}</th>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersTable;