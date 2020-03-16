import React, { Component } from "react";
import { Link } from "react-router-dom";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState(() => {
      return { movies };
    });
  };

  handleDelete = movieId => {
    // remove movie from db
    const deletedMovie = deleteMovie(movieId);
    this.setState({
      movies: this.state.movies.filter(m => m._id !== deletedMovie._id)
    });
  };

  handlePageChange = page => {
    this.setState(() => {
      return {
        currentPage: page
      };
    });
  };

  handleGenreSelect = genre => {
    this.setState(() => {
      // always reset currentpage to 1 when selecting genres
      return { selectedGenre: genre, currentPage: 1 };
    });
  };

  handleSort = sortColumn => {
    this.setState(() => {
      return {
        sortColumn
      };
    });
  };

  sortArray = (filtered, sortColumn) => {
    // sortcolumn is an object containing path and order
    const sorted = [...filtered].sort((a, b) => {
      let value1 = a;
      let value2 = b;

      // to access column on item (a,b) path is passed as a string in bracket notation
      // in case we need to access a nested object with string key, string gets split and we loop over each item till we get the right value
      let paths = sortColumn.path.split(".");
      for (let i = 0; i < paths.length; i++) {
        value1 = value1[paths[i]];
        value2 = value2[paths[i]];
      }
      if (sortColumn.order === "asc") {
        if (value1 < value2) return -1;
        if (value1 > value2) return 1;
        return 0;
      } else {
        if (value1 < value2) return 1;
        if (value1 > value2) return -1;
        return 0;
      }
    });
    return sorted;
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      movies: allMovies,
      selectedGenre
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;
    // sort filtered array
    const sorted = this.sortArray(filtered, sortColumn);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      sortColumn,
      genres,
      selectedGenre
    } = this.state;

    if (count === 0)
      return <p className="mt-4 mb-4">There are no movies in the database</p>;

    const { totalCount, data: movies } = this.getPagedData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
          <Link to="/movies/new" className="btn btn-primary mb-4 mt-4">
            New Movie
          </Link>
          <p className="mb-4">Showing {totalCount} movies in the database</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
