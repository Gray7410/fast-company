import React from "react";

const SearchStatus = (number) => {
  if (number > 4 || number === 1)
    return number + " человек тусанет с тобой сегодня";
  if (number < 5 && number > 1)
    return number + " человека тусанут с тобой сегодня";
};

export default SearchStatus;
