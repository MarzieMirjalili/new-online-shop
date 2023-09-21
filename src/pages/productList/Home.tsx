import { FC, Suspense, lazy, useState } from "react";
import { Menu } from "../../components/Menu";
import styled from "@emotion/styled";
import { useSearchParams } from "react-router-dom";
import { Flex } from "../../components/Flex";
import { Button } from "../../components/Button";
import { usePhotos } from "../../hooks/use-photos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Product = lazy(() =>
  delayForDemo(import("./components/product/Product"))
);

const ListContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  padding: 20px;
`;

const FilterContainer = styled(Flex)`
  padding: 20px 20px 0 20px;
`;

const FilterItem = styled.input`
  padding: 10px;
  border: 1px solid var(--colors-gray-light);
  border-radius: 30px;
`;

export interface Photo {
  id: string;
  urls: { regular: string };
  description: string;
  alt_description: string;
  created_at: string;
}

export const Home: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [fromDate, setFromDate] = useState<string>();
  const [toDate, setToDate] = useState<string>();
  const { isLoading, isError, error, searchResult } = usePhotos();

  const applyFilters = () => {
    if (fromDate) {
      searchParams.set("fromdate", fromDate);
    } else {
      searchParams.delete("fromdate");
    }
    if (toDate) {
      searchParams.set("todate", toDate);
    } else {
      searchParams.delete("todate");
    }
    setSearchParams(searchParams);
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message ?? "something went wrong"}</span>;
  }
  return (
    <div>
      <Menu />
      <FilterContainer gap="20px" alignItems="center">
        <label>From :</label>
        <FilterItem type="date" onChange={(e) => setFromDate(e.target.value)} />
        <label>To :</label>
        <FilterItem type="date" onChange={(e) => setToDate(e.target.value)} />
        <Button onClick={applyFilters}>apply</Button>
      </FilterContainer>

      <ListContainer>
        {searchResult?.map((p) => (
          <Suspense fallback={<FontAwesomeIcon icon={faSpinner} />}>
            <Product
              key={p.id}
              id={p.id}
              imageUrl={p.urls.regular}
              title={p.alt_description}
              date={p.created_at}
              price={p.alt_description?.length}
            />
          </Suspense>
        ))}
      </ListContainer>
    </div>
  );
};
function delayForDemo(promise: any) {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}
