import { Link } from "react-router-dom";
import Divider from "./Divider";
import { formatRelative } from "date-fns";

function Card({ id, name }) {
  const url = "test";
  return (
    <div className="block bg-white rounded-md shadow-md cursor-pointer hover:shadow-lg  border border-slate-300 hover:shadow-slate-900">
      <Link to={`/event/${id}`} className="">
        <img
          aria-label="Card image"
          src={url}
          className={`block object-cover rounded-t-md duration-300 bg-no-repeat bg-cover h-44`}
        />

        <div className="w-full">
          <article className="">
            <h3 className="text-center font-bold text-lg py-3">{name}</h3>
            <div className="items-center justify-between text-slate-600 dark:text-slate-500 text-xs"></div>
            <Divider />
            {/* <div className="flex justify-center py-3"></div> */}
          </article>
        </div>
      </Link>

      <Link className="flex justify-center py-3" to={`/participants/${id}`}>
        <div className="  bg-blue-500 hover:bg-blue-700 text-white font-bold  py-2 px-3 rounded">
          See all attendees
        </div>
      </Link>
    </div>
  );
}

export default Card;
