const Category = require("../models/Category");
const Transaction = require("../models/Transaction"); // only declared once

exports.createCategory = async (req, res) => {
  try {
    const { name, budget } = req.body;
    if (!name || !budget) {
      return res.status(400).json({ message: "Name and budget are required" });
    }

    const category = new Category({
      name,
      budget,
      spent: 0,
      user: req.user._id,
    });

    await category.save();
    res.status(201).json({ message: "Category created", category });
  } catch (err) {
    console.error("Error creating category:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user._id, });
    res.json({ categories });
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.spendFromCategory = async (req, res) => {
  try {
    const { amount, note } = req.body;
    const category = await Category.findOne({ _id: req.params.id, user: req.user._id });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.spent += amount;
    await category.save();

    // Save the transaction
    const tx = new Transaction({
      user: req.user._id,
      category: category._id,
      amount,
      note: note || "SpendWise Payment",
    });
    await tx.save();

    res.json({ message: "Payment recorded", category });
  } catch (err) {
    console.error("Error in spending:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.undoLastTransaction = async (req, res) => {
  const userId = req.user._id;
  const categoryId = req.params.id;

  try {
    const lastTx = await Transaction.findOne({ 
      user: userId.toString(), 
      category: categoryId 
    }).sort({ createdAt: -1 });

    if (!lastTx) {
      return res.status(404).json({ message: "No transaction found to undo." });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    category.spent -= lastTx.amount;
    await category.save();

    await Transaction.deleteOne({ _id: lastTx._id });

    return res.status(200).json({ message: "Transaction undone successfully." });
  } catch (err) {
    console.error("Undo error:", err);
    return res.status(500).json({ message: "Server error while undoing transaction." });
  }
};
// Update category name or budget
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, budget } = req.body;

    const category = await Category.findOne({ _id: id, user: req.user._id });
    if (!category) return res.status(404).json({ message: "Category not found" });

    if (name) category.name = name;
    if (budget) category.budget = budget;

    await category.save();
    res.status(200).json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Failed to update category" });
  }
};
exports.resetAllSpent = async (req, res) => {
  try {
    const userId = req.user._id;
    await Category.updateMany({ user: userId }, { $set: { spent: 0 } });
    res.status(200).json({ message: "All categories reset successfully" });
  } catch (error) {
    console.error("Reset error:", error);
    res.status(500).json({ message: "Failed to reset categories" });
  }
};




// archive a category
// DELETE /api/categories/:id
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};



exports.togglePinStatus = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id, user: req.user._id });
    if (!category) return res.status(404).json({ message: "Category not found" });

    category.isPinned = !category.isPinned;
    await category.save();

    res.json({ message: "Pin status updated", isPinned: category.isPinned });
  } catch (err) {
    console.error("Pin toggle error:", err);
    res.status(500).json({ message: "Server error" });
  }
};




