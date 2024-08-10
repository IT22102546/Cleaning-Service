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
            setRequests(data.completed);
          }
          setShowMore(false);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchCompletedOnly();
    } else if (currentUser.isAdmin) {
      fetchRequests();
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
      if (res.ok) {
        setRequests((prev) =>
          prev.filter((request) => request._id !== bookIdToDelete)
        );
        setTotalRequests((prev) => prev - 1);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAcceptChange = async (id) => {
    const requestToUpdate = requests.find((request) => request._id === id);
    const newAcceptedStatus = !requestToUpdate.isAccepted;

    try {
      const res = await fetch(`/api/book/accept-book/${id}`, {
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
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFinishChange = async (id) => {
    const requestToUpdate = requests.find((request) => request._id === id);
    const newCompletedStatus = !requestToUpdate.isCompleted;

    try {
      const res = await fetch(`/api/book/complete-book/${id}`, {
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
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCheckboxChangeAccepted = (e) => {
    setShowAcceptedOnly(e.target.checked);
  };

  const handleCheckboxChangeCompleted = (e) => {
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

      <div className="flex flex-row justify-start m-5">
        <div>
          <label className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Accepted:
            <input
              type="checkbox"
              checked={showAcceptedOnly}
              onChange={handleCheckboxChangeAccepted}
              className="ml-2"
            />
          </label>
        </div>
        <div className="ml-2">
          <label className="ml-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Mark as complete:
            <input
              type="checkbox"
              checked={showCompletedOnly}
              onChange={handleCheckboxChangeCompleted}
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
              <Table.HeadCell>Accept</Table.HeadCell>
              <Table.HeadCell>Mark as Complete</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {requests.map((request) => (
                <Table.Row key={request._id} className="dark:border-gray-700">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {request.name}
                  </Table.Cell>
                  <Table.Cell>{request.email}</Table.Cell>
                  <Table.Cell>{request.phone}</Table.Cell>
                  <Table.Cell>{request.address}</Table.Cell>
                  <Table.Cell>{request.serviceType}</Table.Cell>
                  <Table.Cell>{formatDate(request.createdAt)}</Table.Cell>
                  <Table.Cell>
                    <Button
                      className={`bg-${
                        request.isAccepted ? "green" : "blue"
                      }-500 text-white`}
                      onClick={() => handleAcceptChange(request._id)}
                    >
                      {request.isAccepted ? "Reject" : "Accept"}
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      className={`bg-${
                        request.isCompleted ? "green" : "blue"
                      }-500 text-white`}
                      onClick={() => handleFinishChange(request._id)}
                    >
                      {request.isCompleted ? "Unmark" : "Mark"}
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      className="bg-red-600 text-white"
                      onClick={() => {
                        setShowModel(true);
                        setBookIdToDelete(request._id);
                      }}
                    >
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {/*showMore && (
            <div className="flex justify-center m-5">
              <Link to="/dashboard/bookings">
                <Button className="bg-green-500 text-white">Show More</Button>
              </Link>
            </div>
          )*/}
        </>
      ) : (
        <div className="flex justify-center p-10 bg-slate-100 rounded-md">
          <h3 className="text-gray-500 text-lg">No booking requests found.</h3>
        </div>
      )}

      <Modal
        show={showModel}
        size="md"
        popup={true}
        onClose={() => setShowModel(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this booking?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                className="bg-red-600 text-white"
                onClick={handleDeleteBooking}
              >
                Yes, I'm sure
              </Button>
              <Button
                className="bg-gray-500 text-white"
                onClick={() => setShowModel(false)}
              >
                No, cancel
              </Button>
            </div>
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