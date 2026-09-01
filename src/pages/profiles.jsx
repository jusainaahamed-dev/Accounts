import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import Footer from '../components/footer';

function Profiles() {
  const initialData = {
    name: 'Admin Hasan',
    email: 'admin@example.com',
    phone: '+1 (555) 234-5678',
    location: 'New York, USA',
    role: 'Product Administrator',
    bio: 'Senior Product Administrator managing financial accounts, user permissions, and corporate reporting.'
  };

  const [formData, setFormData] = useState(initialData);
  const [showSavedAlert, setShowSavedAlert] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSavedAlert(true);
    setTimeout(() => {
      setShowSavedAlert(false);
    }, 4000);
  };

  const handleReset = () => {
    setFormData(initialData);
    setShowSavedAlert(false);
  };

  return (
    <div>
      <Navbar />
      <div className="admin-main">
        <Header />
        <main className="dashboard-content">
          <div className="container-fluid px-3 px-lg-4 py-4">
            
            {/* Page Header */}
            <div className="page-heading mb-4">
              <div className="page-heading-copy d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div className="d-flex align-items-center gap-3">
                  <span className="page-icon bg-primary text-white rounded-3 p-3 d-inline-flex align-items-center justify-content-center shadow-sm" style={{ width: '48px', height: '48px' }}>
                    <i className="bi bi-person-badge fs-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="eyebrow mb-0 text-uppercase fw-bold text-primary" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>Account</p>
                    <h1 className="h3 mb-0 fw-bold">Profile</h1>
                    <p className="text-muted mb-0 small">Manage your personal details, bio, and contact preferences.</p>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-1">
                    <i className="bi bi-shield-check me-1"></i> Account Active
                  </span>
                </div>
              </div>
            </div>

            {/* Notification Alert */}
            {showSavedAlert && (
              <div className="alert alert-success alert-dismissible fade show border-0 shadow-sm rounded-3 mb-4 d-flex align-items-center" role="alert">
                <i className="bi bi-check-circle-fill fs-5 me-2 text-success"></i>
                <div>
                  <strong>Profile Updated Successfully!</strong> Your account information has been saved.
                </div>
                <button type="button" className="btn-close" onClick={() => setShowSavedAlert(false)} aria-label="Close"></button>
              </div>
            )}

            <section className="row g-4">
              {/* Left Column: Live Interactive Profile Card */}
              <div className="col-12 col-xl-4">
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white h-100">
                  {/* Cover Header */}
                  <div className="position-relative" style={{ height: '140px', background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #06b6d4 100%)' }}>
                    <div className="position-absolute top-0 end-0 p-3">
                      <span className="badge bg-white bg-opacity-25 text-white backdrop-blur rounded-pill px-3 py-1.5 small fw-medium border border-white border-opacity-25">
                        <i className="bi bi-circle-fill text-success fs-6 me-1" style={{ fontSize: '0.5rem' }}></i> Online
                      </span>
                    </div>
                  </div>

                  {/* Profile Body */}
                  <div className="card-body text-center pt-0 px-4 pb-4 position-relative">
                    {/* Avatar */}
                    <div className="position-relative d-inline-block" style={{ marginTop: '-55px' }}>
                      <img 
                        className="rounded-circle border border-4 border-white shadow-sm object-fit-cover" 
                        src="/assets/images/avatar/avatar-1.jpg" 
                        alt={formData.name || 'User Avatar'} 
                        style={{ width: '110px', height: '110px' }}
                        onError={(e) => { e.target.src = '/assets/images/avatar/avatar.jpg'; }}
                      />
                      <span className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-2 shadow-sm d-inline-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', cursor: 'pointer' }} title="Change Avatar">
                        <i className="bi bi-camera-fill small"></i>
                      </span>
                    </div>

                    <h2 className="h4 fw-bold text-dark mt-3 mb-1">{formData.name || 'Admin Hasan'}</h2>
                    <p className="text-muted small fw-medium mb-3">{formData.role || 'Product Administrator'}</p>

                    <div className="d-flex justify-content-center gap-2 mb-4">
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1.5 fw-semibold small">
                        <i className="bi bi-shield-lock-fill me-1"></i> Admin
                      </span>
                      <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-1.5 fw-semibold small">
                        <i className="bi bi-patch-check-fill me-1"></i> Verified
                      </span>
                    </div>

                    {formData.bio && (
                      <p className="text-muted small mb-4 px-2" style={{ lineHeight: '1.6' }}>
                        "{formData.bio}"
                      </p>
                    )}

                    <div className="border-top pt-3 text-start d-flex flex-column gap-3">
                      <div className="d-flex align-items-center p-2.5 rounded-3 bg-light border border-light-subtle">
                        <div className="bg-white p-2.5 rounded-3 text-primary shadow-xs me-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                          <i className="bi bi-envelope-fill fs-5"></i>
                        </div>
                        <div className="overflow-hidden">
                          <span className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>Email</span>
                          <span className="text-dark fw-semibold small text-truncate d-block">{formData.email || 'admin@example.com'}</span>
                        </div>
                      </div>

                      <div className="d-flex align-items-center p-2.5 rounded-3 bg-light border border-light-subtle">
                        <div className="bg-white p-2.5 rounded-3 text-success shadow-xs me-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                          <i className="bi bi-telephone-fill fs-5"></i>
                        </div>
                        <div className="overflow-hidden">
                          <span className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>Phone</span>
                          <span className="text-dark fw-semibold small d-block">{formData.phone || 'Not set'}</span>
                        </div>
                      </div>

                      <div className="d-flex align-items-center p-2.5 rounded-3 bg-light border border-light-subtle">
                        <div className="bg-white p-2.5 rounded-3 text-danger shadow-xs me-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                          <i className="bi bi-geo-alt-fill fs-5"></i>
                        </div>
                        <div className="overflow-hidden">
                          <span className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.68rem', letterSpacing: '0.04em' }}>Location</span>
                          <span className="text-dark fw-semibold small d-block">{formData.location || 'Not set'}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Right Column: Update Profile Form */}
              <div className="col-12 col-xl-8">
                <div className="card border-0 shadow-sm rounded-4 bg-white">
                  <div className="card-header bg-white border-bottom py-3.5 px-4 d-flex align-items-center justify-content-between">
                    <div>
                      <h2 className="h5 mb-1 text-dark fw-bold d-flex align-items-center gap-2">
                        <i className="bi bi-person-gear text-primary" aria-hidden="true" />
                        <span>Update Account Profile</span>
                      </h2>
                      <p className="text-muted mb-0 small">Update your account profile and contact details.</p>
                    </div>
                    <span className="badge bg-light text-muted border px-3 py-2 rounded-pill small d-none d-sm-inline-block">
                      <i className="bi bi-lock-fill me-1"></i> Encrypted
                    </span>
                  </div>

                  <div className="card-body p-4">
                    <form className="needs-validation" onSubmit={handleSubmit} noValidate>
                      <div className="row g-3">
                        
                        {/* Name Field */}
                        <div className="col-md-6">
                          <label className="form-label fw-semibold text-dark small" htmlFor="profileName">
                            <i className="bi bi-person-fill text-primary me-1"></i> Name <span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0 text-muted">
                              <i className="bi bi-person"></i>
                            </span>
                            <input 
                              className="form-control border-start-0 ps-0" 
                              id="profileName" 
                              type="text" 
                              value={formData.name} 
                              onChange={handleChange}
                              placeholder="Enter your full name" 
                              required 
                            />
                          </div>
                          <div className="invalid-feedback">Name is required.</div>
                        </div>

                        {/* Email Field */}
                        <div className="col-md-6">
                          <label className="form-label fw-semibold text-dark small" htmlFor="profileEmail">
                            <i className="bi bi-envelope-fill text-primary me-1"></i> Email <span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0 text-muted">
                              <i className="bi bi-envelope"></i>
                            </span>
                            <input 
                              className="form-control border-start-0 ps-0" 
                              id="profileEmail" 
                              type="email" 
                              value={formData.email} 
                              onChange={handleChange}
                              placeholder="Enter email address" 
                              required 
                            />
                          </div>
                          <div className="invalid-feedback">Enter a valid email address.</div>
                        </div>

                        {/* Phone Field */}
                        <div className="col-md-6">
                          <label className="form-label fw-semibold text-dark small" htmlFor="phone">
                            <i className="bi bi-telephone-fill text-primary me-1"></i> Phone <span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0 text-muted">
                              <i className="bi bi-telephone"></i>
                            </span>
                            <input 
                              className="form-control border-start-0 ps-0" 
                              id="phone" 
                              type="tel" 
                              value={formData.phone} 
                              onChange={handleChange}
                              placeholder="Enter phone number" 
                              required 
                            />
                          </div>
                          <div className="invalid-feedback">Enter your phone number.</div>
                        </div>

                        {/* Location Field */}
                        <div className="col-md-6">
                          <label className="form-label fw-semibold text-dark small" htmlFor="location">
                            <i className="bi bi-geo-alt-fill text-primary me-1"></i> Location <span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0 text-muted">
                              <i className="bi bi-geo-alt"></i>
                            </span>
                            <input 
                              className="form-control border-start-0 ps-0" 
                              id="location" 
                              type="text" 
                              value={formData.location} 
                              onChange={handleChange}
                              placeholder="City, Country" 
                              required 
                            />
                          </div>
                          <div className="invalid-feedback">Location is required.</div>
                        </div>

                        {/* Role Field */}
                        <div className="col-md-6">
                          <label className="form-label fw-semibold text-dark small" htmlFor="role">
                            <i className="bi bi-briefcase-fill text-primary me-1"></i> Role / Job Title
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0 text-muted">
                              <i className="bi bi-briefcase"></i>
                            </span>
                            <input 
                              className="form-control border-start-0 ps-0" 
                              id="role" 
                              type="text" 
                              value={formData.role} 
                              onChange={handleChange}
                              placeholder="Enter your job title" 
                            />
                          </div>
                        </div>

                        {/* Organization (Read-Only) */}
                        <div className="col-md-6">
                          <label className="form-label fw-semibold text-dark small">
                            <i className="bi bi-building-fill text-primary me-1"></i> Organization
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0 text-muted">
                              <i className="bi bi-building"></i>
                            </span>
                            <input 
                              className="form-control border-start-0 ps-0 bg-light" 
                              type="text" 
                              value="adminHMD Global Inc." 
                              readOnly 
                            />
                          </div>
                        </div>

                        {/* Bio / Description Field */}
                        <div className="col-12">
                          <label className="form-label fw-semibold text-dark small" htmlFor="bio">
                            <i className="bi bi-card-text text-primary me-1"></i> Personal Bio / Notes
                          </label>
                          <textarea 
                            className="form-control" 
                            id="bio" 
                            rows="3" 
                            value={formData.bio} 
                            onChange={handleChange}
                            placeholder="Write a brief description or notes about your role..."
                          />
                        </div>

                      </div>

                      {/* Form Actions */}
                      <div className="d-flex align-items-center justify-content-between mt-4 pt-3 border-top">
                        <button 
                          className="btn btn-light border px-3 text-muted" 
                          type="button"
                          onClick={handleReset}
                        >
                          <i className="bi bi-arrow-counterclockwise me-1"></i> Reset
                        </button>
                        <button className="btn btn-primary px-4 shadow-sm fw-semibold" type="submit">
                          <i className="bi bi-check2-circle me-1" aria-hidden="true" /> Save Profile
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default Profiles;

