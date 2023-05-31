import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePersist from "../../../hooks/usePersist";
import PersonIcon from "../../../assets/svgs/personIcon";
import PaymentModal from "./Modals/PaymentModal";
import AuctionModal from "./Modals/AuctionItem";
interface DDProps {
  amount: object | any;
  cb: () => void;
}

export default function MyDropdown({ amount, cb }: DDProps) {
  const [open, setOpen] = useState(false);
  const [openItemModal, setOpenItemModal] = useState(false);
  const [auth]: any = usePersist("user_info");
  const navigation = useNavigate();
  function logout() {
    localStorage.clear();
    navigation("/");
  }
  function closeModal(args: boolean) {
    setOpen(args);
    setOpenItemModal(args);
  }
  return (
    <>
      <Menu as="div" className="relative z-40 inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center">
            <div className="flex">
              <div className="flex flex-row justify-center items-center gap-x-4">
                <span className="sm:text-sm md:text-base lg:text-md font-medium text-gray-300">
                  balance:{amount?.amount || 0} {auth?.userName || ""}
                </span>
                <PersonIcon color={"#f2f2f2"} width={"40"} height={"40"} />
              </div>
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item as={Fragment}>
                {() => (
                  <button
                    className="font-display px-2 py-2 w-full rounded-md text-gray-700 block text-left text-sm cursor-pointer hover:bg-gray-400 hover:text-white"
                    role="menuitem"
                    type="button"
                    tabIndex={-1}
                    id="menu-item-1"
                    onClick={() => setOpenItemModal(true)}
                  >
                    Create a new item
                  </button>
                )}
              </Menu.Item>
              <Menu.Item as={Fragment}>
                {() => (
                  <button
                    className="font-display px-2 py-2 w-full rounded-md text-gray-700 block text-left text-sm cursor-pointer hover:bg-gray-400 hover:text-white"
                    role="menuitem"
                    type="button"
                    tabIndex={-1}
                    id="menu-item-2"
                    onClick={() => setOpen(true)}
                  >
                    Deposit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item as={Fragment}>
                {() => (
                  <button
                    className="font-display px-2 py-2 w-full rounded-md text-gray-700 block text-left text-sm cursor-pointer hover:bg-gray-400 hover:text-white"
                    role="menuitem"
                    type="button"
                    tabIndex={-1}
                    id="menu-item-3"
                    onClick={() => logout()}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <PaymentModal
        reFetch={cb}
        modalHeader="Add payment"
        show={open}
        hide={closeModal}
      />
      <AuctionModal
        modalHeader="Add Item"
        show={openItemModal}
        reFetch={cb}
        hide={closeModal}
      />
    </>
  );
}
