import React, { useState } from "react";
import InputField from "../../components/InputField/inputField";
import Button from "../../components/Button/button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SignIn } from "../../features/auth";
import Loader from "../../components/loader/loader";
import Toaster from "../../components/toaster/toaster";
import useTitle from "../../hooks/useTitle";
import usePersist from "../../hooks/usePersist";

type FormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [loading, setLoading] = useState<boolean>(false);
  const [_, setAuth] = usePersist("user_info");
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data: object) => {
    setLoading(true);
    const result = await SignIn(data);
    setLoading(false);
    if (result?.succeeded) {
      Toaster({ message: "Logged in successfully", type: "success" });
      setAuth(result.data);
      setTimeout(() => {
        navigate("/home");
      }, 1000);
      return;
    }
    Toaster({ message: result?.message, type: "error" });
    return;
  });
  useTitle("Login");
  return (
    <section className="bg-gray-200 w-full h-[100dvh]">
      <div className="flex w-full h-full items-center justify-center md:p-0 px-4">
        <div className="bg-white rounded-lg shadow md:w-1/3 md:h-[28em] w-full h-hull p-16 m-auto flex flex-col items-center justify-center">
          <header className="">
            <span className="text-3xl font-medium">Login </span>
          </header>
          <div className="w-full">
            <form onSubmit={onSubmit}>
              <div className="">
                <InputField
                  id="email"
                  labelFor="email"
                  labelText="Email"
                  name="email"
                  placeholder="Enter email ..."
                  inputType="email"
                  reff={{ ...register("email", { required: true }) }}
                  isRequired={errors?.email ? true : false}
                />
              </div>

              <div className="">
                <InputField
                  id="password"
                  labelFor="password"
                  labelText="Password"
                  name="password"
                  placeholder="Enter password ..."
                  inputType="password"
                  reff={{ ...register("password", { required: true }) }}
                  isRequired={errors?.password ? true : false}
                />
              </div>
              <div>
                <Button
                  btnType="submit"
                  customClass="w-full bg-blue-900 hover:bg-blue-950"
                >
                  {loading ? <Loader color="white" /> : "Sign in"}
                </Button>
              </div>
            </form>
          </div>
          <div className="w-full mt-2 text-center">
            <Link to="/Register">
              <span className="text-blue-500 font-medium">
                Create a new account
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
