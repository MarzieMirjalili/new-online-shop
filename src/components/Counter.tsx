import { FC } from "react";
import { Flex } from "./Flex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";

export type CounterProps = {
  count: number;
  increase: (isIncrease: boolean) => void;
  decrease: (isIncrease: boolean) => void;
};
const StyledArrow = styled(Flex)`
  padding: 10px;
  background-color: var(--colors-primary);
  color: white;
  border-radius: 10px;
  cursor: pointer;
`;
const CountContainer = styled(Flex)`
  padding: 10px 30px;
`;

export const Counter: FC<CounterProps> = ({ count, increase, decrease }) => {
  return (
    <Flex justifyContent="space-between">
      <StyledArrow
        alignItems="center"
        justifyContent="space-between"
        onClick={() => decrease(false)}
      >
        <FontAwesomeIcon icon={faMinus} />
      </StyledArrow>
      <CountContainer alignItems="center" justifyContent="space-between">
        {count}
      </CountContainer>
      <StyledArrow
        alignItems="center"
        justifyContent="space-between"
        onClick={() => increase(true)}
      >
        <FontAwesomeIcon icon={faPlus} />
      </StyledArrow>
    </Flex>
  );
};
