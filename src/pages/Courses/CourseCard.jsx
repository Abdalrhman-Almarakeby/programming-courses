import { Link } from "react-router-dom";

export default function CourseCard({ _id, name, level, field, topics, date, instructor, company }) {
  return (
    <Link className="flex flex-col rounded-md border-4 border-black text-sm" to={`/courses/${_id}`}>
      <img src="https://placehold.co/160x90" alt="Course image" />
      <div className="p-4">
        <h2 className="mb-3 text-lg font-bold">{name}</h2>
        <p>Field: {field}</p>
        <p>Level: {level}</p>
        <p>Date: {new Date(date).getFullYear()}</p>
        <p>Instructor: {instructor}</p>
        <p>Company: {company}</p>
        <p>Topics: {topics.join(", ")}</p>
      </div>
    </Link>
  );
}
