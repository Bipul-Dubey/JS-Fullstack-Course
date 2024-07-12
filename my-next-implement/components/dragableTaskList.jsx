import React, { useState } from "react";

const TASK_MAIN_DIV_STYLE = {
  backgroundColor: "gray",
  height: "100%",
  width: "100%",
  padding: 5,
  display: "flex",
  flexDirection: "column",
  gap: 20,
};

const TASK_CARD_DIV = {
  backgroundColor: "#2b3e04",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer",
};

function DragableTaskList() {
  const [backLog, setBackLog] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [sourceListName, setSourceListName] = useState("");
  const [newTask, setNewTask] = useState("");

  const handleOnDrag = (e, item, listName) => {
    setDraggedItem(item);
    setSourceListName(listName);
  };

  const handleOnDrop = (e, targetList, setTargetList, targetListName) => {
    e.preventDefault();

    if (sourceListName === targetListName) {
      return; // No action needed if dropped in the same list
    }

    // Remove item from source list
    const updateSourceList = (listName, setList) => {
      switch (listName) {
        case "backLog":
          setBackLog((list) =>
            list.filter((task) => task.id !== draggedItem.id)
          );
          break;
        case "inProgress":
          setInProgress((list) =>
            list.filter((task) => task.id !== draggedItem.id)
          );
          break;
        case "completed":
          setCompleted((list) =>
            list.filter((task) => task.id !== draggedItem.id)
          );
          break;
        default:
          break;
      }
    };
    updateSourceList(sourceListName);

    // Add item to target list
    setTargetList([...targetList, draggedItem]);

    // Clear dragged item and source list
    setDraggedItem(null);
    setSourceListName("");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 7,
      }}
    >
      <div
        style={{
          minHeight: "100px",
          height: "200px",
          maxHeight: "200px",
          width: "90%",
          marginTop: 20,
          backgroundColor: "#f3ecec",
          padding: 4,
          borderRadius: 7,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <h2>Add new Task</h2>
        <textarea
          value={newTask}
          style={{ height: "90%", maxWidth: "100%", width: "100%", padding: 7 }}
          onChange={(e) => {
            setNewTask(e.target.value.trimStart());
          }}
        ></textarea>
        <button
          style={{
            padding: 7,
            fontSize: "1.1rem",
            backgroundColor: "#608df6",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            cursor: "pointer",
          }}
          onClick={() => {
            if (!newTask) return;
            const newTaskData = {
              name: newTask,
              id: backLog.length + inProgress.length + completed.length + 1,
            };
            setBackLog([...backLog, newTaskData]);
            setNewTask("");
          }}
        >
          Add Task
        </button>
      </div>
      <div
        style={{
          height: "90vh",
          width: "90%",
          backgroundColor: "ThreeDShadow",
          color: "white",
          padding: 20,
          display: "flex",
          flexDirection: "row",
          gap: 5,
        }}
      >
        <div
          style={TASK_MAIN_DIV_STYLE}
          onDragOver={handleDragOver}
          onDrop={(e) => handleOnDrop(e, backLog, setBackLog, "backLog")}
        >
          <h2 style={{ textAlign: "center" }}>Backlog</h2>
          {backLog.map((item) => (
            <div
              key={item.id}
              draggable
              style={TASK_CARD_DIV}
              onDragStart={(e) => handleOnDrag(e, item, "backLog")}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div
          style={TASK_MAIN_DIV_STYLE}
          onDragOver={handleDragOver}
          onDrop={(e) =>
            handleOnDrop(e, inProgress, setInProgress, "inProgress")
          }
        >
          <h2 style={{ textAlign: "center" }}>In Progress</h2>
          {inProgress.map((item) => (
            <div
              key={item.id}
              draggable
              style={TASK_CARD_DIV}
              onDragStart={(e) => handleOnDrag(e, item, "inProgress")}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div
          style={TASK_MAIN_DIV_STYLE}
          onDragOver={handleDragOver}
          onDrop={(e) => handleOnDrop(e, completed, setCompleted, "completed")}
        >
          <h2 style={{ textAlign: "center" }}>Completed</h2>
          {completed.map((item) => (
            <div
              key={item.id}
              draggable
              style={TASK_CARD_DIV}
              onDragStart={(e) => handleOnDrag(e, item, "completed")}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DragableTaskList;
