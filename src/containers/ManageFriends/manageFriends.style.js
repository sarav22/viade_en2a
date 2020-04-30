import styled from 'styled-components';

export const ManageFriendsWrapper = styled.div`
  width: 100%; 
  background-image: url('img/concentric-hex-pattern_2x_black.png');
  background-repeat: repeat;
  flex-direction: row !important;
  align-items: left;
  h3 {
    color: #666666;
    span {
      font-weight: bold;
    }
    a {
      font-size: 1.9rem;
    }
  }
  
  .inputAdd {
    width: 100%;
  }

  .label{
    color: #18A9E6;
    margin: 20px 20px 0px 0px;
    font-size: 20px;
    line-height: 20px;
  }

  .friend{
    margin-top: 20px;
  }

  .input{
    max-width: 65em;
  }

  .buttonFriend:hover, .addFriendButton:hover{
    color: #01C9EA;
  }
  .buttonFriend, .addFriendButton{
    padding-left: 2px;
    padding-right: 2px;
    margin-right: 2px;
    width: 100%;
    overflow-wrap: break-word;
  }

  .buttonFriend{
    text-align: left;
  }

  .addFriendButton{
    text-align: center;
  }

  .picture{
    overflow: visible;
    padding-right: 10px;
    padding-left: 10px;
    width: 62px;
    height: 42px;
    border-radius: 50%;
  }

`;
