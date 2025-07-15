import { Card } from "antd";
import { BsPencil } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";
import type { UserCardProps } from "./types";

export default function UserCard({ tasks, onEdit, onDelete }: UserCardProps) {
  return (
    <div className="grid grid-cols-1 px-4 sm:px-0 mt-5 sm:mt-8 mb-8 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 m-auto">
      {tasks.map((t, i) => (
        <Card
          key={i}
          className="relative group text-center flex flex-col justify-center items-center h-68 p-4 border rounded-lg shadow-md transition-all duration-300 ease-in-out overflow-hidden"
        >
          {/* Overlay shown on hover */}
          <div className="absolute inset-0 backdrop-brightness-80 bg-white/10 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity duration-300 z-10">
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(t)}
                className="bg-[#8686e6] h-10 w-10 hover:bg-[#8686e6] text-white font-bold p-2 rounded-full cursor-pointer"
              >
                <BsPencil className="h-5 w-5 mx-auto" />
              </button>
              <button
                onClick={() => onDelete(Number(t.id))}
                className="bg-[#fd0100] hover:bg-[#fd0100] text-white p-2 rounded-full cursor-pointer"
              >
                <AiTwotoneDelete className="h-6 w-6 mx-auto" />
              </button>
            </div>
          </div>

          {/* Content below the overlay */}
          <img
            src={t.imageLink}
            className="rounded-full h-26 w-26 object-cover mx-auto z-0"
            alt="Profile"
          />
          <p className="text-xl mt-6 mb-2 font-semibold text-[#252525] z-0">
            {t.firstName} {t.lastName}
          </p>
          <p className="text-lg text-center font-semibold text-[#868686] z-0">
            {t.email}
          </p>
        </Card>
      ))}
    </div>
  );
}
