/* eslint-disable import/no-extraneous-dependencies */
const { nanoid } = require('nanoid');
const notes = require('./notes');

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const editNoteByIdHandler = (req, h) => {
  const { id } = req.params;
  const { title, tags, body } = req.payload;
  const updatedAt = new Date().toISOString;

  const idxRetrieved = notes.findIndex((n) => n.id === id);

  if (idxRetrieved !== -1) {
    notes[idxRetrieved] = {
      ...notes[idxRetrieved],
      id,
      title,
      tags,
      body,
      updatedAt,
    };
    const res = h.response({
      status: 'success',
      message: 'Berhasil mengubah note',
      data: notes[idxRetrieved],
    });
    res.code(201);
    return res;
  }

  const res = h.response({
    status: 'error',
    message: 'Tidak berhasil mendapatkan note',
  });
  res.code(500);
  return res;
};

const getSpecifiedNote = (req, h) => {
  const { id } = req.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    const res = h.response({
      status: 'success',
      message: 'Berhasil mendapatkan note',
      data: {
        note,
      },
    });
    res.code(201);
    return res;
  }

  const res = h.response({
    status: 'error',
    message: 'Tidak berhasil mendapatkan note',
  });
  res.code(500);
  return res;
};

const deleteNoteById = (req, h) => {
  const { id } = req.params;

  const idxRetrieved = notes.findIndex((note) => note.id === id);

  if (idxRetrieved !== -1) {
    notes.splice(idxRetrieved, 1);
    const res = h.response({
      status: 'success',
      message: 'Berhasil menghapus note',
      data: id,
    });

    res.code(201);
    return res;
  }

  const res = h.response({
    status: 'error',
    message: 'Catatan gagal ditambahkan',
  });
  res.code(500);
  return res;
};

const addNoteHandler = (req, h) => {
  const { title, tags, body } = req.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    id,
    createdAt,
    updatedAt,
    title,
    tags,
    body,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const res = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    res.code(201);
    return res;
  }

  const res = h.response({
    status: 'error',
    message: 'Catatan gagal ditambahkan',
  }).header();
  res.code(500);
  return res;
};

module.exports = {
  addNoteHandler, getAllNotesHandler, getSpecifiedNote, editNoteByIdHandler, deleteNoteById,
};
