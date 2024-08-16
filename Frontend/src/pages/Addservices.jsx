import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

export default function AddProducts() {
  const [files, setFiles] = useState([null, null, null, null]);
  const [imageUploadProgress, setImageUploadProgress] = useState([
    null,
    null,
    null,
    null,
  ]);
  const [imageUploadError, setImageUploadError] = useState([
    null,
    null,
    null,
    null,
  ]);
  const [videoFile, setVideoFile] = useState(null); // State for video file
  const [videoUploadProgress, setVideoUploadProgress] = useState(null); // Progress state for video upload
  const [videoUploadError, setVideoUploadError] = useState(null); // Error state for video upload
  const [videoURL, setVideoURL] = useState(null); // State for storing video URL
  const [formData, setFormData] = useState({ images: [], video: "" });
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const handleFileChange = (index, file) => {
    const newFiles = [...files];
    newFiles[index] = file;
    setFiles(newFiles);
  };

  const handleVideoFileChange = (file) => {
    setVideoFile(file);
  };

  const handleUploadImage = (index) => {
    const file = files[index];
    if (!file) {
      const newErrors = [...imageUploadError];
      newErrors[index] = "Please select an image";
      setImageUploadError(newErrors);
      return;
    }
    const newErrors = [...imageUploadError];
    newErrors[index] = null;
    setImageUploadError(newErrors);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        const newProgress = [...imageUploadProgress];
        newProgress[index] = progress.toFixed(0);
        setImageUploadProgress(newProgress);
      },
      (error) => {
        const newErrors = [...imageUploadError];
        newErrors[index] = "Image upload failed";
        setImageUploadError(newErrors);
        const newProgress = [...imageUploadProgress];
        newProgress[index] = null;
        setImageUploadProgress(newProgress);
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const newProgress = [...imageUploadProgress];
          newProgress[index] = null;
          setImageUploadProgress(newProgress);
          const newErrors = [...imageUploadError];
          newErrors[index] = null;
          setImageUploadError(newErrors);
          const newImages = [...formData.images];
          newImages[index] = downloadURL;
          setFormData({ ...formData, images: newImages });
        });
      }
    );
  };

  const handleUploadVideo = () => {
    if (!videoFile) {
      setVideoUploadError("Please select a video");
      return;
    }
    setVideoUploadError(null);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + videoFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, videoFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setVideoUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setVideoUploadError("Video upload failed");
        setVideoUploadProgress(null);
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setVideoUploadProgress(null);
          setVideoUploadError(null);
          setVideoURL(downloadURL);
          setFormData({ ...formData, video: downloadURL });
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          mainImage: formData.images[mainImageIndex],
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/product/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="relative bg-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center mt-20">
          <section className="hero-section"></section>
          <div className="p-3 max-w-3xl mx-auto min-h-screen">
            <h1 className="text-center text-3xl my-7 font-semibold">
              Add Services
            </h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <TextInput
                  type="text"
                  placeholder="Title"
                  required
                  id="title"
                  className="flex-1"
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
                <Select
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="" disabled>Please select one</option>
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
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3"
                >
                  <FileInput
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(index, e.target.files[0])}
                  />
                  <Button
                    onClick={() => handleUploadImage(index)}
                    type="button"
                    size="sm"
                    outline
                    disabled={imageUploadProgress[index]}
                    className="bg-slate-400"
                  >
                    {imageUploadProgress[index] ? (
                      <div className="w-16 h-16">
                        <CircularProgressbar
                          value={imageUploadProgress[index]}
                          text={`${imageUploadProgress[index] || 0}`}
                        />
                      </div>
                    ) : (
                      "Upload Image"
                    )}
                  </Button>
                  <Button
                    onClick={() => setMainImageIndex(index)}
                    type="button"
                    size="sm"
                    className={`bg-slate-400 ${
                      mainImageIndex === index ? "bg-teal-500" : ""
                    }`}
                  >
                    {mainImageIndex === index
                      ? "Main Image"
                      : "Set Secondary Image"}
                  </Button>
                </div>
              ))}
              {imageUploadError.map(
                (error, index) =>
                  error && (
                    <Alert key={index} color="failure">
                      {error}
                    </Alert>
                  )
              )}
              {formData.images.map(
                (image, index) =>
                  image && (
                    <img
                      key={index}
                      src={image}
                      alt="upload"
                      className="w-full h-82 object-cover"
                    />
                  )
              )}
              {/* Video upload section */}
              <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                <FileInput
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleVideoFileChange(e.target.files[0])}
                />
                <Button
                  onClick={handleUploadVideo}
                  type="button"
                  size="sm"
                  outline
                  disabled={videoUploadProgress}
                  className="bg-slate-400"
                >
                  {videoUploadProgress ? (
                    <div className="w-16 h-16">
                      <CircularProgressbar
                        value={videoUploadProgress}
                        text={`${videoUploadProgress || 0}`}
                      />
                    </div>
                  ) : (
                    "Upload Video"
                  )}
                </Button>
              </div>
              {videoUploadError && (
                <Alert color="failure">{videoUploadError}</Alert>
              )}
              {videoURL && (
                <video
                  controls
                  src={videoURL}
                  className="w-full h-82 object-cover mt-4"
                />
              )}
              <ReactQuill
                theme="snow"
                placeholder="Description..."
                className="h-52 mb-12"
                onChange={(value) => {
                  const sanitizedValue = value.replace(/<\/?[^>]+(>|$)/g, "");
                  setFormData({ ...formData, description: sanitizedValue });
                }}
              />
              <Button type="submit" className="bg-slate-400">
                Add Products
              </Button>
              {publishError && (
                <Alert className="mt-5" color="failure">
                  {publishError}
                </Alert>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
