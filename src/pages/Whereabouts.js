import React, { useState, useEffect, useMemo } from "react";
import "../assets/styles/table.css";
import "../assets/styles/sorter.css";
import "../assets/styles/popup.css";
import "../assets/styles/details-table.css";
import DIITLogo from "../assets/img/diit.jpg";
import DataTable from "../components/DataTable";
import supabase from "../config/supabaseClient";

function Whereabouts({ token }) {
  //details pop up
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const handleClosePopup = () => {
    setSelectedRow(null);
  };

  //


  const [userType, setUserType] = useState("");
  const [status, setStatus] = useState([]);
  const [department, setDepartment] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [accountStatus, setAccountStatus] = useState(null);
  const [account_confirmed_at, setAccountConfirmedAt] = useState(null)

  const handleDepartmentChange = (departmentName) => {
    setSelectedDepartment(departmentName);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', token.user.id)
        .single()

      if (data) {
        setUserType(data.usertype)
        setAccountConfirmedAt(data.account_confirmed_at)
        setAccountStatus(data.accountStatus)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchStatusData = async () => {
      const { data, error } = await supabase
        .from('status')
        .select('statusName, statusColor');
      setStatus(data);
    };

    fetchStatusData();
  }, []);

  useEffect(() => {
    const fetchDepartment = async () => {
      const { data, error } = await supabase
        .from('department')
        .select()
      if (data) {
        setDepartment(data)
      }
    }
    fetchDepartment()
  }, []);

  const [data, setData] = useState([]);

  const columns = useMemo(() => {
    if (userType === "student" || !accountStatus || !account_confirmed_at || !token.user.email_confirmed_at) {
      return [
        {
          Header: "Name",
          accessor: "name",
          Cell: ({ row }) => (
            <div
              className="name-cell"
              onClick={(e) => {
                if (e.target.classList.contains("name-cell")) {
                  handleRowClick(row);
                }
              }}
            >
              {row.original.name}
            </div>
          ),
        },
        {
          Header: "Department",
          accessor: "departmentName",
        },
        {
          Header: "",
          accessor: "status",
          Cell: ({ value }) => (
            <div
              title={value}
              className="status-circle"
              style={{
                backgroundColor: status.find((status) => status.statusName === value)?.statusColor || "none",
              }}
            >
              {value}
            </div>
          ),
        },
      ];
    } else {
      return [
        {
          Header: "Name",
          accessor: "name",
          Cell: ({ row }) => (
            <div
              className="name-cell"
              onClick={(e) => {
                if (e.target.classList.contains("name-cell")) {
                  handleRowClick(row);
                }
              }}
            >
              {row.original.name}
            </div>
          ),
        },
        {
          Header: "Department",
          accessor: "departmentName",
        },
        {
          Header: "Room Name",
          accessor: "roomName",
        },
        {
          Header: "Room Number",
          accessor: "roomNumber",
        },
        {
          Header: "Activity",
          accessor: "activityName",
        },
        {
          Header: "",
          accessor: "status",
          Cell: ({ value }) => (
            <div
              title={value}
              className="status-circle"
              style={{
                backgroundColor: status.find((status) => status.statusName === value)?.statusColor || "none",
              }}
            >
              {value}
            </div>
          ),
        },
      ];
    }
  }, [userType, status]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: instructorData, error } = await supabase
          .from('whereabouts')
          .select('*, profiles(*)')
          .order('time', { ascending: false })

        if (error) {
          throw new Error(error.message);
        }

        const formattedData = instructorData
          .filter((data) => data.profiles.accountStatus !== null && (selectedDepartment === null || data.profiles.departmentname === selectedDepartment))
          .map((data) => ({
            status: data.profiles.status,
            salutation: data.profiles.salutation,
            name: `${data.profiles.lastname + ','} ${data.profiles.firstname} ${data.profiles.middlename.charAt(0).toUpperCase() + '.'}`,
            roomName: data.roomName ?? null,
            roomNumber: data.roomNumber ?? null,
            activityName: data.activityName ?? null,
            departmentName: data.profiles.departmentname,
            departmentAcronym: data.profiles.departmentAcronym,

            //name format for whereabouts popup
            name_popup: `${data.profiles.firstname} ${data.profiles.middlename.charAt(0).toUpperCase() + '.'} ${data.profiles.lastname}`,
          }));

        formattedData.sort((a, b) => {
          if (a.status === null && b.status === null) {
            if (a.roomName || a.roomNumber || a.activityName) return -1;
            if (b.roomName || b.roomNumber || b.activityName) return 1;
            return 0;
          }
          if (a.status === null) return 1;
          if (b.status === null) return -1;
          if (!a.roomName && !a.roomNumber && !a.activityName) return -1;
          if (!b.roomName && !b.roomNumber && !b.activityName) return 1;
          return 0;
        });

        setData(formattedData || []);
      } catch (error) {
        console.error("Error fetching instructor data:", error);
      }
    };

    fetchData();

    const handleSubscription = supabase
      .channel('any')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'profiles' }, payload => {
        fetchData();
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'whereabouts' }, payload => {
        fetchData();
      })
      .subscribe();

    return () => {
      handleSubscription.unsubscribe();
    };
  }, [selectedDepartment]);

  return (
    <>
      <div className="sorter-container">
        <div className="sorter-item" onClick={() => handleDepartmentChange(null)}>
          <button>All</button>
        </div>

        {department && (
          <>
            {department.map((department, index) => (
              <div className="sorter-item" key={index} onClick={() => handleDepartmentChange(department.departmentAcronym)}>
                <div className="sorter-item-overlay" />
                <img src="" alt={department.departmentAcronym} />
              </div>
            ))}
          </>
        )}
      </div>
      <DataTable
          columns={columns}
          data={data}
          onRowClick={handleRowClick}
          highlightedRowIndex={selectedRow && selectedRow.index}
        />
      {selectedRow && (
          <div className="whereabouts-details-pop-up">
            <div className="pop-up-overlay">
                <div className="pop-up-content">
                    <img src={DIITLogo} alt="profile picture"/>
                    <h3>{selectedRow.original.salutation} {selectedRow.original.name_popup}'s Whereabouts</h3>
                    <p>{selectedRow.original.departmentName}</p>
                    <div className="details-table-wrapper">
                        <table className="details-table">
                            <tr>
                                <td>Room/Office name</td>
                                <td>:</td>
                                <td id="department">{selectedRow.original.roomName}</td>
                            </tr>
                            <tr>
                                <td>Room number</td>
                                <td>:</td>
                                <td id="department">{selectedRow.original.roomNumber}</td>
                            </tr>
                            <tr>
                                <td>Activity</td>
                                <td>:</td>
                                <td id="department">{selectedRow.original.activityName}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>:</td>
                                <td id="department">{selectedRow.original.status}</td>
                            </tr>
                        </table>
                    </div>
                    <button onClick={handleClosePopup}>Close</button>
                    
                </div>
            </div>
          </div>
        )}
    </>
  );
}

export default Whereabouts;
