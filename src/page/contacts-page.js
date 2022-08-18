import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deletedContact,
  fetchContacts,
  refreshContact,
} from '../store/reducers/contacts-slice';

import ErrorMessage from '../components/error-message/error-message';
import SearchPanel from '../components/search-panel';
import { EditContactsForm } from '../components/edit-contacts-form';
import AddFormContact from '../components/add-form-contact';
import { Spinner } from '../components/spinner';

export default function ContactsPage() {
  const { contactsLoadingStatus } = useSelector((state) => state.contacts);
  const contacts = useSelector((state) =>
    state.contacts.contacts.filter((contact) =>
      contact.first_name.toLowerCase().includes(state.search.searchName)
    )
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (contactsLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (contactsLoadingStatus === 'error') {
    return <ErrorMessage />;
  }

  const updateContact = (key, updatedContact) => {
    const contactUpd = { ...contacts };
    contactUpd[key] = updatedContact;

    dispatch(refreshContact(updatedContact));
  };

  const deleteContact = (contact) => {
    dispatch(deletedContact(contact));
  };

  return (
    <div className="container mx-auto mt-10 w-full">
      <div className="flex justify-between mb-10">
        <h1>Contacts List:</h1>
        <SearchPanel />
      </div>

      <table className="min-w-full">
        <thead>
          <tr className="text-xs text-white  text-left bg-gray-400 tracking-wider uppercase">
            <th className="p-2 text-center">avatar</th>
            <th className="p-2">first name</th>
            <th className="p-2">last name</th>
            <th className="p-2">phone</th>
            <th className="p-2">email</th>
            <th className="p-2">country code</th>
            <th className="p-2">city</th>
            <th className="p-2">street address</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          <AddFormContact />
          {Object.keys(contacts).map((key) => {
            return (
              <EditContactsForm
                key={key}
                index={key}
                contact={contacts[key]}
                updateContact={updateContact}
                deleteContact={deleteContact}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
