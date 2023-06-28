import {
  createElement,
  CSSProperties,
  FunctionComponent,
  ReactNode,
} from "react";
import styled from "@emotion/styled";

// export type TypographyProps = {
//   fontFamily?: CSSProperties["fontFamily"];
//   fontStyle?: CSSProperties["fontStyle"];
//   fontWeight?: CSSProperties["fontWeight"];
//   fontSize?: CSSProperties["fontSize"];
//   lineHeight?: CSSProperties["lineHeight"];
//   // TODO: Add type (like button intent) to color prop
//   color?: CSSProperties["color"];
// };
export type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "body" | "label";

const Element_by_variant = {
  h1: { tag: "h1", fontSize: "72px" },
  h2: { tag: "h2", fontSize: "48px" },
  h3: { tag: "h3", fontSize: "40px" },
  h4: { tag: "h4", fontSize: "25px" },
  body: { tag: "p", fontSize: "16px" },
  label: { tag: "label", fontSize: "14px" },
};
export type TypographyProps = {
  className?: string;
  variant?: TypographyVariant;
  children?: ReactNode;
  fontSize?: CSSProperties["fontSize"];
  fontFamily?: CSSProperties["fontFamily"];
  fontWeight?: CSSProperties["fontWeight"];
  lineHeight?: CSSProperties["lineHeight"];
  color?: CSSProperties["color"];
};

export const TypographyBase: FunctionComponent<TypographyProps> = ({
  variant = "body",
  children,
  className,
}) => {
  return createElement(
    Element_by_variant[variant].tag,
    { className },
    children
  );
};

export const Typography = styled(TypographyBase)`
  font-size: ${(props) =>
    props.fontSize ?? Element_by_variant[props.variant ?? "body"].fontSize};
  font-family: ${(props) => props.fontFamily ?? "Poppins"};
  font-weight: ${(props) => props.fontWeight ?? "400"};
  line-height: ${(props) => props.lineHeight ?? "20px"};
  color: ${(props) => props.color ?? "#000000"};
`;

// export const Typography = styled.p<TypographyProps>`
//   font-family: ${(props) => props.fontFamily ?? "Poppins"};
//   font-style: ${(props) => props.fontStyle ?? "normal"};
//   font-weight: ${(props) => props.fontWeight ?? "500"};
//   font-size: ${(props) => props.fontSize ?? "24px"};
//   line-height: ${(props) => props.lineHeight ?? "0px"};
//   color: ${(props) => props.color ?? "#000000"};
// `;

// const Btn = <button onClick={() => {}}>Button Text</button>;
// const OurButton = createElement("button", { onClick: () => {} }, "Button Text");
