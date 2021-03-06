import React, { useState, useEffect, memo } from 'react';
import Loadable from 'react-loadable';

import { functions } from '../../services/fireStoreService';
import getRandomDocument from '../../services/getQuestions';

import Form from '../../components/Form/Form';
import Header from '../../components/Header/Header';
import ProgressBar from '../../components/ProgressBar';
import ErrorBoundary from '../../components/ErrorBoundary';

import grid from '../../components/Grid/Grid.css';
import Loading from '../../components/Loading/Loading';

const LoadableCode = Loadable({
  loader: () => import(/* webpackChunkName: "Code" */ '../../components/Code/Code'),
  loading: Loading,
});

type IProps = {
  results: void,
};

// type Question = {
//   name: string,
//   category: string,
//   value: string,
// };

// type State = {
//   question: Question,
// };

const questionsLength = 5;
let iteration = 1;
let successCounter = 0;
let failureCounter = 0;

const displayQuestion = (callback: void): void => {
  getRandomDocument('questions')
    .then(({ data }) => {
      if (data) {
        callback(data);
      } else {
        console.error('No such document!');
      }
    }).catch((error) => {
      console.error('Error getting document:', error);
    });
};

const upProgressBar = (isCorrect: boolean): void => {
  if (isCorrect) {
    successCounter += 1;
  } else {
    failureCounter += 1;
  }
};

const addAnswer = (answer: string, questionCallback: void, resultsCallback: void): void => {
  const isCorrectAnswer = functions.httpsCallable('isCorrectAnswer');
  isCorrectAnswer(answer)
    .then((result) => {
      upProgressBar(result.data.correct);

      if (iteration === questionsLength) {
        resultsCallback({
          correct: successCounter,
          total: questionsLength,
        });
      } else {
        displayQuestion(questionCallback);
        iteration += 1;
      }
    });
};

interface IProgressBarWrapperProps {
  success?: number;
  failure?: number;
  overall: number;
}

const ProgressBarWrapper = ({ success = 0, failure = 0, overall }: IProgressBarWrapperProps): Element => {
  const successBarWidth = `${(success * 100) / overall}%`;
  const failureBarWidth = `${(failure * 100) / overall}%`;
  return (<ProgressBar successBar={successBarWidth} failureBar={failureBarWidth} />);
};

const Exam = ({ results }: IProps) => {
  const [question, setQuestion] = useState({
    id: '',
    name: '',
    category: '',
    value: '',
  });

  useEffect(() => {
    displayQuestion(setQuestion);
    return function cleanup() {
      iteration = 1;
      successCounter = 0;
      failureCounter = 0;
    };
  }, []);

  return (
    <>
      <Header current={iteration} total={questionsLength} />
      <ProgressBarWrapper success={successCounter} failure={failureCounter} overall={questionsLength} />
      <section className={`${grid.container} ${grid['container_mobile-no-padding']}`}>
        <ErrorBoundary>
          <LoadableCode codeString={question.value} />
        </ErrorBoundary>
      </section>
      <section className={grid.container}>
        <Form userAnswer={(answer: string) => addAnswer(answer, setQuestion, results)} />
      </section>
    </>
  );
};

export default memo(Exam);
