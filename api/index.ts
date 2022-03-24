import Variables from '../constants/Variables';

const getTriviaData = () =>
  new Promise((resolve, reject) => {
    const url = 'https://opentdb.com/api.php?';
    const params = {
      amount: Variables.Count.toString(),
      difficulty: Variables.Difficulty,
      type: Variables.Type,
    };
    fetch(url + new URLSearchParams(params))
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export default getTriviaData;
