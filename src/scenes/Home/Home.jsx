// @flow
import React from 'react';
import classNames from 'classnames';

import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import buttons from '../../components/button.css';
import styles from './Home.css';

type Props = {
  exam: boolean,
  train: boolean,
};

const Home = (props: Props) => {
  const { exam, train } = props;

  return (
    <div>
      <div className={styles['arrow-right']} />
      <main className={styles['home-grid']}>
        <button
          id="exam"
          type="button"
          className={classNames(styles['exam-btn'], bootstrap.btn, bootstrap['btn-lg'], bootstrap['btn-dark'], bootstrap['mr-2'], buttons.btn_start)}
          onClick={exam}
        >Exam
        </button>
        <button
          id="train"
          type="button"
          className={classNames(styles['train-btn'], bootstrap.btn, bootstrap['btn-lg'], bootstrap['btn-dark'], bootstrap['mr-2'], buttons.btn_start)}
          onClick={train}
        >Train
        </button>
      </main>
    </div>
  );
};

export default Home;
