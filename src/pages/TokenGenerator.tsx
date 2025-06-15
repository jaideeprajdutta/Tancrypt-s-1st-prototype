import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TokenFormData {
  dataType: string;
  service: string;
  expirationTime: string;
  oneTimeAccess: boolean;
  description: string;
}

function TokenGenerator() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TokenFormData>({
    dataType: '',
    service: '',
    expirationTime: '24',
    oneTimeAccess: false,
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const dataTypes = [
    { value: 'bank-details', label: 'Bank Account Details' },
    { value: 'income', label: 'Income Information' },
    { value: 'credit-score', label: 'Credit Score' },
    { value: 'transaction-history', label: 'Transaction History' },
    { value: 'assets', label: 'Asset Information' },
    { value: 'liabilities', label: 'Debt & Liabilities' }
  ];

  const services = [
    { value: 'paymentapp-pro', label: 'PaymentApp Pro' },
    { value: 'budgettracker', label: 'BudgetTracker' },
    { value: 'loananalyzer', label: 'LoanAnalyzer' },
    { value: 'creditmonitor', label: 'CreditMonitor' },
    { value: 'investmentadvisor', label: 'InvestmentAdvisor' },
    { value: 'taxprep-assistant', label: 'TaxPrep Assistant' }
  ];

  const expirationOptions = [
    { value: '1', label: '1 hour' },
    { value: '6', label: '6 hours' },
    { value: '24', label: '24 hours' },
    { value: '168', label: '1 week' },
    { value: '720', label: '1 month' },
    { value: 'custom', label: 'Custom' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success toast
      const toast = document.createElement('div');
      toast.className = 'toast align-items-center text-white bg-success border-0 position-fixed top-0 end-0 m-3';
      toast.setAttribute('role', 'alert');
      toast.innerHTML = `
        <div class="d-flex">
          <div class="toast-body">
            <i class="bi bi-check-circle me-2"></i>
            Token generated successfully!
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
      `;
      document.body.appendChild(toast);
      
      // Initialize and show toast
      const bootstrapToast = new (window as any).bootstrap.Toast(toast);
      bootstrapToast.show();
      
      // Remove toast after it's hidden
      toast.addEventListener('hidden.bs.toast', () => {
        document.body.removeChild(toast);
      });

      // Reset form
      setFormData({
        dataType: '',
        service: '',
        expirationTime: '24',
        oneTimeAccess: false,
        description: ''
      });
      setValidated(false);

    } catch (error) {
      console.error('Error generating token:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="container mt-4 fade-in">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header">
              <div className="d-flex align-items-center">
                <i className="bi bi-plus-circle text-primary me-2 fs-4"></i>
                <h4 className="mb-0">Generate Security Token</h4>
              </div>
              <p className="text-muted mt-2 mb-0">
                Create a secure, time-limited token to share your financial data with trusted services.
              </p>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className={`needs-validation ${validated ? 'was-validated' : ''}`} noValidate>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="dataType" className="form-label">
                      Data Type <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      id="dataType"
                      name="dataType"
                      value={formData.dataType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select data type</option>
                      {dataTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">
                      Please select a data type.
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="service" className="form-label">
                      Third-Party Service <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select service</option>
                      {services.map(service => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">
                      Please select a service.
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="expirationTime" className="form-label">
                      Expiration Time <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      id="expirationTime"
                      name="expirationTime"
                      value={formData.expirationTime}
                      onChange={handleInputChange}
                      required
                    >
                      {expirationOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">
                      Please select an expiration time.
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Access Settings</label>
                    <div className="form-check mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="oneTimeAccess"
                        name="oneTimeAccess"
                        checked={formData.oneTimeAccess}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="oneTimeAccess">
                        One-time access only
                      </label>
                    </div>
                    <small className="text-muted">
                      Token will be automatically revoked after first use
                    </small>
                  </div>

                  <div className="col-12">
                    <label htmlFor="description" className="form-label">
                      Description (Optional)
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Add a note about this token's purpose..."
                    />
                  </div>
                </div>

                <div className="alert alert-info mt-4" role="alert">
                  <div className="d-flex">
                    <i className="bi bi-info-circle me-2"></i>
                    <div>
                      <strong>Security Notice:</strong> This token will allow the selected service to access your specified data type for the duration you've set. You can revoke access at any time from your token history.
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-3 mt-4">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading && (
                      <span className="spinner-border loading-spinner me-2\" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </span>
                    )}
                    <i className="bi bi-shield-lock me-2"></i>
                    Generate Token
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/dashboard')}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TokenGenerator;