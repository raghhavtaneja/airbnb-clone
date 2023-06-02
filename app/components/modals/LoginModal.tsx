"use client";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const LoginModal = () => { 
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials',{...data,redirect:false})
    .then((response)=>{
      setIsLoading(false);
      if(response?.ok){
        toast.success("Logged In")
        router.refresh();
        loginModal.onClose();
      }
      if(response?.error){
        toast.error(response.error);
      }
    })
    .catch(()=>{

    })
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome Back" subtitle="Login into your account" center />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  ); 

  const toggle = useCallback(()=>{
    loginModal.onClose();
    registerModal.onOpen();
  },[loginModal,registerModal])

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {signIn('google')}}
        outline
      />
      <Button
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {signIn('github')}}
        outline
      />
       <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center gap-2 justify-center">
        <div>
          New user?
        </div>
        <div 
          onClick={toggle}
          className="text-neutral-800 hover:underline cursor-pointer">
          Signup
        </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
