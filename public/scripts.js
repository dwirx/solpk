document.addEventListener('DOMContentLoaded', function() {
  let data = [];

  // Check if data is available in local storage
  const savedData = localStorage.getItem('tableData');
  if (savedData) {
    data = JSON.parse(savedData);
    renderTable(data);
    setupSearch(data);
  } else {
    fetchData();
  }

  function fetchData() {
    fetch('so.csv')
      .then(response => response.json())
      .then(fetchedData => {
        data = fetchedData;
        localStorage.setItem('tableData', JSON.stringify(data)); // Save data to local storage
        renderTable(data);
        setupSearch(data);
      });
  }

  function renderTable(data) {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';
    data.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row['NO.']}</td>
        <td>${row['NAMA_SO']}</td>
        <td>${row['PROVINSI']}</td>
        <td>${row['ALAMAT']}</td>
        <td>${row['MASA_IZIN']}</td>
      `;
      tableBody.appendChild(tr);
    });
  }

  function setupSearch(data) {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        handleSearch();
      }
    });

    function handleSearch() {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredData = data.filter(row => {
        return Object.values(row).some(value => {
          return value.toLowerCase().includes(searchTerm);
        });
      });
      renderTable(filteredData);
    }
  }
});
