import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";

const HomeBody = observer(() => {
  return <HomeBodyWrap>asd</HomeBodyWrap>;
});

export default HomeBody;

const HomeBodyWrap = styled.div`
  width: 800px;

  margin: 0 auto;
  color: #303540;

  @media screen and (max-width: 800px) {
    width: 100%;
    padding: 0 10px;
  }
`;
