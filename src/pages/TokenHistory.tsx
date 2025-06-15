import React, { useState, useEffect } from 'react';

interface Token {
  id: string;
  dataType: string;
  service: string;
  createdAt: string;
  expiresAt: string;
  status: 'active' | 'expired' | 'revoked';
  accessCount: number;
  oneTimeAccess: boolean;
}

function TokenHistory() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Simulate API call
    const fetchTokens = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockTokens: Token[] = [
        {
          id: 'TKN-001',
          dataType: 'Bank Account Details',
          service: 'PaymentApp Pro',
          createdAt: '2024-01-15T10:30:00Z',
          expiresAt: '2024-01-16T10:30:00Z',
          status: 'active',
          accessCount: 3,
          oneTimeAccess: false
        },
        {
          id: 'TKN-002',
          dataType: 'Income Information',
          service: 'BudgetTracker',
          createdAt: '2024-01-14T14:20:00Z',
          expiresAt: '2024-01-21T14:20:00Z',
          status: 'active',
          accessCount: 1,
          oneTimeAccess: false
        },
        {
          id: 'TKN-003',
          dataType: 'Credit Score',
          service: 'LoanAnalyzer',
          createdAt: '2024-01-13T09:15:00Z',
          expiresAt: '2024-01-14T09:15:00Z',
          status: 'expired',
          accessCount: 2,
          oneTimeAccess: false
        },
        {
          id: 'TKN-004',
          dataType: 'Transaction History',
          service: 'CreditMonitor',
          createdAt: '2024-01-12T16:45:00Z',
          expiresAt: '2024-01-19T16:45:00Z',
          status: 'revoked',
          accessCount: 1,
          oneTimeAccess: true
        }
      ];
      
      setTokens(mockTokens);
      setLoading(false);
    };

    fetchTokens();
  }, []);

  const handleRevokeToken = async (tokenId: string) => {
    setTokens(prev => prev.map(token => 
      token.id === tokenId ? { ...token, status: 'revoked' as const } : token
    ));
    
    // Show success message
    const toast = document.createElement('div');
    toast.className = 'toast align-items-center text-white bg-warning border-0 position-fixed top-0 end-0 m-3';
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          <i class="bi bi-check-circle me-2"></i>
          Token ${tokenId} has been revoked successfully.
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    `;
    document.body.appendChild(toast);
    
    const bootstrapToast = new (window as any).bootstrap.Toast(toast);
    bootstrapToast.show();
    
    toast.addEventListener('hidden.bs.toast', () => {
      document.body.removeChild(toast);
    });
  };

  const filteredTokens = tokens.filter(token => {
    const matchesSearch = token.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         token.dataType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         token.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || token.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success';
      case 'expired':
        return 'bg-warning';
      case 'revoked':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary\" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 fade-in">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="fw-bold mb-1">Token History</h1>
              <p className="text-muted mb-0">Manage and monitor your data access tokens</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-6">
              <label htmlFor="search" className="form-label">Search Tokens</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="search"
                  placeholder="Search by service, data type, or token ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <label htmlFor="statusFilter" className="form-label">Filter by Status</label>
              <select
                className="form-select"
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="revoked">Revoked</option>
              </select>
            </div>
            <div className="col-md-3">
              <div className="text-muted small">
                Showing {filteredTokens.length} of {tokens.length} tokens
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tokens Table */}
      <div className="card">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Token ID</th>
                  <th>Data Type</th>
                  <th>Service</th>
                  <th>Created</th>
                  <th>Expires</th>
                  <th>Access Count</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTokens.map((token) => (
                  <tr key={token.id}>
                    <td>
                      <code className="text-primary">{token.id}</code>
                      {token.oneTimeAccess && (
                        <div>
                          <span className="badge bg-info text-dark small">One-time</span>
                        </div>
                      )}
                    </td>
                    <td>{token.dataType}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-building me-2 text-muted"></i>
                        {token.service}
                      </div>
                    </td>
                    <td>
                      <small className="text-muted">{formatDate(token.createdAt)}</small>
                    </td>
                    <td>
                      <small className="text-muted">{formatDate(token.expiresAt)}</small>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark">{token.accessCount}</span>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(token.status)}`}>
                        {token.status.charAt(0).toUpperCase() + token.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          data-bs-toggle="modal"
                          data-bs-target={`#tokenModal${token.id}`}
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                        {token.status === 'active' && (
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRevokeToken(token.id)}
                          >
                            <i className="bi bi-x-circle"></i>
                          </button>
                        )}
                      </div>

                      {/* Token Details Modal */}
                      <div className="modal fade" id={`tokenModal${token.id}`} tabIndex={-1}>
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Token Details</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                              <div className="row g-3">
                                <div className="col-12">
                                  <strong>Token ID:</strong>
                                  <div className="mt-1">
                                    <code className="text-primary">{token.id}</code>
                                  </div>
                                </div>
                                <div className="col-12">
                                  <strong>Service:</strong>
                                  <div className="mt-1">{token.service}</div>
                                </div>
                                <div className="col-12">
                                  <strong>Data Type:</strong>
                                  <div className="mt-1">{token.dataType}</div>
                                </div>
                                <div className="col-6">
                                  <strong>Created:</strong>
                                  <div className="mt-1 small text-muted">{formatDate(token.createdAt)}</div>
                                </div>
                                <div className="col-6">
                                  <strong>Expires:</strong>
                                  <div className="mt-1 small text-muted">{formatDate(token.expiresAt)}</div>
                                </div>
                                <div className="col-6">
                                  <strong>Status:</strong>
                                  <div className="mt-1">
                                    <span className={`badge ${getStatusBadge(token.status)}`}>
                                      {token.status.charAt(0).toUpperCase() + token.status.slice(1)}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <strong>Access Count:</strong>
                                  <div className="mt-1">{token.accessCount} times</div>
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                              {token.status === 'active' && (
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => {
                                    handleRevokeToken(token.id);
                                    // Close modal
                                    const modal = document.getElementById(`tokenModal${token.id}`);
                                    const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modal);
                                    bootstrapModal.hide();
                                  }}
                                >
                                  Revoke Token
                                </button>
                              )}
                              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredTokens.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-inbox display-1 text-muted mb-3"></i>
              <h5 className="text-muted">No tokens found</h5>
              <p className="text-muted">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search criteria.' 
                  : 'Create your first token to get started.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TokenHistory;