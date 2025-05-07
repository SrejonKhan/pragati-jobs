"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: 'https://jsearch.p.sulu.sh/v1',
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Bearer sk_live_IBR9epKxneBNV3cdgpXAFvjAwSLGgNmi'
  }
});

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    query: "",
    actively_hiring: false,
    categories: [],
    company_types: [],
  });

  // Updated tech categories for the Bangladesh market
  const categories = [
    "Software Development",
    "Web Development",
    "Mobile App Development",
    "Data Science & AI",
    "UI/UX Design",
    "Digital Marketing", 
    "Cloud Computing",
  ];

  // Bangladesh-specific company types
  const companyTypes = [
    "Tech Startup",
    "Software Agency",
    "International Company",
    "Telecom",
    "BPO",
    "Freelance",
  ];

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = {
        ...filters,
        categories: filters.categories.join(","),
        company_types: filters.company_types.join(","),
      };

      const { data } = await api.get('/search', { params });
      setJobs(data.data || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError(error?.response?.data?.message || "Failed to fetch jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));
  };

  const formatSalary = (job) => {
    if (job.job_min_salary && job.job_max_salary) {
      return `${job.job_min_salary}-${job.job_max_salary}${job.job_salary_currency || '$'} per ${job.job_salary_period?.toLowerCase() || 'year'}`;
    }
    return 'Salary not specified';
  };

  return (
    <div className="min-h-screen bg-gray-50 bd-pattern-bottom py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl bd-heading mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-[#006a4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="bd-flag-gradient font-bold">Find Your Dream Job</span>
          </h1>
          <p className="mt-2 text-gray-600 flex items-center">
            <span>Find jobs that match your skills and interests</span>
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bd-card p-6 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full bg-[#006a4e] opacity-5"></div>
          <div className="grid grid-cols-1 gap-6 relative z-10">
            {/* Search Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Jobs
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for jobs, skills, or companies..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006a4e] focus:border-[#006a4e]"
                  value={filters.query}
                  onChange={(e) => handleFilterChange("query", e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Actively Hiring Toggle */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="actively-hiring"
                className="h-4 w-4 text-[#006a4e] focus:ring-[#006a4e] border-gray-300 rounded"
                checked={filters.actively_hiring}
                onChange={(e) =>
                  handleFilterChange("actively_hiring", e.target.checked)
                }
              />
              <label htmlFor="actively-hiring" className="ml-2 text-gray-700 flex items-center">
                <span>Show only actively hiring companies</span>
              </label>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                <span>Categories</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleArrayFilter("categories", category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      filters.categories.includes(category)
                        ? "bg-[#006a4e] text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-[#aaffdd]"
                    } transition-colors duration-200`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Company Types */}
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                <span>Company Types</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {companyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleArrayFilter("company_types", type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      filters.company_types.includes(type)
                        ? "bg-[#f42a41] text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-[#ffdddd]"
                    } transition-colors duration-200`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#006a4e] border-t-transparent mx-auto"></div>
              <p className="mt-4 text-gray-600">Searching for jobs...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-[#f42a41]">{error}</p>
              <p className="mt-2">Sorry, an error occurred.</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-600 mb-2">No jobs found</p>
              <p className="text-gray-500">No jobs found matching your criteria.</p>
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-gray-500">
                <span>Total: </span> {jobs.length} <span>jobs found</span>
              </div>
              {jobs.map((job) => (
                <div
                  key={job.job_id}
                  className="bd-card p-6 hover:bd-border transition-all duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      {job.employer_logo ? (
                        <img
                          src={job.employer_logo}
                          alt={`${job.employer_name} logo`}
                          className="w-16 h-16 object-contain rounded-lg border border-gray-100"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-[#006a4e] bg-opacity-10 rounded-lg flex items-center justify-center">
                          <span className="text-xl font-bold text-[#006a4e]">
                            {job.employer_name?.charAt(0) || "J"}
                          </span>
                        </div>
                      )}
                      <div>
                        <h2 className="text-xl font-semibold text-[#006a4e]">
                          {job.job_title}
                        </h2>
                        <p className="text-gray-600 mt-1">{job.employer_name}</p>
                        <div className="mt-2 space-x-2">
                          {job.job_employment_type && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#aaffdd] text-[#006a4e]">
                              {job.job_employment_type_text}
                            </span>
                          )}
                          {job.job_location && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {job.job_location}
                            </span>
                          )}
                          {job.job_is_remote && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ffdddd] text-[#f42a41]">
                              Remote
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <a
                      href={job.job_apply_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bd-button"
                    >
                      <span>Apply</span>
                    </a>
                  </div>

                  {/* Job Details */}
                  <div className="mt-4">
                    <div className="prose prose-sm max-w-none text-gray-600">
                      <p className="line-clamp-3">{job.job_description}</p>
                    </div>

                    {/* Highlights */}
                    {job.job_highlights && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {job.job_highlights.Qualifications && (
                          <div>
                            <h3 className="text-sm font-semibold text-[#006a4e] mb-2 flex items-center">
                              <span>Qualifications</span>
                            </h3>
                            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                              {job.job_highlights.Qualifications.slice(0, 3).map((qual, idx) => (
                                <li key={idx} className="line-clamp-2">{qual}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {job.job_highlights.Responsibilities && (
                          <div>
                            <h3 className="text-sm font-semibold text-[#006a4e] mb-2 flex items-center">
                              <span>Responsibilities</span>
                            </h3>
                            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                              {job.job_highlights.Responsibilities.slice(0, 3).map((resp, idx) => (
                                <li key={idx} className="line-clamp-2">{resp}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {job.job_highlights.Benefits && (
                          <div>
                            <h3 className="text-sm font-semibold text-[#006a4e] mb-2 flex items-center">
                              <span>Benefits</span>
                            </h3>
                            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                              {job.job_highlights.Benefits.slice(0, 3).map((benefit, idx) => (
                                <li key={idx} className="line-clamp-2">{benefit}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Additional Info */}
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                      {job.job_posted_at_datetime_utc && (
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-[#006a4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Posted: {job.job_posted_human_readable}
                        </span>
                      )}
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-[#006a4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Salary: {formatSalary(job)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
