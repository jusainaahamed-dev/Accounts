
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../components/navbar'
import Header from '../components/header'
import Footer from '../components/footer'
function AddTrans() {

  const [amount, setamount] = useState();
  const [description, setdesc] = useState();
  const [date, setdate] = useState();
  const [payment, setpayment] = useState();
  const [month, setmonth] = useState();
  const [category, setcate] = useState("");
  const [categoryType, setcategoryType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/categories');
      setCategoriesList(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory || !newCategory.trim()) {
      Swal.fire({
        title: 'Error',
        text: 'Please enter a category name',
        icon: 'error',
      });
      return;
    }
    try {
      const response = await axios.post('http://localhost:5001/api/add-category', {
        categoryName: newCategory.trim()
      });
      Swal.fire({
        title: 'Success',
        text: response.data.message || 'Category added successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      setShowModal(false);
      setNewCategory("");
      fetchCategories();
    } catch (err) {
      console.error("Error adding category:", err);
      Swal.fire({
        title: 'Error',
        text: err.response?.data?.message || 'Failed to add category',
        icon: 'error',
      });
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = (currentStatus || 'ACTIVE') === 'INACTIVE' ? 'ACTIVE' : 'INACTIVE';
    try {
      await axios.put('http://localhost:5001/api/category-status', {
        id,
        status: newStatus
      });
      fetchCategories();
    } catch (err) {
      console.error("Error updating category status:", err);
      Swal.fire({
        title: 'Error',
        text: 'Failed to update category status',
        icon: 'error',
      });
    }
  };

  const handleUpdateCategory = async (id) => {
    if (!editingName || !editingName.trim()) {
      Swal.fire({
        title: 'Error',
        text: 'Category name cannot be empty',
        icon: 'error',
      });
      return;
    }
    try {
      await axios.put('http://localhost:5001/api/update-category', {
        id,
        categoryName: editingName.trim()
      });
      Swal.fire({
        title: 'Success',
        text: 'Category updated successfully!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
      setEditingId(null);
      setEditingName("");
      fetchCategories();
    } catch (err) {
      console.error("Error updating category:", err);
      Swal.fire({
        title: 'Error',
        text: err.response?.data?.message || 'Failed to update category',
        icon: 'error',
      });
    }
  };

  const handleDeleteCategory = async (id, name) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete "${name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5001/api/delete-category/${id}`);
        Swal.fire({
          title: 'Deleted!',
          text: 'Category has been deleted.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
        fetchCategories();
      } catch (err) {
        console.error("Error deleting category:", err);
        Swal.fire({
          title: 'Error',
          text: err.response?.data?.message || 'Failed to delete category',
          icon: 'error',
        });
      }
    }
  };

  const handlesave = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!category || !amount || !month || !date || !payment) {
      console.log("Please fill all required fields");
      return;
    }
    else {
      const tabledetail = {
        category,
        categoryType,
        transactionType,
        amount,
        description,
        date,
        month,
        payment
      };
      console.log("Sending data:", tabledetail);
      const response = await axios.post('http://localhost:5001/api/Register', tabledetail);
      Swal.fire({
        title: 'Success',
        text: response.data.message,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }
  }

  return (
    <div>
      <Navbar />
      <div className="admin-main">
        <Header />
        <main className="dashboard-content">
          <div className="container-fluid px-3 px-lg-4 py-4">
            <div className="page-heading">
              <div className="page-heading-copy">
                <span className="page-icon"><i className="bi bi-cash-coin" aria-hidden="true" /></span>
                <div>
                  <p className="eyebrow mb-1"></p>
                  <h1 className="h3 mb-1">Add Transaction</h1>
                  <p className="text-muted mb-0">Track it,Own it,Spent it!!</p>
                </div>
              </div>
              <div className="heading-actions"><a className="btn btn-outline-secondary btn-sm" href="users.html"><i className="bi bi-arrow-left" aria-hidden="true" /> Back to Users</a></div>
            </div>
            <section className="row g-3">
              <div className="col-12 col-xl-20">
                <form onSubmit={handlesave} className="panel needs-validation" noValidate>
                  <div className="panel-header"><div><h2 className="h5 mb-1 section-title"><i className="bi bi-cash-stack" aria-hidden="true" /><span>Transaction Type</span></h2></div></div>

                  <div className="radio-group">
                    <label className='radio-option'>
                      <input
                        type="radio"
                        name="type"
                        value="debit"
                        onChange={(e) => setTransactionType(e.target.value)} />
                      <span>Debit</span>
                    </label>
                    <label className='radio-option'>
                      <input type="radio" name="type" value="credit"
                        onChange={(e) => setTransactionType(e.target.value)} />
                      <span>Credit</span>
                    </label>
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="category">
                        Category
                      </label>

                      <div className="d-flex align-items-center">
                        <select
                          className={`form-select ${submitted && !category ? "is-invalid" : ""}`}
                          id="category"
                          value={category || ""}
                          onChange={(e) => {
                            setcate(e.target.value);
                            setcategoryType(e.target.options[e.target.selectedIndex].text);
                          }}
                          style={{ flex: 1 }}
                          required >
                          <option value="" disabled hidden>Choose Category</option>
                          {categoriesList
                            .filter((cat) => (cat.status || 'ACTIVE') === 'ACTIVE')
                            .map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.categories}
                              </option>
                            ))}
                        </select>
                        <button
                          type="button"
                          className="btn btn-primary ms-2"
                          style={{ width: "45px", height: "45px" }}
                          onClick={() => setShowModal(true)} >
                          <i className="bi bi-plus-lg"></i>
                        </button>
                      </div>
                      {submitted && !category && (
                        <div className="invalid-feedback">
                          Choose a category.
                        </div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label" htmlFor="lastName">Amount</label>
                      <input className={`form-select ${submitted && !amount ? "is-invalid" : ""}`}
                        id="amount"
                        onChange={(e) => setamount(e.target.value)} type="text" required />
                      {submitted && !amount && (
                        <div className="invalid-feedback">
                          Amount Required.
                        </div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label" htmlFor="role">Month</label>
                      <select className={`form-select ${submitted && !month ? "is-invalid" : ""}`}
                        id="role"
                        onChange={(e) => setmonth(e.target.value)} required>
                        <option value="">Choose Month</option>
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                        <option>June</option>
                        <option>July</option>
                        <option>August</option>
                        <option>September</option>
                        <option>October</option>
                        <option>November</option>
                        <option>December</option>
                      </select>
                      {submitted && !month && (
                        <div className="invalid-feedback">
                          Choose a month.
                        </div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label" htmlFor="phone">Date</label>
                      <input className={`form-control ${submitted && !date ? "is-invalid" : ""}`}
                        id="phone"
                        onChange={(e) => setdate(e.target.value)} type="date" required />
                      {submitted && !date && (
                        <div className="invalid-feedback">
                          Choose a date.
                        </div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label" htmlFor="role">Payment Method</label>
                      <select className={`form-select ${submitted && !payment ? "is-invalid" : ""}`}
                        id="role"
                        onChange={(e) => setpayment(e.target.value)} required>
                        <option value=""> Choose Methods</option>
                        <option>UPI</option>
                        <option>Cash</option>
                        <option>Debit Card</option>
                        <option>COD</option>
                      </select>
                      {submitted && !payment && (
                        <div className="invalid-feedback">
                          Choose a payment.
                        </div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label" htmlFor="notes">Description</label>
                      <textarea className="form-control" id="notes" onChange={(e) => setdesc(e.target.value)} placeholder="Optional onboarding notes" /></div>
                  </div>

                  <div className="d-flex flex-wrap justify-content-end gap-2 mt-4">
                    <a className="btn btn-outline-secondary" href="users.html">Cancel</a>
                    <button className="btn btn-primary" type="Submit"  ><i className="bi bi-save" aria-hidden="true" /> Store it</button></div>
                </form>
                {showModal && (
                  <div
                    className="modal fade show custom-modal"
                    tabIndex="-1"
                  >
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                      <div className="modal-content">

                        <div className="modal-header">
                          <h5 className="modal-title"><i className="bi bi-tags me-2"></i>Manage Categories</h5>

                          <button
                            type="button"
                            className="btn-close"
                            onClick={() => setShowModal(false)}
                          ></button>
                        </div>

                        <div className="modal-body">
                          <label className="form-label fw-semibold">
                            Add New Category
                          </label>

                          <div className="input-group mb-4">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter category name"
                              value={newCategory}
                              onChange={(e) => setNewCategory(e.target.value)}
                            />
                            {newCategory && (
                              <button
                                type="button"
                                className="btn btn-outline-secondary"
                                title="Clear text"
                                onClick={() => setNewCategory("")}
                              >
                                <i className="bi bi-x-lg"></i>
                              </button>
                            )}
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleAddCategory}>
                              <i className="bi bi-plus-circle me-1"></i> Add Category
                            </button>
                          </div>

                          <h6 className="fw-bold mb-2">Category List</h6>
                          {categoriesList.length > 0 ? (
                            <div className="table-responsive" style={{ maxHeight: "250px", overflowY: "auto" }}>
                              <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                  <tr>
                                    <th>#</th>
                                    <th>Category Name</th>
                                    <th>Status</th>
                                    <th className="text-end">Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {categoriesList.map((cat, index) => {
                                    const isActive = (cat.status || 'ACTIVE') === 'ACTIVE';
                                    const isEditing = editingId === cat.id;
                                    return (
                                      <tr key={cat.id}>
                                        <td>{index + 1}</td>
                                        {isEditing ? (
                                          <td colSpan="2">
                                            <div className="input-group input-group-sm">
                                              <input
                                                type="text"
                                                className="form-control"
                                                value={editingName}
                                                onChange={(e) => setEditingName(e.target.value)}
                                                autoFocus
                                              />
                                              {editingName && (
                                                <button
                                                  type="button"
                                                  className="btn btn-outline-secondary"
                                                  title="Clear text"
                                                  onClick={() => setEditingName("")}
                                                >
                                                  <i className="bi bi-x-lg"></i>
                                                </button>
                                              )}
                                              <button
                                                type="button"
                                                className="btn btn-success"
                                                title="Save"
                                                onClick={() => handleUpdateCategory(cat.id)}
                                              >
                                                <i className="bi bi-check-lg"></i>
                                              </button>
                                              <button
                                                type="button"
                                                className="btn btn-secondary"
                                                title="Cancel"
                                                onClick={() => {
                                                  setEditingId(null);
                                                  setEditingName("");
                                                }}
                                              >
                                                <i className="bi bi-x-circle"></i>
                                              </button>
                                            </div>
                                          </td>
                                        ) : (
                                          <>
                                            <td className="fw-medium">{cat.categories}</td>
                                            <td>
                                              <span className={`badge ${isActive ? 'bg-success' : 'bg-secondary'}`}>
                                                {isActive ? 'Active' : 'Inactive'}
                                              </span>
                                            </td>
                                          </>
                                        )}
                                        <td className="text-end">
                                          {!isEditing && (
                                            <>
                                              <button
                                                type="button"
                                                className="btn btn-sm btn-outline-primary me-1"
                                                title="Edit Category"
                                                onClick={() => {
                                                  setEditingId(cat.id);
                                                  setEditingName(cat.categories);
                                                }}
                                              >
                                                <i className="bi bi-pencil-square"></i>
                                              </button>

                                              <button
                                                type="button"
                                                className={`btn btn-sm ${isActive ? 'btn-outline-warning' : 'btn-outline-success'} me-1`}
                                                title={isActive ? "Deactivate Category" : "Activate Category"}
                                                onClick={() => handleToggleStatus(cat.id, cat.status || 'ACTIVE')}
                                              >
                                                <i className={`bi ${isActive ? 'bi-slash-circle' : 'bi-check-circle'}`}></i>
                                              </button>

                                              <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                title="Delete Category"
                                                onClick={() => handleDeleteCategory(cat.id, cat.categories)}
                                              >
                                                <i className="bi bi-trash"></i>
                                              </button>
                                            </>
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <p className="text-muted mb-0">No categories added yet.</p>
                          )}
                        </div>

                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowModal(false)}>
                            Close
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>
                )}

              </div>

            </section>
          </div>
        </main>

        <Footer />
      </div>
    </div>

  )
}

export default AddTrans
