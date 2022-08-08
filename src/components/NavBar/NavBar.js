/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import deleted from 'assets/deleted.svg';
import done from 'assets/done.svg';
import todo from 'assets/todo.svg';
import ask from 'assets/ask.svg';
import signal from 'assets/signal.svg';

import Header from 'components/Header/Header';
import Icon from 'components/Icon/Icon';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTodosError, getTodosStatus } from 'features/TodoSlice';

const Wrapper = styled.div`
  padding-left: 20px;
  position: fixed;
  left: 0px;
  top: 0px;
  border: none;
  height: 7vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, path }) => (theme ? theme[path] : '#ababff')};
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  border: none;
  margin-right: 100px;
`;

const NavLinks = styled.div`
  display: flex;
  border: none;
  vertical-align: center;
`;

const Status = styled.div`
  display: flex;
  border: none;
  margin-left: auto;
  padding-right: 50px;
  padding-bottom: 5px;
`;

const Window = styled.div`
  border: 2px solid ${({ theme, activecolor }) => theme[activecolor]};
  z-index: 1;
  position: fixed;
  display: flex;
  padding: 10px 10px;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  right: 0;
  top: 7vh;
  height: 100px;
  width: 300px;
  background-color: white;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transform: translate(0, ${({ isHovering }) => (isHovering ? '0%' : '-300%')});
`;

export default function NavBar() {
  const [path, setPath] = useState('/');
  const [isHovering, setHover] = useState(false);

  const todosStatus = useSelector(getTodosStatus);
  const todosError = useSelector(getTodosError);

  useEffect(() => {
    setPath(location.pathname.slice(1));
  });

  return (
    <Wrapper path={path}>
      <Logo>
        <Header as={NavLink} to="/todo">
          ToDoApp
        </Header>
      </Logo>
      <NavLinks>
        <Icon as={NavLink} to="/todo" activeclass="active" icon={todo} />
        <Icon as={NavLink} to="/done" activeclass="active" icon={done} />
        <Icon as={NavLink} to="/deleted" activeclass="active" icon={deleted} />
      </NavLinks>
      <Status onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {todosStatus === 'succeeded' ? (
          <>
            <Icon icon={signal} />
            <Window isHovering={isHovering}>
              You are connected to the server.
              <br /> Status: {todosStatus}
              <br />
              {todosError !== null && `Error: ${todosError}`}
            </Window>
          </>
        ) : (
          todosStatus === 'failed' && (
            <>
              <Icon icon={ask} />
              <Window isHovering={isHovering}>
                Couldn&apos;t connect to the server.
                <br /> Status: {todosStatus}
                <br />
                {todosError !== null && `Error: ${todosError}`}
              </Window>
            </>
          )
        )}
      </Status>
    </Wrapper>
  );
}
