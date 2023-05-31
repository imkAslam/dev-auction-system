import React, { useState } from "react";
import InputField from "../../components/InputField/inputField";
import Button from "../../components/Button/button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useTitle from "../../hooks/useTitle";
import usePersist from "../../hooks/usePersist";
import { RegisterUser } from "../../features/auth";
import Toaster from "../../components/toaster/toaster";
import Loader from "../../components/loader/loader";

type FormValues = {
  userName: string;
  email: string;
  password: string;
};

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [loading, setLoading] = useState<boolean>(false);
  const [_, setAuth] = usePersist("user_info");

  const onSubmit = handleSubmit(async (data: object) => {
    setLoading(true);
    const result = await RegisterUser(data);
    setLoading(false);
    if (result?.succeeded) {
      Toaster({ message: "Registration successful", type: "success" });
      setAuth(result.data);
      return;
    }
    Toaster({ message: result?.message, type: "error" });
    return;
  });

  useTitle("Register");
  return (
    <section className="bg-gray-200 w-full h-[100dvh]">
      <div className="flex w-full h-full items-center justify-center md:p-0 px-4">
        <div className="bg-white rounded-lg shadow md:w-1/3 md:h-[28em] w-full h-hull p-16 m-auto flex flex-col items-center justify-center">
          <header className="">
            <span className="text-3xl font-medium">Register</span>
          </header>
          <div className="w-full">
            <form onSubmit={onSubmit}>
              <div className="">
                <InputField
                  id="name"
                  labelFor="name"
                  labelText="User Name"
                  name="userName"
                  placeholder="Enter user name ..."
                  inputType="text"
                  reff={{ ...register("userName", { required: true }) }}
                  isRequired={errors?.userName ? true : false}
                />
              </div>
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
            <Link to="/">
              <span className="text-blue-500 font-medium">
                Already have account?{" "}
                <span className="text-blue-800">Sign in</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
