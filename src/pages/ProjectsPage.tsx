import { useEffect, useState } from "react";
import { apiClient } from "../clients/api";
import { Link } from "react-router-dom";
import type { Project } from "../types";

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get("/api/projects");
        console.log(res.data);
        setProjects(res.data);
      } catch (error: any) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="text-3xl text-white">Loading...</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await apiClient.post("/api/projects", { name, description });
      setProjects((prev) => [...prev, res.data]);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
      setName("")
      setDescription("")
    }
  };
  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold text-white">Projects</h1>

      <form
        onSubmit={handleSubmit}
        className=" border p-2 h-50 mt-10 flex flex-col gap-2 rounded"
      >
        <label htmlFor="project-name">Project Name: </label>
        <input
          type="text"
          name="project-name"
          className="border"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="project-description">Project Description</label>
        <input
          type="text"
          name="project-description"
          className="border"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="submit"
          value="Create Project"
          className="mt-auto bg-cyan-500 shadow-lg font-bold shadow-cyan-500/50 text-white rounded hover:bg-cyan-200 hover:text-black"
        />
      </form>

      {error && <div>{error}</div>}

      <div className="w-full flex gap-5 mt-10">
        {projects &&
          projects.map((project) => (
            <div
              key={project._id}
              className="text-white w-70 flex flex-col h-50 border border-blue-500 p-2 text-center rounded"
            >
              <div className="font-bold">{project.name}</div>
              <div>{project.description}</div>
               <button className="mt-auto font-bold bg-emerald-300 shadow-lg shadow-emerald-300/50 text-white rounded hover:bg-emerald-100 hover:text-black">Delete Project</button>
              <button className="mt-auto bg-cyan-500 font-bold shadow-lg shadow-cyan-500/50 text-white rounded hover:bg-cyan-200 hover:text-black">Edit Project</button>
              <Link
                to={`/projects/${project._id}`}
                className="mt-auto bg-indigo-500 shadow-lg font-bold shadow-indigo-500/50 text-white rounded hover:bg-indigo-200 hover:text-black"
              >
                See Project
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProjectsPage;