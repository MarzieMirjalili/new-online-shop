import { FC, useState } from "react";
import { Flex } from "./components/Flex";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid var(--colors-gray-light);
  border-radius: 7px;
  width: 300px;
`;
const FeildContainer = styled(Flex)`
  padding: 20px;
`;
export const Profile: FC = () => {
  const [emailErr, setEmailErr] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwdError, setPwdError] = useState(false);

  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );
  const validPassword = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$");

  const schema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // const firstNameInputProps = register("firstName");
  // const inputRef= useRef<HTMLInputElement>(null)

  // inputRef.current?.classList.add("error");

  return (
    <Flex alignItems="center" justifyContent="center">
      {/* <input ref={inputRef}/>
      <input name={firstNameInputProps.name} onChange={firstNameInputProps.} />
      <input {...firstNameInputProps} />
      <input {...register("firstName")} /> */}
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          if (!validEmail.test(email)) {
            setEmailErr(true);
          }
          if (!validPassword.test(password)) {
            setPwdError(true);
          }
        })}
      >
        <FeildContainer flexDirection="column" gap="10px">
          <label>First Name</label>
          <StyledInput {...register("firstName")} />
        </FeildContainer>

        <FeildContainer flexDirection="column" gap="10px">
          <label>Last Name</label>
          <StyledInput {...register("lastName", { required: true })} />
          {errors.lastName && <p>This field is required</p>}
        </FeildContainer>

        <FeildContainer flexDirection="column" gap="10px">
          <label>Email</label>
          <StyledInput
            {...register("email", { required: true })}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p>This field is required</p>}
          {emailErr && <p>Your email is invalid</p>}
        </FeildContainer>

        <FeildContainer flexDirection="column" gap="10px">
          <label>Password</label>
          <StyledInput
            {...register("email", { required: true })}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p>This field is required</p>}
          {pwdError && <p>Your password is invalid</p>}
        </FeildContainer>

        <input type="submit" />
      </form>
    </Flex>
  );
};
