import React, { Component } from "react";

class TableBody extends Component {
  _get(item, path) {
    let obj = { ...item };
    const paths = path.split(".");
    for (let i = 0; i < paths.length; i++) {
      obj = obj[paths[i]];
    } // return found value in deep search
    return obj;
  }

  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return this._get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map(item => {
          return (
            <tr key={item._id}>
              {columns.map(column => {
                return (
                  <td key={this.createKey(item, column)}>
                    {this.renderCell(item, column)}
                  </td>
                );
              })}
            </tr>
          );
        })}
        <tr>
          <td></td>
        </tr>
      </tbody>
    );
  }
}

export default TableBody;
