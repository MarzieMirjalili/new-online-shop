import { FC, useContext, useMemo } from "react";
import { Typography } from "./components/Typography";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Photo } from "./Home";
import axios from "axios";
import { Flex } from "./components/Flex";
import styled from "@emotion/styled";
import moment from "moment";
import { Button } from "./components/Button";
import { Counter } from "./components/Counter";
import { CartContext } from "./CartContext";

export const StyledContainer = styled(Flex)`
  padding: 50px;
`;
const ProductImage = styled.img`
  width: 500px;
  height: 400px;
  border-radius: 30px;
  object-fit: cover;
  object-position: center;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const InfoContainer = styled(Flex)`
  max-width: 300px;
`;

const CountContainer = styled.div`
  width: 200px;
  margin-top: 20px;
`;

export const ProductDetail: FC = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { removeFromCart } = useContext(CartContext);
  const { cartItems } = useContext(CartContext);

  const count = useMemo(
    () => cartItems.find((c) => c.product.id === id)?.count ?? 0,
    [cartItems, id]
  );

  const { isLoading, isError, data, error } = useQuery<Photo, Error>(
    "getPhoto",
    () =>
      axios
        .get(`https://api.unsplash.com/photos/${id}`, {
          headers: {
            Authorization:
              "Client-ID wgSJ44ducmH1B_Re1Kcak8NynL_kBTSsKvEYBe5ye6k",
          },
        })
        .then((res) => res.data)
  );
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  if (!data) {
    return <div>data not found</div>;
  }
  return (
    <StyledContainer alignItems="center" gap="50px">
      <ProductImage src={data?.urls.regular} />
      <InfoContainer flexDirection="column" gap="20px">
        <Typography variant="h4" lineHeight="30px">
          {data?.alt_description}
        </Typography>
        <Typography>{data?.description}</Typography>
        <Typography>{`Price : ${data?.alt_description.length}`}</Typography>
        <Typography>
          {`Date : ${moment(data?.created_at).format("YYYY/MM/DD")}`}
        </Typography>
        <CountContainer>
          {count == 0 ? (
            <StyledButton
              onClick={() => {
                addToCart({
                  id: data?.id,
                  imageUrl: data?.urls.regular,
                  title: data?.alt_description,
                  date: data?.created_at,
                  price: data?.alt_description.length,
                });
              }}
            >
              Add To Cart
            </StyledButton>
          ) : (
            <Counter
              count={count}
              increase={() =>
                addToCart({
                  id: data?.id,
                  imageUrl: data?.urls.regular,
                  title: data?.alt_description,
                  date: data?.created_at,
                  price: data?.alt_description.length,
                })
              }
              decrease={() =>
                removeFromCart({
                  id: data?.id,
                  imageUrl: data?.urls.regular,
                  title: data?.alt_description,
                  date: data?.created_at,
                  price: data?.alt_description.length,
                })
              }
            />
          )}
        </CountContainer>
      </InfoContainer>
    </StyledContainer>
  );
};
