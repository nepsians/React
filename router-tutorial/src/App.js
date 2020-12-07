import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { connect } from "react-redux";
import Loading from "react-loading";

import "./App.css";
import "./styles.css";
import { display } from "./function.js";

import { loadImages } from "./actions";
import ResponsiveComponent from "./ResponsiveComponent";

const App = props => {
  return (
    <Router>
      <div style={{ height: "100%" }}>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
            <li>
              <Link to="/responsive">Go to responsive website</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about/:id" component={About} />
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/topics" component={Topics} />
          <Route path="/responsive" component={ResponsiveComponent} />

          <Route path="/">
            <Home {...props} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

function Home({
  images: { response, pageNo, isLoading },
  loadImages,
  imageStats
}) {
  if (isLoading) {
    return (
      <div className="content" style={{ marginTop: 120 }}>
        <Loading type="cylon" height={28} width={120} color="purple" />
      </div>
    );
  }

  return (
    <div className="content">
      <h2>Home</h2>
      <div
        style={{
          flexDirection: "row",
          display: "flex"
        }}
      >
        <button
          className="button"
          style={{ alignSelf: "center", marginRight: 16 }}
          onClick={loadImages}
        >
          "Load Images"
        </button>

        <h4 style={{ alignSelf: "center" }}>Page no: {pageNo}</h4>
      </div>

      <section className="grid">
        {response &&
          response.map(image => (
            <div
              key={image.id}
              className={`item item-${Math.ceil(image.height / image.width)}`}
            >
              <img src={image.urls.small} alt={image.user.username} />
            </div>
          ))}
      </section>
    </div>
  );
}

function About({ match }) {
  const val = JSON.parse(match.params.id);
  console.warn("MATCHES:", val);
  return <h2>About: {val.name}</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function Topics() {
  let match = useRouteMatch();
  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`} component={Topic} />

        <Route path="/topics">
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}

const stateMapToProps = state => {
  return { images: state.ImageReducer, imageStats: state.StatsReducer };
};
const dispatchMapToProps = { loadImages };

export default connect(stateMapToProps, dispatchMapToProps)(App);
