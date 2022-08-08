import styled from 'styled-components';

const Button = styled.button`
  background-color: gray;
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 50px;
  font-weight: ${({ theme }) => theme.fontBold};
  font-size: 10px;
  text-transform: uppercase;
  margin: 3px;
`;

export default Button;
