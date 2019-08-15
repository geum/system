import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Model, Schema } from '@pages';

/**
 * System Routes Component
 *
 * @param {Object} props
 */
const System = props => {
  return (
    <Switch>
      <Route path="/admin/system/model" component={Model} />
      <Route exact path="/admin/system/schema/search" component={Schema} />
    </Switch>
  )
}

export default System;
