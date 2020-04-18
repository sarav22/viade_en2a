import styled from 'styled-components';

export const MapWrapper = styled.section`
width: 100%;
background-image: url("img/concentric-hex-pattern_2x_black.png");
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
  background-color: #fff;
  margin: 30px auto;

  //Overriding the style guide card flexbox settings
  max-width: 80% !important;
  flex-direction: row !important;
  padding: 50px 0 !important; //temporary fix to a style guide bug

  align-items: center;

  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  button {
    margin-left: 8px;
  }
`;


export const MapRouteName = styled.span`
  color: #18A9E6;
  span {
    font-weight: bold;
  }
  a {
    font-size: 1.9rem;
  }
  overflow-wrap: break-word;
  word-break: break-word;
`;

