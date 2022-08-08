import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GlobalStyle from 'theme/GlobalStyle';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from 'theme/Theme';
import NavBar from 'components/NavBar/NavBar';
import Icon from 'components/Icon/Icon';
import add from 'assets/add.svg';
import Form from 'components/Form/Form';

const StyledAddIcon = styled.div`
  position: fixed;
  display: flex;
  bottom: 30px;
  right: 30px;
  transform: translate(${({ isActive }) => (isActive ? '-680px' : '0px')});
  transition: transform 0.25s ease-in-out;
`;

export default function AppTemplate({ children }) {
  const [visible, setVisible] = useState(false);

  const toogleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <>
          <NavBar />
          <Form isVisible={visible} />
          <StyledAddIcon isActive={visible}>
            <Icon
              icon={add}
              onClick={() => {
                toogleVisible();
              }}
            />
          </StyledAddIcon>
          {children}
        </>
      </ThemeProvider>
    </div>
  );
}

AppTemplate.propTypes = {
  children: PropTypes.node,
};

AppTemplate.defaultProps = {
  children: <p />,
};
