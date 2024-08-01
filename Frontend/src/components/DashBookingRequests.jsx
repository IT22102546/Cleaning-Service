import { Button, Checkbox, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiGift, HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashBookingRequests() {
  const { currentUser } = useSelector((state) => state.user);
  const [requests, setRequests] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [bookIdToDelete, setBookIdToDelete] = useState("");
  const [totalRequests, setTotalRequests] = useState(0);
  const [totalAcceptRequests, setTotalAcceptRequests] = useState(0);
  const [totalFinishedRequests, setTotalFinishedRequests] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch(
          `/api/book/get-bookings?searchTerm=${searchTerm}`
        );
        const data = await res.json();
        if (res.ok) {
          setRequests(data.requests);
          setTotalRequests(data.totalRequests);
          setTotalAcceptRequests(
            data.requests.filter((req) => req.accepted).length
          );
          setTotalFinishedRequests(
            data.requests.filter((req) => req.finished).length
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    
    fetchRequests();
  }, [searchTerm]);

  const handleDeleteBooking = async () => {
    setShowModel(false);
    try {
      const res = await fetch(`/api/book/delete-book/${bookIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setRequests((prev) =>
          prev.filter((request) => request._id !== bookIdToDelete)
        );
        setTotalRequests((prev) => prev - 1);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAcceptChange = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request._id === id
          ? { ...request, accepted: !request.accepted }
          : request
      )
    );
    setTotalAcceptRequests(
      (prev) =>
        prev +
        (requests.find((request) => request._id === id).accepted ? -1 : 1)
    );
  };

  const handleFinishChange = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request._id === id
          ? { ...request, finished: !request.finished }
          : request
      )
    );
    setTotalFinishedRequests(
      (prev) =>
        prev +
        (requests.find((request) => request._id === id).finished ? -1 : 1)
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="mt-24 table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <section className="hero-section"></section>

      <div className="flex flex-row justify-center">
        <div className="flex-wrap flex gap-4 justify-center p-3">
          <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
            <div className="flex justify-between">
              <div className="">
                <h3 className="text-gray-500 text-md uppercase">
                  Total Requests
                </h3>
                <p className="text-2xl">{totalRequests}</p>
              </div>
              <HiGift className="bg-orange-500 text-white rounded-full text-5xl p-3 shadow-lg" />
            </div>
          </div>
        </div>

        <div className="flex-wrap flex gap-4 justify-center p-3">
          <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
            <div className="flex justify-between">
              <div className="">
                <h3 className="text-gray-500 text-md uppercase">Accepted</h3>
                <p className="text-2xl">{totalAcceptRequests}</p>
              </div>
              <HiGift className="bg-green-600 text-white rounded-full text-5xl p-3 shadow-lg" />
            </div>
          </div>
        </div>

        <div className="flex-wrap flex gap-4 justify-center p-3">
          <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
            <div className="flex justify-between">
              <div className="">
                <h3 className="text-gray-500 text-md uppercase">Finished</h3>
                <p className="text-2xl">{totalFinishedRequests}</p>
              </div>
              <HiGift className="bg-red-600 text-white rounded-full text-5xl p-3 shadow-lg" />
            </div>
          </div>
        </div>
      </div>

      {currentUser.isAdmin && requests.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Phone</Table.HeadCell>
              <Table.HeadCell>Address</Table.HeadCell>
              <Table.HeadCell>Service Type</Table.HeadCell>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Payment Method</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            {requests.map((item) => (
              <Table.Body className="divide-y" key={item._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.email}</Table.Cell>
                  <Table.Cell>{item.phone}</Table.Cell>
                  <Table.Cell>
                    {item.address}, {item.city} <br /> {item.state} <br />{" "}
                    {item.zip}
                  </Table.Cell>
                  <Table.Cell>{item.serviceType}</Table.Cell>
                  <Table.Cell>{formatDate(item.date)}</Table.Cell>
                  <Table.Cell>{item.paymentMethod}</Table.Cell>
                  <Table.Cell>
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center">
                        
                        <Checkbox
                          checked={item.accepted}
                          onChange={() => handleAcceptChange(item._id)}
                        />
                        <p className="ml-3">Accept</p>

                      </div>
                      <div className="flex items-center">
                        
                        <Checkbox
                          checked={item.finished}
                          onChange={() => handleFinishChange(item._id)}
                        />
                        <p className="ml-3">Mark as Complete</p>
                      </div>
                      <Link
                        onClick={() => {
                          setShowModel(true);
                          setBookIdToDelete(item._id);
                        }}
                      >
                        <box-icon name="x-circle" color="red"></box-icon>
                      </Link>
                      
                    </div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>You have no products to show</p>
      )}
      <Modal
        show={showModel}
        onClose={() => setShowModel(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">
              Are you sure you want to Delete this Booking
            </h3>
          </div>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleDeleteBooking}>
              Yes, I am sure
            </Button>
            <Button color="gray" onClick={() => setShowModel(false)}>
              No, cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
