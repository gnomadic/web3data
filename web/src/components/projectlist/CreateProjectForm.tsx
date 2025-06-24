
import React, { useState } from "react";

type Props = {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  onCreate: (name: string, desc: string) => void;
};

export function CreateProjectForm({ open, onOpenChange, onCreate }: Props) {

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Project name is required");
      return;
    }
    onCreate(name.trim(), desc.trim());
    setName("");
    setDesc("");
    setError("");
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <form
        className="bg-card shadow-xl rounded-lg w-full max-w-md p-8 flex flex-col gap-4 border border-border"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-2 font-title">New Project</h2>
        <input
          className="border border-border rounded px-4 py-2 bg-muted/40"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="border border-border rounded px-4 py-2 bg-muted/40"
          placeholder="Project Description"
          rows={3}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        {error && <div className="text-red-500 text-sm mb-1">{error}</div>}
        <div className="flex justify-end gap-3 mt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-3 py-2 rounded bg-muted border border-border hover:bg-muted/60 transition text-muted-foreground"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-primary text-primary-foreground font-semibold hover:bg-primary/80 transition"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}
