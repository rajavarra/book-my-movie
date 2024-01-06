const express = require('express');
const { Theatre, Shows, Movie, Seats } = require('../../models/sqlSchema');

const theatresRouter = express.Router();

theatresRouter.get('/', async (req, res) => {
  try {
    const allTheatres = await Theatre.findAll();

    res.status(200).json(allTheatres);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
});
theatresRouter.get('/:id', async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const selectedTheatre = await Theatre.findOne({
      where: { theatre_id: id },
    });
    if (selectedTheatre === null) {
      return res.status(404).json({ message: 'Theatre Not Found!' });
    }

    res.status(200).json(selectedTheatre);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
});

theatresRouter.get('/:id/shows', async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const theatreShows = await Shows.findAll({
      where: { theatre_id: id },
      include: {
        model: Movie,
      },
    });
    if (theatreShows === null) {
      return res.status(404).json({ message: 'Theatre Shows Not Found!' });
    }
    res.status(200).json(theatreShows);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
});

theatresRouter.get('/:id/shows/:showId', async (req, res) => {
  try {
    const {
      params: { id, showId },
    } = req;

    const movieShow = await Shows.findOne({
      where: { theatre_id: id, show_id: showId },
      include: [
        {
          model: Movie,
        },
        { model: Seats, where: { show_id: showId } },
      ],
    });
    if (movieShow === null) {
      return res.status(404).json({ message: 'Show Not Found!' });
    }
    res.status(200).json(movieShow);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = theatresRouter;
