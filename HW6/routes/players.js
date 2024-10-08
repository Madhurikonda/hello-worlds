const express = require("express");
const router = express.Router();
const Player = require("../models/playerModel");
const mongoose = require("mongoose");

// GET all players
router.get("/", async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a single player by ObjectId
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Player does not exist." });
  }
  try {
    const player = await Player.findById(id);
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH a single player's information
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Player does not exist." });
  }
  try {
    const player = await Player.findOneAndUpdate({ _id: id }, { ...req.body });
    if (!player) {
      return res.status(404).json({ error: "Player does not exist." });
    }
    res.status(200).json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST a new player
router.post("/", async (req, res) => {
  const { playerId, name, handedness, tournamentsWon, ranking, country } =
    req.body;
  try {
    const player = await Player.create({
      playerId,
      name,
      handedness,
      tournamentsWon,
      ranking,
      country,
    });
    res.status(200).json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a single player
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Player does not exist." });
  }
  try {
    const player = await Player.findOneAndDelete({ _id: id });
    if (!player) {
      return res.status(404).json({ error: "Player does not exist." });
    }
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
