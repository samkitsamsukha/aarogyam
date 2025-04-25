import React, { useState } from 'react';
import { Upload, Check, X } from 'lucide-react';

interface FileUploadProps {
  id: string;
  label: string;
  accept?: string;
  onChange: (file: File | null) => void;
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  id,
  label,
  accept = '.pdf,.jpg,.jpeg,.png',
  onChange,
  error,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
    onChange(selectedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      onChange(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = () => {
    setFile(null);
    onChange(null);
  };

  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <div
        className={`
          file-upload
          ${isDragging ? 'border-blue-500 bg-blue-100' : ''}
          ${error ? 'border-red-500 bg-red-50' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          id={id}
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        
        {file ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm text-gray-700 truncate max-w-xs">
                {file.name}
              </span>
            </div>
            <button
              type="button"
              className="text-red-500 hover:text-red-700"
              onClick={removeFile}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="h-10 w-10 text-blue-500 mb-2" />
            <p className="text-sm text-gray-700 mb-1">
              Drag and drop your file here or
            </p>
            <label
              htmlFor={id}
              className="text-blue-500 hover:text-blue-700 cursor-pointer font-medium"
            >
              browse files
            </label>
            <p className="text-xs text-gray-500 mt-2">
              Supported formats: {accept.replace(/\./g, '').replace(/,/g, ', ')}
            </p>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FileUpload;