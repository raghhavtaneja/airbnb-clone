"use client";

import { AiOutlineMenu } from "react-icons/ai";
import React, { useCallback, useState } from "react";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
// import { User } from "@prisma/client";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import useRentModal from "@/app/hooks/useRentModal";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    // open rent modal
    rentModal.onOpen();
    
  }, [currentUser, loginModal]);
  return (
    <div className="relative">
      <div className="flex item-center gap-3">
        <div
          onClick={onRent}
          className="hidden 
        md:block
        text-sm
        font-semibold
        py-3
        px-4
        rounded-full
        hover:bg-neutral-100
        transition
        cursor-pointer
        "
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="
        p-4
        md:py-1
        md:px-2
        border-[1px]
        border-neutral-200
        flex
        items-center
        gap-3
        rounded-full
        hover:shadow-md
        transition
        cursor-pointer
      "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
        absolute
        rounded-xl
        shadow-md
        w-[40vw]
        md:w-3/4
        bg-white
        overflow-hidden
        right-0
        top-12
        text-sm
        "
        >
          <div
            className="
            flex
            flex-col
            cursor-pointer"
          >
            {currentUser ? (
              <>
                <MenuItem label={"My Trips"} onClick={() => {}} />
                <MenuItem label={"My favorites"} onClick={() => {}} />
                <MenuItem label={"My reservations"} onClick={() => {}} />
                <MenuItem label={"My Properties"} onClick={() => {}} />
                <MenuItem label={"Airbnb my home"} onClick={() => {}} />
                <hr className="h-px bg-gray-200 border-0 my-2"></hr>
                <MenuItem
                  label={"Logout"}
                  onClick={() => {
                    signOut();
                  }}
                />
              </>
            ) : (
              <>
                <MenuItem label={"Login"} onClick={loginModal.onOpen} />
                <MenuItem label={"Signup"} onClick={registerModal.onOpen} />
                <hr className="h-px bg-gray-200 border-0 my-2"></hr>
                <MenuItem label={"Airbnb your home"} onClick={() => {}} />
                <MenuItem label={"Help"} onClick={() => {}} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
