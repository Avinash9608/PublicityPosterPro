// import React, { useRef, useEffect, useState } from 'react';
// import html2canvas from 'html2canvas';

// const PreviewCard = ({
//   template,
//   backgroundImage,
//   title,
//   description,
//   footerLeft,
//   footerRight,
//   style,
//   onTextPositionChange
// }) => {
//   const posterRef = useRef(null);
//   const textRef = useRef(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [position, setPosition] = useState({
//     left: template.textPosition?.left || '50%',
//     top: template.textPosition?.top || '50%',
//     transform: template.textPosition?.transform || 'translate(-50%, -50%)',
//     textAlign: template.textPosition?.textAlign || 'center',
//     width: template.textPosition?.width || '90%'
//   });
//   const [startPos, setStartPos] = useState({ x: 0, y: 0 });
//   const limit = { x: 15, y: 3 };

//   const handleDownload = () => {
//     html2canvas(posterRef.current).then(canvas => {
//       const link = document.createElement('a');
//       link.download = 'poster.png';
//       link.href = canvas.toDataURL('image/png');
//       link.click();
//     });
//   };

//   const handleMouseDown = (e) => {
//     if (e.button !== 0) return;

//     const rect = posterRef.current.getBoundingClientRect();
//     const textRect = textRef.current.getBoundingClientRect();

//     const currentX = textRect.left - rect.left;
//     const currentY = textRect.top - rect.top;

//     setStartPos({
//       x: e.clientX - currentX,
//       y: e.clientY - currentY
//     });

//     setIsDragging(true);
//     e.preventDefault();
//     e.stopPropagation();
//   };

//  const handleMouseMove = (e) => {
//   if (!isDragging) return;

//   const rect = posterRef.current.getBoundingClientRect();
//   const textRect = textRef.current.getBoundingClientRect();

//   let newX = e.clientX - startPos.x;
//   let newY = e.clientY - startPos.y;

//   newX = Math.max(0, Math.min(newX, rect.width - textRect.width));
//   newY = Math.max(0, Math.min(newY, rect.height - textRect.height));

//   const newPosition = {
//     left: `${newX}px`,
//     top: `${newY}px`,
//     transform: 'none',
//     textAlign: position.textAlign,
//     width: position.width
//   };

//   setPosition(newPosition);
//   if (onTextPositionChange) {
//     onTextPositionChange(newPosition);
//   }
// };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   useEffect(() => {
//     if (isDragging) {
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//       return () => {
//         document.removeEventListener('mousemove', handleMouseMove);
//         document.removeEventListener('mouseup', handleMouseUp);
//       };
//     }
//   }, [isDragging, startPos]);

//   useEffect(() => {
//     setPosition({
//       left: template.textPosition?.left || '50%',
//       top: template.textPosition?.top || '50%',
//       transform: template.textPosition?.transform || 'translate(-50%, -50%)',
//       textAlign: template.textPosition?.textAlign || 'center',
//       width: template.textPosition?.width || '90%'
//     });
//   }, [template]);

//   useEffect(() => {
//     if (template.type === 'parallax' && posterRef.current) {
//       const handleParallaxMove = (e) => {
//         const rect = posterRef.current.getBoundingClientRect();
//         const mouse = {
//           x: e.clientX - rect.left,
//           y: e.clientY - rect.top
//         };
//         const clamped = {
//           x: (mouse.x / rect.width * limit.x - (limit.x / 2)),
//           y: (mouse.y / rect.height * limit.y - (limit.y / 2))
//         };

//         const layers = posterRef.current.querySelectorAll('.parallax-layer');
//         layers.forEach((layer, i) => {
//           const depth = template.layers[i].depth || 0;
//           layer.style.transform = `translateX(${clamped.x * depth * -1}px) translateY(${clamped.y * depth * -1}px)`;
//         });
//       };

//       posterRef.current.addEventListener('mousemove', handleParallaxMove);
//       return () => {
//         if (posterRef.current) {
//           posterRef.current.removeEventListener('mousemove', handleParallaxMove);
//         }
//       };
//     }
//   }, [template]);

//   if (template.type === 'parallax') {
//     return (
//       <div className="flex flex-col items-center">
//         <div
//           ref={posterRef}
//           className="w-full max-w-md h-[700px] rounded-2xl relative overflow-hidden transition-all duration-300 hover:shadow-xl"
//           style={{
//             backgroundColor: template.backgroundColor,
//             ...style
//           }}
//         >
//           <div className="parallax-container">
//             {template.layers.map((layer, index) => (
//               <div
//                 key={index}
//                 className="parallax-layer absolute inset-0"
//                 style={{
//                   backgroundImage: `url(${layer.url})`,
//                   backgroundSize: 'cover',
//                   backgroundPosition: 'center',
//                   zIndex: template.layers.length - index
//                 }}
//               ></div>
//             ))}
//           </div>

//           <div
//             ref={textRef}
//             className="absolute z-10 cursor-move select-none"
//             style={{
//               ...position,
//               cursor: isDragging ? 'grabbing' : 'grab'
//             }}
//             onMouseDown={handleMouseDown}
//           >
//             <h2
//               className="poster-title font-bold"
//               style={{
//                 color: template.titleColor,
//                 fontFamily: template.titleFont,
//                 fontSize: template.titleSize,
//                 textTransform: template.titleStyle
//               }}
//             >
//               {title || template.title}
//             </h2>
//             <p
//               className="poster-description"
//               style={{
//                 color: template.descColor,
//                 fontFamily: template.descFont,
//                 fontSize: template.descSize,
//                 textTransform: template.descStyle
//               }}
//             >
//               {description || template.description}
//             </p>
//           </div>

//           <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
//             <span
//               className="text-sm"
//               style={{
//                 color: template.footerColor,
//                 fontSize: template.footerSize
//               }}
//             >
//               {footerLeft || template.footerLeft}
//             </span>
//             <span
//               className="text-sm"
//               style={{
//                 color: template.footerColor,
//                 fontSize: template.footerSize
//               }}
//             >
//               {footerRight || template.footerRight}
//             </span>
//           </div>
//         </div>
//         <button
//           onClick={handleDownload}
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           aria-label="Download poster"
//         >
//           Download Poster
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center">
//       <div
//         ref={posterRef}
//         className="w-full max-w-md h-[700px] rounded-2xl relative overflow-hidden transition-all duration-300 hover:shadow-xl"
//         style={{
//           backgroundColor: template.backgroundColor,
//           backgroundImage: backgroundImage ? `url(${backgroundImage})` :
//                         template.previewImage ? `url(${template.previewImage})` : 'none',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           ...style
//         }}
//       >
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundColor: template.overlayColor || 'rgba(0,0,0,0.4)'
//           }}
//         ></div>

//         <div
//           ref={textRef}
//           className="absolute z-10 cursor-move select-none"
//           style={{
//             ...position,
//             cursor: isDragging ? 'grabbing' : 'grab'
//           }}
//           onMouseDown={handleMouseDown}
//         >
//           <h2
//             className="poster-title font-bold"
//             style={{
//               color: template.titleColor,
//               fontFamily: template.titleFont,
//               fontSize: template.titleSize,
//               textTransform: template.titleStyle
//             }}
//           >
//             {title || template.title}
//           </h2>
//           <p
//             className="poster-description"
//             style={{
//               color: template.descColor,
//               fontFamily: template.descFont,
//               fontSize: template.descSize,
//               textTransform: template.descStyle
//             }}
//           >
//             {description || template.description}
//           </p>
//         </div>

//         <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
//           <span
//             className="text-sm"
//             style={{
//               color: template.footerColor,
//               fontSize: template.footerSize
//             }}
//           >
//             {footerLeft || template.footerLeft}
//           </span>
//           <span
//             className="text-sm"
//             style={{
//               color: template.footerColor,
//               fontSize: template.footerSize
//             }}
//           >
//             {footerRight || template.footerRight}
//           </span>
//         </div>
//       </div>

//       <button
//         onClick={handleDownload}
//         className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//         aria-label="Download poster"
//       >
//         Download Poster
//       </button>
//     </div>
//   );
// };

// export default PreviewCard;
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import axios from "axios";
import { toast } from "react-toastify";

const PreviewCard = ({
  template = {},
  backgroundImage = "",
  title = "",
  description = "",
  footerLeft = "",
  footerRight = "",
  style = {},
  onSaveSuccess,
}) => {
  const posterRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAndDownload = async () => {
    try {
      setIsSaving(true);

      // Step 1: Convert poster to image
      const canvas = await html2canvas(posterRef.current, {
        scale: 2, // Higher quality
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      const imageData = canvas.toDataURL("image/png", 1.0);

      // Step 2: Download image to user's device
      const downloadLink = document.createElement("a");
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      downloadLink.download = `poster-${timestamp}.png`;
      downloadLink.href = imageData;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // Step 3: Prepare data for backend
      const posterData = {
        imageData,
        templateId: template._id || null,
        title: title || template.title || "My Poster",
        description: description || template.description || "",
        design: {
          titleStyle: {
            color: template.titleColor || "#ffffff",
            fontFamily: template.titleFont || "Arial, sans-serif",
            fontSize: template.titleSize || "2rem",
            textTransform: template.titleStyle || "none",
          },
          descriptionStyle: {
            color: template.descColor || "#ffffff",
            fontFamily: template.descFont || "Arial, sans-serif",
            fontSize: template.descSize || "1rem",
            textTransform: template.descStyle || "none",
          },
          footer: {
            leftText: footerLeft || template.footerLeft || "",
            rightText: footerRight || template.footerRight || "",
            color: template.footerColor || "#ffffff",
            fontSize: template.footerSize || "0.875rem",
          },
          textPosition: template.textPosition || {
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            width: "90%",
          },
          background: {
            color: template.backgroundColor || "#000000",
            imageUrl: backgroundImage || template.previewImage || "",
            overlayColor: template.overlayColor || "rgba(0,0,0,0.5)",
          },
        },
      };

      // Step 4: Save to backend
      const response = await axios.post(
        "https://publicityposterbackend.onrender.com/api/posterpro",
        posterData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 30000, // 30 seconds timeout
        }
      );

      if (response.data.success) {
        toast.success("Poster saved successfully!");
        if (onSaveSuccess) onSaveSuccess(response.data.poster);
      } else {
        throw new Error(response.data.error || "Failed to save poster");
      }
    } catch (error) {
      console.error("Poster save error:", error);
      const errorMessage =
        error.response?.data?.error || error.message || "Failed to save poster";
      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/* Poster Container */}
      <div
        ref={posterRef}
        className="relative w-full max-w-lg h-[600px] rounded-xl overflow-hidden shadow-lg"
        style={{
          backgroundColor: template.backgroundColor || "#000000",
          backgroundImage: `url(${
            backgroundImage || template.previewImage || ""
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          ...style,
        }}
      >
        {/* Overlay */}
        {template.overlayColor && (
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: template.overlayColor,
              mixBlendMode: "multiply",
            }}
          />
        )}

        {/* Content */}
        <div
          className="absolute p-4 text-center"
          style={{
            left: template.textPosition?.left || "50%",
            top: template.textPosition?.top || "50%",
            transform:
              template.textPosition?.transform || "translate(-50%, -50%)",
            textAlign: template.textPosition?.textAlign || "center",
            width: template.textPosition?.width || "90%",
            color: template.titleColor || "#ffffff",
          }}
        >
          <h2
            className="mb-4 font-bold"
            style={{
              fontFamily: template.titleFont || "Arial, sans-serif",
              fontSize: template.titleSize || "2rem",
              textTransform: template.titleStyle || "none",
              lineHeight: "1.2",
            }}
          >
            {title || template.title || "Your Title Here"}
          </h2>
          <p
            className="mb-0"
            style={{
              fontFamily: template.descFont || "Arial, sans-serif",
              fontSize: template.descSize || "1rem",
              textTransform: template.descStyle || "none",
              color: template.descColor || "#ffffff",
            }}
          >
            {description || template.description || "Your description here"}
          </p>
        </div>

        {/* Footer */}
        {(footerLeft ||
          footerRight ||
          template.footerLeft ||
          template.footerRight) && (
          <div
            className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-4"
            style={{
              backgroundColor: "rgba(0,0,0,0.3)",
              color: template.footerColor || "#ffffff",
              fontSize: template.footerSize || "0.875rem",
            }}
          >
            <span>{footerLeft || template.footerLeft || ""}</span>
            <span>{footerRight || template.footerRight || ""}</span>
          </div>
        )}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSaveAndDownload}
        disabled={isSaving}
        className={`px-6 py-3 rounded-lg font-medium text-white transition-colors ${
          isSaving
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        aria-label="Save and download poster"
      >
        {isSaving ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Saving...
          </span>
        ) : (
          "Save & Download Poster"
        )}
      </button>
    </div>
  );
};

export default PreviewCard;
