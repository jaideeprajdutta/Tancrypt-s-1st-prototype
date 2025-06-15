import React, { useState } from 'react';

interface ConnectedService {
  id: string;
  name: string;
  description: string;
  connectedAt: string;
  permissions: string[];
  status: 'active' | 'paused';
}

function Settings() {
  const [activeTab, setActiveTab] = useState('consents');
  const [notificationSettings, setNotificationSettings] = useState({
    tokenCreated: true,
    tokenAccessed: true,
    tokenExpiring: true,
    weeklyReport: false,
    securityAlerts: true
  });

  const [connectedServices, setConnectedServices] = useState<ConnectedService[]>([
    {
      id: '1',
      name: 'PaymentApp Pro',
      description: 'Mobile payment and money transfer service',
      connectedAt: '2024-01-15T10:30:00Z',
      permissions: ['Bank Account Details', 'Transaction History'],
      status: 'active'
    },
    {
      id: '2',
      name: 'BudgetTracker',
      description: 'Personal finance and budgeting application',
      connectedAt: '2024-01-14T14:20:00Z',
      permissions: ['Income Information', 'Transaction History'],
      status: 'active'
    },
    {
      id: '3',
      name: 'LoanAnalyzer',
      description: 'Loan comparison and analysis tool',
      connectedAt: '2024-01-13T09:15:00Z',
      permissions: ['Credit Score', 'Income Information'],
      status: 'paused'
    }
  ]);

  const handleServiceToggle = (serviceId: string) => {
    setConnectedServices(prev => prev.map(service => 
      service.id === serviceId 
        ? { ...service, status: service.status === 'active' ? 'paused' : 'active' as const }
        : service
    ));
  };

  const handleRevokeService = (serviceId: string) => {
    setConnectedServices(prev => prev.filter(service => service.id !== serviceId));
    
    // Show success message
    const toast = document.createElement('div');
    toast.className = 'toast align-items-center text-white bg-warning border-0 position-fixed top-0 end-0 m-3';
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          <i class="bi bi-check-circle me-2"></i>
          Service access has been revoked successfully.
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

  const handleNotificationChange = (setting: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mt-4 fade-in">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="fw-bold mb-1">Settings & Consents</h1>
              <p className="text-muted mb-0">Manage your privacy settings and connected services</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'consents' ? 'active' : ''}`}
                onClick={() => setActiveTab('consents')}
                type="button"
                role="tab"
              >
                <i className="bi bi-shield-check me-2"></i>
                Connected Services
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('notifications')}
                type="button"
                role="tab"
              >
                <i className="bi bi-bell me-2"></i>
                Notifications
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
                type="button"
                role="tab"
              >
                <i className="bi bi-lock me-2"></i>
                Security
              </button>
            </li>
          </ul>
        </div>

        <div className="card-body">
          {/* Connected Services Tab */}
          {activeTab === 'consents' && (
            <div className="fade-in">
              <div className="mb-4">
                <h5 className="fw-bold mb-2">Connected Services</h5>
                <p className="text-muted">
                  These services have access to your financial data through active tokens. 
                  You can pause or revoke access at any time.
                </p>
              </div>

              <div className="row g-4">
                {connectedServices.map((service) => (
                  <div key={service.id} className="col-12">
                    <div className="card border">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-md-8">
                            <div className="d-flex align-items-start">
                              <div className="me-3">
                                <i className="bi bi-building display-6 text-primary"></i>
                              </div>
                              <div>
                                <h6 className="fw-bold mb-1">{service.name}</h6>
                                <p className="text-muted mb-2">{service.description}</p>
                                <div className="mb-2">
                                  <small className="text-muted">
                                    Connected on {formatDate(service.connectedAt)}
                                  </small>
                                </div>
                                <div className="d-flex flex-wrap gap-1">
                                  {service.permissions.map((permission, index) => (
                                    <span key={index} className="badge bg-light text-dark">
                                      {permission}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4 text-md-end">
                            <div className="mb-3">
                              <span className={`badge ${service.status === 'active' ? 'bg-success' : 'bg-warning'}`}>
                                {service.status === 'active' ? 'Active' : 'Paused'}
                              </span>
                            </div>
                            <div className="d-flex gap-2 justify-content-md-end">
                              <button
                                className={`btn btn-sm ${service.status === 'active' ? 'btn-outline-warning' : 'btn-outline-success'}`}
                                onClick={() => handleServiceToggle(service.id)}
                              >
                                <i className={`bi ${service.status === 'active' ? 'bi-pause' : 'bi-play'} me-1`}></i>
                                {service.status === 'active' ? 'Pause' : 'Resume'}
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleRevokeService(service.id)}
                              >
                                <i className="bi bi-trash me-1"></i>
                                Revoke
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {connectedServices.length === 0 && (
                <div className="text-center py-5">
                  <i className="bi bi-plug display-1 text-muted mb-3"></i>
                  <h5 className="text-muted">No Connected Services</h5>
                  <p className="text-muted">Services you connect will appear here.</p>
                </div>
              )}
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="fade-in">
              <div className="mb-4">
                <h5 className="fw-bold mb-2">Notification Preferences</h5>
                <p className="text-muted">
                  Choose how you want to be notified about token activity and security events.
                </p>
              </div>

              <div className="row g-4">
                <div className="col-12">
                  <div className="list-group">
                    <div className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">Token Created</h6>
                          <small className="text-muted">Get notified when a new token is generated</small>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={notificationSettings.tokenCreated}
                            onChange={() => handleNotificationChange('tokenCreated')}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">Token Accessed</h6>
                          <small className="text-muted">Get notified when your data is accessed</small>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={notificationSettings.tokenAccessed}
                            onChange={() => handleNotificationChange('tokenAccessed')}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">Token Expiring</h6>
                          <small className="text-muted">Get notified 24 hours before token expiration</small>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={notificationSettings.tokenExpiring}
                            onChange={() => handleNotificationChange('tokenExpiring')}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">Weekly Report</h6>
                          <small className="text-muted">Receive a weekly summary of token activity</small>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={notificationSettings.weeklyReport}
                            onChange={() => handleNotificationChange('weeklyReport')}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">Security Alerts</h6>
                          <small className="text-muted">Important security notifications (recommended)</small>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={notificationSettings.securityAlerts}
                            onChange={() => handleNotificationChange('securityAlerts')}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="fade-in">
              <div className="mb-4">
                <h5 className="fw-bold mb-2">Security Settings</h5>
                <p className="text-muted">
                  Additional security options to protect your account and data.
                </p>
              </div>

              <div className="row g-4">
                <div className="col-12">
                  <div className="card border-primary">
                    <div className="card-body">
                      <h6 className="card-title">
                        <i className="bi bi-key me-2 text-primary"></i>
                        Change Password
                      </h6>
                      <p className="card-text">Update your account password to keep your account secure.</p>
                      <button className="btn btn-primary">Change Password</button>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="card border-success">
                    <div className="card-body">
                      <h6 className="card-title">
                        <i className="bi bi-shield-check me-2 text-success"></i>
                        Two-Factor Authentication
                      </h6>
                      <p className="card-text">Add an extra layer of security to your account with 2FA.</p>
                      <button className="btn btn-success">Enable 2FA</button>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="card border-info">
                    <div className="card-body">
                      <h6 className="card-title">
                        <i className="bi bi-download me-2 text-info"></i>
                        Download Data
                      </h6>
                      <p className="card-text">Download a copy of your token history and account data.</p>
                      <button className="btn btn-info">Request Data Export</button>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="card border-danger">
                    <div className="card-body">
                      <h6 className="card-title">
                        <i className="bi bi-exclamation-triangle me-2 text-danger"></i>
                        Delete Account
                      </h6>
                      <p className="card-text">Permanently delete your account and all associated data.</p>
                      <button className="btn btn-outline-danger">Delete Account</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;