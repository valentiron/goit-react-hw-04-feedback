import { useState, useEffect } from 'react';
import Section from './Section/Section';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';

export default function App() {
  const [good, isGood] = useState(0);
  const [neutral, isNeutral] = useState(0);
  const [bad, isBad] = useState(0);

  const options = ['good', 'neutral', 'bad'];
  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  function handleIncrement(option) {
    switch (option) {
      case 'good':
        isGood(prevState => prevState + 1);
        break;

      case 'neutral':
        isNeutral(prevState => prevState + 1);
        break;

      case 'bad':
        isBad(prevState => prevState + 1);
        break;

      default:
        return;
    }
  }

  function countTotalFeedback() {
    const totalFeedbackValue = good + neutral + bad;

    return totalFeedbackValue;
  }

  function countPositiveFeedbackPercentage() {
    const positiveFeedbackPercent = good / countTotalFeedback() * 100;
    return Number.parseInt(positiveFeedbackPercent);
  }

  useEffect(() => {
    countTotalFeedback();
  });

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={handleIncrement} />
      </Section>
      <Section title = "Statistics">
        {total ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </>
  );
}