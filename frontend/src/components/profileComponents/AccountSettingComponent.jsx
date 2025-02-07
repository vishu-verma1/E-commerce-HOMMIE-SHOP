import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Radio from "@mui/material/Radio";
import {
  getProfile,
  passwordUpdateAction,
  profilePictureUpdateAction,
  updateUserAction,
} from "../../redux/actions/userActions";
import Loader from "../Loader";
import { addAddressAction, getAddressAction, updateAddressAction } from "../../redux/actions/addressAction";

import { PlusIcon } from '@heroicons/react/24/solid'

const AccountSettingComponent = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.update.loading);
  const noAddress = useSelector((state) => state.addressData.message);
  const fetchAddresses = useSelector((state) => state.addressData.addresses) || [];
  const passwordUpdateMessage = useSelector((state) => state.passwordUpdate.message);

  const dispatch = useDispatch();
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [activeTab, setActiveTab] = useState("account");
  const [firstname, setFirstname] = useState(user.fullname.firstname);
  const [lastname, setLastname] = useState(user.fullname.lastname);
  const [email, setEmail] = useState(user.email);
  const [mobile, setMobile] = useState(user.mobile);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageName, setImageName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [addressId, setAddressId] = useState("");
  const [defaultValue, setDefaultValue] = useState("");
  const [home, setHome] = useState("");
  const [office, setOffice] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const [addressUpdated, setAddressUpdated] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")


  useEffect(() => {   // fetching address data of user 

    if(addAddressAction){
      dispatch(getAddressAction(token));
    }
      dispatch(getAddressAction(token));
    

  }, [dispatch, token, addressUpdated]);

 


  const handleAddressSelect = (id) => {
    const updatedAddresses = fetchAddresses.map((address) => ({
      ...address,
      selected: address._id === id,
      addressId: address._id,
    }));

    const selectedAddress = updatedAddresses.find((address) => address._id === id);

    if (selectedAddress) {
      dispatch(updateAddressAction(selectedAddress, token));
      setAddressUpdated(!addressUpdated);
    }
  };




  const handleButtonClick = (type) => {
    if (activeButton === type) {
      setActiveButton(""); // will Deselect button
      setDefaultValue(""); // will reset default value
    } else {
      setActiveButton(type); // will Set current button as active
      setDefaultValue(type === "default" ? "default" : "");
      type === "default" ? setDefaultValue(type) : type === "home" ? setHome(type) : setOffice(type);
    }
  };



  const handleEditClick = (address) => { // will open modal with editing updating feature
    setIsModalOpen(true);
    setIsEditing(true);
    setIsLoadingButton(false);
    setAddressId(address._id);
    setCity(address.city);
    setState(address.state);
    setAddress(address.address);
    setZip(address.zip);
  };

  const addAddressButtonHandler = (e) => { // will open modal with adding new address feature
    e.preventDefault();
    setIsEditing(false);
    setIsModalOpen(true);
    setIsLoadingButton(false);
    setAddressId("");
    setCity("");
    setState("");
    setAddress("");
    setZip("");
  }

  const applyHandler = () => { // updating the user 
    const updateUser = {
      fullname: { firstname, lastname },
      email,
      mobile,
    };
    dispatch(updateUserAction(updateUser, token));
    setAddressUpdated(!addressUpdated);
  };



  const handleImageUpload = (e) => {  // handling image upload and also preview
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageName(file.name);
      setImagePreview(URL.createObjectURL(file));
      dispatch(profilePictureUpdateAction(file, token));
    }
  };

  const changPasswordButtonHandler = (e) => {
    e.preventDefault();
    setIsPasswordModalOpen(true);
  };

  const changePasswordHandler = (e) => {
    e.preventDefault();

    setIsPasswordModalOpen(false);
    const password = {
      newpassword: newPassword,
      confirmpassword: confirmPassword,
    }
    dispatch(passwordUpdateAction(password, token));

    setConfirmPassword("");
    setNewPassword("");

  }

  const addNewAddressHandler = () => {   // adding new address 
  
    const addAddress = {
      state,
      city,
      zip,
      address,
      addressType: defaultValue || home || office
    }

    dispatch(addAddressAction(addAddress, token))

    setIsModalOpen(false);
    setIsLoadingButton(true);
    setAddressUpdated(!addressUpdated);

  }

  const saveButtonHandler = () => {  //adress Update

    const updateAddress = {
      state,
      city,
      zip,
      address,
      addressId,
      addressType: defaultValue || home || office
    }

    dispatch(updateAddressAction(updateAddress, token));

    setIsModalOpen(false);
    setIsLoadingButton(true);
    setAddressUpdated(!addressUpdated);
  }



  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-100 md:w-8/12">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap border-b justify-center bg-gray-100 mb-4">
            {["account", "addresses", "payment"].map((tab, index) => (
              <button
                key={index}
                className={`py-2 px-4 border-b-2 transition-all duration-300 ${activeTab === tab
                  ? "border-black font-semibold"
                  : "border-transparent"
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "account" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Account Settings</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="border focus:outline-blue-200 p-2 w-full"
                  placeholder="Firstname"
                />
                <input
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="border focus:outline-blue-200 p-2 w-full"
                  placeholder="Lastname"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4 mt-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border focus:outline-blue-200 p-2 w-full"
                  placeholder="Email address"
                />
                <input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="border focus:outline-blue-200 p-2 w-full"
                  placeholder="Mobile No"
                  type="text"
                />
              </div>

              <div className="mt-5 bg-gray-200 p-4 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="file-upload"
                    className="rounded bg-blue-300 text-center hover:bg-blue-200 px-4 py-2 cursor-pointer"
                  >
                    Choose Profile Picture
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <div>
                    {imageName && <p className="text-sm">{imageName}</p>}
                    {imageName && (
                      <p className="text-xs mt-2 text-blue-500">
                        Successfully Changed!
                      </p>
                    )}
                  </div>
                </div>
                {imagePreview && (
                  <div className="flex items-center gap-4">
                    <img
                      src={imagePreview}
                      alt="Profile Preview"
                      className="w-20 h-20 object-cover rounded-full border border-gray-300"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
                <button className="bg-black text-white px-10 py-2 rounded hover:bg-gray-800 w-full sm:w-auto"
                  onClick={changPasswordButtonHandler}
                >
                  Change Password
                </button>
                <button
                  onClick={applyHandler}
                  className="bg-black text-white px-10 py-2 rounded hover:bg-gray-800 w-full sm:w-auto"
                >
                  Apply Changes
                </button>
              </div>

              {isPasswordModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3 max-h-[90vh] overflow-auto">
                    <h2 className="text-lg md:text-xl font-bold mb-4 text-center">
                      Change Password
                    </h2>

                    <label className="block font-semibold mt-3">New Password</label>
                    <input
                      type="text"
                      className="w-full p-2 border focus:ring-2 outline-none focus:ring-black rounded mt-1"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <label className="block font-semibold">Confirm Password</label>
                    <input
                      type="text"
                      className="w-full p-2 border focus:ring-2 outline-none focus:ring-black rounded mt-1"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <div className=" flex justify-between items-center mt-5">
                      <button
                        className="bg-gray-600 text-white px-12 py-3 hover:bg-gray-700 transition"
                        onClick={() => setIsPasswordModalOpen(false)}
                      >
                        CANCEL
                      </button>

                      <button
                        className="bg-black text-white px-12 py-3 hover:bg-gray-800 transition"
                        onClick={changePasswordHandler}

                      >
                        SAVE
                      </button>
                    </div>

                  </div>



                </div>

              )}

              <div className="w-full flex items-center justify-center mt-3 text-blue-700">
                {passwordUpdateMessage}
              </div>

            </div>



          )}

          {activeTab === "addresses" && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Addresses</h2>

              {noAddress === 'No addresses found' ? (
                <div>
                  <button
                    className="bg-black flex items-center gap-1 text-white px-3 py-2"
                    onClick={addAddressButtonHandler}
                  >
                    ADD ADDRESS <PlusIcon className="h-5" />
                  </button>
                </div>
              ) : (
                Array.isArray(fetchAddresses) &&
                fetchAddresses.map((each, index) => (
                  <div key={index} className="border flex justify-between p-4 rounded-lg shadow-md">
                    <div className="w-full">
                      <div className="flex justify-between items-center">
                        <div className="text-white flex items-center font-semibold text-xs  ">

                          <div className="bg-black p-1 px-2">{each.addressType} </div>
                          <Radio
                            checked={each.selected}
                            onChange={() => handleAddressSelect(each._id)}
                            value={each.id}
                            name="radio-buttons"
                            slotProps={{ input: { 'aria-label': 'select' } }}
                          />
                          <div>

                          </div>


                        </div>
                        <button
                          className="bg-black text-white p-1 px-3 text-sm md:p-2 md:text-base"
                          onClick={() => handleEditClick(each)}
                        >
                          Edit
                        </button>
                      </div>
                      <div className="flex flex-col text-sm md:text-lg gap-2 mt-2">
                        <div>{each.address}</div>
                        <div>{each.city}, {each.state}</div>
                        <div>{each.zip}</div>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3 max-h-[90vh] overflow-auto">
                    <h2 className="text-lg md:text-xl font-bold mb-4 text-center">
                      {isEditing ? "Edit Address" : "Add New Address"}
                    </h2>

                    <label className="block font-semibold mt-3">Address</label>
                    <input
                      type="text"
                      className="w-full p-2 border focus:ring-2 outline-none focus:ring-black rounded mt-1"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 gap-2">
                      <div className="flex-1">
                        <label className="block font-semibold">City</label>
                        <input
                          type="text"
                          className="w-full p-2 border focus:ring-2 outline-none focus:ring-black rounded mt-1"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block font-semibold">State</label>
                        <input
                          type="text"
                          className="w-full p-2 border focus:ring-2 outline-none focus:ring-black rounded mt-1"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        />
                      </div>
                    </div>

                    <label className="block font-semibold mt-3">Zip Code</label>
                    <input
                      type="text"
                      className="w-full sm:w-1/2 p-2 border focus:ring-2 outline-none focus:ring-black rounded mt-1"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                    />

                    <div className="flex justify-around mt-6 items-center">
                      {['default', 'home', 'office'].map((btnType) => (
                        <button
                          key={btnType}
                          className={`px-4 md:px-6 py-2 border ${activeButton === btnType ? "bg-black text-white" : "bg-white text-black"}`}
                          onClick={() => handleButtonClick(btnType)}
                        >
                          {btnType.charAt(0).toUpperCase() + btnType.slice(1)}
                        </button>
                      ))}
                    </div>


                    <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
                      <button
                        className="bg-gray-600 text-white px-12 py-3 hover:bg-gray-700 transition"
                        onClick={() => setIsModalOpen(false)}
                      >
                        CANCEL
                      </button>
                      {noAddress !== 'No addresses found' && isEditing ? (<button
                        className="bg-black text-white px-12 py-3 hover:bg-gray-800 transition"
                        onClick={() => saveButtonHandler(addressId)}
                        disabled={isLoadingButton}
                      >
                        {isLoadingButton ? "SAVING..." : "SAVE"}
                      </button>) : (<button
                        className="bg-black text-white px-12 py-3 hover:bg-gray-800 transition"
                        onClick={addNewAddressHandler}
                        disabled={isLoadingButton}
                      >
                        {isLoadingButton ? "ADDING..." : "ADD"}
                      </button>)}



                    </div>
                  </div>
                </div>
              )}

              {noAddress !== 'No addresses found' && (
                <button
                  onClick={addAddressButtonHandler}
                  className="w-full border border-gray-500 hover:bg-gray-200 p-1 flex justify-center items-center gap-2 mt-5"
                >
                  ADD ADDRESS <PlusIcon className="h-4" />
                </button>
              )}

              {fetchAddresses.length == 5 && <div className="text-red-500 w-full text-sm mt-3 flex justify-center items-center">YOU HAVE REACHED LIMIT OF ADDRESSES, NO MORE ADDRESS CAN BE ADDED !</div>}

            </div>
          )}



          {activeTab === "payment" && (
            <div>
              <h2 className="text-xl font-bold">Payment Options</h2>
              <input
                className="border p-2 w-full mt-2"
                placeholder="Card Number"
              />
              <input className="border p-2 w-full mt-2" placeholder="CVV" />
            </div>
          )}
        </div >
      )}
    </>
  );
};

export default AccountSettingComponent;
