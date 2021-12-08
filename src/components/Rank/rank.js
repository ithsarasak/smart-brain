import React from 'react';

const Rank = ({user}) => {
  return (
    <>
      <div className="white f3">
        {`${user.name}, your current count of faces is...`}
      </div>
      <div className="white f1">
        {user.entries}
      </div>
    </>
  );
}

export default Rank;