import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import Footer from '../components/footer';

function Profiles() {
  const [formData, setFormData] = useState({
    name: 'Admin Hasan',
    email: 'admin@example.com',
    phone: '+1 (555) 019-2834',
    location: 'New York, USA',
    role: 'Product Administrator',
    bio: 'Senior Product Administrator managing financial accounts, user permissions, and corporate reporting.'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
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
                
                {/* Company Logo & Verified Badge Header */}
                <div className="d-flex align-items-center gap-3 bg-white p-2 px-3 rounded-3 border shadow-sm">
                  <img 
                    src="/assets/images/brand/logo/dasher-logo.svg" 
                    alt="adminHMD Logo" 
                    height="28" 
                    onError={(e) => { e.target.style.display = 'none'; }} 
                  />
                  <span className="fw-semibold text-dark d-none d-sm-inline">adminHMD Enterprise</span>
                  <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2 py-1">
                    <i className="bi bi-patch-check-fill me-1"></i> Verified Account
                  </span>
                </div>
              </div>
            </div>

            {/* Success Notification Alert */}
            {savedSuccess && (
              <div className="alert alert-success alert-dismissible fade show d-flex align-items-center shadow-sm mb-4" role="alert">
                <i className="bi bi-check-circle-fill fs-5 me-2 text-success"></i>
                <div>
                  <strong>Profile Updated!</strong> Your changes have been successfully saved to your account.
                </div>
                <button type="button" className="btn-close" onClick={() => setSavedSuccess(false)} aria-label="Close"></button>
              </div>
            )}

            <section className="row g-4">
              {/* Left Column: Professional Profile Card */}
              <div className="col-12 col-xl-4">
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 bg-white">
                  {/* Banner Cover Image */}
                  <div className="position-relative" style={{ height: '130px', background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)' }}>
                    <img 
                      src="/assets/images/png/dasher-ui-bootstrap-5.jpg" 
                      alt="Profile Cover" 
                      className="w-100 h-100 object-fit-cover opacity-40"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <div className="position-absolute top-0 end-0 p-3">
                      <span className="badge bg-white text-dark shadow-sm rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-1">
                        <img src="/assets/images/brand/logo/logo-icon.svg" width="16" height="16" alt="logo icon" onError={(e)=>{e.target.style.display='none'}} />
                        adminHMD
                      </span>
                    </div>
                  </div>

                  {/* Profile Body & Avatar */}
                  <div className="card-body text-center pt-0 position-relative px-4 pb-4">
                    <div className="position-relative d-inline-block" style={{ marginTop: '-50px' }}>
                      <img 
                        className="rounded-circle border border-4 border-white shadow" 
                        src="/assets/images/avatar/avatar-1.jpg" 
                        alt={formData.name || 'User Avatar'} 
                        style={{ width: '105px', height: '105px', objectFit: 'cover' }}
                        onError={(e) => { e.target.src = '/assets/images/avatar/avatar.jpg'; }}
                      />
                      <button 
                        type="button"
                        className="btn btn-sm btn-primary rounded-circle position-absolute bottom-0 end-0 shadow-sm" 
                        style={{ width: '32px', height: '32px', padding: 0 }} 
                        title="Update Photo"
                      >
                        <i className="bi bi-camera-fill"></i>
                      </button>
                    </div>

                    <h2 className="h4 mt-3 mb-1 fw-bold text-dark">{formData.name || 'Admin Hasan'}</h2>
                    <p className="text-muted mb-2 small fw-medium">{formData.role || 'Product Administrator'}</p>

                    <div className="d-flex justify-content-center gap-2 mb-3">
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 fw-semibold">
                        <i className="bi bi-shield-lock-fill me-1"></i> Admin
                      </span>
                      <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-1 fw-semibold">
                        <i className="bi bi-check-circle-fill me-1"></i> Verified
                      </span>
                    </div>

                    <p className="text-muted small mb-3 px-2" style={{ lineHeight: '1.5' }}>
                      {formData.bio}
                    </p>

                    <hr className="my-3 text-muted opacity-25" />

                    {/* Contact & Details Info List */}
                    <div className="text-start d-flex flex-column gap-3 small">
                      <div className="d-flex align-items-center p-2.5 rounded-3 bg-light border border-light-subtle">
                        <div className="bg-white p-2 rounded-2 text-primary me-3 shadow-sm d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                          <i className="bi bi-envelope-fill fs-6"></i>
                        </div>
                        <div className="overflow-hidden">
                          <span className="text-muted d-block" style={{ fontSize: '0.725rem' }}>Email Address</span>
                          <strong className="text-dark text-truncate d-block">{formData.email || 'admin@example.com'}</strong>
                        </div>
                      </div>

                      <div className="d-flex align-items-center p-2.5 rounded-3 bg-light border border-light-subtle">
                        <div className="bg-white p-2 rounded-2 text-success me-3 shadow-sm d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                          <i className="bi bi-telephone-fill fs-6"></i>
                        </div>
                        <div>
                          <span className="text-muted d-block" style={{ fontSize: '0.725rem' }}>Phone Number</span>
                          <strong className="text-dark">{formData.phone || 'N/A'}</strong>
                        </div>
                      </div>

                      <div className="d-flex align-items-center p-2.5 rounded-3 bg-light border border-light-subtle">
                        <div className="bg-white p-2 rounded-2 text-danger me-3 shadow-sm d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                          <i className="bi bi-geo-alt-fill fs-6"></i>
                        </div>
                        <div>
                          <span className="text-muted d-block" style={{ fontSize: '0.725rem' }}>Location</span>
                          <strong className="text-dark">{formData.location || 'N/A'}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Organization & Branding Logo Footer */}
                    <div className="mt-4 pt-3 border-top">
                      <div className="d-flex align-items-center justify-content-between p-2.5 rounded-3 bg-primary-subtle border border-primary-subtle">
                        <div className="d-flex align-items-center gap-2">
                          <img 
                            src="/assets/images/brand/logo/dasher-logo.svg" 
                            alt="Dasher Logo" 
                            height="22" 
                            onError={(e) => { e.target.style.display = 'none'; }} 
                          />
                          <span className="fw-bold text-primary small">adminHMD System</span>
                        </div>
                        <i className="bi bi-award-fill text-warning fs-5"></i>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Right Column: Update Profile Form */}
              <div className="col-12 col-xl-8">
                <div className="card border-0 shadow-sm rounded-4 bg-white h-100">
                  <div className="card-header bg-white border-bottom py-3 px-4 d-flex align-items-center justify-content-between">
                    <div>
                      <h2 className="h5 mb-1 text-dark fw-bold d-flex align-items-center gap-2">
                        <i className="bi bi-person-gear text-primary" aria-hidden="true" />
                        <span>Update Account Profile</span>
                      </h2>
                      <p className="text-muted mb-0 small">Update your account profile and contact details.</p>
                    </div>
                    <img 
                      src="/assets/images/brand/logo/logo-icon.svg" 
                      alt="Brand Icon" 
                      height="28" 
                      className="d-none d-sm-block opacity-75" 
                      onError={(e) => { e.target.style.display = 'none'; }} 
                    />
                  </div>

                  <div className="card-body p-4">
                    <form className="needs-validation" onSubmit={handleSubmit} noValidate>
                      <div className="row g-3">
                        
                        {/* Name Input */}
                        <div className="col-md-6">
                          <label className="form-label fw-semibold text-dark small" htmlFor="profileName">
                            <i className="bi bi-person-fill text-primary me-1"></i> Name
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <i className="bi bi-person text-muted"></i>
                            </span>
                            <input 
                              className="form-control border-start-0 ps-0" 
                              id="profileName" 
                              type="text" 
                              value={formData.name} 
                              onChange={handleChange}
                              placeholder="Enter full name"
                              required 
                            />
                          </div>
                          <div className="invalid-feedback">Name is required.</div>
                        </div>

                        {/* Email Input */}
                        <div className="col-md-6">
                          <label className="form-label fw-semibold text-dark small" htmlFor="profileEmail">
                            <i className="bi bi-envelope-fill text-primary me-1"></i> Email
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <i className="bi bi-envelope text-muted"></i>
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
                          <div className="invalid-feedback">Enter a valid email.</div>
                        </div>

                        {/* Phone Input */}
                        <div className="col-md-6">
                          <label className="form-label fw-semibold text-dark small" htmlFor="phone">
                            <i className="bi bi-telephone-fill text-primary me-1"></i> Phone
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <i className="bi bi-telephone text-muted"></i>
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
                          <div className="invalid-feedback">Enter your number.</div>
                        </div>

                        {/* Location Input */}
                        <div className="col-md-6">
                          <label className="form-label fw-semibold text-dark small" htmlFor="location">
                            <i className="bi bi-geo-alt-fill text-primary me-1"></i> Location
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <i className="bi bi-geo-alt text-muted"></i>
                            </span>
                            <input 
                              className="form-control border-start-0 ps-0" 
                              id="location" 
                              type="text" 
                              value={formData.location} 
                              onChange={handleChange}
                              placeholder="Enter location"
                              required 
                            />
                          </div>
                        </div>

                        {/* Professional Role / Job Title */}
                        <div className="col-md-6">
                          <label className="form-label fw-semibold text-dark small" htmlFor="role">
                            <i className="bi bi-briefcase-fill text-primary me-1"></i> Role / Job Title
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <i className="bi bi-briefcase text-muted"></i>
                            </span>
                            <input 
                              className="form-control border-start-0 ps-0" 
                              id="role" 
                              type="text" 
                              value={formData.role} 
                              onChange={handleChange}
                              placeholder="Enter job role"
                            />
                          </div>
                        </div>

                        {/* Company Name */}
                        <div className="col-md-6">
                          <label className="form-label fw-semibold text-dark small">
                            <i className="bi bi-building-fill text-primary me-1"></i> Organization
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <i className="bi bi-building text-muted"></i>
                            </span>
                            <input 
                              className="form-control border-start-0 ps-0 bg-light" 
                              type="text" 
                              value="adminHMD Global Inc." 
                              readOnly
                            />
                          </div>
                        </div>

                        {/* Bio / Description */}
                        <div className="col-12">
                          <label className="form-label fw-semibold text-dark small" htmlFor="bio">
                            <i className="bi bi-text-paragraph text-primary me-1"></i> Personal Bio / Notes
                          </label>
                          <textarea 
                            className="form-control" 
                            id="bio" 
                            rows="3" 
                            value={formData.bio} 
                            onChange={handleChange}
                            placeholder="Write a brief bio..."
                          />
                        </div>

                      </div>

                      {/* Action Buttons */}
                      <div className="d-flex align-items-center justify-content-between mt-4 pt-3 border-top">
                        <div className="d-flex align-items-center gap-2 text-muted small d-none d-sm-flex">
                          <i className="bi bi-shield-lock-fill text-success fs-5"></i>
                          <span>Secure SSL Encrypted Connection</span>
                        </div>
                        <div className="d-flex gap-2 ms-auto">
                          <button 
                            className="btn btn-light px-4 border" 
                            type="button" 
                            onClick={() => setFormData({
                              name: 'Admin Hasan',
                              email: 'admin@example.com',
                              phone: '+1 (555) 019-2834',
                              location: 'New York, USA',
                              role: 'Product Administrator',
                              bio: 'Senior Product Administrator managing financial accounts, user permissions, and corporate reporting.'
                            })}
                          >
                            <i className="bi bi-arrow-counterclockwise me-1"></i> Reset
                          </button>
                          <button className="btn btn-primary px-4 shadow-sm fw-semibold" type="submit">
                            <i className="bi bi-check2-circle me-1" aria-hidden="true" /> Save Profile
                          </button>
                        </div>
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
