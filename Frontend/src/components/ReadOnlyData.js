const ReadOnlyData = ({ subject, selectedSubjects, handleEditClick }) => {
    console.log("Selected Subjects:", selectedSubjects);
    console.log("Faculty Data : ", subject);
    // console.log("Current Subject:", subject.subject_id);
    // console.log("practicals",subject);
  
    return (
      <tr>
        <td>{subject.subject_name}</td>
        <td>{subject.subject_code}</td>
        <td>{subject.faculty_name}</td>
        <td>{subject.division}</td>
        <td>{subject.year}</td>
        <td>
          <button
            className='btn btn-primary'
            onClick={(event) => handleEditClick(event, subject)}
          >
            Edit
          </button>
        </td>
      </tr>
    );
  };
  
  export default ReadOnlyData;
  