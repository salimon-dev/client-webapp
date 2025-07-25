import { Button, Dialog } from "@radix-ui/themes";
import Styles from "./styles.module.css";
import { useState } from "react";
import { IUser } from "@specs/users";
import UsernameSearchInput from "@components/Inputs/UsernameSearchInput";
import TextInput from "@components/Inputs/TextInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { sendTransaction } from "@apis/transactions";
import { useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@providers/auth";

export default function SendTransactionModal() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<IUser>();
  const formik = useFormik({
    initialValues: {
      user_id: "",
      amount: 0,
      category: "",
      description: "",
    },
    validationSchema: yup.object({
      user_id: yup.string().required("user is required"),
      amount: yup.number().min(100).required(),
      category: yup.string().required(),
      description: yup.string().required(),
    }),
    onSubmit: async (values) => {
      try {
        await sendTransaction(values);
        queryClient.refetchQueries({ queryKey: ["transactions"] });
        updateProfile();
        setOpen(false);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) formik.resetForm();
      }}
    >
      <Dialog.Trigger>
        <Button>Send Credit</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Send Credit</Dialog.Title>
        <Dialog.Description>Send credit to another user</Dialog.Description>
        <form onSubmit={formik.handleSubmit}>
          <div className={Styles.sendTransactionModal}>
            <UsernameSearchInput
              name="user_id"
              label="Username"
              placeholder="username"
              value={user}
              onBlur={formik.handleBlur}
              onChange={(value) => {
                if (!value) {
                  formik.setFieldValue("user_id", undefined);
                  setUser(undefined);
                } else {
                  formik.setFieldValue("user_id", value.id);
                  setUser(value);
                }
              }}
              error={formik.errors.user_id && formik.touched.user_id ? formik.errors.user_id : undefined}
            />
            <TextInput
              style={{ marginTop: 12 }}
              label="Amount (at least 100 token)"
              name="amount"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.amount && formik.touched.amount ? formik.errors.amount : undefined}
            />
            <TextInput
              style={{ marginTop: 12 }}
              label="Category"
              name="category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.category && formik.touched.category ? formik.errors.category : undefined}
            />
            <TextInput
              style={{ marginTop: 12 }}
              label="Description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.description && formik.touched.description
                  ? formik.errors.description
                  : undefined
              }
            />
            <div style={{ display: "flex", justifyContent: "end", marginTop: 12 }}>
              <Dialog.Close>
                <Button style={{ marginRight: 8 }} variant="outline">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button type="submit" loading={formik.isSubmitting}>
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
