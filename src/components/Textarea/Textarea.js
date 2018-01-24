import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import bootstrap from '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import button from '../button.css';
import styles from './Textarea.css';

class UserAnswer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userAnswer: '',
    };
  }

  hasScrollbar = el => el.clientHeight < el.scrollHeight;

  addRow = (event) => {
    let target = event.target;
    if (this.hasScrollbar(target)) {
      target.rows = Number(target.rows) + 1;
    }
  };

  handleAnswerChange = (event) => {
    this.setState({
      userAnswer: event.target.value,
    });
    this.addRow(event);
  };

  handleSubmit = () => {
    this.props.userAnswer(this.state.userAnswer);
  };

  render() {
    return (
      <form>
        <div className={bootstrap['form-group']}>
          <label className={styles['console-label']} htmlFor="console-output">
            Web Console Output:
          </label>
          <div className={styles.console_icon}
          >></div>
          <textarea
            id="console-output"
            value={this.userAnswer}
            onInput={this.handleAnswerChange}
            rows="2"
            className={styles.console}
          />
          <label>
            Please use enter for each new line.
            Please note that your result is case sensitive.
          </label>
        </div>
        <div className={bootstrap['btn-group']}>
          <button
            id="answer"
            onClick={this.handleSubmit}
            type="button"
            className={classNames(bootstrap.btn, bootstrap['btn-info'], button.btn_cursor)}
          >Answer
          </button>
          <button
            id="next-quiz"
            onClick={this.handleSubmit}
            type="button"
            className={classNames(bootstrap.btn, bootstrap['btn-light'], button.btn_cursor)}
          >I don't know
          </button>
        </div>
      </form>
    );
  }
}

UserAnswer.propTypes = {
  userAnswer: PropTypes.func,
  handleAnswer: PropTypes.func.isRequired,
};

export default UserAnswer;
