import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import InputField from "../../../../components/InputField/inputField";
import Button from "../../../../components/Button/button";
import Loader from "../../../../components/loader/loader";
import { addAuctionItems } from "../../../../features/auction";
import Toaster from "../../../../components/toaster/toaster";

interface ModalProps {
  children?: string | JSX.Element | JSX.Element[];
  modalHeader?: string;
  show?: boolean;
  hide: (value: boolean) => void;
  reFetch: () => void;
}

type FormValues = {
  itemName: string;
  startPrice: number;
  dueDate: string;
};

const AuctionModal: React.FC<ModalProps> = ({
  modalHeader,
  show,
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

  const [startDate, setStartDate] = useState(new Date());

  const onSubmit = handleSubmit(async (data: FormValues) => {
    const finalPayload = {
      ...data,
      startPrice: Number(data.startPrice),
      currentPrice: Number(data.startPrice),
      dueDate: startDate,
    };
    setLoading(true);
    const result = await addAuctionItems(finalPayload);
    setLoading(false);
    if (result?.succeeded) {
      Toaster({ message: "Item added successfully", type: "success" });
      reFetch();
      closeModal();
      reset();
      return;
    }
    Toaster({ message: result?.message, type: "error" });
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
                      {modalHeader || "Modal Title"}
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
                          id="itemName"
                          labelFor="itemName"
                          labelText="Item Name"
                          name="itemName"
                          placeholder="Enter item name ..."
                          inputType="text"
                          reff={{ ...register("itemName", { required: true }) }}
                          isRequired={errors?.itemName ? true : false}
                        />
                      </div>

                      <div className="">
                        <InputField
                          id="startPrice"
                          labelFor="startPrice"
                          labelText="Item start price"
                          name="startPrice"
                          placeholder="Enter item start price ..."
                          inputType="text"
                          reff={{
                            ...register("startPrice", { required: true }),
                          }}
                          isRequired={errors?.startPrice ? true : false}
                        />
                      </div>
                      <div className="my-2">
                        <DatePicker
                          selected={startDate}
                          onChange={(date: any) => setStartDate(date)}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          minDate={new Date()}
                          timeCaption="time"
                          className="block w-full px-4  h-12 bg-white border
                          border-gray-400 rounded-md text-sm shadow-sm placeholder-slate-400
                           focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400
                           disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                           invalid:border-pink-500 invalid:text-pink-600
                           focus:invalid:border-pink-500 focus:invalid:ring-pink-500 peer"
                          dateFormat="MMMM d, yyyy h:mm aa"
                        />

                        {/* <InputField
                          id="dueDate"
                          labelFor="dueDate"
                          labelText="Time window"
                          name="startPrice"
                          placeholder="Enter time window ..."
                          inputType="time"
                          reff={{
                            ...register("dueDate", { required: true }),
                          }}
                          isRequired={errors?.dueDate ? true : false}
                        /> */}
                      </div>

                      <div className="flex flex-row justify-between items-center gap-x-4">
                        <Button
                          handleClick={closeModal}
                          btnType="button"
                          customClass="w-full bg-gray-500 hover:bg-gray-600"
                        >
                          Cancel
                        </Button>
                        <Button
                          btnType="submit"
                          customClass="w-full bg-blue-900 hover:bg-blue-950"
                        >
                          {loading ? <Loader color="white" /> : "Create"}
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

export default AuctionModal;
