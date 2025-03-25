import { Box, Button, Card, Flex, Grid, Link, Text } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import TextInput from "@components/Inputs/TextInput";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import PasswordInput from "@components/Inputs/PasswordInput";
import Heading from "./Heading";
import { nexus } from "@providers/store";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>();
  const formik = useFormik({
    validationSchema: yup.object({
      invitation_code: yup.string().required(),
      username: yup.string().required(),
      password: yup.string().required(),
    }),
    initialValues: {
      invitation_code: "",
      username: "",
      password: "",
    },
    onSubmit: async function (values) {
      setError(undefined);
      const response = await nexus.register(values);
      if (response.code === 200) {
        navigate("/");
      }
      if (response.code === 400) {
        formik.setErrors(response.errors);
      }
    },
  });
  return (
    <Flex direction="column" justify="center" align="center" gap="4" className={Styles.app}>
      <Heading />
      <Box className={Styles.container}>
        <Card style={{ padding: "24px 18px" }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid columns="1" gap="4">
              <TextInput
                label="invitation code:"
                name="invitation_code"
                value={formik.values.invitation_code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="john doe"
                error={
                  formik.touched.invitation_code && !!formik.errors.invitation_code
                    ? formik.errors.invitation_code
                    : ""
                }
              />
              <TextInput
                label="username:"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="john doe"
                error={formik.touched.username && !!formik.errors.username ? formik.errors.username : ""}
              />
              <PasswordInput
                label="password:"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="password"
                error={formik.touched.password && !!formik.errors.password ? formik.errors.password : ""}
              />
              <Button variant="outline" type="submit" loading={formik.isSubmitting}>
                Register
              </Button>
              {error && (
                <Text size="1" color="red">
                  {error}
                </Text>
              )}
              <Link
                onClick={() => {
                  navigate("/");
                }}
              >
                <Text size="2">already have an account?</Text>
              </Link>
              <Link
                onClick={() => {
                  navigate("/intro");
                }}
              >
                <Text size="2">what is salimon network?</Text>
              </Link>
            </Grid>
          </form>
        </Card>
      </Box>
    </Flex>
  );
}
