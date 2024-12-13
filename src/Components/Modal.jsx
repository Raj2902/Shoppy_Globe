import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

/*Defining proptypes for modal component*/
ModalComponent.propTypes = {
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func,
};

export default function ModalComponent({ openModal, setOpenModal }) {
  const navigate = useNavigate();
  const initalFormData = {
    fullName: "",
    phno: "",
    email: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    landmark: "",
  };
  const [addressForm, setAddressForm] = useState(initalFormData);
  useEffect(() => {
    if (openModal) {
      setAddressForm(
        localStorage.getItem("address")
          ? JSON.parse(localStorage.getItem("address"))
          : initalFormData
      );
    }
  }, [openModal]);
  function onCloseModal() {
    setOpenModal(false);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Address Added Successfully");
    localStorage.setItem("address", JSON.stringify(addressForm));
    setOpenModal(false);
    setAddressForm(initalFormData);
    navigate("/checkout");
  };
  return (
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Delivery Address
          </h3>
          <form className="modalForm" action="#" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="fullName">Full Name</Label>
              </div>
              <TextInput
                id="fullName"
                type="text"
                value={addressForm.fullName}
                onChange={(event) =>
                  setAddressForm({
                    ...addressForm,
                    fullName: event.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="phno">Phone Number</Label>
              </div>
              <TextInput
                id="phno"
                type="number"
                value={addressForm.phno}
                onChange={(event) =>
                  setAddressForm({
                    ...addressForm,
                    phno: event.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email">Email</Label>
              </div>
              <TextInput
                id="email"
                type="email"
                value={addressForm.email}
                onChange={(event) =>
                  setAddressForm({
                    ...addressForm,
                    email: event.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="address">Street Address</Label>
              </div>
              <TextInput
                id="addresss"
                type="text"
                value={addressForm.street}
                onChange={(event) =>
                  setAddressForm({
                    ...addressForm,
                    street: event.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="apartment">Apartment/Suite/Floor Number</Label>
              </div>
              <TextInput
                id="apartment"
                type="text"
                value={addressForm.apartment}
                onChange={(event) =>
                  setAddressForm({
                    ...addressForm,
                    apartment: event.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="city">City/Town</Label>
              </div>
              <TextInput
                id="city"
                type="text"
                value={addressForm.city}
                onChange={(event) =>
                  setAddressForm({
                    ...addressForm,
                    city: event.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="state">State</Label>
              </div>
              <TextInput
                id="state"
                type="text"
                value={addressForm.state}
                onChange={(event) =>
                  setAddressForm({
                    ...addressForm,
                    state: event.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="country">Country</Label>
              </div>
              <TextInput
                id="country"
                type="text"
                value={addressForm.country}
                onChange={(event) =>
                  setAddressForm({
                    ...addressForm,
                    country: event.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="zipcode">Zipcode</Label>
              </div>
              <TextInput
                id="zipcode"
                type="number"
                value={addressForm.zipcode}
                onChange={(event) =>
                  setAddressForm({
                    ...addressForm,
                    zipcode: event.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="landmark">Landmark</Label>
              </div>
              <TextInput
                id="landmark"
                type="text"
                value={addressForm.landmark}
                onChange={(event) =>
                  setAddressForm({
                    ...addressForm,
                    landmark: event.target.value,
                  })
                }
                required
              />
            </div>
            <div className="hand flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300 modal-btns">
              <button type="submit">Save Address</button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
