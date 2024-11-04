import React, { FC } from "react";
import { IoClose } from "react-icons/io5";

type NotificationProps = {
  message: string;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  type: "success" | "failed";
};

const Notification: FC<NotificationProps> = ({ message, onClose, type }) => {
  // const [closeNotif, setCloseNotif] = useState<boolean>(false);

  // if(!show) return null;
  return (
    <div
      className={`flex justify-between items-center w-[80%] h-[35px] ${type === "failed" ? 'bg-red-200 text-red-700' : 'bg-green-200 text-green-700'}  border rounded-sm px-3 mt-40`}
    >
      <p className="text-[.8rem]">{message}</p>

      <div className="cursor-pointer" onClick={() => onClose(false)}>
        <IoClose />
      </div>
    </div>
  );
};

export default Notification;
