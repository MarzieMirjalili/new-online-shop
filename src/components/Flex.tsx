import styled from "@emotion/styled";

export type FlexProps = {
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  alignContent?: string;
  flexWrap?: string;
  gap?: string;
};

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection ?? "row"};
  justify-content: ${(props) => props.justifyContent ?? "flex-start"};
  align-items: ${(props) => props.alignItems ?? "stretch"};
  align-content: ${(props) => props.alignContent ?? "stretch"};
  flex-wrap: ${(props) => props.flexWrap ?? "nowrap"};
  gap: ${(props) => props.gap ?? "0px"};
`;
