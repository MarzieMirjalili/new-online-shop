import { Global, css } from "@emotion/react";
import { FC } from "react";

export const GlobalStyles: FC = () => {
  return (
    <Global
      styles={css`
        :root {
          --colors-gray-darker: #1c1c1c;
          --colors-gray-dark: #3d3f48;
          --colors-gray: #686b78;
          --colors-gray-lightest: #f1f2f6;
          --colors-gray-light: #bdbfc6;
          /* gkf */
          --colors-primary: #324fbe;
          --colors-primary-light: #ebeef9;
          --colors-primary-dark: #293978;
        }
        body {
          background: #fafafa;
          font-family: "Poppins", sans-serif;
          margin: 0;
        }
        * {
          box-sizing: border-box;
        }
        a {
          text-decoration: none;
          margin-bottom: 0;
          color: inherit;
        }
        p {
          margin: 0;
        }
      `}
    />
  );
};
