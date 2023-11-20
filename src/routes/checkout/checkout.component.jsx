import { useSelector } from "react-redux";

import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from "./checkout.styles";
import PaymentForm from "../../components/payment-form/PaymentForm";
import { selectCurrentUser } from "../../store/user/user.selector";
import { NavLink } from "../navigation/navigation.styles";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutItem
          key={cartItem.id}
          cartItem={cartItem}
        />
      ))}
      <Total>Total: ${cartTotal}</Total>
      {currentUser ? (
        <PaymentForm />
      ) : (
        <div>
          <span>Register to complete payment!</span>
          <NavLink to={"/sign-in"}>Sign in</NavLink>
        </div>
      )}
    </CheckoutContainer>
  );
};

export default Checkout;
