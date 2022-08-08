import styled from 'styled-components';

const Input = styled.input`
  padding: 15px 25px;
  font-weight: ${({ theme }) => theme.fontNormal};
  font-size: 16px;
  background-color: lightgray;
  border: 0px;
  border-radius: 20px;
  ::placeholder {
    letter-spacing: 1px;
    color: gray;
  }
`;

export default Input;
