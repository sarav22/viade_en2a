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

export const ListItemWrapper = styled.div`
  width: 98%;
  height: 190px;
  margin: 5px 20px;

  p,
  li {
    color: #666666;
  }
  ul {
    list-style: disc;
    margin: 0 18px;
  }
`;
