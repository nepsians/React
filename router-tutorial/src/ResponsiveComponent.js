import React, { Component } from "react";

import "./responsive.css";
import Popup from "./components/popup";

const menuItems = [
  { icon: `😀`, text: "Item 1" },
  { icon: `😉`, text: "Item 2" },
  { icon: `😎`, text: "Item 3" },
  { icon: `🤔`, text: "Item 4" },
  { icon: `😛`, text: "Item 5" }
];

const TopBar = props => {
  const [showModal, setModalState] = React.useState(null);

  const onSettingClicked = event => {
    setModalState(event.currentTarget);
  };

  const onCloseClicked = () => {
    setModalState(null);
  };

  const onOptionPress = value => {
    const data = { name: "nihal" };
    props.history.push(`/${value}/${JSON.stringify(data)}`);
  };

  return (
    <div className="top-bar">
      <span style={{ paddingLeft: 8 }}>{`😺️`}</span>

      <p style={{ color: "white" }}>App</p>

      <div style={{ paddingRight: 8 }} onClick={onSettingClicked}>
        {`⚙️`}
      </div>

      <Popup
        onCloseClicked={onCloseClicked}
        showModal={showModal}
        onOptionPress={onOptionPress}
      />
    </div>
  );
};

const MenuBarComponent = () => {
  return (
    <div
      style={{
        backgroundColor: "black",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 18
      }}
    >
      <span
        style={{
          color: "white",
          fontSize: 26,
          display: "flex",
          justifyContent: "center",
          paddingTop: 20,
          paddingBottom: 20
        }}
      >
        App
      </span>
      {menuItems.map(val => (
        <div
          className="flex-row"
          style={{ justifyContent: "center", alignItems: "center " }}
          key={val.text}
        >
          <span
            style={{
              fontSize: 24,
              paddingTop: "8px",
              paddingRight: 4,
              color: "white"
            }}
          >
            {val.icon}
          </span>
          <span style={{ color: "white" }}>{val.text}</span>
        </div>
      ))}
    </div>
  );
};

const Content = () => {
  const dummyPost = {
    title: `Here's a blog post title`,
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  };

  return (
    <div className="content-container">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => (
        <div style={{ padding: 12 }} key={val}>
          <h2 style={{ marginBottom: 0 }}>{dummyPost.title}</h2>
          <p>{dummyPost.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default class ResponsiveComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0,
      windowHeight: 0
    };
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

    this.setState({ windowWidth, windowHeight });
  };

  render() {
    const { windowWidth } = this.state;

    const styles = {
      white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      topBarHeight: 40,
      footerMenuHeight: 50,
      showFooterMenuText: windowWidth > 500,
      showSidebar: windowWidth > 768,
      sidebarWidth: windowWidth < 1100 ? 50 : 150,
      sidebarCollapsed: windowWidth < 1100
    };

    return (
      <div
        style={{ display: styles.showSidebar ? "flex" : null, height: "100%" }}
      >
        {styles.showSidebar ? <MenuBarComponent /> : <TopBar {...this.props} />}
        <Content />
      </div>
    );
  }
}
