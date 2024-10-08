"use client";
import { Task } from "@/components/Task/Task";
import { TaskForm } from "@/components/TaskForm/TaskForm";
import { useTheme } from "@/context/Theme/ThemeContext";
import { GitHubLogoIcon, SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

type ThemeType = "light" | "dark";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    const initialTasks = savedTasks ? JSON.parse(savedTasks) : [];
    setTasks(initialTasks);
  }, []);

  const handleNewTask = (newTask: Task) => {
    const updatedTasks = [...tasks, newTask];

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleIsDoneTask = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isDone: !task.isDone } : task
    );

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const themeClasses: Record<ThemeType, string> = {
    light: "bg-light-background text-light-text",
    dark: "bg-dark-background text-dark-text",
  };

  const completedTasks = tasks.filter((task) => task.isDone).length;
  const totalTasks = tasks.length;

  return (
    <main className={`min-h-screen ${themeClasses[theme]}`}>
      <div className="flex flex-col gap-5 min-h-screen w-full px-4 py-5 m-auto font-[family-name:var(--font-geist-sans)] md:w-[767px]">
        <header className="flex justify-between align-middle">
          <h1 className="font-bold text-lg">Listify</h1>
          <div className="flex gap-4">
            <button
              className={`hover: bg-${theme}-secondaryBackground`}
              onClick={() =>
                window.open("https://github.com/imcasero/Listify", "_blank")
              }
            >
              <GitHubLogoIcon width={20} height={20} />
            </button>
            <button
              onClick={toggleTheme}
              className={`hover: bg-${theme}-secondaryBackground`}
            >
              {theme === "light" ? (
                <MoonIcon width={20} height={20} />
              ) : (
                <SunIcon width={20} height={20} />
              )}
            </button>
          </div>
        </header>
        <p className="w-full">
          Stay on top of your tasks with simple scheduling and tracking. Create,
          complete, and manage your to-dos effortlessly
        </p>
        <TaskForm addTask={handleNewTask} />
        <section className="flex flex-col gap-2">
          <p className="mb-2">
            Your tasks{" "}
            <span
              className={`rounded-lg border border-${theme}-text py-1 px-2 w-8`}
            >
              {completedTasks}/{totalTasks}
            </span>
          </p>
          {tasks.map((data) => (
            <Task
              key={data.id}
              title={data.title}
              isDone={data.isDone}
              id={data.id}
              handleIsDoneTask={handleIsDoneTask}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
