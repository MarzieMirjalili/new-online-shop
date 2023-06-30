import { FC } from "react";
import styled from "@emotion/styled";
import { Flex } from "./Flex";
import Logo from "../assets/Logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { Search } from "./Search";
import { Link } from "react-router-dom";
const MenuContainer = styled(Flex)`
  width: 100%;
  padding: 8px 24px;
  height: 56px;
  border-bottom: 1px solid var(--colors-gray-lightest);
  background: white;
`;

export const Menu: FC = () => {
  return (
    <MenuContainer alignItems="center" justifyContent="space-between">
      <img width="100px" src={Logo} alt="Logo" />
      <Search />
      <Flex
        style={{ width: "100px", fontSize: "20px" }}
        justifyContent="flex-end"
      >
        <Flex gap="20px">
          <Link to="/cart">
            <FontAwesomeIcon icon={faCartShopping} />
          </Link>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </Flex>
      </Flex>
    </MenuContainer>
  );
};
