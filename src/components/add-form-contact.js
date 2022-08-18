import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { ImAddressBook } from 'react-icons/im';
import { v4 as uuidv4 } from 'uuid';
import { createNewContact } from '../store/reducers/contacts-slice';

export default function AddFormContact() {
  const [firstNameContact, setFirstNameContact] = useState('');
  const [lastNameContact, setLastNameContact] = useState('');
  const [phoneContact, setPhoneContact] = useState('');
  const [emailContact, setEmailContact] = useState('');
  const [countryCodeContact, setCountryCodeContact] = useState('');
  const [cityContact, setCityContact] = useState('');
  const [streetAddressContact, setStreetAddressContact] = useState('');
  const dispatch = useDispatch();

  const addNewContact = (e) => {
    const newContact = {
      id: uuidv4(),
      avatar: 'https://a.deviantart.net/avatars/a/7/a7jukai.jpg?4',
      first_name: firstNameContact,
      last_name: lastNameContact,
      phone: phoneContact,
      email: emailContact,
      country_code: countryCodeContact,
      city: cityContact,
      street_address: streetAddressContact,
    };

    if (
      newContact.first_name.length > 0 &&
      newContact.last_name.length > 0 &&
      newContact.phone.length > 0 &&
      newContact.email.length > 0 &&
      newContact.country_code.length > 0 &&
      newContact.city.length > 0 &&
      newContact.street_address.length > 0
    ) {
      dispatch(createNewContact(newContact));
      setFirstNameContact('');
      setLastNameContact('');
      setPhoneContact('');
      setEmailContact('');
      setCountryCodeContact('');
      setCityContact('');
      setStreetAddressContact('');
    } else {
      alert('Пожалуйста, заполните все данные...');
    }
  };

  return (
    <tr className="text-xs border-b-2 border-green-600">
      <td className="p-2">
        <ImAddressBook className="w-5 h-5 text-green-600 mx-auto" />
      </td>
      <td>
        <input
          name="first_name"
          type="text"
          placeholder="Add First Name"
          autoComplete="off"
          value={firstNameContact}
          onChange={(e) => setFirstNameContact(e.target.value)}
        />
      </td>
      <td>
        <input
          name="last_name"
          type="text"
          placeholder="Add Last Name"
          autoComplete="off"
          value={lastNameContact}
          onChange={(e) => setLastNameContact(e.target.value)}
        />
      </td>
      <td>
        <input
          name="phone"
          type="tel"
          placeholder="Add Phone"
          autoComplete="off"
          value={phoneContact}
          onChange={(e) => setPhoneContact(e.target.value)}
        />
      </td>
      <td>
        <input
          name="email"
          type="email"
          placeholder="Add Email"
          autoComplete="off"
          value={emailContact}
          onChange={(e) => setEmailContact(e.target.value)}
        />
      </td>
      <td>
        <input
          name="country_code"
          type="text"
          placeholder="Add Country Code"
          autoComplete="off"
          value={countryCodeContact}
          onChange={(e) => setCountryCodeContact(e.target.value)}
        />
      </td>
      <td>
        <input
          name="city"
          type="text"
          placeholder="Add City"
          autoComplete="off"
          value={cityContact}
          onChange={(e) => setCityContact(e.target.value)}
        />
      </td>
      <td>
        <input
          name="street_address"
          type="text"
          placeholder="Add Street Address"
          autoComplete="off"
          value={streetAddressContact}
          onChange={(e) => setStreetAddressContact(e.target.value)}
        />
      </td>
      <td className="p-2">
        <button onClick={addNewContact}>
          <MdPersonAddAlt1 className="w-5 h-5 mx-auto text-gray-400 hover:text-green-600 active:text-green-700 transition-all" />
        </button>
      </td>
    </tr>
  );
}
