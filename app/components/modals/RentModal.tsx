"use client";
import React, { useCallback, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";

const RentModal = () => {
 
  const rentModal = useRentModal();  
  return (
    <Modal
      isOpen={rentModal.isOpen}
      title="Airbnb your home"
      actionLabel="Submit"
      onClose={rentModal.onClose}
      body={<div>body</div>}
      footer={<div>footer</div>}
      onSubmit={()=>{}}
    />
  );
};

export default RentModal;
