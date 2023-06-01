import React, { useEffect, useState, useMemo } from "react";
import MyDropdown from "./components/profileDropDown";
import { getAllAuctionItems, getAmount } from "../../features/auction";
import Table from "../../components/table/table";
import Button from "../../components/Button/button";
import moment from "moment";
import BidModal from "./components/Modals/BidModal";
import { ColumnDef } from "@tanstack/react-table";

type AmountProps = {
  id: number | string;
  amount: number | string;
  createdAt: string;
  updatedAt: string;
};

type BidProps = {
  id: number | string;
  itemName: string;
  description?: number | string | null;
  startPrice?: number | string;
  currentPrice?: number | string | null;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
};

type TableColProps = {
  id: string;
  itemName: string;
  startPrice: string;
  currentPrice: string;
  dueDate: string;
  status: string;
};

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [bidDelay, setBidDelay] = useState<any>({ isActive: false, id: "" });
  const [currentAuctionItem, setCurrentAuctionItem] = useState<BidProps | any>(
    {}
  );

  const [amount, setAmount] = useState<AmountProps | object>({});
  const [auctionItems, setItems] = useState<Array<any>>([]);

  const fetchAmount = async () => {
    const result = await getAmount();
    const response = await getAllAuctionItems();
    if (result?.succeeded) {
      setAmount(result?.data);
    }
    if (response?.succeeded) {
      setItems(response?.data || []);
    }
  };

  const handleAuctionItem = async (d: BidProps) => {
    setCurrentAuctionItem(d);
    setShowModal(true);
    setBidDelay({ isActive: false, id: d.id });
  };

  const fetchAuction = async () => {
    const response = await getAllAuctionItems();
    if (response?.succeeded) {
      setItems(response?.data || []);
    }
  };

  function refetchDataWithDelay() {
    fetchAmount();
    fetchAuction();
    setBidDelay((prev: object) => ({
      ...prev,
      isActive: true,
    }));
    setTimeout(() => {
      setBidDelay({
        id: "",
        isActive: false,
      });
    }, 5000);
  }

  function refetchData() {
    fetchAmount();
    fetchAuction();
  }

  useEffect(() => {
    fetchAmount();
    fetchAuction();
  }, []);

  const cols = useMemo<ColumnDef<TableColProps>[]>(
    () => [
      {
        header: "Name",
        cell: (row) => row.renderValue(),
        accessorKey: "itemName",
      },
      {
        header: "Start Price",
        cell: (row) => row.renderValue(),
        accessorKey: "startPrice",
      },
      {
        header: "Current Price",
        cell: (row) => row.renderValue(),
        accessorKey: "currentPrice",
      },
      {
        header: "Duration",
        accessorKey: "dueDate",
        cell: ({ row: { original } }) => {
          const today = moment().format("HH:mm");
          const dueDate = moment(new Date(original?.dueDate)).format("HH:mm");
          const startMoment = moment(today, "HH:mm");
          const endMoment = moment(dueDate, "HH:mm");
          const minuteDiff = endMoment.diff(startMoment, "minutes");
          const hours = Math.floor(minuteDiff / 60);
          const minutes = minuteDiff % 60;
          const duration = hours + "h " + minutes + "m";

          return (
            <p className="font-medium">
              {hours !== 0 && minutes !== 0 ? duration : "Expired"}
            </p>
          );
        },
      },
      {
        header: "Bid",
        accessorKey: "status",
        cell: ({ row: { original } }) => {
          const today = moment().format("HH:mm");
          const dueDate = moment(new Date(original?.dueDate)).format("HH:mm");
          const startMoment = moment(today, "HH:mm");
          const endMoment = moment(dueDate, "HH:mm");
          const minuteDiff = endMoment.diff(startMoment, "minutes");
          const hours = Math.floor(minuteDiff / 60);
          const minutes = minuteDiff % 60;
          return (
            <Button
              isDisabled={
                hours === 0 && minutes === 0
                  ? true
                  : bidDelay?.isActive && bidDelay?.id === original?.id
                  ? true
                  : false
              }
              btnType="button"
              customClass="bg-blue-900 hover:bg-blue-950 w-full max-w-[8em]"
              handleClick={() => {
                handleAuctionItem(original);
              }}
            >
              Bid
            </Button>
          );
        },
      },
    ],
    [auctionItems, bidDelay]
  );
  return (
    <div>
      <header className="">
        <div className="bg-[#1a1a1a] flex flex-row justify-between items-center border-b w-full h-16 px-2">
          <div className="flex flex-row items-center">
            <span className="md:text-lg text-base font-medium text-[#a4a4a4]">
              Logo
            </span>
          </div>

          <div className="flex items-center">
            <MyDropdown amount={amount} cb={refetchData} />
          </div>
        </div>
      </header>
      <div className="w-full h-full mt-4">
        <div className="px-4 py-2">
          <Table columns={cols} loading={false} data={auctionItems || []} />
        </div>
      </div>
      <BidModal
        bidId={currentAuctionItem?.id}
        bidItem={currentAuctionItem?.itemName}
        show={showModal}
        hide={setShowModal}
        reFetch={refetchDataWithDelay}
      />
    </div>
  );
};

export default Home;
