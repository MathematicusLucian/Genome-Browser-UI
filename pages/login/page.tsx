"use client";
import { useState } from "react";
import Container from "@/components/Container";
import FormInput from "@/components/FormInput";
import userLogin from "@/services/UserLogin";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const loginSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email required"),
    password: Yup.string().required("Password required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "superadmin@localhost.com",
      password: "admin",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        await userLogin(values);
        toast.success("Logged in");
      } catch (error) {
        formik.resetForm();
        toast.error(error.message || "Login failed");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Container className="py-2 lg:py-5">
      <div className="flex h-svh items-center justify-evenly gap-5 text-base">
        <div className="w-full xs:w-8/12 lg:w-5/12">
          <Card className="w-full">
            <p className="pb-3 text-2xl font-semibold">
              {`ADMIN LOGIN`}
            </p>
            <form className="space-y-1" onSubmit={formik.handleSubmit}>
              <div className="space-y-2">
                <FormInput
                  label="Email"
                  name="email"
                  placeholder="Enter an email address"
                  formik={formik}
                  required
                />

                <div>
                  <FormInput
                    label="Password"
                    name="password"
                    placeholder="Enter a password"
                    type="password"
                    formik={formik}
                    required
                  />
                </div>
              </div>
              <div>
                <Button
                  className="mt-2"
                //   type="primary"
                //   htmlType="submit"
                //   block
                //   loading={loading}
                >
                  Sign in
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </Container>
  );
}