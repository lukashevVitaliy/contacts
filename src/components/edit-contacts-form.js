import React from 'react';
import { VscTrash } from 'react-icons/vsc';

export const EditContactsForm = ({
  contact,
  updateContact,
  deleteContact,
  index,
}) => {
  const handleChange = (e) => {
    const updatedContact = {
      ...contact,
      [e.currentTarget.name]: e.currentTarget.value,
    };
    updateContact(index, updatedContact);
  };

  return (
    <tr className="text-xs text-gray-400 border-b hover:text-black transition-all">
      <td className="p-2">
        <img
          src={contact.avatar}
          width={50}
          height={50}
          alt="avatar"
          className="mx-auto"
        />
      </td>
      <td>
        <input
          name="first_name"
          type="text"
          placeholder="First Name"
          autoComplete="off"
          value={contact.first_name}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          name="last_name"
          type="text"
          placeholder="Last Name"
          autoComplete="off"
          value={contact.last_name}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          name="phone"
          type="tel"
          placeholder="Phone"
          autoComplete="off"
          value={contact.phone}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="off"
          value={contact.email}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          name="country_code"
          type="text"
          placeholder="Country Code"
          autoComplete="off"
          value={contact.country_code}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          name="city"
          type="text"
          placeholder="City"
          autoComplete="off"
          value={contact.city}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          name="street_address"
          type="text"
          placeholder="Street Address"
          autoComplete="off"
          value={contact.street_address}
          onChange={handleChange}
        />
      </td>
      <td className="p-2">
        <button type="submit" onClick={() => deleteContact(contact)}>
          <VscTrash className="w-5 h-5 hover:text-red-400 active:text-red-600" />
        </button>
      </td>
    </tr>
  );
};
