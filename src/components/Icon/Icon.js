import styled from 'styled-components';

const Icon = styled.button`
  background: none;
  background-image: url(${({ icon }) => icon});
  height: 60px;
  width: 60px;
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: 50% 60%;
  border: none;

  &.active {
    background-color: white;
    width: 120px;
    height: 70px;
    background-size: 40%;
  }
`;

export default Icon;
