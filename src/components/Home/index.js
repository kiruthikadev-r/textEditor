import React, { Component } from 'react';
import { v4 } from 'uuid';

import ListItems from '../ListItems';

import './index.css';

class Home extends Component {
  state = {
    fontText: '',
    fontColor: '',
    fontFamily: '',
    fontSize: 4,
    fontList: [],
    history: [],
    redoHistory: [],
  };

  deleteComment = (commentId) => {
    const { fontList, history, redoHistory } = this.state;

    const deletedComment = fontList.find((comment) => comment.id === commentId);

    this.setState({
      fontList: fontList.filter((comment) => comment.id !== commentId),
      history: [...history, deletedComment],
      redoHistory: [],
    });
  };

  undo = () => {
    const { history, redoHistory } = this.state;
  
    if (history.length > 0) {
      const lastChange = history[history.length - 1];
      const updatedHistory = history.slice(0, -1);
      const updatedFontList = this.state.fontList.slice(); // Copy the fontList array
  
      // Find and remove the last added item from the copied fontList
      const indexToRemove = updatedFontList.findIndex((item) => item.id === lastChange.id);
      if (indexToRemove !== -1) {
        updatedFontList.splice(indexToRemove, 1);
      }
  
      this.setState({
        fontList: updatedFontList,
        history: updatedHistory,
        redoHistory: [lastChange, ...redoHistory],
      });
    }
  };
  
  redo = () => {
    const { redoHistory } = this.state;
  
    if (redoHistory.length > 0) {
      const nextChange = { ...redoHistory[0] }; // Clone the last added item
      const updatedRedoHistory = redoHistory.slice(1);
  
      this.setState({
        fontList: [...this.state.fontList, nextChange],
        history: [...this.state.history, nextChange],
        redoHistory: updatedRedoHistory,
      });
    }
  };
  
  

  renderCommentsList = () => {
    const { fontList } = this.state;

    return fontList.map((eachText) => (
      <ListItems key={eachText.id} textDetails={eachText} deleteComment={this.deleteComment} />
    ));
  };

  onAddText = (event) => {
    event.preventDefault();
    const { fontText, fontColor, fontList, fontFamily, fontSize, history, redoHistory } = this.state;
    const newText = {
      id: v4(),
      text: fontText,
      fontColor: fontColor,
      fontSize: fontSize,
      fontFamily: fontFamily,
    };

    this.setState(
      (prevState) => ({
        fontList: [...prevState.fontList, newText],
        fontText: '',
        history: [...history, newText],
        redoHistory: [],
      }),
      () => {
        // You can use the callback to update the history after the state has been set
        // This is important to capture the changes after the addition of new text
        this.updateHistory();
      }
    );
  };

  updateHistory = () => {
    // Update history after each state change (e.g., after adding new text)
    const { fontList, history } = this.state;
    const latestChange = fontList[fontList.length - 1];

    this.setState({
      history: [...history, latestChange],
    });
  };

  onChangeFontColor = (event) => {
    this.setState({
      fontColor: event.target.value,
    });
  };

  onChangeFontFamily = (event) => {
    this.setState({
      fontFamily: event.target.value,
    });
  };

  onChangeFontText = (event) => {
    this.setState({
      fontText: event.target.value,
    });
  };

  onChangeFontSize = (event) => {
    if (event.target.value >= 4) {
      this.setState({
        fontSize: event.target.value,
      });
    }
  };

  render() {
    const { fontText, fontColor, fontList, fontFamily, fontSize } = this.state;

    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="app-heading">Text Editor</h1>
          <div className="comments-inputs">
            <form className="form" onSubmit={this.onAddText}>
              <p className="form-description">Let's play with the text</p>
              <input
                type="text"
                className="name-input"
                placeholder="text input"
                value={fontText}
                onChange={this.onChangeFontText}
              />
              <select onChange={this.onChangeFontFamily} value={fontFamily}>
                <option id="Roboto" value="Roboto">
                  Roboto
                </option>
                <option id="Sans-Serif" value="Sans-Serif">
                  Sans-Serif
                </option>
                <option id="Italic" value="Italic">
                  Italic
                </option>
                <option id="Monospace" value="Monospace">
                  Monospace
                </option>
              </select>
              <input type="number" value={fontSize} onChange={this.onChangeFontSize} />
              <input type="color" value={fontColor} onChange={this.onChangeFontColor} />
              <button type="submit" className="add-button">
                ADD TEXT
              </button>
            </form>
            <img
              className="image"
              src="https://hub.ricssbe.org/hubfs/shutterstock_680930416.jpg"
              alt="colors"
            />
          </div>
          <hr className="line" />
          <p className="heading">
            <span className="comments-count">{fontList.length}</span> Text
          </p>
          <button type="button" className="add-button" onClick={this.undo}>
            Undo
          </button>
          <button type="button" className="add-button" onClick={this.redo}>
            Redo
          </button>
          <ul className="comments-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    );
  }
}

export default Home;
