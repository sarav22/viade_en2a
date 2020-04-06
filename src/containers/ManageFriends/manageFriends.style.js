import styled from 'styled-components';

export const ManageFriendsWrapper = styled.div`
  width: 100%; 
  background-image: url('/img/concentric-hex-pattern_2x_black.png');
  background-repeat: repeat;
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
  
  .input {
    width: 50em;
    margin: 20px;
  }
`;

export const ButtonFriend = styled.div`
  margin-right: 5px;
  .buttonFriend:hover{
    color: #01C9EA;
  }
  .buttonFriend{
    padding-left: 2px;
    padding-right: 2px;
  }
`;
