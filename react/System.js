import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from '@geum/admin';
import { Model, Schema } from '@pages';

/**
 * System Routes Component
 *
 * @param {Object} props
 */
const System = props => {
  console.log(props);
  return (
    <Layout.Default>
      <Switch>
        <Route path="/admin/system/model" component={Model} />
        <Route path="/admin/system/schema" component={Schema} />
      </Switch>
    </Layout.Default>
  )
}

export default System;
