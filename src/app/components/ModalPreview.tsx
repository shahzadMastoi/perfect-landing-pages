import { useState, useRef } from "react";
// Optional: install lucide-react for icons → npm install lucide-react
import { Plus, Minus } from "lucide-react";
import { Template } from "../types";

type ModalPreviewProps = {
  isOpen: boolean;
  template: Template | null;
  onClose: () => void;
};

export default function ModalPreview({ isOpen, template, onClose }: ModalPreviewProps) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });

  if (!isOpen || !template) return null;

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const resetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom === 1) return;
    setIsDragging(true);
    startPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - startPos.current.x,
      y: e.clientY - startPos.current.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // 🧭 Mouse wheel zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault(); // prevent page scroll
    const delta = e.deltaY;
    if (delta < 0) setZoom((z) => Math.min(z + 0.1, 3));
    else setZoom((z) => Math.max(z - 0.1, 0.5));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      onClick={() => {
        resetZoom();
        onClose();
      }}
    >
      <div
        className="relative bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-2/3 max-h-[90vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-0 right-1 text-2xl text-gray-700 hover:text-black"
          onClick={() => {
            resetZoom();
            onClose();
          }}
        >
          ✖
        </button>

        {/* Zoom Controls */}
        <div className="absolute top-3 left-3 flex space-x-2 bg-white/80 rounded-lg p-1 shadow-md">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleZoomOut();
            }}
            className="p-1 rounded hover:bg-gray-200 transition"
            title="Zoom Out"
          >
            <Minus size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleZoomIn();
            }}
            className="p-1 rounded hover:bg-gray-200 transition"
            title="Zoom In"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Dynamic Template Preview */}
        <div className="flex flex-col space-y-4">
          <div
            className="flex justify-center items-center overflow-hidden cursor-grab active:cursor-grabbing bg-gray-50 rounded-lg"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            <img
              src={template.image}
              alt={template.title}
              className="max-h-[70vh] object-contain transition-transform duration-150 ease-in-out"
              style={{
                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                cursor: zoom > 1 ? "grab" : "default",
              }}
              draggable={false}
            />
          </div>

          <div className="blog-content prose max-w-none">
            <h2 className="text-2xl font-bold mb-2">{template.title}</h2>
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              {template.category}
            </h3>

            <div
              className="text-gray-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: template.longDescription }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
