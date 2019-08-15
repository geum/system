import React from 'react';
import { Layout } from '@geum/admin';
import { Modal } from '@geum/components';

/**
 * System Model Page
 *
 * @param {Object} props
 */
const Schema = props => {
  const schemas = [{}, {}, {}, {}, {}];

  const renderLists = items => {
    return items.map((item, index) => (
      <tr>
        <td>
          <a
            className="btn btn-sm btn-primary mx-1"
            href="#"
          >
            <i className="fa fa-eye"></i>
          </a>
          <a
            className="btn btn-sm btn-primary mx-1"
            href="#"
          >
            <i className="fa fa-copy"></i>
          </a>
          <a
            className="btn btn-sm btn-primary mx-1"
            href="#"
          >
            <i className="fa fa-edit"></i>
          </a>
        </td>
        <td>
          <a className="d-block" href="#">
            <i className="fa fa-key"></i> Role
          </a>
          <p>
            Manages Roles
          </p>
        </td>
        <td>
          <span className="d-block">
            1:1 auth
          </span>
          <span className="d-block">
            1:N scope
          </span>
          <span className="d-block">
            1:1 webhook
          </span>
        </td>
      </tr>
    ));
  }

  return (
    <Layout.Default>
      <div className="admin-schema search">
        <div className="row title py-3">
          <div className="col">
            <i className="fa fa-database ml-1"></i>&nbsp;
            <span>16 Schemas</span>
          </div>
        </div>

        <div className="bg-white p-3 mt-3">
          <div className="actions d-flex align-items-center">
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-secondary"
              >
                ACTIVE
              </button>
              <button
                type="button"
                className="btn btn-secondary"
              >
                INACTIVE
              </button>
            </div>

            <div className="d-flex ml-auto align-items-center">
              <a className="d-inline-block mr-4" href="#">
                <i className="fa fa-upload"></i> IMPORT
              </a>
              <a className="d-inline-blick mr-4" href="#">
                <i className="fa fa-download"></i> EXPORT
              </a>
              <a className="btn btn-primary" href="#">
                <i className="fa fa-plus"></i> ADD
              </a>
            </div>
          </div>
          <div className="list mt-4">
            <table className="table table-striped">
              <thead>
                <th>ACTIONS</th>
                <th>SCHEMA</th>
                <th>RELATIONS</th>
              </thead>
              <tbody>
                {renderLists(schemas)}
              </tbody>
            </table>
          </div>
        </div>

        <Modal.Container></Modal.Container>
      </div>
    </Layout.Default>
  )
}

export default Schema;
