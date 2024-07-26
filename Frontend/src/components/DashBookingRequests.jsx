import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiGift, HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import html2pdf from 'html2pdf.js';
import { data } from "autoprefixer";

export default function DashBookingRequests() {
  const { currentUser } = useSelector((state) => state.user);
  const [requests, setRequests] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [bookIdToDelete, setBookIdToDelete] = useState('');
  const [totalRequests, setTotalRequests] = useState(0);
  const [lastMonthRequests, setlastMonthRequests] = useState(0);
  //const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch(`/api/book/get-bookings`);
        const data = await res.json();
        if (res.ok) {
          setRequests(data.requests);
          setTotalRequests(data.totalRequests);
          setlastMonthRequests(data.lastMonthRequests);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchRequests();
  }, [data]);

  const handleDeleteBooking = async () => {
    setShowModel(false);
    try {
      const res = await fetch(
        `/api/products/deleteproduct/${bookIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setRequests((prev) =>
          prev.filter((product) => product._id !== bookIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const generatePDFReport = () => {
//     const content = `
//       <style>
//         table {
//           width: 100%;
//           border-collapse: collapse;
//         }
//         th, td {
//           padding: 8px;
//           text-align: left;
//           border-bottom: 1px solid #ddd;
//         }
//         th {
//           background-color: #f2f2f2;
//           font-size: 14px; /* Adjust font size */
//         }
//         td {
//           font-size: 12px; /* Adjust font size */
//         }
//       </style>
//       <h1><b>Product Details Report</b></h1>
//       <p>Total Products: ${totalProducts}</p>
//       <p>Last Month Products: ${lastMonthProducts}</p>
//       <br>
//       <br>
//       <table>
//         <thead>
//           <tr>
//             <th>Updated At</th>
//             <th>Title</th>
//             <th>Category</th>
//             <th>Unit Price</th>
//             <th>Quantity</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${userProduct.map((product) => `
//             <tr>
//               <td>${new Date(product.createdAt).toLocaleDateString()}</td>
//               <td>${product.title}</td>
//               <td>${product.category}</td>
//               <td>${product.price}</td>
//               <td>${product.quantity}</td>
//             </tr>
//           `).join('')}
//         </tbody>
//       </table>
//     `;

//     html2pdf().from(content).set({ margin: 1, filename: 'product_report.pdf' }).save();
//   };

//   const handleGenerateReport = () => {
//     generatePDFReport();
//   };
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className='mt-24 table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      <section className="hero-section"></section>
      <div className='flex justify-between'>
        {/* <input
          type="text"
          placeholder="Search Products.."
          value={searchTerm}
          onChange={handleSearch}
          className="px-3 py-2 w-150 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mr-2 h-10 dark:bg-slate-800 placeholder-gray-500"
        /> */}
        <div></div>
        <Button
          gradientDuoTone='purpleToBlue'
          outline
         
          className=""
        >
          Generate Report
        </Button>
      </div>

      <div className='flex-wrap flex gap-4 justify-center p-3'>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>Total Requests</h3>
              <p className='text-2xl'>{totalRequests}</p>
            </div>
            <HiGift className='bg-red-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
        </div>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>
                Last Month Requests
              </h3>
              <p className='text-2xl'>{lastMonthRequests}</p>
            </div>
            <HiGift className='bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
        </div>
      </div>
      {currentUser.isAdmin && requests.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Book Id</Table.HeadCell>
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
              <Table.Body className='divide-y' key={item._id}>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{item.bookId}</Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.email}</Table.Cell>
                  <Table.Cell>{item.phone}</Table.Cell>
                  <Table.Cell>{item.address}, {item.city} <br /> {item.state} <br /> {item.zip}</Table.Cell>
                  <Table.Cell>{item.serviceType}</Table.Cell>
                  <Table.Cell>{formatDate(item.date)}</Table.Cell>
                  <Table.Cell>{item.paymentMethod}</Table.Cell>
                  <Table.Cell>
                    <div className="flex flex-row justify-center">
                        <Link >
                            <box-icon name='check-circle' color="green"></box-icon>
                        </Link>
                        <Link>
                            <box-icon name='edit-alt' color="orange"></box-icon>
                        </Link>
                        <Link onClick={() => {
                        setShowModel(true);
                        setBookIdToDelete(item._id);
                      }}>
                            <box-icon name='x-circle' color="red"></box-icon>
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
      <Modal show={showModel} onClose={() => setShowModel(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">Are you sure you want to Delete this Booking</h3>
          </div>
          <div className='flex justify-center gap-4'>
            <Button color='failure' onClick={handleDeleteBooking}>
              Yes, I am sure
            </Button>
            <Button color='gray' onClick={() => setShowModel(false)}>
              No, cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
