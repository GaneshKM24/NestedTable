let employees = [
    { id: 101, name: 'Harry Potter', designation: 'Software Engineer', email: 'harrypotter@example.com', phone: '9445567231', address: '123 Main St, Cityville', joinDate: '2020-01-15', profilePic: 'https://via.placeholder.com/50' },
    { id: 102, name: 'Hermione Granger', designation: 'HR Manager', email: 'hermionegranger@example.com', phone: '9467824679', address: '456 Oak Rd, Townsville', joinDate: '2019-06-12', profilePic: 'https://via.placeholder.com/50' },
    { id: 103, name: 'Ron Weasley', designation: 'Marketing Specialist', email: 'ronweasley@example.com', phone: '9876543210', address: '789 Pine St, Villagetown', joinDate: '2021-03-20', profilePic: 'https://via.placeholder.com/50' },
    { id: 104, name: 'Albus Dumbledore', designation: 'Product Manager', email: 'albusdumbledore@example.com', phone: '9123456780', address: '101 Birch St, Metro City', joinDate: '2020-11-04', profilePic: 'https://via.placeholder.com/50' },
    { id: 105, name: 'Lord Voldemort', designation: 'Sales Executive', email: 'lordvoldemort@example.com', phone: '9012345678', address: '202 Cedar Ave, Capital City', joinDate: '2022-05-30', profilePic: 'https://via.placeholder.com/50' }
  ];

  let currentPage = 1;
  let pageSize = 3;

  // Render table with pagination
  function renderTable() {
    const tableBody = document.getElementById("employeeTableBody");
    tableBody.innerHTML = "";
    const filteredEmployees = filterAndSortEmployees();
    const paginatedEmployees = filteredEmployees.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    paginatedEmployees.forEach(employee => {
      const row = document.createElement("tr");
      row.classList.add('hover-row');
      row.setAttribute("onclick", `toggleDetails(${employee.id})`);
      row.innerHTML = `
      <td>
        <img class="profile-pic" src="${employee.profilePic}" alt="${employee.name}"/> ${employee.name}
      </td>
      <td>${employee.id}</td>
      <td>${employee.designation}</td>
    `;

      const detailsRow = document.createElement("tr");
      detailsRow.classList.add('details-row');
      detailsRow.id = `details-${employee.id}`;
      detailsRow.innerHTML = `
      <td colspan="4">
        <table>
          <tr><th>Email</th><td>${employee.email}</td></tr>
          <tr><th>Phone</th><td>${employee.phone}</td></tr>
          <tr><th>Address</th><td>${employee.address}</td></tr>
          <tr><th>Joined</th><td>${employee.joinDate}</td></tr>
        </table>
      </td>
    `;

      tableBody.appendChild(row);
      tableBody.appendChild(detailsRow);
    });
  }

  // Toggle details row visibility
  function toggleDetails(employeeId) {
    const detailsRow = document.getElementById(`details-${employeeId}`);
    detailsRow.style.display = (detailsRow.style.display === 'table-row') ? 'none' : 'table-row';
  }

  function applySortingAndFiltering() {
    currentPage = 1;
    renderTable();
  }

  function filterAndSortEmployees() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const sortBy = document.getElementById("sortBy").value;
    const sortOrder = document.getElementById("sortOrder").value;
    const designationFilter = document.getElementById("designationFilter").value;

    let filteredEmployees = employees.filter(employee => {
      return (employee.name.toLowerCase().includes(searchTerm) ||
        employee.id.toString().includes(searchTerm)) &&
        (designationFilter ? employee.designation === designationFilter : true);
    });

    if (sortBy === 'id') {
      filteredEmployees.sort((a, b) => a.id - b.id);
    } else if (sortBy === 'name') {
      filteredEmployees.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'date') {
      filteredEmployees.sort((a, b) => new Date(a.joinDate) - new Date(b.joinDate));
    }

    if (sortOrder === 'desc') {
      filteredEmployees.reverse();
    }

    return filteredEmployees;
  }

  // Search employees based on input
  function searchEmployees() {
    renderTable();
  }


  // Pagination Functions
  function prevPage() {
    if (currentPage > 1) {
      currentPage--;
      renderTable();
    }
  }

  function nextPage() {
    const filteredEmployees = filterAndSortEmployees();
    if (currentPage * pageSize < filteredEmployees.length) {
      currentPage++;
      renderTable();
    }
  }

  renderTable();