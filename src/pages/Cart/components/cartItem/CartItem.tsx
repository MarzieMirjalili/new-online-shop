import { FC, useContext } from "react";
import { Card } from "../../../../components/Card";
import { CartContext, CartItem } from "../../../../CartContext";
import styled from "@emotion/styled";
import { Typography } from "../../../../components/Typography";
import { Flex } from "../../../../components/Flex";
import moment from "moment";
import { Counter } from "../../../../components/Counter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const StyledImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 20px;
  object-fit: cover;
  object-position: center;
`;
const InfoContainer = styled(Flex)`
  margin-left: 30px;
  max-width: 250px;
  height: 100%;
`;

export const CasrtItem: FC<CartItem> = ({ product, count }) => {
  const { addToCart } = useContext(CartContext);
  const { removeFromCart } = useContext(CartContext);
  const { removeProduct } = useContext(CartContext);

  return (
    <Card
      width="700px"
      height="150px"
      alignItems="center"
      justifyContent="space-between"
    >
      <Link to={`/${product.id}`}>
        <Flex alignItems="center">
          <StyledImg src={product?.imageUrl} />
          <InfoContainer flexDirection="column">
            <Typography variant="body" fontWeight={400}>
              {product.title}
            </Typography>
            <Typography variant="label" fontWeight={200}>
              {moment(product.date).format("YYYY/MM/DD")}
            </Typography>
            <Typography variant="label" fontWeight={200}>
              {`Price : ${product.price}`}
            </Typography>
          </InfoContainer>
        </Flex>
      </Link>
      <Counter
        count={count}
        increase={() => addToCart(product)}
        decrease={() => removeFromCart(product)}
      />
      <div style={{ cursor: "pointer" }} onClick={() => removeProduct(product)}>
        <FontAwesomeIcon icon={faXmark} />
      </div>
    </Card>
  );
};
