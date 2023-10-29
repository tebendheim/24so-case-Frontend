import { Link } from "react-router-dom";
import Divider from "./Divider";

function ParticipantCard({ name, phone, age }) {
  return (
    <div className="rounded-md border-slate-500 border">
      <div className=" text-center rounded-b-md">
        <article className="">
          <h3 className=" font-bold text-lg">{name}</h3>
          <p>Phone: {phone}</p>
          <p>Age: {age}</p>
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-500 text-xs"></div>
        </article>
      </div>
      <Divider />
    </div>
  );
}

export default ParticipantCard;
