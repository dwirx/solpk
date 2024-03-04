document.addEventListener('DOMContentLoaded', function() {
  let data = [];

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
      .then(response => response.text())
      .then(csvData => {
        data = parseCSV(csvData);
        localStorage.setItem('tableData', JSON.stringify(data));
        renderTable(data);
        setupSearch(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  function parseCSV(csvData) {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    const parsedData = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(value => value.trim());
      const row = {};
      for (let j = 0; j < headers.length; j++) {
        row[headers[j]] = values[j];
      }
      parsedData.push(row);
    }
    return parsedData;
  }

  function renderTable(data) {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';
    data.forEach(row => {
      const tr = document.createElement('tr');
      Object.values(row).forEach(value => {
        const td = document.createElement('td');
        td.textContent = value;
        tr.appendChild(td);
      });
      tableBody.appendChild(tr);
    });
  }

  function setupSearch(data) {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearch);

    function handleSearch() {
      const searchTerm = searchInput.value.trim().toLowerCase();
      const filteredData = data.filter(row => {
        return Object.values(row).some(value => {
          const regex = new RegExp(searchTerm, 'i');
          return regex.test(value);
        });
      });
      renderTable(filteredData);
    }
  }
});
