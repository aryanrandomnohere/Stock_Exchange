import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { fetchWallet } from "../redux/wallet/walletSlice";

const Transaction = ({ symbol, price, name, onTransaction }) => {
  const { currentUser } = useSelector((state) => state.user);  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [quantity, setQuantity] = useState(0);


  const handlestock = async () => {
    try{
      const stockResponse = await fetch("http://localhost:3000/stocks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          symbol,
          price,
        }),
      });
      const stockData = await stockResponse.json();
      if(stockData){
        toast.success("success")
      }
    }
    catch(e){
      toast.error("some error")
    }
  }

  const handleBuy = async () => {
    try {
      // Create or update stock
      const stockResponse = await fetch("http://localhost:3000/stocks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          symbol,
          price,
        }),
      });
  
      if (!stockResponse.ok) {
        throw new Error("Failed to create or update stock");
      }
  
      const stockData = await stockResponse.json();
      const stockId = stockData.stock ? stockData.stock._id : stockData._id;
  
      if (!stockId) {
        throw new Error("Stock ID is missing in response");
      }
  
      // Create transaction using the returned stock ID
      const transactionResponse = await fetch(
        `http://localhost:3000/transaction/${currentUser.user._id}/${stockId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity,
            type: "buy",
          }),
        }
      );
  
      if (!transactionResponse.ok) {
        const transactionData = await transactionResponse.json();
        throw new Error(
          transactionData.message || "Failed to create transaction"
        );
      }
  
      const transactionData = await transactionResponse.json();
      toast.success(transactionData.message);
      setOpenModal(false);
      dispatch(fetchWallet());
      onTransaction();
    } catch (error) {
      toast.error(`Error making the buy transaction: ${error.message}`);
    }
  };




  const handleSell = async () => {
    try {
      // Create or update stock
      const stockResponse = await fetch("http://localhost:3000/stocks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          symbol,
          price,
        }),
      });
  
      if (!stockResponse.ok) {
        throw new Error("Failed to create or update stock");
      }
  
      const stockData = await stockResponse.json();
      const stockId = stockData.stock ? stockData.stock._id : stockData._id;
  
      if (!stockId) {
        throw new Error("Stock ID is missing in response");
      }
  
      // Create transaction using the returned stock ID
      const transactionResponse = await fetch(
        `http://localhost:3000/transaction/${currentUser.user._id}/${stockId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity,
            type: "sell",
          }),
        }
      );
  
      const transactionData = await transactionResponse.json();
      if (!transactionResponse.ok) {
        throw new Error(
          transactionData.message || "Failed to create transaction"
        );
      }
  
      toast.success(transactionData.message);
      setOpenModal(false);
      dispatch(fetchWallet());
      onTransaction();
    } catch (error) {
      toast.error(`Error making the sell transaction: ${error.message}`);
    }
  };

  return (
    <div className="">
      <Button color="dark" className="text-lg font-bold focus:ring-4 focus:ring-gray-300" onClick={() => setOpenModal(true)}>Open Transaction Modal</Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup={true}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Choose your action
            </h3>
            <div className="flex flex-col items-center gap-4">
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="mb-4 p-2 border rounded"
                placeholder="Quantity"
              />
              <div className="flex justify-center gap-4">
                <Button color="success" onClick={handleBuy}>
                  Buy
                </Button>
                <Button color="failure" onClick={handleSell}>
                  Sell
                </Button>
                <Button color="failure" onClick={handlestock}>
                  Stock
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Transaction;
