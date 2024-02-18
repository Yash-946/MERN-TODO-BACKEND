const router = require("express").Router();
const { User, List } = require("../db");

//Create todo
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const existingUser = await User.findById(id);
    if (existingUser) {
      const newList = new List({ title, body, user: existingUser._id });
      await newList.save();

      existingUser.list.push(newList._id);
      await existingUser.save();
      res.status(200).json({ newList });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//update todo
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body } = req.body;

    const list = await List.findByIdAndUpdate(req.params.id, { title, body });
    list.save();
    res.status(200).json({message: `Todo Update sucessfully`});

  } catch (error) {
    res.status(400).json({message: `${error.message}`});
  }
});

//Delete todo
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const todoID = req.params.id;
    const existingUser = await User.findByIdAndUpdate(id, {
      $pull: { list: todoID },
    });
    if (existingUser) {
      await List.findByIdAndDelete(todoID);
    }

    res.status(200).send(`Todo delete sucessfully`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//get all todo
router.get("/getTasks/:id", async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id }).sort({
      createdAt: -1,
    });
    if (list.length != 0) {
      res.status(200).json({ list });
    } else {
      res.status(200).json({ message: "Please Create Todo" });
    }
  } catch (error) {
    res.status(400).send(error.message + "user not found");
  }
});

module.exports = router;
