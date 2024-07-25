import axios from "axios";
import toast from "react-hot-toast";

export const getClassroomData = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getClassroomData`
    );
    console.log("Classroom Data:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching classroom data:", error.message);
  }
};
export const getFinalAssignBench = async (classNumber) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/finalAssignBench/${classNumber}`
    );
    console.log("Final Assign Bench Data:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching final assign bench data:", error.message);
  }
};

export const getAssignedStudents = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getAssignedStudents`
    );
    console.log("Assigned Data:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching Assigned data:", error.message);
  }
};
export const getRoomSides = async (classNumber) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getRoomSides/${classNumber}`
    );
    console.log("Class Data:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching Class data:", error.message);
  }
};

export const clearAssignedStudents = async (roomNumber) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/clearAssignedStudents/${roomNumber}`
    );
    console.log("Clearing successful:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error clearing assigned students:", error.message);
  }
};

export const createNewAssignment = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/createNewAssignment`,
      data
    );
    console.log("Created New Assignment:", res.data);
    return res.data;
  } catch (error) {
    toast("Duplicates Found!");
    throw error; // Propagate the error to handle it where this function is called
  }
};

export const getTotalStudents = async (branchId, sem, division) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getTotalStudents`,
      {
        params: {
          branch_id: branchId,
          semester: sem,
          division: division,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching total students:", error.message);
  }
};

export const getSubjectsData = async (branchId, sem) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getSubjectsData`,
      {
        params: {
          branch_id: branchId,
          semester: sem,
        },
      }
    );
    console.log("Subject Data: ", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching subject data:", error.message);
  }
};
export const getBranchData = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getbranchdata`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching branch data:", error.message);
  }
};
export const getSemesterData = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getSemesterData`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching semester data:", error.message);
  }
};
