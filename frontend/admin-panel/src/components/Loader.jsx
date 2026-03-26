// const Loader = () => {
//   return (
//     <div className="flex justify-center items-center h-[70vh]">
//       <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
//     </div>
//   );
// };

// export default Loader;



const Loader = () => {
  return (
    <>
      <div className="loader-wrapper">
        <div className="spinner"></div>
      </div>

      {/* INLINE CSS */}
      <style>{`
        .loader-wrapper {
          height: 70vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .spinner {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 4px solid #e6e6e6;
          border-top: 4px solid #00bfa5;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default Loader;
