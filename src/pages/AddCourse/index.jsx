import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RULES } from "../../constant/rules";
import { FIELDS } from "../../constant/fields";
import { TOPICS } from "../../constant/topics";
// import scrollToTop from "../../utils/scrollToTop";
import Loading from "../../components/Loading";
import Select from "../../components/Select";

const API_ENDPOINT = "https://courses-api-isuk.onrender.com/courses";

export default function AddCourse() {
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    level: "",
    description: "",
    field: "",
    topics: [],
    date: "",
    instructor: "",
    company: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const levelSelectRef = useRef(null);
  const fieldSelectRef = useRef(null);
  const topicsSelectRef = useRef(null);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.type === "numbers" ? Number(e.target.value) : e.target.value,
    }));
  }

  function validateCustomFormInputs(formData) {
    if (!formData.topics.length) {
      console.log("topics is required");
      document.querySelector("#topics input").focus();
      return false;
    }

    if (!formData.level) {
      console.log("level is required");
      document.querySelector("#level div").focus();

      return false;
    }

    if (!formData.field) {
      console.log("Field is required");
      document.querySelector("#filed div").focus();
      return false;
    }

    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateCustomFormInputs(formData)) return;

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setIsLoading(true);

    fetch(API_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then(() => {
        setIsLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        navigate("/courses");
        console.log(err);
        window.alert(err);
      });
  }

  return (
    <section className="container flex-grow py-8">
      {isLoading && <Loading />}
      <h2 className="text-balance pb-6 text-center text-3xl font-semibold capitalize sm:text-4xl md:text-5xl lg:pb-8 lg:pt-6">
        Contribute and add your favorite courses !!!
      </h2>
      <hr className="h-0.5 rounded-full bg-[#065f4688]" />
      <div className="py-2 sm:py-6">
        <p className="py-4 font-medium sm:text-lg lg:text-xl">
          Before adding the course, please follow these rules:
        </p>
        <ol className="list-inside list-decimal space-y-5 pl-2 text-sm sm:text-base lg:text-lg">
          {RULES.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ol>
      </div>
      <form
        target="_blank"
        action={API_ENDPOINT}
        method="post"
        onSubmit={handleSubmit}
        className="grid gap-8 pt-8 sm:grid-cols-2 sm:text-lg xl:grid-cols-1"
      >
        <div className="flex flex-wrap items-center gap-4 xl:max-w-[60%]">
          <label htmlFor="name">Name: </label>
          <input
            value={formData.name}
            onChange={handleChange}
            type="text"
            name="name"
            id="name"
            placeholder="The name of the course"
            title="Enter the name of the course"
            required
          />
        </div>
        <div className="flex flex-wrap items-center gap-4 xl:max-w-[60%]">
          <label htmlFor="link">Link to the course: </label>
          <input
            value={formData.link}
            onChange={handleChange}
            type="url"
            name="link"
            id="link"
            placeholder="Link to the course"
            title="Link to the course"
            required
          />
        </div>
        <div
          id="level"
          ref={levelSelectRef}
          className="flex flex-wrap items-center gap-4 xl:max-w-[60%]"
        >
          <label htmlFor="name">Level: </label>
          <Select
            options={["Beginner", "Intermediate", "Advanced"]}
            placeholder={"Select the level of the course"}
            value={formData.level}
            onChange={(newValue) =>
              setFormData((prev) => ({
                ...prev,
                level: newValue,
              }))
            }
          />
        </div>
        <div
          id="field"
          ref={fieldSelectRef}
          className="flex flex-wrap items-center gap-4 xl:max-w-[60%]"
        >
          <label htmlFor="field">Field:</label>
          <Select
            options={FIELDS}
            placeholder="Select the field of the course"
            value={formData.field}
            onChange={(newValue) =>
              setFormData((prev) => ({
                ...prev,
                field: newValue,
              }))
            }
          />
        </div>
        <div className="flex flex-col gap-4 sm:col-span-2 xl:col-span-1 xl:max-w-[60%]">
          <label htmlFor="description">Description about the course: </label>
          <textarea
            value={formData.description}
            onChange={handleChange}
            className="min-h-[100px] w-full p-2"
            name="description"
            id="description"
            placeholder="Write a description about the course including the level, duration, topics, etc."
            required
          />
        </div>
        <div
          ref={topicsSelectRef}
          id="topics"
          className="flex flex-col gap-4 sm:col-span-2 xl:col-span-1 xl:max-w-[60%]"
        >
          <label htmlFor="topics">topics: </label>
          <Select
            options={TOPICS}
            multiple
            placeholder="Select the topics of the course"
            search="Search for topics...."
            value={formData.topics}
            onChange={(newValue) =>
              setFormData((prev) => ({
                ...prev,
                topics: newValue,
              }))
            }
          />
        </div>
        <div className="flex flex-col items-start gap-4 xl:max-w-[60%]">
          <label htmlFor="date">The year: </label>
          <input
            value={formData.date.toString()}
            onChange={handleChange}
            type="number"
            inputMode="numeric"
            name="date"
            id="date"
            placeholder="The year of the course"
            pattern="[0-9]+"
            min="2010"
            max={new Date().getFullYear()}
            required
          />
        </div>
        <div className="flex flex-wrap items-center gap-4 xl:max-w-[60%]">
          <label htmlFor="instructor">Instructor: </label>
          <input
            value={formData.instructor}
            onChange={handleChange}
            type="text"
            name="instructor"
            id="instructor"
            placeholder="The person/s who taught it"
            required
          />
        </div>
        <div className="flex flex-wrap items-center gap-4 xl:max-w-[60%]">
          <label htmlFor="company">Company: </label>
          <input
            value={formData.company}
            onChange={handleChange}
            type="text"
            name="company"
            id="company"
            placeholder="Company that made it"
            required
          />
        </div>
        <button
          className="mt-4 justify-self-center rounded-md bg-emerald-800 px-4 py-2 capitalize text-white transition hover:bg-emerald-900 focus:outline-offset-4 sm:col-span-2 sm:mt-8 xl:col-span-1"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add the course"}
        </button>
      </form>
    </section>
  );
}
