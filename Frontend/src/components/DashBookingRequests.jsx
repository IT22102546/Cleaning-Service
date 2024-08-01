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
  const [showAcceptedOnly, setShowAcceptedOnly] = useState(false);
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);
  const [showMore, setShowMore] = useState(true);


  useEffect(() => {
    if (showAcceptedOnly) {
      const fetchAcceptedOnly = async () => {
        try {
          const res = await fetch("/api/book/getacceptedreq");
          const data = await res.json();
          if (res.ok) {
            setRequests(data.accepted);
          }
          setShowMore(false);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchAcceptedOnly();
    } else if (showCompletedOnly) {
      const fetchCompletedOnly = async () => {
        try {
          const res = await fetch("/api/book/getcompletedreq");
          const data = await res.json();
          if (res.ok) {
            setRequests( data.completed);
          }
          setShowMore(false);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchCompletedOnly();
    } else {
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
              data.requests.filter((req) => req.isAccepted).length
            );
            setTotalFinishedRequests(  
              data.requests.filter((req) => req.isCompleted).length
            );
          }
        } catch (error) {
          console.log(error.message);
        }
      };

      if (currentUser.isAdmin) {
        fetchRequests();
      }
    }
  }, [currentUser._id, searchTerm, showAcceptedOnly, showCompletedOnly]);

  /*useEffect(() => {
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
  }, [searchTerm]);*/

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
          ? { ...request, isAccepted: !request.isAccepted }
          : request
      )
    );
    setTotalAcceptRequests(
      (prev) =>
        prev +
        (requests.find((request) => request._id === id).isAccepted ? -1 : 1)
    );
  };

  const handleFinishChange = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request._id === id
          ? { ...request, isCompleted: !request.isCompleted }
          : request
      )
    );
    setTotalFinishedRequests(
      (prev) =>
        prev +
        (requests.find((request) => request._id === id).isCompleted ? -1 : 1)
    );
  };
  
  const handleCheckboxChangeACCEPETED = (e) => {
    setShowAcceptedOnly(e.target.checked);
  };

  const handleCheckboxChangeCOMPLETED = (e) => {
    setShowCompletedOnly(e.target.checked);
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

      <div className="flex flex-row justify-center">
        <div>
          <label>
            Accepeted:
            <input
              type="checkbox"
              checked={showAcceptedOnly}
              onChange={handleCheckboxChangeACCEPETED}
              className="ml-2"
            />
          </label>
        </div>
        <div className="ml-2">
          <label>
            Mark as complete:
            <input
              type="checkbox"
              checked={showCompletedOnly}
              onChange={handleCheckboxChangeCOMPLETED}
              className="ml-2"
            />
          </label>
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
                          checked={item.isAccepted}
                          onChange={() => handleAcceptChange(item._id)}
                        />
                        <p className="ml-3">Accept</p>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          checked={item.isCompleted}
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




/*
const handleAcceptChange = async (id) => {
    const requestToUpdate = requests.find((request) => request._id === id);
    const newAcceptedStatus = !requestToUpdate.isAccepted;
  
    try {
      const res = await fetch(`/api/book/update-book/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAccepted: newAcceptedStatus }),
      });
      if (res.ok) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === id
              ? { ...request, isAccepted: newAcceptedStatus }
              : request
          )
        );
        setTotalAcceptRequests((prev) =>
          newAcceptedStatus ? prev + 1 : prev - 1
        );
      } else {
        console.log("Failed to update request status");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const handleFinishChange = async (id) => {
    const requestToUpdate = requests.find((request) => request._id === id);
    const newCompletedStatus = !requestToUpdate.isCompleted;
  
    try {
      const res = await fetch(`/api/book/update-book/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted: newCompletedStatus }),
      });
      if (res.ok) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === id
              ? { ...request, isCompleted: newCompletedStatus }
              : request
          )
        );
        setTotalFinishedRequests((prev) =>
          newCompletedStatus ? prev + 1 : prev - 1
        );
      } else {
        console.log("Failed to update request status");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
*/ 