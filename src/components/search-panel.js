import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { searchContact } from '../store/reducers/search-slice';

export default function SearchPanel() {
  const [firstNameSearch, setFirstNameSearch] = useState('');
  const dispatch = useDispatch();

  const handleClick = () => {
    if (firstNameSearch) {
      dispatch(searchContact(firstNameSearch));
    } else {
      dispatch(searchContact(''));
    }
  };

  return (
    <div className="flex items-center border-b">
      <input
        id="search-panel"
        name="first_name"
        type="text"
        placeholder="Search First Name"
        autoComplete="off"
        value={firstNameSearch}
        onChange={(e) => setFirstNameSearch(e.target.value)}
      />
      <button className="px-2" onClick={handleClick}>
        <BsSearch className="text-gray-400" />
      </button>
    </div>
  );
}
