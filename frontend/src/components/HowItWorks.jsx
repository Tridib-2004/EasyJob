import React from "react";
import { LuUserPlus } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { BiSolidLike } from "react-icons/bi";

const HowItWorks = () => {
  return (
    <section className="howItWorks">
      <h3>How EasyJob Works</h3>

      <div className="container">
        <div className="card">
          <div className="icon">
            <LuUserPlus />
          </div>

          <h4>Create Your Profile</h4>

          <p>
            Register as a student, fresher, professional, or recruiter and
            build your profile with skills, experience, projects, and career
            interests to stand out.
          </p>
        </div>

        <div className="card">
          <div className="icon">
            <VscTasklist />
          </div>

          <h4>Explore Opportunities</h4>

          <p>
            Browse internships, remote jobs, full-time roles, and company
            openings across different domains using smart search and filters.
          </p>
        </div>

        <div className="card">
          <div className="icon">
            <BiSolidLike />
          </div>

          <h4>Apply & Get Hired</h4>

          <p>
            Apply to your preferred jobs with ease, connect with recruiters, and
            take the next step toward building a successful career with
            confidence.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;