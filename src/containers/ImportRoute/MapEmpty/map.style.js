import styled from 'styled-components';

export const MapWrapper = styled.section`
width: 100%;
background-image: url('img/concentric-hex-pattern_2x.png');
background-repeat: repeat;
padding: 50px 0;

h3 {
  color: #18A9E6;
  span {
    font-weight: bold;
  }
  a {
    font-size: 1.9rem;
  }
}
`;




export const MapCard = styled.div`
  flex-direction: row !important;
  align-items: center;
  border: 2px solid #fff ;
`;

