import React from "react";

const TopNiches = () => {
  const services = [
    {
      id: 1,
      service: "Frontend Development",
      description:
        "Build modern and responsive user interfaces using React, HTML, CSS, JavaScript, and advanced frontend technologies.",
    },
    {
      id: 2,
      service: "Backend Development",
      description:
        "Develop secure and scalable server-side applications using Node.js, Express, APIs, authentication, and databases.",
    },
    {
      id: 3,
      service: "Full Stack Development",
      description:
        "Work on both frontend and backend technologies to create complete web applications from start to deployment.",
    },
    {
      id: 4,
      service: "UI/UX Design",
      description:
        "Design clean, user-friendly, and engaging interfaces that improve user experience and product accessibility.",
    },
    {
      id: 5,
      service: "Artificial Intelligence & ML",
      description:
        "Explore machine learning, data analysis, and AI-powered solutions for automation, prediction, and smart applications.",
    },
    {
      id: 6,
      service: "Cloud & DevOps",
      description:
        "Learn cloud deployment, CI/CD pipelines, Docker, and modern DevOps practices for efficient software delivery.",
    },
  ];

  return (
    <section className="services">
      <h3>Popular Career Domains</h3>

      <div className="grid">
        {services.map((element) => {
          return (
            <div className="card" key={element.id}>
              <h4>{element.service}</h4>
              <p>{element.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TopNiches;