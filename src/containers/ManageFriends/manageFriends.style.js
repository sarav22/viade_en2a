import styled from 'styled-components';

export const ManageFriendsWrapper = styled.section`
  width: 100%; 
  background-color: #fff;
  background-repeat: repeat;
  padding: 50px 0;
  flex-direction: row !important;
  h3 {
    color: #666666;
    span {
      font-weight: bold;
    }
    a {
      font-size: 1.9rem;
    }
  }
  
  button {
    margin-left: 0px;
  }
`;

export const ButtonFriend = styled.button`
  min-width: 450px;
  display: inline-block;
  margin-left: 10px;
  flex-direction: row !important;
  &:first-child {
    margin-right: 0px;
  }
`;
