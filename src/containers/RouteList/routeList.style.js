import styled from "styled-components";
import { media } from "../../utils";

export const RouteListWrapper = styled.section`
  width: 100%;
  background-image: url("img/concentric-hex-pattern_2x_black.png");
  background-repeat: repeat;
  padding: 20px 0;

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

export const RouteListCard = styled.div`
  margin: 20px auto;

  //Overriding the style guide card flexbox settings
  max-width: 80% !important;
  flex-direction: row !important;
  padding: 20px 0 !important; //temporary fix to a style guide bug

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

export const WelcomeLogo = styled.div`
  width: 50%;
  height: 100%;

  img {
    width: 60%;
    display: block;
    margin: 0 auto;
  }
`;

export const WelcomeProfile = styled.div`
  height: 100%;
  text-align: center;
  position: relative;

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  h1,
  img {
    margin: 0 10px;
    display: inline-block;
    vertical-align: middle;
  }

  ${media.tablet`
    width: 50%;
    &:after {
      display: block;
      content: "";
      position: absolute;
      height: 100%;
      width: 1px;
      background-color:#D0D0D0;
      top:0;
    }
  `}
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageContainer = styled.div`
  background-image: ${({ image }) => (image ? `url(${image})` : "#cccccc")};
  background-size: cover;
  border-radius: 50%;
  width: 128px;
  height: 128px;
`;

export const WelcomeDetail = styled.div`
  padding: 1rem 3.5rem;

  p,
  li {
    color: #666666;
  }
  ul {
    list-style: disc;
    margin: 0 18px;
  }
`;

export const WelcomeName = styled.span`
  overflow-wrap: break-word;
  word-break: break-word;
`;

export const ListItemData = styled.div`
  display: flex;
  overflow-wrap: break-word;
  word-break: break-word;
`;

export const ItemWrapper = styled.div`
  //Overriding the style guide card flexbox settings
  flex-direction: row !important;
  padding: 0px 0px;
  align-items: left;

  color: black;

  :hover {
    color: #18A9E6;
    background-color: #F2F2F2;
  }
`;

export const RouteImage = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
  .img {
    width: auto;
    height: 100px;
  }
`;
