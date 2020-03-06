import styled from 'styled-components';

export const SharedRoutes = styled.div`
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

export const FriendBar = styled.span`
  background-color: #fff;
  margin: 30px auto;

  //Overriding the style guide card flexbox settings
  max-width: 100% !important;
  flex-direction: row !important;
  padding: 50px 0 !important; //temporary fix to a style guide bug

  align-items: center;
  display: grid;
  grid-template-columns: 15% 70% 15%;
  grid-gap: 10px;

  button {
    margin: 0px;
  }
`;