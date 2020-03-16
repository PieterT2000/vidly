import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveMovie, getMovie } from "../services/fakeMovieService";
import { Redirect } from "react-router-dom";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genre: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {}
  };

  componentDidMount() {
    // populate data if existing movie is edited
    const { id } = this.props.match.params;
    if (id && getMovie(id)) {
      const { title, genre, numberInStock, dailyRentalRate } = getMovie(id);
      const data = { ...this.state.data };
      data.title = title;
      data.genre = genre.name;
      data.numberInStock = numberInStock;
      data.dailyRentalRate = dailyRentalRate;
      this.setState(() => ({ data }));
    } else {
      return;
    }
  }

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    genre: Joi.string().required(),
    numberInStock: Joi.number().min(0),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
  };

  doSubmit() {
    const { history, match } = this.props;
    const { data: movie } = this.state;
    saveMovie(movie, match.params.id);
    history.push("/movies");
  }

  render() {
    const { id } = this.props.match.params;
    // check if existing movie is edited
    if (id && !getMovie(id)) return <Redirect to="/not-found" />;
    return (
      <div>
        <h1>Movie Form</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("genre", "Genre", "select", [
            "",
            "Action",
            "Comedy",
            "Thriller"
          ])}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
