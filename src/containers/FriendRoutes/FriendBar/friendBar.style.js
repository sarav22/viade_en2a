import styled from 'styled-components';

export const FriendBarWrapper = styled.div`
  background-color: #fff;
  margin: 30px auto;

  //Overriding the style guide card flexbox settings
  max-width: 100% !important;
  min-width: 100% !important;
  max-height: 20%;
  flex-direction: row !important;
  padding: 50px 0 !important; //temporary fix to a style guide bug

  align-items: center;
`;