import { CSSProperties } from "react";
import styled from "@emotion/styled";
import { Flex } from "./Flex";

export type CardProps = {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
};

export const Card = styled(Flex)<CardProps>`
  background: #ffffff;
  box-shadow: 0px 4px 100px rgba(74, 148, 154, 0.1);
  border-radius: 30px;
  padding: 20px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;
