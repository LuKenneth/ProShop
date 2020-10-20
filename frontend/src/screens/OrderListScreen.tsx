import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOrders } from '../actions/orderActions';

interface Props {
  history: any;
}

const OrderListScreen: React.FC<Props> = ({ history }) => {
  const dispatch = useDispatch();
  const orderList = useSelector((state: any) => state.orderList);
  const { orders, loading, error } = orderList;

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin === 'true') {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>TOTAL PRICE</th>
              <th># ITEMS</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>PAYMENT METHOD</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr key={order._id}>
                <td>
                  <a href={`/order/${order._id}`}>{order._id}</a>
                </td>
                <td>{order.totalPrice}</td>
                <td>{order.orderItems.length}</td>
                <td>
                  {order.isPaid ? (
                    <strong>PAID</strong>
                  ) : (
                    <strong>NOT PAID</strong>
                  )}
                </td>
                <td>
                  {order.delivered ? (
                    <strong>DELIVERED</strong>
                  ) : (
                    <strong>NOT DELIVERED</strong>
                  )}
                </td>
                <td>{order.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
