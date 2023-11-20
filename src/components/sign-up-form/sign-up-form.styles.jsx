import styled from "styled-components";

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  h2 {
    margin: 10px 0;
  }
  @media only screen and (max-width: 600px) {
    width: 90%;
  }
`;
