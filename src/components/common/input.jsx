import React from "react";

const Input = ({ name, label, error, children, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {rest.type === "select" ? (
        <select
          className="form-control"
          name={name}
          label={label}
          onChange={rest.onChange}
          value={rest.value}
        >
          {children.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input {...rest} name={name} id={name} className="form-control" />
      )}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
