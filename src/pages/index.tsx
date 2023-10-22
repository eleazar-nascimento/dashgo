import React, { FormEvent, useContext, getServerSideProps } from "react";
import { Flex, Button, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from "../components/Form/Input";
import { AuthContext } from "../services/contexts/AuthContext";

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
});

export default function SignIn() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { signIn } = useContext(AuthContext);

  const handleSignIn: SubmitHandler<SignInFormData> = async (data, event: FormEvent) => {
    event.preventDefault();

    const credentials = {
      email: data.email,
      password: data.password
    }
    await signIn(credentials);
    // await new Promise(resolve => setTimeout(resolve, 2000));

  }
  // console.log(errors)

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius="8"
        flexDir="column"
        onSubmit={(handleSubmit(handleSignIn))}
      >
        <Stack spacing="4">
          <Input
            name="e-mail"
            type="email"
            label="Email"
            error={errors.email}
            defaultValue="eleazar.nascimento@gmail.com"
            {...register('email')}
          />

          <Input
            name="password"
            type="password"
            label="Senha"
            error={errors.password}
            defaultValue="123456"
            {...register('password')}
          />

        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log(ctx.req.cookies);

  return {
    props: {}
  }
}
