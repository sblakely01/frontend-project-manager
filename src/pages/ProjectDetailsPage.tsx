import { useEffect, useState } from "react";
import { apiClient } from "../clients/api";
import { useParams } from "react-router-dom";
import type { Project, Task, Status } from "../types";

function ProjectDetailsPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState<Status>("todo");

  const { projectId } = useParams();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        const [projectRes, taskRes] = await Promise.all([
          apiClient.get(`/api/projects/${projectId}`),
          apiClient.get(`/api/projects/${projectId}/tasks`),
        ]);

        console.log(projectRes.data);
        console.log(taskRes.data);
        setProject(projectRes.data);
        setTasks(taskRes.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (loading) return <div className="text-3xl text-white">Loading...</div>;

  if (error)
    return <div className="text-3xl text-white">Error Loading Project</div>;

  const deleteTask = (taskId: string | undefined) => {
    try {
      apiClient.delete(`/api/projects/${projectId}/tasks/${taskId}`);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    }
  };

  const saveTaskChanges = async (taskId: string | undefined) => {
    try {
      const res = await apiClient.put(
        `/api/projects/${projectId}/tasks/${taskId}`,
        {
          title: editTitle,
          description: editDescription,
          status: editStatus,
        }
      );

      setTasks((prev) => prev.map((t) => (t._id === taskId ? res.data : t)));

      setEditingTaskId(null);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleTaskForm = () => {
    try {
      apiClient.post(`/api/projects/${projectId}/tasks`, {
        project: projectId,
        title: title,
        description: description,
        status: "todo",
      });
      setTitle("");
      setDescription("");
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    }
  };

  const startEditing = (task: Task) => {
    setEditingTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditStatus(task.status);
  };

  return (
    <div className="text-white">
      <h1 className="text-4xl">Project Details</h1>

      <div className="mt-10">
        <div className="text-3xl text-center">{project?.name}</div>
        <div className="text-xl text-center">{project?.description}</div>
        <form className="flex flex-col gap-8 border m-5 border-blue-500 text-center">
          <h2 className="text-center text-xl">Create New Task</h2>
          <label htmlFor="title">Task Title</label>
          <input
            placeholder="Enter Task Title..."
            name="title"
            className="m-10"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <label htmlFor="description">Task Description</label>
          <input
            placeholder="Enter Description..."
            name="description"
            className="m-10"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <button type="submit" onClick={handleTaskForm} className="text-white w-50 flex flex-col bg-cyan-500 shadow-lg shadow-cyan-500/5 p-2 text-center self-center rounded">
            Create Task
          </button>
        </form>
        <div className="border border-indigo-500 m-3">
            <h2 className="text-center text-xl">Existing Tasks</h2>
            <div className="grid grid-cols-2 gap-5">
            {tasks &&
                tasks.map((task) => (
                <div
                    key={task._id}
                    className="text-white text-center flex flex-col gap-3 border m-5 border-blue-500"
                >
                    {editingTaskId === task._id ? (
                    <>
                        <input
                        value={editTitle}
                        className="mt-5 mb-5"
                        onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <textarea
                        value={editDescription}
                        className="mt-5 mb-5"
                        onChange={(e) => setEditDescription(e.target.value)}
                        />
                        <select
                        value={editStatus}
                        className="text-white bg-black mt-5 mb-5"
                        onChange={(e) => setEditStatus(e.target.value as Status)}
                        >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                        </select>
                        <button onClick={() => saveTaskChanges(task._id)} className="text-white w-50 flex flex-col bg-cyan-500 shadow-lg shadow-cyan-500/5 p-2 m-2 text-center rounded">
                        Save Changes
                        </button>
                        <button onClick={() => setEditingTaskId(null)} className="text-white w-50 flex flex-col bg-cyan-500 shadow-lg shadow-cyan-500/5 p-2 m-2 text-center rounded">
                        Cancel
                        </button>
                    </>
                    ) : (
                    <>
                        <div className="font-bold">{task.title}</div>
                        <div>{task.description}</div>
                        <div className="flex flex-row justify-around gap-5">
                        <button onClick={() => deleteTask(task._id)} className="text-white w-50 flex flex-col bg-cyan-500 shadow-lg shadow-cyan-500/5 p-2 m-2 text-center rounded">
                            Delete
                        </button>
                        <div>{task.status}</div>
                        <button onClick={() => startEditing(task)} className="text-white w-50 flex flex-col bg-cyan-500 shadow-lg shadow-cyan-500/5 p-2 m-2 text-center rounded">Edit</button>
                        </div>
                    </>
                    )}
                </div>
                ))}
                </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailsPage;
