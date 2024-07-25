import React from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const EditableRow = ({
  st,
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  const navigate = useNavigate();

  const handleSaveClick = async () => {
    // Ensure that the 'prac' property in editFormData is set to a default value if it's undefined
    const updatedFormData = { ...editFormData, prac: editFormData.prac || 0 };
    console.log("practical data : ", editFormData.prac);

    try {
      // Assuming st.subject_id is the ID of the subject being edited
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/updateSubject/${st.subject_id}`,
        updatedFormData
      );

      if (response.status === 200) {
        console.log("Subject updated successfully");
        // window.location.reload();

        handleCancelClick();
        navigate("/dashboard/SubjectMapping");
        // window.location.reload();
      } else {
        console.error("Failed to update subject");
      }
    } catch (error) {
      console.error("Error updating subject:", error);
    }
  };

  return (
    <tr>
      <td>{st.subject_name}</td>
      <td>{st.subject_code}</td>
      <td>
        {" "}
        <input
          type="text"
          required
          placeholder={editFormData.term_work}
          value={editFormData.term_work}
          onChange={handleEditFormChange}
          name="term_work"
        />{" "}
      </td>
      <td>
        {" "}
        <input
          type="text"
          required
          placeholder={editFormData.oral}
          value={editFormData.oral}
          onChange={handleEditFormChange}
          name="oral"
        />{" "}
      </td>
      <td>
        {" "}
        <input
          type="number"
          required
          placeholder={editFormData.practical}
          value={editFormData.practical}
          onChange={handleEditFormChange}
          name="practical"
        />{" "}
      </td>
      <td>
        {" "}
        <input
          type="text"
          required
          placeholder={editFormData.theory}
          value={editFormData.theory}
          onChange={handleEditFormChange}
          name="theory"
        />{" "}
      </td>
      <td>
        <button type="button" className="edit" onClick={handleSaveClick}>
          Save
        </button>
        <button
          type="button"
          className="editcancel"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
