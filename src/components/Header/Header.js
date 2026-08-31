import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary}, 
    ${props => props.theme.colors.primaryLight}
  );
  border-radius: ${props => props.theme.borderRadius.xlarge};
  padding: 40px 50px;
  text-align: center;
  color: ${props => props.theme.colors.white};
  margin-bottom: 35px;
  box-shadow: ${props => props.theme.shadows.colored};
  position: relative;
  overflow: hidden;

  &::before {
    content: '♪';
    position: absolute;
    font-size: 200px;
    color: rgba(255, 255, 255, 0.05);
    right: -20px;
    top: -40px;
    transform: rotate(15deg);
  }

  &::after {
    content: '♫';
    position: absolute;
    font-size: 150px;
    color: rgba(255, 255, 255, 0.05);
    left: -30px;
    bottom: -40px;
    transform: rotate(-10deg);
  }
`;

const Title = styled.h1`
  font-size: 2.8em;
  font-weight: 800;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
  position: relative;
  z-index: 1;
`;

const Subtitle = styled.p`
  font-size: 1.15em;
  opacity: 0.9;
  font-weight: 300;
  position: relative;
  z-index: 1;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>🎵 Mi Biblioteca Musical</Title>
      <Subtitle>Encuentra tus canciones favoritas y guárdalas</Subtitle>
    </HeaderContainer>
  );
};

export default Header;