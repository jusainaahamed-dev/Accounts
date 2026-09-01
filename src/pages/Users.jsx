import React from 'react'
import Navbar from '../components/navbar'
import Header from '../components/header'
import Footer from '../components/footer'
function Users() {
  return (
   <div>
    <Navbar />
  <div className="admin-main">
    <Header />
    <main className="dashboard-content">
  <div className="container-fluid px-3 px-lg-4 py-4">
    <div className="page-heading">
      <div className="page-heading-copy">
        <span className="page-icon"><i className="bi bi-people" aria-hidden="true" /></span>
        <div>
          <p className="eyebrow mb-1">Management</p>
          <h1 className="h3 mb-1">Users</h1>
          <p className="text-muted mb-0">Review accounts, roles, account status, and team ownership.</p>
        </div>
      </div>
      <div className="heading-actions"><a className="btn btn-outline-secondary btn-sm" href="tables.html"><i className="bi bi-download" aria-hidden="true" /> Export</a><a className="btn btn-primary btn-sm" href="add-user.html"><i className="bi bi-person-plus" aria-hidden="true" /> Add User</a></div>
    </div>
    <section className="row g-3 mt-1" aria-label="User summary">
      <div className="col-12 col-sm-6 col-xl-3">
        <article className="metric-card metric-primary">
          <div className="metric-top">
            <span className="metric-label">Total Users</span>
            <span className="metric-icon"><i className="bi bi-people" aria-hidden="true" /></span>
          </div>
          <div className="metric-value">8,742</div>
          <div className="metric-meta">
            <span className="text-success">+5.1%</span>
            <span>this month</span>
          </div>
        </article>
      </div>
      <div className="col-12 col-sm-6 col-xl-3">
        <article className="metric-card metric-success">
          <div className="metric-top">
            <span className="metric-label">Active</span>
            <span className="metric-icon"><i className="bi bi-check2-circle" aria-hidden="true" /></span>
          </div>
          <div className="metric-value">7,980</div>
          <div className="metric-meta">
            <span className="text-success">91%</span>
            <span>healthy accounts</span>
          </div>
        </article>
      </div>
      <div className="col-12 col-sm-6 col-xl-3">
        <article className="metric-card metric-warning">
          <div className="metric-top">
            <span className="metric-label">Pending</span>
            <span className="metric-icon"><i className="bi bi-hourglass-split" aria-hidden="true" /></span>
          </div>
          <div className="metric-value">184</div>
          <div className="metric-meta">
            <span className="text-warning">12</span>
            <span>need approval</span>
          </div>
        </article>
      </div>
      <div className="col-12 col-sm-6 col-xl-3">
        <article className="metric-card metric-danger">
          <div className="metric-top">
            <span className="metric-label">Suspended</span>
            <span className="metric-icon"><i className="bi bi-slash-circle" aria-hidden="true" /></span>
          </div>
          <div className="metric-value">38</div>
          <div className="metric-meta">
            <span className="text-danger">4</span>
            <span>flagged today</span>
          </div>
        </article>
      </div>
    </section>
    <section className="panel mt-3">
      <div className="panel-header">
        <div>
          <h2 className="h5 mb-1 section-title"><i className="bi bi-table" aria-hidden="true" /><span>User List</span></h2>
          <p className="text-muted mb-0">Search, review, and manage team member accounts.</p>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <input className="form-control form-control-sm table-search" type="search" placeholder="Search users" data-table-search="usersTable" aria-label="Search users" />
          <a className="btn btn-primary btn-sm" href="add-user.html"><i className="bi bi-person-plus" aria-hidden="true" /> Add User</a>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table align-middle mb-0" id="usersTable" data-searchable-table>
          <thead><tr><th scope="col">User</th><th scope="col">Role</th><th scope="col">Team</th><th scope="col">Status</th><th scope="col">Joined</th><th scope="col" className="text-end">Action</th></tr></thead>
          <tbody>
            <tr>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <img className="avatar-img avatar-sm" src="../assets/images/avatar/avatar-1.jpg" alt="Sarah Ahmed" />
                  <div>
                    <p className="fw-semibold mb-0">Sarah Ahmed</p>
                    <p className="text-muted small mb-0">sarah@example.com</p>
                  </div>
                </div>
              </td>
              <td>Admin</td>
              <td>Operations</td>
              <td><span className="badge text-bg-success">Active</span></td>
              <td>Jan 12, 2026</td>
              <td className="text-end"><a className="btn btn-light btn-sm" href="user-details.html">View</a></td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <img className="avatar-img avatar-sm" src="../assets/images/avatar/avatar-2.jpg" alt="Rafi Khan" />
                  <div>
                    <p className="fw-semibold mb-0">Rafi Khan</p>
                    <p className="text-muted small mb-0">rafi@example.com</p>
                  </div>
                </div>
              </td>
              <td>Manager</td>
              <td>Sales</td>
              <td><span className="badge text-bg-success">Active</span></td>
              <td>Feb 03, 2026</td>
              <td className="text-end"><a className="btn btn-light btn-sm" href="user-details.html">View</a></td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <img className="avatar-img avatar-sm" src="../assets/images/avatar/avatar-3.jpg" alt="Nadia Islam" />
                  <div>
                    <p className="fw-semibold mb-0">Nadia Islam</p>
                    <p className="text-muted small mb-0">nadia@example.com</p>
                  </div>
                </div>
              </td>
              <td>Editor</td>
              <td>Content</td>
              <td><span className="badge text-bg-warning">Pending</span></td>
              <td>Mar 18, 2026</td>
              <td className="text-end"><a className="btn btn-light btn-sm" href="user-details.html">View</a></td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <img className="avatar-img avatar-sm" src="../assets/images/avatar/avatar-4.jpg" alt="Mina Torres" />
                  <div>
                    <p className="fw-semibold mb-0">Mina Torres</p>
                    <p className="text-muted small mb-0">mina@example.com</p>
                  </div>
                </div>
              </td>
              <td>Viewer</td>
              <td>Finance</td>
              <td><span className="badge text-bg-secondary">Suspended</span></td>
              <td>Apr 07, 2026</td>
              <td className="text-end"><a className="btn btn-light btn-sm" href="user-details.html">View</a></td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <img className="avatar-img avatar-sm" src="../assets/images/avatar/avatar-5.jpg" alt="Jon Oliver" />
                  <div>
                    <p className="fw-semibold mb-0">Jon Oliver</p>
                    <p className="text-muted small mb-0">jon@example.com</p>
                  </div>
                </div>
              </td>
              <td>Analyst</td>
              <td>Data</td>
              <td><span className="badge text-bg-success">Active</span></td>
              <td>Apr 22, 2026</td>
              <td className="text-end"><a className="btn btn-light btn-sm" href="user-details.html">View</a></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mt-3">
        <p className="text-muted small mb-0">Showing 1 to 5 of 124 users</p>
        <nav aria-label="Users pagination"><ul className="pagination pagination-sm mb-0"><li className="page-item disabled"><a className="page-link" href="#">Previous</a></li><li className="page-item active"><a className="page-link" href="#">1</a></li><li className="page-item"><a className="page-link" href="#">2</a></li><li className="page-item"><a className="page-link" href="#">Next</a></li></ul></nav>
      </div>
    </section>
  </div>
</main>

    <Footer />
  </div>
</div>

  )
}

export default Users
