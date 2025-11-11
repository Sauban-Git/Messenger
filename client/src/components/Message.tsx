export type Status = "read" | "delivered" | "sent"

export const Message = ({ sender, status, time, content }: { sender: boolean, status: Status, time: string, content: string }) => {
  return sender ? (
    <div className="flex justify-end py-2">
      <div className="bg-gray-300 rounded-2xl p-2 max-w-xs">
        <p>{content}</p>
        <div className="text-xs text-gray-500 flex justify-end">
          <span>{time}</span>
          <span className="ml-2">{status}</span>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-start py-2">
      <div className="bg-blue-300 rounded-2xl p-2 max-w-xs">
        <p>{content}</p>
        <div className="text-xs text-gray-500 flex justify-end">
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}
