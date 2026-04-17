import { useState } from "react";

type Tab = "Home" | "Projects" | "Publications" | "Contact";

function App() {
  const [activeTab, setActiveTab] = useState<Tab>("Home");

  const tabs: Tab[] = ["Home", "Projects", "Publications", "Contact"];

  return (
    <div className="w-full h-full isolate overflow-hidden bg-grid flex items-center justify-center relative sm:p-12 p-8 overscroll-contain">
      <div className="flex flex-col gap-4 h-full sm:h-auto items-center max-w-4xl w-full">
        {/* Recruiter Banner */}
        <div className="inline-flex gap-4 items-center w-full bg-green-500/30 p-3 border-2 border-green-800 text-green-200 font-semibold rounded-lg whitespace-break-spaces max-w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-shrink-0"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
          <p>
            Are you a recruiter? My resume links to the full portfolio version
            of this site.
          </p>
        </div>

        {/* macOS Window */}
        <div className="bg-white relative overflow-hidden shadow-2xl sm:rounded-lg h-[75%] sm:h-fit w-full sm:w-[700px] sm:aspect-[3/2] rounded-lg">
          <div className="h-full flex flex-col relative">
            {/* Window Header */}
            <div className="flex flex-col gap-2 bg-gray-200 p-3 sticky top-0 z-10 w-full border-b border-b-gray-300 shadow-sm">
              {/* Traffic Light Buttons */}
              <div className="flex flex-row gap-2">
                <div className="block w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition cursor-pointer" />
                <div className="block w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition cursor-pointer" />
                <div className="block w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition cursor-pointer" />
              </div>

              {/* Tab Navigation */}
              <div className="flex flex-row overflow-x-scroll custom-no-scrollbar">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`font-semibold rounded-md px-3 py-1 transition cursor-pointer ${
                      activeTab === tab
                        ? "text-gray-700 bg-gray-300"
                        : "text-gray-500 hover:text-gray-600"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-grow px-4 py-5 sm:p-6 overflow-y-auto content-scroll">
              {activeTab === "Home" && <HomeContent />}
              {activeTab === "Projects" && <ProjectsContent />}
              {activeTab === "Publications" && <PublicationsContent />}
              {activeTab === "Contact" && <ContactContent />}
            </div>
          </div>
        </div>

        {/* Decorative semicolon */}
        <span className="text-gray-600 text-lg">;</span>
      </div>
    </div>
  );
}

function HomeContent() {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex-grow">
        <h1 className="text-gray-700 text-2xl font-bold p-2">
          Hi there, I'm Luca :)
        </h1>
        <p className="text-gray-700 text-xl p-2">
          I'm a third-year at the University of Chicago majoring in Computer
          Science. I worked as a research assistant in Prof. Blase Ur's{" "}
          <a
            href="https://super.cs.uchicago.edu/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            SUPERgroup
          </a>{" "}
          for four years, and I'm very excited to be interning at SpaceX this
          winter.
        </p>
        {/* Mobile image */}
        <img
          src="https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=400&h=400&fit=crop"
          alt="Profile photo"
          className="w-auto mx-auto sm:hidden h-48 py-2 rounded-[2rem] object-cover"
        />
      </div>
      {/* Desktop image */}
      <img
        src="https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=400&h=400&fit=crop"
        alt="Profile photo"
        className="hidden sm:inline-block w-64 h-64 p-4 rounded-[4rem] object-cover flex-shrink-0"
      />
    </div>
  );
}

function ProjectsContent() {
  const projects = [
    {
      title: "Privacy Research Tools",
      description:
        "Built tools for analyzing privacy policies and user consent flows as part of SUPERgroup research.",
      tags: ["Python", "NLP", "Research"],
    },
    {
      title: "SpaceX Internship Project",
      description:
        "Working on exciting aerospace software during my winter internship at SpaceX.",
      tags: ["Aerospace", "Software Engineering"],
    },
    {
      title: "Personal Portfolio",
      description:
        "This website! Built with React and Tailwind CSS, featuring a unique macOS-inspired design.",
      tags: ["React", "Tailwind", "TypeScript"],
    },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-gray-700 text-2xl font-bold p-2">Projects</h1>
      <div className="space-y-4 p-2">
        {projects.map((project) => (
          <div
            key={project.title}
            className="bg-gray-100 rounded-lg p-4 hover:bg-gray-200 transition"
          >
            <h3 className="text-gray-800 font-semibold text-lg">
              {project.title}
            </h3>
            <p className="text-gray-600 mt-1">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-300 text-gray-700 text-sm px-2 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PublicationsContent() {
  const publications = [
    {
      title: "Understanding User Privacy Decisions",
      authors: "Dovichi, L., et al.",
      venue: "CHI 2024",
      link: "#",
    },
    {
      title: "Automated Privacy Policy Analysis",
      authors: "Dovichi, L., Ur, B., et al.",
      venue: "USENIX Security 2023",
      link: "#",
    },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-gray-700 text-2xl font-bold p-2">Publications</h1>
      <div className="space-y-4 p-2">
        {publications.map((pub) => (
          <div
            key={pub.title}
            className="bg-gray-100 rounded-lg p-4 hover:bg-gray-200 transition"
          >
            <a
              href={pub.link}
              className="text-blue-600 hover:underline font-semibold text-lg"
            >
              {pub.title}
            </a>
            <p className="text-gray-600 mt-1">{pub.authors}</p>
            <p className="text-gray-500 text-sm mt-1 italic">{pub.venue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactContent() {
  return (
    <div className="space-y-4">
      <h1 className="text-gray-700 text-2xl font-bold p-2">Contact</h1>
      <div className="p-2 space-y-4">
        <p className="text-gray-700 text-lg">
          Feel free to reach out! I'm always happy to chat about research,
          projects, or opportunities.
        </p>

        <div className="space-y-3">
          <a
            href="mailto:luca@example.com"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>luca@example.com</span>
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span>GitHub</span>
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            <span>LinkedIn</span>
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
            <span>Twitter</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
