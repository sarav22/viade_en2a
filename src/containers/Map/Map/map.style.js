import styled from 'styled-components';

export const MapWrapper = styled.section`
width: 100%;
background-image: url('/img/concentric-hex-pattern_2x_black.png');
background-repeat: repeat;
`;


export const MapCard = styled.div`
  flex-direction: row !important;
  align-items: center;
  border: 2px solid #fff ;
`;


export const MapRouteName = styled.span`
  color: #18A9E6;
  overflow-wrap: break-word;
  word-break: break-word;
`;



export const Button = styled.button`
  min-width: 450px;
  display: inline-block;
  margin-left: 10px;
  flex-direction: row !important;
  &:first-child {
    margin-right: 0px;
  }
`;

export const Input = styled.input`
  margin: 5px;
`;
