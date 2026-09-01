const express = require('express');
const router = express.Router();
const mysql = require('../db_connect');

router.post('/Register', (req, res) => {

    const {
        category,
        categoryType,
        transactionType,
        amount,
        description,
        date,
        month,
        payment
    } = req.body;

    const query = "INSERT INTO transactions (category_id, category_type,transaction_type, amount, description, transaction_date, month, payment) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

   mysql.query(
    query,
    [
        category,
        categoryType,
        transactionType,
        amount,
        description,
        date,
        month,
        payment
    ],
         (err, result) => {
        if (err) {
            console.log("MYSQL ERROR:", err);
            return res.status(500).json({
                message: "Server Error",
                error: err.message
            });
        }
            console.log("Transaction added successfully");

            res.status(200).json({
                message: "Transaction added successfully"
            });
        }
    );
});

router.post('/add-category', (req, res) => {
    const { categoryName } = req.body;
    if (!categoryName) {
        return res.status(400).json({ message: "Category name is required" });
    }

    const query = "INSERT INTO category (categories, status) VALUES (?, 'ACTIVE')";
    mysql.query(query, [categoryName], (err, result) => {
        if (err) {
            console.log("MYSQL ERROR:", err);
            return res.status(500).json({
                message: "Server Error",
                error: err.message
            });
        }
        console.log("Category added successfully");
        res.status(200).json({
            message: "Category added successfully",
            id: result.insertId
        });
    });
});

router.get('/categories', (req, res) => {
    const query = "SELECT * FROM category";
    mysql.query(query, (err, result) => {
        if (err) {
            console.log("MYSQL ERROR:", err);
            return res.status(500).json({
                message: "Server Error",
                error: err.message
            });
        }
        res.status(200).json(result);
    });
});

router.put('/category-status', (req, res) => {
    const { id, status } = req.body;
    if (!id || !status) {
        return res.status(400).json({ message: "Category ID and status are required" });
    }

    const query = "UPDATE category SET status = ? WHERE id = ?";
    mysql.query(query, [status, id], (err, result) => {
        if (err) {
            console.log("MYSQL ERROR:", err);
            return res.status(500).json({
                message: "Server Error",
                error: err.message
            });
        }
        console.log(`Category ID ${id} status updated to ${status}`);
        res.status(200).json({
            message: `Category status updated to ${status}`
        });
    });
});

router.put('/update-category', (req, res) => {
    const { id, categoryName } = req.body;
    if (!id || !categoryName) {
        return res.status(400).json({ message: "Category ID and new category name are required" });
    }

    const query = "UPDATE category SET categories = ? WHERE id = ?";
    mysql.query(query, [categoryName, id], (err, result) => {
        if (err) {
            console.log("MYSQL ERROR:", err);
            return res.status(500).json({
                message: "Server Error",
                error: err.message
            });
        }
        console.log(`Category ID ${id} name updated to ${categoryName}`);
        res.status(200).json({
            message: "Category updated successfully"
        });
    });
});

router.delete('/delete-category/:id', (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Category ID is required" });
    }

    const query = "DELETE FROM category WHERE id = ?";
    mysql.query(query, [id], (err, result) => {
        if (err) {
            console.log("MYSQL ERROR:", err);
            return res.status(500).json({
                message: "Server Error",
                error: err.message
            });
        }
        console.log(`Category ID ${id} deleted successfully`);
        res.status(200).json({
            message: "Category deleted successfully"
        });
    });
});

router.get('/transactions', (req, res) => {
    const query = "SELECT * FROM transactions ORDER BY id DESC";
    mysql.query(query, (err, result) => {
        if (err) {
            console.log("MYSQL ERROR:", err);
            return res.status(500).json({
                message: "Server Error",
                error: err.message
            });
        }
        res.status(200).json(result);
    });
});

router.put('/update-transaction', (req, res) => {
    const {
        id,
        category,
        categoryType,
        transactionType,
        amount,
        description,
        date,
        month,
        payment
    } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Transaction ID is required" });
    }

    const query = "UPDATE transactions SET category_id = ?, category_type = ?, transaction_type = ?, amount = ?, description = ?, transaction_date = ?, month = ?, payment = ? WHERE id = ?";
    mysql.query(
        query,
        [
            category,
            categoryType,
            transactionType,
            amount,
            description,
            date,
            month,
            payment,
            id
        ],
        (err, result) => {
            if (err) {
                console.log("MYSQL ERROR:", err);
                return res.status(500).json({
                    message: "Server Error",
                    error: err.message
                });
            }
            console.log("Transaction updated successfully");
            res.status(200).json({
                message: "Transaction updated successfully"
            });
        }
    );
});

router.delete('/delete-transaction/:id', (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Transaction ID is required" });
    }

    const query = "DELETE FROM transactions WHERE id = ?";
    mysql.query(query, [id], (err, result) => {
        if (err) {
            console.log("MYSQL ERROR:", err);
            return res.status(500).json({
                message: "Server Error",
                error: err.message
            });
        }
        console.log(`Transaction ID ${id} deleted successfully`);
        res.status(200).json({
            message: "Transaction deleted successfully"
        });
    });
});

module.exports = router;