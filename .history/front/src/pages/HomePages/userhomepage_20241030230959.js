// src/JobFeed.js
import React from 'react';
import './home.css';

const jobs = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Tech Solutions Inc.',
    location: 'San Francisco, CA',
    description: 'Develop and maintain web applications using React and Node.js.',
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'Innovate Corp.',
    location: 'New York, NY',
    description: 'Lead product strategy and collaborate with engineering teams.',
  },
  {
    id: 3,
    title: 'Data Scientist',
    company: 'Data Insights LLC',
    location: 'Remote',
    description: 'Analyze data and develop models to drive business decisions.',
  },
  {
    id: 4,
    title: 'UI/UX Designer',
    company: 'Creative Minds',
    location: 'Austin, TX',
    description: 'Design user-friendly interfaces and conduct user research.',
  },
];

const UserHomepage = () => {
  return (
    <div className="job-feed">
      <h1>Job Listings</h1>
      {jobs.map((job) => (
        <div key={job.id} className="job-post">
          <h2>{job.title}</h2>
          <h3>{job.company}</h3>
          <p>{job.location}</p>
          <p>{job.description}</p>
          <button className="apply-button">Apply Now</button>
        </div>
      ))}
    </div>
  );
};

export default JobFeed;
