import styled from 'styled-components';

const Header = styled.div`
  padding: 0px;
  font-weight: ${({ theme }) => theme.fontBold};
  font-size: 32px;
  color: black;
  outline: none;
  text-decoration: none;
`;

export default Header;
