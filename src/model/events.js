const path = require('path');
const { app, EventEmitter, Helper } = require('geum');

const Exception = require('./Exception');

const system = app.system;
const store = system.store;

/**
 * System Model Create Job
 *
 * @param {Request} req
 * @param {Response} res
 */
app.on('system-model-create', async(req, res) => {
  //----------------------------//
  // 1. Get Schema
  if (!req.hasStage('schema')) {
    return res.setError(true, 'Request missing schema');
  }

  try {
    const schema = system.schema(req.getStage('schema'));
  } catch(e) {
    return res.setError(true, e.message);
  }

  //----------------------------//
  // 2. Validate Data
  //----------------------------//
  // 3. Prepare Data
  //get the data
  const data = Object.assign({}, req.getStage());

  //remove primary
  delete data[schema.collection.primaryKey];

  //----------------------------//
  // 4. Process Data
  try {
    const results = await schema.collection.insert(data);
  } catch(e) {
    return res.setError(true, e.message);
  }

  //----------------------------//
  // 5. Interpret Results
  return res.setResults(results);
});

/**
 * System Model Detail Job
 *
 * @param {Request} req
 * @param {Response} res
 */
app.on('system-model-detail', async(req, res) => {
  //----------------------------//
  // 1. Get Schema
  if (!req.hasStage('schema')) {
    return res.setError(true, 'Request missing schema');
  }

  try {
    const schema = system.schema(req.getStage('schema'));
  } catch(e) {
    return res.setError(true, e.message);
  }

  //----------------------------//
  // 2. Validate Data
  //----------------------------//
  // 3. Prepare Data
  //get the data
  const data = req.getStage();

  const key = null, id = null;
  Helper.forEach(schema.uniques, name => {
    if (typeof data[name] !== 'undefined') {
      key = name;
      id = data[name];
      return false;
    }
  });

  if (id === null) {
    return res.setError(true, 'Invalid ID');
  }

  //----------------------------//
  // 4. Process Data
  try {
    const results = await store.detail(schema.name, key, id);
  } catch(e) {
    return res.setError(true, e.message);
  }

  //----------------------------//
  // 5. Interpret Results
  return res.setResults(results);
});

/**
 * System Model Remove Job
 *
 * @param {Request} req
 * @param {Response} res
 */
app.on('system-model-remove', async(req, res) => {
  //----------------------------//
  // 1. Get Schema
  if (!req.hasStage('schema')) {
    return res.setError(true, 'Request missing schema');
  }

  try {
    const schema = system.schema(req.getStage('schema'));
  } catch(e) {
    return res.setError(true, e.message);
  }

  //----------------------------//
  // 2. Validate Data
  //----------------------------//
  // 3. Prepare Data
  //get the data
  const data = req.getStage();

  if (!data[schema.primary]) {
    const detail = await app.request('system-model.detail', data);
    if (!detail) {
      return res.setError(true, 'Invalid ID');
    }

    data[schema.primary] = detail[schema.primary];
  }

  //----------------------------//
  // 4. Process Data
  if (schema.active) {
    try {
      const payload = {};
      payload[schema.active] = 0;
      const results = await schema.collection.update(data[schema.primary], payload);
    } catch(e) {
      return res.setError(true, e.message);
    }
  } else {
    try {
      const results = await schema.collection.remove(data[schema.primary]);
    } catch(e) {
      return res.setError(true, e.message);
    }
  }

  //----------------------------//
  // 5. Interpret Results
  return res.setResults(results);
});

/**
 * System Model Remove Job
 *
 * @param {Request} req
 * @param {Response} res
 */
app.on('system-model-restore', async(req, res) => {
  //----------------------------//
  // 1. Get Schema
  if (!req.hasStage('schema')) {
    return res.setError(true, 'Request missing schema');
  }

  try {
    const schema = system.schema(req.getStage('schema'));
  } catch(e) {
    return res.setError(true, e.message);
  }

  //----------------------------//
  // 2. Validate Data
  //----------------------------//
  // 3. Prepare Data
  //get the data
  const data = req.getStage();

  if (!data[schema.primary]) {
    const detail = await app.request('system-model.detail', data);
    if (!detail) {
      return res.setError(true, 'Invalid ID');
    }

    data[schema.primary] = detail[schema.primary];
  }

  //----------------------------//
  // 4. Process Data
  if (schema.active) {
    try {
      const payload = {};
      payload[schema.active] = 1;
      const results = await schema.collection.update(data[schema.primary], payload);
    } catch(e) {
      return res.setError(true, e.message);
    }
  } else {
    try {
      const results = await schema.collection.remove(data[schema.primary]);
    } catch(e) {
      return res.setError(true, e.message);
    }
  }

  //----------------------------//
  // 5. Interpret Results
  return res.setResults(results);
});

/**
 * System Model Search Job
 *
 * @param {Request} req
 * @param {Response} res
 */
app.on('system-model-search', async(req, res) => {
  //----------------------------//
  // 1. Get Schema
  if (!req.hasStage('schema')) {
    return res.setError(true, 'Request missing schema');
  }

  try {
    const schema = system.schema(req.getStage('schema'));
  } catch(e) {
    return res.setError(true, e.message);
  }

  //----------------------------//
  // 2. Validate Data
  //----------------------------//
  // 3. Prepare Data
  //get the data
  const filters = req.getStage();

  //----------------------------//
  // 4. Process Data
  try {
    const results = await schema.collection.searcch(filters);
  } catch(e) {
    return res.setError(true, e.message);
  }

  //----------------------------//
  // 5. Interpret Results
  return res.setResults(results);
});

/**
 * System Model Update Job
 *
 * @param {Request} req
 * @param {Response} res
 */
app.on('system-model-update', async(req, res) => {
  //----------------------------//
  // 1. Get Schema
  if (!req.hasStage('schema')) {
    return res.setError(true, 'Request missing schema');
  }

  try {
    const schema = system.schema(req.getStage('schema'));
  } catch(e) {
    return res.setError(true, e.message);
  }

  //----------------------------//
  // 2. Validate Data
  //----------------------------//
  // 3. Prepare Data
  //get the data
  const data = req.getStage();

  if (!data[schema.primary]) {
    const detail = await app.request('system-model.detail', data);
    if (!detail) {
      return res.setError(true, 'Invalid ID');
    }

    data[schema.primary] = detail[schema.primary];
  }

  //----------------------------//
  // 4. Process Data
  try {
    const results = await schema.collection.update(data[schema.primary], data);
  } catch(e) {
    return res.setError(true, e.message);
  }

  //----------------------------//
  // 5. Interpret Results
  return res.setResults(results);
});
