import React, { useState, useEffect } from "react";
import styles from "@/components/styles/AddNewBoardModal.module.css";
import Loading from "@/app/loading";
import ColToAdd from "./ColToAdd";
import { useAppContext } from "@/context/appContext";

const AddNewBoardModal = ({ setData, data }) => {
  let nextBoardIndex = data.length + 1;
  const [boardToAdd, setBoardToAdd] = useState({
    id: nextBoardIndex,
    name: "",
    columns: [],
  });
  const [numberOfExistingColumns, setNumberOfExistingColumns] = useState(null);
  const [columnsToAdd, setColumnsToAdd] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setAddNewBoardOpen } = useAppContext();

  useEffect(() => {
    // Fetch all columns
    const fetchColumns = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/columns");
        if (!response.ok) {
          throw new Error("Error fetching columns");
        }
        const data = await response.json();
        setNumberOfExistingColumns(data.length);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching columns: ", error);
        setLoading(false);
      }
    };

    fetchColumns();
  }, []);

  const handleBoardNameChange = (e) => {
    setBoardToAdd((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleColCreationSubmit = (e) => {
    e.preventDefault();

    const newColumn = {
      id: numberOfExistingColumns + 1,
      name: e.target.value || "Column name",
      boardId: boardToAdd.id,
      color: "",
      tasks: [],
    };

    setColumnsToAdd((prev) => [...prev, newColumn]);

    setNumberOfExistingColumns((prev) => prev + 1);
  };

  const handleColumnNameChange = (id, newName) => {
    setColumnsToAdd((prev) =>
      prev.map((col) => (col.id === id ? { ...col, name: newName } : col))
    );
  };

  const handleCreateNewBoard = async (e) => {
    e.preventDefault();

    if (!boardToAdd.name.trim()) return; // Prevent creating board with empty name

    const finalBoardToAdd = {
      ...boardToAdd,
      columns: columnsToAdd,
    };

    // Update DB
    try {
      const response = await fetch("/api/boards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalBoardToAdd),
      });
      if (!response.ok) {
        throw new Error("Failed to create new board");
      }

      const newBoard = await response.json();
      setData((prev) => [...prev, newBoard]);
      setAddNewBoardOpen(false); // Close modal after success
      setColumnsToAdd([]);
      setNumberOfExistingColumns(0); // Reset column count
    } catch (error) {
      console.error("Error creating new board:", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <h2 className={styles.title}>Add New Board</h2>
        <form className={styles.form}>
          <div className={styles.nameDiv}>
            <label className={styles.label} htmlFor="name">
              Name
            </label>
            <input
              placeholder="e.g. Web Design"
              className={styles.nameInput}
              type="text"
              onChange={handleBoardNameChange}
              value={boardToAdd.name}
            />
          </div>
          <div className={styles.columnsDiv}>
            <p>Columns</p>
            <div className={styles.columns}>
              {columnsToAdd.map((col) => (
                <ColToAdd
                  id={col.id}
                  onChange={(e) =>
                    handleColumnNameChange(col.id, e.target.value)
                  }
                  value={col.name}
                  key={col.id}
                />
              ))}
              <button
                onClick={(e) => handleColCreationSubmit(e)}
                className={styles.addNewColButton}
              >
                + Add New Column
              </button>
            </div>
            <button
              onClick={handleCreateNewBoard}
              className={styles.createBoardButton}
            >
              Create New Board
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewBoardModal;
