import { Alert, Button, Select, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdateBooking() {
  const [formData, setFormData] = useState({
    serviceType: 'regular',
    payment: 'credit-card',
    title: '',
    category: 'GeneralCommercialCleaning',
    description: '',
    date: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    allergies: '',
    additional: ''
  });
  const [publishError, setPublishError] = useState(null);
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await fetch(`/api/book/get-bookings?bookId=${bookId}`);
        const data = await res.json();
        if (!res.ok) {
          setPublishError(data.message);
          return;
        }
        const booking = data.requests;

        setFormData({
          ...booking,
          serviceType: booking.serviceType || 'regular',
          paymentMethod: booking.payment || 'credit-card',
          
          category: booking.category || 'GeneralCommercialCleaning',
          date: booking.date || '',
          name: booking.name || '',
          email: booking.email || '',
          phone: booking.phone || '',
          address: booking.address || '',
          city: booking.city || '',
          state: booking.state || '',
          zip: booking.zip || '',
          allergies: booking.allergies || '',
          additional: booking.additional || ''
        });
        setPublishError(null);
      } catch (error) {
        setPublishError(error.message);
      }
    };

    fetchBooking();
  }, [bookId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/book/update-book/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate('/dashboard?tab=bookings');
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <section className="hero-section"></section>

      <h1 className="text-center text-3xl my-7 font-semibold mt-24">Update Bookings</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={handleChange}
            value={formData.title}
          />
          <Select
            id="category"
            onChange={handleChange}
            value={formData.category}
          >
            <option value="GeneralCommercialCleaning">General Commercial Cleaning</option>
            <option value="HighPresureWaterBlasting">High Presure Water Blasting</option>
            <option value="CarpetSteamCleaningandMaintains">Carpet Steam Cleaning and Maintains</option>
            <option value="BuildersCleaning">Builders Cleaning</option>
            <option value="BondCleaning">Bond Cleaning</option>
            <option value="HouseResidentalCleaning">House / Residental Cleaning</option>
            <option value="OfficeCleaning">Office Cleaning</option>
            <option value="WarehouseCleaning">Warehouse Cleaning</option>
            <option value="HospitalCleaning">Hospital Cleaning</option>
            <option value="SchoolCleaning">School Cleaning</option>
            <option value="NewlyConstructedCleaning">Newly Constructed Cleaning</option>
            <option value="GovernmentProjecCleaning">Government Projec Cleaning</option>
            <option value="HotelCleaning">Hotel Cleaning</option>
            <option value="RestaurentCleaning">Restaurent Cleaning</option>
            <option value="OfficeBoyandMaidService">Office Boy and Maid Service</option>
          </Select>
        </div>

        <TextInput
          type='text'
          placeholder='Your Name'
          required
          id='name'
          className='flex-1'
          onChange={handleChange}
          value={formData.name}
        />

        <TextInput
          type='email'
          placeholder='Email'
          required
          id='email'
          className='flex-1'
          onChange={handleChange}
          value={formData.email}
        />

        <TextInput
          type='tel'
          placeholder='Phone Number'
          required
          id='phone'
          className='flex-1'
          onChange={handleChange}
          value={formData.phone}
        />

        <Select
          id="serviceType"
          onChange={handleChange}
          value={formData.serviceType}
        >
          <option value="regular">Regular</option>
          <option value="emergency">Emergency</option>
        </Select>

        <TextInput
          type='date'
          id='date'
          className='flex-1'
          onChange={handleChange}
          value={formData.date}
        />

        <TextInput
          type='text'
          placeholder='Street Address'
          required
          id='address'
          className='flex-1'
          onChange={handleChange}
          value={formData.address}
        />

        <TextInput
          type='text'
          placeholder='City'
          required
          id='city'
          className='flex-1'
          onChange={handleChange}
          value={formData.city}
        />

        <TextInput
          type='text'
          placeholder='State/Province'
          required
          id='state'
          className='flex-1'
          onChange={handleChange}
          value={formData.state}
        />

        <TextInput
          type='text'
          placeholder='Zip/Postal Code'
          required
          id='zip'
          className='flex-1'
          onChange={handleChange}
          value={formData.zip}
        />

        <Select
          id="payment"
          onChange={handleChange}
          value={formData.payment}
        >
          <option value="credit-card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="cash">Cash</option>
        </Select>

        <Textarea
          placeholder="Any allergies or sensitivities"
          className="h-24 mb-4"
          onChange={handleChange}
          id="allergies"
          value={formData.allergies}
        />

        <Textarea
          placeholder="Special instructions or requests"
          className="h-24 mb-4"
          onChange={handleChange}
          id="additional"
          value={formData.additional}
        />

        <Textarea
          placeholder="Description..."
          className="h-52 mb-12"
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          value={formData.description}
        />
        
        <Button type='submit' gradientDuoTone='purpleToBlue'>Update</Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>

    </div>
  );
}
