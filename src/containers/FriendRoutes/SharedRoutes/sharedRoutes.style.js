import styled from 'styled-components';

export const SharedRoutesComponent = styled.div`
  background-color: #fff;
  margin: 30px auto;
  //Overriding the style guide card flexbox settings
  max-width: 50% !important;
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
