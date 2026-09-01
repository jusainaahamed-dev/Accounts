import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';
import Navbar from '../components/navbar';
import Header from '../components/header';
import Footer from '../components/footer';

function Tables() {
    const [transactions, setTransactions] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Selected Month Modal state for viewing month transactions
    const [activeMonth, setActiveMonth] = useState(null);

    // Edit Transaction Modal state
    const [showEditModal, setShowEditModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editAmount, setEditAmount] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editDate, setEditDate] = useState("");
    const [editPayment, setEditPayment] = useState("");
    const [editMonth, setEditMonth] = useState("");
    const [editCategory, setEditCategory] = useState("");
    const [editCategoryType, setEditCategoryType] = useState("");
    const [editTransactionType, setEditTransactionType] = useState("");

    const monthsList = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:5001/api/transactions');
            setTransactions(res.data);
        } catch (err) {
            console.error("Error fetching transactions:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/categories');
            setCategoriesList(res.data);
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };

    useEffect(() => {
        fetchTransactions();
        fetchCategories();
    }, []);

    // Compute monthly summary rows
    const monthlySummaries = monthsList.map((monthName) => {
        const monthTx = transactions.filter(t => t.month === monthName);
        const totalCredit = monthTx
            .filter(t => (t.transaction_type || '').toLowerCase() === 'credit')
            .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

        const totalDebit = monthTx
            .filter(t => (t.transaction_type || '').toLowerCase() === 'debit')
            .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

        const balance = totalCredit - totalDebit;

        return {
            month: monthName,
            totalCredit,
            totalDebit,
            balance,
            count: monthTx.length,
            transactions: monthTx
        };
    }).filter(m => m.count > 0 || searchQuery !== ""); // show months with data or all if search

    // Filter monthly summary search query
    const filteredSummaries = monthlySummaries.filter(m =>
        !searchQuery || m.month.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Overall totals
    const overallCredit = transactions
        .filter(t => (t.transaction_type || '').toLowerCase() === 'credit')
        .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

    const overallDebit = transactions
        .filter(t => (t.transaction_type || '').toLowerCase() === 'debit')
        .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

    const overallBalance = overallCredit - overallDebit;

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This transaction will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:5001/api/delete-transaction/${id}`);
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Transaction deleted successfully.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                });
                fetchTransactions();
            } catch (err) {
                console.error("Error deleting transaction:", err);
                Swal.fire({
                    title: 'Error',
                    text: err.response?.data?.message || 'Failed to delete transaction',
                    icon: 'error',
                });
            }
        }
    };

    const handleOpenEdit = (row) => {
        setEditId(row.id);
        setEditAmount(row.amount || "");
        setEditDescription(row.description || "");
        const formattedDate = row.transaction_date ? row.transaction_date.substring(0, 10) : "";
        setEditDate(formattedDate);
        setEditPayment(row.payment || "");
        setEditMonth(row.month || "");
        setEditCategory(row.category_id || "");
        setEditCategoryType(row.category_type || "");
        setEditTransactionType(row.transaction_type || "debit");
        setShowEditModal(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editCategory || !editAmount || !editMonth || !editDate || !editPayment) {
            Swal.fire({
                title: 'Error',
                text: 'Please fill all required fields',
                icon: 'error',
            });
            return;
        }

        try {
            const payload = {
                id: editId,
                category: editCategory,
                categoryType: editCategoryType,
                transactionType: editTransactionType,
                amount: editAmount,
                description: editDescription,
                date: editDate,
                month: editMonth,
                payment: editPayment
            };

            const res = await axios.put('http://localhost:5001/api/update-transaction', payload);
            Swal.fire({
                title: 'Success',
                text: res.data.message || 'Transaction updated successfully!',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
            });
            setShowEditModal(false);
            fetchTransactions();
        } catch (err) {
            console.error("Error updating transaction:", err);
            Swal.fire({
                title: 'Error',
                text: err.response?.data?.message || 'Failed to update transaction',
                icon: 'error',
            });
        }
    };

    // Main Summary Table Columns
    const summaryColumns = [
        {
            name: 'Month',
            selector: row => row.month,
            sortable: true,
            cell: row => <span className="fw-bold fs-6">{row.month}</span>
        },
        {
            name: 'Total Credit',
            selector: row => row.totalCredit,
            sortable: true,
            cell: row => (
                <span className="fw-semibold text-success">
                    ₹{row.totalCredit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
            ),
            right: true,
        },
        {
            name: 'Total Debit',
            selector: row => row.totalDebit,
            sortable: true,
            cell: row => (
                <span className="fw-semibold text-danger">
                    ₹{row.totalDebit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
            ),
            right: true,
        },
        {
            name: 'Balance',
            selector: row => row.balance,
            sortable: true,
            cell: row => (
                <span className={`fw-bold ${row.balance >= 0 ? 'text-primary' : 'text-warning'}`}>
                    ₹{row.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
            ),
            right: true,
        },
        {
            name: 'Transactions',
            selector: row => row.count,
            sortable: true,
            center: true,
            width: '120px',
            cell: row => <span className="badge bg-secondary">{row.count} items</span>
        },
        {
            name: 'Action',
            cell: row => (
                <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={() => setActiveMonth(row.month)}
                >
                    <i className="bi bi-eye me-1"></i> View Transactions
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '180px',
        },
    ];

    // Active Month Detailed Transactions Columns
    const monthDetailTx = activeMonth
        ? transactions.filter(t => t.month === activeMonth)
        : [];

    const detailColumns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
            width: '70px',
        },
        {
            name: 'Date',
            selector: row => row.transaction_date ? row.transaction_date.substring(0, 10) : 'N/A',
            sortable: true,
            width: '120px',
        },
        {
            name: 'Category',
            selector: row => row.category_type || 'N/A',
            sortable: true,
        },
        {
            name: 'Type',
            cell: row => {
                const type = (row.transaction_type || 'debit').toLowerCase();
                return (
                    <span className={`badge ${type === 'credit' ? 'bg-success' : 'bg-danger'}`}>
                        {type.toUpperCase()}
                    </span>
                );
            },
            sortable: true,
            width: '100px',
        },
        {
            name: 'Amount',
            selector: row => `₹${parseFloat(row.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
            sortable: true,
            right: true,
        },
        {
            name: 'Payment',
            selector: row => row.payment || 'N/A',
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => row.description || '-',
            sortable: false,
        },
        {
            name: 'Actions',
            cell: row => (
                <div className="d-flex gap-1">
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        title="Edit Transaction"
                        onClick={() => handleOpenEdit(row)}
                    >
                        <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        title="Delete Transaction"
                        onClick={() => handleDelete(row.id)}
                    >
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '110px',
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                fontWeight: 'bold',
                fontSize: '14px',
                backgroundColor: '#f8f9fa',
            },
        },
        rows: {
            style: {
                fontSize: '14px',
            },
        },
    };

    return (
        <div>
            <Navbar />
            <div className="admin-main">
                <Header />
                <main className="dashboard-content">
                    <div className="container-fluid px-3 px-lg-4 py-4">
                        <div className="page-heading d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                            <div className="page-heading-copy">
                                <span className="page-icon"><i className="bi bi-calendar-check" aria-hidden="true" /></span>
                                <div>
                                    <h1 className="h3 mb-1">Monthly Summary</h1>
                                    <p className="text-muted mb-0">Overview of credit, debit, and balance month-wise.</p>
                                </div>
                            </div>
                        </div>

                        {/* Overall Summary Cards */}
                        <div className="row g-3 mb-4">
                            <div className="col-12 col-md-4">
                                <div className="card border-0 shadow-sm bg-success bg-opacity-10 text-success p-3 rounded-3">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <span className="text-uppercase fw-semibold small">Overall Credit</span>
                                            <h3 className="mb-0 fw-bold">₹{overallCredit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h3>
                                        </div>
                                        <i className="bi bi-arrow-down-left-circle fs-1"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                                <div className="card border-0 shadow-sm bg-danger bg-opacity-10 text-danger p-3 rounded-3">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <span className="text-uppercase fw-semibold small">Overall Debit</span>
                                            <h3 className="mb-0 fw-bold">₹{overallDebit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h3>
                                        </div>
                                        <i className="bi bi-arrow-up-right-circle fs-1"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                                <div className={`card border-0 shadow-sm p-3 rounded-3 ${overallBalance >= 0 ? 'bg-primary bg-opacity-10 text-primary' : 'bg-warning bg-opacity-10 text-warning'}`}>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <span className="text-uppercase fw-semibold small">Net Balance</span>
                                            <h3 className="mb-0 fw-bold">₹{overallBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h3>
                                        </div>
                                        <i className="bi bi-wallet2 fs-1"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Monthly Summary Table */}
                        <section className="panel shadow-sm rounded-3">
                            <div className="panel-header d-flex align-items-center justify-content-between p-3 border-bottom">
                                <h5 className="mb-0 fw-bold">Monthly Financial Summary</h5>
                                <div className="position-relative" style={{ maxWidth: "250px", width: "100%" }}>
                                    <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                                    <input
                                        className="form-control form-control-sm ps-5"
                                        type="search"
                                        placeholder="Search month..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="p-2">
                                <DataTable
                                    columns={summaryColumns}
                                    data={filteredSummaries}
                                    pagination
                                    paginationPerPage={12}
                                    highlightOnHover
                                    responsive
                                    customStyles={customStyles}
                                    progressPending={loading}
                                    onRowClicked={(row) => setActiveMonth(row.month)}
                                    pointerOnHover
                                    noDataComponent={<div className="p-4 text-center text-muted">No monthly records available.</div>}
                                />
                            </div>
                        </section>

                        {/* Month Transactions Detail Modal */}
                        {activeMonth && (
                            <div className="modal fade show custom-modal" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                <div className="modal-dialog modal-dialog-centered modal-xl">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">
                                                <i className="bi bi-calendar-event me-2"></i>
                                                {activeMonth} Transactions ({monthDetailTx.length})
                                            </h5>
                                            <button type="button" className="btn-close" onClick={() => setActiveMonth(null)}></button>
                                        </div>
                                        <div className="modal-body p-3">
                                            <DataTable
                                                columns={detailColumns}
                                                data={monthDetailTx}
                                                pagination
                                                paginationPerPage={10}
                                                highlightOnHover
                                                responsive
                                                customStyles={customStyles}
                                                noDataComponent={<div className="p-4 text-center text-muted">No transactions found for {activeMonth}.</div>}
                                            />
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => setActiveMonth(null)}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Edit Transaction Modal */}
                        {showEditModal && (
                            <div className="modal fade show custom-modal" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1060 }}>
                                <div className="modal-dialog modal-dialog-centered modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title"><i className="bi bi-pencil-square me-2"></i>Edit Transaction #{editId}</h5>
                                            <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                                        </div>
                                        <form onSubmit={handleUpdate}>
                                            <div className="modal-body">
                                                {/* Transaction Type Radio */}
                                                <div className="mb-3">
                                                    <label className="form-label fw-semibold">Transaction Type</label>
                                                    <div className="d-flex gap-4">
                                                        <label className="form-check-label">
                                                            <input
                                                                type="radio"
                                                                className="form-check-input me-2"
                                                                name="editType"
                                                                value="debit"
                                                                checked={editTransactionType === "debit"}
                                                                onChange={(e) => setEditTransactionType(e.target.value)}
                                                            />
                                                            Debit
                                                        </label>
                                                        <label className="form-check-label">
                                                            <input
                                                                type="radio"
                                                                className="form-check-input me-2"
                                                                name="editType"
                                                                value="credit"
                                                                checked={editTransactionType === "credit"}
                                                                onChange={(e) => setEditTransactionType(e.target.value)}
                                                            />
                                                            Credit
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="row g-3">
                                                    {/* Category */}
                                                    <div className="col-md-6">
                                                        <label className="form-label fw-semibold">Category</label>
                                                        <select
                                                            className="form-select"
                                                            value={editCategory}
                                                            onChange={(e) => {
                                                                setEditCategory(e.target.value);
                                                                setEditCategoryType(e.target.options[e.target.selectedIndex].text);
                                                            }}
                                                            required
                                                        >
                                                            <option value="" disabled hidden>Choose Category</option>
                                                            {categoriesList
                                                                .filter((cat) => (cat.status || 'ACTIVE') === 'ACTIVE')
                                                                .map((cat) => (
                                                                    <option key={cat.id} value={cat.id}>
                                                                        {cat.categories}
                                                                    </option>
                                                                ))}
                                                        </select>
                                                    </div>

                                                    {/* Amount */}
                                                    <div className="col-md-6">
                                                        <label className="form-label fw-semibold">Amount</label>
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            className="form-control"
                                                            value={editAmount}
                                                            onChange={(e) => setEditAmount(e.target.value)}
                                                            required
                                                        />
                                                    </div>

                                                    {/* Month */}
                                                    <div className="col-md-6">
                                                        <label className="form-label fw-semibold">Month</label>
                                                        <select
                                                            className="form-select"
                                                            value={editMonth}
                                                            onChange={(e) => setEditMonth(e.target.value)}
                                                            required
                                                        >
                                                            <option value="">Choose Month</option>
                                                            {monthsList.map(m => (
                                                                <option key={m} value={m}>{m}</option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    {/* Date */}
                                                    <div className="col-md-6">
                                                        <label className="form-label fw-semibold">Date</label>
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            value={editDate}
                                                            onChange={(e) => setEditDate(e.target.value)}
                                                            required
                                                        />
                                                    </div>

                                                    {/* Payment Method */}
                                                    <div className="col-md-6">
                                                        <label className="form-label fw-semibold">Payment Method</label>
                                                        <select
                                                            className="form-select"
                                                            value={editPayment}
                                                            onChange={(e) => setEditPayment(e.target.value)}
                                                            required
                                                        >
                                                            <option value="">Choose Method</option>
                                                            <option value="UPI">UPI</option>
                                                            <option value="Cash">Cash</option>
                                                            <option value="Debit Card">Debit Card</option>
                                                            <option value="COD">COD</option>
                                                        </select>
                                                    </div>

                                                    {/* Description */}
                                                    <div className="col-md-6">
                                                        <label className="form-label fw-semibold">Description</label>
                                                        <textarea
                                                            className="form-control"
                                                            rows="2"
                                                            value={editDescription}
                                                            onChange={(e) => setEditDescription(e.target.value)}
                                                            placeholder="Optional notes"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={() => setShowEditModal(false)}
                                                >
                                                    Cancel
                                                </button>
                                                <button type="submit" className="btn btn-primary">
                                                    <i className="bi bi-save me-1"></i> Update Transaction
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default Tables;
