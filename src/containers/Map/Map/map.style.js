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



export const ButtonWrapper = styled.div`
  width: 100%;
  display: inline-block;
  margin: 10px auto;
  flex-direction: row !important;
`;

export const Input = styled.input`
  margin: 5px;
`;
