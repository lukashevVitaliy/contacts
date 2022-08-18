import React from 'react';
import error from './error.svg';

export default function ErrorMessage() {
  return (
    <div>
      <div className="w-36 h-full mx-auto my-5">
        <img
          src={error}
          width={100}
          height={100}
          alt="error"
          className="object-cover mx-auto"
        />
        <p className="text-lg text-gray-400 text-center tracking-wider">
          Something went wrong...
        </p>
      </div>
    </div>
  );
}
