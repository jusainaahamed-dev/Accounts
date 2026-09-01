import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Header from '../components/header';
import Footer from '../components/footer';

function Profiles() {
  const [profileData, setProfileData] = useState({
    name: 'Admin Hasan',
    email: 'admin@example.com',
    phone: '+1 (555) 019-2834',
    location: 'New York, USA'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.id === 'profileName' ? 'name' : e.target.id === 'profileEmail' ? 'email' : e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div>
      <Navbar />
      <div className="admin-main">
        <Header />
        <main className="dashboard-content">
          <div className="container-fluid px-3 px-lg-4 py-4">
            
            {/* Page Heading */}
            <div className="page-heading">
              <div className="page-heading-copy">
                <span className="page-icon"><i className="bi bi-person-badge" aria-hidden="true" /></span>
                <div>
                  <p className="eyebrow mb-1">Account</p>
                  <h1 className="h3 mb-1">Profile</h1>
                  <p className="text-muted mb-0">Manage your personal details, bio, and contact preferences.</p>
                </div>
              </div>
            </div>

            {/* Notification Alert */}
            {savedSuccess && (
              <div className="alert alert-success alert-dismissible fade show d-flex align-items-center mb-3" role="alert">
                <i className="bi bi-check-circle-fill me-2 fs-5"></i>
                <div>Profile information updated successfully!</div>
                <button type="button" className="btn-close" onClick={() => setSavedSuccess(false)} aria-label="Close"></button>
              </div>
            )}

            <section className="row g-3">
              {/* Profile Card Column */}
              <div className="col-12 col-xl-4">
                <div className="panel h-100 text-center profile-card position-relative">
                  <div className="profile-cover">
                    <img 
                      src="/assets/images/png/dasher-ui-bootstrap-5.jpg" 
                      alt="adminHMD dashboard preview" 
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                  <img 
                    className="avatar-img avatar-xl profile-photo" 
                    src="/assets/images/avatar/avatar.jpg" 
                    alt={profileData.name || "Admin Hasan"} 
                    onError={(e) => { e.target.src = '/assets/images/avatar/avatar-1.jpg'; }}
                  />
                  <h2 className="h5 mt-3 mb-1">{profileData.name || "Admin Hasan"}</h2>
                  <p className="text-muted mb-3">Product Administrator</p>
                  
                  <div className="d-flex justify-content-center gap-2">
                    <span className="badge text-bg-primary">Admin</span>
                    <span className="badge text-bg-success">Verified</span>
                  </div>

                  {/* Enhanced Info List with Brand Logo & Contact Info */}
                  <div className="info-list mt-4 text-start">
                    <div>
                      <span><i className="bi bi-envelope-fill me-2 text-primary"></i>Email</span>
                      <strong>{profileData.email || "admin@example.com"}</strong>
                    </div>
                    <div>
                      <span><i className="bi bi-telephone-fill me-2 text-success"></i>Phone</span>
                      <strong>{profileData.phone || "+1 (555) 019-2834"}</strong>
                    </div>
                    <div>
                      <span><i className="bi bi-geo-alt-fill me-2 text-danger"></i>Location</span>
                      <strong>{profileData.location || "New York, USA"}</strong>
                    </div>
                    <div>
                      <span>
                        <img 
                          src="/assets/images/brand/logo/logo-icon.svg" 
                          width="16" 
                          height="16" 
                          className="me-1" 
                          alt="adminHMD Logo" 
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        Organization
                      </span>
                      <strong>adminHMD Studio</strong>
                    </div>
                  </div>

                  {/* Brand Footer Logo */}
                  <div className="mt-4 pt-3 border-top d-flex align-items-center justify-content-center gap-2">
                    <img 
                      src="/assets/images/brand/logo/dasher-logo.svg" 
                      alt="Dasher Logo" 
                      height="20" 
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <span className="text-muted small fw-semibold">adminHMD System</span>
                  </div>
                </div>
              </div>

              {/* Form Column */}
              <div className="col-12 col-xl-8">
                <form className="panel needs-validation" onSubmit={handleSubmit} noValidate>
                  <div className="panel-header d-flex justify-content-between align-items-center">
                    <div>
                      <h2 className="h5 mb-1 section-title">
                        <i className="bi bi-person-gear me-2" aria-hidden="true" />
                        <span>Update your account profile and contact details.</span>
                      </h2>
                      <p className="text-muted mb-0">Ensure your contact details are accurate and up to date.</p>
                    </div>
                    <img 
                      src="/assets/images/brand/logo/dasher-logo.svg" 
                      alt="adminHMD Logo" 
                      height="24" 
                      className="d-none d-sm-block opacity-75" 
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="profileName">
                        <i className="bi bi-person-fill me-1"></i>Name
                      </label>
                      <input 
                        className="form-control" 
                        id="profileName" 
                        type="text" 
                        value={profileData.name} 
                        onChange={handleChange} 
                        required 
                      />
                      <div className="invalid-feedback">Name is required.</div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label" htmlFor="profileEmail">
                        <i className="bi bi-envelope-fill me-1"></i>Email
                      </label>
                      <input 
                        className="form-control" 
                        id="profileEmail" 
                        type="email" 
                        value={profileData.email} 
                        onChange={handleChange} 
                        required 
                      />
                      <div className="invalid-feedback">Enter a valid email.</div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label" htmlFor="phone">
                        <i className="bi bi-telephone-fill me-1"></i>Phone
                      </label>
                      <input 
                        className="form-control" 
                        id="phone" 
                        type="tel" 
                        value={profileData.phone} 
                        onChange={handleChange} 
                        required 
                      />
                      <div className="invalid-feedback">Enter your number.</div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label" htmlFor="location">
                        <i className="bi bi-geo-alt me-1"></i>location
                      </label>
                      <input 
                        className="form-control" 
                        id="location" 
                        type="text" 
                        value={profileData.location} 
                        onChange={handleChange} 
                        required 
                      />
                      <div className="invalid-feedback">Enter your location.</div>
                    </div>

                    <div className="col-12"></div>
                  </div>

                  <div className="d-flex justify-content-end mt-4 gap-2">
                    <button className="btn btn-primary" type="submit">
                      <i className="bi bi-check2-circle me-1" aria-hidden="true" /> Save Profile
                    </button>
                  </div>
                </form>
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
