import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import FilterBar from "./FilterBar";
import CourseCard from "./CourseCard";

const API_ENDPOINT = "https://courses-api-isuk.onrender.com/courses";

export default function Home() {
  const { data: courses, isPending, error } = useFetch(API_ENDPOINT);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({});

  return (
    <div className="flex-grow">
      <FilterBar setFilters={setFilters} />
      <section className="courses-container">
        {error && <p>{error}</p>}
        {isPending && <Loading />}
        {courses &&
          courses.map((course) => <CourseCard key={course._id} {...course} />)}
      </section>
    </div>
  );
}
