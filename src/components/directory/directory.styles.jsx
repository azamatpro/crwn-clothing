import styled from "styled-components";

export const DirectoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;
