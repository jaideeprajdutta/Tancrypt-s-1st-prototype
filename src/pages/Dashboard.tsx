import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface DashboardStats {
  activeTokens: number;
  totalTokens: number;
  recentAccess: number;
  connectedServices: number;
}

function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    activeTokens: 0,
    totalTokens: 0,
    recentAccess: 0,
    connectedServices: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStats({
        activeTokens: 12,
        totalTokens: 28,
        recentAccess: 45,
        connectedServices: 8
      });
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  const recentActivity = [
    {
      id: 1,
      service: 'PaymentApp Pro',
      action: 'Token accessed',
      time: '2 minutes ago',
      type: 'access'
    },
    {
      id: 2,
      service: 'BudgetTracker',
      action: 'New token created',
      time: '1 hour ago',
      type: 'create'
    },
    {
      id: 3,
      service: 'LoanAnalyzer',
      action: 'Token revoked',
      time: '3 hours ago',
      type: 'revoke'
    },
    {
      id: 4,
      service: 'CreditMonitor',
      action: 'Token expired',
      time: '1 day ago',
      type: 'expire'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'access': return 'bi-eye text-primary';
      case 'create': return 'bi-plus-circle text-success';
      case 'revoke': return 'bi-x-circle text-danger';
      case 'expire': return 'bi-clock text-warning';
      default: return 'bi-info-circle';
    }
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
              <h1 className="fw-bold mb-1">Welcome back, {user?.name}!</h1>
              <p className="text-muted mb-0">Here's an overview of your secure data tokens</p>
            </div>
            <Link to="/tokens" className="btn btn-primary">
              <i className="bi bi-plus-circle me-2"></i>
              New Token
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        <div className="col-md-3 col-sm-6">
          <div className="card dashboard-card stats-card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="fw-bold mb-1">{stats.activeTokens}</h3>
                  <p className="text-muted mb-0">Active Tokens</p>
                </div>
                <i className="bi bi-shield-check display-6 text-primary"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6">
          <div className="card dashboard-card stats-card secondary h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="fw-bold mb-1">{stats.totalTokens}</h3>
                  <p className="text-muted mb-0">Total Created</p>
                </div>
                <i className="bi bi-collection display-6 text-info"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6">
          <div className="card dashboard-card stats-card accent h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="fw-bold mb-1">{stats.recentAccess}</h3>
                  <p className="text-muted mb-0">Recent Access</p>
                </div>
                <i className="bi bi-graph-up display-6 text-warning"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6">
          <div className="card dashboard-card stats-card success h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="fw-bold mb-1">{stats.connectedServices}</h3>
                  <p className="text-muted mb-0">Connected Services</p>
                </div>
                <i className="bi bi-link-45deg display-6 text-success"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Recent Activity */}
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="bi bi-activity me-2"></i>
                Recent Activity
              </h5>
              <Link to="/history" className="btn btn-sm btn-outline-primary">
                View All
              </Link>
            </div>
            <div className="card-body">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="d-flex align-items-center mb-3 pb-3 border-bottom">
                  <div className="me-3">
                    <i className={`bi ${getActivityIcon(activity.type)} fs-4`}></i>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{activity.service}</h6>
                    <p className="text-muted mb-0 small">{activity.action}</p>
                  </div>
                  <small className="text-muted">{activity.time}</small>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-lightning me-2"></i>
                Quick Actions
              </h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-3">
                <Link to="/tokens" className="btn btn-primary d-flex align-items-center">
                  <i className="bi bi-plus-circle me-2"></i>
                  Generate New Token
                </Link>
                <Link to="/history" className="btn btn-outline-primary d-flex align-items-center">
                  <i className="bi bi-clock-history me-2"></i>
                  View Token History
                </Link>
                <Link to="/settings" className="btn btn-outline-secondary d-flex align-items-center">
                  <i className="bi bi-gear me-2"></i>
                  Manage Consents
                </Link>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="card mt-4">
            <div className="card-body">
              <div className="d-flex align-items-start">
                <i className="bi bi-shield-exclamation text-warning me-3 fs-4"></i>
                <div>
                  <h6 className="fw-bold mb-2">Security Reminder</h6>
                  <p className="small text-muted mb-0">
                    Regularly review your active tokens and revoke access for services you no longer use.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;