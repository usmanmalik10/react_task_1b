import React, { useState, useEffect } from 'react';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const loadVideos = async (page) => {
    const token = "<token>";
    const response = await fetch("https://reacttask.mkdlabs.com/v1/api/rest/video/PAGINATE", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-project": "cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        "payload": {},
        "page": page,
        "limit": 10
      })
    });

    const data = await response.json();

    if (response.ok) {
      setVideos(data.list);
      setTotalPages(data.num_pages);
    } else {
      console.error(data);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    loadVideos(currentPage);
  }, [currentPage]);

  return (
    <div>
      <h1>Video List</h1>
      {videos.map((video) => (
        <div key={video.id}>
          <h2>{video.title}</h2>
          <img src={video.photo} alt="Video Thumbnail" />
          <p>Uploaded by {video.username}</p>
          <p>Likes: {video.like}</p>
        </div>
      ))}
      <div>
        <button className="bg-blue-500 ml-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <button className="bg-blue-500 ml-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default VideoList;
