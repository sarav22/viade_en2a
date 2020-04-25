import styled from "styled-components";
export const ListWrapper = styled.div`
  width: 100%;

  h3 {
    color: #666666;
    span {
      font-weight: bold;
    }
    a {
      font-size: 1.9rem;
    }
  }
`;

export const ManageFriendsWrapper = styled.div`
  width: 100%;
  background-image: url("img/concentric-hex-pattern_2x_black.png");
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

  #deleteGroup {
    with: 80em;
    margin: 10px;
  }

  form {
    p {
      margin: 20px 20px 0px 20px;
      color: #ffffff;
      span {
        font-weight: bold;
      }
      font-size: 1.2rem;
    }
    input {
      width: 50em;
      margin: 20px 20px 0px 20px;
    }
    .addFriendButton .updateGroupName .addToGroupButton {
      width: 40em;
    }

    .deleteUserFromGroup {
      border: 10px;
    }
  }

  #groupManager {
    width: 50em;
    margin: 20px;
  }
  #group {
    margin: 20px;
  }
  #groupDropDown {
    margin: 20px;
  }
`;

export const ButtonFriend = styled.div`
  margin-right: 5px;
  .buttonFriend:hover {
    color: #01c9ea;
  }
  .buttonFriend {
    padding-left: 2px;
    padding-right: 2px;
  }
`;
