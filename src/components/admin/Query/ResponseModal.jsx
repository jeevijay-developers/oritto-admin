import React, { useState } from "react";
import { sendQueryMessage } from "../../../server/common";
import { toast } from "react-toastify";
import { FaWindowClose } from "react-icons/fa";

const ResponseModal = ({
  isOpen,
  onClose,
  queryId,
  customerName,
  customerEmail,
  originalMessage,
}) => {
  const [replyMessage, setReplyMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Pre-fill with a template message when modal opens
  const defaultMessage = `
Thank you for your inquiry regarding our product. We have received your message and are pleased to assist you.
`;

  React.useEffect(() => {
    if (isOpen) {
      setReplyMessage(defaultMessage);
    }
  }, [isOpen, customerName]);

  const handleSendResponse = async () => {
    if (!replyMessage.trim()) {
      toast.error("Please enter a response message");
      return;
    }

    setIsLoading(true);
    try {
      const data = {
        queryId: queryId,
        replyMessage: replyMessage.trim(),
      };

      const response = await sendQueryMessage(data);
      toast.success("Response sent successfully!");
      onClose();
      setReplyMessage("");
    } catch (error) {
      console.error("Error sending response:", error);
      toast.error("Failed to send response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setReplyMessage("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Send Response</h2>
          <button
            onClick={handleClose}
            className="text-red-500 hover:text-red-700 text-3xl"
            disabled={isLoading}
          >
            <FaWindowClose />
          </button>
        </div>

        {/* Customer Information */}
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">
            Customer Information:
          </h3>
          <p>
            <strong>Name:</strong> {customerName}
          </p>
          <p>
            <strong>Email:</strong> {customerEmail}
          </p>
        </div>

        {/* Original Message */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">
            Original Message:
          </h3>
          <div className="p-3 bg-gray-100 rounded-lg border">
            <p className="text-gray-600">{originalMessage}</p>
          </div>
        </div>

        {/* Response Message */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Response:
          </label>
          <textarea
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="6"
            placeholder="Enter your response message here..."
            disabled={isLoading}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSendResponse}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Response"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResponseModal;
