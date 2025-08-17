import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFriendStore from "../store/useFriendStore";
import { UserRowCard } from "../component/UserRowCard"; // Adjust path as needed
import LoadingSpinner from "../component/Loading";

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // The SearchBar now sends 'q' as the parameter.
  const searchTerm = new URLSearchParams(location.search).get("q");

  const { searchedUsers, searchUsers, clearSearchedUsers } = useFriendStore();

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchTerm) {
        setIsLoading(true);
        await searchUsers(searchTerm);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };
    fetchUsers();
    return () => clearSearchedUsers();
  }, [searchTerm, searchUsers, clearSearchedUsers]);

  const handleUserClick = (user) => {
    clearSearchedUsers(); // 1️⃣ wipe results immediately
    navigate(`/profile/${user.username || user._id}`); // 2️⃣ go to profile
  };
  return (
    <div className='container mx-auto p-4 md:p-8 bg-gray-900 text-white min-h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Search Results</h1>
      {searchTerm && (
        <p className='text-md text-gray-400 mb-6'>
          Results for:{" "}
          <span className='font-semibold text-yellow-400'>"{searchTerm}"</span>
        </p>
      )}

      {isLoading ? (
        <LoadingSpinner />
      ) : searchedUsers.length > 0 ? (
        <div className='flex flex-col gap-2'>
          {searchedUsers.map((user) => (
            <UserRowCard
              key={user._id}
              user={user}
              onClick={() => handleUserClick(user)}
            />
          ))}
        </div>
      ) : (
        <div className='text-center py-20'>
          <p className='text-xl font-bold text-gray-300'>No Users Found</p>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
