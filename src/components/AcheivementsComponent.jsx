"use client";
import React, { useState } from "react";
import { X, Trophy } from "lucide-react";

const AchievementsComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Sample achievements data
  const achievements = [
    {
      id: 1,
      title: "JEE MAINS 2025",
      image: "/bansal-achievements/2025 mains.jpg",
    },
    {
      id: 1,
      title: "JEE ADVANCE 2024",
      image: "/bansal-achievements/2024 adv.jpg",
    },
    {
      id: 1,
      title: "JEE MAINS 2024",
      image: "/bansal-achievements/2024 mains.jpg",
    },
    {
      id: 1,
      title: "JEE NEET 2025",
      image: "/bansal-achievements/2024 neet.jpg",
    },
    {
      id: 1,
      title: "JEE ADVANCE 2023",
      image: "/bansal-achievements/2023 adv.jpg",
    },
    {
      id: 1,
      title: "JEE MAINS 2023",
      image: "/bansal-achievements/2023 mains.jpeg",
    },
    {
      id: 1,
      title: "JEE NEET 2023",
      image: "/bansal-achievements/2023 neet ug.jpeg",
    },
    {
      id: 1,
      title: "JEE ADVANCE 2022",
      image: "/bansal-achievements/2022 avd.png",
    },
    {
      id: 1,
      title: "JEE MAINS 2022",
      image: "/bansal-achievements/2022 main.png",
    },
    {
      id: 1,
      title: "JEE NEET 2022",
      image: "/bansal-achievements/2022 neet.png",
    },
    {
      id: 1,
      title: "JEE ADVANCE 2021",
      image: "/bansal-achievements/2021 adv.png",
    },
    {
      id: 1,
      title: "JEE MAINS 2021",
      image: "/bansal-achievements/2021 main.jpg",
    },
    {
      id: 1,
      title: "JEE ADVANCE 2020",
      image: "/bansal-achievements/2020 adv.jpg",
    },
    {
      id: 1,
      title: "JEE MAINS 2020",
      image: "/bansal-achievements/2020 main.jpg",
    },
    {
      id: 1,
      title: "JEE ADVANCE 2019",
      image: "/bansal-achievements/2019 adv.jpg",
    },
    {
      id: 1,
      title: "JEE MAINS 2019",
      image: "/bansal-achievements/2019 main.jpg",
    },
  ];

  const openModal = (achievement) => {
    setSelectedImage(achievement);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const getIcon = () => {
    return <Trophy className="w-6 h-6" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 py-15 bg-purple-300 border-b-4 border-purple-600 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            My Achievements
          </h1>
          <p className="text-gray-600 text-lg">
            A collection of my academic and professional milestones
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
              onClick={() => openModal(achievement)}
            >
              {/* Achievement Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                <div className="flex items-center gap-3">
                  {getIcon()}
                  <h3 className="text-xl font-semibold">{achievement.title}</h3>
                </div>
              </div>

              {/* Achievement Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={achievement.image || "https://placehold.co/600x400"}
                  alt={achievement.title}
                  className="w-full h-full  transition-transform duration-300 hover:scale-110 object-contain"
                />
                <div className="absolute inset-0  bg-opacity-0 hover:bg-opacity-10 transition-all duration-300"></div>
              </div>

              {/* Achievement Description */}
              {/* <div className="p-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {achievement.description}
                </p>
              </div> */}
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>

              {/* Modal Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  {getIcon()}
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedImage.title}
                  </h2>
                </div>

                <div className="mb-4">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>

                <p className="text-gray-700 leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsComponent;
