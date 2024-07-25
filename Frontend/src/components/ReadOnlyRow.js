const ReadOnlyRow = ({ subject, selectedSubject, handleEditClick }) => {
    console.log("Selected Subject:", selectedSubject);
    // console.log("Current Subject:", subject.subject_id);
    // console.log("practicals",subject);
  
    return (
      <>
        {subject && (selectedSubject.includes(selectedSubject.trim())) ? (
          <tr>
            <td>{subject.subject_name}</td>
            <td>{subject.sub}</td>
            <td>{subject.term_work}</td>
            <td>{subject.oral}</td>
            <td>{subject.practical}</td>
            <td>{subject.theory}</td>
            <td>
              <button
                className='btn btn-primary'
                onClick={(event) => handleEditClick(event, subject)}
              >
                Edit
              </button>
            </td>
          </tr>
        ) : (
          <tr>
            <td colSpan="8">No data available</td>
          </tr>
        )}
      </>
    );
  };
  
  export default ReadOnlyRow;
  