import styled from "@emotion/styled";
import { FC, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import debouce from "lodash.debounce";

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid var(--colors-gray-light);
  border-radius: 7px;
  width: 300px;
`;

export const Search: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // const handleChange =

  const debouncedResults = useMemo(() => {
    return debouce((e: React.ChangeEvent<HTMLInputElement>) => {
      searchParams.set("search", e.target.value);
      setSearchParams(searchParams);
    }, 300);
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });
  return <StyledInput type="text" onChange={(e) => debouncedResults(e)} />;
};
