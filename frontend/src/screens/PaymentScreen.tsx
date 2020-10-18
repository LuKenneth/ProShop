import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

interface Props {
  location: any;
  history: any;
}

const PaymentScreen: React.FC<Props> = ({ history }) => {
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = () => {
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeOrder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="Address">
          <Form.Label as="legend">Select Method</Form.Label>
        </Form.Group>
        <Col>
          <Form.Check
            type="radio"
            value="PayPal"
            label="PayPal or Credit Card"
            id="PayPal"
            name="paymentMethod"
            checked
            onChange={(e: any) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Col>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
