import React, { useState } from 'react';

const DoctorAvatar = ({ doctor, size = 35, showTitle = true }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const getInitials = () => {
    if (doctor.firstName) {
      return doctor.firstName.charAt(0).toUpperCase();
    }
    return 'D';
  };

  const getGradientColors = () => {
    const colors = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-blue-600',
      'from-purple-500 to-pink-600',
      'from-orange-500 to-red-600',
      'from-teal-500 to-green-600'
    ];
    const index = doctor.id ? (doctor.id - 1) % colors.length : 0;
    return colors[index];
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`relative w-[${size}px] h-[${size}px] rounded-full overflow-hidden bg-gradient-to-br ${getGradientColors()} flex items-center justify-center`}>
        {doctor.doctorimg && !imageError ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-full" />
            )}
            <img
              src={doctor.doctorimg}
              className={`w-full h-full object-cover ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}
              alt={`Dr. ${doctor.firstName}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </>
        ) : null}
        <div 
          className={`w-full h-full rounded-full bg-gradient-to-br ${getGradientColors()} flex items-center justify-center text-white font-bold text-sm absolute inset-0`}
          style={{ display: (doctor.doctorimg && !imageError) ? 'none' : 'flex' }}
        >
          {getInitials()}
        </div>
      </div>
      
      {showTitle && (
        <div className="flex flex-col">
          <span className="font-semibold text-white">
            Dr. {doctor.firstName} {doctor.lastName || ""}
          </span>
          <span className="text-xs text-gray-400">
            {doctor.designation || "Doctor"}
          </span>
        </div>
      )}
    </div>
  );
};

export default DoctorAvatar; 