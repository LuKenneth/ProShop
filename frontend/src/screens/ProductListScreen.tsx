import React, { useEffect } from 'react';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

interface Props {
  history: any;
  match: any;
}

const ProductListScreen: React.FC<Props> = ({ history, match }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state: any) => state.productList);
  const { products, loading, error } = productList;

  const productDelete = useSelector((state: any) => state.productDelete);
  const { success, loading: loadingDelete, error: errorDelete } = productDelete;

  const productCreate = useSelector((state: any) => state.productCreate);
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (userInfo && userInfo.isAdmin !== 'true') {
      history.push('/login');
    }

    if (success) {
      history.push(`/admin/product${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, history, userInfo, success, successCreate, createdProduct]);

  const deleteHandler = (id: any) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader></Loader>}
      {errorDelete && <Message variant="danger">{error}</Message>}
      {loadingCreate && <Loader></Loader>}
      {errorCreate && <Message variant="danger">{error}</Message>}
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
