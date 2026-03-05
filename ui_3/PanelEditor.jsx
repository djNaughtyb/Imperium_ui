import { useState } from "react";
import { api } from "../api/client";
import { useAuth } from "../state/auth";
import { useProject } from "../state/project";

export const PanelEditor = () => {
  const { token } = useAuth();
  const { projectId, addPanel } = useProject();

  const [text, setText] = useState("");
  const [layout, setLayout] = useState("grid");
  const [loading, setLoading] = useState(false);

  const handleAddPanel = async () => {
    if (!text.trim() || !projectId) return;

    setLoading(true);

    try {
      const panel = await api("/panels/manual", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          project_id: projectId,
          text,
          layout
        })
      });

      addPanel(panel);
      setText("");
    } catch (err) {
      console.error("Failed to create panel:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded bg-zinc-900 text-white">
      <div className="text-lg font-bold mb-2">Panel Editor</div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter panel content..."
        className="w-full p-2 border rounded mb-3 bg-zinc-800"
      />

      <div className="flex items-center gap-3">
        <button
          onClick={handleAddPanel}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Panel"}
        </button>

        <select
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
          className="px-2 py-1 border rounded bg-zinc-800"
        >
          <option value="grid">Grid View</option>
          <option value="list">List View</option>
          <option value="2-col">2 Column</option>
          <option value="3-col">3 Column</option>
        </select>
      </div>
    </div>
  );
};
