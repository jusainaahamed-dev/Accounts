import React from 'react'
import Navbar from '../components/navbar'
import Header from '../components/header'
import Footer from '../components/footer'
function profiles() {
  return (
    <div>
      <Navbar />
      <div className="admin-main">
        <Header />
        <main className="dashboard-content">
          <div className="container-fluid px-3 px-lg-4 py-4">
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
            <section className="row g-3">
              {/* <div className="col-12 col-xl-4">
                <div className="panel h-100 text-center profile-card">
                  <div className="profile-cover"><img src="../assets/images/png/dasher-ui-bootstrap-5.jpg" alt="adminHMD dashboard preview" /></div>
                  <img className="avatar-img avatar-xl profile-photo" src="../assets/images/avatar/avatar.jpg" alt="Admin Hasan" />
                  <h2 className="h5 mt-3 mb-1">Admin Hasan</h2>
                  <p className="text-muted mb-3">Product Administrator</p>
                  <div className="d-flex justify-content-center gap-2"><span className="badge text-bg-primary">Admin</span><span className="badge text-bg-success">Verified</span></div>
                  <div className="info-list mt-4 text-start"><div>
                    <span>Email</span><strong></strong></div>
                    <div><span>Phone</span><strong></strong></div>
                    <div><span></span><strong></strong></div>
                  </div>
                </div>
              </div> */}
              <div className="col-12 col-xl-12">
                <form className="panel needs-validation" noValidate>
                  <div className="panel-header"><div><h2 className="h5 mb-1 section-title"><i className="bi bi-person-gear" aria-hidden="true" /><span>Update your account profile and contact details.</span></h2><p className="text-muted mb-0"></p></div></div>
                  <div className="row g-3">
                    <div className="col-md-6"><label className="form-label" htmlFor="profileName"><i className="bi bi-person-fill"></i>Name</label><input className="form-control" id="profileName" type="text" defaultValue="" required /><div className="invalid-feedback">Name is required.</div></div>
                    <div className="col-md-6"><label className="form-label" htmlFor="profileEmail"><i className="bi bi-envelope-fill"></i>Email</label><input className="form-control" id="profileEmail" type="email" defaultValue="admin@example.com" required /><div className="invalid-feedback">Enter a valid email.</div></div>
                    <div className="col-md-6"><label className="form-label" htmlFor="phone"><i className="bi bi-telephone-fill"></i>Phone</label><input className="form-control" id="phone" type="tel" defaultValue="" required /><div className="invalid-feedback">Enter your number.</div></div>
                    <div className="col-md-6"><label className="form-label" htmlFor="location"><i className="bi bi-geo-alt"></i>location</label><input className="form-control" id="location" type="text" defaultValue="" required /><div className="invalid-feedback"></div></div>
                    <div className="col-12"></div>
                  </div>
                  <div className="d-flex justify-content-end mt-4"><button className="btn btn-primary" type="submit"><i className="bi bi-check2-circle" aria-hidden="true" /> Save Profile</button></div>
                </form>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </div>

  )
}

export default profiles
