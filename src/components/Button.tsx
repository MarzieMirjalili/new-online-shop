import styled from "@emotion/styled";
export type ButtonIntents = "primary" | "secondary" | "tertiary";
export type ButtonProps = {
  intent?: ButtonIntents;
};

export const Button = styled.button<ButtonProps>`
  cursor: pointer;
  border-radius: 15px;
  border: none;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #ffffff;

  background: ${(props) => `var(--colors-${props.intent ?? "primary"})`};
  padding: 16px 24px;

  &:hover {
    background: ${(props) => `var(--colors-${props.intent ?? "primary"}-dark)`};
    /* background: ${(props) =>
      `var(--colors-${
        props.intent === "secondary" || props.intent === "tertiary"
          ? "secondary"
          : "primary"
      }-dark)`}; */
  }
`;
