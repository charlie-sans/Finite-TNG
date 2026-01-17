import { useState, useEffect } from 'react';

const initialData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', role: 'Admin', lastLogin: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', role: 'Editor', lastLogin: '2024-01-14' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive', role: 'Viewer', lastLogin: '2024-01-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Active', role: 'Admin', lastLogin: '2024-01-16' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', status: 'Pending', role: 'Editor', lastLogin: '2024-01-12' },
  { id: 6, name: 'David Lee', email: 'david@example.com', status: 'Active', role: 'Viewer', lastLogin: '2024-01-13' },
  { id: 7, name: 'Eva Garcia', email: 'eva@example.com', status: 'Active', role: 'Editor', lastLogin: '2024-01-15' },
  { id: 8, name: 'Frank Miller', email: 'frank@example.com', status: 'Inactive', role: 'Admin', lastLogin: '2024-01-08' },
];

const statusColors = {
  Active: 'success',
  Inactive: 'danger',
  Pending: 'warning'
};

const roleColors = {
  Admin: 'purple',
  Editor: 'blue',
  Viewer: 'gray'
};

export default function DataTable() {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const itemsPerPage = 5;

  // Filter data based on search
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(paginatedData.map(item => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows(prev =>
      prev.includes(id)
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedRows.length === 0) return;
    
    if (window.confirm(`Delete ${selectedRows.length} selected item(s)?`)) {
      setData(prev => prev.filter(item => !selectedRows.includes(item.id)));
      setSelectedRows([]);
    }
  };

  const getStatusBadge = (status) => (
    <span className={`status-badge status-${statusColors[status]}`}>
      {status}
    </span>
  );

  const getRoleBadge = (role) => (
    <span className={`role-badge role-${roleColors[role]}`}>
      {role}
    </span>
  );

  return (
    <div className="data-table-container">
      <div className="table-header">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="table-actions">
          {selectedRows.length > 0 && (
            <button className="btn btn-danger" onClick={handleDeleteSelected}>
              <i className="fas fa-trash"></i> Delete ({selectedRows.length})
            </button>
          )}
          <button className="btn btn-primary" onClick={() => alert('Export feature coming soon!')}>
            <i className="fas fa-download"></i> Export
          </button>
          <button className="btn btn-success" onClick={() => alert('Add new user modal would open here')}>
            <i className="fas fa-plus"></i> Add User
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th onClick={() => handleSort('id')} className="sortable">
                ID {sortConfig.key === 'id' && (
                  <i className={`fas fa-chevron-${sortConfig.direction === 'asc' ? 'up' : 'down'}`}></i>
                )}
              </th>
              <th onClick={() => handleSort('name')} className="sortable">
                Name {sortConfig.key === 'name' && (
                  <i className={`fas fa-chevron-${sortConfig.direction === 'asc' ? 'up' : 'down'}`}></i>
                )}
              </th>
              <th>Email</th>
              <th onClick={() => handleSort('status')} className="sortable">
                Status {sortConfig.key === 'status' && (
                  <i className={`fas fa-chevron-${sortConfig.direction === 'asc' ? 'up' : 'down'}`}></i>
                )}
              </th>
              <th>Role</th>
              <th onClick={() => handleSort('lastLogin')} className="sortable">
                Last Login {sortConfig.key === 'lastLogin' && (
                  <i className={`fas fa-chevron-${sortConfig.direction === 'asc' ? 'up' : 'down'}`}></i>
                )}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr key={item.id} className={selectedRows.includes(item.id) ? 'selected' : ''}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item.id)}
                    onChange={() => handleSelectRow(item.id)}
                  />
                </td>
                <td>#{item.id}</td>
                <td>
                  <div className="user-info">
                    <div className="user-avatar">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <div className="user-name">{item.name}</div>
                    </div>
                  </div>
                </td>
                <td>{item.email}</td>
                <td>{getStatusBadge(item.status)}</td>
                <td>{getRoleBadge(item.role)}</td>
                <td>{item.lastLogin}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-icon" 
                      title="Edit"
                      onClick={() => alert(`Edit ${item.name}`)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="btn-icon btn-danger" 
                      title="Delete"
                      onClick={() => {
                        if (window.confirm(`Delete ${item.name}?`)) {
                          setData(prev => prev.filter(d => d.id !== item.id));
                        }
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                    <button 
                      className="btn-icon btn-info" 
                      title="View Details"
                      onClick={() => alert(`View details for ${item.name}`)}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {paginatedData.length === 0 && (
        <div className="empty-state">
          <i className="fas fa-users-slash"></i>
          <p>No users found</p>
        </div>
      )}

      <div className="table-footer">
        <div className="pagination-info">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} entries
        </div>
        
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <i className="fas fa-chevron-left"></i> Previous
          </button>
          
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        
        <div className="page-size">
          <select 
            value={itemsPerPage} 
            onChange={(e) => {
              setCurrentPage(1);
              // In real app, you'd update itemsPerPage state here
            }}
          >
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
            <option value="50">50 per page</option>
          </select>
        </div>
      </div>
    </div>
  );
}