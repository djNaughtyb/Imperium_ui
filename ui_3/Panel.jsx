import { useState } from "react";
import { api } from "../api/client";
import { useAuth } from "../state/auth";
import { useProject } from "../state/project";

export const Panel = ({ panel }) => {
  const { token } = useAuth();
  const { updatePanel } = useProject();

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(panel.text);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);

    try {
      const updated = await api(`/panels/${panel.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          text
        })
      });

      updatePanel(updated);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update panel:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-700 p-4 rounded-lg shadow-lg">
      {!isEditing ? (
        <div>
          <div className="text-lg font-bold mb-1">
            Panel {panel.order_index ?? ""}
          </div>

          <div className="text-sm text-gray-400 mb-2">
            Layout: {panel.layout}
          </div>

          <div className="p-2 bg-zinc-800 rounded text-gray-200 whitespace-pre-wrap">
            {panel.text}
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="mt-3 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </button>
        </div>
      ) : (
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border rounded bg-zinc-800 text-white"
          />

          <div className="mt-3 flex gap-2">
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
