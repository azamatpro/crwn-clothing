import styled from "styled-components";

export const PaymentFormContainer = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const FormContainer = styled.form`
  height: 100px;
  width: 500px;

  @media only screen and (max-width: 600px) {
    width: 90%;
  }
`;
