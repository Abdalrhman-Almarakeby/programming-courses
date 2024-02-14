import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";

export default function Course() {
  const { id } = useParams();

  const {
    data: courseData,
    isPending,
    error,
  } = useFetch(`https://courses-api-isuk.onrender.com/courses/${id}`);
  console.log(courseData);
  return (
    <div className="flex-grow">
      {error && <p>{error}</p>}
      {isPending && <Loading />}
      {courseData && courseData._id}
    </div>
  );
}
