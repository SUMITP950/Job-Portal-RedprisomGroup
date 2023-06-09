import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { SearchBar } from "../../Component/SearchBar/SearchBar";
import { SearchResultsList } from "../../Component/SearchBar/SearchResultList";
import { toast } from "react-toastify";

const EmployerJobPost = () => {
  useEffect(() => {
    document.title = "Job Post";
  }, []);
  // const [results, setResults] = useState([]);
  const options = [
    { value: "Kolkata", label: "Kolkata" },
    { value: "Delhi", label: "Delhi" },
    { value: "Mumbai", label: "Mumbai" },
  ];
  const options1 = [
    { value: "React js", label: "React js" },
    { value: "Python", label: "Python" },
    { value: "Java", label: "Java" },
  ];
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [location, setLoctions] = useState("");
  const [technicalSkills, setTechnicalSkills] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [experienceYear, setExperienceYear] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleLocationsChange = (selectedOptions) => {
    const locations = selectedOptions.map((option) => option.value);
    setLoctions(locations);
  };

  const handleTechnicalSkillsChange = (selectedOptions) => {
    const selectedSkills = selectedOptions.map((option) => option.value);
    setTechnicalSkills(selectedSkills);
  };

  const handleSalaryRangeChange = (event) => {
    setSalaryRange(event.target.value);
  };

  const handleExperienceYearChange = (event) => {
    setExperienceYear(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const formData = {
      title: title,
      description: description,
      location: location,
      technicalSkills: technicalSkills,
      salaryRange: salaryRange,
      experienceYear: experienceYear,
    };

    try {
      await axios.post("http://localhost:3030/job_post", formData);
      // console.log("Form submitted successfully");
      toast.success(`Form submitted successfully`);
    } catch (error) {
      // console.error("Form submission error:", error);
      toast.success(`Failed : ${error.message}`);
    }
    setSubmitting(false);
    setTitle("");
    setDescription("");
    setLoctions("");
    setTechnicalSkills("");
    setSalaryRange("");
    setExperienceYear("");
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Post a Job</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Job Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Enter the job title"
                    value={title}
                    onChange={handleTitleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="salaryRange">Salary Range</label>
                  <select
                    className="form-control"
                    id="salaryRange"
                    value={salaryRange}
                    onChange={handleSalaryRangeChange}
                    required
                  >
                    <option value="">-- Select Salary Range --</option>
                    <option value="60k-1LPA">60k - 1LPA</option>
                    <option value="1LPA-2LPA">1LPA - 2LPA</option>
                    <option value="2LPA-6LPA">2LPA - 6LPA</option>
                    <option value="6LPA-12LPA">6LPA - 12LPA</option>
                    <option value="12LPA-Above">12LPA and Above</option>
                  </select>
                </div>
                <div className="form-group">
                  <b htmlFor="description" style={{ paddingLeft: "8px" }}>
                    Location
                  </b>
                  <div className="form-control">
                    <Select
                      styles={{
                        container: (baseStyles, state) => ({
                          ...baseStyles,

                          display: "inherit",
                        }),
                        control: (baseStyles, state) => ({
                          ...baseStyles,

                          border: "none",

                          backgroundColor: "#fff",
                        }),

                        indicatorSeparator: (baseStyles, state) => ({
                          ...baseStyles,
                          display: "none",
                        }),
                      }}
                      options={options}
                      isMulti
                      placeholder="Select Your Location"
                      value={options.filter((option) =>
                        location.includes(option.value)
                      )}
                      onChange={handleLocationsChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <b htmlFor="description" style={{ paddingLeft: "8px" }}>
                    Technology
                  </b>
                  <div className="form-control">
                    <Select
                      styles={{
                        container: (baseStyles, state) => ({
                          ...baseStyles,

                          display: "inherit",
                        }),
                        control: (baseStyles, state) => ({
                          ...baseStyles,

                          border: "none",

                          backgroundColor: "#fff",
                        }),

                        indicatorSeparator: (baseStyles, state) => ({
                          ...baseStyles,
                          display: "none",
                        }),
                      }}
                      options={options1}
                      isMulti
                      placeholder="Select Your Technology"
                      value={options1.filter((option) =>
                        technicalSkills.includes(option.value)
                      )}
                      onChange={handleTechnicalSkillsChange}
                      required
                    />
                  </div>
                </div>
                {/* <div className="form-group">
                  <label htmlFor="salaryRange">Location</label>
                  <div className="search-bar-container">
                  
                  </div>
                </div>
                 <div className="form-group">
                  <label htmlFor="salaryRange">Technology</label>
                  
                    <Select
                      styles={{
                        container: (baseStyles, state) => ({
                          ...baseStyles,

                          display: "inline",
                          left: "-93px",
                        }),
                        control: (baseStyles, state) => ({
                          ...baseStyles,

                          border: "none",
                          backgroundColor: "#fff",
                        }),
                        indicatorsContainer: (baseStyles, state) => ({
                          ...baseStyles,

                          left: "0px",
                        }),
                        option: (baseStyles, state) => ({
                          ...baseStyles,
                          display: "block", //problem here not
                          left: "-93px",
                        }),
                        indicatorSeparator: (baseStyles, state) => ({
                          ...baseStyles,
                          display: "none",
                        }),
                      }}
                      options={options}
                      isMulti
                      placeholder="Select skills"
                      value={options.filter((option) =>
                        technicalSkills.includes(option.value)
                      )}
                      onChange={handleTechnicalSkillsChange}
                      required
                    />
                  
                </div>*/}
                <div className="form-group">
                  <label htmlFor="experienceYear">Experience in Year</label>
                  <select
                    className="form-control"
                    id="experienceYear"
                    value={experienceYear}
                    onChange={handleExperienceYearChange}
                    required
                  >
                    <option value="">-- Select Experience in Year --</option>
                    <option value="Fresher">Fresher</option>
                    <option value="0-1 Year">0-1 Year</option>
                    <option value="1-2 Year">1-2 Year</option>
                    <option value="2-3 Year">2-3 Year</option>
                    <option value="3-4 Year">3-4 Year</option>
                    <option value="4-5 Year">4-5 Year</option>
                    <option value="5-6 Year">5-6 Year</option>
                    <option value="6-7 Year">6-7 Year</option>
                    <option value="7-8 Year">7-8 Year</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Job Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    placeholder="Enter the job description"
                    rows="5"
                    value={description}
                    onChange={handleDescriptionChange}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn apply-btn"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerJobPost;
