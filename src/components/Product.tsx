import { FC, useContext, useMemo } from "react";
import { Card } from "./Card";
import { Typography } from "./Typography";
import styled from "@emotion/styled";
import { Flex } from "./Flex";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { Counter } from "./Counter";
import moment from "moment";
import { CartContext } from "../CartContext";

const ProductImage = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 30px;
  object-fit: cover;
  object-position: center;
`;
const StyledTitle = styled(Typography)`
  margin-top: 20px;
  padding: 10px;
  text-align: center;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InfoContainer = styled(Flex)`
  padding: 15px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

export type Product = {
  id: string;
  imageUrl: string;
  title: string;
  date: string;
  price: number;
};

export default function Product({ id, imageUrl, title, date, price }: Product) {
  const { addToCart } = useContext(CartContext);
  const { removeFromCart } = useContext(CartContext);
  const { cartItems } = useContext(CartContext);

  const count = useMemo(
    () => cartItems.find((c) => c.product.id === id)?.count ?? 0,
    [cartItems, id]
  );

  return (
    <Card flexDirection="column" alignItems="center">
      <Link to={`/${id}`} style={{ display: "inline-grid" }}>
        <ProductImage src={imageUrl} alt={title} />
        <StyledTitle variant="body" lineHeight="20px" fontWeight="500">
          {title}
        </StyledTitle>
      </Link>

      <InfoContainer flexDirection="column" gap="20px">
        <Flex justifyContent="space-between">
          <Typography>Date:</Typography>
          <Typography>{moment(date).format("YYYY/MM/DD")}</Typography>
        </Flex>
        <Flex justifyContent="space-between">
          <Typography>Price:</Typography>
          <Typography>{price}</Typography>
        </Flex>
      </InfoContainer>
      {count == 0 ? (
        <StyledButton
          onClick={() => {
            addToCart({
              id: id,
              imageUrl: imageUrl,
              title: title,
              date: date,
              price: price,
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
              id: id,
              imageUrl: imageUrl,
              title: title,
              date: date,
              price: price,
            })
          }
          decrease={() =>
            removeFromCart({
              id: id,
              imageUrl: imageUrl,
              title: title,
              date: date,
              price: price,
            })
          }
        />
      )}
    </Card>
  );
}
