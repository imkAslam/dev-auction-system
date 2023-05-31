import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface ModalProps {
  children: string | JSX.Element | JSX.Element[];
  modalHeader?: string;
  show?: boolean;
  hide: (value: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ children, modalHeader, show, hide }) => {
  function closeModal() {
    hide(false);
  }

  // function openModal() {
  //   hide(true);
  // }
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
                  <div className="mt-2">{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;