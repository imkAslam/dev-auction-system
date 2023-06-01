import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import InputField from "../../../../components/InputField/inputField";
import Button from "../../../../components/Button/button";
import Loader from "../../../../components/loader/loader";
import { placeBid } from "../../../../features/auction";
import Toaster from "../../../../components/toaster/toaster";

interface ModalProps {
  bidId: string | number;
  bidItem: string;
  children?: string | JSX.Element | JSX.Element[];
  show?: boolean;
  hide: (value: boolean) => void;
  reFetch: (value?: unknown) => void;
}

type FormValues = {
  amount: number;
};

const BidModal: React.FC<ModalProps> = ({
  show,
  bidId,
  bidItem,
  hide,
  reFetch,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  function closeModal() {
    hide(false);
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (data: FormValues) => {
    setLoading(true);
    const result = await placeBid({
      auctionId: bidId,
      bidAmount: Number(data.amount),
    });
    setLoading(false);
    if (result?.succeeded) {
      Toaster({ message: result?.message, type: "success" });
      reset();
      closeModal();
      reFetch();
      return;
    }
    console.log(result);
    Toaster({ message: result?.response?.data?.message, type: "error" });
    return;
  });

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between">
                    <Dialog.Title
                      as="h4"
                      className="text-xl mb-2 font-semibold font-display"
                    >
                      {bidItem || "Modal Title"}
                    </Dialog.Title>
                    <div className=" justify-end text-[#666666] text-2xl">
                      <button type="button" onClick={() => closeModal()}>
                        X
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 w-full">
                    <form onSubmit={onSubmit}>
                      <div className="">
                        <InputField
                          id="amount"
                          labelFor="amount"
                          labelText="Amount"
                          name="amount"
                          placeholder="Enter amount ..."
                          inputType="text"
                          reff={{ ...register("amount", { required: true }) }}
                          isRequired={errors?.amount ? true : false}
                        />
                      </div>

                      <div className="flex flex-row justify-between items-center gap-x-4">
                        <Button
                          handleClick={closeModal}
                          btnType="button"
                          customClass="w-full bg-gray-400 hover:bg-gray-600"
                        >
                          Cancel
                        </Button>
                        <Button
                          btnType="submit"
                          customClass="w-full bg-blue-900 hover:bg-blue-700"
                        >
                          {loading ? <Loader color="white" /> : "Deposit"}
                        </Button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default BidModal;
