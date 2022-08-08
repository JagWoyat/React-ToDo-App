import styled from 'styled-components';

const Paragraph = styled.div`
  padding: 0;
  width: 300;
  border: none;
  border-radius: 50px;
  font-weight: ${({ theme }) => theme.fontNormal};
  font-size: 16px;
`;

export default Paragraph;
