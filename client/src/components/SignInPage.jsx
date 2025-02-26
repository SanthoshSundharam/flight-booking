import React from "react";
import { useForm } from "react-hook-form";

function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>

      {/* Email Field */}
      <label>Email:</label>
      <input
        type="email"
        {...register("email", {
          required: "Email is required",
          pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
        })}
      />
      {errors.email && <p>{errors.email.message}</p>}

      {/* Password Field */}
      <label>Password:</label>
      <input
        type="password"
        {...register("password", {
          required: "Password is required",
          minLength: { value: 6, message: "Password must be at least 6 characters" },
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      {/* Submit Button */}
      <button type="submit">Login</button>
    </form>
  );
}

export default SignInPage;
